const categoryData = [
    {
        id: 'pain',
        title: '신체적 불편감 - 통증',
        questions: [
            {
                id: 'pain_1',
                text: '최근에 아픈 곳이 있나요?',
                description: '언제, 어디가 아팠는지, 아픈 이유와 내용에 대해서 적어주세요.'
            },
            {
                id: 'pain_2',
                text: '언제, 어디가 아팠나요?',
                description: '아픈 시기와 구체적인 부위를 자세히 설명해 주세요.'
            },
            {
                id: 'pain_3',
                text: '아픈 이유와 내용에 대해서 적어주세요.',
                description: '통증의 원인이나 어떤 종류의 아픔인지 설명해 주세요.'
            }
        ]
    },
    {
        id: 'injury',
        title: '신체적 불편감 - 신체손상',
        questions: [
            {
                id: 'injury_1',
                text: '최근에 다친 적이 있나요?',
                description: '언제, 어디를 다쳤는지, 다친 이유와 내용에 대해서 적어주세요.'
            },
            {
                id: 'injury_2',
                text: '언제, 어디를 다쳤나요?',
                description: '다친 시기와 구체적인 부위를 자세히 설명해 주세요.'
            },
            {
                id: 'injury_3',
                text: '다친 이유와 내용에 대해서 적어주세요.',
                description: '사고 경위나 다친 과정을 구체적으로 설명해 주세요.'
            }
        ]
    },
    {
        id: 'joy',
        title: '기분문제 - 즐거움',
        questions: [
            {
                id: 'joy_1',
                text: '무엇을 할 때 즐겁나요?',
                description: '즐거운 활동이나 상황에 대해 구체적으로 설명해 주세요.'
            },
            {
                id: 'joy_2',
                text: '어떤 점이 즐겁나요?',
                description: '그 활동의 어떤 부분에서 즐거움을 느끼는지 설명해 주세요.'
            },
            {
                id: 'joy_3',
                text: '즐겁지 못한 이유와 내용에 대해서 적어주세요.',
                description: '즐거움을 느끼기 어려운 상황이나 이유가 있다면 설명해 주세요.'
            }
        ]
    },
    {
        id: 'anger',
        title: '기분문제 - 분노/짜증',
        questions: [
            {
                id: 'anger_1',
                text: '최근 일주일 동안 짜증이나 화가 난 적이 있나요?',
                description: '화가 났던 구체적인 상황을 설명해 주세요.'
            },
            {
                id: 'anger_2',
                text: '그런 일이 자주 일어나나요?',
                description: '짜증이나 화가 나는 일이 얼마나 자주 있는지 설명해 주세요.'
            },
            {
                id: 'anger_3',
                text: '짜증이나 화가 났을 때 어떻게 푸는지 적어주세요.',
                description: '화를 풀거나 달래는 나만의 방법이 있는지 설명해 주세요.'
            }
        ]
    },
    {
        id: 'sleep',
        title: '자율신경계 - 수면',
        questions: [
            {
                id: 'sleep_1',
                text: '보통 몇 시에 자고 몇 시에 일어나나요?',
                description: '평소 취침 시간과 기상 시간을 구체적으로 적어주세요.'
            },
            {
                id: 'sleep_2',
                text: '아침에 일어나면 몸 상태는 어때요?',
                description: '잠에서 깨었을 때의 컨디션이나 기분을 설명해 주세요.'
            },
            {
                id: 'sleep_3',
                text: '평소에 잠들기 힘들거나 중간에 깨나요?',
                description: '잠들기까지 걸리는 시간이나 밤에 자주 깨는지 설명해 주세요.'
            }
        ]
    },
    {
        id: 'father',
        title: '대인관계 - 아버지',
        questions: [
            {
                id: 'father_1',
                text: '평소 아빠는 어떤 표정을 자주 짓나요?',
                description: '아버지의 평상시 표정이나 모습을 구체적으로 설명해 주세요.'
            },
            {
                id: 'father_2',
                text: '아빠가 왜 그런 표정을 짓는 것 같나요?',
                description: '아버지가 그런 표정을 짓는 이유에 대해 생각하는 바를 적어주세요.'
            },
            {
                id: 'father_3',
                text: '그 표정을 볼 때 기분이 어떤가요?',
                description: '아버지의 표정을 볼 때 드는 감정을 솔직하게 적어주세요.'
            }
        ]
    },
    {
        id: 'mother',
        title: '대인관계 - 어머니',
        questions: [
            {
                id: 'mother_1',
                text: '평소 엄마는 어떤 표정을 자주 짓나요?',
                description: '어머니의 평상시 표정이나 모습을 구체적으로 설명해 주세요.'
            },
            {
                id: 'mother_2',
                text: '엄마가 왜 그런 표정을 짓는 것 같나요?',
                description: '어머니가 그런 표정을 짓는 이유에 대해 생각하는 바를 적어주세요.'
            },
            {
                id: 'mother_3',
                text: '그 표정을 볼 때 기분이 어떤가요?',
                description: '어머니의 표정을 볼 때 드는 감정을 솔직하게 적어주세요.'
            }
        ]
    },
    {
        id: 'caregiver',
        title: '대인관계 - 기타보호자',
        questions: [
            {
                id: 'caregiver_1',
                text: '부모님 외에 나를 돌봐주시는 어른이 있나요?',
                description: '할머니, 할아버지, 이모, 삼촌 등 나를 돌봐주시는 분이 있는지 적어주세요.'
            },
            {
                id: 'caregiver_2',
                text: '그 분은 어떤 표정을 자주 짓나요?',
                description: '그 분의 평상시 표정이나 모습을 구체적으로 설명해 주세요.'
            },
            {
                id: 'caregiver_3',
                text: '그런 표정을 볼 때 기분이 어떤가요?',
                description: '그 분의 표정을 볼 때 드는 감정을 솔직하게 적어주세요.'
            }
        ]
    },
    {
        id: 'siblings',
        title: '대인관계 - 형제/자매',
        questions: [
            {
                id: 'siblings_1',
                text: '형제 자매가 있나요? 있다면 몇 명인가요?',
                description: '형, 누나, 동생이 몇 명인지 구체적으로 적어주세요.'
            },
            {
                id: 'siblings_2',
                text: '사이가 어때요?',
                description: '형제자매와의 관계가 좋은지 나쁜지, 어떤 점에서 그런지 설명해 주세요.'
            },
            {
                id: 'siblings_3',
                text: '부모님이 차별하는 것 같나요?',
                description: '부모님이 나와 형제자매를 다르게 대하는 것 같은지 적어주세요.'
            }
        ]
    },
    {
        id: 'friends',
        title: '대인관계 - 친구',
        questions: [
            {
                id: 'friends_1',
                text: '친구들이랑 주로 뭐 하고 놀아요?',
                description: '친구들과 함께 하는 놀이나 활동을 구체적으로 설명해 주세요.'
            },
            {
                id: 'friends_2',
                text: '주로 몇 명이서 놀아요?',
                description: '보통 몇 명의 친구들과 함께 지내는지 적어주세요.'
            },
            {
                id: 'friends_3',
                text: '친구들과 사이가 어떤가요?',
                description: '친구들과의 관계가 좋은지, 어떤 점에서 그런지 설명해 주세요.'
            }
        ]
    },
    {
        id: 'teacher',
        title: '대인관계 - 교사',
        questions: [
            {
                id: 'teacher_1',
                text: '담임선생님은 어떤가요?',
                description: '담임선생님의 성격이나 평상시 모습을 설명해 주세요.'
            },
            {
                id: 'teacher_2',
                text: '어떤 점이 좋은가요?',
                description: '선생님의 좋은 점이나 마음에 드는 점을 적어주세요.'
            },
            {
                id: 'teacher_3',
                text: '차별하거나 불편함을 느끼진 않나요?',
                description: '선생님이 학생들을 차별하거나 불편하게 하는 일이 있는지 적어주세요.'
            }
        ]
    },
    {
        id: 'worry',
        title: '기본생활 - 걱정',
        questions: [
            {
                id: 'worry_1',
                text: '요즘 큰 걱정거리가 무엇인가요?',
                description: '현재 가장 걱정되는 일이나 문제를 구체적으로 적어주세요.'
            },
            {
                id: 'worry_2',
                text: '그런 걱정을 하는 이유는 무엇인가요? 그리고 어떤 점이 걱정이 되나요?',
                description: '왜 그런 걱정을 하게 되었는지, 구체적으로 어떤 부분이 걱정인지 설명해 주세요.'
            },
            {
                id: 'worry_3',
                text: '걱정때문에 불편함을 느끼나요? 있다면 몇 번 정도인가요?',
                description: '걱정으로 인해 일상생활에 지장이 있는지, 얼마나 자주 그런지 적어주세요.'
            }
        ]
    },
    {
        id: 'happiness',
        title: '기본생활 - 행복',
        questions: [
            {
                id: 'happiness_1',
                text: '요즘 행복하다고 느끼나요? 불행하다고 느끼나요?',
                description: '현재 자신의 행복 정도를 솔직하게 표현해 주세요.'
            },
            {
                id: 'happiness_2',
                text: '어떤 점에서 그렇게 느끼나요?',
                description: '행복하거나 불행하다고 느끼는 구체적인 이유를 설명해 주세요.'
            },
            {
                id: 'happiness_3',
                text: '어떻게하면 행복해질 수 있을까요?',
                description: '더 행복해지기 위해 필요한 것이나 하고 싶은 것을 적어주세요.'
            }
        ]
    },
    {
        id: 'future',
        title: '기본생활 - 미래/진로',
        questions: [
            {
                id: 'future_1',
                text: '커서 어떤 사람이 되고 싶나요?',
                description: '장래 희망이나 되고 싶은 어른의 모습을 구체적으로 적어주세요.'
            },
            {
                id: 'future_2',
                text: '되고 싶은 이유가 있나요?',
                description: '왜 그런 사람이 되고 싶은지, 특별한 이유가 있다면 적어주세요.'
            },
            {
                id: 'future_3',
                text: '해보고 싶은 일이 있나요?',
                description: '앞으로 도전해보고 싶은 일이나 경험하고 싶은 것을 적어주세요.'
            }
        ]
    },
    {
        id: 'neglect',
        title: '학대여부 - 방임',
        questions: [
            {
                id: 'neglect_1',
                text: '집에서 주로 나를 돌봐주는 어른이 누구인가요?',
                description: '일상적으로 나를 돌봐주시는 분이 누구인지 적어주세요.'
            },
            {
                id: 'neglect_2',
                text: '배가 고픈데 먹을 게 없어서 굶은 적이 있나요?',
                description: '식사를 거르거나 굶었던 경험이 있다면 언제, 왜 그랬는지 적어주세요.'
            },
            {
                id: 'neglect_3',
                text: '아픈 곳이 있는데 혼자 있던 적이 있나요?',
                description: '아프거나 도움이 필요할 때 어른이 없어서 혼자 있었던 적이 있는지 적어주세요.'
            }
        ]
    },
    {
        id: 'emotional_abuse',
        title: '학대여부 - 정서학대',
        questions: [
            {
                id: 'emotional_abuse_1',
                text: '부모님이나 선생님 때문에 슬프거나 화난 적이 있나요?',
                description: '어른들의 말이나 행동 때문에 상처받은 경험이 있다면 적어주세요.'
            },
            {
                id: 'emotional_abuse_2',
                text: '내가 무엇을 하려고하면 무조건 안 된다고 하거나 하기 싫은 일을 시킨 적이 있나요?',
                description: '과도하게 금지당하거나 억압받은 경험이 있다면 구체적으로 적어주세요.'
            },
            {
                id: 'emotional_abuse_3',
                text: '어른들이 어디에 가두고 못 나오게 한 적이 있나요?',
                description: '방이나 특정 장소에 갇혔던 경험이 있다면 언제, 왜 그랬는지 적어주세요.'
            }
        ]
    },
    {
        id: 'physical_abuse',
        title: '학대여부 - 신체학대',
        questions: [
            {
                id: 'physical_abuse_1',
                text: '주위 어른들 중 때리는 사람이 있나요?',
                description: '나를 때리는 어른이 있다면 누구인지, 어떤 상황에서 그런지 적어주세요.'
            },
            {
                id: 'physical_abuse_2',
                text: '주로 혼날 땐 어떻게 혼나요?',
                description: '꾸중을 들을 때 어떤 방식으로 혼나는지 구체적으로 적어주세요.'
            },
            {
                id: 'physical_abuse_3',
                text: '어느 부위를 맞았나요?',
                description: '맞은 적이 있다면 어디를 맞았는지, 얼마나 아팠는지 적어주세요.'
            }
        ]
    },
    {
        id: 'sexual_abuse',
        title: '학대여부 - 성학대',
        questions: [
            {
                id: 'sexual_abuse_1',
                text: '내가 원하지 않는데 누군가가 내 몸을 만지거나 보여달라고 한 적 있나요?',
                description: '불편하거나 싫었던 신체 접촉이 있었다면 언제, 누가 그랬는지 적어주세요.'
            },
            {
                id: 'sexual_abuse_2',
                text: '중요한 신체 부위를 사진이나 영상으로 찍어 누구에게 보내거나 인터넷에 올린 적 있나요?',
                description: '나의 사진이나 영상과 관련된 불편한 경험이 있다면 적어주세요.'
            },
            {
                id: 'sexual_abuse_3',
                text: '내가 싫다고 말했는데도 계속해서 연락하거나 따라다니는 사람이 있나요?',
                description: '거부 의사를 표현했음에도 계속 괴롭히는 사람이 있다면 적어주세요.'
            }
        ]
    },
    {
        id: 'domestic_violence',
        title: '응급 - 가정폭력',
        questions: [
            {
                id: 'domestic_violence_1',
                text: '집에서 어른들끼리 소리 지르면서 싸우는 걸 듣거나 본 적이 있나요?',
                description: '가족들이 싸우는 모습을 본 경험이 있다면 언제, 어떤 상황이었는지 적어주세요.'
            },
            {
                id: 'domestic_violence_2',
                text: '누가 어떻게 싸웠었나요? 얼마나 자주 그런 일이 있나요?',
                description: '누가 누구와 어떤 방식으로 싸웠는지, 얼마나 자주 일어나는지 적어주세요.'
            },
            {
                id: 'domestic_violence_3',
                text: '어른들끼리 싸우면서 나한테 화풀이한 적이 있다면 어떤 일이 있었는지 적어주세요.',
                description: '가족들이 싸운 후 나에게 화풀이를 한 경험이 있다면 구체적으로 적어주세요.'
            }
        ]
    },
    {
        id: 'school_violence',
        title: '응급 - 학교폭력',
        questions: [
            {
                id: 'school_violence_1',
                text: '친구들이 나를 자주 놀리거나 괴롭힌다고 느낀 적이 있나요?',
                description: '학교에서 친구들에게 괴롭힘을 당한 경험이 있다면 적어주세요.'
            },
            {
                id: 'school_violence_2',
                text: '어떻게 놀리거나 괴롭혔는지 적어주세요.',
                description: '구체적으로 어떤 방식으로 괴롭힘을 당했는지 자세히 적어주세요.'
            },
            {
                id: 'school_violence_3',
                text: '친구들이 놀리거나 괴롭힐 때 어떤 기분이 들었나요?',
                description: '괴롭힘을 당할 때의 감정이나 기분을 솔직하게 표현해 주세요.'
            }
        ]
    },
    {
        id: 'self_harm_suicide',
        title: '응급 - 자해/자살',
        questions: [
            {
                id: 'self_harm_suicide_1',
                text: '어떨 때 마음이 복잡하거나 힘든가요?',
                description: '마음이 힘들어지는 상황이나 순간을 구체적으로 설명해 주세요.'
            },
            {
                id: 'self_harm_suicide_2',
                text: '안 좋은 기억 때문에 괴로워서 스스로를 해치고 싶다 생각해 본 적이 있나요?',
                description: '자해 충동이나 생각이 든 적이 있다면 언제, 왜 그랬는지 적어주세요.'
            },
            {
                id: 'self_harm_suicide_3',
                text: '죽기 위한 계획을 구체적으로 세워 본 적이 있나요?',
                description: '자살에 대한 구체적인 생각이나 계획을 해본 적이 있다면 적어주세요.'
            }
        ]
    },
    {
        id: 'trauma',
        title: '응급 - 트라우마',
        questions: [
            {
                id: 'trauma_1',
                text: '잠잘 때 주로 어떤 꿈을 꾸나요?',
                description: '자주 꾸는 꿈이나 반복되는 꿈이 있다면 어떤 내용인지 적어주세요.'
            },
            {
                id: 'trauma_2',
                text: '생각하고 싶지 않은데도 자꾸 안 좋은 기억이 떠오른 적이 있나요?',
                description: '원하지 않는 기억이나 생각이 자꾸 떠오르는 경험이 있다면 적어주세요.'
            },
            {
                id: 'trauma_3',
                text: '꿈을 꾸고 일어나면 몸 상태가 어떤가요?',
                description: '악몽을 꾸거나 꿈을 꾼 후 일어날 때의 몸 상태를 설명해 주세요.'
            }
        ]
    },
    {
        id: 'runaway',
        title: '응급 - 가출',
        questions: [
            {
                id: 'runaway_1',
                text: '부모님의 허락 없이 또는 말도 없이 오랫동안 집에서 나와 있었던 적이 있나요?',
                description: '가출 경험이 있다면 언제, 왜, 어디서 지냈는지 적어주세요.'
            },
            {
                id: 'runaway_2',
                text: '친한 친구 중 가출한 친구가 있나요?',
                description: '주변 친구들 중에 가출한 친구가 있는지, 그 친구는 어떤 상황인지 적어주세요.'
            },
            {
                id: 'runaway_3',
                text: '친구 따라서 가출하고 싶다고 생각한 적 있어?',
                description: '친구를 따라 가출하고 싶다는 생각을 해본 적이 있는지 적어주세요.'
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

    // 마지막 "다음 영역" 버튼으로 스크롤
    const nextBtn = document.getElementById(`next-page-${pageIdx}`);
    if (nextBtn) {
        nextBtn.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
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
    // 다음 문제로 넘어갈 때 맨 위로 스크롤
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
const handleSubmit = async () => {
    // 제출 버튼 비활성화 및 로딩 상태 표시
    elements.submitBtn.disabled = true;
    elements.submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 제출 중...';

    try {
        // 답변 데이터를 백엔드 친화적인 형태로 변환
        const submissionData = {
            timestamp: new Date().toISOString(),
            responses: responses,
            summary: {
                totalQuestions: getTotalQuestions(),
                answeredQuestions: Object.keys(responses).length,
                skippedQuestions: getTotalQuestions() - Object.keys(responses).length,
                categories: getCategorySummary()
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
            
            // 성공 시 처리
            if (result.success) {
                alert('평가가 성공적으로 제출되었습니다.');
                console.log('제출 결과:', result);
                
                // AI 분석 결과가 있다면 콘솔에 출력 (개발용)
                if (result.analysis) {
                    console.log('AI 분석 결과:', result.analysis);
                    
                    // 간단한 알림으로 분석 결과 표시
                    const analysisText = `
분석 완료!

위험도: ${result.analysis.riskLevel || '평가 중'}
주요 발견사항: ${result.analysis.findings ? result.analysis.findings.join(', ') : '분석 중'}
권장사항: ${result.analysis.recommendations ? result.analysis.recommendations.join(', ') : '권장사항 생성 중'}
                    `;
                    alert(analysisText);
                }
                
                // 필요시 결과 페이지로 리다이렉트
                if (result.redirectUrl) {
                    window.location.href = result.redirectUrl;
                }
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

// 총 질문 수 계산
const getTotalQuestions = () => {
    return categoryData.reduce((total, category) => total + category.questions.length, 0);
};

// 카테고리별 요약 정보 생성
const getCategorySummary = () => {
    return categoryData.map(category => ({
        id: category.id,
        title: category.title,
        totalQuestions: category.questions.length,
        answeredQuestions: category.questions.filter(q => responses[q.id]).length,
        answers: category.questions.map(q => ({
            questionId: q.id,
            question: q.text,
            answer: responses[q.id] ? responses[q.id].answer : null,
            skipped: !responses[q.id]
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