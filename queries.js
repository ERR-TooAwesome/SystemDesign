const { Pool } = require(`pg`);
const pool = new Pool({
  user: "root",
  password: "root",
  host: "localhost",
  port: 5432,
  database: "q_a",
});

pool
  .connect()
  .then(() => console.log(`connected successfully`))
  .catch((e) => console.error(e));
// SELECT answer_id, body, date, answerer_name, helpfulness FROM answers JOIN questions ON questions.question_id = answers.question_id WHERE product_id = $1 AND questions.reported = 0 LIMIT $2;
//get questions
const listQuestions = (cb, id, count = 5) => {
  pool.query(
    `SELECT * FROM questions WHERE product_id = $1 AND questions.reported = 0 LIMIT $2`,
    [id, count],
    (err, results) => {
      if (err) {
        cb(err, null);
      } else {
        cb(null, results);
      }
    }
  );
};

//get answers for questions body
const answeredQuestions = (cb, id, count = 5) => {
  pool.query(
    `SELECT answer_id, body, date, answerer_name, helpfulness FROM answers WHERE question_id = $1 AND reported = 0 LIMIT $2`,
    [id, count],
    (err, results) => {
      if (err) {
        cb(err, null);
      } else {
        cb(null, results);
      }
    }
  );
};

//get answers
const listAnswers = (cb, id, count = 5) => {
  pool.query(
    `SELECT * FROM answers WHERE question_id = $1 AND reported = 0 LIMIT $2`,
    [id, count],
    (err, results) => {
      if (err) {
        cb(err, null);
      } else {
        cb(null, results);
      }
    }
  );
};

//post a question
const postQuestion = (cb, id, body, date, name, email) => {
  pool.query(
    `INSERT INTO questions(product_id, question_body, question_date, asker_name, email) VALUES ($1, $2, $3, $4, $5)`,
    [id, body, date, name, email],
    (err, results) => {
      if (err) {
        cb(err, null);
      } else {
        cb(null, results);
      }
    }
  );
};

//post an answer
const postAnswer = (cb, id, body, date, name, email, photos) => {
  pool.query(
    `INSERT INTO answers(question_id, body, date, answerer_name, email)
  VALUES ($1, $2, $3, $4, $5)`,
    [id, body, date, name, email],
    (err, results) => {
      if (err) {
        cb(err, null);
      } else {
        cb(null, results);
      }
    }
  );
};

//mark question as helpful
const helpfulQuestion = (cb, id) => {
  pool.query(
    `UPDATE questions SET question_helpfulness = question_helpfulness + 1 WHERE question_id = $1`,
    [id],
    (err, results) => {
      if (err) {
        cb(err, null);
      } else {
        cb(null, results);
      }
    }
  );
};

//report question
const reportQuestion = (cb, id) => {
  pool.query(
    `UPDATE questions SET reported = reported + 1 WHERE question_id = $1`,
    [id],
    (err, results) => {
      if (err) {
        cb(err, null);
      } else {
        cb(null, results);
      }
    }
  );
};

//mark answer as helpful
const helpfulAnswer = (cb, id) => {
  pool.query(
    `UPDATE answers SET helpfulness = helpfulness + 1
  WHERE answer_id = $1`,
    [id],
    (err, results) => {
      if (err) {
        cb(err, null);
      } else {
        cb(null, results);
      }
    }
  );
};

//report question
const reportAnswer = (cb, id) => {
  pool.query(
    `UPDATE answers SET reported = reported + 1
  WHERE answer_id = $1`,
    [id],
    (err, results) => {
      if (err) {
        cb(err, null);
      } else {
        cb(null, results);
      }
    }
  );
};

module.exports = {
  listQuestions,
  listAnswers,
  answeredQuestions,
  postQuestion,
  postAnswer,
  helpfulQuestion,
  reportQuestion,
  helpfulAnswer,
  reportAnswer,
};
