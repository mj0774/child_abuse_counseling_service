from flask import Flask, request, jsonify, render_template
from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch
import numpy as np
import json
from datetime import datetime
import os
import uuid

app = Flask(__name__)

# AI 모델 로드
try:
    MODEL_PATH = "mjhwang/roberta-reg-eval"
    tokenizer = AutoTokenizer.from_pretrained(MODEL_PATH)
    model = AutoModelForSequenceClassification.from_pretrained(MODEL_PATH)
    model.eval()
    print("AI 모델 로드 완료.")
    IS_AI_MODEL_LOADED = True
except Exception as e:
    print(f"AI 모델 로드 실패: {e}")
    model = None
    tokenizer = None
    IS_AI_MODEL_LOADED = False


@app.route("/")
def home():
    return render_template("main.html")

@app.route("/question")
def question():
    return render_template("question.html")

@app.route("/result")
def result():
    return render_template("result.html")

@app.route("/feedback")
def feedback():
    return render_template("feedback.html")


@app.route('/api/submit-assessment', methods=['POST'])
def submit_assessment():
    try:
        raw_data = request.get_json()
        
        if not raw_data:
            return jsonify({
                'success': False, 
                'message': '데이터가 유효하지 않습니다.'
            }), 400

        processed_data = process_assessment_data(raw_data)
        analysis_result = request_ai_analysis(processed_data)
        save_assessment_result(raw_data, analysis_result)

        return jsonify({
            'success': True,
            'analysis': analysis_result,
            'message': '평가 결과가 성공적으로 분석되었습니다.'
        }), 200

    except Exception as e:
        print(f"평가 제출 처리 중 오류 발생: {e}")
        return jsonify({
            'success': False,
            'message': f"서버 오류가 발생했습니다: {str(e)}"
        }), 500


def request_ai_analysis(processed_data):
    if IS_AI_MODEL_LOADED:
        return analyze_with_ai(processed_data)
    else:
        return generate_dummy_analysis(processed_data)


def analyze_with_ai(processed_data):
    """실제 AI 모델을 사용하여 답변의 위험도를 분석"""
    try:
        answers_dict = processed_data['answers']
        
        combined_texts = [
            f"질문: {item['question_text']} 답변: {item['answer_text']}" 
            for item in answers_dict.values()
        ]

        if not combined_texts:
            print("분석할 답변 텍스트가 없습니다. 더미 분석을 실행합니다.")
            return generate_dummy_analysis(processed_data)

        # 💡 수정: combined_texts를 토크나이저에 전달합니다.
        inputs = tokenizer(
            combined_texts,
            return_tensors="pt",
            padding=True,
            truncation=True,
            max_length=512
        )
        
        with torch.no_grad():
            outputs = model(**inputs)
            # 'tuple' object has no attribute 'logits' 오류 해결 -> 근데 로짓값이 계속 동일하게 나옴 
            predicted_scores = torch.sigmoid(outputs[0]).squeeze().tolist()
        
        # 모델 출력이 단일 값일 경우 리스트로 변환
        if not isinstance(predicted_scores, list):
            predicted_scores = [predicted_scores]

        analysis_scores = []
        for i, question_id in enumerate(answers_dict.keys()):
            # 점수를 0-100 대신 0-10으로 스케일링
            score = 10 * predicted_scores[i]
            
            # processed_data에서 카테고리 정보 찾기
            main_category = "분석 결과"
            sub_category = "알 수 없음"
            for category_id, category_info in processed_data['categories'].items():
                if question_id in category_info['questions']:
                    try:
                        main_category = category_info['title'].split(' - ')[0].strip()
                        sub_category = category_info['title'].split(' - ')[-1].strip()
                    except IndexError:
                        main_category = category_info['title']
                    break

            analysis_scores.append({
                "mainCategory": main_category,
                "subCategory": sub_category,
                "question": answers_dict[question_id]['question_text'],
                "userAnswer": answers_dict[question_id]['answer_text'], 
                "score": round(score, 2)
            })

        average_score = sum(d['score'] for d in analysis_scores) / len(analysis_scores) if analysis_scores else 0

        if average_score >= 8:
            risk_level = "학대의심"
        elif average_score >= 6:
            risk_level = "상담필요"
        elif average_score >= 4:
            risk_level = "관찰필요"
        else:
            risk_level = "정상군"
        
        findings = ["AI 모델이 답변을 분석하여 결과를 도출했습니다."]
        recommendations = ["모델 분석 결과를 참고하여 추가적인 상담을 고려해보세요."]
        
        return {
            'scores': analysis_scores,
            'averageScore': round(average_score, 2),
            'riskLevel': risk_level,
            'findings': findings,
            'recommendations': recommendations
        }
    except Exception as e:
        print(f"AI 모델 분석 중 오류 발생: {e}")
        return generate_dummy_analysis(processed_data)


