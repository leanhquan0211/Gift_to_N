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
        setTimeout(unlockScreen, 1000); // Hiển thị thông báo "Đúng rồi!" trong 1 giây trước khi chuyển giao diện
    } else {
        showMessage('Sai rồi!', 'red');
        setTimeout(resetCode, 1000); // Hiển thị thông báo "Sai rồi!" trong 1 giây trước khi reset mã
    }
}

function showMessage(message, color) {
    const messageBox = document.getElementById('message-box');
    messageBox.innerText = message;
    messageBox.style.color = color;
}

function unlockScreen() {
    document.getElementById('lock-screen').style.display = 'none';
    document.getElementById('unlocked-screen').style.display = 'flex';
}
