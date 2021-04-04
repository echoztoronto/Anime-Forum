window.addEventListener('load', show_users_most_answers);
window.addEventListener('load', show_users_most_accepted);

const table_left = document.querySelector('#left_table');
const table_right = document.querySelector('#right_table');

async function show_users_most_answers(e){
    e.preventDefault();
    const res = await fetch('/allUsers');       // GET all users
    const user_list = await res.json();

    user_list.sort(function(a, b){
        return b.num_answers - a.num_answers;
    });
    let i = 0;
    for (i = 0; i < user_list.length; i++){    // ONLY display users have answered questions
        if (user_list[i].num_answers == 0){
            break;
        }
    }
    update_ranking_page(user_list.slice(0, i), table_left, 'left');
}

async function show_users_most_accepted(e){
    e.preventDefault();
    const res = await fetch('/allUsers');       // GET all users
    const user_list = await res.json();

    user_list.sort(function(a, b){
        return (b.num_accepted / b.num_answers) - (a.num_accepted / a.num_answers);
    });
    let i = 0;
    for (i = 0; i < user_list.length; i++){    // ONLY display users have answered questions
        if (user_list[i].num_accepted == 0){
            break;
        }
    }
    update_ranking_page(user_list.slice(0, i), table_right, 'right');
}

function update_ranking_page(users, table, flag){
    for (let i = 0; i < Math.min(10, users.length); i++){   // show top 10 users
        let row = table.insertRow(-1);
        let cell0 = row.insertCell(0);
        let cell1 = row.insertCell(1);
        let cell2 = row.insertCell(2);
        if (flag == 'right'){      // flag is the indicator for left/right table
            cell0.innerHTML = `${users[i].num_accepted / users[i].num_answers}`;
        }else{
            cell0.innerHTML = `${users[i].num_answers}`;
        }
        cell1.innerHTML = `<a target="_blank" href="profile.html#${users[i].userID}">${users[i].displayName}</a>`;
        cell2.innerHTML = `Lv.${users[i].level}`;
        if (i % 2){
            row.className += " odd_row";
        }
    }
}