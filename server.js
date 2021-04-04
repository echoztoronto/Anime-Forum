'use strict';
const log = console.log;

// Express
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({limit: '10mb', extended: true }));
app.use(bodyParser.json({limit: '10mb', extended: true}));
const path = require('path');
app.use(express.static(path.join(__dirname, '/pub')));



// Mongo and Mongoose
const { ObjectID } = require('mongodb');
const { mongoose } = require('./db/mongoose');

// Collections
const { User } = require('./models/users');
const { Question } = require('./models/questions.js');
const { Credential } = require('./models/credential');

//////////////////////////////////   USER  ////////////////////////////////////
// GET /user/id
app.get('/user/:id', async (req, res) => {
	const id = req.params.id

	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	}

	try {
		const result = await User.findOne({ userID: id }).exec()
		if (!result) {
			res.status(404).send('Resource not found')  
		} else {
			res.send(result)
		}
	} catch(error) {
		log(error)
		res.status(500).send('Internal Server Error') 
	}
})

// GET /allUsers
// return ALL users
app.get('/allUsers', async (req, res) =>{
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection');
		res.status(500).send('Internal server error');
		return;
	}
	try {
		const result = await User.find({});
		if (!result) {
			res.status(404).send('Resource not found');
		} else {
			const lst = []
			result.forEach(user => {
				lst.push({
					userID: user.userID, 
					displayName: user.displayName,
					level: user.level,
					num_answers: user.answered.length,
					num_accepted: user.accepted.length
				})
			})
			res.json(lst);
		}
	} catch(error) {
		log(error);
		res.status(500).send('Internal Server Error');
	}
});

// POST /user
app.post('/user', async (req, res) => {
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	}

	const existed = await User.findOne({ userID: req.params.userID}).exec()
	if (!existed) {
		const user = new User(req.body)
		try {
			const result = await user.save()	
			res.send(result)
		} catch(error) {
			log(error) 
			if (isMongoError(error)) { 
				res.status(500).send('Internal server error')
			} else {
				res.status(400).send('Bad Request') 
			}
		}
	} else {
		res.status(450).send('User already exists')
	}
})

// PATCH /user/id
app.patch('/user/:id', async (req, res) => {
	const id = req.params.id

	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	}

	try {
		const user = await User.findOne({ userID: id }).exec()
		if (!user) {
			res.status(404).send('Resource not found')
		} else {   
			for (const [key, value] of Object.entries(req.body)) {
				user[key] = value
			}
			const result = await user.save()
			res.send(result)
		}
	} catch (error) {
		log(error)
		if (isMongoError(error)) { 
			res.status(500).send('Internal server error')
		} else {
			res.status(400).send('Bad Request') 
		}
	}
})

///////////////////   Users' questions for profile page  /////////////////////////
/* 
request body expects:
{
	"summary": String,
    "qid": Number,
	"status": String
}
*/
app.post('/userQuestion/:type/:id', async(req, res) => {
	const id = req.params.id
	const type = req.params.type

	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	}

	try {
		const user = await User.findOne({ userID: id }).exec()
		if (!user) {
			res.status(404).send('Resource not found')  
		}  else {

			user[type].push({
				summary: req.body.summary,
    			qid: req.body.qid
			})

			const result = await user.save()
			if (!result) {
				res.status(404).send()
			} else {   
				res.send(user[type])
			}
		}
	} catch(error) {
		log(error)
		res.status(500).send('Internal Server Error') 
	}
})

app.delete('/userQuestion/:type/:id/:qid', async(req, res) => {
	const id = req.params.id
	const qid = req.params.qid
	const type = req.params.type

	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	}

	try {
		const user = await User.findOne({ userID: id }).exec()
		if (!user) {
			res.status(404).send('Resource not found')  
		} else {
			
			for(let i = 0; i < user[type].length; i++) {
				if(user[type][i].qid == qid) {
					user[type][i].remove()
				}
			}

			const result = await user.save()
			if (!result) {
				res.status(404).send()
			} else {   
				res.send(user[type])
			}
		}
	} catch(error) {
		log(error)
		res.status(500).send('Internal Server Error') 
	}
})

// --------------- Part: Questions ---------------------------

