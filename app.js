const express = require("express");
const characters = require("./disney.json");
const app = express();

app.listen(3000);
app.use(express.json());

app.get("/characters", (req, res) => {
  const name = req.query.name;
  if (name) {
    const result = characters.filter((oneCharacter) => {
      return oneCharacter.name.includes(name);
    });
    return res.json(result);
  }

  res.json(characters);
});

app.get("/characters/:id", (req, res) => {
  const { _id } = req.params;
  const myUniqueCharacter = characters.find((character) => {
    return character._id === Number(_id);
  });
  if (myUniqueCharacter) {
    res.json(myUniqueCharacter);
  } else {
    res.json({ message: "No character found!" });
  }
});
app.post("/characters", (req, res) => {
  const { name, films } = req.body;

  const _id = characters.length + 1;
  const characterToCreate = {
    name,
    films,
    _id,
  };
  characters.push(characterToCreate);
  res.json(characterToCreate);
});
