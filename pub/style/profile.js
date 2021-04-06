let user_question = [];
let user_answer = [];
let user_accept_answer = [];
let uProfile = null;
let is_self = false;
let checked_in = false;
let self_profile = null;

// get self ID from cookie
let self_ID = getCookie("username");

if(self_ID != "") {
    // use GET method to get self info
    const url = '/user/' + self_ID;
    fetch(url)
    .then((res) => { 
        if (res.status === 200) {
            return res.json() 
        } else {
                console.log('Could not get user')
                console.log(res)
        }                
    })
    // then save public data into self_profile
    .then((json) => { 
        self_profile = {
            level: json.level,
            userID: json.userID,
            displayName: json.displayName,
            gold: json.gold,
            exp: json.exp,
            profilePicImg: json.profilePicImg
        }
        document.getElementById("nav_user_profile").src = json.profilePicImg;
        document.getElementById("clickable_icon").href = "profile.html#" + self_ID;
    })
} else {  // user is not logged in
    err_message = "Please login to view the user profile";
    go_to_error_page(err_message);
}

if(window.location.hash && self_ID != "") {
    updatePage();
}

function updatePage() {
    let x = location.hash;
    let uID = x.substring(1);
    if(uID == self_ID) is_self = true;
    else is_self = false;

    // use GET method to get user info
    const url = '/user/' + uID;
    fetch(url)
    .then((res) => { 
        if (res.status === 200) {
           return res.json() 
       } else {
            console.log('Could not get user')
            console.log(res)
       }                
    })
    // then save public data into uProfile
    .then((json) => { 
        uProfile = {
            address: json.address,
            birthday: json.birthday,
            displayName: json.displayName,
            gender: json.gender,
            interest: json.interest,
            level: json.level,
            userID: json.userID,
            bannerImg: json.bannerImg,
            profilePicImg: json.profilePicImg,
            asked: json.asked,
            answered: json.answered,
            accepted: json.accepted
        }

        if(is_self){
            uProfile["gold"] = json.gold;
            uProfile["exp"] = json.exp;
            uProfile["checkin"] = json.checkin;
        }

        // start DOM rendering
        if(uProfile != null) {
            //remove error page if it's there
            if(document.getElementById("error-page") != null) {
                document.getElementById("error-page").remove;
                location.reload();
            }

            // banner element
            document.getElementById("user-id").innerHTML = "User ID: " + uProfile.userID;
            document.getElementById("display-name").innerHTML = uProfile.displayName;
            document.getElementById("user-level").innerHTML = "Level: " + uProfile.level;
            if(uProfile.bannerImg ==  undefined) document.getElementById("banner-pic").src = "images/others/default_banner.jpg";
            else document.getElementById("banner-pic").src =  uProfile.bannerImg;
            if(uProfile.profilePicImg ==  undefined) document.getElementById("profile-pic").src = "images/others/default.jpg";
            else document.getElementById("profile-pic").src = uProfile.profilePicImg;


            //info panel element
            document.getElementById("gender").innerHTML =  uProfile.gender;
            document.getElementById("birthday").innerHTML =  uProfile.birthday;
            document.getElementById("address").innerHTML = uProfile.address;
            document.getElementById("interest").innerHTML = uProfile.interest;

            // push user post data
            user_question = uProfile.asked;
            user_answer = uProfile.answered;
            user_accept_answer = uProfile.accepted;

            // by default, display asked question
            asked_question();

            // if this is a self page
            if(is_self) {
                // display user exp and gold
                document.getElementById("user-exp").innerHTML = "EXP: " + uProfile.exp;
                document.getElementById("user-gold").innerHTML = "Gold: " + uProfile.gold;
                // edit profile button
                let edit = create_element("div", "edit-btn", '', "profile-banner");
                edit.innerHTML = `Edit Profile`;
                edit.addEventListener("click", edit_click);
                // check in notif div
                create_element("div", "check-in-notif", '', "profile-banner");
                // check in button
                remove_element_by_ID("check-in-btn");
                let checkin = create_element("div", "check-in-btn", '', "profile-banner");
                checkin.innerHTML = `Check In`;
                
                // verify if user already checked in today
                for (let i = 0; i < uProfile.checkin.length; i++) {
                    if(uProfile.checkin[i] = get_today_date()) checked_in = true;
                }
                if(checked_in) checkin_disable();
                else {
                    checkin.addEventListener("click", checkin_click);
                    checkin.addEventListener("mouseover",checkin_hover);
                    checkin.addEventListener("mouseout",checkin_unhover);
                    checkin.style.color = "#FFFFFF";
                    checkin.style.backgroundColor = "#c01baa";
                }
            } else {
                document.getElementById("user-exp").innerHTML = '';
                document.getElementById("user-gold").innerHTML = '';
                remove_element_by_ID("edit-btn");
                remove_element_by_ID("check-in-btn");
            }

        } 
    })
    .catch((error) => {
        console.log(error)
        err_message = "This user account does not exist";
        go_to_error_page(err_message);
    })
}

