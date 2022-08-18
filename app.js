/**
 *  Your code ⬇️
 */
const express = require("express");
const app = express();
const jsonData = require("./disney.json");
const port = 3000;

app.listen(3000, () => console.log("i'm listening http://localhost:3000"));

app.get("/characters", (req, res) => {
  const name = req.query.name;
  if (name) {
    const charactersNames = jsonData.filter((element) => {
      return element.name.includes(name);
    });
    return res.json({
      message: `Found ${charactersNames.length} character(s)`,
      charactersNames,
    });
  }
  res.json(jsonData);
});

app.get("/characters/:_id", (req, res) => {
  const id = req.params._id;
  console.log(id);
  const charactersById = jsonData.find((character) => {
    return character._id === parseInt(id);
  });
  return res.json({
    charactersById,
  });
});

app.use(express.json());

app.post("/characters", (req, res) => {
  const name = req.body.name;
  const films = req.body.films;
  const _id = jsonData.at(-1)._id + 1;
  const newCharacter = {
    name,
    films,
    _id,
  };
  jsonData.push(newCharacter);
  return res.json({
    message: "character created",
    characterToCreate: newCharacter,
  });
});
