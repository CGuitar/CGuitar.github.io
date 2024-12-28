if (!window.userDatabase) {
    window.userDatabase = JSON.parse(localStorage.getItem('userDatabase')) || {};
}

function loginUser(userName, password) {
    if (window.userDatabase[userName] === password) {
        sessionStorage.setItem('userName', userName);
        alert('登录成功！');
        window.location.href = 'index.html';
    } else {
        alert('用户名或密码错误，请重试。');
    }
}

document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const userName = document.querySelector('#login-form input[type="text"]').value;
    const password = document.querySelector('#login-form input[type="password"]').value;

    loginUser(userName, password);
});
