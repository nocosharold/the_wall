document.addEventListener("DOMContentLoaded", () => {
    const create_account_btn = document.getElementById("create_account_btn");
    const show_signup_btn = document.querySelector("#show_signup_btn");
    const show_login_btn = document.querySelector("#show_login_btn");
    const link_create_account = document.querySelector("#link_create_account");
    const link_login = document.querySelector("#link_login");
    const login_form = document.querySelector("#login");
    const form_input = document.querySelectorAll(".form_input")
    
    show_signup_btn.addEventListener("click", (event) => { homepageShowSignupForm(event) });                            /* When clicked, from homepage it will show signup form */
    show_login_btn.addEventListener("click", (event) => { homepageShowLoginForm(event) });                              /* When clicked, from homepage it will show login form */
    link_create_account.addEventListener("click", (event) => { showSignupForm(event) });                                /* When clicked, it will show signup form */
    link_login.addEventListener("click", (event) => { showLoginForm(event) });                                          /* When clicked, it will show login form */
    create_account_btn.addEventListener("click", (event) => { showTheWall(event) });                                    /* When clicked, it will show the wall */
    login_form.addEventListener("submit", (event) => { submitLoginForm(event) });                                       /* Checking if the username and password is correct. then will redirect to the wall. Otherwise will display an error message. */
    form_input.forEach((inputElement) => { validateSignupFields(inputElement) });                                       /* Will validate Signup Fields and display error messages */
});

/**
* DOCU: When clicked, it will show show the wall <br>
* Triggered: create_account_btn.addEventListener("click", (event) => { showTheWall(event) }); <br>
* Last Updated Date: October 26, 2022
* @author Harold
*/
function showTheWall(event){
    event.preventDefault();
    window.location.href = "../views/the_wall.html";
}

/**
* DOCU: When clicked, it will show login form <br>
* Triggered: link_login.addEventListener("click", (event) => { showLoginForm(event) }); <br>
* Last Updated Date: October 26, 2022
* @author Harold
*/
function showLoginForm(event){
    const create_account_form = document.querySelector("#create_account");
    const login_form = document.querySelector("#login");

    event.preventDefault();
    login_form.classList.remove("hidden");
    create_account_form.classList.add("hidden");
}

/**
* DOCU: When clicked, it will show signup form <br>
* Triggered: link_create_account.addEventListener("click", (event) => { showSignupForm(event) }); <br>
* Last Updated Date: October 26, 2022
* @author Harold
*/
function showSignupForm(event){
    const create_account_form = document.querySelector("#create_account");
    const login_form = document.querySelector("#login");

    event.preventDefault();
    login_form.classList.add("hidden");
    create_account_form.classList.remove("hidden");
}

/**
* DOCU: When clicked, it will show login form <br>
* Triggered: show_login_btn.addEventListener("click", (event) => { homepageShowLoginForm(event) }); <br>
* Last Updated Date: October 26, 2022
* @author Harold
*/
function homepageShowLoginForm(event){
    const create_account_form = document.querySelector("#create_account");
    const login_form = document.querySelector("#login");

    event.preventDefault();
    login_form.classList.remove("hidden");
    homepage.classList.add("hidden");
    create_account_form.classList.add("hidden");
}

/**
* DOCU: When clicked, it will show signup form <br>
* Triggered: show_signup_btn.addEventListener("click", (event) => { homepageShowSignupForm(event) }); <br>
* Last Updated Date: October 26, 2022
* @author Harold
*/
function homepageShowSignupForm(event){
    const create_account_form = document.querySelector("#create_account");
    const login_form = document.querySelector("#login");

    event.preventDefault();
    login_form.classList.add("hidden");
    homepage.classList.add("hidden");
    create_account_form.classList.remove("hidden");
}

/**
* DOCU: Checks if the username and password are correct then redirect to the wall, Otherwise will display an error <br>
* Triggered: link_login.addEventListener("click", (event) => { showLoginForm(event) }); <br>
* Last Updated Date: October 26, 2022
* @author Harold
*/
function submitLoginForm(event){
    const login_form = document.querySelector("#login");
    let form_data = new FormData(document.getElementById("login"));
    let login_username = form_data.get("login_username");
    let login_password = form_data.get("login_password");
    event.preventDefault();
    
    if(login_username === "admin" && login_password === "admin_123"){
        localStorage.setItem("first_name", "Harold");
        localStorage.setItem("last_name", "Nocos");
        window.location.href = "../views/the_wall.html";
    }
    else{
        document.querySelector("#login_username").classList.add("form_input_error");
        document.querySelector("#login_password").classList.add("form_input_error");
        setFormMessage(login_form, "error", "Invalid username/password combination");
    }
}

