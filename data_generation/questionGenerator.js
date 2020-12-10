const fs = require('fs');
const faker = require('faker');

const lines = 5000
const filename = 'questions.csv'
const stream = fs.createWriteStream(filename)


const startWriting = (writeStream, encoding, done) => {
  let i = lines;
  let id = 0;

  const createPost = () => {

    const product_id = Math.ceil(Math.random() * 50)
    const body = faker.lorem.paragraph();
    const timestamp = faker.date.between('2020-01-01', '2020-12-31') + 'T00:00:00.000Z';
    const name = faker.internet.userName();
    const helpfulness = 0;
    const email = faker.internet.exampleEmail();
    const reported = 0

    return `${id},${product_id},${body},${timestamp},${name},${helpfulness},${email},${reported}\n`
  }

  function writing(){
    let canWrite = true;
    do {
      i--;
      let post = createPost();

      if(i === 0){
        writeStream.write(post, encoding, done);
        id++;
      }else{
        writeStream.write(post, encoding);
        id++;
      }
    } while(i > 0 && canWrite)
    if(i > 0 && !canWrite){
      writeStream.once('drain', writing);
    }
  }
  writing();
}

stream.write(`questionID, productID, body, date, name, helpfulness, email, reported\n`, 'utf-8');

startWriting(stream, 'utf-8', () => {
  stream.end();
});