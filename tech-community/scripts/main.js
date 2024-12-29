// window.userDatabase = JSON.parse(localStorage.getItem('userDatabase')) || {};

// // 点赞函数
// function likePost(postId) {
//     let posts = JSON.parse(localStorage.getItem('posts')) || [];
//     const post = posts.find(post => post.postId === postId);

//     if (post) {
//         post.likes += 1; // 点赞数量加 1
//         localStorage.setItem('posts', JSON.stringify(posts)); // 更新 localStorage
//         updateLikeCount(postId, post.likes); // 更新页面显示
//     }
// }

// // 更新点赞数量显示
// function updateLikeCount(postId, likes) {
//     const postElement = document.querySelector(`.like[data-post-id="${postId}"]`).closest('.post');
//     postElement.querySelector('.like-count').innerText = likes; // 更新点赞数量显示
// }

// // 删除帖子的函数
// function deletePost(postId) {
//     // 1. 从 localStorage 中读取帖子列表
//     let posts = JSON.parse(localStorage.getItem('posts')) || [];

//     // 2. 过滤掉要删除的帖子
//     posts = posts.filter(post => post.postId != postId);

//     // localStorage.removeItem('posts');
//     // 3. 将更新后的帖子列表重新存储到 localStorage 中
//     localStorage.setItem('posts', JSON.stringify(posts));

//     // 4. 提示用户并刷新页面
//     alert('帖子删除成功！');
//     window.location.reload(); // 刷新页面以更新帖子列表
// }





// window.addEventListener('load', function() {
//     const userName = sessionStorage.getItem('userName');
//     if (userName) {
//         const userNameSpan = document.getElementById('user-name');
//         userNameSpan.innerText = '欢迎，' + userName;
//         userNameSpan.style.display = 'inline';
//         userNameSpan.style.color = '#fff'; // 匹配 header 文字颜色
//         document.getElementById('login-link').style.display = 'none';
//         document.getElementById('register-link').style.display = 'none';
//         document.getElementById('logout-link').style.display = 'block';
//     } else {
//         document.getElementById('user-name').style.display = 'none';
//         document.getElementById('logout-link').style.display = 'none';
//     }
//     const posts = JSON.parse(localStorage.getItem('posts')) || [];
//     const postsContainer = document.querySelector('.posts');
//     const currentUser = sessionStorage.getItem('userName');
//     postsContainer.innerHTML = ''; // 清空现有内容



//     // 动态生成帖子列表
//     posts.forEach(post => {
//         const postElement = document.createElement('article');
//         postElement.classList.add('post');
//         postElement.innerHTML = `
//             <h2>${post.title}</h2>
//             <p>${post.content}</p>
//             <div class="author">发布者：${post.userName}</div>
//             <div class="likes">点赞数：<span class="like-count">${post.likes}</span></div>
//             <div class="actions">
//                 <button class="like" data-post-id="${post.postId}" ${!currentUser ? 'disabled' : ''}>点赞</button>
//                 <button class="comment">评论</button>
//                 ${post.userName === currentUser ? `<button class="delete" data-post-id="${post.postId}">删除</button>` : ''}
//             </div>
//         `;
//         postsContainer.appendChild(postElement);
//     });
//     // 绑定点赞按钮事件
//     document.querySelectorAll('.like').forEach(button => {
//         button.addEventListener('click', function () {
//             const postId = this.getAttribute('data-post-id');
//             likePost(postId); // 调用点赞函数
//         });
//     });
//     // 绑定评论提交按钮事件
//     document.querySelectorAll('.submit-comment').forEach(button => {
//         button.addEventListener('click', function () {
//             const postId = this.getAttribute('data-post-id');
//             const commentInput = this.closest('.comment-form').querySelector('textarea');
//             const content = commentInput.value.trim();
//             if (content) {
//                 addComment(postId, content); // 调用添加评论函数
//                 commentInput.value = ''; // 清空输入框
//             } else {
//                 alert('评论内容不能为空！');
//             }
//         });
//     });
//     // 绑定删除按钮事件
//     document.querySelectorAll('.delete').forEach(button => {
//         button.addEventListener('click', function () {
//             const postId = this.getAttribute('data-post-id');
//             deletePost(postId); // 调用删除函数
//         });
//     });
// });
   

