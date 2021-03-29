let user_question = [];
let user_answer = [];
let user_accept_answer = [];
let uProfile = null;

let is_self = false;

if(window.location.hash) {
    hashChange();
}

function hashChange() {
    let x = location.hash;
    let uID = x.substring(1);

    // TODO: actually verify if it is self profile
    if(uID == "user") {
        is_self = true;
    } else {
        is_self = false;
    }

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
            profileBanner: json.profileBanner,
            profilePic: json.profilePic,
            userID: json.userID
        }

        if(is_self){
            uProfile["gold"] = json.gold;
            uProfile["exp"] = json.exp;
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
            document.getElementById("banner-pic").src = "images/banner/" + uProfile.profileBanner + ".jpg";
            document.getElementById("profile-pic").src = "images/profilepic/" + uProfile.profilePic + ".jpg";

            //info panel element
            document.getElementById("gender").innerHTML =  uProfile.gender;
            document.getElementById("birthday").innerHTML =  uProfile.birthday;
            document.getElementById("address").innerHTML = uProfile.address;
            document.getElementById("interest").innerHTML = uProfile.interest;

            // push user post data
            user_question = get_asked_question_for_user(uID);
            user_answer = get_answered_question_for_user(uID);
            user_accept_answer = get_accepted_question_for_user(uID);

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
                // TODO: pull data to verify if user already checked in today, if so, disable the button
                let checkin = create_element("div", "check-in-btn", '', "profile-banner");
                checkin.innerHTML = `Check In`;
                checkin.addEventListener("click", checkin_click);
            } else {
                document.getElementById("user-exp").innerHTML = '';
                document.getElementById("user-gold").innerHTML = '';
                remove_element_by_ID("edit-btn");
                remove_element_by_ID("check-in-btn");
            }

        } else { //if there is no such user
            if(document.getElementById("error-page") == null) {
                let error_element = document.createElement("div");
                error_element.id = "error-page";
                error_element.innerHTML = `This user account does not exist
                                            <br/> 
                                            or it has been deleted`;
                document.body.appendChild(error_element);
            }  
        }
    })
    
    .catch((error) => {
        console.log(error)
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
            post_element.href = "question.html#" + list[i].ID;
            post_element.target = "_blank";
            post_element.innerHTML =  list[i].summary + "<span style = 'color: green; margin-left: 10px;'> [" + list[i].status + "] </span>";
            post_element.className = "post-single";
            document.getElementById("post-list").appendChild(post_element);
        }
    }
}

// get desired question list
function get_asked_question_for_user(uID) {
    let result = [];
    for(let i = 0; i < questions.length; i++) {
        if(questions[i].asker == uID) {
            result.push(questions[i]);
        }
    }
    return result;
}

// get desired question list
function get_answered_question_for_user(uID) {
    let qIDs = [];
    let result = [];
    for(let i = 0; i < answers.length; i++) {
        if(answers[i].answerer == uID) {
            qIDs.push(answers[i].questionID);
        }
    }

    for(let i = 0; i < qIDs.length; i++) {
        for(let j = 0; j < questions.length; j++) {
            if(qIDs[i] == questions[j].ID) {
                result.push(questions[j]);
            }           
        }    
    }
    return result;
}

// get desired question list
function get_accepted_question_for_user(uID) {
    let qIDs = [];
    let result = [];
    for(let i = 0; i < answers.length; i++) {
        if(answers[i].answerer == uID && answers[i].accepted) {
            qIDs.push(answers[i].questionID);
        }
    }

    for(let i = 0; i < qIDs.length; i++) {
        for(let j = 0; j < questions.length; j++) {
            if(qIDs[i] == questions[j].ID) {
                result.push(questions[j]);
            }           
        }    
    }
    return result;
}


//  Check In --------------------------------------------------------
function checkin_click() {
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

    // disable the button
    checkin_disable();

    // update exp and gold DOM
    let exp = uProfile.exp;
    let gold = uProfile.gold;
    exp += 5;
    gold += 1;
    document.getElementById("user-exp").innerHTML = `EXP: ${exp}`;
    document.getElementById("user-gold").innerHTML = `Gold: ${gold}`;

    // TODO: update user exp and gold info to server

}

function checkin_disable() {
    let checkin = document.getElementById("check-in-btn");
    checkin.innerHTML = `Checked In`;
    checkin.style.backgroundColor = "grey";
    checkin.style.borderColor = "grey";
    checkin.removeEventListener("click", checkin_click);
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
        //TODO: update new profile info to server
        const modified_profile = {
            displayName: document.getElementById("edit-name").value,
            birthday: document.getElementById("edit-bday").value,
            gender: document.getElementById("edit-gender").value,
            address: document.getElementById("edit-place").value,
            interest: document.getElementById("edit-interest").value
        }

        // create PATCH request with updated user information
        const url = '/user/' + uProfile.userID;
        const request = new Request(url, {
            method: 'patch', 
            body: JSON.stringify(modified_profile),
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
        });

        console.log(request);
        console.log(request.body);
        // Send the request with fetch()
        fetch(request)
        .then(function(res) {
            console.log(res)
            if (res.status === 200) {
                console.log('updated profile')
            } else console.log('Could not update profile')           
        }).catch((error) => {
            console.log(error)
        })

        /*
        // apply profile pic
        if(document.getElementById("edit-pic").files.length != 0 ){
            apply_input_image_to_div("edit-pic", "profile-pic");
            apply_input_image_to_div("edit-pic", "nav_user_profile");
        }
        // apply banner
        if(document.getElementById("edit-banner").files.length != 0 ){
            apply_input_image_to_div("edit-banner", "banner-pic");
        }
        // apply text info
        apply_input_value_to_div("edit-name","nav_username");
        apply_input_value_to_div("edit-name","display-name");
        apply_input_value_to_div("edit-bday","birthday");
        apply_input_value_to_div("edit-gender","gender");
        apply_input_value_to_div("edit-place","address");
        apply_input_value_to_div("edit-interest","interest");
        */
       
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
