# Anime Forum
The goal of this project is to build a Question and Answer (Q&A) forum for people to communicate anime related questions. 

## Project Info
### Team 28
* [Songheng Yin](https://github.com/ReinaKousaka)
* [Echo (Yuwen) Zheng](https://github.com/echoztoronto)
* [Ziang Zhang](https://github.com/Ziang-Zhang)

### Libraries Used 
* [Quill](https://quilljs.com/) Text Editor







## Phrase 1 Instruction
### Table of Contents
- [1. Home Page](#1-home-page)
- [2. Forum Page](#2-forum-page)
- [3. Question Page](#3-question-page)
  * [3.1 Normal View](#31-normal-view)
  * [3.2 Admin View](#32-admin-view)
  * [3.3 Question Asker View](#33-question-asker-view)
  * [3.4 Low Level User View](#34-low-level-user-view)
- [4. Profile Page](#4-profile-page)
  * [4.1 Normal View](#41-normal-view)
  * [4.2 Self View](#42-self-view)
- [5. Level and Gold Explanation Page](#5-level-and-gold-explanation-page)
- [6. Ranking Page](#6-ranking-page)


### 1. Home Page
Entrance: Open index.html, or click on the __Home__ in the top left navbar. <img src="/images/readme/phase1/navbar.jpg" width="250px"> <br/><br/> 
![](/images/readme/phase1/home.jpg?raw=true) <br/> <br/>

Note: We will not save user login/sign up information for phase 1, so you can only try login/sign up UI interactions on home page. And on other pages, we assume you are logged in as user "Pikachu" (with ID "user").  <br/>


<img src="/images/readme/phase1/login_signup.jpg" width="180px"><br/>

* Login by clicking __Login__ button at top right corner
  * valid credentials: "user" "user" and "admin" "admin" 
  * note: admin only have authorities on question pages(we will provide an admin view page later), so logging "admin" in here will make no difference for now
* Sign up by clicking __Sign Up__ button at top right corner
* Click on any question title in __Hottest Questions__ or __Recent Questions__, will open the corresponding question page in a new tab. <br/>

![](/images/readme/phase1/foot.jpg?raw=true) <br/>
* Click on the GitHub icons in footer, it will open the GitHub page of the corresponding contributor. 
* Click on the Email icons in footer, it will open the default email program to send an mail to the corresponding contributor. 


### 2. Forum Page
Entrance: Click on the __Q&A Forum__ in the top left navbar. <img src="/images/readme/phase1/navbar.jpg" width="250px"><br/> <br/> 

![](/images/readme/phase1/forum.jpg?raw=true) <br/>

* Click on any question title, it will open the corresponding question page in a new tab.
* Click on any user name, it will open the profile page of the corresponding user in a new tab.
* Click on __+__ button <img src="/images/readme/phase1/add_btn.jpg" width="50">, you can add a new question. <br/>
![](/images/readme/phase1/new_question.jpg?raw=true) <br/><br/><br/>

<img src="/images/readme/phase1/sort.jpg" width="140px"> <br/>
* Click on __Time__, it will display the question list by creation time .
* Click on __Most Liked__, it will display the question list by question like count.





### 3. Question Page
There are 4 views for question page, 1 normal view + 3 special views. <br/>
For all 3 special views, we provide an extra html for each view, the entrances are in the navbar on any question page. <br/>
<img src="/images/readme/phase1/question_view.jpg" width="350px"> <br/>
Note: These entrances are temporary, we will remove them and display all views on one single page in later phases. <br/>

#### 3.1 Normal View
Entrance: Click on any question title on Home/Forum/Profile page. <br/> <br/>
![](/images/readme/phase1/question.jpg?raw=true) <br/>


<img src="/images/readme/phase1/sort.jpg" width="140px"> <br/>
* Click on __Time__, it will display the answer list by answer time .
* Click on __Most Liked__, it will display the answer list by like count.
 <br/>
 
<img src="/images/readme/phase1/like.jpg" width="300px"><br/>

* Click on __▲/▼__ button, you can like or dislike an question or answer.
* Click on __+__ button <img src="/images/readme/phase1/add_btn.jpg" width="50">, you can add a new answer. <br/>

![](/images/readme/phase1/new_answer.jpg?raw=true) <br/><br/><br/>


#### 3.2 Admin View
Entrance: On any question page, click on __Admin__ in the nav bar <br/> <br/> 
<img src="/images/readme/phase1/question_view.jpg" width="350px"> 
<img src="/images/readme/phase1/admin.jpg"> <br/>

* Click on __mute__ button, the user will be muted in the forum.<br/>
<img src="/images/readme/phase1/mute_button.jpg" height="200px">
<img src="/images/readme/phase1/after_mute.jpg" height="200px">

* Click on __delete the answer__ button, the answer will be deleted and disappear. So does the __delete the question__ button.<br/>
<img src="/images/readme/phase1/delete.jpg"> 
#### 3.3 Question Asker View
#### 3.4 Low Level User View


### 4. Profile Page
#### 4.1 Normal View
Entrance: On any page, click on any username.<br/> <br/> 
![](/images/readme/phase1/profile.jpg?raw=true "User Profile Page") <br/> 
* Click on __Asked Questions__ or __Answered Questions__ or __Accepted Questions__, a list of question posts will be displayed.<br/> 
* Click on any question post, it will open the corresponding question page on a new tab.<br/>  

<img src="/images/readme/phase1/rule_icon.jpg" width="250px"><br/>  
* Click on the question mark besides user level, it will open the [Level and Gold Explanation Page](#5-level-and-gold-explanation-page) 



#### 4.2 Self View
Entrance: On any of the Forum page, Question page (normal view), Profile page, click on the username "Pikachu" ![](/images/readme/phase1/user_pikachu.jpg?raw=true "Entrance" ) at top right corner. <br/><br/> 
* Check In <br/> <img src="/images/readme/phase1/checkin_before.jpg" width="250px"> <img src="/images/readme/phase1/checkin_after.jpg" width="250px"><br/>  
* Edit Profile (note: the only requirement is that the display name should be at least 4 characters)  <br/> 

![](/images/readme/phase1/profile_edit.jpg?raw=true "Check In-after") <br/> 



### 5. Level and Gold Explanation Page
Entrance: On any Profile Page, click on the question mark besides user level. <br/> <img src="/images/readme/phase1/rule_icon.jpg" width="250px"> <br/>
![](/images/readme/phase1/rule.jpg?raw=true)



### 6. Ranking Page
Entrance: Click on the __Ranking__ in the top left navbar. <img src="/images/readme/phase1/navbar.jpg" width="250px"><br/> <br/> 
![](/images/readme/phase1/ranking.jpg?raw=true) <br/>
