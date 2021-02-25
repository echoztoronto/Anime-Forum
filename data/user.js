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
        interest: "anime and games"
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
        interest: "be an admin"   
    },
    {
        userID: "kano",
        displayName: "KanoChan",
        type:"normal",
        exp: 100,
        level: 2,
        gold: 20,
        profileBanner: 100,
        profilePic: 100,
        birthday: "Dec.24",
        address: "Japan",
        gender: "Female",
        interest: "singing"
    },
    {
        userID: "noob",
        displayName: "NOOB",
        type:"normal",
        exp: 1,
        level: 1,
        gold: 0,
        profileBanner: 1,
        profilePic: 2,
        birthday: "July.25",
        address: "OwO",
        gender: "Male",
        interest: "answering questions"
    },
    {
        userID: "coco1998",
        displayName: "Coco",
        type:"normal",
        exp: 10,
        level: 2,
        gold: 0,
        profileBanner: 1,
        profilePic: 2,
        birthday: "July.2",
        address: "5 St. Joseph Street",
        gender: "Female",
        interest: "dancing"
    },
    {
        userID: "jason_z",
        displayName: "Jason",
        type:"normal",
        exp: 8,
        level: 1,
        gold: 0,
        profileBanner: 1,
        profilePic: 2,
        birthday: "May.22",
        address: "1001 bay street",
        gender: "Male",
        interest: "none"
    },
    {
        userID: "james_h",
        displayName: "James",
        type:"normal",
        exp: 20,
        level: 3,
        gold: 10,
        profileBanner: 1,
        profilePic: 2,
        birthday: "March.22",
        address: "Youyi Street",
        gender: "Male",
        interest: "Comics"
    },
    {
        userID: "zoegoodgood",
        displayName: "Zoe",
        type:"normal",
        exp: 20,
        level: 4,
        gold: 0,
        profileBanner: 1,
        profilePic: 2,
        birthday: "Dec.19",
        address: "4 Yonge Street",
        gender: "Female",
        interest: "Computer engineering"
    },
    {
        userID: "lee",
        displayName: "Harry Lee",
        type:"normal",
        exp: 10,
        level: 2,
        gold: 0,
        profileBanner: 1,
        profilePic: 2,
        birthday: "Nov.3",
        address: "Hongqi Street",
        gender: "Male",
        interest: "Cooking"
    },
    {
        userID: "alliez",
        displayName: "Aliali",
        type:"normal",
        exp: 10,
        level: 3,
        gold: 10,
        profileBanner: 1,
        profilePic: 2,
        birthday: "Apr.13",
        address: "297 Hongqi Street",
        gender: "Male",
        interest: "Video game"
    },
    {
        userID: "timf",
        displayName: "Timo",
        type:"normal",
        exp: 10,
        level: 10,
        gold: 20,
        profileBanner: 1,
        profilePic: 1,
        birthday: "May.23",
        address: "233 White Ave.",
        gender: "Male",
        interest: "drawing"
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