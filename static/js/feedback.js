// 샘플 데이터 - subCategory별로 점수가 하나씩 설정
const assessmentData = [
    // 신체적 불편감 - 통증 (점수: 7.5)
    {
        mainCategory: "신체적 불편감",
        subCategory: "통증",
        question: "아이가 자주 아프다고 하나요?",
        originalScore: 7.5,
        userAnswer: "가끔 배가 아프다고 해요. 특별한 이유 없이 두통을 호소할 때도 있습니다."
    },
    {
        mainCategory: "신체적 불편감",
        subCategory: "통증",
        question: "통증 때문에 활동을 못 하는 경우가 있나요?",
        originalScore: 7.5, // 같은 subCategory이므로 동일한 점수
        userAnswer: "심한 건 아니지만 가끔 놀이를 중단해요."
    },
    // 신체적 불편감 - 신체손상 (점수: 9)
    { 
        mainCategory: "신체적 불편감",
        subCategory: "신체손상", 
        question: "아이 몸에 설명하기 어려운 상처가 있나요?", 
        originalScore: 9,
        userAnswer: "활발하게 놀다가 생기는 상처들은 있지만 의심스러운 건 없어요."
    },
    
    // 기분문제 - 즐거움 (점수: 6)
    { 
        mainCategory: "기분문제",
        subCategory: "즐거움", 
        question: "아이가 놀이나 활동을 즐거워하나요?", 
        originalScore: 6,
        userAnswer: "요즘 예전처럼 신나하지 않아요. 좋아하던 놀이도 금방 지루해해요."
    },
    // 기분문제 - 분노/짜증 (점수: 5)
    { 
        mainCategory: "기분문제",
        subCategory: "분노/짜증", 
        question: "아이가 화를 자주 내거나 짜증을 많이 내나요?", 
        originalScore: 5,
        userAnswer: "요즘 작은 일에도 화를 내고 떼를 써요. 예전보다 감정 조절이 어려워 보입니다."
    },
    
    // 자율신경계 - 수면 (점수: 7)
    { 
        mainCategory: "자율신경계",
        subCategory: "수면", 
        question: "아이가 밤에 잘 자나요?", 
        originalScore: 7,
        userAnswer: "가끔 악몽을 꾸거나 자다가 깨요. 잠들기까지 시간이 좀 걸리는 편이에요."
    },
    
    // 대인관계 - 어머니 (점수: 6)
    { 
        mainCategory: "대인관계",
        subCategory: "어머니", 
        question: "엄마와의 관계는 어떤가요?", 
        originalScore: 6,
        userAnswer: "대체로 좋지만, 제가 바쁠 때 아이가 서운해하는 것 같아요. 더 많은 시간을 함께 보내고 싶은데..."
    },
    // 대인관계 - 아버지 (점수: 7)
    { 
        mainCategory: "대인관계",
        subCategory: "아버지", 
        question: "아버지와의 관계는 어떤가요?", 
        originalScore: 7,
        userAnswer: "주말에는 함께 시간을 보내려고 노력해요. 아이도 아빠를 좋아하는 편입니다."
    },
    // 대인관계 - 친구 (점수: 8)
    { 
        mainCategory: "대인관계",
        subCategory: "친구", 
        question: "친구들과 잘 지내나요?", 
        originalScore: 8,
        userAnswer: "어린이집에서 친구들과 잘 놀아요. 활발하고 사교적인 편입니다."
    },
    
    // 기본생활 - 걱정 (점수: 5)
    { 
        mainCategory: "기본생활",
        subCategory: "걱정", 
        question: "아이가 걱정을 많이 하나요?", 
        originalScore: 5,
        userAnswer: "요즘 '엄마가 안 올까봐' 걱정을 많이 해요. 분리불안이 심해진 것 같습니다."
    },
    // 기본생활 - 행복 (점수: 6)
    { 
        mainCategory: "기본생활",
        subCategory: "행복", 
        question: "아이가 행복해 보이나요?", 
        originalScore: 6,
        userAnswer: "웃을 때도 있지만 예전만큼 밝지 않아요. 뭔가 시무룩한 날이 많아졌어요."
    },
    
    // 학대여부 - 방임 (점수: 8)
    { 
        mainCategory: "학대여부",
        subCategory: "방임", 
        question: "아이의 기본적인 돌봄(식사, 위생, 수면 등)을 잘 챙기고 있나요?", 
        originalScore: 8,
        userAnswer: "최대한 신경 쓰고 있어요. 가끔 바쁠 때 늦은 식사나 씻기는 일이 있지만 전반적으로는 잘 챙기고 있습니다."
    },
    // 학대여부 - 정서학대 (점수: 7)
    { 
        mainCategory: "학대여부",
        subCategory: "정서학대", 
        question: "아이에게 상처가 될 만한 말을 한 적이 있나요?", 
        originalScore: 7,
        userAnswer: "스트레스 받을 때 목소리가 커질 때가 있어요. 나중에 후회하고 사과하지만..."
    },
    // 학대여부 - 신체학대 (점수: 9)
    { 
        mainCategory: "학대여부",
        subCategory: "신체학대", 
        question: "아이에게 체벌을 가한 적이 있나요?", 
        originalScore: 9,
        userAnswer: "한두 번 정도 엉덩이를 가볍게 때린 적이 있어요. 그 후로는 하지 않고 있습니다."
    },
    
    // 응급 - 자해/자살 (점수: 10)
    { 
        mainCategory: "응급",
        subCategory: "자해/자살", 
        question: "아이가 자해를 하거나 죽고 싶다는 말을 한 적이 있나요?", 
        originalScore: 10,
        userAnswer: "그런 행동이나 말은 전혀 없었어요."
    },
    // 응급 - 트라우마 (점수: 6)
    { 
        mainCategory: "응급",
        subCategory: "트라우마", 
        question: "아이가 특정 상황에서 과도하게 무서워하거나 회피하나요?", 
        originalScore: 6,
        userAnswer: "큰 소리나 갑작스러운 움직음에 깜짝깜짝 놀라요. 예전에 없던 반응이에요."
    }
];

