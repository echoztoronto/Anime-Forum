function open_login_window() {
    document.getElementById("login-window").style = "visibility: visible;";
}
function close_login_window() {
    document.getElementById("login-window").style = "visibility: hidden;";
}

function open_signup_window() {
    document.getElementById("signup-window").style = "visibility: visible;";
}
function close_signup_window() {
    document.getElementById("signup-window").style = "visibility: hidden;";
}

//  "Cancel" button
function login_cancel() {
    document.getElementById("login-window").style = "visibility: hidden;";
}
function signup_cancel() {
    document.getElementById("signup-window").style = "visibility: hidden;";
}
// onclick functino of "Submit" button
function editor_submit() {

    let quillHTML = quill.root.innerHTML;
    add_self_answer(quillHTML);
    document.getElementById("editor-window").style = "visibility: hidden;";
    document.getElementById("add-answer-btn").style = "visibility: hidden;";
}