/**
* DOCU: It validates the fields on blur event and clears the error message when the user types in the input <br>
* Triggered: form_input.forEach((inputElement) => { validateSignupFields(inputElement) }); <br>
* Last Updated Date: October 26, 2022
* @author Harold
*/
function validateSignupFields(inputElement){
    /* This will validate fields on blur event */
    inputElement.addEventListener("blur", event => {
        /* Checking if the value of the input element with the id "first_name" or "last_name" is
        not equal to the regular expression "name_format". If it is not equal, it will set an
        error message on the input element and add the class "required" to the input element. */
        if(event.target.id === "first_name" && REGULAR_EXPRESSIONS.name_format.test(event.target.value) || event.target.id === "last_name" && REGULAR_EXPRESSIONS.name_format.test(event.target.value)) {
            setInputError(inputElement, "Special Characters and numbers are not allowed.");
            event.target.classList.add("required");
        }
        /* Removing the class "required" from the input element. */
        else{
            event.target.classList.remove("required");
        }
        /* Checking if the value of the input element with the id "signup_username" is greater than
        0 and less than 6. If it is, it will set an error message on the input element and add
        the class "required" to the input element. */
        if(event.target.id === "signup_username" && event.target.value.length > 0 && event.target.value.length < 6) {
            setInputError(inputElement, "Username must be at least 6 characters in length");
            event.target.classList.add("required");
        }
        /* Removing the class "required" from the input element. */
        else{
            event.target.classList.remove("required");
        }
        /* Checking if the value of the input element with the id "signup_password" is not equal to
        the regular expression "password_format". If it is not equal, it will set an error
        message on the input element and add the class "required" to the input element. */
        if(event.target.id === "signup_password" && !(REGULAR_EXPRESSIONS.password_format.test(event.target.value))) {
            setInputError(inputElement, "Password must be at least 6 characters and contains an uppercase letter and a number.");
            event.target.classList.add("required");
        }
        /* Removing the class "required" from the input element. */
        else{
            event.target.classList.remove("required");
        }
        /* Checking if the value of the input element with the id "signup_confirm_password" is not
        equal to the value of the input element with the id "signup_password". If it is not
        equal, it will set an error message on the input element and add the class "required" to
        the input element. */
        if(event.target.id === "signup_confirm_password" && document.getElementById("signup_confirm_password").value != document.getElementById("signup_password").value) {
            setInputError(inputElement, "Password doesn't match");
            event.target.classList.add("required");
        }
        /* Removing the class "required" from the input element. */
        else{
            event.target.classList.remove("required");
        }
        /* Checking if there are any errors in the form. If there are no errors, it will enable the
        create account button. */
        if(document.querySelectorAll(".form_input_error").length == 0 && document.querySelectorAll(".required").length == 0){
            create_account_btn.removeAttribute("disabled");
            localStorage.setItem("first_name", document.getElementById("first_name").value);
            localStorage.setItem("last_name", document.getElementById("last_name").value);
        }
        /* Disabling the create account button if there are any errors in the form. */
        else{
            create_account_btn.setAttribute("disabled", "true");
        }
    });

    /* Clearing the error message when the user types in the input element. */
    inputElement.addEventListener("input", function(){
        clearInputError(inputElement);
    })
}

/**
* DOCU: It takes a form element, a type of message, and a message, and then sets the message on the form element <br>
* Triggered: login_form.addEventListener("submit", (event) => { submitLoginForm(event) }); <br>
* Last Updated Date: October 26, 2022
* @author Harold
*/
function setFormMessage(formElement, type, message){
    const messageElement = formElement.querySelector(".form_message");

    messageElement.textContent = message;
    messageElement.classList.remove("form_message_success", "form_message_error");
    messageElement.classList.add(`form_message_${type}`);
}

/**
* DOCU: Adds the class "form_input_error" to the element and sets the text of the error message element to the message passed in <br>
* Triggered: form_input.forEach((inputElement) => { validateSignupFields(inputElement) }); <br>
* Last Updated Date: October 26, 2022
* @author Harold
*/
function setInputError(inputElement, message) {
    inputElement.classList.add("form_input_error");
    inputElement.parentElement.querySelector(".form_input_error_message").textContent = message;
}

/**
* DOCU: Removes error message from the input elements. <br>
* Triggered: form_input.forEach((inputElement) => { validateSignupFields(inputElement) }); <br>
* Last Updated Date: October 26, 2022
* @author Harold
*/
function clearInputError(inputElement){
    inputElement.classList.remove("form_input_error");
    inputElement.parentElement.querySelector(".form_input_error_message").textContent = "";
}