const Menu = require("../models/menu.model.js");

// Create and Save a new Menu
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a Menu
  const menu = new Menu({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    restaurant_id: req.body.restaurant_id,
  });

  // Save Menu in the database
  console.log(menu);
  Menu.create(menu, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Menu.",
      });
    else res.send(data);
  });
};

// Retrieve all Menus from the database (with condition).
exports.findAll = (req, res) => {
  const name = req.query.name;

  Menu.getAll(name, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving menus.",
      });
    else res.send(data);
  });
};

// Find a single Menu by Id
exports.findOne = (req, res) => {
  Menu.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Menu with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Menu with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

// find all loc Menus
exports.findAllPublished = (req, res) => {
  Menu.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving menus.",
      });
    else res.send(data);
  });
};

// Update a Menu identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  console.log(req.body);

  Menu.updateById(req.params.id, new Menu(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Menu with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating Menu with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

// Delete a Menu with the specified id in the request
exports.delete = (req, res) => {
  Menu.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Menu with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete Menu with id " + req.params.id,
        });
      }
    } else res.send({ message: `Menu was deleted successfully!` });
  });
};

// Delete all Menus from the database.
exports.deleteAll = (req, res) => {
  Menu.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while removing all menus.",
      });
    else res.send({ message: `All Menus were deleted successfully!` });
  });
};
