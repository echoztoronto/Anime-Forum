window.addEventListener('load', show_users_most_answers);
window.addEventListener('load', show_users_most_accepted);

const table_left = document.querySelector('#left_table');
const table_right = document.querySelector('#right_table');
let users_clone = JSON.parse(JSON.stringify(user_profiles));

function show_users_most_answers(e){
    e.preventDefault();
    users_clone.sort(function(a, b){
        return b.num_answers - a.num_answers;
    });
    update_ranking_page(users_clone, table_left, 0);
}

function show_users_most_accepted(e){
    e.preventDefault();
    users_clone.sort(function(a, b){
        return (b.num_accepted / b.num_answers) - (a.num_accepted / a.num_answers);
    });
    update_ranking_page(users_clone, table_right, 1);
}

function update_ranking_page(users, table, flag){
    for (let i = 0; i < 10; i++){   // show top 10 users
        let row = table.insertRow(-1);
        let cell0 = row.insertCell(0);
        let cell1 = row.insertCell(1);
        let cell2 = row.insertCell(2);
        if (flag){      // flag is the indicator for left/right table
            cell0.innerHTML = `${users[i].num_accepted / users[i].num_answers}`;
        }else{
            cell0.innerHTML = `${users[i].num_answers}`;
        }
        cell1.innerHTML = `${users[i].displayName}`;
        cell2.innerHTML = `Lv.${users[i].level}`;
        if (i % 2){
            row.className += " odd_row";
        }
    }
}