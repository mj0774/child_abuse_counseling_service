const categoryData = [
    {
        id: 'physical_discomfort_pain',
        title: '신체적 불편감 - 통증',
        questions: [
            {
                id: 'pain_1',
                text: '현재 아동이 호소하는 신체적 통증이 있나요?',
                description: '머리, 복부, 관절 등 구체적인 통증 부위와 정도를 설명해주세요'
            },
            {
                id: 'pain_2', 
                text: '통증으로 인해 일상생활에 지장이 있나요?',
                description: '학교생활, 놀이활동, 수면 등에 미치는 영향을 설명해주세요'
            },
            {
                id: 'pain_3',
                text: '통증에 대한 적절한 치료나 관리를 받고 있나요?',
                description: '병원 방문, 약물 복용, 관리 방법 등을 구체적으로 설명해주세요'
            }
        ]
    },
    {
        id: 'physical_discomfort_injury',
        title: '신체적 불편감 - 신체손상',
        questions: [
            {
                id: 'injury_1',
                text: '아동에게 설명하기 어려운 상처나 멍이 발견된 적이 있나요?',
                description: '상처의 위치, 크기, 발생 경위 등을 자세히 설명해주세요'
            },
            {
                id: 'injury_2',
                text: '반복적으로 발생하는 부상이나 사고가 있나요?',
                description: '같은 부위의 반복적 손상이나 유사한 사고의 패턴을 설명해주세요'
            },
            {
                id: 'injury_3',
                text: '부상에 대한 아동의 설명과 실제 상처가 일치하나요?',
                description: '아동이 말하는 사고 경위와 상처의 양상이 맞는지 설명해주세요'
            }
        ]
    },
    {
        id: 'emotional_behavioral_change',
        title: '정서·행동적 문제 - 정서변화',
        questions: [
            {
                id: 'emotional_1',
                text: '최근 아동의 기분이나 정서에 변화가 있었나요?',
                description: '우울감, 불안감, 짜증, 위축 등의 정서적 변화를 구체적으로 설명해주세요'
            },
            {
                id: 'emotional_2',
                text: '아동이 평소보다 과도하게 예민하거나 민감한 반응을 보이나요?',
                description: '작은 자극에도 과민반응하거나 쉽게 놀라는 등의 행동을 설명해주세요'
            },
            {
                id: 'emotional_3',
                text: '아동이 자주 울거나 감정 조절에 어려움을 보이나요?',
                description: '감정 폭발, 지속적인 슬픔, 조절 불가능한 분노 등을 설명해주세요'
            }
        ]
    },
    {
        id: 'emotional_behavioral_behavior',
        title: '정서·행동적 문제 - 행동변화', 
        questions: [
            {
                id: 'behavioral_1',
                text: '아동의 행동 패턴에 급격한 변화가 있었나요?',
                description: '평소와 다른 행동, 퇴행, 공격성 등의 변화를 구체적으로 설명해주세요'
            },
            {
                id: 'behavioral_2',
                text: '아동이 특정 상황이나 사람을 회피하려는 행동을 보이나요?',
                description: '피하려는 상황이나 인물, 회피하는 방식 등을 설명해주세요'
            },
            {
                id: 'behavioral_3',
                text: '아동이 나이에 맞지 않는 성적 행동이나 지식을 보이나요?',
                description: '부적절한 성적 언어, 행동, 또래를 넘어서는 성적 지식 등을 설명해주세요'
            }
        ]
    }
];

let responses = {};
let currentPageIndex = 0;
const totalPages = categoryData.length;

const elements = {
    pagesContainer: document.getElementById('pagesContainer'),
    resultsSection: document.getElementById('resultsSection'),
    resultsTableBody: document.getElementById('resultsTableBody'),
    submitBtn: document.getElementById('submitBtn'),
    editBtn: document.getElementById('editBtn'),
    progressFill: document.getElementById('progressFill'),
    progressText: document.getElementById('progressText'),
    progressPercent: document.getElementById('progressPercent'),
    navList: document.getElementById('navList'),
    navSidebar: document.getElementById('navSidebar'),
    menuToggle: document.getElementById('menuToggle'),
    navOverlay: document.getElementById('navOverlay')
};

