/////////// general helper functions  ///////////////

// create an element, need to provide at least one of ID and class name
function create_element(type, ID, cName, parentID) {
    let element = document.createElement(type);
    document.getElementById(parentID).appendChild(element);
    if(ID != '') {
        element.id = ID;
    }
    if(cName != '') {
        element.className = cName;
    }

    return element;
}

// safely remove an element by its ID
function remove_element_by_ID(ID) {
    if(document.getElementById(ID) != null) {
        document.getElementById(ID).remove();
    }
}

// function that add fading effect
function add_fade(element) {
    let op = 1;
    let temp = setInterval(function () {
        if (op <= 0.1){
            clearInterval(temp);
            element.style.display = 'none';
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.1;
    }, 150);
}

function calculate_exp_and_level(level, exp) {
    let updated_level = level;
    switch(level) {
        case 1:
            if(exp >= 10) {
                exp = exp - 10;
                updated_level = level + 1;
            }
            break;
        case 2:
            if(exp >= 50) {
                exp = exp - 50;
                updated_level = level + 1;
            }
            break;
        case 3:
            if(exp >= 100) {
                exp = exp - 100;
                updated_level = level + 1;
            }
            break;
        case 4:
            if(exp >= 200) {
                exp = exp - 200;
                updated_level = level + 1;
            }
            break;
        case 5:
            if(exp >= 500) {
                exp = exp - 500;
                updated_level = level + 1;
            }
            break;

        default:
            exp = 0;
    }
    return [updated_level, exp];
}

// setup cookie
// cookie name, cookie value,  cookie expire day
function setCookie (cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

// get cookie
function getCookie (cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name) == 0) {
            //("username=John Doe").substring("username=".length);
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function log_out () {
    setCookie("username", "");
    remove_right_navbar();
    add_not_logged_navbar();
}


function go_to_error_page(message) {
    if(document.getElementById("error-page") == null) {
        let error_element = document.createElement("div");
        error_element.id = "error-page";
        error_element.innerHTML = 
            `<img id="sorry-img" src="images/others/sorry.jpg"> <br><br>
            ${message}<br><br>`;
        document.body.appendChild(error_element);
        let return_element = document.createElement("a");
        return_element.id = "error-page-return";
        return_element.innerHTML = `Back to Home`;
        return_element.href = "index.html";
        error_element.appendChild(return_element);
    } else error_element.innerHTML = message;
}

Array.prototype.remove = function() {       // cite from: https://stackoverflow.com/questions/3954438/how-to-remove-item-from-array-by-value
    let what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};
