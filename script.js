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
}

function enterCode() {
    if (code === correctCode) {
        showMessage('Đúng rồi!', 'green');
        // Chuyển đến giao diện mới sau khi mở khóa (chờ nhận ảnh tiếp theo)
        // window.location.href = 'unlocked.html';  // Ví dụ nếu bạn có một tệp HTML khác cho giao diện sau khi mở khóa
    } else {
        showMessage('Sai rồi!', 'red');
        resetCode();
    }
}

function showMessage(message, color) {
    const messageBox = document.getElementById('message-box');
    messageBox.innerText = message;
    messageBox.style.color = color;
}