// POST /question
/* function that add a question
request body expects:
{
	"summary": String,
	"description": String,
	"reward": Number,
	"levelLimit": Number,
	"asker": {
        userID: String, 
        displayName: String,
    },
}
*/
app.post('/question', async (req, res) => {
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection');
		res.status(500).send('Internal server error');
		return;
	}
	try {
		// ID := max ID + 1
		let new_ID = 0;
		(await Question.find({})).forEach(item => {
			if (item.questionID > new_ID){
				new_ID = item.questionID;
			}
		})
		new_ID += 1;
		const question = new Question({
			questionID: new_ID,
			summary: req.body.summary,
			description: req.body.description,
			reward: req.body.reward,
			levelLimit: req.body.levelLimit,
			asker: req.body.asker,
			likeCount: 0,
			replyCount: 0,
			status: "Ongoing",
		});
		const result = await question.save();	
		res.send({
			questionID: new_ID,
			summary: req.body.summary,
			asker: req.body.asker,
		});
	} catch(error) {
		log(error);
		res.status(500).send('Internal Server Error');
	}
})

// GET /all-questions
// get all the questions
app.get('/allQuestions', async (req, res) =>{
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection');
		res.status(500).send('Internal server error');
		return;
	}
	try {
		const result = await Question.find({});
		if (!result) {
			res.status(404).send('Resource not found');
		} else {
			const lst = [];
			result.forEach(question => {
				lst.push({
					"questionID": question.questionID,
    				"summary": question.summary,
					"likeCount": question.likeCount,
					"replyCount": question.replyCount,
					"status": question.status,
					"asker": question.asker,
					"lastAnswerer": question.lastAnswerer
				})
			})
			res.json(lst);
		}
	} catch(error) {
		log(error);
		res.status(500).send('Internal Server Error');
	}
});


// GET /question/qid
// Note: id here is the ID field of question objects
app.get('/question/:qid', async (req, res) =>{
	const qid = req.params.qid;
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection');
		res.status(500).send('Internal server error');
		return;
	}
	try {
		const result = await Question.findOne({ questionID: qid }).exec();
		if (!result) {
			res.status(404).send('Resource not found');
		} else {
			res.send(result);
		}
	} catch(error) {
		log(error);
		res.status(500).send('Internal Server Error');
	}
});

// DELETE /question/:qid/
// Route that delete a answer of aid inside the question of qid
// Note: aid is the ObjectId, qid is the QuestionId field
app.delete('/question/:qid', async (req, res) =>{
	const qid = req.params.qid;
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection');
		res.status(500).send('Internal server error');
		return;
	}
	try {
		const question = await Question.findOne({ questionID: qid }).exec();
		if (!question) {
			res.status(404).send('Resource not found');
		} else {
			const result = await Question.deleteMany({ questionID: qid});
			if (!result){
				res.status(404).send();
			}else{
				res.send(question);
			}
		}
	} catch(error) {
		log(error);
		res.status(500).send('Internal Server Error');
	}
});

// PATCH /question/:qid
app.patch('/question/:qid', async (req, res) => {
	const qid = req.params.qid;
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection');
		res.status(500).send('Internal server error');
		return;
	}
	try{
		const question = await Question.findOne({ questionID: qid }).exec();
		if (!question) {
			res.status(404).send('Resource not found')
		}else{   
			for (const [key, value] of Object.entries(req.body)) {
				question[key] = value;
			}
			const result = await question.save();
			res.send(result);
		}
	} catch (error) {
		log(error);
		if (isMongoError(error)) { 
			res.status(500).send('Internal server error');
		} else {
			res.status(400).send('Bad Request');
		}
	}
});


// --------------- Part: Answers ---------------------------

// POST /answer/:qid
/* Route that adds an answer, qid: questionID
request body expects:
{
	"questionID": Number,
	"answerer": {
		"userId": String,
		"displayName": String
	},
	"content": String
}
*/
app.post('/question/:qid', async (req, res) => {
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection');
		res.status(500).send('Internal server error');
		return;
	}
	try {
		const qid = req.params.qid;
		const question = await Question.findOne({ questionID: qid }).exec();	// find the question
		
		// create a new answer
		const answer = question.answer_list.create({
			answerID: question.answer_list.length + 1,
			questionID: qid,
			answerer: req.body.answerer,
			content: req.body.content,
			likeCount: 0,
			accepted: false
		});
		question.answer_list.push(answer);
		question.lastAnswerer = req.body.answerer;		// modify question lastAnswerer
		const result = await question.save();	
		res.send(result);
	} catch(error) {
		log(error);
		res.status(500).send('Internal Server Error');
	}
});

// GET /question/:qid/:aid
// Route that return a answer of aid inside the question of qid
// Note: aid is the ObjectId, qid is the QuestionId field
app.get('/question/:qid/:aid', async (req, res) =>{
	const qid = req.params.qid;
	const aid = req.params.aid;
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection');
		res.status(500).send('Internal server error');
		return;
	}
	try {
		const question = await Question.findOne({ questionID: qid }).exec();
		if (!question) {
			res.status(404).send('Resource not found');
		} else {
			res.send(question.answer_list.id(aid));
		}
	} catch(error) {
		log(error);
		res.status(500).send('Internal Server Error');
	}
});

