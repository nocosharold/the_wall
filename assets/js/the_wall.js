
document.addEventListener("DOMContentLoaded", () => {
    const post_btn = document.getElementById('post_btn');
    const all_comments = document.getElementById('all_comments');

    post_btn.addEventListener('click', function (event) {
        addComment(event);
    });

    all_comments.addEventListener('click', function (event) {
        if(hasClass(event.target, 'reply')) {
            const parent_div = event.target.parentElement;
            const wrap_div = document.createElement('div');
            const text_area = document.createElement('textarea');
            const add_button = document.createElement('button');
            const cancel_btn = document.createElement('button');
            
            wrap_div.style.marginLeft = (Number.parseInt(parent_div.style.marginLeft) + 15).toString() + 'px';
            wrap_div.className = 'wrapper';
            text_area.setAttribute("class", "reply_comment");
            add_button.className = 'add_reply';
            add_button.innerHTML = 'Add';
            cancel_btn.innerHTML = 'Cancel';
            cancel_btn.className='cancel_reply';
            wrap_div.append(text_area, add_button, cancel_btn);
            parent_div.appendChild(wrap_div);

            setOnLocalStorage();
        } 
        else if(hasClass(event.target, 'add_reply')) {
            addReply(event);
        } 
        else if(hasClass(event.target, 'like_comment')) {
            const like_btn_value = event.target.innerHTML;
            event.target.innerHTML = like_btn_value !== '' ? Number.parseInt(like_btn_value) + 1 : 1;
            setOnLocalStorage();
        } 
        else if(hasClass(event.target, 'cancel_reply')) {
            event.target.parentElement.innerHTML = '';
            setOnLocalStorage();
        } 
        else if(hasClass(event.target, 'delete_comment')) {
            event.target.parentElement.remove();
            setOnLocalStorage();
        }
    });

    getOnLocalStorage();
    getNameOnLocalStorage();
});

function addComment() {
    if(!(document.querySelector(".new_post").value.trim().length === 0)) {
        const comment_container = document.getElementById('all_comments');
        const delete_btn = document.createElement('button');
        const like_btn = document.createElement('button');
        const reply_btn = document.createElement('button');
        const text_box = document.createElement('p');
        let user_name, comment_text, wrap_div;

        reply_btn.className = 'reply';
        reply_btn.innerHTML = 'Write a Comment';
        like_btn.innerHTML = '';
        like_btn.className = 'like_comment';
        delete_btn.innerHTML = '';
        delete_btn.className = 'delete_comment';

        wrap_div = document.createElement('ul');
        wrap_div.className = `post_wrapper`;
        user_name = document.createElement('h1');
        user_name.className = 'user_name';
        user_name.textContent = document.getElementById('profile_name').textContent;
        comment_text = document.querySelector('.new_post').value;
        document.querySelector('.new_post').value = '';
        text_box.innerHTML = comment_text;
        wrap_div.append(user_name, text_box, like_btn, reply_btn, delete_btn);
        comment_container.appendChild(wrap_div);
        
        setOnLocalStorage();
    }
}

function addReply(event) {
    if(!(document.querySelector(".reply_comment").value.trim().length === 0)) {
        const delete_btn = document.createElement('button');
        const like_btn = document.createElement('button');
        const post_container = event.target.closest(".post_wrapper");
        const reply_btn = document.createElement('button');
        const text_box = document.createElement('p');
        let user_name, comment_text, reply_wrap_div;

        reply_btn.className = 'reply';
        reply_btn.innerHTML = 'Write a Comment';
        like_btn.innerHTML = '';
        like_btn.className = 'like_comment';
        delete_btn.innerHTML = '';
        delete_btn.className = 'delete_comment';

        reply_wrap_div = document.createElement('li');
        reply_wrap_div.className = 'reply_wrapper';
        user_name = document.createElement('h1');
        user_name.className = 'user_name';
        user_name.textContent = document.getElementById('profile_name').textContent;
        comment_text = document.querySelector('.reply_comment').value;
        document.querySelector('.reply_comment').value = '';
        text_box.innerHTML = comment_text;
        reply_wrap_div.append(user_name, text_box, like_btn, reply_btn, delete_btn);
        post_container.append(reply_wrap_div);
        event.target.parentElement.remove();
        
        setOnLocalStorage();
    }
}

function hasClass(elem, className) {
    return elem.className.split(' ').indexOf(className) > -1;
}

function setOnLocalStorage() {
    localStorage.setItem('template', document.getElementById('all_comments').innerHTML);
}

function getOnLocalStorage() {
    let wall_data = localStorage.getItem('template');
    let all_comments = document.getElementById( 'all_comments');

    if(!(wall_data === null)){
        all_comments.insertAdjacentHTML( 'beforeend', wall_data );
    }
}

function getNameOnLocalStorage() {
    let first_name = localStorage.getItem('first_name');
    let last_name = localStorage.getItem('last_name');
    let profile_name = document.getElementById( 'profile_name');

    if(!(profile_name === null)){
        profile_name.insertAdjacentHTML( 'beforeend', first_name + " " + last_name );
    }
}


