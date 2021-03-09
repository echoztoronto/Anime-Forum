if(window.location.hash) {
    updatePage_admin();
}
function delete_question () {
    document.getElementById("question-container").remove();
}
// delete the answer
function delete_answer (answer_id) {
    document.getElementById("answer-post-" + answer_id).remove();
}
// mute
function forbid (obj) {
    console.log(obj);
    var userID = obj.getAttribute("data");
    console.log("userID=", userID);
    if (document.getElementById("user_" + userID).innerText) {
        obj.innerText = "mute"
        document.getElementById("user_" + userID).innerText = ""
    } else {
        obj.innerText = "unmute"
        document.getElementById("user_" + userID).innerText = "[muted]"
    }


}

// update page with updated question ID
function updatePage_admin(sort="time") {     // sort range in {"like", "time"}
    let x = location.hash;
    let qID = x.substring(1);
    let qObject = get_question(qID);

    if(qObject != null) {
        //remove error page if it's there
        if(document.getElementById("error-page") != null) {
            document.getElementById("error-page").remove;
            location.reload();
        }

        //get asker info
        let uProfile =  get_user_profile(qObject.asker);
        console.log("uProfile", uProfile);
        //document.getElementById("forbid-btn-post-user").getAttribute("data")
        document.getElementById("forbid-btn").innerHTML = '<button onclick="forbid(this)" data="' + uProfile.userID + '">mute</button>';

        // update asker info DOM
        document.getElementById("asker-icon").src = "images/profilepic/" + uProfile.profilePic + ".jpg";
        document.getElementById("asker-name").innerHTML = '<a href="profile.html#' + uProfile.userID 
                + '" target="_blank">' +  uProfile.displayName + '</a><span class="forbid-tips" id="user_' + uProfile.userID + '"></span>';
        document.getElementById("asker-level").innerHTML = "Level: " + uProfile.level;
        
        // update question info DOM
        document.getElementById("question-title").innerHTML = '<b>' + qObject.summary + '</b>';
        document.getElementById("question-status").innerHTML = '[' + qObject.status + ']';
        document.getElementById("question-description").innerHTML = qObject.description;
        document.getElementById("question-reward").innerHTML = 'Reward: ' + qObject.reward;

        // get the list of answers
        let answer_list = get_answer_by_question(qID);
        if (sort == "like"){
            answer_list = sort_list_by_like(answer_list);
        }

        // remove previous answer posts
        remove_answer_posts();

        // insert each answer
        if(answer_list.length != 0) {
            insert_answer_posts_admin(answer_list);
            add_event_listener();
        }

        //add text editor if question is not resolved
        if(qObject.status != "Resolved") {
            document.getElementById("add-answer-btn").style = "visibility: visible;";
            initiate_answer_editor();
        } else {
            document.getElementById("add-answer-btn").style = "visibility: hidden;";
        }

    } else { //if there is no such question
        if(document.getElementById("error-page") == null) {
            let error_element = document.createElement("div");
            error_element.id = "error-page";
            error_element.innerHTML = `The question page you are trying to visit does not exist`;
            document.body.appendChild(error_element);
        }
    }
}


// insert answer posts by the order of given list
function insert_answer_posts_admin(answer_list) {
    let i = 0;
    for(i = 0; i < answer_list.length; i++) {
        // get answerer profile object
        let aProfile = get_user_profile(answer_list[i].answerer);

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
                    <button onclick='forbid(this)' data='${aProfile.userID}'>mute</button>
                </div>
            </div>
            <div class='post-content'>
                <div class="vote_container">
                    <div class="like_button_answer">&#9650</div>
                    <div class="like_num">${answer_list[i].likeCount}</div>
                    <div class="dislike_button_answer">&#9660</div>
                </div>
                <div class='post-description' id='answer-description-${i}'></div>
                <div class ='accept-description' id='answer-accept-${i}'></div>
                <div class ='del-answer' id='del-answer-${i}'> 
                <button class='admin-delete' type='button' onclick='delete_answer(${i})'>Delete the answer</button>
            </div>
            `
            
            
            
            ;
            

        // update answerer info DOM
        document.getElementById("answerer-icon-"+i).src = "images/profilepic/" + aProfile.profilePic + ".jpg";
        document.getElementById("answerer-name-"+i).innerHTML = '<a href="profile.html#' + aProfile.userID 
                + '" target="_blank">' +  aProfile.displayName + '</a><span class="forbid-tips" id="user_' + aProfile.userID + '"></span>';
        document.getElementById("answerer-level-"+i).innerHTML = "Level: " + aProfile.level;
        
        // update answer info DOM
        document.getElementById("answer-description-"+i).innerHTML = answer_list[i].content;
        if(answer_list[i].accepted) {
            document.getElementById("answer-accept-"+i).innerHTML = "~~  This Answer Has Been Accepted By The Asker  ~~" ;
        }  
    }
}






