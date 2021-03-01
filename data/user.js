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
        num_answers: 0,
        num_accepted: 0
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
        num_answers: 0,
        num_accepted: 0 
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
        interest: "singing",
        num_answers: 2,
        num_accepted: 1
    },
    {
        userID: "noob",
        displayName: "XDD",
        type:"normal",
        exp: 1,
        level: 1,
        gold: 0,
        profileBanner: 8,
        profilePic: 2,
        birthday: "July.25",
        address: "OwO",
        gender: "Male",
        interest: "answering questions",
        num_answers: 5,
        num_accepted: 2
    },
    {
        userID: "coco1998",
        displayName: "Coco",
        type:"normal",
        exp: 10,
        level: 2,
        gold: 0,
        profileBanner: 4,
        profilePic: 12,
        birthday: "July.2",
        address: "5 St. Joseph Street",
        gender: "Female",
        interest: "dancing",
        num_answers: 0,
        num_accepted: 0
    },
    {
        userID: "jason_z",
        displayName: "Jason",
        type:"normal",
        exp: 8,
        level: 1,
        gold: 0,
        profileBanner: 5,
        profilePic: 4,
        birthday: "May.22",
        address: "1001 bay street",
        gender: "Male",
        interest: "none",
        num_answers: 0,
        num_accepted: 0
    },
    {
        userID: "james_h",
        displayName: "James",
        type:"normal",
        exp: 20,
        level: 3,
        gold: 10,
        profileBanner: 6,
        profilePic: 5,
        birthday: "March.22",
        address: "Youyi Street",
        gender: "Male",
        interest: "Comics",
        num_answers: 0,
        num_accepted: 0
    },
    {
        userID: "zoegoodgood",
        displayName: "Zoe",
        type:"normal",
        exp: 20,
        level: 4,
        gold: 0,
        profileBanner: 7,
        profilePic: 6,
        birthday: "Dec.19",
        address: "4 Yonge Street",
        gender: "Female",
        interest: "Computer engineering",
        num_answers: 0,
        num_accepted: 0
    },
    {
        userID: "Johnathan-Daniel-Holmes",
        displayName: "Johnathan Daniel Holmes",
        type:"normal",
        exp: 10,
        level: 2,
        gold: 0,
        profileBanner: 9,
        profilePic: 7,
        birthday: "Nov.3",
        address: "Hongqi Street",
        gender: "Male",
        interest: "Cooking",
        num_answers: 0,
        num_accepted: 0
    },
    {
        userID: "Severine-Riise",
        displayName: "Severine Riise",
        type:"normal",
        exp: 10,
        level: 3,
        gold: 10,
        profileBanner: 8,
        profilePic: 8,
        birthday: "Apr.13",
        address: "297 Hongqi Street",
        gender: "Male",
        interest: "Video game",
        num_answers: 0,
        num_accepted: 0
    },
    {
        userID: "timf",
        displayName: "Timo",
        type:"normal",
        exp: 10,
        level: 10,
        gold: 20,
        profileBanner: 9,
        profilePic: 9,
        birthday: "May.23",
        address: "233 White Ave.",
        gender: "Male",
        interest: "drawing",
        num_answers: 0,
        num_accepted: 0
    },
    {
        userID: "onepiecelover",
        displayName: "Monkey D. Luffy",
        type:"normal",
        exp: 30,
        level: 2,
        gold: 20,
        profileBanner: 3,
        profilePic: 3,
        birthday: "Jan.2",
        address: "Thousand Sunny",
        gender: "Male",
        interest: "One Piece",
        num_answers: 1,
        num_accepted: 0
    },
    {
        userID: "asdfgh",
        displayName: "ASDFGH",
        type:"normal",
        exp: 30,
        level: 1,
        gold: 0,
        profileBanner: 10,
        profilePic: 10,
        birthday: "Unknown",
        address: "Unknown",
        gender: "Unknown",
        interest: "Unknown",
        num_answers: 0,
        num_accepted: 0
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