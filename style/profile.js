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

    }
}

// onclick events for post selector buttons
function asked_question() {
    reset_post_list_style();
    document.getElementById("asked_q").style = "background-color:rgb(246, 234, 179);"
    document.getElementById("post-list").innerHTML = "Gonna display asked questions here";
}

function answered_question() {
    reset_post_list_style();
    document.getElementById("answered_q").style = "background-color:rgb(246, 234, 179);"
    document.getElementById("post-list").innerHTML = "Gonna display answered questions here";

}

function accepted_answer() {
    reset_post_list_style();
    document.getElementById("accepted_a").style = "background-color:rgb(246, 234, 179);"
    document.getElementById("post-list").innerHTML = "Gonna display accepted answers here";
}

// set all three selector div to default colors
function reset_post_list_style() {  
    document.getElementById("asked_q").style = "color:#000;background-color:#FFF;"
    document.getElementById("answered_q").style = "color:#000;background-color:#FFF;"
    document.getElementById("accepted_a").style = "color:#000;background-color:#FFF;"
}