def process_assessment_data(data):
    """
    프론트엔드에서 받은 데이터를 분석에 적합한 형태로 변환.
    💡 질문 텍스트와 답변을 함께 저장하도록 수정.
    """
    processed_data = {
        'answered_questions': data['summary']['answeredQuestions'],
        'total_questions': data['summary']['totalQuestions'],
        'categories': {c['id']: {'title': c['title'], 'questions': [q['questionId'] for q in c['answers']]} for c in data['summary']['categories']},
        'answers': {q['questionId']: {'answer_text': q['answer'], 'question_text': q['question']} for c in data['summary']['categories'] for q in c['answers'] if q['answer']}
    }
    return processed_data


#def generate_dummy_analysis(processed_data):
    # AI 모델 로드 실패 시 사용되는 더미 로직
    dummy_scores = []
    total_score = 0
    answered_count = 0

    for category_id, category_info in processed_data['categories'].items():
        for question_id in category_info['questions']:
            if question_id in processed_data['answers']:
                answered_count += 1
                answer_length = len(processed_data['answers'][question_id]['answer_text'])
                score = min(10.0, 1.0 + (answer_length - 10) / 90 * 9.0)
                
                dummy_scores.append({
                    "mainCategory": category_info['title'].split(' - ')[0].strip(),
                    "subCategory": category_info['title'].split(' - ')[-1].strip(),
                    "question": processed_data['answers'][question_id]['question_text'],
                    "score": round(score, 2)
                })

    average_score = sum(d['score'] for d in dummy_scores) / len(dummy_scores) if dummy_scores else 0
    
    if average_score >= 8:
        risk_level = "학대의심"
    elif average_score >= 6:
        risk_level = "상담필요"
    elif average_score >= 4:
        risk_level = "관찰필요"
    else:
        risk_level = "정상군"
    
    findings = [
        f"총 {processed_data.get('total_questions', 0)}개 질문 중 {answered_count}개에 답변하셨습니다.",
        "답변의 길이를 기반으로 임시 평가를 실시했습니다."
    ]
    recommendations = [
        "AI 모델이 연결될 때까지 기다리거나, 개발자에게 문의해주세요.",
        "답변이 길수록 높은 위험도를 보입니다. 추가적인 상담을 권장합니다."
    ]
    
    return {
        'scores': dummy_scores,
        'averageScore': round(average_score, 2),
        'riskLevel': risk_level,
        'findings': findings,
        'recommendations': recommendations
    }


def generate_submission_id():
    return str(uuid.uuid4())

def save_assessment_result(assessment_data, analysis_result):
    try:
        if not os.path.exists('results'):
            os.makedirs('results')
        
        save_data = {
            'timestamp': datetime.now().isoformat(),
            'assessment': assessment_data,
            'analysis': analysis_result
        }
        
        filename = f"assessment_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
        filepath = os.path.join('results', filename)
        
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(save_data, f, ensure_ascii=False, indent=2)
        
        print(f"평가 결과 저장됨: {filepath}")
    except Exception as e:
        print(f"파일 저장 중 오류 발생: {e}")


if __name__ == '__main__':
    app.run(debug=True)