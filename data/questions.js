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
        asker: "LoveOnePiece",
        lastAnswerer: "asdfgh",
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
        //add more
    }
];

// return the object given question ID
//function get_question(ID) { }

// return the object given answer ID
//function get_answer(ID) { }


// other potential to-do functions:
// sort questions by xx order


