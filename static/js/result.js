// 세부 평가 데이터 (두 번째 HTML 파일과 동일한 구조)
const assessmentData = [
    // 신체적 불편감
    {
        mainCategory: "신체적 불편감",
        subCategory: "통증",
        question: "아동이 신체적 통증을 호소하는가?",
        score: 8
    },
    {
        mainCategory: "신체적 불편감",
        subCategory: "통증",
        question: "아동이 통증으로 인해 활동을 제한하는가?",
        score: 7
    },
    { 
        mainCategory: "신체적 불편감",
        subCategory: "신체손상", 
        question: "아동에게 원인 불명의 상처나 멍이 있는가?", 
        score: 9
    },
    
    // 기분문제
    { 
        mainCategory: "기분문제",
        subCategory: "즐거움", 
        question: "아동이 일상 활동에서 즐거움을 느끼는가?", 
        score: 6
    },
    { 
        mainCategory: "기분문제",
        subCategory: "분노/짜증", 
        question: "아동이 과도한 분노나 짜증을 보이는가?", 
        score: 5
    },
    
    // 자율신경계
    { 
        mainCategory: "자율신경계",
        subCategory: "수면", 
        question: "아동의 수면 패턴이 안정적인가?", 
        score: 7
    },
    
    // 대인관계
    { 
        mainCategory: "대인관계",
        subCategory: "어머니", 
        question: "아동과 어머니의 애착관계는 안정적인가?", 
        score: 6
    },
    { 
        mainCategory: "대인관계",
        subCategory: "아버지", 
        question: "아동과 아버지의 관계는 건전한가?", 
        score: 7
    },
    { 
        mainCategory: "대인관계",
        subCategory: "친구", 
        question: "아동이 또래와 원만한 관계를 맺고 있는가?", 
        score: 8
    },
    
    // 기본생활
    { 
        mainCategory: "기본생활",
        subCategory: "걱정", 
        question: "아동이 과도한 걱정이나 불안을 보이는가?", 
        score: 5
    },
    { 
        mainCategory: "기본생활",
        subCategory: "행복", 
        question: "아동이 전반적으로 행복해 보이는가?", 
        score: 6
    },
    
    // 학대여부
    { 
        mainCategory: "학대여부",
        subCategory: "방임", 
        question: "아동의 기본적 욕구가 적절히 충족되고 있는가?", 
        score: 8
    },
    { 
        mainCategory: "학대여부",
        subCategory: "정서학대", 
        question: "아동에게 정서적 상처를 주는 언행이 있었는가?", 
        score: 7
    },
    { 
        mainCategory: "학대여부",
        subCategory: "신체학대", 
        question: "아동에게 물리적 폭력을 가한 적이 있는가?", 
        score: 9
    },
    
    // 응급
    { 
        mainCategory: "응급",
        subCategory: "자해/자살", 
        question: "아동이 자해나 자살 관련 행동을 보인 적이 있는가?", 
        score: 10
    },
    { 
        mainCategory: "응급",
        subCategory: "트라우마", 
        question: "아동이 트라우마 관련 증상을 보이는가?", 
        score: 6
    }
];

let filteredData = [...assessmentData];

// 평가영역별로 데이터를 그룹화하고 평균 점수를 계산하는 함수
const getGroupedDataBySubCategory = (data) => {
    const grouped = {};
    
    data.forEach(item => {
        const key = `${item.mainCategory}-${item.subCategory}`;
        
        if (!grouped[key]) {
            grouped[key] = {
                mainCategory: item.mainCategory,
                subCategory: item.subCategory,
                questions: [],
                totalScore: 0,
                count: 0
            };
        }
        
        grouped[key].questions.push(item.question);
        grouped[key].totalScore += item.score;
        grouped[key].count += 1;
    });
    
    // 평균 점수 계산
    Object.keys(grouped).forEach(key => {
        grouped[key].averageScore = grouped[key].totalScore / grouped[key].count;
    });
    
    return grouped;
};

const createRadarChart = () => {
    const ctx = document.getElementById('radarChart').getContext('2d');
    const categories = [...new Set(assessmentData.map(item => item.mainCategory))];
    const scores = categories.map(category => {
        const categoryData = assessmentData.filter(item => item.mainCategory === category);
        return categoryData.reduce((sum, item) => sum + item.score, 0) / categoryData.length;
    });

    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: categories,
            datasets: [{
                label: '위험도 점수',
                data: scores,
                fill: true,
                backgroundColor: 'rgba(17, 24, 39, 0.1)',
                borderColor: '#111827',
                pointBackgroundColor: '#111827',
                pointBorderColor: '#ffffff',
                pointHoverBackgroundColor: '#ffffff',
                pointHoverBorderColor: '#111827',
                borderWidth: 2,
                pointRadius: 4,
                pointHoverRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                r: {
                    beginAtZero: true,
                    max: 10,
                    ticks: { stepSize: 2, font: { size: 11, family: 'Inter' }, color: '#6b7280' },
                    grid: { color: '#e5e7eb' },
                    angleLines: { color: '#e5e7eb' },
                    pointLabels: { font: { size: 10, weight: '500', family: 'Inter' }, color: '#374151' }
                }
            }
        }
    });
};

