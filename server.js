require("newrelic");
const express = require("express");
const app = express();
const PORT = 3003;
const queries = require("./queries");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//get answers
app.get("/qa/:question_id/answers/:count?", (req, res) => {
  const { question_id, count } = req.params;
  queries.listAnswers(
    function (err, results) {
      if (err) {
        res.status(400).send(err);
      } else {
        let answersMiddleman = [];
        const answersObj = {
          question: question_id,
          count: parseInt(count),
          results: middleman,
        };
        results.rows.forEach((item) => {
          answersMiddleman.push({
            answer_id: item.answer_id,
            body: item.body,
            date: item.date,
            answerer_name: item.answerer_name,
            helpfulness: item.helpfulness,
            photos: [],
          });
        });
        res.status(200).send(answersObj);
      }
    },
    question_id,
    count
  );
});

//get questions
app.get("/qa/:product_id/:count?", (req, res) => {
  const { product_id, count } = req.params;
  queries.listQuestions(
    function (err, results) {
      if (err) {
        res.status(400).send(err);
      } else {
        let questionsMiddleman = [];
        const questionsObj = {
          product_id: product_id,
          results: questionsMiddleman,
        };
        results.rows.forEach((item) => {
          let answers = {};
          queries.answeredQuestions(
            function (err, data) {
              if (err) {
                res.status(400).send(err);
              } else {
                // answers[item.answer_id] = data.rows
                // console.log(data.rows.answer_id)
                res.status(200);
              }
            }, item.question_id
          )
            questionsMiddleman.push({
            question_id: item.question_id,
            question_body: item.question_body,
            question_date: item.question_date,
            asker_name: item.asker_name,
            question_helpfulness: item.question_helpfulness,
            reported: item.reported,
            answers: {
              id: item.answer_id,
              body: item.body,
              date: item.date,
              answerer_name: item.answerer_name,
              helpfulness: item.helpfulness,
              photos: []
            }
          });
        });
        res.status(200).send(results.rows);
      }
    },
    product_id,
    count
  );
});

//post a question
app.post("/qa/:product_id", (req, res) => {
  const { product_id } = req.params;
  const { body, name, email } = req.body;
  const date = new Date().toISOString();

  queries.postQuestion(
    function (err, results) {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send("OK");
      }
    },
    product_id,
    body,
    date,
    name,
    email
  );
});

//post an answer
app.post("/qa/:question_id/answers", (req, res) => {
  const { question_id } = req.params;
  const { body, name, email } = req.body;
  const date = new Date().toISOString();
  // let photos =req.body.photos

  queries.postAnswer(
    function (err, results) {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send("OK");
      }
    },
    question_id,
    body,
    date,
    name,
    email
  );
});

//mark question as helpful
app.put("/qa/question/:question_id/helpful", (req, res) => {
  const { question_id } = req.params;

  queries.helpfulQuestion(function (err, results) {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send("OK");
    }
  }, question_id);
});

//report question
app.put("/qa/question/:question_id/report", (req, res) => {
  const { question_id } = req.params;

  queries.reportQuestion(function (err, results) {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send("OK");
    }
  }, question_id);
});

//mark answer as helpful
app.put("/qa/answer/:answer_id/helpful", (req, res) => {
  const { answer_id } = req.params;

  queries.helpfulAnswer(function (err, results) {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send("OK");
    }
  }, answer_id);
});

//report answer
app.put("/qa/answer/:answer_id/report", (req, res) => {
  const { answer_id } = req.params;

  queries.reportAnswer(function (err, results) {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send("OK");
    }
  }, answer_id);
});

app.listen(PORT, () => {
  console.log(`server is running and listening on port ${PORT}`);
});
