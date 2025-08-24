const startAssessment = () => {
    window.location.href = '/question';
};

const showInfo = () => {
    document.getElementById('infoModal').style.display = 'block';
};

const closeModal = () => {
    document.getElementById('infoModal').style.display = 'none';
};

// 모달 외부 클릭 시 닫기
window.onclick = (event) => {
    const modal = document.getElementById('infoModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
};
