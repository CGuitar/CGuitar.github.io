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


// // 初始化用户数据库
// if (!window.userDatabase) {
//     window.userDatabase = JSON.parse(localStorage.getItem('userDatabase')) || {};
// }

// // 注册功能
// function registerUser(userName, password) {
//     // 输入验证
//     if (userName.length < 3) {
//         document.getElementById('error-message').textContent = '用户名至少需要3个字符。';
//         document.getElementById('error-message').style.display = 'block';
//         return;
//     }
//     if (password.length < 6) {
//         document.getElementById('error-message').textContent = '密码至少需要6个字符。';
//         document.getElementById('error-message').style.display = 'block';
//         return;
//     }

//     // 检查用户名是否已存在
//     if (window.userDatabase[userName]) {
//         document.getElementById('error-message').textContent = '用户名已存在，请选择其他用户名。';
//         document.getElementById('error-message').style.display = 'block';
//     } else {
//         // 保存用户信息（实际应用中应对密码进行哈希处理）
//         window.userDatabase[userName] = password;
//         localStorage.setItem('userDatabase', JSON.stringify(window.userDatabase));

//         // 跳转到登录页面，并携带注册成功提示
//         window.location.href = 'login.html?registered=true';
//     }
// }

// // 表单提交事件
// document.getElementById('register-form').addEventListener('submit', function(event) {
//     event.preventDefault();
//     const userName = document.querySelector('#register-form input[type="text"]').value;
//     const password = document.querySelector('#register-form input[type="password"]').value;
//     registerUser(userName, password);
// });