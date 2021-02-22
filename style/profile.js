if(window.location.hash) {
    hashChange();
}

function hashChange() {
    let x = location.hash;
    let uID = x.substring(1);
    let uProfile = get_user_profile(uID);

    if(uProfile != null) {
        document.getElementById("user-id").innerHTML = "User ID: " + uProfile.userID;
        document.getElementById("display-name").innerHTML = uProfile.displayName;
        document.getElementById("user-level").innerHTML = "Level: " + uProfile.level;
        document.getElementById("banner-pic").src = "images/banner/" + uProfile.profileBanner + ".jpg";
        document.getElementById("profile-pic").src = "images/profilepic/" + uProfile.profilePic + ".jpg";
    }
}