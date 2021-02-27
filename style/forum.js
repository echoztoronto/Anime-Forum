const sort_time_button = document.querySelector('#sort_time_button')
const sort_like_button = document.querySelector('#sort_like_button');

sort_time_button.addEventListener('click', sort_by_time);
sort_like_button.addEventListener('click', sort_by_like);
window.addEventListener('load', sort_by_time);

function sort_by_like(e){
    e.preventDefault();
    let questions_clone = JSON.parse(JSON.stringify(questions));    // clone the array
    questions_clone.sort(function(a, b){        // sort it
        return b.likeCount - a.likeCount;
    });
    // update page
    update_forum_page(questions_clone);
}

function sort_by_time(e){
    e.preventDefault();
    update_forum_page(questions);
}

function update_forum_page(questions) {
    let question_block = document.querySelector('#question_block');
    let container_to_add = questions.length - question_block.children.length;
    for (let i = 0; i < container_to_add; i++){
        let c = document.createElement('div');
        c.className = "question_container";
        question_block.appendChild(c);
    }
    container_list = question_block.children;
    for (let i = 0; i < questions.length; i++){
        container = container_list[i];
        container.innerHTML = `
            <div class="q_left">
                <span class="q_like_count">${questions[i].likeCount}</span>
                <span class="separator"></span>
                <span class="q_reply_count">${questions[i].replyCount}</span>
                <span class="separator"></span>
                <span class="q_status">${questions[i].status}</span>
                <span class="separator"></span>
                <span class="q_summary">${questions[i].summary}</span>
            </div>
            <div class="q_right">
                <span class="separator"></span>
                <span class="q_asker">${questions[i].asker}</span>
                <span class="separator"></span>
                <span class="q_last_replied">${questions[i].lastAnswerer}</span>
            </div>`;
    }
}