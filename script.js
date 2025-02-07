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
        showMessage('Đúng rồi!', 'green', 'success');
        setTimeout(unlockScreen, 3000); // Hiển thị thông báo và hình ảnh trong 1 giây trước khi chuyển giao diện
    } else {
        showMessage('Sai rồi!', 'red', 'error');
        setTimeout(resetCode, 3000); // Hiển thị thông báo và hình ảnh trong 1 giây trước khi reset mã
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
    document.getElementById('unlocked-screen').style.display = 'flex';
}

function loadContent() {
     fetch('Content.txt')
         .then(response => response.text())
         .then(data => {
             document.querySelector('.content-box').innerText = data;
         })
         .catch(error => console.error('Error fetching the file:', error));
 }
 
 // Gọi hàm loadContent khi trang được tải
 window.onload = loadContent;
 