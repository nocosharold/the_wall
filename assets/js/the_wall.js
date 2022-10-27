

document.addEventListener("DOMContentLoaded", () => {
    const post_btn = document.getElementById("post_btn");
    const all_comments = document.getElementById("all_comments");
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let date_now = new Date();
    let month = months[date_now.getMonth()];
    let date = date_now.getDate();
    let year = date_now.getFullYear();
    let date_value = month + " " + date + ", " + year;
    document.querySelector("#date").innerHTML = date_value;
    
    post_btn.addEventListener("click", (event) => { addComment(event) });                               /* When clicked, the addComment function is called. */
    all_comments.addEventListener("click", (event) => { commentControls(event) });                      /* When clicked, the function commentControls is called. */

    getOnLocalStorage();
    getNameOnLocalStorage();
});

/**
* DOCU: Creates a new comment and adds it to the wall. <br>
* Triggered: post_btn.addEventListener("click", (event) => { addComment(event) }); <br>
* Last Updated Date: October 26, 2022
* @author Harold
*/
function addComment(event) {
    event.preventDefault();
    /* When clicked. It creates a new comment and adds it to the wall. */
    if(!(document.querySelector(".new_post").value.trim().length === 0)) {
        const comment_container = document.getElementById("all_comments");
        const post_wrapper = document.querySelector(".post_wrapper.hidden").cloneNode(true);
        const user_name_text = document.getElementById("profile_name").textContent;
        const new_post_text = document.querySelector(".new_post");
        const date_post = document.querySelector("#date").textContent;
        const user_time_stamp = user_name_text + " &bull; " + date_post;

        post_wrapper.setAttribute("class", "post_wrapper");
        post_wrapper.querySelector(".user_name").innerHTML = user_time_stamp;
        post_wrapper.querySelector("p").innerHTML = new_post_text.value;
        new_post_text.value = "";
        comment_container.appendChild(post_wrapper);
        
        setOnLocalStorage();
    }
}

/**
* DOCU: Adds a reply to the comment. <br>
* Triggered: all_comments.addEventListener("click", (event) => { commentControls(event) }); <br>
* Last Updated Date: October 26, 2022
* @author Harold
*/
function addReply(event) {
    event.preventDefault();
    /* When the add reply button is clicked. It adds the reply to the comment. */
    if(!(document.querySelector(".add_reply_comment").value.trim().length === 0)) {
        const post_container = event.target.closest(".post_wrapper");
        const reply_wrapper = document.querySelector(".reply_wrapper.hidden").cloneNode(true);
        const user_name_text = document.getElementById("profile_name").textContent;
        const reply_comment_text = document.querySelector(".add_reply_comment").value;
        const date_post = document.querySelector("#date").textContent;
        const user_time_stamp = user_name_text + " &bull; " + date_post;

        reply_wrapper.setAttribute("class", "reply_wrapper");
        reply_wrapper.querySelector(".user_name").innerHTML = user_time_stamp;
        reply_wrapper.querySelector("p").innerHTML = reply_comment_text;
        post_container.appendChild(reply_wrapper);
        event.target.parentElement.remove();

        setOnLocalStorage();
    }
}

/**
* DOCU: It adds a reply to a comment, increments the value of the like button, removes the text area and the buttons, and removes the comment. <br>
* Triggered: all_comments.addEventListener("click", (event) => { commentControls(event) }); <br>
* Last Updated Date: October 26, 2022
* @author Harold
*/
function commentControls(event){
    /* When clicked. creates a text area, button to add the reply, cancel button. */
    if(hasClass(event.target, "reply")) {
        const parent_div = event.target.parentElement;
        const wrapper = document.querySelector(".wrapper.hidden").cloneNode(true);

        wrapper.setAttribute("class", "wrapper");
        wrapper.querySelector(".reply_comment").setAttribute("class", "add_reply_comment");
        parent_div.appendChild(wrapper);

        setOnLocalStorage();
    } 
    /* When clicked. It adds the reply to the comment. */
    else if(hasClass(event.target, "add_reply")) {
        addReply(event);
    } 
    /* When clicked. It increments the value of the like button. */
    else if(hasClass(event.target, "like_comment")) {
        const like_btn_value = event.target.innerHTML;

        event.target.innerHTML = like_btn_value !== "" ? Number.parseInt(like_btn_value) + 1 : 1;
        setOnLocalStorage();
    } 
    /* When clicked. It removes the text area and the buttons. */
    else if(hasClass(event.target, "cancel_reply")) {
        event.target.parentElement.remove();
        setOnLocalStorage();
    } 
    /* When clicked. It removes the comment. */
    else if(hasClass(event.target, "delete_comment")) {
        event.target.parentElement.remove();
        setOnLocalStorage();
    }
}

/**
* DOCU: If the class name is found in the class list, return true, otherwise return false. <br>
* Triggered: all_comments.addEventListener("click", (event) => { commentControls(event) }); <br>
* Last Updated Date: October 26, 2022
* @author Harold
*/
function hasClass(elem, className) {
    return elem.classList.contains(className);
}

/**
* DOCU: It takes the HTML of the div with the id of "all_comments" and stores it in the localStorage object under the key "template". <br>
* Triggered: all_comments.addEventListener("click", (event) => { commentControls(event) }); <br>
* Last Updated Date: October 26, 2022
* @author Harold
*/
function setOnLocalStorage() {
    localStorage.setItem("template", document.getElementById("all_comments").innerHTML);
}

/**
* DOCU: If there is data in localStorage, then insert it into the DOM. <br>
* Triggered: on page load <br>
* Last Updated Date: October 26, 2022
* @author Harold
*/
function getOnLocalStorage() {
    let wall_data = localStorage.getItem("template");
    let all_comments = document.getElementById( "all_comments");

    if(!(wall_data === null)){
        all_comments.insertAdjacentHTML( "beforeend", wall_data );
    }
}

/**
* DOCU: If the element with the id of profile_name exists, then insert the first and last name into the element <br>
* Triggered: on page load <br>
* Last Updated Date: October 26, 2022
* @author Harold
*/
function getNameOnLocalStorage() {
    let first_name = localStorage.getItem("first_name");
    let last_name = localStorage.getItem("last_name");
    let profile_name = document.getElementById( "profile_name");

    if(!(profile_name === null)){
        profile_name.insertAdjacentHTML( "beforeend", first_name + " " + last_name );
    }
}