const analysisResultString = sessionStorage.getItem('assessmentAnalysis');
let analysisResult = null;

if (analysisResultString) {
    try {
        analysisResult = JSON.parse(analysisResultString);
        console.log("feedback 페이지에 로드된 분석 데이터:", analysisResult);
    } catch (e) {
        console.error("분석 데이터 파싱 오류:", e);
    }
} else {
    console.error("sessionStorage에 저장된 분석 데이터가 없습니다.");
}

// 전문가 피드백 테이블을 렌더링
// AI 분석 결과의 'scores' 배열을 인자로 받도록 수정되었습니다.
const renderReviewTable = (assessmentData) => {
    const tableBody = document.getElementById('reviewTableBody');
    if (!tableBody) return;
    tableBody.innerHTML = '';

    // subCategory별로 데이터를 그룹화하고 원본 및 조정된 점수를 계산
    const groupedAssessmentData = assessmentData.reduce((acc, current) => {
        const key = current.mainCategory + " - " + current.subCategory;
        if (!acc[key]) {
            acc[key] = {
                mainCategory: current.mainCategory,
                subCategory: current.subCategory,
                questionCount: 0,
                originalScore: 0,
                adjustedScore: 0,
                userAnswers: []
            };
        }
        acc[key].questionCount++;
        acc[key].originalScore += current.score; // 항목 별 모델 점수
        acc[key].adjustedScore += current.adjustedScore || current.originalScore;
        acc[key].userAnswers.push({
            question: current.question,
            userAnswer: current.userAnswer
        });
        return acc;
    }, {});

    // 그룹화된 데이터를 기반으로 HTML 테이블 행 생성
    Object.values(groupedAssessmentData).forEach(group => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${group.mainCategory}</td>
            <td>${group.subCategory}</td>
            <td>${(group.originalScore / group.questionCount).toFixed(1)}</td>
            <td class="adjusted-score"><input type="number" class="form-control" value="${(group.adjustedScore / group.questionCount).toFixed(1)}" step="0.1" min="0" max="10"></td>
            <td class="change-score">-</td>
        `;
        tableBody.appendChild(row);

        // 사용자의 답변 내용을 토글 가능한 행으로 추가
        const answerRow = document.createElement('tr');
        answerRow.classList.add('user-answers-row');
        answerRow.innerHTML = `
            <td colspan="4">
                <div class="user-answers-content">
                    ${group.userAnswers.map(ans => `
                        <div class="answer-item">
                            <p><strong>질문:</strong> ${ans.question}</p>
                            <p><strong>답변:</strong> ${ans.userAnswer}</p>
                        </div>
                    `).join('')}
                </div>
            </td>
        `;
        tableBody.appendChild(answerRow);

        row.addEventListener('click', () => {
            answerRow.classList.toggle('active');
        });
    });

    // 테이블 하단의 합계/평균 값 업데이트
    updateTableSummary(groupedAssessmentData);
};

// 테이블 요약 정보 업데이트
const updateTableSummary = (groupedAssessmentData) => {
    if (!document.getElementById('originalAverage') || !groupedAssessmentData) return;
    const groups = Object.values(groupedAssessmentData);
    const originalTotal = groups.reduce((sum, group) => sum + group.originalScore, 0);
    const adjustedTotal = groups.reduce((sum, group) => sum + group.adjustedScore, 0);
    const totalGroups = groups.length;

    document.getElementById('originalAverage').textContent = (originalTotal / totalGroups).toFixed(1);
    document.getElementById('adjustedAverage').textContent = (adjustedTotal / totalGroups).toFixed(1);
    document.getElementById('totalQuestions').textContent = totalGroups;
};

// 피드백 제출
const submitFeedback = () => {
    const generalFeedback = document.getElementById('generalFeedback').value;
    const riskAssessment = document.getElementById('riskAssessment').value;
    const recommendations = document.getElementById('recommendations').value;
    
    if (!generalFeedback.trim()) {
        alert('종합 의견을 작성해주세요.');
        return;
    }
    
    // 이 부분에서 조정된 점수 데이터를 가져와야 합니다.
    const feedbackData = {
        // adjustedScores: groupedAssessmentData, // 이 데이터는 여기서 접근 불가능, 제출 시 다시 구성 필요
        generalFeedback,
        riskAssessment,
        recommendations,
        timestamp: new Date().toISOString()
    };
    
    // 실제 구현시 백엔드로 전송
    console.log('피드백 데이터:', feedbackData);
    alert('전문가 피드백이 성공적으로 제출되었습니다!');
    
    // 홈으로 리다이렉트
    window.location.href = '/';
};

// 임시저장
const saveDraft = () => {
    const tableRows = document.querySelectorAll('#reviewTableBody tr');

    tableRows.forEach(row => {
        const adjustedScoreInput = row.querySelector('.adjusted-score input');
        const changeScoreCell = row.querySelector('.change-score');
        
        // 입력 필드와 셀이 모두 존재하면 값을 그대로 복사
        if (adjustedScoreInput && changeScoreCell) {
            const adjustedScore = adjustedScoreInput.value.trim();
            changeScoreCell.textContent = adjustedScore;
        }
    });

    // 변경사항이 임시저장되었음을 알림
    alert('변경사항이 임시저장되었습니다.');
};

// AI 분석 결과를 HTML 폼에 출력하는 함수
const updateFeedbackPage = () => {
    // analysisResult에 데이터가 있을 때만 페이지 업데이트
    if (analysisResult) {
        // '총평' 부분에 findings 데이터를 출력
        // findings는 배열이므로 join으로 합쳐서 출력
        const findingsTextarea = document.getElementById('generalFeedback');
        if (findingsTextarea) {
            findingsTextarea.value = analysisResult.findings.join('\n');
        }

        // '위험도 평가' 부분에 riskLevel 데이터를 출력
        const riskAssessmentTextarea = document.getElementById('riskAssessment');
        if (riskAssessmentTextarea) {
            riskAssessmentTextarea.value = `위험도 등급: ${analysisResult.riskLevel}\n평균 점수: ${analysisResult.averageScore}`;
        }

        // '권고사항' 부분에 recommendations 데이터를 출력
        const recommendationsTextarea = document.getElementById('recommendations');
        if (recommendationsTextarea) {
            recommendationsTextarea.value = analysisResult.recommendations.join('\n');
        }
    } else {
        // 데이터가 없을 경우, textarea들을 비워두거나 사용자에게 안내
        const feedbackContainer = document.querySelector('.feedback-container');
        if (feedbackContainer) {
             feedbackContainer.innerHTML = '<p class="error-message">분석 결과를 불러오지 못했습니다. 평가를 먼저 진행해 주세요.</p>';
        }
    }
};


// 페이지 로드시 초기화
document.addEventListener('DOMContentLoaded', () => {
    if (analysisResult) {
        renderReviewTable(analysisResult.scores);
        
        const findingsTextarea = document.getElementById('generalFeedback');
        if (findingsTextarea) {
            findingsTextarea.value = analysisResult.findings.join('\n');
        }

        const riskAssessmentTextarea = document.getElementById('riskAssessment');
        if (riskAssessmentTextarea) {
            riskAssessmentTextarea.value = `위험도 등급: ${analysisResult.riskLevel}\n평균 점수: ${analysisResult.averageScore}`;
        }
        
        const recommendationsTextarea = document.getElementById('recommendations');
        if (recommendationsTextarea) {
            recommendationsTextarea.value = analysisResult.recommendations.join('\n');
        }
    } else {
        const feedbackContainer = document.querySelector('.feedback-container');
        if (feedbackContainer) {
             feedbackContainer.innerHTML = '<p class="error-message">분석 결과를 불러오지 못했습니다. 평가를 먼저 진행해 주세요.</p>';
        }
    }
});