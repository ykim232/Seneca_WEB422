/*********************************************************************************
* WEB422 – Assignment 1
* I declare that this assignment is my own work in accordance with Seneca Academic Policy.
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
*
* Name: Yuli kim         Student ID: 160437174       Date: Jan 20, 2022
* Heroku Link: https://web422-as-1.herokuapp.com/
*
********************************************************************************/

const express = require("express");
const app = express();
const cors = require('cors');
const BodyParser = require('body-parser');
const HTTP_PORT = process.env.PORT || 8080;

/* refer to other best student */
const { celebrate, Joi, errors, Segments } = require('celebrate');
app.use(BodyParser.json());


const RestaurantDB = require("./modules/restaurantDB.js");
const { path } = require("express/lib/application");
const db = new RestaurantDB();

require("dotenv").config({ path: "./config/config.env" });

db.initialize(`mongodb+srv://${process.env.dbUser}:${process.env.dbPass}@cluster0-apgkj.mongodb.net/${process.env.dbName}?retryWrites=true&w=majority`).then(() => {
  app.listen(HTTP_PORT, () => {
    console.log(`server listening on: ${HTTP_PORT}`);
  });
}).catch((err) => {
  console.log(err);
});

app.use(cors());
app.use(express.json());

// ------------------------------------------------------------------------------------------

app.post("/api/restaurants", celebrate({
  [Segments.QUERY]: Joi.object().keys({
    page: Joi.string().required(),
    perPage: Joi.number().required(),
    borough: Joi.string().required
  })
}),
  (req, res) => {
    db.addNewRestaurant(req.body)
      .then((restaurants) => {
        res.status(201).json(restaurants);
      })
      .catch((err) => {
        res.status(500).json(`Error has occured : ${err}`);
      });
  });

app.use((error, req, res, next) => {
  if (error.joi) {
    return res.status(400).json({
      error: error.joi.message
    });
  }
  return res.status(500).send(error)
})

app.get("/api/restaurants", (req, res) => {
  db.getAllRestaurants(req.query.page, req.query.perPage, req.query.borough)
    .then((restaurants) => {
      res.status(200).json(restaurants);
    })
    .catch((err) => {
      res.status(500).json(`Error has occured : ${err}`);
    });
});


app.get("/api/restaurants/:_id", (req, res) => {
  db.getRestaurantById(req.params._id)
    .then((restaurants) => {
      res.status(200).json(restaurants);
    })
    .catch((err) => {
      res.status(500).json(`Error has occured : ${err}`);
    });
});


app.put("/api/restaurants/:_id", (req, res) => {
  db.updateRestaurantById(req.body, req.params._id)
    .then(() => {
      res.status(200).json(`Restaurant ${req.body._id} successfully updated`);
    })
    .catch((err) => {
      res.status(500).json(`Error has occured : ${err}`);
    });
});

app.delete("/api/restaurants/:_id", (req, res) => {
  db.deleteRestaurantById(req.params._id)
    .then(() => {
      res.status(200).json(`Restaurant ${req.params._id} successfully deleted`);
    })
    .catch((err) => {
      res.status(500).json(`Error has occured : ${err}`);
    });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
})