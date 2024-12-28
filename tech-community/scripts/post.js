// document.getElementById('post-form').addEventListener('submit', function (event) {
//     event.preventDefault();
//     const title = document.querySelector('#post-form input[type="text"]').value;
//     const content = document.querySelector('#post-form textarea').value;
//     const userName = sessionStorage.getItem('userName');
//     const postId = Date.now().toString(); // 生成唯一 ID
//     const post = { postId, title, content, userName, likes: 0, comments: [] }; // 移除 likedBy 字段
//     let posts = JSON.parse(localStorage.getItem('posts')) || [];
//     posts.push(post);
//     localStorage.setItem('posts', JSON.stringify(posts)); // 存储帖子信息
//     alert('帖子发布成功！');
//     window.location.href = 'index.html';
// });

// document.getElementById('post-form').addEventListener('submit', function (event) {
//     event.preventDefault();
//     const title = document.querySelector('#post-form input[type="text"]').value;
//     const content = document.querySelector('#post-form textarea').value;
//     const userName = sessionStorage.getItem('userName');
//     const postId = Date.now().toString(); // 生成唯一 ID
//     const post = { 
//         postId, 
//         title, 
//         content, 
//         userName, 
//         likes: 0, 
//         comments: [], 
//         link: `post-detail.html?id=${postId}` // 添加链接字段
//     };
//     let posts = JSON.parse(localStorage.getItem('posts')) || [];
//     posts.push(post);
//     localStorage.setItem('posts', JSON.stringify(posts)); // 存储帖子信息
//     alert('帖子发布成功！');
//     window.location.href = 'index.html';
// });

document.getElementById('post-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const title = document.querySelector('#post-form input[type="text"]').value;
    const content = document.querySelector('#post-form textarea').value;
    const link = document.querySelector('#post-form input[type="text"][placeholder="链接"]').value; // 获取链接
    const userName = sessionStorage.getItem('userName');
    const postId = Date.now().toString(); // 生成唯一 ID
    const post = { 
        postId, 
        title, 
        content, 
        link, // 保存链接
        userName, 
        likes: 0, 
        comments: [] 
    };
    let posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts.push(post);
    localStorage.setItem('posts', JSON.stringify(posts)); // 存储帖子信息
    alert('帖子发布成功！');
    window.location.href = 'index.html';
});