// function logout() {
//     sessionStorage.removeItem('userName');
//     alert('退出成功！');
//     window.location.href = 'index.html';
// }




window.userDatabase = JSON.parse(localStorage.getItem('userDatabase')) || {};

// 点赞函数
function likePost(postId) {
    let posts = JSON.parse(localStorage.getItem('posts')) || [];
    const post = posts.find(post => post.postId === postId);

    if (post) {
        post.likes += 1; // 点赞数量加 1
        localStorage.setItem('posts', JSON.stringify(posts)); // 更新 localStorage
        updateLikeCount(postId, post.likes); // 更新页面显示
    }
}

// 更新点赞数量显示
function updateLikeCount(postId, likes) {
    const postElement = document.querySelector(`.like[data-post-id="${postId}"]`).closest('.post');
    postElement.querySelector('.like-count').innerText = likes; // 更新点赞数量显示
}

// 删除帖子的函数
function deletePost(postId) {
    let posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts = posts.filter(post => post.postId !== postId); // 过滤掉要删除的帖子
    localStorage.setItem('posts', JSON.stringify(posts)); // 更新 localStorage
    alert('帖子删除成功！');
    window.location.reload(); // 刷新页面以更新帖子列表
}

// 添加评论函数
function addComment(postId, content) {
    let posts = JSON.parse(localStorage.getItem('posts')) || [];
    const post = posts.find(post => post.postId === postId);
    const currentUser = sessionStorage.getItem('userName');

    if (post && currentUser) {
        post.comments.push({ userName: currentUser, content }); // 添加评论
        localStorage.setItem('posts', JSON.stringify(posts)); // 更新 localStorage
        updateCommentList(postId, post.comments); // 更新页面显示
    }
}

// 更新评论列表
function updateCommentList(postId, comments) {
    const postElement = document.querySelector(`.submit-comment[data-post-id="${postId}"]`).closest('.post');
    const commentList = postElement.querySelector('.comment-list');
    commentList.innerHTML = comments.map(comment => `
        <li>
            <strong>${comment.userName}:</strong> ${comment.content}
        </li>
    `).join('');
}

// 退出登录函数
function logout() {
    sessionStorage.removeItem('userName');
    alert('退出成功！');
    window.location.href = 'index.html';
}

document.querySelector('.logo').addEventListener('click', function() {
    window.location.href = 'https://cguitar.github.io/';
});


// window.addEventListener('load', function () {
//     const userName = sessionStorage.getItem('userName');
//     if (userName) {
//         const userNameSpan = document.getElementById('user-name');
//         userNameSpan.innerText = '欢迎，' + userName;
//         userNameSpan.style.display = 'inline';
//         userNameSpan.style.color = '#fff'; // 匹配 header 文字颜色
//         document.getElementById('login-link').style.display = 'none';
//         document.getElementById('register-link').style.display = 'none';
//         document.getElementById('logout-link').style.display = 'block';
//     } else {
//         document.getElementById('user-name').style.display = 'none';
//         document.getElementById('logout-link').style.display = 'none';
//     }

//     const posts = JSON.parse(localStorage.getItem('posts')) || [];
//     const postsContainer = document.querySelector('.posts');
//     const currentUser = sessionStorage.getItem('userName');
//     postsContainer.innerHTML = ''; // 清空现有内容

