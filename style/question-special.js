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
    


function confirm_reward(){
    document.getElementById("rwd_num").innerHTML= document.getElementById("offering_rwd").value;
    
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


