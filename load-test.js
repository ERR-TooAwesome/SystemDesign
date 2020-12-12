'use strict';

const fs = require('fs');
const faker = require('faker');

function generatePostBody(userContext, events, done) {
  // generate data with Faker:
  const body = faker.lorem.paragraph();
  const name = faker.internet.userName();
  const email = faker.internet.exampleEmail();
  // add variables to virtual user's context:
  userContext.vars.body = body;
  userContext.vars.name = name;
  userContext.vars.email = email;
  // continue with executing the scenario:
  return done();
}

module.exports = {
  generatePostBody
};