// 초기화
const init = () => {
    createNavigation();
    createPages();
    attachEventListeners();
    showCurrentPage();
};

const createNavigation = () => {
    categoryData.forEach((category, idx) => {
        const li = document.createElement('li');
        li.className = 'nav-item';
        li.innerHTML = `
            <div class="nav-item-number">${idx + 1}번</div>
            <div class="nav-item-title">${category.title}</div>
        `;
        li.onclick = () => goToPage(idx);
        elements.navList.appendChild(li);
    });
};

const createPages = () => {
    categoryData.forEach((category, pageIdx) => {
        const page = document.createElement('div');
        page.className = 'page-section';
        page.id = `page-${category.id}`;

        const questionsHtml = category.questions.map((q, qIdx) => `
            <div class="question-card ${qIdx > 0 ? 'disabled' : ''}" id="card-${q.id}">
                <div class="question-number">${qIdx + 1}번 질문</div>
                <div class="question-text">${q.text}</div>
                <div class="question-description">${q.description}</div>
                <textarea class="text-input" id="input-${q.id}" placeholder="구체적으로 입력해 주세요..." ${qIdx > 0 ? 'disabled' : ''}></textarea>
                <button class="skip-question-btn" onclick="skipQuestion('${q.id}', ${pageIdx}, ${qIdx})" ${qIdx > 0 ? 'disabled' : ''}>
                    <i class="fas fa-forward"></i> 이 질문 건너뛰기
                </button>
            </div>
        `).join('');

        const isLastPage = pageIdx === categoryData.length - 1;

        page.innerHTML = `
            <div class="page-header">
                <div class="page-title">${category.title}</div>
                <div class="page-subtitle">아래 질문들에 답변해 주세요</div>
                <button class="skip-area-btn" onclick="skipPage(${pageIdx})">
                    <i class="fas fa-forward"></i> 이 영역 전체 건너뛰기
                </button>
            </div>
            ${questionsHtml}
            <div class="button-group">
                <button class="assessment-btn btn-primary" onclick="nextPage(${pageIdx})" disabled id="next-page-${pageIdx}">
                    <i class="fas fa-arrow-right"></i> ${isLastPage ? '결과 보기' : '다음 영역으로'}
                </button>
            </div>
        `;

        elements.pagesContainer.appendChild(page);
    });
};

const attachEventListeners = () => {
    categoryData.forEach((category, pageIdx) => {
        category.questions.forEach((q, qIdx) => {
            const input = document.getElementById(`input-${q.id}`);
            input.addEventListener('input', () => handleQuestionInput(q.id, pageIdx, qIdx));
        });
    });

    elements.submitBtn.addEventListener('click', handleSubmit);
    elements.editBtn.addEventListener('click', handleEdit);
    elements.menuToggle.addEventListener('click', toggleNavigation);
    elements.navOverlay.addEventListener('click', closeNavigation);

    // ESC 키로 네비게이션 닫기
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && elements.navSidebar.classList.contains('open')) {
            closeNavigation();
        }
    });
};

const handleQuestionInput = (questionId, pageIdx, questionIdx) => {
    const category = categoryData[pageIdx];
    const question = category.questions[questionIdx];
    const input = document.getElementById(`input-${questionId}`);
    const card = document.getElementById(`card-${questionId}`);
    
    if (input.value.trim().length > 0) {
        // 답변 저장
        responses[questionId] = {
            question: question.text,
            answer: input.value.trim(),
            categoryTitle: category.title
        };
        input.classList.add('completed');
        card.classList.remove('skipped'); // 답변하면 건너뛰기 상태 해제

        // 다음 질문 활성화 (순차적으로)
        activateNextQuestion(pageIdx, questionIdx);
    } else {
        // 답변 삭제
        delete responses[questionId];
        input.classList.remove('completed');

        // 답변을 지우면 다음 질문들을 비활성화만 함 (초기화하지 않음)
        deactivateQuestionsAfter(pageIdx, questionIdx);
    }

    checkPageCompletion(pageIdx);
};

