if(window.location.hash) {
    updatePage();
}

// update page with updated question ID
function updatePage() {
    let x = location.hash;
    let qID = x.substring(1);
    let qObject = get_question(qID);

    if(qObject != null) {
        //get asker info
        let uProfile =  get_user_profile(qObject.asker);

        // update asker info DOM
        document.getElementById("asker-icon").src = "images/profilepic/" + uProfile.profilePic + ".jpg";
        document.getElementById("asker-name").innerHTML = '<a href="profile.html#' + uProfile.userID 
                + '" target="_blank">' +  uProfile.displayName + '</a>';
        document.getElementById("asker-level").innerHTML = "Level: " + uProfile.level;
        
        // update question info DOM
        document.getElementById("question-title").innerHTML = '<b>' + qObject.summary + '</b>';
        document.getElementById("question-status").innerHTML = '[' + qObject.status + ']';
        document.getElementById("question-description").innerHTML = qObject.description;
        document.getElementById("question-reward").innerHTML = 'Reward: ' + qObject.reward;

        // get the list of answers
        let answer_list = get_answer_by_question(qID);

        // remove previous answer posts
        remove_answer_posts();

        // insert each answer
        if(answer_list.length != 0) {
            insert_answer_posts(answer_list);
        }

    }
}

// onclick events for sorting 
function sort_by_time() {
    document.getElementById("sort-by-time").style = "text-decoration: underline;"
    document.getElementById("sort-by-like").style = "text-decoration: none;"
}

function sort_by_like() {
    document.getElementById("sort-by-like").style = "text-decoration: underline;"
    document.getElementById("sort-by-time").style = "text-decoration: none;"
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
}

// insert answer posts by the order of given list
function insert_answer_posts(answer_list) {
    let i = 0;
    for(i = 0; i < answer_list.length; i++) {
        // get answerer profile object
        let aProfile = get_user_profile(answer_list[i].answerer);

        // create the DOM for answer post
        let element = document.createElement("div");
        element.className = "post-container";
        element.id = "answer-post-"+i;
        document.getElementById("question-container").appendChild(element);
        element.innerHTML = " <div class='post-profile'><img class='post-profile-icon' id='answerer-icon-"
            + i + "' src='//:0'/><div class='post-profile-info'><div class='display-name' id='answerer-name-"
            + i + "'> </div> <div class='user-level' id='answerer-level-"
            + i + "'> </div></div></div><div class='post-content'><div class='post-description' id='answer-description-"
            + i + "'> </div><div class ='accept-description' id='answer-accept-" 
            + i + "'> </div></div>";

        // update answerer info DOM
        document.getElementById("answerer-icon-"+i).src = "images/profilepic/" + aProfile.profilePic + ".jpg";
        document.getElementById("answerer-name-"+i).innerHTML = '<a href="profile.html#' + aProfile.userID 
                + '" target="_blank">' +  aProfile.displayName + '</a>';
        document.getElementById("answerer-level-"+i).innerHTML = "Level: " + aProfile.level;
        
        // update answer info DOM
        document.getElementById("answer-description-"+i).innerHTML = answer_list[i].content;
        if(answer_list[i].accepted) {
            document.getElementById("answer-accept-"+i).innerHTML = "~~  This Answer Has Been Accepted By The Asker  ~~" ;
        }  
    }
}


