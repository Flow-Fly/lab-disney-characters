import express from "express";
import disney from "./disney.json" assert { type: "json" };

const app = express();
const port = 3000;
app.use(express.json());

app.post("/characters", (req, res) => {
  let [{ name, films, _id }] = req.body;
  _id = disney.length + 1;

  let newCharacter = { name, films, _id };
  disney.push(newCharacter);
  res.json(newCharacter);
});

app.get("/characters/:_id", (req, res) => {
  const { _id } = req.params;
  const matchResult = disney.find((ele) => {
    return ele._id === parseInt(_id);
  });
  if (matchResult) {
    res.json(matchResult);
  } else {
    res.json({ message: "No character found!" });
  }
});

app.get("/characters", (req, res) => {
  let result = [];
  const { name } = req.query;
  const { films } = req.query;

  if (name) {
    result.push(
      disney.filter((ele) => {
        return ele.name.includes(name);
      })
    );
  }

  if (films) {
    result.push(
      disney.filter((ele) => {
        return ele.films.includes(films);
      })
    );
  }

  res.json(result)
});

app.listen(port);