const getLastAnsweredIndex = (pageIdx) => {
    const category = categoryData[pageIdx];
    let lastIdx = -1;
    category.questions.forEach((q, idx) => {
        if (responses[q.id] && responses[q.id].answer.trim().length > 0) {
            lastIdx = idx;
        }
    });
    return lastIdx;
};

// 다음 질문 하나만 활성화 (순차적으로)
const activateNextQuestion = (pageIdx, questionIdx) => {
    const category = categoryData[pageIdx];
    
    // 다음 질문이 있는 경우에만 활성화
    if (questionIdx + 1 < category.questions.length) {
        const nextQuestion = category.questions[questionIdx + 1];
        const nextInput = document.getElementById(`input-${nextQuestion.id}`);
        const nextCard = document.getElementById(`card-${nextQuestion.id}`);
        const nextSkipBtn = document.querySelector(`#card-${nextQuestion.id} .skip-question-btn`);
        
        nextInput.disabled = false;
        nextCard.classList.remove('disabled');
        nextSkipBtn.disabled = false;
    }
};

const deactivateAllNextQuestions = (pageIdx) => {
    const category = categoryData[pageIdx];
    category.questions.forEach((q, idx) => {
        if (idx > 0) {
            const input = document.getElementById(`input-${q.id}`);
            const card = document.getElementById(`card-${q.id}`);
            const skipBtn = document.querySelector(`#card-${q.id} .skip-question-btn`);
            input.disabled = true;
            card.classList.add('disabled');
            skipBtn.disabled = true;
            // 답변과 상태는 유지하고 비활성화만 함
        }
    });
};

const deactivateQuestionsAfter = (pageIdx, fromIndex) => {
    const category = categoryData[pageIdx];
    for (let i = fromIndex + 1; i < category.questions.length; i++) {
        const q = category.questions[i];
        const input = document.getElementById(`input-${q.id}`);
        const card = document.getElementById(`card-${q.id}`);
        const skipBtn = document.querySelector(`#card-${q.id} .skip-question-btn`);
        input.disabled = true;
        card.classList.add('disabled');
        skipBtn.disabled = true;
        // 답변과 상태는 유지하지만 비활성화만 함
    }
};

const checkPageCompletion = (pageIdx) => {
    const category = categoryData[pageIdx];
    const nextBtn = document.getElementById(`next-page-${pageIdx}`);
    
    // 현재 활성화된 질문들 중에서 답변되지 않은 것이 있는지 확인
    let hasUnansweredActiveQuestion = false;
    
    category.questions.forEach(q => {
        const input = document.getElementById(`input-${q.id}`);
        const card = document.getElementById(`card-${q.id}`);
        
        // 활성화되어 있고, 답변도 없고, 건너뛰지도 않은 질문이 있으면
        if (!input.disabled && !input.value.trim() && !card.classList.contains('skipped')) {
            hasUnansweredActiveQuestion = true;
        }
    });
    
    // 활성화된 모든 질문이 답변되었거나 건너뛰어졌으면 다음으로 진행 가능
    nextBtn.disabled = hasUnansweredActiveQuestion;
};

const skipQuestion = (questionId, pageIdx, questionIdx) => {
    const category = categoryData[pageIdx];
    const input = document.getElementById(`input-${questionId}`);
    const card = document.getElementById(`card-${questionId}`);
    
    // 현재 질문에 답변이 있는지 확인
    if (input.value.trim().length > 0) {
        const confirmSkip = confirm('이 질문에 답변이 작성되어 있습니다.\n\n그래도 이 질문을 건너뛰시겠습니까?\n입력된 답변은 저장되지 않습니다.');
        if (!confirmSkip) return;
    }
    
    // 답변 삭제 및 건너뛰기 상태로 설정
    delete responses[questionId];
    input.value = '';
    input.classList.remove('completed');
    card.classList.add('skipped');
    
    // 건너뛴 질문 이후의 모든 질문들을 비활성화 (건너뛰면 더 이상 진행 불가)
    deactivateQuestionsAfter(pageIdx, questionIdx);
    
    checkPageCompletion(pageIdx);
};

