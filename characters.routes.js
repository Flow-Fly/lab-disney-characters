const express = require("express");
const app = express.Router();

const disneyCharacters = require("./disney.json");

app.get("/characters", (request, response) => {
  const name = request.query.name;
  if (name) {
    const result = disneyCharacters.filter((oneCharacter) => {
      return oneCharacter.name.includes(name);
    });
  }
  return response.json(disneyCharacters);
});

app.get("/characters/:_id", (request, response) => {
  const { _id } = request.params;
  const myUniqueCharacter = disneyCharacters.find((character) => {
    return character._id === Number(_id);
  });
  if (myUniqueCharacter) {
    response.json(myUniqueCharacter);
  } else {
    response.json({ message: "No character found!" });
  }
});

app.post("/characters", (request, response) => {
  const { name, films } = request.body;

  const _id = disneyCharacters.length + 1;
  const characterToCreate = {
    name,
    films,
    _id,
  };
  disneyCharacters.push(characterToCreate);
  response.json(characterToCreate);
});

module.exports = app;
