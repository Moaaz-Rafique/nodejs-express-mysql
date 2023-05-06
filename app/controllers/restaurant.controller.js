const Restaurant = require("../models/restaurant.model.js");

// Create and Save a new Restaurant
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Restaurant
  const restaurant = new Restaurant({
    name: req.body.name,
    city: req.body.city,
    loc: req.body.loc,    
    available_hours: req.body.available_hours,
    date:req.body.date,
    userID: req.body.userID,    
  });
  
  // Save Restaurant in the database
  console.log(restaurant);
  Restaurant.create(restaurant, (err, data) => {
    if (err)
    res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Restaurant."
      });
    else res.send(data);
  });
};

// Retrieve all Restaurants from the database (with condition).
exports.findAll = (req, res) => {
  const name = req.query.name;

  Restaurant.getAll(name, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving restaurants."
      });
    else res.send(data);
  });
};

// Find a single Restaurant by Id
exports.findOne = (req, res) => {
  Restaurant.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Restaurant with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Restaurant with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// find all loc Restaurants
exports.findAllPublished = (req, res) => {
  Restaurant.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving restaurants."
      });
    else res.send(data);
  });
};

// Update a Restaurant identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Restaurant.updateById(
    req.params.id,
    new Restaurant(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Restaurant with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Restaurant with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Restaurant with the specified id in the request
exports.delete = (req, res) => {
  Restaurant.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Restaurant with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Restaurant with id " + req.params.id
        });
      }
    } else res.send({ message: `Restaurant was deleted successfully!` });
  });
};

// Delete all Restaurants from the database.
exports.deleteAll = (req, res) => {
  Restaurant.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all restaurants."
      });
    else res.send({ message: `All Restaurants were deleted successfully!` });
  });
};