//     // 动态生成帖子列表
//     posts.forEach(post => {
//         const postElement = document.createElement('article');
//         postElement.classList.add('post');
//         postElement.innerHTML = `
//             <h2>${post.title}</h2>
//             <p>${post.content}</p>
//             <div class="author">发布者：${post.userName}</div>
//             <div class="likes">点赞数：<span class="like-count">${post.likes}</span></div>
//             <div class="actions">
//                 <button class="like" data-post-id="${post.postId}" ${!currentUser ? 'disabled' : ''}>点赞</button>
//                 <button class="comment">评论</button>
//                 ${post.userName === currentUser ? `<button class="delete" data-post-id="${post.postId}">删除</button>` : ''}
//             </div>
//         `;

//         // 绑定点击事件
//         postElement.addEventListener('click', function () {
//             window.location.href = post.link; // 跳转到帖子链接
//         });

//         postsContainer.appendChild(postElement);
//     });

//     // 绑定点赞按钮事件
//     document.querySelectorAll('.like').forEach(button => {
//         button.addEventListener('click', function (event) {
//             event.stopPropagation(); // 阻止事件冒泡
//             const postId = this.getAttribute('data-post-id');
//             likePost(postId); // 调用点赞函数
//         });
//     });

//     // 绑定评论提交按钮事件
//     document.querySelectorAll('.submit-comment').forEach(button => {
//         button.addEventListener('click', function (event) {
//             event.stopPropagation(); // 阻止事件冒泡
//             const postId = this.getAttribute('data-post-id');
//             const commentInput = this.closest('.comment-form').querySelector('textarea');
//             const content = commentInput.value.trim();
//             if (content) {
//                 addComment(postId, content); // 调用添加评论函数
//                 commentInput.value = ''; // 清空输入框
//             } else {
//                 alert('评论内容不能为空！');
//             }
//         });
//     });

//     // 绑定删除按钮事件
//     document.querySelectorAll('.delete').forEach(button => {
//         button.addEventListener('click', function (event) {
//             event.stopPropagation(); // 阻止事件冒泡
//             const postId = this.getAttribute('data-post-id');
//             deletePost(postId); // 调用删除函数
//         });
//     });
// });


window.addEventListener('load', function () {
    const userName = sessionStorage.getItem('userName');
    if (userName) {
        const userNameSpan = document.getElementById('user-name');
        userNameSpan.innerText = '欢迎，' + userName;
        userNameSpan.style.display = 'inline';
        userNameSpan.style.color = '#fff'; // 匹配 header 文字颜色
        document.getElementById('login-link').style.display = 'none';
        document.getElementById('register-link').style.display = 'none';
        document.getElementById('logout-link').style.display = 'block';
    } else {
        document.getElementById('user-name').style.display = 'none';
        document.getElementById('logout-link').style.display = 'none';
    }

    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    const postsContainer = document.querySelector('.posts');
    const currentUser = sessionStorage.getItem('userName');
    let sortedPosts = [...posts]; // 用于排序的帖子列表

    // 渲染帖子列表
    function renderPosts(posts) {
        postsContainer.innerHTML = ''; // 清空现有内容
        posts.forEach(post => {
            const postElement = document.createElement('article');
            postElement.classList.add('post');
            postElement.innerHTML = `
                <h2>${post.title}</h2>
                <p>${post.content}</p>
                <div class="author">发布者：${post.userName}</div>
                <div class="likes">点赞数：<span class="like-count">${post.likes}</span></div>
                <div class="actions">
                    <button class="like" data-post-id="${post.postId}" ${!currentUser ? 'disabled' : ''}>点赞</button>
                    ${post.userName === currentUser ? `<button class="delete" data-post-id="${post.postId}">删除</button>` : ''}
                </div>
            `;

            // 绑定点击事件
            postElement.addEventListener('click', function () {
                // 确保跳转的链接是完整的 URL
                const fullUrl = post.link.startsWith('http://') || post.link.startsWith('https://') 
                    ? post.link 
                    : `https://${post.link}`;
                window.location.href = fullUrl; // 跳转到完整的帖子链接
            });

            postsContainer.appendChild(postElement);
        });
    }

    // 初始渲染
    renderPosts(sortedPosts);

    // 按点赞数量排序
    document.getElementById('sort-by-likes').addEventListener('click', function () {
        sortedPosts.sort((a, b) => b.likes - a.likes); // 从高到低排序
        renderPosts(sortedPosts);
    });

    // 按发布时间排序
    document.getElementById('sort-by-date').addEventListener('click', function () {
        sortedPosts.sort((a, b) => b.postId - a.postId); // 从新到旧排序
        renderPosts(sortedPosts);
    });

    // 绑定点赞按钮事件
    document.querySelectorAll('.like').forEach(button => {
        button.addEventListener('click', function (event) {
            event.stopPropagation(); // 阻止事件冒泡
            const postId = this.getAttribute('data-post-id');
            likePost(postId); // 调用点赞函数
        });
    });

    // 绑定评论提交按钮事件
    document.querySelectorAll('.submit-comment').forEach(button => {
        button.addEventListener('click', function (event) {
            event.stopPropagation(); // 阻止事件冒泡
            const postId = this.getAttribute('data-post-id');
            const commentInput = this.closest('.comment-form').querySelector('textarea');
            const content = commentInput.value.trim();
            if (content) {
                addComment(postId, content); // 调用添加评论函数
                commentInput.value = ''; // 清空输入框
            } else {
                alert('评论内容不能为空！');
            }
        });
    });

    // 绑定删除按钮事件
    document.querySelectorAll('.delete').forEach(button => {
        button.addEventListener('click', function (event) {
            event.stopPropagation(); // 阻止事件冒泡
            const postId = this.getAttribute('data-post-id');
            deletePost(postId); // 调用删除函数
        });
    });
});

