const express = require('express')
const characters = require('./disney.json')
const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  const { name, film } = req.query
  let result = [...characters]
  if (film) {
    result = result.filter((character) =>
      character.films.some((movie) => {
        return movie.toLowerCase().includes(film.toLowerCase())
      })
    )
  }
  if (name) {
    result = result.filter((character) =>
      character.name.toLowerCase().includes(name.toLowerCase())
    )
  }
  res.json(result)
})

app.post('/', (req, res) => {
  const { name, films } = req.body
  const id = characters.at(-1)._id + 1
  const characterToCreate = { name, films, _id: id }
  characters.push(characterToCreate)
  res.json({ message: `${name} created`, characterToCreate })
})

app.listen(3000, () => {
  console.log(`Server running on http://localhost:3000`)
})
