const Review = require("../models/review.model.js");

// Create and Save a new Review
exports.create = (req, res) => {
  // Validate request

  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  // console.log("mzLog",req)
  // Create a Review
  const review = new Review({
    rating: req.body.rating,
    review: req.body.review,    
    restaurant_id: req.body.restaurant_id,
    userID: req.body.userID,
  });

  // Save Review in the database
  Review.create(review, (err, data) => {
    if (err)
      res.status(500).send({
        error:err,
        message:
          err.message || "Some error occurred while creating the Review."
      });
    else res.send(data);
  });
};

// Retrieve all Reviews from the database (with condition).
exports.findAll = (req, res) => {
  const name = req.query.name;

  Review.getAll(name, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving reviews."
      });
    else res.send(data);
  });
};

// Find a single Review by Id
exports.findOne = (req, res) => {
  Review.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Review with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Review with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// find all password Reviews
exports.findAllPublished = (req, res) => {
  Review.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving reviews."
      });
    else res.send(data);
  });
};

// Update a Review identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Review.updateById(
    req.params.id,
    new Review(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Review with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Review with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Review with the specified id in the request
exports.delete = (req, res) => {
  Review.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Review with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Review with id " + req.params.id
        });
      }
    } else res.send({ message: `Review was deleted successfully!` });
  });
};

// Delete all Reviews from the database.
exports.deleteAll = (req, res) => {
  Review.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all reviews."
      });
    else res.send({ message: `All Reviews were deleted successfully!` });
  });
};
