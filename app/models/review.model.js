const sql = require("./db.js");

// constructor

// rating
// current date
// review
// loc
// menu------> rating, desc, price
// availability hours

const Review = function(rest) {
  this.rating = rest.rating;
  this.review = rest.review;
  this.restaurant_id = rest.restaurant_id
  this.userID = rest.userID;
};

Review.create = (newRest, result) => {
  console.log(newRest)
  sql.query("INSERT INTO reviews SET ?", newRest, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created review: ", { id: res.insertId, ...newRest });
    result(null, { id: res.insertId, ...newRest });
  });
};

Review.findById = (id, result) => {
  sql.query(`SELECT * FROM reviews WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found review: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Review with the id
    result({ kind: "not_found" }, null);
  });
};

Review.getAll = (rating, result) => {
  let query = "SELECT * FROM reviews";

  if (rating) {
    query += ` WHERE rating LIKE '%${rating}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("reviews: ", res);
    result(null, res);
  });
};

Review.getAllPublished = result => {
  sql.query("SELECT * FROM reviews WHERE loc=true", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("reviews: ", res);
    result(null, res);
  });
};

Review.updateById = (id, review, result) => {
  sql.query(
    "UPDATE reviews SET rating = ?, review = ?, loc = ?, restaurant_id = ?, userID = ? WHERE id = ?",
    [review.rating, review.review, review.restaurant_id, userID, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Review with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated review: ", { id: id, ...review });
      result(null, { id: id, ...review });
    }
  );
};

Review.remove = (id, result) => {
  sql.query("DELETE FROM reviews WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Review with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted review with id: ", id);
    result(null, res);
  });
};

Review.removeAll = result => {
  sql.query("DELETE FROM reviews", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} reviews`);
    result(null, res);
  });
};

module.exports = Review;
