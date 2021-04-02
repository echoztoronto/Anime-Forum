// login
// Ajax
function ajax (options) {
    options = options || {};
    options.method = options.method || "GET"
    options.method = options.method.toUpperCase() || "GET";
    options.url = options.url || "";
    options.async = options.async || true;
    options.dataType = options.dataType || "text";
    options.contentType = options.contentType || "application/x-www-form-urlencoded; charset=utf-8";
    options.data = options.data || null;
    // key=value&key=value
    function getAjaxParams (data) {
        var params = [];
        for (var key in data) {
            params.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
        }
        return params.join('&');
    }

    return new Promise(function (resolve, reject) {
        var xmlHttp = null;
        if (window.XMLHttpRequest) {
            xmlHttp = new XMLHttpRequest();
        } else {
            // For IE browser only, if only chrome ignore this
            if (window.ActiveXObject) {
                try {
                    xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
                } catch (e) {
                    try {
                        xmlHttp = new ActiveXObject("msxml2.XMLHTTP");
                    } catch (ex) {
                        throw Error("XMLHttpRequest Error");
                    }
                }
            }
        }
        // post data
        var postData = getAjaxParams(options.data);
        // post JSON
        if (options.contentType === "application/json;charset=utf-8" && options.dataType === "json") {
            postData = JSON.stringify(options.data);
        }
        if (options.method === 'POST') {
            xmlHttp.open(options.method, options.url, options.async);
            xmlHttp.setRequestHeader('Content-Type', options.contentType);
        } else if (options.method === 'GET') {
            postData = options.url.indexOf("?") >= 0 ? "&" + postData : "?" + postData;
            xmlHttp.open(options.method, options.url + postData, options.async);
            postData = null;
        }
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState == 4) {
                var status = xmlHttp.status;
                if (status >= 200 && status < 300) {
                    resolve(xmlHttp.responseText);
                } else {
                    reject(status);
                }
            }
        };
        xmlHttp.send(postData);
    });
}

// Automatically login
function auto_login () {
    var username = getCookie("username");
    if (typeof username != undefined && username != "" && username != null && username != 'null') {
        set_login_info(username)
    }
}
setTimeout(auto_login, 500);

// set up information after login
function set_login_info (username) {
    let profile = get_user_profile(username);
    if (profile == null) {
        profile = get_user_profile("user")
    }
    console.log("profile", profile);
    // change icon
    document.getElementById("nav_user_profile").setAttribute("src", "images/profilepic/" + profile.profilePic + ".jpg");
    // insert display name
    document.getElementById("nav_username").innerText = profile.displayName;
    // change "#"
    document.getElementById("nav_username").setAttribute("href", "profile.html#" + username);
    // show userinfo and logout
    document.getElementById("user_info_content").classList.remove('hide');
    document.getElementById("user_logout_content").classList.remove('hide');
    // hide login or signup content
    document.getElementById("login_sign_content").classList.add('hide')
    // // save to cookie (for local cookie)
    // let d = new Date();
    // d.setTime(d.getTime() + (24 * 60 * 60 * 1000));
    // document.cookie = "username=" + username + ";expires=" + d.toUTCString() + ";path=/";
    // console.log(document.cookie);
}


function login () {
    let username = document.getElementById("login_username").value;
    let pwd = document.getElementById("login_pwd").value;
    let re = document.getElementById("login_remember").checked;
    // let result = valid_login_credential(username, pwd);
    let data = { userID: username, password: pwd, remember: re };
    let result = false;
    ajax({ url: "./login", method: "POST", data: data }).then(function onSuccess (response) {
        console.log('response：' + response, "response parse：", JSON.parse(response));
        const res = JSON.parse(response);
        alert(res.message);
        if (res.code == 0) {
            login_cancel();
            set_login_info(username);
        } else {
            document.getElementById('login-error-tips').innerText = "Invalid Username or Password"
        }
    }).catch(function onError (error) {
        console.log('Error ：' + error);
    });
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
    let data = { userID: username, password: pwd1 };
    ajax({ url: "./signup", method: "POST", data: data }).then(function onSuccess (response) {
        console.log('response：' + response, "response parse：", JSON.parse(response));
        const res = JSON.parse(response);
        alert(res.message);
        if (res.code == 0) {
            signup_cancel();
            set_login_info(username)
        }
    }).catch(function onError (error) {
        console.log('Error：' + error);
    });

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
