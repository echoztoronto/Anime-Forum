'use strict';
const log = console.log;

// Express
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const path = require('path');
app.use(express.static(path.join(__dirname, '/pub')));


// Mongo and Mongoose
const { ObjectID } = require('mongodb');
const { mongoose } = require('./db/mongoose');

// Collections
const { User } = require('./models/users');
const { Question } = require('./models/questions.js');

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

// POST /user
app.post('/user', async (req, res) => {
	const user = new User(req.body)

	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	}

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


// --------------- Part: Answers ---------------------------

// POST /answer/:qid
/* function that add an answer, qid: questionID
request body expects:
{
	"answerer": String,
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
			answerer: req.body.answer,
			content: req.body.content,
			likeCount: 0,
			accepted: false
		});
		question.answer_list.push(answer);
		const result = await question.save();	
		res.send(result);
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
		const result = await Question.findOne({ questionID: qid }).exec();
		if (!result) {
			res.status(404).send('Resource not found');
		} else {
			res.send(result.answer_list);
		}
	} catch(error) {
		log(error);
		res.status(500).send('Internal Server Error');
	}
});

// --------------- Part: Questions ---------------------------

// POST /question
/* function that add a question
request body expects:
{
	"summary": String
	"description": String,
	"reward": Number,
	"levelLimit": Number,
	"asker": String
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
			lastAnswerer: ""
		});
		const result = await question.save();	
		res.send(result);
	} catch(error) {
		log(error);
		res.status(500).send('Internal Server Error');
	}
})


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


////////// DO NOT CHANGE THE CODE OR PORT NUMBER BELOW
const port = process.env.PORT || 5000
app.listen(port, () => {
	log(`Listening on port ${port}...`)
});
