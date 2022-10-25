
document.addEventListener("DOMContentLoaded", () => {
    const post_btn = document.getElementById('post_btn');
    const all_comments = document.getElementById('all_comments');

    /* When the button is clicked, the addComment function
    is called. */
    post_btn.addEventListener('click', function (event) {
        addComment(event);
    });

    /*  When the event is triggered, it will clone the wrapper div and add it to the parent div. 
    If the event target has the class of add_reply, then it will call the addReply function. 
    It will increment the value of the like button and delete the comment. */
    all_comments.addEventListener('click', function (event) {
        /* This is the code that is executed when the reply button is clicked. It creates a text area
        and a button to add the reply. It also creates a cancel button to cancel the reply. */
        if(hasClass(event.target, 'reply')) {
            const parent_div = event.target.parentElement;
            const wrapper = document.querySelector(".wrapper.hidden").cloneNode(true);

            wrapper.setAttribute("class", "wrapper");
            wrapper.querySelector(".reply_comment").setAttribute("class", "add_reply_comment");
            parent_div.appendChild(wrapper);

            setOnLocalStorage();
        } 
        /* This is the code that is executed when the add reply button is clicked. It adds the reply to
        the comment. */
        else if(hasClass(event.target, 'add_reply')) {
            addReply(event);
        } 
        /* This is the code that is executed when the like button is clicked. It increments the value
        of the like button. */
        else if(hasClass(event.target, 'like_comment')) {
            const like_btn_value = event.target.innerHTML;
            event.target.innerHTML = like_btn_value !== '' ? Number.parseInt(like_btn_value) + 1 : 1;
            setOnLocalStorage();
        } 
        /* This is the code that is executed when the cancel reply button is clicked. It removes the
        text area and the buttons. */
        else if(hasClass(event.target, 'cancel_reply')) {
            event.target.parentElement.remove();
            event.target.parentElement.innerHTML = '';
            setOnLocalStorage();
        } 
        /* This is the code that is executed when the delete button is clicked. It removes the comment. */
        else if(hasClass(event.target, 'delete_comment')) {
            event.target.parentElement.remove();
            setOnLocalStorage();
        }
    });

    getOnLocalStorage();
    getNameOnLocalStorage();
});

/**
 * It creates a new comment and adds it to the wall.
 */
function addComment() {
    /* This is the code that is executed when the post button is clicked. It creates a new comment and
    adds it to the wall. */
    if(!(document.querySelector(".new_post").value.trim().length === 0)) {
        const comment_container = document.getElementById('all_comments');
        const post_wrapper = document.querySelector(".post_wrapper.hidden").cloneNode(true);
        const user_name_text = document.getElementById('profile_name').textContent;
        const new_post_text = document.querySelector('.new_post');

        post_wrapper.setAttribute("class", "post_wrapper");
        post_wrapper.querySelector(".user_name").innerHTML = user_name_text;
        post_wrapper.querySelector("p").innerHTML = new_post_text.value;
        new_post_text.value = "";
        comment_container.appendChild(post_wrapper);
        
        setOnLocalStorage();
    }
}

/**
 * It adds a reply to the comment.
 * @param event - The event that is passed to the function.
 */
function addReply(event) {
    /* This is the code that is executed when the add reply button is clicked. It adds the reply to
    the comment. */
    if(!(document.querySelector(".add_reply_comment").value.trim().length === 0)) {
        const post_container = event.target.closest(".post_wrapper");
        const reply_wrapper = document.querySelector(".reply_wrapper.hidden").cloneNode(true);
        const user_name_text = document.getElementById('profile_name').textContent;
        const reply_comment_text = document.querySelector('.add_reply_comment').value;

        reply_wrapper.setAttribute("class", "reply_wrapper");
        reply_wrapper.querySelector(".user_name").innerHTML = user_name_text;
        reply_wrapper.querySelector("p").innerHTML = reply_comment_text;
        post_container.appendChild(reply_wrapper);
        event.target.parentElement.remove();

        setOnLocalStorage();
    }
}

/**
 * If the class name is found in the class list, return true, otherwise return false.
 * @param elem - The element to check for the class.
 * @param className - The class name to check for.
 * @returns a boolean value.
 */
function hasClass(elem, className) {
    return elem.className.split(' ').indexOf(className) > -1;
}

/**
 * It takes the HTML of the div with the id of "all_comments" and stores it in the localStorage object
 * under the key "template".
 */
function setOnLocalStorage() {
    localStorage.setItem('template', document.getElementById('all_comments').innerHTML);
}

/**
 * If there is data in localStorage, then insert it into the DOM.
 */
function getOnLocalStorage() {
    let wall_data = localStorage.getItem('template');
    let all_comments = document.getElementById( 'all_comments');

    if(!(wall_data === null)){
        all_comments.insertAdjacentHTML( 'beforeend', wall_data );
    }
}

/**
 * If the element with the id of profile_name exists, then insert the first and last name into the
 * element.
 */
function getNameOnLocalStorage() {
    let first_name = localStorage.getItem('first_name');
    let last_name = localStorage.getItem('last_name');
    let profile_name = document.getElementById( 'profile_name');

    if(!(profile_name === null)){
        profile_name.insertAdjacentHTML( 'beforeend', first_name + " " + last_name );
    }
}


