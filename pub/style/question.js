let quill = null;  //editor object
let qID = 0;
let qSummary = '';
let already_answered = false;
let am_asker = false;

// get self ID from cookie
let self_ID = getCookie("username");
let self_profile = null;

if(self_ID != "") {
    // use GET method to get self info
    const url = '/user/' + self_ID;
    fetch(url)
    .then((res) => { 
        if (res.status === 200) {
        return res.json() 
    } else {
            console.log('Could not get user')
            console.log(res)
    }                
    })
    .then((json) => { 
        self_profile = {
            level: json.level,
            userID: json.userID,
            displayName: json.displayName,
            gold: json.gold,
            exp: json.exp,
            profilePicImg: json.profilePicImg,
            answered: json.answered
        }
        for(let i = 0; i < self_profile.answered.length; i++) {
            if(self_profile.answered[i].qid == qID) already_answered = true;
        }
        document.getElementById("nav_user_profile").src = json.profilePicImg;
        document.getElementById("clickable_icon").href = "profile.html#" + self_ID;
    })
} else {  // user is not logged in
    err_message = "Please login to view the questions";
    go_to_error_page(err_message);
}

if(window.location.hash && self_ID != "") {
    updatePage();
}

// update page with updated question ID
async function updatePage(sort="like") {     // sort range in {"like", "time"}
    let x = location.hash;
    qID = x.substring(1);
    
    try{
        const res = await fetch(`/question/${qID}`);      // use GET route to get the question
        const qObject = await res.json();
        if(qObject != null) {
            //remove error page if it's there
            if(document.getElementById("error-page") != null) {
                document.getElementById("error-page").remove;
                location.reload();
            }
            qSummary = qObject.summary;
            if(qObject.asker.userID == self_ID) am_asker = true;
    
            //get asker info
            // fetch to GET the asker
            const user_res = await fetch(`/user/${qObject.asker.userID}`);
            const uProfile = await user_res.json();
    
            // update asker info DOM
            document.getElementById("asker-icon").src = uProfile.profilePicImg;
            document.getElementById("asker-name").innerHTML = '<a href="profile.html#' + uProfile.userID 
                    + '" target="_blank">' +  uProfile.displayName + '</a>';
            document.getElementById("asker-level").innerHTML = "Level: " + uProfile.level;
            
            // update question info DOM
            document.getElementById("question-title").innerHTML = '<b>' + qObject.summary + '</b>';
            document.getElementById("question-status").innerHTML = '[' + qObject.status + ']';
            document.getElementById("question-description").innerHTML = qObject.description;
            document.getElementById("question-reward").innerHTML = 'Reward: ' + qObject.reward;
            document.querySelector(`#question_vote_num`).innerHTML = qObject.likeCount;
            
            // add eventlisener to question voter
            document.querySelector('.like_button_question').addEventListener('click', like_question);
            document.querySelector('.dislike_button_question').addEventListener('click', dislike_question);
            document.querySelector('.like_button_question').id = `${qID}`;
            document.querySelector('.dislike_button_question').id = `${qID}`;

            // route to get all answers of the question
            const answer_res = await fetch(`./answers-of-question/${qObject.questionID}`);
            const answer_list = await answer_res.json();
            if (sort == "like"){
                answer_list.sort(function(a, b){ return b.likeCount - a.likeCount; });
            }else{
                answer_list.sort(function(a, b){ return b.answerID - a.answerID; });
            }
            // remove previous answer posts
            remove_answer_posts();
            // insert each answer
            if(answer_list.length != 0) {
                insert_answer_posts(answer_list);
                add_event_listener();
            }
            //add text editor if question is not resolved
            if(qObject.status != "Resolved" && !already_answered && !am_asker) {
                document.getElementById("add-answer-btn").style = "visibility: visible;";
                if(quill == null) {
                    initiate_answer_editor();
                }  
            } else {
                document.getElementById("add-answer-btn").style = "visibility: hidden;";
            }
        }
    }catch(err){
        console.log('Could not get answers to the question');
        console.log(err);
        err_message = "The question page you are trying to visit does not exist";
        go_to_error_page(err_message);
    }

}

// onclick events for sorting 
function sort_by_time() {
    document.getElementById("sort-by-time").style = "text-decoration: underline;"
    document.getElementById("sort-by-like").style = "text-decoration: none;"
    updatePage("time");
}

function sort_by_like() {
    document.getElementById("sort-by-like").style = "text-decoration: underline;"
    document.getElementById("sort-by-time").style = "text-decoration: none;"
    updatePage("like");
}


// remove answer posts container
function remove_answer_posts() {
    let over = false;
    let i = 0;
    while(!over) {
        if(document.getElementById("answer-post-"+i) == null) {
            over = true;
        } else {
            document.getElementById("answer-post-"+i).remove();
            i++;
        }
    }

    //remove self answer
    remove_element_by_ID("self-post");
}

