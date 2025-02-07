function lockLetter() {
     var letter = document.getElementById('letter').value;
     var password = document.getElementById('password').value;
     if (letter && password) {
         localStorage.setItem('letter', letter);
         localStorage.setItem('password', password);
         document.getElementById('letter').value = '';
         document.getElementById('password').value = '';
         document.querySelector('.letter').style.display = 'none';
         document.getElementById('locked-letter').style.display = 'block';
     } else {
         alert('Please write a letter and enter a password.');
     }
 }
 
 function unlockLetter() {
     var unlockPassword = document.getElementById('unlock-password').value;
     var storedPassword = localStorage.getItem('password');
     if (unlockPassword === storedPassword) {
         var letterContent = localStorage.getItem('letter');
         document.getElementById('letter-content').innerText = letterContent;
     } else {
         alert('Incorrect password!');
     }
 }
 