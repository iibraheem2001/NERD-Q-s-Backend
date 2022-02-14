'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

const mongoose = require('mongoose');
const ex = require('./models/ex.js');
const verifyUser = require('./authentication.js');
const PORT = process.env.PORT || 3002;

mongoose.connect(process.env.MONGODB_URO, { userNewUrlParser: true, useUnifiedTopology: true })
    .then(console.log('Mongoose is connected'));

app.get('/', (request, response) => {
    response.send('test request recieved')
})

app.get('/videogames', handleGetVideogames);
app.get('/cars', handleGetCars);
app.get('/sports', handleGetSports);
app.get('/user', handleGetUser);

async function handleGetVideogames(request, response) {
    try {
        let queryObj = {};
        if (request.query.email) {
            queryObj = { email: request.query.email }
        }
        let exFromDB = await ex.find(queryObj);

        if (exFromDB) {
            response.status(200).send(exFromDB);
        } else {
            response.status(404).send('trivia not found.');
        }
    } catch (error) {
        console.error(error);
        response.status(500).send('Server error.');
    }
}

function handleGetUser(req, res) {
    // verifyUser is defined in the auth.js
    verifyUser(req, (err, user) => {
      // "error-first" function
      if (err) {
        // if there is a problem verifying you
        res.send('invalid token');
      } else {
        // if there is not a problem verifying you
        res.send(user);
      }
    })
  }

app.listen(PORT, () => console.log(`listening on ${PORT}`));