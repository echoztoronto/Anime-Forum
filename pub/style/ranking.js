window.addEventListener('load', show_users_most_answers);
window.addEventListener('load', show_users_most_accepted);

const table_left = document.querySelector('#left_table');
const table_right = document.querySelector('#right_table');

async function show_users_most_answers(e){
    e.preventDefault();
    const res = await fetch('/allUsers');       // GET all users
    let user_list = await res.json();

    user_list = user_list.filter(user => user.num_answers > 0);
    user_list = user_list.map(user => ({
        "userID": user.userID,
        "displayName": user.displayName,
        "level": user.level   
    }));
    user_list.sort((a, b) => b.content - a.content);
    update_ranking_page(user_list, table_left, 'left');
}

async function show_users_most_accepted(e){
    e.preventDefault();
    const res = await fetch('/allUsers');       // GET all users
    let user_list = await res.json();

    user_list = user_list.filter(user => user.num_answers > 0 && user.num_accepted > 0);
    user_list = user_list.map(user => ({
        "content": ((user.num_accepted / user.num_answers) * 100).toFixed(2) + '%',
        "userID": user.userID,
        "displayName": user.displayName,
        "level": user.level   
    }));
    user_list.sort((a, b) => b.content - a.content);
    update_ranking_page(user_list, table_right, 'right');
}

function update_ranking_page(users, table, flag){
    for (let i = 0; i < Math.min(10, users.length); i++){   // show top 10 users
        let row = table.insertRow(-1);
        let cell0 = row.insertCell(0);
        let cell1 = row.insertCell(1);
        let cell2 = row.insertCell(2);
        cell0.innerHTML = `${users[i].content}`;
        cell1.innerHTML = `<a target="_blank" href="profile.html#${users[i].userID}">${users[i].displayName}</a>`;
        cell2.innerHTML = `Lv.${users[i].level}`;
        if (i % 2){
            row.className += " odd_row";
        }
    }
}