const sort_time_button = document.querySelector('#sort_time')
const sort_like_button = document.querySelector('#sort_like');

sort_time_button.addEventListener('click', sort_by_time);
sort_like_button.addEventListener('click', sort_by_like);
window.addEventListener('load', sort_by_time);
let forum_quill = null;
initiate_question_editor();


async function sort_by_like(e){
    e.preventDefault();
    sort_like_button.style = "text-decoration: underline";   
    sort_time_button.style = "none";

    try{
        const res = await fetch('/allQuestions');     // get all questions from the database
        const question_list = await res.json();
        question_list.sort(function (a, b){
            return b.likeCount - a.likeCount;      // sort by like
        });
        update_forum_page(question_list);
    }catch(err){
        console.log(err);
    }
}

async function sort_by_time(e){
    e.preventDefault();
    sort_time_button.style = "text-decoration: underline";
    sort_like_button.style = "none";

    try{
        const res = await fetch('/allQuestions');     // get all questions from the database
        const question_list = await res.json();
        question_list.sort(function (a, b){
            return b.questionID - a.questionID;      // sort by ID, i.e. time
        });
        update_forum_page(question_list);
    }catch(err){
        console.log(err);
    }
}

function update_forum_page(questions) {
    let question_table = document.querySelector('#question_table');
    question_table.innerHTML = `
        <tbody>
            <tr class="tr" id="question_table_title">
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
                <td class="c4"><a target="_blank" href="question.html#${questions[i].questionID}">${questions[i].summary}</a></td>
                <td class="c5"><a target="_blank" href="profile.html#${questions[i].asker.userID}">${questions[i].asker.displayName }</a></td>
                <td class="c6"><a target="_blank" href="profile.html#${questions[i].lastAnswerer.userID}">${questions[i].lastAnswerer.displayName}</a></td>
            </tr>
        `;
        question_table.appendChild(tb);
    }
}


// start editor object
function initiate_question_editor() {
    forum_quill = new Quill('#editor', {
        modules: {
          toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline'],
            ['image']
          ]
        },
        placeholder: 'Enter your question description here',
        theme: 'snow'  
    });
}

function editor_submit_question() {
    let quillHTML = forum_quill.root.innerHTML;
    let question_title = document.getElementById('title-field').value;
    const message_element = document.getElementById('editor-message');
    if(question_title.length < 10) {
        message_element.style = "color: red;";
        message_element.innerHTML = "Question title must be greater than 10 characters!";
    } else {
        add_new_question(question_title, quillHTML);
        document.getElementById("editor-window").style = "visibility: hidden;";
        message_element.style = "color: black;";
        message_element.innerHTML = "Add a new question";
        forum_quill.setContents([{ insert: '\n' }]);
        document.getElementById('title-field').value = '';
    }
}

function add_new_question(title, description) {
    //TODO: push new question info to database

    const table_element = document.getElementById("question_table");
    let newRow = table_element.insertRow(1);
    newRow.className = "tr";
    newRow.innerHTML = `<td class="c1">0</td>
                        <td class="c2">0</td>
                        <td class="c3">Ongoing</td>
                        <td class="c4"><a href="question.html#new">${title}</a></td>
                        <td class="c5"><a href="profile.html#user">Pikachu</a></td>
                        <td class="c6"></td>`;
}