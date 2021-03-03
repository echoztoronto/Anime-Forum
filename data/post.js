//this file contains the data and helper functions related to question posts

// question posts info
const questions = [
    {
        ID: 1,
        summary: "What devil fruit did Sabo eat?",
        description: "Sorry guys I'm just too lazy to Google it lol",
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
        summary: "What are the top 3 anime?",
        description: "What are the top 3 anime?",
        likeCount: 71,
        replyCount: 4,
        status: "Ongoing",
        asker: "zoegoodgood",
        lastAnswerer: "aniMayor",
        reward: 0,
        levelLimit: 0
    },
    {
        ID: 3,
        summary: "Similar animes to Classroom of Elite?",
        description: "Hello I was a huge fan of classroom of elite and wanted to know if their r any similar animes maybe give a few cause there is a chance I already saw some similar. Thanks.",
        likeCount: 13,
        replyCount: 1,
        status: "Ongoing",
        asker: "coco1998",
        lastAnswerer: "Liszt",
        reward: 0,
        levelLimit: 0
    },
    {
        ID: 4,
        summary: "Is Detective Conan ever going to end?",
        description: "Hello, I am a huge fan of Case Closed. Is Detective Conan ever going to end?",
        likeCount: 12,
        replyCount: 1,
        status: "Resolved",
        asker: "timf",
        lastAnswerer: "Zoe",
        reward: 10,
        levelLimit: 5
    },
    {
        ID: 5,
        summary: "why one punch man season 2 is bad?",
        description: "I love One Punch Man. but I noticed that the season two is too lame..why one punch man season 2 is that bad?",
        likeCount: 10,
        replyCount: 2,
        status: "Ongoing",
        asker: "kano",
        lastAnswerer: "Jason",
        reward: 5,
        levelLimit: 5
    },
    {
        ID: 6,
        summary: "why one punch man is so strong?",
        description: "Why one punch man is so strong? He is just a human.",
        likeCount: 5,
        replyCount: 1,
        status: "Resolved",
        asker: "Johnathan-Daniel-Holmes",
        lastAnswerer: "Coco",
        reward: 5,
        levelLimit: 0
    },
    {
        ID: 7,
        summary: "Why is anime still treated as childish, despite being so famous and diverse?",
        description: "<p>Anime is so famous and globally recognized that it’s unbelievable. But because of how it’s treated by the masses (in general), the industry’s smaller than it should be.Are people just being ignorant? Are big TV companies denying the existence of anime out of fear?</p> <p>Are people just being ignorant? Are big TV companies denying the existence of anime out of fear?</p>",
        likeCount: 0,
        replyCount: 0,
        status: "Ongoing",
        asker: "kano",
        lastAnswerer: "",
        reward: 0,
        levelLimit: 0
    }
];

