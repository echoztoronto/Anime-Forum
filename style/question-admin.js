let quill = null;

if (window.location.hash) {
    updatePage();
}
// delete the question
function delete_question () {
    document.getElementById("question-container").remove();
}
// delete the answer
function delete_answer (answer_id) {
    document.getElementById("answer-post-" + answer_id).remove();
}
// mute
function forbid (obj) {
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
function updatePage () {
    let x = location.hash;
    let qID = x.substring(1);
    let qObject = get_question(qID);
    console.log("questionID=", qID);
    if (qObject != null) {
        //remove error page if it's there
        if (document.getElementById("error-page") != null) {
            document.getElementById("error-page").remove;
            location.reload();
        }

        //get asker info
        let uProfile = get_user_profile(qObject.asker);
        console.log("uProfile", uProfile);
        
        //document.getElementById("forbid-btn-post-user").getAttribute("data")
        document.getElementById("forbid-btn").innerHTML = '<button onclick="forbid(this)" data="' + uProfile.userID + '">mute</button>';
        
        
        // document.getElementById("forbid-btn-post-user").setAttribute("data", uProfile.userID)

        // update asker info DOM
        document.getElementById("asker-icon").src = "images/profilepic/" + uProfile.profilePic + ".jpg?1";
        document.getElementById("asker-name").innerHTML = '<a href="profile.html#' + uProfile.userID
            + '" target="_blank">' + uProfile.displayName + '</a><span class="forbid-tips" id="user_' + uProfile.userID + '"></span>';
        document.getElementById("asker-level").innerHTML = "Level: " + uProfile.level;

        // update question info DOM
        document.getElementById("question-title").innerHTML = '<but>' + qObject.summary + '</button>';
        document.getElementById("question-status").innerHTML = '[' + qObject.status + ']';
        document.getElementById("question-description").innerHTML = qObject.description;
        document.getElementById("question-reward").innerHTML = 'Reward: ' + qObject.reward;

        // get the list of answers
        let answer_list = get_answer_by_question(qID);

        // remove previous answer posts
        remove_answer_posts();

        // insert each answer
        if (answer_list.length != 0) {
            insert_answer_posts(answer_list);
        }

        //add text editor if question is not resolved
        if (qObject.status != "Resolved") {
            document.getElementById("add-answer-btn").style = "visibility: visible;";
            initiate_answer_editor();
        } else {
            document.getElementById("add-answer-btn").style = "visibility: hidden;";
        }

    } else { //if there is no such question
        if (document.getElementById("error-page") == null) {
            let error_element = document.createElement("div");
            error_element.id = "error-page";
            error_element.innerHTML = `The question page you are trying to visit does not exist`;
            document.body.appendChild(error_element);
        }
    }
}

// onclick events for sorting 
function sort_by_time () {
    document.getElementById("sort-by-time").style = "text-decoration: underline;"
    document.getElementById("sort-by-like").style = "text-decoration: none;"
}

function sort_by_like () {
    document.getElementById("sort-by-like").style = "text-decoration: underline;"
    document.getElementById("sort-by-time").style = "text-decoration: none;"
}

// remove answer posts container
function remove_answer_posts () {
    let over = false;
    let i = 0;
    while (!over) {
        if (document.getElementById("answer-post-" + i) == null) {
            over = true;
        } else {
            document.getElementById("answer-post-" + i).remove();
            i++;
        }
    }

    //remove self answer
    if (document.getElementById("self-post") != null) {
        document.getElementById("self-post").remove();
    }
}

// insert answer posts by the order of given list
function insert_answer_posts (answer_list) {
    let i = 0;
    for (i = 0; i < answer_list.length; i++) {
        // get answerer profile object
        let aProfile = get_user_profile(answer_list[i].answerer);

        // create the DOM for answer post
        let element = document.createElement("div");
        element.className = "post-container";
        element.id = "answer-post-" + i;
        document.getElementById("question-container").appendChild(element);
        element.innerHTML = " <div class='post-profile-answerer'><img class='post-profile-icon' id='answerer-icon-"
            + i + "' src='//:0'/><div class='post-profile-info'><div class='display-name' id='answerer-name-"
            + i + "'> </div> <div class='user-level' id='answerer-level-"
            + i + "'> </div><button onclick='forbid(this)' data='" + aProfile.userID + "'>mute</button></div></div><div class='post-content'><div class='post-description' id='answer-description-"
            + i + "'> </div><div class ='accept-description' id='answer-accept-"
            + i + "'> </div><div class ='del-answer' id='del-answer-"
            + i + "'>  <button class='admin-delete' type='button' onclick='delete_answer(" + i + ")'>Delete the answer</button></div></div>";


        // update answerer info DOM
        document.getElementById("answerer-icon-" + i).src = "images/profilepic/" + aProfile.profilePic + ".jpg";
        document.getElementById("answerer-name-" + i).innerHTML = '<a href="profile.html#' + aProfile.userID
            + '" target="_blank">' + aProfile.displayName + '</a><span class="forbid-tips" id="user_' + aProfile.userID + '"></span>';
        document.getElementById("answerer-level-" + i).innerHTML = "Level: " + aProfile.level;

        // update answer info DOM
        document.getElementById("answer-description-" + i).innerHTML = answer_list[i].content;
        if (answer_list[i].accepted) {
            document.getElementById("answer-accept-" + i).innerHTML = "~~  This Answer Has Been Accepted By The Asker  ~~";
        }
    }
}

// start editor object
function initiate_answer_editor () {
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


// onclick functino of "+" button
function open_editor () {
    document.getElementById("editor-window").style = "visibility: visible;";
}

// onclick functino of "Cancel" button
function editor_cancel () {
    document.getElementById("editor-window").style = "visibility: hidden;";
}

// onclick function of "Submit" button
function editor_submit () {
    let quillHTML = quill.root.innerHTML;
    const message_element = document.getElementById('editor-message');
    if (quillHTML.length < 10) {
        message_element.style = "color: red;";
        message_element.innerHTML = "Your answer must be greater than 10 characters!";
    } else {
        add_self_answer(quillHTML);
        document.getElementById("editor-window").style = "visibility: hidden;";
        document.getElementById("add-answer-btn").style = "visibility: hidden;";
        message_element.style = "color: black;";
        message_element.innerHTML = "Add a new question";
    }

}


function add_self_answer (HTMLcontent) {
    //TODO: push new answer info to database

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
            <div class="post-description" id="self-answer-description">  </div>
            <div class="accept-description" id="self-answer-accept"> </div>
        </div>`

    // assume our user is user
    let aProfile = get_user_profile("user");

    // update answerer info DOM
    document.getElementById("self-icon").src = "images/profilepic/" + aProfile.profilePic + ".jpg";
    document.getElementById("self-name").innerHTML = '<a href="profile.html#' + aProfile.userID
        + '" target="_blank">' + aProfile.displayName + '</a>';
    document.getElementById("self-level").innerHTML = "Level: " + aProfile.level;

    // update answer info DOM
    document.getElementById("self-answer-description").innerHTML = HTMLcontent;
}


// like & dislike

document.querySelectorAll('.angle_up').forEach(element => {
    element.addEventListener('click', change_angle_up);
    element.addEventListener('mouseover', function (event) {
        event.target.style.cursor = "pointer";
    });
});

document.querySelectorAll('.angle_down').forEach(element => {
    element.addEventListener('click', change_angle_down);
    element.addEventListener('mouseover', function (event) {
        event.target.style.cursor = "pointer";
    });
});

function change_angle_up (e) {
    e.preventDefault();
    const image = e.target;
    image.src = "images/arrow/arrow_up_after.png";      // change img src
    image.parentElement.children[1].src = "images/arrow/arrow_down_before.png";     // revert the down arrow
}

function change_angle_down (e) {
    e.preventDefault();
    const image = e.target;
    image.src = "images/arrow/arrow_down_after.png";
    image.parentElement.children[0].src = "images/arrow/arrow_up_before.png";   // revert the up arrow
}