// subCategory별로 그룹화하는 함수
const getGroupedDataBySubCategory = (data) => {
    const grouped = {};
    
    data.forEach(item => {
        const key = `${item.mainCategory}-${item.subCategory}`;
        
        if (!grouped[key]) {
            grouped[key] = {
                mainCategory: item.mainCategory,
                subCategory: item.subCategory,
                questions: [],
                originalScore: item.originalScore, // 첫 번째 항목의 점수 사용
                adjustedScore: item.originalScore, // 초기값은 원점수와 동일
                allUserAnswers: []
            };
        }
        
        grouped[key].questions.push(item.question);
        grouped[key].allUserAnswers.push(`Q: ${item.question}\nA: ${item.userAnswer}`);
    });
    
    return grouped;
};

// 그룹화된 데이터 생성
let groupedAssessmentData = getGroupedDataBySubCategory(assessmentData);

// 평가 테이블 렌더링 (subCategory별로 그룹화)
const renderReviewTable = () => {
    const tbody = document.getElementById('reviewTableBody');
    if (!tbody) {
        console.error('Table body not found');
        return;
    }
    
    let html = '';
    let groupIndex = 0;
    
    // mainCategory별로 정렬
    const mainCategories = [...new Set(Object.values(groupedAssessmentData).map(item => item.mainCategory))];
    
    mainCategories.forEach(mainCategory => {
        const categoryGroups = Object.values(groupedAssessmentData)
            .filter(group => group.mainCategory === mainCategory);
        
        categoryGroups.forEach((group, localIndex) => {
            const scoreChange = group.adjustedScore - group.originalScore;
            const changeClass = scoreChange === 0 ? 'score-unchanged' : scoreChange > 0 ? 'score-increase' : 'score-decrease';
            const changeText = scoreChange === 0 ? '변경없음' : scoreChange > 0 ? '+' + scoreChange.toFixed(1) : scoreChange.toFixed(1);
            
            // 모든 질문과 답변을 하나의 문자열로 합치기
            const allQuestionsAndAnswers = group.allUserAnswers.join('\n\n');
            
            html += `
                <tr>
                    ${localIndex === 0 ? `<td class="main-category-cell" rowspan="${categoryGroups.length}">${group.mainCategory}</td>` : ''}
                    <td class="sub-category-cell">${group.subCategory}</td>
                    <td class="question-cell" onclick="toggleUserResponse(${groupIndex})" id="question-${groupIndex}">
                        ${group.questions.join(' / ')}
                        <div class="user-response-section" id="response-${groupIndex}">
                            <div class="user-response-content">
                                <div class="user-qa-container">
                                    <div class="user-answer">💬 관련 질문 및 응답:<br><pre style="white-space: pre-wrap; font-family: inherit; margin: 8px 0;">${allQuestionsAndAnswers}</pre></div>
                                </div>
                            </div>
                        </div>
                    </td>
                    <td style="text-align:center; font-weight:600;">${group.originalScore}</td>
                    <td style="text-align:center;">
                        <input type="number" class="score-input"
                            value="${group.adjustedScore}"
                            min="0" max="10" step="0.5"
                            onchange="updateScore(${groupIndex}, this.value)"
                        />
                    </td>
                    <td style="text-align:center;">
                        <span class="score-change ${changeClass}">
                            ${changeText}
                        </span>
                    </td>
                </tr>
            `;
            groupIndex++;
        });
    });
    
    tbody.innerHTML = html;
    updateStatistics();
};

// 사용자 응답 토글
const toggleUserResponse = (index) => {
    const responseSection = document.getElementById(`response-${index}`);
    const questionCell = document.getElementById(`question-${index}`);
    
    if (responseSection.classList.contains('show')) {
        responseSection.classList.remove('show');
        questionCell.classList.remove('expanded');
    } else {
        responseSection.classList.add('show');
        questionCell.classList.add('expanded');
    }
};

// 점수 업데이트
const updateScore = (index, newScore) => {
    let score = parseFloat(newScore);
    
    // 점수 범위 검증 및 제한
    if (isNaN(score) || score < 0) {
        score = 0;
    } else if (score > 10) {
        score = 10;
    }
    
    // 입력 필드의 값도 제한된 값으로 업데이트
    const inputElement = document.querySelector(`input[onchange*="${index}"]`);
    if (inputElement && parseFloat(inputElement.value) !== score) {
        inputElement.value = score;
    }

    // 그룹화된 데이터에서 해당 인덱스의 점수 업데이트
    const groupKeys = Object.keys(groupedAssessmentData);
    if (index < groupKeys.length) {
        groupedAssessmentData[groupKeys[index]].adjustedScore = score;
    }
    
    renderReviewTable();
};

// 통계 업데이트
const updateStatistics = () => {
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
    
    const feedbackData = {
        adjustedScores: groupedAssessmentData,
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
    alert('피드백이 임시저장되었습니다.');
};

// 페이지 로드시 초기화
document.addEventListener('DOMContentLoaded', () => {
    renderReviewTable();
});