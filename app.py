from flask import Flask, request, jsonify, render_template
import json
import requests
from datetime import datetime
import os
import uuid


app = Flask(__name__)

@app.route("/")
def home():
    return render_template("main.html")

@app.route("/question")
def question():
    return render_template("question.html")


@app.route("/result", methods=['GET', 'POST'])
def result():
    responses = {}
    if request.method == 'POST':
        responses = request.form.to_dict()
    return render_template("result.html", responses=responses)

@app.route("/feedback")
def feedback():
    return render_template("feedback.html")


# 환경 변수에서 API 키 가져오기 (보안상 중요)
COLAB_API_URL = os.getenv('COLAB_API_URL')  # 예: 'https://your-colab-endpoint.com/analyze'
API_KEY = os.getenv('API_KEY')  # 필요한 경우


@app.route('/api/submit-assessment', methods=['POST'])
def submit_assessment():
    """프론트엔드에서 평가 답변을 받아 처리하는 엔드포인트"""
    
    try:
        # JSON 데이터 받기
        data = request.get_json()
        
        if not data:
            return jsonify({
                'success': False, 
                'message': '데이터가 전송되지 않았습니다.'
            }), 400
        
        # 받은 데이터 검증
        if 'responses' not in data or 'summary' not in data:
            return jsonify({
                'success': False, 
                'message': '필수 데이터가 누락되었습니다.'
            }), 400
        
        print(f"평가 데이터 수신: {datetime.now()}")
        print(f"총 답변 수: {data['summary']['answeredQuestions']}")
        print(f"건너뛴 질문 수: {data['summary']['skippedQuestions']}")
        
        # 받은 데이터 출력 (디버깅용)
        print("받은 답변들:")
        for response_id, response_data in data['responses'].items():
            print(f"  {response_id}: {response_data['question'][:50]}... -> {response_data['answer'][:100]}...")
        
        # 답변 데이터 정리 및 전처리
        processed_data = process_assessment_data(data)
        
        # AI 모델 분석 요청 (Colab API)
        analysis_result = request_ai_analysis(processed_data)
        
        # 결과 반환
        response_data = {
            'success': True,
            'message': '평가가 성공적으로 제출되었습니다.',
            'submissionId': generate_submission_id(),
            'analysis': analysis_result,
            'redirectUrl': None  # 필요시 결과 페이지 URL
        }
        
        # 선택사항: 결과를 파일로 저장
        save_assessment_result(data, analysis_result)
        
        return jsonify(response_data)
        
    except Exception as e:
        print(f"에러 발생: {str(e)}")
        return jsonify({
            'success': False,
            'message': f'서버 처리 중 오류가 발생했습니다: {str(e)}'
        }), 500

def process_assessment_data(raw_data):
    """평가 데이터를 AI 모델에 보내기 적합한 형태로 전처리"""
    
    processed = {
        'timestamp': raw_data.get('timestamp'),
        'total_questions': raw_data['summary']['totalQuestions'],
        'answered_questions': raw_data['summary']['answeredQuestions'],
        'categories': {}
    }
    
    # 카테고리별로 답변 정리
    for category in raw_data['summary']['categories']:
        category_data = {
            'title': category['title'],
            'answers': []
        }
        
        for answer in category['answers']:
            if not answer['skipped']:
                category_data['answers'].append({
                    'question': answer['question'],
                    'answer': answer['answer']
                })
        
        processed['categories'][category['id']] = category_data
    
    return processed

def request_ai_analysis(processed_data):
    """Colab에서 실행 중인 AI 모델에 분석 요청"""
    
    # Colab API URL이 설정되지 않은 경우 더미 결과 반환
    if not COLAB_API_URL:
        print("Colab API URL이 설정되지 않음. 더미 분석 결과 반환.")
        return generate_dummy_analysis(processed_data)
    
    try:
        # Colab API에 요청 보내기
        headers = {
            'Content-Type': 'application/json'
        }
        
        # API 키가 있는 경우 헤더에 추가
        if API_KEY:
            headers['Authorization'] = f'Bearer {API_KEY}'
        
        response = requests.post(
            COLAB_API_URL,
            json=processed_data,
            headers=headers,
            timeout=30  # 30초 타임아웃
        )
        
        if response.status_code == 200:
            return response.json()
        else:
            print(f"Colab API 오류: {response.status_code}")
            return generate_dummy_analysis(processed_data)
            
    except requests.RequestException as e:
        print(f"Colab API 요청 실패: {str(e)}")
        return generate_dummy_analysis(processed_data)

def generate_dummy_analysis(processed_data):
    """AI 모델이 연결되지 않았을 때 더미 분석 결과 생성"""
    
    answered_count = processed_data['answered_questions']
    total_count = processed_data['total_questions']
    
    # 답변 비율에 따른 간단한 위험도 평가
    if answered_count == 0:
        risk_level = "평가 불가"
        findings = ["답변된 질문이 없어 평가할 수 없습니다."]
        recommendations = ["질문에 답변해 주시기 바랍니다."]
    elif answered_count / total_count < 0.3:
        risk_level = "낮음"
        findings = ["답변이 제한적이어서 정확한 평가가 어렵습니다."]
        recommendations = ["더 많은 질문에 답변하시면 정확한 평가가 가능합니다."]
    else:
        # 실제로는 AI 모델이 답변 내용을 분석해서 결정
        risk_level = "보통"
        findings = [
            f"총 {total_count}개 질문 중 {answered_count}개에 답변하셨습니다.",
            "제공된 정보를 바탕으로 종합적인 평가를 실시했습니다."
        ]
        recommendations = [
            "전문가와의 상담을 권장합니다.",
            "지속적인 관찰이 필요할 수 있습니다."
        ]
    
    return {
        'riskLevel': risk_level,
        'findings': findings,
        'recommendations': recommendations,
        'analysisDate': datetime.now().isoformat(),
        'note': '이는 임시 분석 결과입니다. AI 모델 연결 후 정확한 분석이 제공됩니다.'
    }

def generate_submission_id():
    """제출 ID 생성"""
    return str(uuid.uuid4())

def save_assessment_result(assessment_data, analysis_result):
    """평가 결과를 파일로 저장 (선택사항)"""
    
    try:
        # results 디렉터리가 없으면 생성
        if not os.path.exists('results'):
            os.makedirs('results')
        
        # 저장할 데이터 준비
        save_data = {
            'timestamp': datetime.now().isoformat(),
            'assessment': assessment_data,
            'analysis': analysis_result
        }
        
        # 파일명 생성 (타임스탬프 기반)
        filename = f"assessment_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
        filepath = os.path.join('results', filename)
        
        # JSON 파일로 저장
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(save_data, f, ensure_ascii=False, indent=2)
        
        print(f"평가 결과 저장됨: {filepath}")
        
    except Exception as e:
        print(f"결과 저장 실패: {str(e)}")

if __name__ == '__main__':
    # 개발 환경에서 실행
    print("Flask 서버 시작...")
    print("평가 페이지: http://localhost:5000")
    print("API 엔드포인트: http://localhost:5000/api/submit-assessment")
    
    app.run(debug=True, host='0.0.0.0', port=5000)