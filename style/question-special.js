function delete_question () {
    document.getElementById("question-container").remove();
    go_to_error_page();

    //TODO: update data
}
// delete the answer
function delete_answer (answer_id) {
    document.getElementById("answer-post-" + answer_id).remove();

    //TODO: update data
}

// mute
function forbid() {
    if (document.getElementById("if-muted").innerText) {
        document.getElementById("forbid-btn").innerText = "mute"
        document.getElementById("if-muted").innerText = ""
    } else {
        document.getElementById("forbid-btn").innerText = "unmute"
        document.getElementById("if-muted").innerText = "[muted]"
    }
}

function forbid2() {
    if (document.getElementById("if-muted2").innerText) {
        document.getElementById("forbid-btn2").innerText = "mute"
        document.getElementById("if-muted2").innerText = ""
    } else {
        document.getElementById("forbid-btn2").innerText = "unmute"
        document.getElementById("if-muted2").innerText = "[muted]"
    }
}

function forbid3() {
    if (document.getElementById("if-muted3").innerText) {
        document.getElementById("forbid-btn3").innerText = "mute"
        document.getElementById("if-muted3").innerText = ""
    } else {
        document.getElementById("forbid-btn3").innerText = "unmute"
        document.getElementById("if-muted3").innerText = "[muted]"
    }
}

function accept_answer_0(){
    if(document.getElementById("question-status").innerHTML=="[Ongoing]"){
       document.getElementById("question-status").innerHTML="[Solved]"
       document.getElementById("answer-accept-0").innerHTML = "~~  This Answer Has Been Accepted By The Asker  ~~" ;
       document.getElementById('accept-btn-1').style = "visibility: hidden;";
       document.getElementById('accept-btn-0').style = "visibility: hidden;";
    } 
}

function accept_answer_1(){
    if(document.getElementById("question-status").innerHTML=="[Ongoing]"){
       document.getElementById("question-status").innerHTML="[Solved]"
       document.getElementById("answer-accept-1").innerHTML = "~~  This Answer Has Been Accepted By The Asker  ~~" ;
       document.getElementById('accept-btn-0').style = "visibility: hidden;";
       document.getElementById('accept-btn-1').style = "visibility: hidden;";
    }
}
    
function rwd_change() {
    let old_reward = Number(document.getElementById("rwd_num").innerHTML);
    let new_reward = old_reward + Number(document.getElementById("offering_rwd").value);
    document.getElementById("new_reward").innerHTML = `New Reward: ${new_reward}`;
}


function confirm_reward(){
    //TODO: pull data and verify if user has enough gold
    let old_reward = Number(document.getElementById("rwd_num").innerHTML);
    let new_reward = old_reward + Number(document.getElementById("offering_rwd").value);
    document.getElementById("rwd_num").innerHTML= new_reward;
    document.getElementById("offering_rwd").value = 0;
    document.getElementById("new_reward").innerHTML = `&nbsp;`;

    //TODO: update question reward and user reward
}

function hide_answers(){
    hide_answers_posts();
}

function pay_to_view(){
    var outerDiv = document.getElementById('bg-blur');//or $('#outerDivId')[0];
    outerDiv.outerHTML = outerDiv.innerHTML;
    const elements = document.getElementsByClassName("z-text");
    while (elements.length > 0) elements[0].remove();
}

function fade(element) {
    var op = 1;  // initial opacity
    var timer = setInterval(function () {
        if (op <= 0.1){
            clearInterval(timer);
            element.style.display = 'none';
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.1;
    }, 50);
}

function unlock_level_limit() {
    // TODO: pull data to verify if user has enough gold
    
    // TODO: if no enough gold, create some sort of notification

    // if has enough gold
    //remove limit-container
    remove_element_by_ID("limit-container");
    //create a spend-gold-notif
    let notif = document.createElement("div");
    document.body.appendChild(notif);
    notif.innerHTML = `Gold - <span id="gold-spent"> 4 </span>`;
    notif.className = "spend-gold-notif";
    //make notif disappear after 3 seconds
    // setTimeout(function() {
    //     notif.style.visibility = "hidden";
    //     notif.innerHTML = ``;
    // }, 3000);
    fade(notif);

    // TODO: pull data and add answer posts
    // for now we just hard code it
    let question_container = document.getElementById("question-container");
    question_container.innerHTML += `<div class="post-container" id="answer-post-0"> 
                                        <div class="post-profile-answerer">
                                            <img class="post-profile-icon" id="answerer-icon-0" src="images/profilepic/5.jpg">
                                            <div class="post-profile-info">
                                                <div class="display-name" id="answerer-name-0">
                                                    <a href="profile.html#james_h" target="_blank">James</a>
                                                </div> 
                                                <div class="user-level" id="answerer-level-0">Level: 3</div>
                                            </div>
                                        </div>

                                        <div class="post-content">
                                            <div class="post-description" id="answer-description-0">
                                                Yes, I wonderee why too.
                                            </div>
                                            <div class="accept-description" id="answer-accept-0"> </div>
                                        </div>
                                    </div>
                                    <div class="post-container" id="answer-post-1"> 
                                        <div class="post-profile-answerer">
                                            <img class="post-profile-icon" id="answerer-icon-1" src="images/profilepic/4.jpg">
                                            <div class="post-profile-info">
                                                <div class="display-name" id="answerer-name-1">
                                                    <a href="profile.html#jason_z" target="_blank">Jason</a>
                                                </div> 
                                                <div class="user-level" id="answerer-level-1">Level: 3</div>
                                            </div>
                                        </div>
                                        <div class="post-content">
                                            <div class="post-description" id="answer-description-1">
                                                The biggest reason why the animation sucked was due to the lack of production time. When you get less time to work on stuff, you have to cut around corners. This is why most of the stuff from One Punch Man Season 2 wasn't close to the level of One Punch Man Season 1.
                                            </div>
                                            <div class="accept-description" id="answer-accept-1"> </div>
                                        </div>
                                    </div>`;
    
}