// // 点赞函数
// function likePost(postId) {
//     let posts = JSON.parse(localStorage.getItem('posts')) || [];
//     const post = posts.find(post => post.postId === postId);

//     if (post) {
//         post.likes += 1; // 点赞数量加 1
//         localStorage.setItem('posts', JSON.stringify(posts)); // 更新 localStorage
//         updateLikeCount(postId, post.likes); // 更新页面显示
//     }
// }

// // 更新点赞数量显示
// function updateLikeCount(postId, likes) {
//     const postElement = document.querySelector(`.like[data-post-id="${postId}"]`).closest('.post');
//     postElement.querySelector('.like-count').innerText = likes; // 更新点赞数量显示
// }

// // 添加评论函数
// function addComment(postId, content) {
//     let posts = JSON.parse(localStorage.getItem('posts')) || [];
//     const post = posts.find(post => post.postId === postId);
//     const currentUser = sessionStorage.getItem('userName');

//     if (post && currentUser) {
//         post.comments.push({ userName: currentUser, content }); // 添加评论
//         localStorage.setItem('posts', JSON.stringify(posts)); // 更新 localStorage
//         updateCommentList(postId, post.comments); // 更新页面显示
//     }
// }

// // 更新评论列表
// function updateCommentList(postId, comments) {
//     const postElement = document.querySelector(`.submit-comment[data-post-id="${postId}"]`).closest('.post');
//     const commentList = postElement.querySelector('.comment-list');
//     commentList.innerHTML = comments.map(comment => `
//         <li>
//             <strong>${comment.userName}:</strong> ${comment.content}
//         </li>
//     `).join('');
// }

// // 删除帖子函数
// function deletePost(postId) {
//     let posts = JSON.parse(localStorage.getItem('posts')) || [];
//     posts = posts.filter(post => post.postId !== postId); // 过滤掉要删除的帖子
//     localStorage.setItem('posts', JSON.stringify(posts)); // 更新 localStorage
//     alert('帖子删除成功！');
//     window.location.reload(); // 刷新页面以更新帖子列表
// }

