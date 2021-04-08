let quill = null;  //editor object
let qID = 0;
let qObject = null;
let already_answered = false;
let answered_count = 0;
let am_asker = false;
let am_low = false;
let am_admin = false;
let am_muted = false;
let gold_needed = 0;
let not_enough_gold = false;
let deleted_answer_user = null;

// get self ID from cookie
let self_ID = getCookie("username");
let self_profile = null;

if(window.location.hash && self_ID != "") {
    updatePage();
}

if(self_ID == "") go_to_error_page("Please login to view the questions", false);

// update page with updated question ID
async function updatePage(sort="like") {     // sort range in {"like", "time"}
    let x = location.hash;
    qID = x.substring(1);
    
    try{
        const res = await fetch(`/question/${qID}`);      // use GET route to get the question
        qObject = await res.json();
        if(qObject != null) {
            // remove error page if it's there
            if(document.getElementById("error-page") != null) {
                document.getElementById("error-page").remove;
                location.reload();
            }
            // get the count of my answers to this question
            answered_count =0;
            for(let i=0; i<qObject.answer_list.length;i++) {
                if(qObject.answer_list[i].answerer.userID == self_ID) answered_count ++;
            }

            if(self_ID != "") {
                const self_res = await fetch(`/user/${self_ID}`);     
                const uObject = await self_res.json();
                self_profile = {
                    type: uObject.type,
                    level: uObject.level,
                    userID: uObject.userID,
                    displayName: uObject.displayName,
                    gold: uObject.gold,
                    exp: uObject.exp,
                    profilePicImg: uObject.profilePicImg,
                    answered: uObject.answered,
                    unlocked: uObject.unlocked,
                    mute: uObject.mute
                }
                for(let i = 0; i < self_profile.answered.length; i++) {
                        if(self_profile.answered[i].qid == qID) {
                            already_answered = true;
                        }
                    }
                document.getElementById("nav_user_profile").src = uObject.profilePicImg;
                document.getElementById("clickable_icon").href = "profile.html#" + uObject.userID;
            } else go_to_error_page("Please login to view the questions", false);
               
            // check if I am admin or asker or low level user
            if(self_profile.type == "admin") am_admin = true;
            if(qObject.asker.userID == self_ID) am_asker = true;
            if(qObject.levelLimit > self_profile.level) {
                am_low = true;
                for(let i = 0; i < self_profile.unlocked.length; i++) {
                    if(self_profile.unlocked[i] == qID) am_low = false;
                }
            } 
            if(am_asker || am_admin) am_low = false;

            // check if I am muted
            am_muted = check_muted(self_profile);
    
            //get asker info
            // fetch to GET the asker
            const user_res = await fetch(`/user/${qObject.asker.userID}`);
            const uProfile = await user_res.json();
    
            // update asker info DOM
            document.getElementById("asker-icon").src = uProfile.profilePicImg;
            document.getElementById("asker-name").innerHTML = '<a href="profile.html#' + uProfile.userID 
                    + '" target="_blank">' +  uProfile.displayName + '</a>';
            document.getElementById("asker-level").innerHTML = "Level: " + uProfile.level;
            if(check_muted(uProfile))  document.getElementById("asker-mute").innerHTML = `[muted until: ${uProfile.mute}]`;
            else document.getElementById("asker-mute").innerHTML = ``;
            
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
            if (qObject.liked_user_list.includes(self_ID)){ document.querySelector('.like_button_question').style.color = 'pink'; }
            if (qObject.disliked_user_list.includes(self_ID)){ document.querySelector('.dislike_button_question').style.color = 'pink'; }

            // If I am admin, add mute and delete buttons for asker container
            if(am_admin){
                // don't mute an admin
                if(uProfile.type != "admin") {  
                    let asker_mute_container = create_unique_element("div", "mute-user-asker", "mute-user-container", "asker-profile");
                    if(!check_muted(uProfile)) asker_mute_container.innerHTML = `<button class="mute-user-btn" value="${uProfile.userID}" onclick="create_admin_mute_window(this.value)">MUTE</button>`;
                    else  asker_mute_container.innerHTML = `<button class="mute-user-btn" value="${uProfile.userID}" onclick="create_admin_unmute_window(this.value)">UNMUTE</button>`;
                }
                let asker_delete_container = create_unique_element("div", "delete-post-asker", "delete-post-container", "asker-content");
                asker_delete_container.innerHTML = `<button class="delete-post-btn" onclick="admin_delete_question(qID)">DELETE QUESTION</button>`;
            }
            
             // asker begin
             if (am_asker) {
                let asker_delete_container = create_unique_element("div", "delete-post-asker", "delete-post-container", "asker-content");
                asker_delete_container.innerHTML = `<button class="delete-post-btn" onclick="delete_my_question()">DELETE QUESTION</button>`;
            }
            // asker end

            
            // remove previous answer posts
            remove_answer_posts();

            // if I'm low level user
            if(am_low) {
                let limit_container = create_unique_element("div", "limit-container", "", "question-container");
                gold_needed = qObject.levelLimit - self_profile.level;
                if(self_profile.gold < gold_needed) not_enough_gold = true;
                limit_container.innerHTML = `
                    This question has a view/answer restriction: Level
                    <span id="limit-level"> ${qObject.levelLimit} </span> 			
                    <a id="user-rule" href="rule.html" target="_blank"> ? </a> 
                    <br/>
                    Level up or spend <span id="limit-gold"> ${gold_needed} </span> golds to unlock this question! <br/> <br/>
                    Current Gold: <span id="limit-gold"> ${self_profile.gold} </span> <br/>
                    <button id="limit-btn"> Unlock </button> 
                `;
                const limit_btn = document.getElementById("limit-btn");
                if(not_enough_gold) {
                    limit_btn.disabled = true;
                } else {
                    limit_btn.addEventListener("click",unlock_level_limit);
                }

            } else {  // if not low level, show all answers
                // route to get all answers of the question
                const answer_res = await fetch(`./answers-of-question/${qObject.questionID}`);
                const answer_list = await answer_res.json();
                if (sort == "like"){
                    answer_list.sort(function(a, b){ return b.likeCount - a.likeCount; });
                }else{
                    answer_list.sort(function(a, b){ return a.answerID - b.answerID; });
                }
                
                // insert each answer
                if(answer_list.length != 0) {
                    insert_answer_posts(answer_list);
                    add_event_listener();
                }
                // add answer button
                if(qObject.status != "Solved" && !am_muted && !am_low) {
                    document.getElementById("add-answer-btn").style = "visibility: visible;";
                    if(quill == null) {
                        initiate_answer_editor();
                    }  
                } else {
                    document.getElementById("add-answer-btn").style = "visibility: hidden;";
                }
                // muted notif
                if(am_muted) {
                    let notif = document.createElement("div");
                    document.body.appendChild(notif);
                    notif.innerHTML = `You are muted by the admin!`;
                    notif.className = "center-notif";
                    notif.style = "margin-left: -150px; width: 500px";
                    add_fade(notif);
                }
            }
        }
    }catch(err){
        console.log('Could not get answers to the question');
        console.log(err);
        err_message = "The question page you are trying to visit does not exist";
        go_to_error_page(err_message, true);
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
            
            let like_color = 'silver';        // check if voted
            let dislike_color = 'silver';
            if (answer_list[i].liked_user_list.includes(self_ID)){ like_color = 'pink'; }
            if (answer_list[i].disliked_user_list.includes(self_ID)){ dislike_color = 'pink'; }
        
            // create the DOM for answer post
            let element = document.createElement("div");
            element.className = "post-container";
            element.id = "answer-post-"+i;
            document.getElementById("question-container").appendChild(element);
            element.innerHTML = `
                <div class='post-profile-answerer' id='answerer-profile-${i}'>
                    <img class='post-profile-icon' id='answerer-icon-${i}' src='//:0'/>
                    <div class='post-profile-info'>
                        <div class='display-name' id='answerer-name-${i}'></div> 
                        <div class='user-level' id='answerer-level-${i}'></div>
                        <div class='mute-message' id='answerer-mute-${i}'> </div>
                    </div>
                </div>
                <div class='post-content' id='answerer-content-${i}'>
                    <div class="vote_container">
                        <div class="like_button_answer" id="${answer_list[i].questionID}/${answer_list[i]._id}" style="color:${like_color}">&#9650</div>
                        <div class="like_num">${answer_list[i].likeCount}</div>
                        <div class="dislike_button_answer" id="${answer_list[i].questionID}/${answer_list[i]._id}" style="color:${dislike_color}">&#9660</div>
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
            if(check_muted(aProfile))  document.getElementById("answerer-mute-"+i).innerHTML = `[muted until: ${aProfile.mute}]`;
            else document.getElementById("answerer-mute-"+i).innerHTML = ``;
            
            // update answer info DOM
            document.getElementById("answer-description-"+i).innerHTML = answer_list[i].content;
            if(answer_list[i].accepted) {
                document.getElementById("answer-accept-"+i).innerHTML = "~~  This Answer Has Been Accepted By The Asker  ~~" ;
            }  

            // If I am admin, add mute and delete buttons
            if(am_admin) {
                // don't mute an admin
                if(aProfile.type != "admin") { 
                    let answerer_mute_container = create_unique_element("div", "mute-user-"+i, "mute-user-container", "answerer-profile-"+i);
                    if(!check_muted(aProfile)) answerer_mute_container.innerHTML = `<button class="mute-user-btn" value="${aProfile.userID}" onclick="create_admin_mute_window(this.value)">MUTE</button>`;
                    else  answerer_mute_container.innerHTML = `<button class="mute-user-btn" value="${aProfile.userID}" onclick="create_admin_unmute_window(this.value)">UNMUTE</button>`;
                }
                let answerer_delete_container = create_unique_element("div", "delete-post-"+i, "delete-post-container", "answerer-content-"+i);
                answerer_delete_container.innerHTML = `<button class="delete-post-btn" value="${answer_list[i].answerID}" onclick="admin_delete_answer(this.value);deleted_answer_user='${answer_list[i].answerer.userID}';"> DELETE ANSWER </button>`;
            }


            // asker begin
            if (am_asker && qObject.status == "Ongoing") {
                let accept_container = create_unique_element("div", "accept-post-" + i, "delete-post-container", "answerer-content-" + i);
                accept_container.innerHTML = `<button onclick="accept_the_answer('${answer_list[i]._id}')" class="delete-post-btn" value="${i}"> Accept The Answer </button>`;
            }
            // asker end
            
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
            if(!already_answered) {
                // add to user collection answered[]
                const user_answer_info = {
                    summary: qObject.summary,
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
                    if (res.status !== 200) console.log('Could not add to user array')
                })
                .catch((error) => {
                    console.log(error)
                })
            }

            // TODO: if(!already_answered)  add 10 exp

            //create a notif 
            quill.setContents([{ insert: '\n' }]);
            let notif = document.createElement("div");
            document.body.appendChild(notif);
            notif.innerHTML = `exp + 10`;
            notif.className = "center-notif";
            add_fade(notif);
            updatePage();
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
        const patch_object = {
            "likeCount": question.likeCount,
            "liked_user_list": question.liked_user_list,
            "disliked_user_list": question.disliked_user_list
        };
        if (e.target.style.color == 'pink'){        // already clicked, undo it
            e.target.style.color = 'silver';
            patch_object.likeCount -= 1;
            patch_object.liked_user_list.remove(self_ID);
        }else{          // upvote is not clicked
            e.target.style.color = 'pink';
            patch_object.liked_user_list.push(self_ID);
            if (e.target.parentElement.children[2].style.color == 'pink'){      // the case dislike is clicked, increase by 2
                patch_object.likeCount += 2;
                patch_object.disliked_user_list.remove(self_ID);
            }else{
                patch_object.likeCount += 1;
            }
            e.target.parentElement.children[2].style.color = 'silver';
        }
        // PATCH the question
        const res_updated = await fetch(`/question/${e.target.id}`, {
            method: 'PATCH',
            body: JSON.stringify(patch_object),
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
        const patch_object = {
            "likeCount": question.likeCount,
            "liked_user_list": question.liked_user_list,
            "disliked_user_list": question.disliked_user_list
        };
        if (e.target.style.color == 'pink'){        // already clicked, undo it
            e.target.style.color = 'silver';
            patch_object.likeCount += 1;
            patch_object.disliked_user_list.remove(self_ID);
        }else{
            e.target.style.color = 'pink';
            patch_object.disliked_user_list.push(self_ID);
            if (e.target.parentElement.children[0].style.color == 'pink'){      // the case like is clicked, decrease by 2
                patch_object.likeCount -= 2;
                patch_object.liked_user_list.remove(self_ID);
            }else{  // like is un-clicked, decrease by 1
                patch_object.likeCount -= 1;
            }
            e.target.parentElement.children[0].style.color = 'silver';
        }
        // PATCH the question
        const res_updated = await fetch(`/question/${e.target.id}`, {
            method: 'PATCH',
            body: JSON.stringify(patch_object),
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
        const patch_object = {
            "likeCount": answer.likeCount,
            "liked_user_list": answer.liked_user_list,
            "disliked_user_list": answer.disliked_user_list
        };
        if (e.target.style.color == 'pink'){        // already clicked, undo it
            e.target.style.color = 'silver';
            patch_object.likeCount -= 1;
            patch_object.liked_user_list.remove(self_ID);
        }else{
            e.target.style.color = 'pink';
            patch_object.liked_user_list.push(self_ID);
            if (e.target.parentElement.children[2].style.color == 'pink'){      // the case dislike is clicked, increase by 2
                patch_object.likeCount += 2;
                patch_object.disliked_user_list.remove(self_ID);
            }else{
                patch_object.likeCount += 1;
            }
            e.target.parentElement.children[2].style.color = 'silver';
        }
        // PATCH the answer
        const res_updated = await fetch(`/question/${e.target.id}`, {
            method: 'PATCH',
            body: JSON.stringify(patch_object), 
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
        const patch_object = {
            "likeCount": answer.likeCount,
            "liked_user_list": answer.liked_user_list,
            "disliked_user_list": answer.disliked_user_list
        };
        if (e.target.style.color == 'pink'){        // already clicked, undo it
            e.target.style.color = 'silver';
            patch_object.likeCount += 1;
            patch_object.disliked_user_list.remove(self_ID);
        }else{
            e.target.style.color = 'pink';
            patch_object.disliked_user_list.push(self_ID);
            if (e.target.parentElement.children[0].style.color == 'pink'){      // the case like is clicked, decrease by 2
                patch_object.likeCount -= 2;
                patch_object.liked_user_list.remove(self_ID);
            }else{  // like is un-clicked, decrease by 1
                patch_object.likeCount -= 1;
            }
            e.target.parentElement.children[0].style.color = 'silver';
        }
        // PATCH the answer
        const res_updated = await fetch(`/question/${e.target.id}`, {
            method: 'PATCH',
            body: JSON.stringify(patch_object),
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


///////////////////////////// low level //////////////////////////////////////
function unlock_level_limit() {
    // update user exp and gold info to server
    const updated = calculate_exp_and_level(self_profile.level, self_profile.exp + 5);
    self_profile.unlocked.push(qID);
    const modified_profile = {
        level: updated[0],
        exp: updated[1],
        gold: self_profile.gold - gold_needed,
        unlocked: self_profile.unlocked
    }
    const url = '/user/' + self_profile.userID;
    const request = new Request(url, {
        method: 'PATCH', 
        body: JSON.stringify(modified_profile),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
    });

    fetch(request)
    .then(function(res) {
        if (res.status === 200) {
            //DOM changes
            remove_element_by_ID("limit-container");
            //create a notif
            let notif = document.createElement("div");
            document.body.appendChild(notif);
            notif.innerHTML = `
                Unlocked<br/>
                gold - <span id="gold-spent"> ${gold_needed} </span>
                <br/>
                exp + 10
            `;
            notif.className = "center-notif";
            add_fade(notif);
            am_low = false;
            updatePage();
        } else console.log('Could not unlock question')           
    }).catch((error) => {
        console.log(error)
    })
}

///////////////////////////////////// Admin Delete /////////////////////////////////////

// onclick function for delete question
function admin_delete_question(qid) {
    create_admin_confirmation("question",qid);
}

// onclick function for delete answer
function admin_delete_answer(aid) {
    create_admin_confirmation("answer",aid);
}

// create the confirmation window for admin
function create_admin_confirmation(object_name, object_id) { 
    const confirmation_container = create_unique_element("div", "confirmation-container", "", "body");
    confirmation_container.innerHTML = `
        <div id="confirmation-window">
            <div id="confirmation-close" onclick="delete_admin_confirmation()"> x </div>
            <div id="confirmation-message"> Confirm to delete ${object_name} </div>
            <input id="confirmation-password" type="password" placeholder="Enter your password">
            <div id="confirmation-wrong"> </div> 
            <div id="confirmation-confirm" data-name=${object_name} data-id=${object_id} onclick="admin_delete_confirm()"> CONFIRM </div>
        </div>
    `;
}

function delete_admin_confirmation() {
    remove_element_by_ID("confirmation-container");
}

// onclick of confirm button
async function admin_delete_confirm() {
    const object_name = document.getElementById('confirmation-confirm').getAttribute('data-name');
    const object_id = document.getElementById('confirmation-confirm').getAttribute('data-id');
    const entered_password = document.getElementById('confirmation-password').value;

    // verify admin's password
    try {
        const my_admin_info = {uid:self_ID, password:entered_password};
        const request = new Request('/verifyPsw', {
            method: 'POST', 
            body: JSON.stringify(my_admin_info),
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
        });   
        fetch(request)
        .then(async function(res) {
            if (res.status === 200) {
                // delete quesiton and answer from database
                if(object_name == "question") {
                    await fetch('/question/' + qID, {method: 'DELETE'});
                    // asked[]
                    const asker = qObject.asker.userID;
                    await fetch('/userQuestion/asked/'+asker+'/'+qID, {method: 'DELETE'});
                    // answered[]
                    for(let i=0; i<qObject.answer_list.length;i++) {
                        await fetch('/userQuestion/answered/'+qObject.answer_list[i].answerer.userID+'/'+qID, {method: 'DELETE'});
                    }
                    // TODO: deal with accepted user
                }
                else if(object_name == "answer") {
                    await fetch('/question/' + qID + '/' + object_id, {method: 'DELETE'});
                    // answered 
                    if(answered_count == 1) await fetch('/userQuestion/answered/'+deleted_answer_user+'/'+qID, {method: 'DELETE'});
                    // TODO: deal with accepted user
                }
                delete_admin_confirmation();
                updatePage();
                 
            } else {
                document.getElementById("confirmation-wrong").innerHTML = `Incorrect Password`;
            }        
        })

    }catch(err){
        console.log(err);
    }
}

////////////////////////////////// Admin Mute ////////////////////////////////
// create the confirmation window for admin
function create_admin_mute_window(uid) { 
    const mute_container = create_unique_element("div", "confirmation-container", "", "body");
    mute_container.innerHTML = `
        <div id="confirmation-window">
            <div id="confirmation-close" onclick="delete_admin_confirmation()"> x </div>
            <div id="confirmation-message"> 
                Mute for
                <select id="mute-duration" >
                    <option value="1">1</option>
                    <option value="3">3</option>
                    <option value="7">7</option>
                    <option value="30">30</option>
                    <option value="forever">∞</option>
                </select>
                Days
            </div>
            <input id="confirmation-password" type="password" placeholder="Enter your password">
            <div id="confirmation-wrong"> </div> 
            <div id="confirmation-confirm" data-id=${uid} onclick="admin_mute_confirm()"> CONFIRM </div>
        </div>
    `;
}

async function admin_mute_confirm() {
    const uid = document.getElementById('confirmation-confirm').getAttribute('data-id');
    const entered_password = document.getElementById('confirmation-password').value;
    const mute_days = document.getElementById("mute-duration").value;

    // verify admin's password
    try {
        const my_admin_info = {uid:self_ID, password:entered_password};
        const request = new Request('/verifyPsw', {
            method: 'POST', 
            body: JSON.stringify(my_admin_info),
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
        });   
        fetch(request)
        .then(async function(res) {
            if (res.status === 200) {
                // update mute time
                if(mute_days == 'forever') updated_mute = 'forever';
                else updated_mute =  get_future_date(mute_days);
                const mute_request = new Request('/user/'+uid, {
                    method: 'PATCH', 
                    body: JSON.stringify({mute: updated_mute}),
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json'
                    },
                });  
                
                await fetch(mute_request);
                delete_admin_confirmation();
                updatePage();         
            } else {
                document.getElementById("confirmation-wrong").innerHTML = `Incorrect Password`;
            }        
        })

    }catch(err){
        console.log(err);
    }
}

function check_muted(profile) {
    let muted = false;
    if(profile.mute != '' && profile.mute != undefined){
        if(profile.mute == 'forever') muted = true;
        else if(profile.mute >= get_today_date()) muted = true;
    }
    return muted;
}


////////////////////////////////// Admin Unmute ////////////////////////////////
// create the confirmation window for admin
function create_admin_unmute_window(uid) { 
    const mute_container = create_unique_element("div", "confirmation-container", "", "body");
    mute_container.innerHTML = `
        <div id="confirmation-window">
            <div id="confirmation-close" onclick="delete_admin_confirmation()"> x </div>
            <div id="confirmation-message"> Confirm to Unmute</div>
            <input id="confirmation-password" type="password" placeholder="Enter your password">
            <div id="confirmation-wrong"> </div> 
            <div id="confirmation-confirm" data-id=${uid} onclick="admin_unmute_confirm()"> CONFIRM </div>
        </div>
    `;
}

async function admin_unmute_confirm() {
    const uid = document.getElementById('confirmation-confirm').getAttribute('data-id');
    const entered_password = document.getElementById('confirmation-password').value;

    // verify admin's password
    try {
        const my_admin_info = {uid:self_ID, password:entered_password};
        const request = new Request('/verifyPsw', {
            method: 'POST', 
            body: JSON.stringify(my_admin_info),
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
        });   
        fetch(request)
        .then(async function(res) {
            if (res.status === 200) {
                // update mute time
                const mute_request = new Request('/user/'+uid, {
                    method: 'PATCH', 
                    body: JSON.stringify({mute: ''}),
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json'
                    },
                });  
                await fetch(mute_request);
                delete_admin_confirmation();
                updatePage();         
            } else {
                document.getElementById("confirmation-wrong").innerHTML = `Incorrect Password`;
            }        
        })

    }catch(err){
        console.log(err);
    }
}


// ----------------------- Asker View -----------------------------
// delete my question
async function delete_my_question () {
    try{
        // DELETE the question in the user's asked field
        const res = await fetch(`/userQuestion/asked/${self_ID}/${qID}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }
        });
        
        // DELETE the question object
        const res_q = await fetch(`/question/${qID}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }
        });

        location.reload();
    }catch(err){
        console.log(err);
    }
}

// accept others' answer
async function accept_the_answer (answerObjID) {
    try{
        // PATCH to update question status
        const res_q = await fetch(`/question/${qID}`,{
            method: 'PATCH',
            body: JSON.stringify(
                {"status": "Solved"}
            ),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        const question = await res_q.json();

        // PATCH to update answer accepted
        const res_answer = await fetch(`/question/${qID}/${answerObjID}`, {
            method: 'PATCH',
            body: JSON.stringify({
                "accepted": "true",
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        const answer = await res_answer.json();
        const answerer_id = answer.answerer.userID;
        
        // POST to update answerer's accpeted field
        let res_user = await fetch(`/userQuestion/accepted/${answerer_id}`, {
            method: 'POST',
            body: JSON.stringify({
                "summary": question.summary,
                "qid": question.questionID,
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        
        // GET answerer
        res_user = await fetch(`/user/${answerer_id}`);
        const answerer = await res_user.json();

        // PATCH to update answerer's gold
        res_user = await fetch(`/user/${answerer_id}`, {
            method: 'PATCH',
            body: JSON.stringify({
                "gold": answerer.gold + question.reward
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });

        location.reload();
    }catch(err){
        console.log(err);
    }
}

// asker end