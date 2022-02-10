'use strict';
const axios = require('axios');
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

// const mongoose = require('mongoose');
// const ex = require('./models/ex.js');
// const verifyUser = require('./authentication.js');
const PORT = process.env.PORT || 3002;

// mongoose.connect(process.env.MONGODB_URO, { userNewUrlParser: true, useUnifiedTopology: true })
//     .then(console.log('Mongoose is connected'));

app.get('/', (request, response) => {
    response.send('test request recieved')
})

app.get('/videogames', handleGetVideogames);
// app.get('/cars', handleGetCars);
// app.get('/sports', handleGetSports);

const TriviaModel = require('./models/ex.js');

const Data = { };

async function handleGetVideogames(request, response) {
    // try {
    //     let queryObj = {};
    //     if (request.query.email) {
    //         queryObj = { email: request.query.email }
    //     }
    //     let exFromDB = await ex.find(queryObj);

    //     if (exFromDB) {
    //         response.status(200).send(exFromDB);
    //     } else {
    //         response.status(404).send('trivia not found.');
    //     }

    try {
        const data = await axios.get('https://opentdb.com/api.php?amount=10&category=15&difficulty=easy');
        const item = new TriviaModel(data);
        // await item.save();
        response.status(200).json(item);
    } catch (error) {
        console.error(error);
        response.status(500).send('trivia not found.');
    }
}

app.listen(PORT, () => console.log(`listening on ${PORT}`));