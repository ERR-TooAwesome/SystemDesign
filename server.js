// require('newrelic');
const express = require("express");
const app = express();
const PORT = 3003;
const queries = require("./queries");
const bodyParser = require('body-parser');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));


//get answers
app.get('/qa/:question_id/answers/:count?', (req, res) => {
  const {question_id, count} = req.params;
  console.log(count)
  queries.listAnswers(function(err, results) {
    if (err) {
      res.status(400).send(err)
    } else {
      res.send(results.rows)
    }
  }, question_id, count)
});

//get questions
app.get('/qa/:product_id/:count?', (req, res) => {
  const {product_id, count} = req.params;
  queries.listQuestions(function(err, results) {
    if (err) {
      res.status(400).send(err)
    } else {
      res.send(results.rows)
    }
  }, product_id, count)
});

//post a question
app.post('/qa/:product_id', (req, res) => {
  const {product_id} = req.params;
  const {body, name, email} = req.body;
  const date = new Date().toISOString()

  queries.postQuestion(function(err, results) {
    if (err) {
      res.status(400).send(err)
    } else {
      res.status(200)
    }
  }, product_id, body, date, name, email)
});

//post an answer
app.post('/qa/:question_id/answers', (req, res) => {
  const {question_id} = req.params;
  const {body, name, email} = req.body;
  const date = new Date().toISOString()
  // let photos =req.body.photos

  queries.postAnswer(function(err, results) {
    if (err) {
      res.status(400).send(err)
    } else {
      res.status(200)
    }
  }, question_id, body, date, name, email)
});

//mark question as helpful
app.put('/qa/question/:question_id/helpful', (req, res) => {
  const {question_id} = req.params;

  queries.helpfulQuestion(function(err, results) {
    if (err) {
      res.status(400).send(err)
    } else {
      res.status(200);
    }
  }, question_id)
});

//report question
app.put('/qa/question/:question_id/report', (req, res) => {
  const {question_id} = req.params;

  queries.reportQuestion(function(err, results) {
    if (err) {
      res.status(400).send(err)
    } else {
      res.status(200)
    }
  }, question_id)
});

//mark answer as helpful
app.put('/qa/answer/:answer_id/helpful', (req, res) => {
  const {answer_id} = req.params;

  queries.helpfulAnswer(function(err, results) {
    if (err) {
      res.status(400).send(err)
    } else {
      res.status(200)
    }
  }, answer_id)
});

//report answer
app.put('/qa/answer/:answer_id/report', (req, res) => {
  const {answer_id} = req.params;

  queries.reportAnswer(function(err, results) {
    if (err) {
      res.status(400).send(err)
    } else {
      res.status(200)
    }
  }, answer_id)
});

app.listen(PORT, () => {
  console.log(`server is running and listening on port ${PORT}`);
});