// window.addEventListener('load', function () {
//     const userName = sessionStorage.getItem('userName');
//     if (userName) {
//         const userNameSpan = document.getElementById('user-name');
//         userNameSpan.innerText = '欢迎，' + userName;
//         userNameSpan.style.display = 'inline';
//         userNameSpan.style.color = '#fff'; // 匹配 header 文字颜色
//         document.getElementById('login-link').style.display = 'none';
//         document.getElementById('register-link').style.display = 'none';
//         document.getElementById('logout-link').style.display = 'block';
//     } else {
//         document.getElementById('user-name').style.display = 'none';
//         document.getElementById('logout-link').style.display = 'none';
//     }
//     const posts = JSON.parse(localStorage.getItem('posts')) || [];
//     const postsContainer = document.querySelector('.posts');
//     const currentUser = sessionStorage.getItem('userName');
//     postsContainer.innerHTML = ''; // 清空现有内容

//     // // 动态生成帖子列表
//     // posts.forEach(post => {
//     //     const postElement = document.createElement('article');
//     //     postElement.classList.add('post');
//     //     postElement.innerHTML = `
//     //         <h2>${post.title}</h2>
//     //         <p>${post.content}</p>
//     //         <div class="author">发布者：${post.userName}</div>
//     //         <div class="likes">点赞数：<span class="like-count">${post.likes}</span></div>
//     //         <div class="actions">
//     //             <button class="like" data-post-id="${post.postId}" ${!currentUser ? 'disabled' : ''}>点赞</button>
//     //             <button class="comment">评论</button>
//     //             ${post.userName === currentUser ? `<button class="delete" data-post-id="${post.postId}">删除</button>` : ''}
//     //         </div>
//     //     `;

//     //     // 绑定点击事件
//     //     postElement.addEventListener('click', function () {
//     //         window.location.href = post.link; // 跳转到帖子链接
//     //     });

//     //     postsContainer.appendChild(postElement);
//     // });

//     // 动态生成帖子列表
//     posts.forEach(post => {
//         const postElement = document.createElement('article');
//         postElement.classList.add('post');
//         postElement.innerHTML = `
//             <h2>${post.title}</h2>
//             <p>${post.content}</p>
//             <div class="author">发布者：${post.userName}</div>
//             <div class="likes">点赞数：<span class="like-count">${post.likes}</span></div>
//             <div class="actions">
//                 <button class="like" data-post-id="${post.postId}" ${!currentUser ? 'disabled' : ''}>点赞</button>
                
//                 ${post.userName === currentUser ? `<button class="delete" data-post-id="${post.postId}">删除</button>` : ''}
//             </div>
//         `;

//         // 绑定点击事件
//         postElement.addEventListener('click', function () {
//             // 确保跳转的链接是完整的 URL
//             const fullUrl = post.link.startsWith('http://') || post.link.startsWith('https://') 
//                 ? post.link 
//                 : `https://${post.link}`;
//             window.location.href = fullUrl; // 跳转到完整的帖子链接
//         });

//         postsContainer.appendChild(postElement);
//     });


//     // 绑定点赞按钮事件
//     document.querySelectorAll('.like').forEach(button => {
//         button.addEventListener('click', function (event) {
//             event.stopPropagation(); // 阻止事件冒泡
//             const postId = this.getAttribute('data-post-id');
//             likePost(postId); // 调用点赞函数
//         });
//     });

//     // 绑定评论提交按钮事件
//     document.querySelectorAll('.submit-comment').forEach(button => {
//         button.addEventListener('click', function (event) {
//             event.stopPropagation(); // 阻止事件冒泡
//             const postId = this.getAttribute('data-post-id');
//             const commentInput = this.closest('.comment-form').querySelector('textarea');
//             const content = commentInput.value.trim();
//             if (content) {
//                 addComment(postId, content); // 调用添加评论函数
//                 commentInput.value = ''; // 清空输入框
//             } else {
//                 alert('评论内容不能为空！');
//             }
//         });
//     });

//     // 绑定删除按钮事件
//     document.querySelectorAll('.delete').forEach(button => {
//         button.addEventListener('click', function (event) {
//             event.stopPropagation(); // 阻止事件冒泡
//             const postId = this.getAttribute('data-post-id');
//             deletePost(postId); // 调用删除函数
//         });
//     });
// });