// insert answer posts by the order of given list
async function insert_answer_posts(answer_list) {
    let i = 0;
    for(i = 0; i < answer_list.length; i++) {
        // get answerer profile object
        // get user profile by route 
        try{
            const user_res = await fetch(`/user/${answer_list[i].answerer.userID}`);
            const aProfile = await user_res.json();
            
            // create the DOM for answer post
            let element = document.createElement("div");
            element.className = "post-container";
            element.id = "answer-post-"+i;
            document.getElementById("question-container").appendChild(element);
            element.innerHTML = `
                <div class='post-profile-answerer'>
                    <img class='post-profile-icon' id='answerer-icon-${i}' src='//:0'/>
                    <div class='post-profile-info'>
                        <div class='display-name' id='answerer-name-${i}'></div> 
                        <div class='user-level' id='answerer-level-${i}'></div>
                    </div>
                </div>
                <div class='post-content'>
                    <div class="vote_container">
                        <div class="like_button_answer" id="${answer_list[i].questionID}/${answer_list[i]._id}">&#9650</div>
                        <div class="like_num">${answer_list[i].likeCount}</div>
                        <div class="dislike_button_answer" id="${answer_list[i].questionID}/${answer_list[i]._id}">&#9660</div>
                    </div>
                    <div class='post-description' id='answer-description-${i}'></div>
                    <div class ='accept-description' id='answer-accept-${i}'></div>
                </div>`;

            add_event_listener();       // add event listener
            // update answerer info DOM
            document.getElementById("answerer-icon-"+i).src = aProfile.profilePicImg;
            document.getElementById("answerer-name-"+i).innerHTML = '<a href="profile.html#' + aProfile.userID 
                    + '" target="_blank">' +  aProfile.displayName + '</a>';
            document.getElementById("answerer-level-"+i).innerHTML = "Level: " + aProfile.level;
            
            // update answer info DOM
            document.getElementById("answer-description-"+i).innerHTML = answer_list[i].content;
            if(answer_list[i].accepted) {
                document.getElementById("answer-accept-"+i).innerHTML = "~~  This Answer Has Been Accepted By The Asker  ~~" ;
            }  
        }catch(err){
            console.log(err);
        }
    }
}

// start editor object
function initiate_answer_editor() {
    quill = new Quill('#editor', {
        modules: {
          toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline'],
            ['image']
          ]
        },
        placeholder: 'Enter your answer here',
        theme: 'snow'  
    });
}


// onclick function of "+" button
function open_editor() {
    document.getElementById("editor-window").style = "visibility: visible;";
}

// onclick function of "Cancel" button
function editor_cancel() {
    document.getElementById("editor-window").style = "visibility: hidden;";
}

// onclick function of "Submit" button
function editor_submit() {
    let quillHTML = quill.root.innerHTML;
    const message_element = document.getElementById('editor-message');
    if(quillHTML.length < 10) {
        message_element.style = "color: red;";
        message_element.innerHTML = "Your answer must be greater than 10 characters!";
    } else {
        // TODO: add a new answer, update to server
        // TODO: add 10 exp to user, update to server

        add_self_answer(quillHTML);
        document.getElementById("editor-window").style = "visibility: hidden;";
        document.getElementById("add-answer-btn").style = "visibility: hidden;";
        message_element.style = "color: black;";
        message_element.innerHTML = "Add a new answer";
    }
}


function add_self_answer(HTMLcontent) {
    // push new answer info to database
    const new_answer_data = {
        "questionID": qID,
        "answerer": {
            "userID": self_profile.userID,
            "displayName": self_profile.displayName
        },
        "content": HTMLcontent
    }
    const url = '/question/' + qID;
    const request = new Request(url, {
        method: 'POST', 
        body: JSON.stringify(new_answer_data),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
    });
    fetch(request)
    .then(function(res) {
        if (res.status === 200) {
            // add to user collection "answered" array
            const user_answer_info = {
                summary: qSummary,
                qid: qID
            }
            const url = '/userQuestion/answered/' + self_profile.userID;
            const request_user = new Request(url, {
                method: 'POST', 
                body: JSON.stringify(user_answer_info),
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
            });
            fetch(request_user)
            .then(function(res) {
                if (res.status === 200) {
                    console.log("added to user array")
                } else console.log('Could not to user array')           
            })
            .catch((error) => {
                console.log(error)
            })

            // create the DOM for answer post
            let element = document.createElement("div");
            element.className = "post-container";
            element.id = "self-post";
            document.getElementById("question-container").appendChild(element);
            element.innerHTML = 
                `<div class="post-profile-answerer">
                    <img class="post-profile-icon" id="self-icon" src="//:0">
                    <div class="post-profile-info">
                        <div class="display-name" id="self-name"> </div> 
                        <div class="user-level" id="self-level"> </div>
                    </div>
                </div>
                <div class="post-content">
                    <div class="vote_container">
                            <div class="like_button_answer">&#9650</div>
                            <div class="like_num">0</div>
                            <div class="dislike_button_answer">&#9660</div>
                    </div>
                    <div class="post-description" id="self-answer-description">  </div>
                    <div class="accept-description" id="self-answer-accept"> </div>
                </div>`
            add_event_listener();       // add eventlistener to the new answer buttons

            // update answerer info DOM
            document.getElementById("self-icon").src = self_profile.profilePicImg;
            document.getElementById("self-name").innerHTML = '<a href="profile.html#' + self_profile.userID 
                    + '" target="_blank">' +  self_profile.displayName + '</a>';
            document.getElementById("self-level").innerHTML = "Level: " + self_profile.level;
            
            // update answer info DOM
            document.getElementById("self-answer-description").innerHTML = HTMLcontent;

            //create a notif 
            let notif = document.createElement("div");
            document.body.appendChild(notif);
            notif.innerHTML = `exp + 10`;
            notif.className = "center-notif";
            add_fade(notif);
        } else {
            console.log('Could not add answer')
            console.log(res)
        }
    })
}

