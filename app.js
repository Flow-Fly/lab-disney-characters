/**
 *  Your code ⬇️
 */

function checkForSubstring(src, toFind){
  return (src.includes(toFind));
}

// iteration 1
const express = require('express');
const app = express();

const characters = require('./disney.json');

app.listen(3000);

app.get('/', (request, response) => {
  response.send('Hello!');
});


// iteration 2 + bonus
app.get('/characters', (request, response) => {
  let result = [... characters];
  const { name, film } = request.query;

  if (film)
    result = result.filter(character => character.films.some(elem => checkForSubstring(elem, film)));
  if (name)
    result = result.filter(character => checkForSubstring(character.name, name));
  response.json(result);
});

// iteration 3
app.get('/characters/:_id', (request, response) => {
  if (request.params._id){
    const routeResult = characters.find(character => {
      return (character._id === Number(request.params._id));
    });
    response.json(routeResult);
  }
  else
    response.json({ message: 'No character found!' });
});

// iteration 4
app.use(express.json());
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/characters', (request, response) => {
  const { name, films } = request.body;
  const lastId = characters.slice(-1)[0]._id;
  const _id = lastId + 1;

  if (name && films){
    const characterToCreate = { name, films, _id };
    characters.push(characterToCreate);
    response.json({message: `${name} created.`, characterToCreate });
  }
});

