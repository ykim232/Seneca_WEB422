/*********************************************************************************
* WEB422 – Assignment 1
* I declare that this assignment is my own work in accordance with Seneca Academic Policy.
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
*
* Name: Yuli kim         Student ID: 160437174       Date: Jan 20, 2022
* Heroku Link: _______________________________________________________________
*
********************************************************************************/ 

const express = require("express");
const app = express();
const cors = require('cors');
const HTTP_PORT = process.env.PORT || 8080;

const RestaurantDB = require("./modules/restaurantDB.js");
const db = new RestaurantDB();

require("dotenv").config({ path : "variables.env"});

db.initialize("mongodb+srv://ykim2323:gusdn0649@web422yuli.mhhdx.mongodb.net/web422yuli?retryWrites=true&w=majority").then(()=>{
  app.listen(HTTP_PORT, ()=>{
  console.log(`server listening on: ${HTTP_PORT}`);
  });
 }).catch((err)=>{
  console.log(err);
 });

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json([{message: "API Listening"}]);
})

// ------------------------------------------------------------------------------------------

app.post("/api/restaurants", (req,res) => {
  db.addNewRestaurant(req.body)
  .then(() => {
          res.status(201).json(`new Restaurant successfully added`);
      })
      .catch((err) => {
          res.status(400).json(err);
      });
});


app.get("/api/restaurants", (req,res) => {
  db.getAllRestaurants(req.query.page, req.query.perPage, req.query.borough)
      .then((restaurants) => {
          res.status(200).json(restaurants);
      })
      .catch((err) => {
          res.status(400).json(err);
      });
});


app.get("/api/restaurants/:_id", (req,res) => {
  db.getRestaurantById(req.params._id)
      .then((restaurants) => {
          res.status(200).json(restaurants);
      })
      .catch((err) => {
          res.status(404).json(err);
      });
});


app.put("/api/restaurants/:_id", (req,res) => {
  db.updateRestaurantById(req.body, req.params._id)
      .then(() => {
          res.status(200).json(`Restaurant ${req.body._id} successfully updated`);
      })
      .catch((err) => {
          res.status(404).json(err);
      });
});

app.delete("/api/restaurants/:_id", (req,res) => {
  db.deleteRestaurantById(req.params._id)
      .then(() => {
          res.status(200).json(`Restaurant ${req.params._id} successfully deleted`);
      })
      .catch((err) => {
          res.status(404).json(err);
      });
});