// onclick events for post selector buttons
function asked_question() {
    reset_post_list_style();
    document.getElementById("asked_q").style = "background-color: #95c6ff;"
    remove_all_post();
    insert_post_by_question_list(user_question);
}

// onclick events for post selector buttons
function answered_question() {
    reset_post_list_style();
    document.getElementById("answered_q").style = "background-color: #95c6ff;"
    remove_all_post();
    insert_post_by_question_list(user_answer);
}

// onclick events for post selector buttons
function accepted_answer() {
    reset_post_list_style();
    document.getElementById("accepted_a").style = "background-color: #95c6ff;"
    remove_all_post();
    insert_post_by_question_list(user_accept_answer);
}

// set all three selector div to default colors
function reset_post_list_style() {  
    document.getElementById("asked_q").style = "color:#000;background-color:#FFF;"
    document.getElementById("answered_q").style = "color:#000;background-color:#FFF;"
    document.getElementById("accepted_a").style = "color:#000;background-color:#FFF;"
}

function remove_all_post() {
    remove_element_by_ID("post-list");
}

function insert_post_by_question_list(list) {
    let element = document.createElement("div");
    element.id = "post-list";
    document.getElementById("posts-container").appendChild(element);

    if (list.length == 0) {
        if(is_self) {
            document.getElementById("post-list").innerHTML = "You currently don't have any relevant post."
        } else {
            document.getElementById("post-list").innerHTML = "This user currently has no relevant post."
        }
    } else {
        for (let i = 0; i < list.length; i++) {
            let post_element = document.createElement("a");
            post_element.href = "question.html#" + list[i].qid;
            post_element.target = "_blank";
            post_element.innerHTML =  list[i].summary;
            post_element.className = "post-single";
            document.getElementById("post-list").appendChild(post_element);
        }
    }
}

//  Check In --------------------------------------------------------
function checkin_click() {
    // disable the button
    checkin_disable();
    
    // show notif
    let notif = document.getElementById("check-in-notif");
    notif.innerHTML = `+5 exp, +1 gold`;
    notif.style.visibility = "visible";
    // let notif dismiss after 3 seconds
    setTimeout(function() {
        let notif = document.getElementById("check-in-notif");
        notif.style.visibility = "hidden";
        notif.innerHTML = ``;
    }, 3000);

    // update exp and gold DOM
    let exp = uProfile.exp;
    let gold = uProfile.gold;
    let level = uProfile.level;
    exp += 5;
    gold += 1;
    const updated = calculate_exp_and_level(level, exp);
    level = updated[0];
    exp = updated[1];
    document.getElementById("user-exp").innerHTML = `EXP: ${exp}`;
    document.getElementById("user-gold").innerHTML = `Gold: ${gold}`;
    document.getElementById("user-level").innerHTML = `Level: ${level}`;

    // update user exp and gold info to server
    const modified_profile = {
        exp: exp,
        gold: gold,
        level: level,
        checkin: uProfile.checkin.push(get_today_date())
    }
    const url = '/user/' + uProfile.userID;
    const request = new Request(url, {
        method: 'PATCH', 
        body: JSON.stringify(modified_profile),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
    });

    // Send the request with fetch()
    fetch(request)
    .then(function(res) {
        if (res.status === 200) {
            console.log('updated profile')
        } else console.log('Could not update profile')           
    }).catch((error) => {
        console.log(error)
    })
    
}

