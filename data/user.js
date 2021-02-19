//this file contains the data and helper functions related to users

//Standard User: username: user, password: user 
//Admin user: username: admin, password: admin


// login credentials
var user_credentials = [
    {
        userID: "user", 
        password: "user",
        type: "normal"

    },
    {
        userID: "admin", 
        password: "admin",
        type: "admin"      
    }
];


// user profile info
var user_profiles = [
    {
        userID: "user", 
        displayName: "Bob",
        type: "normal",
        exp: 100,
        level: 2,
        gold: 0.5,
        profileBanner: 1,
        profilePic: 1,
        birthday: "1900.01.01",
        address: "Toronto",
        gender: "Male",
        interest: "anime and games",
    },
    {
        userID: "admin", 
        displayName: "God",
        type: "admin",
        exp: 666,
        level: 6,
        gold: 6666,
        profileBanner: 2,
        profilePic: 2,
        birthday: "secret",
        address: "Skyrim",
        gender: "Futa",
        interest: "be an admin",    
    }
];

// return true if the userID and password are valid
function valid_login_credential(ID, pwd) {
    var i;
    for(i = 0; i < user_credentials.length; i++) {
        if(user_credentials[i].userID == ID) {
            if(user_credentials[i].password == pwd) {
                return true;
            }
        }
    }
    return false;
}

// return the object given userID
function get_user_profile(ID) {
    var i;
    for(i = 0; i < user_profiles.length; i++) {
        if(user_profiles[i].userID == ID) {
            return user_profiles[i];
        }
    }
    return null;
}