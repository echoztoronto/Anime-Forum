// general helper functions

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
    }, 100);
}


function getCookie(cname) {  //from https://www.w3schools.com/js/js_cookies.asp
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

function log_out() {
    document.cookie = "username= ; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    console.log(document.cookie);
}