// GET /answers-of-question/qid
// Note: qid here is the questionID field of question objects, return all answers for this question
app.get('/answers-of-question/:qid', async (req, res) =>{
	const qid = req.params.qid;
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection');
		res.status(500).send('Internal server error');
		return;
	}
	try {
		const question = await Question.findOne({ questionID: qid }).exec();
		if (!question) {
			res.status(404).send('Resource not found');
		} else {
			res.send(question.answer_list);
		}
	} catch(error) {
		log(error);
		res.status(500).send('Internal Server Error');
	}
});

// DELETE /question/:qid/:aid
// Route that Delete a answer of aid inside the question of qid
// Note: aid is the ObjectId, qid is the QuestionId field
app.delete('/question/:qid/:aid', async (req, res) =>{
	const qid = req.params.qid;
	const aid = req.params.aid;
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection');
		res.status(500).send('Internal server error');
		return;
	}
	try {
		const question = await Question.findOne({ questionID: qid }).exec();
		if (!question) {
			res.status(404).send('Resource not found');
		} else {
			const item = question.answer_list.id(aid);
			question.answer_list.id(aid).remove();
			const result = await question.save();
			if (!result){
				res.status(404).send();
			}else{
				res.send({
					"answer": item,
					"question": question
				});
			}
		}
	} catch(error) {
		log(error);
		res.status(500).send('Internal Server Error');
	}
});


// PATCH /question/:qid/:aid
// Route that updates an answer
// NOTE: aid is the ObjectId of answer, qid is the questionID field
app.patch('/question/:qid/:aid', async (req, res) => {
	const qid = req.params.qid;
	const aid = req.params.aid;
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection');
		res.status(500).send('Internal server error');
		return;
	}
	try{
		const question = await Question.findOne({ questionID: qid }).exec();
		if (!question) {
			res.status(404).send('Resource not found')
		}else{
			const answer = await question.answer_list.id(aid);
			for (const [key, value] of Object.entries(req.body)) {
				answer[key] = value;
			}
			const result = await question.save();
			res.send(answer);
		}
	} catch (error) {
		log(error);
		if (isMongoError(error)) { 
			res.status(500).send('Internal server error');
		} else {
			res.status(400).send('Bad Request');
		}
	}
});


//////////////////////////////////   SIGNUP  ////////////////////////////////////
// POST /signup
app.post('/signup', async (req, res) => {
	const body = req.body;
	let response = { code: 500, data: [], message: "fail to signup" };

	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		response.message = "error with database connection";
		res.json(response)
		return;
	}
	try {
		// to see if the account is exist
		const result1 = await Credential.findOne({ userID: body.userID }).exec();
		if (result1) {
			response.message = "User already exists, please try again";
		} else {
			const credential = new Credential(body)
			const result2 = await credential.save();
			response.data = { id: ObjectID(result2._id), userID: body.userID }
			response.code = 0;
			response.message = "Successfully Signup";
			//res.cookie('username', body.userID, { maxAge: 864000, path: "/" });
			res.cookie('username', body.userID, { maxAge: new Date(Date.now() + 3 * 86400 * 1000), path: "/" });
		}
	} catch (error) {
		log(error)
		response.message = "Internal Server Error";
	}
	res.json(response)
})

//////////////////////////////////   LOGIN  ////////////////////////////////////
// POST /login
app.post('/login', async (req, res) => {
	const body = req.body;
	let response = { code: 500, data: [], message: "fail to login" };
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection');
		res.json(response);
		return;
	}
	try {
		// To compare the userid and password
		const result = await Credential.findOne({ userID: body.userID, password: body.password }).exec();
		const remember = body.remember ? 1 : 0;
		// cookie exp
		// remember psw then 7 days expire; otherwise 1 day expire
		const day = remember == 1 ? 7 : 1;
		if (result) {
			//res.cookie('username', body.userID, { maxAge: day * 864000, path: "/" });
			res.cookie('username', body.userID, { maxAge: new Date(Date.now() + day * 86400 * 1000), path: "/" });
			// Successfully Log in
			response.code = 0;
			response.data = { userID: body.userID, remember: remember, day: day };
			response.message = "Successfully Login.";
		} else {
			response.message = "Incorrect username or password.";
		}
	} catch (error) {
		log(error)
		response.message = "Database Finding Error";
	}
	res.json(response);
})




////////// DO NOT CHANGE THE CODE OR PORT NUMBER BELOW
const port = process.env.PORT || 5000
app.listen(port, () => {
	log(`Listening on port ${port}...`)
});
