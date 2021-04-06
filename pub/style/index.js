let self_ID = getCookie("username");
let is_logged_in = false;
if(self_ID != "") is_logged_in = true;

if(is_logged_in) {
    remove_right_navbar();
    add_logged_navbar();
} else {
    remove_right_navbar();
    add_not_logged_navbar();
}

window.addEventListener('load', show_top_question);

async function show_top_question(e){
    e.preventDefault();
    try{
        // fetch to get the questions from the databse
        const res = await fetch('/allQuestions');
        const question_list = await res.json();
        question_list.sort((a, b) => b.likeCount + b.replyCount - a.likeCount - a.replyCount);      // sort
        const top_question = document.querySelector('#top-question');
        for (let i = 0; i < Math.min(5, question_list.length); i++){        // top 5 
            const c = document.createElement('div');
            c.className = "question_summary";
            c.innerHTML = `Top ${i + 1}: <a target="_blank" href="question.html#${question_list[i].questionID}">${question_list[i].summary}</a>`;
            top_question.appendChild(c);
        }
    }catch(err){
        console.log('Could not get questions');
        console.log(err);
    }
}

window.addEventListener('load', show_recent_question);

async function show_recent_question(e){
    e.preventDefault();
    try{
        // fetch to get the questions from the databse
        const res = await fetch('/allQuestions');
        const question_list = await res.json();
        question_list.sort((a, b) => b.questionID - a.questionID);      // sort
        const top_question = document.querySelector('#recent-question');
        for (let i = 0; i < Math.min(5, question_list.length); i++){        // top 5 
            const c = document.createElement('div');
            c.className = "question_summary";
            c.innerHTML = `Top ${i + 1}: <a target="_blank" href="question.html#${question_list[i].questionID}">${question_list[i].summary}</a>`;
            top_question.appendChild(c);
        }
    }catch(err){
        console.log('Could not get questions');
        console.log(err);
    }
}

window.addEventListener('load', show_brief_ranking);

async function show_brief_ranking(e){
    e.preventDefault();
    try{
        const res = await fetch('/allUsers');       // GET all users
        let user_list = await res.json();
        user_list.sort((a, b) => b.level - a.level);
        // manipulate DOM
        const container_left = document.querySelector(`.ranking_container_left`);
        const container_right = document.querySelector(`.ranking_container_right`);
        for (let i = 0; i < Math.min(5, user_list.length); i++){
            const new_left = document.createElement('div');
            const new_right = document.createElement('div');
            new_left.setAttribute("class", "ranking_body");
            new_right.setAttribute("class", "ranking_body");
            new_left.innerHTML = `<a target="_blank" href="profile.html#${user_list[i].userID}">${user_list[i].displayName}`;
            new_right.innerHTML = `${user_list[i].level}`;
            container_left.appendChild(new_left);
            container_right.appendChild(new_right);
        }
    }catch(err){
        console.log(err);
    }
}


/***** slideshow *************/
let index = 0;
let slides = document.querySelectorAll(".slide");
let dots = document.querySelectorAll(".dot");
showSlides();

function showSlides() {
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace("dot_on", "");
    }
    index++;
    if (index == slides.length){
        index = 0;
    }    
    slides[index].style.display = "block";  
    dots[index].className += " dot_on";
    setTimeout(showSlides, 3000);
}


function remove_right_navbar () {
    remove_element_by_ID("navbar-user");
}

function add_logged_navbar() {
    const container = create_element("div", "navbar-user", "navbar-user", "navbar");
    container.innerHTML = `
        <div class="navbar-block-logged">
            <a id="clickable_icon" target="_blank"> <img id="nav_user_profile"> </a>
        </div>
        <div class="navbar-block" onclick="log_out()"><a href="index.html"><b> Logout </b></a></div>
    `;
}

function add_not_logged_navbar() {
    const container = create_element("div", "navbar-user", "navbar-user", "navbar");
    container.innerHTML = `
        <div class="navbar-block" id="login-btn" onclick="open_login_window()"> <b>Login </b></div>
        <div class="navbar-block" id="signup-btn" onclick="open_signup_window()"> <b> Sign Up </b></div>
    `;
}