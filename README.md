# Anime Forum
The goal of this project is to build a Question and Answer (Q&A) forum for people to communicate anime related questions. 

#### Feature Summary:
* Sign up and Login 
* Check in to earn exp and gold everyday
* Edit your profile and images
* See some users' rankings 
* Like or dislike any quesiton or answer
* View questions and answers by time order or like count order
* Post questions, with options to add reward and level limit
   * choose an answer as the best answer to the question. The answerer will receive your reward.
   * users who don't meet the level limit will not be able to answer or view your question's answers, unless they spend golds to unlock the question.
   * you can delete your questions any time, but you will lose some experience.
* Answer ongoing questions
   * earn exp at the first time your answer a question
   * earn reward if your answer is accepted


## Project Info
### Team 28
* [Songheng Yin](https://github.com/ReinaKousaka)
* [Echo (Yuwen) Zheng](https://github.com/echoztoronto)
* [Ziang Zhang](https://github.com/Ziang-Zhang)

### Deployed App Link
https://anime-qa-forum.herokuapp.com/

### Libraries Used 
* [Quill](https://quilljs.com/) Text Editor

### Table of Contents
- [Phrase 2 Instruction](#phrase-2-instruction)
  * [1. Home Page](#1-home-page)
  * [2. Forum Page](#2-forum-page)
  * [3. Question Page](#3-question-page)
    + [3.1 Normal View](#31-normal-view)
    + [3.2 Admin View](#32-admin-view)
    + [3.3 Question Asker View](#33-question-asker-view)
    + [3.4 Low Level User View](#34-low-level-user-view)
  * [4. Profile Page](#4-profile-page)
    + [4.1 Normal View](#41-normal-view)
    + [4.2 Self View](#42-self-view)
  * [5. Level and Gold Explanation Page](#5-level-and-gold-explanation-page)
  * [6. Ranking Page](#6-ranking-page)
- [Server Routes](#server-routes)
  * [users](#users)
  * [questions](#questions)
  * [answers (subdocument of questions)](#answers--subdocument-of-questions-)






## Phrase 2 Instruction

Feature removed (compared to phase 1): Anime schedule on the home page.

### 1. Home Page
Entrance: Open index.html, or click on the __Home__ in the top left navbar. <img src="/images/readme/phase2/navbar.jpg" width="250px"> <br/><br/> 
![](/images/readme/phase2/home.jpg?raw=true) <br/> <br/>


<img src="/images/readme/phase2/login_signup.jpg" width="180px"><br/>

* Login by clicking __Login__ button at top right corner
  * valid credentials
 
| userID                 | password | type                | note                                        |
| ---------------------- | -------- | ------------------- | ------------------------------------------- |
| user                   | user     | normal              | general functionalities                     |
| admin                  | admin    | admin               | can delete questions + mute non-admin users |
| kano                   | kano     | normal              | high level + more gold                      |
| any new signed up user |          | normal              | low level + no gold                         |

* Sign up by clicking __Sign Up__ button at top right corner
* Click on any question title in __Hottest Questions__ or __Recent Questions__, will open the corresponding question page in a new tab. <br/>

![](/images/readme/phase1/foot.jpg?raw=true) <br/>
* Click on the GitHub icons in footer, it will open the GitHub page of the corresponding contributor. 
* Click on the Email icons in footer, it will open the default email program to send an mail to the corresponding contributor. 


### 2. Forum Page
Entrance: Click on the __Q&A Forum__ in the top left navbar. <img src="/images/readme/phase2/navbar.jpg" width="250px"><br/> <br/> 

![](/images/readme/phase1/forum.jpg?raw=true) <br/>

* Click on any question title, it will open the corresponding question page in a new tab.
* Click on any user name, it will open the profile page of the corresponding user in a new tab.
* Click on __+__ button <img src="/images/readme/phase2/add_btn.jpg" width="50">, you can add a new question. You can also set the level threshold and reward amount for this question. <br/>
* 
![](/images/readme/phase2/new_question.jpg?raw=true) <br/><br/><br/>

<img src="/images/readme/phase1/sort.jpg" width="140px"> <br/>
* Click on __Time__, it will display the question list by creation time .
* Click on __Most Liked__, it will display the question list by question like count.





### 3. Question Page
There are 4 views for question page, 1 normal view + 3 special views. <br/>
| view      | how to see it                                                                               |
| --------- | ------------------------------------------------------------------------------------------- |
| normal    | general view                                                                                |
| admin     | login an admin user                                                                         |
| asker     | add a question, then open that question                                                     |
| low level | add a question with high level limit, then use another user with lower level than the limit |

#### 3.1 Normal View
Entrance: Click on any question title on Home/Forum/Profile page. <br/> <br/>
![](/images/readme/phase2/question.jpg?raw=true) <br/>


<img src="/images/readme/phase2/sort.jpg" width="140px"> <br/>
* Click on __Time__, it will display the answer list by answer time .
* Click on __Most Liked__, it will display the answer list by like count.
 <br/>
 
<img src="/images/readme/phase2/like.jpg" width="300px"><br/>

* Click on __▲/▼__ button, you can like or dislike an question or answer.
* Click on __+__ button <img src="/images/readme/phase2/add_btn.jpg" width="50">, you can add a new answer. <br/>

![](/images/readme/phase1/new_answer.jpg?raw=true) <br/><br/><br/>


#### 3.2 Admin View

<img src="/images/readme/phase2/admin.jpg"> <br/>

* Click on __mute__ button, and enter the password in the confirmation window, then the user will be muted in the forum.<br/>
<img src="/images/readme/phase2/mute_confirm.jpg" width="200px"><br/>
<img src="/images/readme/phase2/mute_button.jpg" width="200px"> <img src="/images/readme/phase2/after_mute.jpg" width="200px">

* Click on __Delete the answer__ button, the answer will be deleted and disappear. So does the __Delete the question__ button.<br/>
<img src="/images/readme/phase2/delete.jpg" width="450px"> <br/><br/><br/>


#### 3.3 Question Asker View
<img src="/images/readme/phase2/asker.jpg"> <br/>

* The __Delete the question__ button works exactly the same as that on *Admin* page. <br/>

* Click on the __Accept the answer__ button, this answer will be accepted.
<img src="/images/readme/phase2/after_accepted.jpg" width="450px"> <br/><br/><br/>


#### 3.4 Low Level User View
<img src="/images/readme/phase2/low.jpg"> <br/>
* The answers are hidden as you do not meet the level restriction for this question. Clicking on __Unlock__ will allow you to see the answers.
* Click on the question mark besides level limit, it will open the [Level and Gold Explanation Page](#5-level-and-gold-explanation-page) 



### 4. Profile Page
#### 4.1 Normal View
![](/images/readme/phase2/profile.jpg?raw=true "User Profile Page") <br/> 
* Click on __Asked Questions__ or __Answered Questions__ or __Accepted Questions__, a list of question posts will be displayed.<br/> 
* Click on any question post, it will open the corresponding question page on a new tab.<br/>  

<img src="/images/readme/phase1/rule_icon.jpg" width="250px"><br/>  
* Click on the question mark besides user level, it will open the [Level and Gold Explanation Page](#5-level-and-gold-explanation-page) 



#### 4.2 Self View
* Check In <br/> <img src="/images/readme/phase1/checkin_before.jpg" width="250px"> <img src="/images/readme/phase1/checkin_after.jpg" width="250px"><br/>  
* Edit Profile (note: the only requirement is that the display name should be at least 4 characters)  <br/> 

![](/images/readme/phase1/profile_edit.jpg?raw=true "Check In-after") <br/> 



### 5. Level and Gold Explanation Page
Entrance: On any Profile Page, click on the question mark besides user level. <br/> <img src="/images/readme/phase1/rule_icon.jpg" width="250px"> <br/>
![](/images/readme/phase1/rule.jpg?raw=true)



### 6. Ranking Page
Entrance: Click on the __Ranking__ in the top left navbar. <img src="/images/readme/phase2/navbar.jpg" width="250px"><br/> <br/> 
![](/images/readme/phase2/ranking.jpg?raw=true) <br/>

* Click on any user name, it will open the profile page of corresponding user. 



## Server Routes


### users
| Method | URL        | Usage        | Request.body           | Response                    |
| ------ | ---------- | ------------ | ----------------------------   | -------------------------------   |
| GET    | /user/:id                     | get user info                                                               | n/a                                                               | the user object            |
| POST   | /user                         | add user                                                                    | {<br>&nbsp;&nbsp;"userID": String, (required)<br>&nbsp;&nbsp;// and other attributes<br>} | the added user object      |
| PATCH  | /user/:id                     | modify user                                                                 | {<br>&nbsp;&nbsp;// any attribute(s)<br>}                                     | the modified user object   |
| POST   | /userQuestion<br>/:type/:uid      | add to <br>asked/answered/accepted array <br> (as parameter "type")      | {<br>&nbsp;&nbsp;"summary": String,<br>&nbsp;&nbsp;"qid": Number<br>}                     | the modified array (:type) |
| DELETE | /userQuestion<br>/:type/:uid/:qid | delete from <br>asked/answered/accepted array <br> (as parameter "type") | n/a                                                               | the modified array (:type) |
| GET    | /allUsers                     | get all users                                                               | n/a                                                               | the array of users object  |
| POST   | /verifyPsw                    | verify password                                                             | {<br>&nbsp;&nbsp;"uid": Number,<br>&nbsp;&nbsp;"password": String<br>}                    | status only                |




### questions
| Method | URL            | Usage                                                         | Request.body                                                                                                                                       | Response              |
| ------ | -------------- | ------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- |
| GET    | /question/:qid | get question                                                  | n/a                                                                                                                                                | the question object   |
| POST   | /question      | add question                                                  | {<br>&nbsp;&nbsp;"summary": String,<br>&nbsp;&nbsp;"description": String,<br>&nbsp;&nbsp;"reward": Number,<br>&nbsp;&nbsp;"levelLimit": Number,<br>&nbsp;&nbsp;"asker": {"userID": String, &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"displayName": String}<br>} | status only           |
| DELETE | /question/:qid | delete question| n/a                                                                                                                                                | status only           |
| PATCH  | /question/:qid | modify question                                               | object-value pairs                                                                                                                                 | modified question     |
| GET    | /allQuestions  | get all questions                                             | n/a                                                                                                                                                | \[questions\] (array) |



### answers (subdocument of questions)
| Method | URL                       | Usage                                                     | Request.body                                                                                     | Response          |
| ------ | ------------------------- | --------------------------------------------------------- | ------------------------------------------------------------------------------------------------ | ----------------- |
| GET    | /question/:qid/:aid       | get answer                                                | n/a                                                                                              | the answer object |
| POST   | /question/:qid            | add answer                                                | {<br>&nbsp;&nbsp;"answerer": {userID: String, &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;displayName: String},<br>&nbsp;&nbsp;"content": String,<br>&nbsp;&nbsp;"questionID": Number<br>} | status only       |
| DELETE | /question/:qid/:aid       | delete answer  | n/a                                                                                              | status only       |
| PATCH  | /question/:qid/:aid       | modify answer                                             | object-value pairs                                                                               | modified answer   |
| GET    | /answers-of-question/:qid | get all answers of a given question                       | n/a                                                                                              | \[answers\]       |







