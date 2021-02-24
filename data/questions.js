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
        summary: "How long does it take for a single Anime episode to be made?",
        description: "",
        likeCount: 71,
        replyCount: 3,
        status: "Resolved",
        asker: "20years-lonely",
        lastAnswerer: "aniMayor",
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
        ID: 3,
        summary: "Classroom of elite similar?",
        description: "Hello I was a huge fan of classroom of elite and wanted to know if their r any similar animes maybe give a few cause there is a chance I already saw some similar. Thanks.",
        likeCount: 13,
        replyCount: 1,
        status: "Resolved",
        asker: "Zoomer",
        lastAnswerer: "Liszt",
        reward: 0,
        levelLimit: 0
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
        answerer: "steven",
        content: "It takes around 8-12 months to make an episode but animators work simultaneously on other episodes as well. Usually, they complete only 3-4 episodes before the release of the season and completes the other episodes as the season moves on.",
        likeCount: 90,
        status: "Accepted",
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
        ID: 5,
        questionID: 2,
        answerer: "Crosswrm",
        content: "I remember some discussions about Dragon Ball Super when it was airing, and some producers said it could take 6+ months to make an episode",
        likeCount: 6,
        status: "",
    },
    {
        ID: 6,
        questionID: 2,
        answerer: "aniMayor",
        content: "From what I got from shirobako, I'd say that it'd take a few months",
        likeCount: 50,
        status: "",
    },
    {
        ID: 7,
        questionID: 3,
        answerer: "Liszt",
        content: "See if any of these anime interest you:<br/> 1. Death Parade 2. Danganronpa: The Animation 3.The Money and Soul of Possibility 4.The Fruit of Grisaia,",
        likeCount: 11,
        status: "",
        answerer: "onepiecelover",
        content: "one piece, one piece and one piece",
        likeCount: 168,
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