function checkin_disable() {
    let checkin = document.getElementById("check-in-btn");
    checkin.innerHTML = `Checked In`;
    checkin.removeEventListener("mouseover",checkin_hover);
    checkin.removeEventListener("mouseout",checkin_unhover);
    checkin.style.backgroundColor = "grey";
    checkin.style.borderColor = "grey";
    checkin.style.color = "black";
    checkin.disabled = true;
}

function checkin_hover() {
    let checkin = document.getElementById("check-in-btn");
    checkin.style.color = "#000000";
    checkin.style.backgroundColor = "#FFFFFF";
    checkin.style.cursor = "pointer";
}

function checkin_unhover() {
    let checkin = document.getElementById("check-in-btn");
    checkin.style.color = "#FFFFFF";
    checkin.style.backgroundColor = "#c01baa";
}

function get_today_date() {   // from https://stackoverflow.com/questions/1531093/how-do-i-get-the-current-date-in-javascript
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); 
    let yyyy = today.getFullYear();
    
    return  mm + '/' + dd + '/' + yyyy;
}

// Edit Profile --------------------------------------------------------
function edit_click() {
    document.getElementById("edit-window").style.visibility = "visible";
    edit_reset();
}

function edit_close() {
    document.getElementById("edit-window").style.visibility = "hidden";
}

function edit_reset() {
    document.getElementById('edit-name').value = document.getElementById('display-name').textContent;
    document.getElementById('edit-bday').value = document.getElementById('birthday').textContent;
    document.getElementById('edit-gender').value = document.getElementById('gender').textContent;
    document.getElementById('edit-place').value = document.getElementById('address').textContent;
    document.getElementById('edit-interest').value = document.getElementById('interest').textContent;
    document.getElementById('edit-message').innerHTML = ``;
}

function edit_submit() {
    let new_name = document.getElementById('edit-name').value;

    if(new_name.length < 4) {
        document.getElementById('edit-message').innerHTML = `Display Name should have at least 4 characters!`;
    } else {
        // update new profile info to server
        const modified_profile = {
            displayName: document.getElementById("edit-name").value,
            birthday: document.getElementById("edit-bday").value,
            gender: document.getElementById("edit-gender").value,
            address: document.getElementById("edit-place").value,
            interest: document.getElementById("edit-interest").value
        }
        update_profile_request_and_fetch(modified_profile);

        // update banner
        if(document.getElementById("edit-banner").files.length != 0 ){
            let fReader = new FileReader();
            fReader.readAsDataURL(document.getElementById("edit-banner").files[0]);
            fReader.onload = function() {
                const modified = {bannerImg: fReader.result};
                update_profile_request_and_fetch(modified);
            };
        }

        // update profilePic
        if(document.getElementById("edit-pic").files.length != 0 ){
            let fReader = new FileReader();
            fReader.readAsDataURL(document.getElementById("edit-pic").files[0]);
            fReader.onload = function() {
                const modified = {profilePicImg: fReader.result};
                update_profile_request_and_fetch(modified);
            };
        }

        edit_close();
    }
}

function preview_profile_pic() {
    apply_input_image_to_div("edit-pic", "preview-pic");
};

function preview_profile_banner() {
    apply_input_image_to_div("edit-banner", "preview-banner");
};

function apply_input_image_to_div(inputID, divID) {
    let fReader = new FileReader();
    fReader.readAsDataURL(document.getElementById(inputID).files[0]);

    fReader.onload = function(e) {
        document.getElementById(divID).src = e.target.result;
    };
}

function apply_input_value_to_div(inputID, divID) {
    document.getElementById(divID).innerHTML =  document.getElementById(inputID).value;
}


function update_profile_request_and_fetch(modified_profile) {
    // create PATCH request with updated user information
    const url = '/user/' + uProfile.userID;
    const request = new Request(url, {
        method: 'PATCH', 
        body: JSON.stringify(modified_profile),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
    });

    // Send the request with fetch()
    fetch(request)
    .then(function(res) {
        if (res.status === 200) {
            console.log('updated profile')
            updatePage()
        } else console.log('Could not update profile')           
    }).catch((error) => {
        console.log(error)
    })
}