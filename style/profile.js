let user_question = [];
let user_answer = [];
let user_accept_answer = [];

if(window.location.hash) {
    hashChange();
}

function hashChange() {
    let x = location.hash;
    let uID = x.substring(1);
    let uProfile = get_user_profile(uID);

    if(uProfile != null) {
        // banner element
        document.getElementById("user-id").innerHTML = "User ID: " + uProfile.userID;
        document.getElementById("display-name").innerHTML = uProfile.displayName;
        document.getElementById("user-level").innerHTML = "Level: " + uProfile.level;
        document.getElementById("banner-pic").src = "images/banner/" + uProfile.profileBanner + ".jpg";
        document.getElementById("profile-pic").src = "images/profilepic/" + uProfile.profilePic + ".jpg";

        //info panel element
        document.getElementById("gender").innerHTML = "Gender: " + uProfile.gender;
        document.getElementById("birthday").innerHTML = "Birthday: " + uProfile.birthday;
        document.getElementById("address").innerHTML = "Living in: " + uProfile.address;
        document.getElementById("interest").innerHTML = "Interests: " + uProfile.interest;

        // push user post data
        user_question = get_asked_question_for_user(uID);
        user_answer = get_answered_question_for_user(uID);
        user_accept_answer = get_accepted_question_for_user(uID);

        // by default, display asked question
        asked_question();
    }
}

// onclick events for post selector buttons
function asked_question() {
    reset_post_list_style();
    document.getElementById("asked_q").style = "background-color:rgb(246, 234, 179);"
    remove_all_post();
    insert_post_by_question_list(user_question);
}

// onclick events for post selector buttons
function answered_question() {
    reset_post_list_style();
    document.getElementById("answered_q").style = "background-color:rgb(246, 234, 179);"
    remove_all_post();
    insert_post_by_question_list(user_answer);
}

// onclick events for post selector buttons
function accepted_answer() {
    reset_post_list_style();
    document.getElementById("accepted_a").style = "background-color:rgb(246, 234, 179);"
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
    if(document.getElementById("post-list") != null) {
        document.getElementById("post-list").remove();
    } 
}

function insert_post_by_question_list(list) {
    let element = document.createElement("div");
    element.id = "post-list";
    document.getElementById("posts-container").appendChild(element);

    if (list.length == 0) {
        document.getElementById("post-list").innerHTML = "This user currently has no relevant post."
    } else {
        for (let i = 0; i < list.length; i++) {
            let post_element = document.createElement("div");
            post_element.innerHTML = '<a target="_blank" href="question.html#' + list[i].ID + '">' + list[i].summary + '</a>';
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