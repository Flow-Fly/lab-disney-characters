// First i am declaring that i am using express
// then I declare the port I am using
// Then I store into a variable the data contained in disney.json
// I declare that the value of my app is equal to a function express

const express = require("express")
let app = express()
const port = 3000
const characters = require("./disney.json")

app.listen(3000)

app.use(express.json())

// créer variable server et app

// this server called app listen to the port 3000
// wehen i request in url characters that will "res" the file character

// app.get('/characters', (req, res) => {

//     res.json(characters);

// });

app.get('/characters', (request, response) => {
    let result = [...characters]
    const name = request.query.name
    const film = request.query.films
    if (film) {
        /**
         * A character can be in multiple movies, we will want to filter the characters
         * based on the fact that the film variable (the film name) is included in atleast some
         * of the films of a character.
         */
        result = result.filter((oneCharacter) => {
            return oneCharacter.films.some(filmName => filmName.includes(film))
        })
    }
    if (name) {
        result = result.filter((oneCharacter) => {
            return oneCharacter.name.includes(name)
        })
    }
    response.json(result)


})


app.get('/characters/:_id', (req, res) => {
    const {
        _id
    } = req.params
    const myUniqueCharacter = characters.find((character) => {
        return character._id === Number(_id)
    })
    console.log(myUniqueCharacter)
    return res.json(myUniqueCharacter)
})

app.post('/characters', (req, res) => {
    // res.json(req.body)
    // const name = req.body.name
    // const hobbies = req.body.hobbies
    /**
     * The name of your variable must match a key inside of the request body
     */
    const {
        name,
        hobbies
    } = req.body

    const _id = characters.length + 1
    // const characterToCreate = {
    //   name: name,
    //   hobbies: hobbies,
    //   _id: _id,
    // }
    const characterToCreate = {
        name,
        hobbies,
        _id,
    }
    characters.push(characterToCreate)
    res.json({
        message: `You created ${name} ! Good job.`,
        createdCharacter: characterToCreate,
    })
})