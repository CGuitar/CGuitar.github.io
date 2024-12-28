if (!window.userDatabase) {
    window.userDatabase = JSON.parse(localStorage.getItem('userDatabase')) || {};
}

function registerUser(userName, password) {
    if (window.userDatabase[userName]) {
        alert('用户名已存在，请选择其他用户名。');
    } else {
        window.userDatabase[userName] = password;
        localStorage.setItem('userDatabase', JSON.stringify(window.userDatabase));
        alert('注册成功！');
        window.location.href = 'login.html';
    }
}

document.getElementById('register-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const userName = document.querySelector('#register-form input[type="text"]').value;
    const password = document.querySelector('#register-form input[type="password"]').value;
    registerUser(userName, password);
});