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

const backgroundMusic = document.getElementById('background-music');
const musicPlayer = document.getElementById('music-player');
const albumVideo = document.getElementById('album-video');
const playPauseButton = document.getElementById('play-pause');
const playIcon = document.getElementById('play-icon');
const pauseIcon = document.getElementById('pause-icon');
const progress = document.getElementById('progress');

let isPlaying = false;

function playMusic() {
    backgroundMusic.play();
    albumVideo.play();
    musicPlayer.style.display = 'flex';
    playIcon.style.display = 'none';
    pauseIcon.style.display = 'block';
    isPlaying = true;
}

function pauseMusic() {
    backgroundMusic.pause();
    albumVideo.pause();
    playIcon.style.display = 'block';
    pauseIcon.style.display = 'none';
    isPlaying = false;
}

function togglePlayPause() {
    if (isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
}

backgroundMusic.ontimeupdate = () => {
    const progressPercentage = (backgroundMusic.currentTime / backgroundMusic.duration) * 100;
    progress.style.width = `${progressPercentage}%`;
};

window.onbeforeunload = () => {
    backgroundMusic.pause();
    albumVideo.pause();
    backgroundMusic.currentTime = 0;
    albumVideo.currentTime = 0;
};

// Bắt đầu phát nhạc và hiển thị khi mã code đúng
function enterCode() {
    if (code === correctCode) {
        showMessage('Tèn tén ten', 'pink', 'success');
        setTimeout(() => {
            showScreen('question-screen-1'); // Chuyển đến câu hỏi 1
            playMusic();
        }, 1500); // Hiệu ứng chuyển đổi trong 1.5s
    } else {
        showMessage('Nố nô nồ', 'pink', 'error');
        setTimeout(resetCode, 1000);
    }
}

function showScreen(screenId) {
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => {
        screen.classList.remove('active');
        screen.style.display = 'none';  // Ẩn tất cả các màn hình khác
    });

    const activeScreen = document.getElementById(screenId);
    activeScreen.classList.add('active');
    activeScreen.style.display = 'flex';  // Hiển thị màn hình mong muốn
    
    // Ẩn màn hình khóa
    document.getElementById('lock-screen').style.display = 'none';
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