const createResultsTable = () => {
    const tbody = document.getElementById('resultsTableBody');
    if (!tbody) return;
    
    let html = '';
    
    // 평가영역별로 평균 점수 계산
    const subCategoryScores = {};
    filteredData.forEach(item => {
        const key = `${item.mainCategory}-${item.subCategory}`;
        if (!subCategoryScores[key]) {
            subCategoryScores[key] = {
                totalScore: 0,
                count: 0
            };
        }
        subCategoryScores[key].totalScore += item.score;
        subCategoryScores[key].count += 1;
    });
    
    // 평균 점수 계산
    Object.keys(subCategoryScores).forEach(key => {
        subCategoryScores[key].averageScore = subCategoryScores[key].totalScore / subCategoryScores[key].count;
    });
    
    // 대분류별로 그룹화
    const groupedData = {};
    filteredData.forEach(item => {
        if (!groupedData[item.mainCategory]) {
            groupedData[item.mainCategory] = [];
        }
        groupedData[item.mainCategory].push(item);
    });
    
    Object.keys(groupedData).forEach(mainCategory => {
        const items = groupedData[mainCategory];
        let mainCategoryRowCount = 0;
        
        // 같은 평가영역끼리 그룹화
        const subCategoryGroups = {};
        items.forEach(item => {
            if (!subCategoryGroups[item.subCategory]) {
                subCategoryGroups[item.subCategory] = [];
            }
            subCategoryGroups[item.subCategory].push(item);
        });
        
        // 전체 행 수 계산 (대분류 rowspan용)
        mainCategoryRowCount = items.length;
        
        let isFirstMainCategory = true;
        
        Object.keys(subCategoryGroups).forEach(subCategory => {
            const subItems = subCategoryGroups[subCategory];
            const averageScore = subCategoryScores[`${mainCategory}-${subCategory}`].averageScore;
            
            let scoreClass = 'score-medium';
            if (averageScore >= 8) scoreClass = 'score-low';
            else if (averageScore < 6) scoreClass = 'score-high';
            
            subItems.forEach((item, subIndex) => {
                html += `
                    <tr>
                        ${isFirstMainCategory ? `<td class="main-category-cell" rowspan="${mainCategoryRowCount}">${item.mainCategory}</td>` : ''}
                        ${subIndex === 0 ? `<td class="sub-category-cell" rowspan="${subItems.length}">${item.subCategory}</td>` : ''}
                        <td class="question-cell">${item.question}</td>
                        ${subIndex === 0 ? `<td class="score-cell ${scoreClass}" rowspan="${subItems.length}">${averageScore.toFixed(1)}</td>` : ''}
                    </tr>
                `;
                isFirstMainCategory = false;
            });
        });
    });
    
    tbody.innerHTML = html;
};

const updateOverallScore = () => {
    const totalScore = assessmentData.reduce((sum, item) => sum + item.score, 0);
    const averageScore = totalScore / assessmentData.length;
    document.getElementById('overallScore').textContent = averageScore.toFixed(1);

    const riskLevelElement = document.getElementById('riskLevel');
    if (averageScore >= 10) {
        riskLevelElement.textContent = '응급';
        riskLevelElement.className = 'risk-level-badge risk-emergency';
    } else if (averageScore >= 8) {
        riskLevelElement.textContent = '학대의심';
        riskLevelElement.className = 'risk-level-badge risk-suspect';
    } else if (averageScore >= 6) {
        riskLevelElement.textContent = '상담필요';
        riskLevelElement.className = 'risk-level-badge risk-consult';
    } else if (averageScore >= 4) {
        riskLevelElement.textContent = '관찰필요';
        riskLevelElement.className = 'risk-level-badge risk-observe';
    } else {
        riskLevelElement.textContent = '정상군';
        riskLevelElement.className = 'risk-level-badge risk-low';
    }
};

const filterResults = () => {
    const selectedCategory = document.getElementById('categoryFilter').value;
    
    if (selectedCategory === '전체') {
        filteredData = [...assessmentData];
    } else {
        filteredData = assessmentData.filter(item => item.mainCategory === selectedCategory);
    }
    
    createResultsTable();
};

const downloadReport = () => { 
    alert('결과 보고서를 다운로드합니다.'); 
};

document.addEventListener('DOMContentLoaded', () => {
    createRadarChart();
    createResultsTable();
    updateOverallScore();
    
    // 필터
    document.getElementById('categoryFilter').addEventListener('change', filterResults);
});