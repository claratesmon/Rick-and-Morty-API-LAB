const mongoose = require('mongoose')
require('dotenv').config()

MONGODB_URI = process.env.MONGODB_URI

mongoose.connect(MONGODB_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.log(error))

const characters = require("./Character.model")


async function getCharacters() {
    try {
        const response = await fetch("https://rickandmortyapi.com/api/character")
        const jsonResponse = await response.json()
        //console.log(jsonResponse)
        //Clean the data/response received
        const cleanedArray = [];
        ///The array of characters is inside an array called results
        const newArray = await jsonResponse.results.forEach(character => {
            const { name, image } = character;
            //This the same as:
            //const name = character.name
            //const image = character.image
            const newObject = { name, imageUrl: image }
            /// same as {name: name, imageUrl: image}
            cleanedArray.push(newObject)
            console.log(cleanedArray)
        });

        await characters.insertMany(cleanedArray)
        console.log("Characters inserted")

        /* const arrayIsClean = jsonResponse.results.map((character) => {
            return character.name, character.image
        }) */


    } catch (error) {
        console.log(error)
    }
}

getCharacters()


