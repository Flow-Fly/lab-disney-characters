/**
 *  Your code ⬇️
 */
const express = require("express");
const app = express();
const port = 3000;
const disney = require("./disney.json");
app.listen(3000);

// app.get("/characters", (req, res) => {
// res.json(disney);
// });

app.get("/characters", (request, response) => {
  console.log("Request query: ", request.query);
  const name = request.query.name;
  console.log("name", name);
  if (name) {
    const result = disney.filter((oneCharacter) => {
      return oneCharacter.name.includes(name);
    });
    return response.json({
      message: `Found ${result.length} character(s)`,
      result,
    });
  }

  response.json(disney);
});

app.get("/characters/:_id", (req, res) => {
  const { _id } = req.params;
  const myUniqueCharacter = disney.find((character) => {
    return character._id === Number(_id);
  });
  console.log(myUniqueCharacter);
  return res.json(myUniqueCharacter);
});

app.use(express.json());

app.post("/characters", (req, res) => {
  const { name, hobbies } = req.body;
  const _id = disney.at(-1)._id + 1;
  const characterToCreate = {
    name,
    hobbies,
    _id,
  };
  disney.push(characterToCreate);
  res.json({
    message: `New Character ${name}.`,
    createdCharacter: characterToCreate,
  });
});
