window.addEventListener('load', show_top_question);

function show_top_question(e){
    e.preventDefault();
    let questions_clone = JSON.parse(JSON.stringify(questions));    // clone the array
    questions_clone.sort(function(a, b){
        return b.likeCount + b.replyCount - a.likeCount - a.replyCount;
    });
    const top_question = document.querySelector('#top-question');
    for (let i = 0; i < 5; i++){        // top 5 
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
    for (let i = 0; i < 5; i++){        // top 5 
        const c = document.createElement('div');
        c.className = "question_summary";
        c.innerHTML = `Top ${i + 1}:<a href="question.html#${questions_clone[i].ID}"> ${questions_clone[i].summary}</a>`;
        top_question.appendChild(c);
    }
}