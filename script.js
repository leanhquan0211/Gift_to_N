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
}

function enterCode() {
    if (code === correctCode) {
        alert('Mật mã đúng! Đang mở khóa...');
        // Chuyển đến giao diện mới sau khi mở khóa (chờ nhận ảnh tiếp theo)
        // window.location.href = 'unlocked.html';  // Ví dụ nếu bạn có một tệp HTML khác cho giao diện sau khi mở khóa
    } else {
        alert('Mật mã sai! Vui lòng thử lại.');
        resetCode();
    }
}
