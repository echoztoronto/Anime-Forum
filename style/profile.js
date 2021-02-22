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

function asked_question() {
    document.getElementById("post-list").innerHTML = "Gonna display asked questions here";
}

function answered_question() {
    document.getElementById("post-list").innerHTML = "Gonna display answered questions here";

}

function accepted_answer() {
    document.getElementById("post-list").innerHTML = "Gonna display accepted answers here";
}