//this file contains the data and helper functions related to question posts

// question posts info
var questions = [
    {
        ID: 1,
        summary: "What devil fruit did Sabo eat?",
        description: "",
        likeCount: 12,
        replyCount: 2,
        status: "Resolved",
        asker: "onepiecelover",
        lastAnswerer: "asdfgh",
        reward: 0,
        levelLimit: 0
    },
    {
        ID: 2,
        summary: "What would be the top three anime?",
        description: "imo one piece, naruto and bleach ^_^",
        likeCount: 233,
        replyCount: 5,
        status: "Ongoing",
        asker: "user",
        lastAnswerer: "",
        reward: 0,
        levelLimit: 0
    },
    {
        //add more
    }

];

// 
var answers = [
    {
        ID: 1,
        questionID: 1,
        answerer: "asdfgh",
        content: "Mera Mera no Mi",
        likeCount: 6,
        status: "Accepted",
    },
    {   
        ID: 2,
        questionID: 1,
        answerer: "noob",
        content: "who is Sabo?",
        likeCount: 0,
        status: "",
    },
    {
        ID: 3,
        questionID: 2,
        answerer: "onepiecelover",
        content: "one piece, one piece and one piece",
        likeCount: 168,
        status: "",
    },
    {
        ID: 4,
        questionID: 2,
        answerer: "asdfgh",
        content: "CODE GEASS, DEATH NOTE, HUNTER X HUNTER </br> yea I'm an old anime fan hah",
        likeCount: 54,
        status: "",
    },
  
    {
        //add more
    }
];

// return the object given question ID
//function get_question(ID) { }

// return the object given answer ID
//function get_answer(ID) { }


// other potential to-do functions:
// sort questions by xx order


