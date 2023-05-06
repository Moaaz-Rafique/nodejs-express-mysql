const sql = require("./db.js");

// constructor

// name
// current date
// city
// loc
// menu------> name, desc, price
// availability hours

const Restaurant = function(rest) {
  this.name = rest.name;
  this.city = rest.city;
  this.loc = rest.loc;
  this.available_hours=JSON.stringify(rest.available_hours);
  this.date = rest.date
  this.userID = rest.userID;
};

Restaurant.create = (newRest, result) => {
  console.log(newRest)
  sql.query("INSERT INTO restaurants SET ?", newRest, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created restaurant: ", { id: res.insertId, ...newRest });
    result(null, { id: res.insertId, ...newRest });
  });
};

Restaurant.findById = (id, result) => {
  sql.query(`SELECT * FROM restaurants WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found restaurant: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Restaurant with the id
    result({ kind: "not_found" }, null);
  });
};

Restaurant.getAll = (name, result) => {
  let query = "SELECT * FROM restaurants";

  if (name) {
    query += ` WHERE name LIKE '%${name}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("restaurants: ", res);
    result(null, res);
  });
};

Restaurant.getAllPublished = result => {
  sql.query("SELECT * FROM restaurants WHERE loc=true", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("restaurants: ", res);
    result(null, res);
  });
};

Restaurant.updateById = (id, restaurant, result) => {
  sql.query(
    "UPDATE restaurants SET name = ?, city = ?, loc = ?, avialable_hours = ?, date = ?, userID = ? WHERE id = ?",
    [restaurant.name, restaurant.city, restaurant.loc,restaurant.available_hours, userID, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Restaurant with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated restaurant: ", { id: id, ...restaurant });
      result(null, { id: id, ...restaurant });
    }
  );
};

Restaurant.remove = (id, result) => {
  sql.query("DELETE FROM restaurants WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Restaurant with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted restaurant with id: ", id);
    result(null, res);
  });
};

Restaurant.removeAll = result => {
  sql.query("DELETE FROM restaurants", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} restaurants`);
    result(null, res);
  });
};

module.exports = Restaurant;
