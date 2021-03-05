const sort_time_button = document.querySelector('#sort_time')
const sort_like_button = document.querySelector('#sort_like');

sort_time_button.addEventListener('click', sort_by_time);
sort_like_button.addEventListener('click', sort_by_like);
window.addEventListener('load', sort_by_time);

function sort_by_like(e){
    e.preventDefault();
    sort_like_button.style = "text-decoration: underline";   
    sort_time_button.style = "none";
    let questions_clone = JSON.parse(JSON.stringify(questions));    // clone the array
    questions_clone.sort(function(a, b){        // sort it
        return b.likeCount - a.likeCount;
    });
    // update page
    update_forum_page(questions_clone);
}

function sort_by_time(e){
    e.preventDefault();
    sort_time_button.style = "text-decoration: underline";
    sort_like_button.style = "none";
    update_forum_page(questions);
}

function update_forum_page(questions) {
    let question_table = document.querySelector('#question_table');
    question_table.innerHTML = `
        <tbody>
            <tr class="tr">
                <td class="c1">Like</td>
                <td class="c2">Reply</td>
                <td class="c3">Status</td>
                <td class="c4">Summary</td>
                <td class="c5">Asker</td>
                <td class="c6">Last Answer</td>
            </tr>
        </tbody>`;      // add the header
    for (let i = 0; i < questions.length; i++){
        let tb = document.createElement('TBODY');
        tb.innerHTML = `
            <tr class="tr">
                <td class="c1">${questions[i].likeCount}</td>
                <td class="c2">${questions[i].replyCount}</td>
                <td class="c3">${questions[i].status}</td>
                <td class="c4"><a href="question.html#${questions[i].ID}">${questions[i].summary}</a></td>
                <td class="c5">${questions[i].asker}</td>
                <td class="c6">${questions[i].lastAnswerer}</td>
            </tr>
        `;
        question_table.appendChild(tb);
    }
}