const activateAllNextQuestions = (pageIdx) => {
    const category = categoryData[pageIdx];
    category.questions.forEach((q, idx) => {
        if (idx > 0) {
            const input = document.getElementById(`input-${q.id}`);
            const card = document.getElementById(`card-${q.id}`);
            const skipBtn = document.querySelector(`#card-${q.id} .skip-question-btn`);
            input.disabled = false;
            card.classList.remove('disabled');
            skipBtn.disabled = false;
        }
    });
};

const showCurrentPage = () => {
    // 모든 페이지 숨기기
    document.querySelectorAll('.page-section').forEach(page => page.classList.remove('active'));
    
    // 네비게이션 활성화 상태 업데이트
    document.querySelectorAll('.nav-item').forEach((item, idx) => {
        item.classList.toggle('active', idx === currentPageIndex);
    });

    if (currentPageIndex < totalPages) {
        const category = categoryData[currentPageIndex];
        document.getElementById(`page-${category.id}`).classList.add('active');
        updateProgress();
    } else {
        showResults();
    }
};

const nextPage = (pageIdx) => {
    currentPageIndex++;
    showCurrentPage();
};

const skipPage = (pageIdx) => {
    const category = categoryData[pageIdx];
    
    // 현재 페이지에 답변이 있는지 확인
    const answeredQuestions = [];
    category.questions.forEach((q, idx) => {
        const input = document.getElementById(`input-${q.id}`);
        if (input.value.trim().length > 0) {
            answeredQuestions.push(`${idx + 1}번`);
        }
    });

    if (answeredQuestions.length > 0) {
        const questionsList = answeredQuestions.join(', ');
        const confirmSkip = confirm(`이 영역의 ${questionsList} 질문에 답변이 작성되어 있습니다.\n\n그래도 이 영역을 건너뛰시겠습니까?\n입력된 답변들은 저장되지 않습니다.`);
        if (!confirmSkip) return;
    }

    // 모든 질문을 건너뛰기 상태로 설정
    category.questions.forEach(q => {
        const input = document.getElementById(`input-${q.id}`);
        const card = document.getElementById(`card-${q.id}`);
        delete responses[q.id];
        input.value = '';
        input.classList.remove('completed');
        card.classList.add('skipped');
    });

    currentPageIndex++;
    showCurrentPage();
};

const goToPage = (pageIndex) => {
    elements.resultsSection.classList.remove('visible');
    currentPageIndex = pageIndex;
    showCurrentPage();
    closeNavigation(); // 페이지 이동 시 네비게이션 닫기
};

const updateProgress = () => {
    const progress = Math.round((currentPageIndex / totalPages) * 100);
    elements.progressFill.style.width = `${progress}%`;
    elements.progressText.textContent = `영역 ${currentPageIndex}/${totalPages}`;
    elements.progressPercent.textContent = `${progress}%`;
};

const showResults = () => {
    elements.progressFill.style.width = '100%';
    elements.progressText.textContent = `영역 ${totalPages}/${totalPages}`;
    elements.progressPercent.textContent = '100%';

    const tbody = elements.resultsTableBody;
    tbody.innerHTML = '';

    categoryData.forEach(category => {
        // 카테고리 헤더
        const categoryTr = document.createElement('tr');
        categoryTr.innerHTML = `
            <td colspan="2" class="category-answer">
                ${category.title}
            </td>
        `;
        tbody.appendChild(categoryTr);

        // 질문들
        category.questions.forEach((q, idx) => {
            const tr = document.createElement('tr');
            if (responses[q.id]) {
                tr.innerHTML = `
                    <td>${idx + 1}번. ${responses[q.id].question}</td>
                    <td>${responses[q.id].answer}</td>
                `;
            } else {
                tr.innerHTML = `
                    <td>${idx + 1}번. ${q.text}</td>
                    <td style="color:#9ca3af;font-style:italic;">건너뛰었음</td>
                `;
            }
            tbody.appendChild(tr);
        });
    });

    elements.resultsSection.classList.add('visible');
};

