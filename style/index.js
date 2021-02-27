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
        c.innerHTML = `Top ${i + 1}: ${questions_clone[i].summary}`;
        top_question.appendChild(c);
    }
}