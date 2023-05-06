module.exports = app => {
    const restaurants = require("../controllers/restaurant.controller.js");
  
    var router = require("express").Router();
  
    // Create a new restaurant
    router.post("/", restaurants.create);
  
    // Retrieve all restaurants
    router.get("/", restaurants.findAll);
  
  
    // Retrieve a single restaurant with id
    router.get("/:id", restaurants.findOne);
  
    // Update a restaurant with id
    router.put("/:id", restaurants.update);
  
    // Delete a restaurant with id
    router.delete("/:id", restaurants.delete);
  
    // Delete all restaurants
    router.delete("/", restaurants.deleteAll);
  
    app.use('/api/restaurants', router);
  };
  