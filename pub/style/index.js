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

window.addEventListener('load', show_anime_schedule);

function show_anime_schedule(e){
    e.preventDefault();
    const schedule = document.querySelector('#schedule');
    const lst = schedule_dict["Mon"];       // we use Monday as example
    for (let i = 0; i < Math.min(6, lst.length); i++){        // show at most 6 animes
        const c = document.createElement('div');
        c.className = "schedule_container";
        c.innerHTML = `
        <div class="schedule_container_left">${lst[i].name}</div>
        <div class="schedule_container_right">${lst[i].time}</div><br>`;
        schedule.appendChild(c);
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

