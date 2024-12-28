window.addEventListener('load', function () {
    // 检查用户是否登录
    const userName = sessionStorage.getItem('userName');
    if (userName) {
        const userNameSpan = document.getElementById('user-name');
        userNameSpan.innerText = '欢迎，' + userName;
        userNameSpan.style.display = 'inline';
        userNameSpan.style.color = '#fff'; // 匹配 header 文字颜色
    } else {
        alert('请先登录！');
        window.location.href = 'login.html';
    }

    // 加载当前用户的帖子
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    const userPosts = posts.filter(post => post.userName === userName);
    const postsContainer = document.querySelector('.posts');
    postsContainer.innerHTML = ''; // 清空现有内容

    // 动态生成帖子列表
    userPosts.forEach(post => {
        const postElement = document.createElement('article');
        postElement.classList.add('post');
        postElement.innerHTML = `
            <h2>${post.title}</h2>
            <p>${post.content}</p>
            <div class="author">发布者：${post.userName}</div>
            <div class="likes">点赞数：<span class="like-count">${post.likes}</span></div>
            <div class="actions">
                <button class="delete" data-post-id="${post.postId}">删除</button>
            </div>
        `;
        postsContainer.appendChild(postElement);
    });

    // 绑定删除按钮事件
    document.querySelectorAll('.delete').forEach(button => {
        button.addEventListener('click', function () {
            const postId = this.getAttribute('data-post-id');
            deletePost(postId); // 调用删除函数
        });
    });
});

// 删除帖子函数
function deletePost(postId) {
    let posts = JSON.parse(localStorage.getItem('posts')) || [];
//---------------------------------------------------------------


    posts = posts.filter(post => post.postId !== postId); // 过滤掉要删除的帖子
    localStorage.setItem('posts', JSON.stringify(posts)); // 更新 localStorage
    alert('帖子删除成功！');
    window.location.reload(); // 刷新页面以更新帖子列表
}

// 退出登录函数
function logout() {
    sessionStorage.removeItem('userName');
    alert('退出成功！');
    window.location.href = 'index.html';
}