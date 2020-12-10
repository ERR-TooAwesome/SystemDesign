DROP DATABASE IF EXISTS q_a;

CREATE DATABASE q_a;

\c q_a;

CREATE TABLE IF NOT EXISTS questions (
  question_id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL,
  question_body TEXT NOT NULL,
  question_date text,
  asker_name TEXT NOT NULL,
  helpfulness INTEGER DEFAULT 0,
  email TEXT NOT NULL,
  reported INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS answers (
  answer_id SERIAL PRIMARY KEY,
  question_id INTEGER REFERENCES questions(question_id),
  body TEXT NOT NULL,
  date TEXT,
  answerer_name TEXT NOT NULL,
  helpfulness INTEGER DEFAULT 0,
  email TEXT NOT NULL,
  reported INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS photos (
  photo_id SERIAL PRIMARY KEY,
  answer_id INTEGER REFERENCES answers(answer_id),
  url TEXT NOT NULL
);