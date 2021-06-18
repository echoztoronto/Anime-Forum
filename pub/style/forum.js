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

async function update_forum_page(questions) {
    if(self_ID != "") {
        const self_res = await fetch(`/user/${self_ID}`);     
        const uObject = await self_res.json();
        self_profile = {
            type: uObject.type,
            level: uObject.level,
            userID: uObject.userID,
            displayName: uObject.displayName,
            gold: uObject.gold,
            exp: uObject.exp,
            profilePicImg: uObject.profilePicImg,
            answered: uObject.answered,
            unlocked: uObject.unlocked
        }
        document.getElementById("nav_user_profile").src = self_profile.profilePicImg;
        document.getElementById("clickable_icon").href = "profile.html#" + uObject.userID;
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
                    <td class="c4"><a  href="question.html#${questions[i].questionID}">${questions[i].summary}</a></td>
                    <td class="c5"><a  href="profile.html#${questions[i].asker.userID}">${questions[i].asker.displayName }</a></td>
                    <td class="c6"><a  href="profile.html#${questions[i].lastAnswerer.userID}">${questions[i].lastAnswerer.displayName}</a></td>
                </tr>
            `;
            question_table.appendChild(tb);
        }
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

async function editor_submit_question() {
    let quillHTML = forum_quill.root.innerHTML;
    let question_title = document.getElementById('title-field').value;
    const message_element = document.getElementById('editor-message');
    if(question_title.length < 5) {
        message_element.style = "color: red;";
        message_element.innerHTML = "Question title must be greater than 5 characters!";
    } else {
        // get reward, level limit
        const reward = document.querySelector(`#reward-input`).value;
        const level_limit = document.querySelector(`#level-input`).value;
        try{
            const get_user_res = await fetch(`/user/${self_profile.userID}`);
            const json = await get_user_res.json();     // json: user json
            if (json.gold < reward){        // not enough gold
                message_element.style = "color: red;";
                message_element.innerHTML = "Not Enough Gold!!!";
                throw "Not Enough Gold!!!";
            }
        }catch(err){
            console.log(err);
            return;
        } 
        // check is done, then add new question
        add_new_question(question_title, quillHTML, reward, level_limit);
    }
}

async function add_new_question(title, description, reward, level_limit) {
    // create POST request with updated user information
    const new_question_data = {
        "summary": title,
        "description": description,
        "reward": reward,
        "levelLimit": level_limit,
        "asker": {
            userID: self_profile.userID, 
            displayName: self_profile.displayName,
        },
    }
    try{
        // POST new question
        const request = new Request(`/question`, {
            method: 'POST', 
            body: JSON.stringify(new_question_data),
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
        });
        let res = await fetch(request);
        if (res.status === 200) {
            document.getElementById("editor-window").style = "visibility: hidden;";
            const message_element = document.getElementById('editor-message');
            message_element.style = "color: black;";
            message_element.innerHTML = "Add a new question";
            forum_quill.setContents([{ insert: '\n' }]);
            document.getElementById('title-field').value = '';
        }else{
            console.log('Could not add question');
        }
        const question_json = await res.json();         // question object
        
        // PATCH to decrease the user's gold
        const get_user_res = await fetch(`/user/${self_profile.userID}`);
        const user_json = await get_user_res.json();     // user object
        res = await fetch(`/user/${self_profile.userID}`, {
            method: 'PATCH',
            body: JSON.stringify({
                "gold": user_json.gold - reward
            }),
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }
        });

        // POST to add to user collection "asked" array
        const user_question_info = {
            summary: title,
            qid: question_json.questionID
        }
        res = await fetch(`/userQuestion/asked/${self_profile.userID}`,{
            method: 'POST', 
            body: JSON.stringify(user_question_info),
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }
        })
        if (res.status !== 200) console.log('Could not add to user array');


        // DOM: add a new row on forum
        const table_element = document.getElementById("question_table")
        let newRow = table_element.insertRow(1)
        newRow.className = "tr"
        newRow.innerHTML = `<td class="c1">0</td>
                            <td class="c2">0</td>
                            <td class="c3">Ongoing</td>
                            <td class="c4"><a href="question.html#${question_json.questionID}">${title}</a></td>
                            <td class="c5"><a href="profile.html#${question_json.asker.userID}"> ${question_json.asker.displayName} </a></td>
                            <td class="c6"></td>`
    }catch(err){
        console.log(err);
    } 
}