// like & dislike for question
async function like_question(e){
    e.preventDefault();
    try{
        const res = await fetch(`/question/${e.target.id}`);        // e.target.id === questionID
        const question = await res.json();
        let increment = 0;
        if (e.target.style.color == 'pink'){        // already clicked, undo it
            e.target.style.color = 'silver';
            increment = -1;
        }else{          // upvote is not clicked
            e.target.style.color = 'pink';
            if (e.target.parentElement.children[2].style.color == 'pink'){      // the case dislike is clicked, increase by 2
                increment = 2;
            }else{
                increment = 1;
            }
            e.target.parentElement.children[2].style.color = 'silver';
        }
        // PATCH the question
        const res_updated = await fetch(`/question/${e.target.id}`, {
            method: 'PATCH',
            body: JSON.stringify({
                "likeCount": question.likeCount + increment
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        const question_updated = await res_updated.json();
        e.target.parentElement.children[1].innerHTML = question_updated.likeCount;
    }catch(err){
        console.log(err);
    }
}

async function dislike_question(e){
    e.preventDefault();
    try{
        const res = await fetch(`/question/${e.target.id}`);        // e.target.id === questionID
        const question = await res.json();
        let increment = 0;
        if (e.target.style.color == 'pink'){        // already clicked, undo it
            e.target.style.color = 'silver';
            increment = 1;  
        }else{
            e.target.style.color = 'pink';
            if (e.target.parentElement.children[0].style.color == 'pink'){      // the case like is clicked, decrease by 2
                increment = -2;
            }else{  // like is un-clicked, decrease by 1
                increment = -1;
            }
            e.target.parentElement.children[0].style.color = 'silver';
        }
        // PATCH the question
        const res_updated = await fetch(`/question/${e.target.id}`, {
            method: 'PATCH',
            body: JSON.stringify({
                "likeCount": question.likeCount + increment
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        const question_updated = await res_updated.json();
        e.target.parentElement.children[1].innerHTML = question_updated.likeCount;        
    }catch(err){
        console.log(err);
    }
}


// like & dislike for answers
function add_event_listener(){      // a helper function that add event listener to answers vote button
    document.querySelectorAll('.like_button_answer').forEach(element => {
        element.addEventListener('click', like_answer);
    });
    document.querySelectorAll('.dislike_button_answer').forEach(element => {
        element.addEventListener('click', dislike_answer);
    });
}

async function like_answer(e){
    e.preventDefault();
    try{
        const res = await fetch(`/question/${e.target.id}`);
        const answer = await res.json();
        let increment = 0;
        if (e.target.style.color == 'pink'){        // already clicked, undo it
            e.target.style.color = 'silver';
            increment = -1;
        }else{
            e.target.style.color = 'pink';
            if (e.target.parentElement.children[2].style.color == 'pink'){      // the case dislike is clicked, increase by 2
                increment = 2;
            }else{
                increment = 1;
            }
            e.target.parentElement.children[2].style.color = 'silver';
        }
        // PATCH the answer
        const res_updated = await fetch(`/question/${e.target.id}`, {
            method: 'PATCH',
            body: JSON.stringify({
                "likeCount": answer.likeCount + increment
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        const answer_updated = await res_updated.json();
        e.target.parentElement.children[1].innerHTML = answer_updated.likeCount;        
    }catch(err){
        console.log(err);
    }
}

async function dislike_answer(e){
    e.preventDefault();
    try{
        const res = await fetch(`/question/${e.target.id}`);
        const answer = await res.json();
        let increment = 0;
        if (e.target.style.color == 'pink'){        // already clicked, undo it
            e.target.style.color = 'silver';
            increment = 1;
        }else{
            e.target.style.color = 'pink';
            if (e.target.parentElement.children[0].style.color == 'pink'){      // the case like is clicked, decrease by 2
                increment = -2;
            }else{  // like is un-clicked, decrease by 1
                increment = -1;
            }
            e.target.parentElement.children[0].style.color = 'silver';
        }
        // PATCH the answer
        const res_updated = await fetch(`/question/${e.target.id}`, {
            method: 'PATCH',
            body: JSON.stringify({
                "likeCount": answer.likeCount + increment
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        const answer_updated = await res_updated.json();
        e.target.parentElement.children[1].innerHTML = answer_updated.likeCount;
    }catch(err){
        console.log(err);
    }
}