// 
const answers = [
    {
        ID: 1,
        questionID: 1,
        answerer: "asdfgh",
        content: "Mera Mera no Mi",
        likeCount: 6,
        accepted: true,
    },
    {   
        ID: 2,
        questionID: 1,
        answerer: "noob",
        content: "who is Sabo?",
        likeCount: 0,
        accepted: false,
    },
    {
        ID: 3,
        questionID: 2,
        answerer: "onepiecelover",
        content: "one piece, one piece and one piece.",
        likeCount: 90,
        accepted: false,
    },
    {
        ID: 4,
        questionID: 2,
        answerer: "asdfgh",
        content: "CODE GEASS, DEATH NOTE, HUNTER X HUNTER <br/> yea I'm an old anime fan hah",
        likeCount: 54,
        accepted: false,
    },
    {
        ID: 5,
        questionID: 2,
        answerer: "Severine-Riise",
        content: "<p>The big three are One Piece, Naruto, and Bleach. They are amongst the longest running series in the anime world (two of them are over now, but when they were named as the big three they were all ongoing). </p> <p>Two of them have been grossly successful overseas, while the third (One Piece) is regarded one of the most popular series in Japan. The merchandise associated with these three series is extensive. While I was in Japan at least one of them hogged any sort of themed souvenir representing cities, historical sites, and rural areas. This has been caused by the widespread popularity, as well as contributing in maintaining it.</p><p> Other merchandise includes bedsheets, necklaces, pillows, games, clothes, phone covers etc. They have become a brand as much as they are a series, and have inspired as well as been inspired by a number of other series over the years.</p><ul> <li> <b>Naruto </b>is the new image of Ninja/shinobi.</li> <li> <b>Luffy</b> is the new image of a pirate.</li> <li><b>Ichigo</b> is the image of a death god/shinigami (and he effectively became a genre by himself overseas, where the concept of death gods were less common).</li></ul>",
        likeCount: 6,
        accepted: false,
    },
    {
        ID: 6,
        questionID: 2,
        answerer: "Johnathan-Daniel-Holmes",
        content: "To most fans it because of their show. But to me it actually base off the manga. Each series is different but the series really aren't that much different. And that why some fans love it. Example, Luffy and Naruto are trying to complete their dreams and by this they need to be strong. Ichigo and Luffy want to be strong so that they can protect them (However unlike Luffy, Ichigo is a little bit protective). Each series is connected but you can mostly see it within these threes. But thanks to the fan-base it became an generation thing. As the years gone by Naruto is finally done and a spin-off is currently being work on, but it won't be the same. Bleach just hit a rock bottom because the fans aren't too thrill about it. I think it's fact it just repeat itself over and over. The biggest manga that is still going is one piece and we have two or three years of it left. And unlike DBZ, they don't fight in every chapter or episodes. Sure they fight but they sometimes lose and focus on other characters while DBZ is 80% of fighting and 20% on characters development. Shoot once someone dies they can't come back because of the dragon balls and that what make these three series great cause once you see your favorite character dies you feel heartbroken. In fact the Dragon Ball series use to do that and when they brought back their friends it give fans joy. Now it just, 'Great. Krillin is dead again.' The big three are known for their typical cliche but they are mostly know by these reasons and these reasons are mostly why they are popular.",
        likeCount: 50,
        accepted: false,
    },
    {
        ID: 7,
        questionID: 3,
        answerer: "jason_z",
        content: "See if any of these anime interest you:<br/> 1. Death Parade 2. Danganronpa: The Animation 3.The Money and Soul of Possibility 4.The Fruit of Grisaia,",
        likeCount: 11,
        accepted: false,
    },
    {   
        ID: 8,
        questionID: 4,
        answerer: "zoegoodgood",
        content: "The manga itself is still being released and will be releasing by the end of 2019 so episodes will be releasing by 2020 until a new manga episode of 2020 releases. This cycle will keep on going until Gosho Ayoma says so.",
        likeCount: 5,
        accepted: true,
    },
    {   
        ID: 9,
        questionID: 5,
        answerer: "james_h",
        content: "Yes, I wonderee why too.",
        likeCount: 6,
        accepted: false,
    },
    {   
        ID: 10,
        questionID: 5,
        answerer: "jason_z",
        content: "The biggest reason why the animation sucked was due to the lack of production time. When you get less time to work on stuff, you have to cut around corners. This is why most of the stuff from One Punch Man Season 2 wasn't close to the level of One Punch Man Season 1.",
        likeCount: 16,
        accepted: false,
    },

    {   
        ID: 11,
        questionID: 6,
        answerer: "coco1998",
        content: "Saitama got so strong because he broke his limiter. The limiter, limits what is possible for someone until their growth eventually hits a wall and they are no longer capable of reaching new heights. Basically a man could be able to lift 1000 lbs and that would be his limit.",
        likeCount: 10,
        accepted: true,
    }
    
];

// return the object given question ID
function get_question(ID){
    for (let i = 0; i < questions.length; i++){
        if (questions[i].ID == ID){
            return questions[i];
        }
    }
    return null;
}

// return the object given answer ID
function get_answer(ID){
    for (let i = 0; i < answers.length; i++){
        if (answers[i].ID == ID){
            return answers[i];
        }
    }
    return null;
}

// return a list of answer objects given question ID
function get_answer_by_question(qID){
    let answer_list = [];
    for (let i = 0; i < answers.length; i++){
        if (answers[i].questionID == qID){
            answer_list.push(answers[i]);
        }
    }
    return answer_list;
}



