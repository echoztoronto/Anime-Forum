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

        //add text editor if question is not resolved
        if(qObject.status != "Resolved") {
            document.getElementById("add-answer-btn").style = "visibility: visible;";
        } else {
            document.getElementById("add-answer-btn").style = "visibility: hidden;";
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
        element.innerHTML = " <div class='post-profile-answerer'><img class='post-profile-icon' id='answerer-icon-"
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

// editor object
let quill = new Quill('#editor', {
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

// onclick functino of "+" button
function open_editor() {
    document.getElementById("editor-window").style = "visibility: visible;";
}

// onclick functino of "Cancel" button
function editor_cancel() {
    document.getElementById("editor-window").style = "visibility: hidden;";
}

// onclick functino of "Submit" button
function editor_submit() {

    let quillHTML = quill.root.innerHTML;
    add_self_answer(quillHTML);
    document.getElementById("editor-window").style = "visibility: hidden;";
    document.getElementById("add-answer-btn").style = "visibility: hidden;";
}


function add_self_answer(HTMLcontent) {
    // create the DOM for answer post
    let element = document.createElement("div");
    element.className = "post-container";
    element.id = "self-post";
    document.getElementById("question-container").appendChild(element);
    element.innerHTML = 
        `<div class="post-container" id="self-post"> 
            <div class="post-profile-answerer">
                <img class="post-profile-icon" id="self-icon" src="//:0">
                <div class="post-profile-info">
                    <div class="display-name" id="self-name"> </div> 
                    <div class="user-level" id="self-level"> </div>
                </div>
            </div>
            <div class="post-content">
                <div class="post-description" id="self-answer-description">  </div>
                <div class="accept-description" id="self-answer-accept"> </div>
            </div>
        </div>`

    // assume our user is user
    let aProfile = get_user_profile("user");
    
    // update answerer info DOM
    document.getElementById("self-icon").src = "images/profilepic/" + aProfile.profilePic + ".jpg";
    document.getElementById("self-name").innerHTML = '<a href="profile.html#' + aProfile.userID 
            + '" target="_blank">' +  aProfile.displayName + '</a>';
    document.getElementById("self-level").innerHTML = "Level: " + aProfile.level;
    
    // update answer info DOM
    document.getElementById("self-answer-description").innerHTML = HTMLcontent;
}
