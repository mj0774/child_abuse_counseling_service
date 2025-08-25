// sessionStorage에서 분석 데이터를 불러와서 전역 변수에 저장
const analysisResultString = sessionStorage.getItem('assessmentAnalysis');
let assessmentData = [];
let averageScore = 0;
let riskLevel = '';
let findings = [];
let recommendations = [];

if (analysisResultString) {
    try {
        const analysisResult = JSON.parse(analysisResultString);
        console.log("서버로부터 받은 분석 데이터:", analysisResult);
        
        // 💡 수정: 서버에서 받은 데이터를 전역 변수에 바로 할당합니다.
        // analysisResult 객체에 바로 scores, averageScore 등의 키가 있습니다.
        assessmentData = analysisResult.scores || [];
        averageScore = analysisResult.averageScore || 0;
        riskLevel = analysisResult.riskLevel || '정상군';
        findings = analysisResult.findings || [];
        recommendations = analysisResult.recommendations || [];

    } catch (e) {
        console.error("분석 데이터 파싱 오류:", e);
    }
} else {
    console.error("sessionStorage에 저장된 분석 데이터가 없습니다.");
}

// 점수에 따른 위험도 레벨 반환
const getRiskLevel = (score) => {
    if (score >= 10) return "응급";
    if (score >= 8) return "학대의심";
    if (score >= 6) return "상담필요";
    if (score >= 4) return "관찰필요";
    return "정상군";
};

// 점수에 따른 CSS 클래스 반환
const getRiskClass = (score) => {
    if (score >= 10) return "risk-emergency";
    if (score >= 8) return "risk-abuse";
    if (score >= 6) return "risk-counseling";
    if (score >= 4) return "risk-observation";
    return "risk-normal";
};

// 전체 점수 및 위험도 레벨 업데이트
const updateOverallScore = (score, risk) => {
    const overallScoreElement = document.getElementById('overallScore');
    const riskLevelElement = document.getElementById('riskLevel');

    if (overallScoreElement) {
        overallScoreElement.textContent = score.toFixed(1);
    }
    if (riskLevelElement) {
        riskLevelElement.textContent = risk;
        riskLevelElement.className = `risk-level-tag ${getRiskClass(score)}`;
    }
};

// 발견 내용 업데이트
const updateFindings = (findingsList) => {
    const findingsListElement = document.getElementById('findingsList');
    if (findingsListElement) {
        findingsListElement.innerHTML = '';
        findingsList.forEach(finding => {
            const li = document.createElement('li');
            li.textContent = finding;
            findingsListElement.appendChild(li);
        });
    }
};

// 권장사항 업데이트
const updateRecommendations = (recommendationsList) => {
    const recommendationsListElement = document.getElementById('recommendationsList');
    if (recommendationsListElement) {
        recommendationsListElement.innerHTML = '';
        recommendationsList.forEach(recommendation => {
            const li = document.createElement('li');
            li.textContent = recommendation;
            recommendationsListElement.appendChild(li);
        });
    }
};

// 레이더 차트 생성
const createRadarChart = (data) => {
    const ctx = document.getElementById('radarChart');
    if (!ctx) {
        console.error("캔버스 요소를 찾을 수 없습니다: #radarChart");
        return;
    }

    // 데이터가 없는 경우 차트 숨김
    if (data.length === 0) {
        ctx.style.display = 'none';
        return;
    }

    // const labels = data.map(item => item.subCategory);
    const labels = [...new Set(data.map(item => item.mainCategory))]
    // const scores = data.map(item => item.score);
    const grouped = data.reduce((acc, d) => {
        if (!acc[d.mainCategory]) acc[d.mainCategory] = [];
        acc[d.mainCategory].push(d.score);
        return acc;
    }, {});

    const scores = Object.values(grouped).map(arr =>
        arr.reduce((a, b) => a + b, 0) / arr.length
    );

    const chartData = {
        labels: labels,
        datasets: [{
            label: '평가 점수',
            data: scores,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
            pointBackgroundColor: 'rgba(255, 99, 132, 1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(255, 99, 132, 1)'
        }]
    };

    const options = {
        scales: {
            r: {
                angleLines: {
                    display: true
                },
                suggestedMin: 0,
                suggestedMax: 10,
                pointLabels: {
                    font: {
                        size: 12
                    }
                }
            }
        },
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        return `${context.dataset.label}: ${context.raw.toFixed(1)}`;
                    }
                }
            }
        },
        responsive: true,
        maintainAspectRatio: false
    };

    new Chart(ctx, {
        type: 'radar',
        data: chartData,
        options: options
    });
};

// 결과 테이블 생성
const createResultsTable = (data) => {
    console.log(data)
    const tbody = document.getElementById('resultsTableBody');
    if (!tbody) return;

    tbody.innerHTML = '';

    for (let i = 0; i < data.length; i++) {
        const item = data[i];
        const row = document.createElement('tr');

        // 각 셀을 개별적으로 생성
        const mainCategoryCell = document.createElement('td');
        mainCategoryCell.textContent = item.mainCategory;

        const subCategoryCell = document.createElement('td');
        subCategoryCell.textContent = item.subCategory;

        const questionCell = document.createElement('td');
        
        for (let j = 0; j < item.questions.length; j++) {
            questionCell.textContent += item.questions[j].question + "\n"
        }
        questionCell.style.whiteSpace = "pre-line";

        const scoreCell = document.createElement('td');
        scoreCell.textContent = item.score.toFixed(2);

        const riskCell = document.createElement('td');
        riskCell.className = 'risk-level-cell';

        const riskSpan = document.createElement('span');
        riskSpan.className = `risk-level-tag ${getRiskClass(item.score)}`;
        riskSpan.textContent = getRiskLevel(item.score);
        riskCell.appendChild(riskSpan);

        // 모든 셀을 행에 추가
        row.appendChild(mainCategoryCell);
        row.appendChild(subCategoryCell);
        row.appendChild(questionCell);
        row.appendChild(scoreCell);
        row.appendChild(riskCell);

        tbody.appendChild(row);
    }
};

// 필터링 기능
const filterResults = (selectedCategory) => {
    let filteredData = assessmentData;
    if (selectedCategory !== '전체') {
        filteredData = assessmentData.filter(item => item.mainCategory === selectedCategory);
    }
    
    createResultsTable(filteredData);
    createRadarChart(filteredData);
};

// 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', () => {
    if (assessmentData.length > 0) {
        updateOverallScore(averageScore, riskLevel);
        updateFindings(findings);
        updateRecommendations(recommendations);
        createRadarChart(assessmentData);
        createResultsTable(assessmentData);
        
        // 필터 이벤트 리스너 추가 (옵션이 동적으로 추가될 경우)
        const categoryFilter = document.getElementById('categoryFilter');
        if (categoryFilter) {
            if (categoryFilter.options.length <= 1) {
                const categories = [...new Set(assessmentData.map(item => item.mainCategory))];
                categories.forEach(category => {
                    const option = document.createElement('option');
                    option.value = category;
                    option.textContent = category;
                    categoryFilter.appendChild(option);
                });
            }
            categoryFilter.addEventListener('change', (e) => filterResults(e.target.value));
        }
    } else {
        document.querySelector('.results-container').innerHTML = `
            <p class="error-message">분석 결과를 불러오지 못했습니다. 평가를 먼저 진행해 주세요.</p>
        `;
    }
});