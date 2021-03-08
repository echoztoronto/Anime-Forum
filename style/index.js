window.addEventListener('load', show_top_question);

function show_top_question(e){
    e.preventDefault();
    let questions_clone = JSON.parse(JSON.stringify(questions));    // clone the array
    questions_clone.sort(function(a, b){
        return b.likeCount + b.replyCount - a.likeCount - a.replyCount;
    });
    const top_question = document.querySelector('#top-question');
    for (let i = 0; i < Math.min(5, questions_clone.length); i++){        // top 5 
        const c = document.createElement('div');
        c.className = "question_summary";
        c.innerHTML = `Top ${i + 1}: <a href="question.html#${questions_clone[i].ID}">${questions_clone[i].summary}</a>`;
        top_question.appendChild(c);
    }
}

window.addEventListener('load', show_recent_question);

function show_recent_question(e){
    e.preventDefault();
    let questions_clone = JSON.parse(JSON.stringify(questions));    // clone the array
    questions_clone.sort(function(a, b){
        return a.ID - b.ID;
    });
    const top_question = document.querySelector('#recent-question');
    for (let i = 0; i < Math.min(5, questions_clone.length); i++){        // top 5 
        const c = document.createElement('div');
        c.className = "question_summary";
        c.innerHTML = `Top ${i + 1}:<a href="question.html#${questions_clone[i].ID}"> ${questions_clone[i].summary}</a>`;
        top_question.appendChild(c);
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

