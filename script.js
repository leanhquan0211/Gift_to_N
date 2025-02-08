let code = '';
const correctCode = '250415';

function enterDigit(digit) {
    if (code.length < 6) {
        code += digit;
        document.getElementById('code-display').innerText = code.padEnd(6, '*');
    }
}

function resetCode() {
    code = '';
    document.getElementById('code-display').innerText = '******';
    document.getElementById('message-box').innerText = '';
    document.getElementById('success-image').style.display = 'none';
    document.getElementById('error-image').style.display = 'none';
}

function enterCode() {
    if (code === correctCode) {
        showMessage('Tèn tén ten', 'pink', 'success');
        setTimeout(showQuestion1, 1000); // Hiển thị câu hỏi thứ nhất sau 1 giây
    } else {
        showMessage('Nố nô nồ', 'pink', 'error');
        setTimeout(resetCode, 1000); // Hiển thị thông báo và hình ảnh trong 1 giây trước khi reset mã
    }
}

function showMessage(message, color, type) {
    const messageBox = document.getElementById('message-box');
    const successImage = document.getElementById('success-image');
    const errorImage = document.getElementById('error-image');

    messageBox.innerText = message;
    messageBox.style.color = color;

    if (type === 'success') {
        successImage.style.display = 'block';
        errorImage.style.display = 'none';
    } else if (type === 'error') {
        errorImage.style.display = 'block';
        successImage.style.display = 'none';
    }
}

function unlockScreen() {
    document.getElementById('lock-screen').style.display = 'none';
}

function showQuestion1() {
    unlockScreen();
    document.getElementById('question-screen-1').style.display = 'flex';
}

function showQuestion2() {
    document.getElementById('question-screen-2').style.display = 'flex';
}

function showQuestion3() {
    document.getElementById('question-screen-3').style.display = 'flex';
}

function showUnlockedScreen() {
    document.getElementById('question-screen-1').style.display = 'none';
    document.getElementById('unlocked-screen').style.display = 'flex';
    loadUnlockedContent();
}

function showFinalScreen() {
    document.getElementById('question-screen-3').style.display = 'none';
    document.getElementById('final-screen').style.display = 'flex';
    loadFinalContent();
}

function loadUnlockedContent() {
    fetch('Content1.txt') // Đảm bảo rằng file text nằm trong cùng thư mục với các tệp khác
        .then(response => response.text())
        .then(data => {
            document.querySelector('.right-panel .content-box').innerText = data;
        })
        .catch(error => console.error('Error fetching the file:', error));
}

function loadFinalContent() {
    fetch('content2.txt') // Đảm bảo rằng file text nằm trong cùng thư mục với các tệp khác
        .then(response => response.text())
        .then(data => {
            document.getElementById('final-content-box').innerText = data;
        })
        .catch(error => console.error('Error fetching the file:', error));
}

function checkAnswer(questionNumber, option) {
    if (questionNumber === 1) {
        if (option === 'option1') {
            // Nếu chọn đúng ở câu 1
            showUnlockedScreen();
        } else {
            // Nếu chọn sai ở câu 1
            document.getElementById('question-screen-1').style.display = 'none';
            showQuestion2();
        }
    } else if (questionNumber === 2) {
        if (option === 'option1') {
            // Nếu chọn đúng ở câu 2
            document.getElementById('question-screen-2').style.display = 'none';
            showQuestion1();
        } else {
            // Nếu chọn sai ở câu 2
            document.getElementById('question-screen-2').style.display = 'none';
            showQuestion3();
        }
    } else if (questionNumber === 3) {
        if (option === 'option1') {
            // Nếu chọn đúng ở câu 3
            document.getElementById('question-screen-3').style.display = 'none';
            showQuestion2();
        } else {
            // Nếu chọn sai ở câu 3
            showFinalScreen();
        }
    }
}

function backToQuestion(questionNumber) {
    if (questionNumber === 1) {
        document.getElementById('unlocked-screen').style.display = 'none';
        document.getElementById('question-screen-1').style.display = 'flex';
    } else if (questionNumber === 3) {
        document.getElementById('final-screen').style.display = 'none';
        document.getElementById('question-screen-3').style.display = 'flex';
    }
}

// Gọi hàm loadContent khi trang được tải
window.onload = () => {
    loadUnlockedContent();
    loadFinalContent();
};
