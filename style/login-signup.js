// login
function login () {
    var username = document.getElementById("login_username").value;
    var pwd = document.getElementById("login_pwd").value;
    // var re = document.getElementById("login_remember").value;
    var result = valid_login_credential(username, pwd);
    if (result) {
        login_cancel();
        var profile = get_user_profile(username);
        console.log("profile=", profile);
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
    var username = document.getElementById("sign_username").value;
    var pwd1 = document.getElementById("sign_pwd1").value;
    var pwd2 = document.getElementById("sign_pwd2").value;
    if (username == '') {
        alert('Please Enter Username')
        return;
    }
    if (pwd1 != pwd2) {
        alert('The password did not match the re-typed password')
        return;
    }
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
