// login
function login () {
    let username = document.getElementById("login_username").value;
    let pwd = document.getElementById("login_pwd").value;
    // let re = document.getElementById("login_remember").value;
    let result = valid_login_credential(username, pwd);
    if (result) {
        login_cancel();
        let profile = get_user_profile(username);
        // change icon
        document.getElementById("nav_user_profile").src = "images/profilepic/" + profile.profilePic + ".jpg";
        // insert display name
        document.getElementById("nav_username").innerText = profile.displayName;
        // show userinfo and logout
        document.getElementById("user_info_content").classList.remove('hide');
        document.getElementById("user_logout_content").classList.remove('hide');
        // hide login or signup content
        document.getElementById("login_sign_content").classList.add('hide')
    } else {
        document.getElementById('login-error-tips').innerText = "Invalid Username or Password"
    }
}

// sign up
function sign_up () {
    let username = document.getElementById("sign_username").value;
    let pwd1 = document.getElementById("sign_pwd1").value;
    let pwd2 = document.getElementById("sign_pwd2").value;
    if (username == '') {
        alert('Please Enter Username')
        return;
    }
    if (pwd1 != pwd2) {
        alert('The password did not match the re-typed password')
        return;
    }
    signup_cancel();
    // TODO: in Phase 2, really append it to the user array    
    document.getElementById("nav_user_profile").src = "images/others/default.jpg";     // change icon
    document.getElementById("nav_username").innerText = username;
    document.getElementById("user_info_content").classList.remove('hide');
    document.getElementById("user_logout_content").classList.remove('hide');
    document.getElementById("login_sign_content").classList.add('hide')
}



function open_login_window () {
    document.getElementById("login-window").style = "visibility: visible;";
}
function close_login_window () {
    document.getElementById("login-window").style = "visibility: hidden;";
}

function open_signup_window () {
    document.getElementById("signup-window").style = "visibility: visible;";
}
function close_signup_window () {
    document.getElementById("signup-window").style = "visibility: hidden;";
}

//  "Cancel" button
function login_cancel () {
    document.getElementById("login-window").style = "visibility: hidden;";
}
function signup_cancel () {
    document.getElementById("signup-window").style = "visibility: hidden;";
}
