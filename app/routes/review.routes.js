module.exports = app => {
    const review = require("../controllers/review.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", review.create);
  
    // Retrieve all Tutorials
    router.get("/", review.findAll);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", review.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", review.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", review.delete);
  
    // Delete all Tutorials
    router.delete("/", review.deleteAll);
  
    app.use('/api/reviews', router);
  };
  