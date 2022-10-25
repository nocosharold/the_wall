document.addEventListener("DOMContentLoaded", () => {
    const login_form = document.querySelector("#login");
    const create_account_form = document.querySelector("#create_account");
    const homepage = document.querySelector("#homepage");
    const create_account_btn = document.getElementById("create_account_btn");
    const show_signup_btn = document.querySelector("#show_signup_btn");
    const show_login_btn = document.querySelector("#show_login_btn");
    const link_create_account = document.querySelector("#link_create_account");
    const link_login = document.querySelector("#link_login");

    show_signup_btn.addEventListener("click", event => {
        event.preventDefault();
        login_form.classList.add("hidden");
        homepage.classList.add("hidden");
        create_account_form.classList.remove("hidden");
    });
    
    show_login_btn.addEventListener("click", event => {
        event.preventDefault();
        login_form.classList.remove("hidden");
        homepage.classList.add("hidden");
        create_account_form.classList.add("hidden");
    });

    link_create_account.addEventListener("click", event => {
        login_form.classList.add("hidden");
        create_account_form.classList.remove("hidden");
        event.preventDefault();
    });
    
    link_login.addEventListener("click", event => {
        event.preventDefault();
        login_form.classList.remove("hidden");
        create_account_form.classList.add("hidden");
    });
    
    create_account_btn.addEventListener("click", event => {
        event.preventDefault();
        window.location.href = "/the_wall.html";
    });

    login_form.addEventListener("submit", event => {
        event.preventDefault();
        let form_data = new FormData(document.getElementById("login"));
        let login_username = form_data.get('login_username');
        let login_password = form_data.get('login_password');
        
        if(login_username === "admin" && login_password === "admin_123"){
            localStorage.setItem('first_name', 'Harold');
            localStorage.setItem('last_name', 'Nocos');
            window.location.href = "/the_wall.html";
        }
        else{
            setFormMessage(login_form, "error", "Invalid username/password combination");
        }
    });

    document.querySelectorAll(".form_input").forEach(inputElement => {
        inputElement.addEventListener("blur", event => {
            if(event.target.id === "first_name" && REGULAR_EXPRESSIONS.name_format.test(event.target.value) || event.target.id === "last_name" && REGULAR_EXPRESSIONS.name_format.test(event.target.value)) {
                setInputError(inputElement, "Special Characters and numbers are not allowed.");
                event.target.classList.add("required");
            }else{
                event.target.classList.remove("required");
            }
            if(event.target.id === "signup_username" && event.target.value.length > 0 && event.target.value.length < 6) {
                setInputError(inputElement, "Username must be at least 6 characters in length");
                event.target.classList.add("required");
            }else{
                event.target.classList.remove("required");
            }
            if(event.target.id === "signup_password" && !(REGULAR_EXPRESSIONS.password_format.test(event.target.value))) {
                setInputError(inputElement, "Password must be at least 6 characters and contains an uppercase letter and a number.");
                event.target.classList.add("required");
            }else{
                event.target.classList.remove("required");
            }
            if(event.target.id === "signup_confirm_password" && document.getElementById("signup_confirm_password").value != document.getElementById("signup_password").value) {
                setInputError(inputElement, "Password doesn't match");
                event.target.classList.add("required");
            }else{
                event.target.classList.remove("required");
            }

            if(document.querySelectorAll(".form_input_error").length == 0 && document.querySelectorAll(".required").length == 0){
                create_account_btn.removeAttribute("disabled");
                localStorage.setItem('first_name', document.getElementById('first_name').value);
                localStorage.setItem('last_name', document.getElementById('last_name').value);

            }else{
                create_account_btn.setAttribute("disabled", "true");
            }
        });

        inputElement.addEventListener("input", function(){
            clearInputError(inputElement);
        })
    });
});


/**
 * It takes a form element, a type of message, and a message, and then sets the message on the form
 * element
 * @param formElement - The form element that the message is being set for.
 * @param type - "success" or "error"
 * @param message - The message to display.
 */
function setFormMessage(formElement, type, message){
    const messageElement = formElement.querySelector(".form_message");

    messageElement.textContent = message;
    messageElement.classList.remove("form_message_success", "form_message_error");
    messageElement.classList.add(`form_message_${type}`);
}


/**
 * It adds the class "form_input_error" to the input element and sets the text of the error message
 * element to the message passed in
 * @param inputElement - The input element that you want to set the error on.
 * @param message - The error message to display.
 */
function setInputError(inputElement, message) {
    inputElement.classList.add("form_input_error");
    inputElement.parentElement.querySelector(".form_input_error_message").textContent = message;
}

/**
 * It removes the class "form_input_error" from the input element and removes the text content of the
 * error message element.
 * @param inputElement - The input element that you want to clear the error from.
 */
function clearInputError(inputElement){
    inputElement.classList.remove("form_input_error");
    inputElement.parentElement.querySelector(".form_input_error_message").textContent = "";
}