const handleEdit = () => {
    // 결과 섹션 숨기고 첫 번째 페이지로 돌아가기
    elements.resultsSection.classList.remove('visible');
    currentPageIndex = 0;
    
    // 모든 페이지 숨기기
    document.querySelectorAll('.page-section').forEach(page => page.classList.remove('active'));
    
    // 첫 번째 페이지 보여주기
    const firstCategory = categoryData[0];
    document.getElementById(`page-${firstCategory.id}`).classList.add('active');
    
    // 네비게이션 상태 업데이트
    document.querySelectorAll('.nav-item').forEach((item, idx) => {
        item.classList.toggle('active', idx === 0);
    });
    
    // 진행률 업데이트
    updateProgress();
};

// 백엔드로 데이터 전송하는 함수 (수정됨)
// question.js의 handleSubmit 함수
const handleSubmit = async () => {
    console.log('handleSubmit called');
    // 제출 버튼 비활성화 및 로딩 상태 표시
    elements.submitBtn.disabled = true;
    elements.submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 제출 중...';

    try {
        // 💡 1. undefined 또는 null 값을 가진 응답을 필터링합니다.
        const filteredResponses = {};
        for (const questionId in responses) {
            if (responses[questionId] && responses[questionId].answer !== null && responses[questionId].answer !== undefined) {
                filteredResponses[questionId] = responses[questionId];
            }
        }
        
        // 💡 2. 총 질문 수를 계산합니다.
        const totalQuestions = categoryData.reduce((total, category) => total + category.questions.length, 0);

        // 💡 3. 필터링된 데이터로 submissionData를 재구성합니다.
        const submissionData = {
            timestamp: new Date().toISOString(),
            responses: filteredResponses,
            summary: {
                totalQuestions: totalQuestions,
                answeredQuestions: Object.keys(filteredResponses).length,
                skippedQuestions: totalQuestions - Object.keys(filteredResponses).length,
                categories: getCategorySummary(filteredResponses)
            }
        };
        
        // 플라스크 백엔드로 POST 요청
        const response = await fetch('/api/submit-assessment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(submissionData)
        });

        if (response.ok) {
            const result = await response.json();
            
            if (result.success) {
                // AI 분석 결과를 sessionStorage에 저장
                sessionStorage.setItem('assessmentAnalysis', JSON.stringify(result.analysis));
                
                // 결과 페이지로 리다이렉트
                window.location.href = '/result';
            } else {
                throw new Error(result.message || '제출 중 오류가 발생했습니다.');
            }
        } else {
            throw new Error(`서버 오류: ${response.status}`);
        }

    } catch (error) {
        console.error('제출 오류:', error);
        alert(`제출 중 오류가 발생했습니다: ${error.message}`);
    } finally {
        // 제출 버튼 원래 상태로 복구
        elements.submitBtn.disabled = false;
        elements.submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> 제출하기';
    }
};


// 💡 getCategorySummary 함수를 수정하여 responses를 인자로 받도록 합니다.
const getCategorySummary = (currentResponses) => {
    return categoryData.map(category => ({
        id: category.id,
        title: category.title,
        totalQuestions: category.questions.length,
        answeredQuestions: category.questions.filter(q => currentResponses[q.id]).length,
        answers: category.questions.map(q => ({
            questionId: q.id,
            question: q.text,
            answer: currentResponses[q.id] ? currentResponses[q.id].answer : null,
            skipped: !currentResponses[q.id]
        }))
    }));
};


const toggleNavigation = () => {
    const isOpen = elements.navSidebar.classList.contains('open');
    if (isOpen) {
        closeNavigation();
    } else {
        openNavigation();
    }
};

const openNavigation = () => {
    elements.navSidebar.classList.add('open');
    elements.navOverlay.classList.add('show');
    elements.menuToggle.classList.add('active');
};

const closeNavigation = () => {
    elements.navSidebar.classList.remove('open');
    elements.navOverlay.classList.remove('show');
    elements.menuToggle.classList.remove('active');
};

// 전역 함수로 노출
window.skipPage = skipPage;
window.skipQuestion = skipQuestion;
window.nextPage = nextPage;

// 페이지 로드 완료 후 초기화
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}