const sql = require("./db.js");

// constructor

// name
// current date
// description
// price
// menu------> name, desc, price
// availability hours

const Menu = function(rest) {
  this.name = rest.name;
  this.description = rest.description;
  this.price = rest.price;  
  this.restaurant_id = rest.restaurant_id;
};

Menu.create = (newRest, result) => {
  console.log(newRest)
  sql.query("INSERT INTO menus SET ?", newRest, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created menu: ", { id: res.insertId, ...newRest });
    result(null, { id: res.insertId, ...newRest });
  });
};

Menu.findById = (id, result) => {
  sql.query(`SELECT * FROM menus WHERE restaurant_id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found menu: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Menu with the id
    result({ kind: "not_found" }, null);
  });
};

Menu.getAll = (name, result) => {
  let query = `SELECT * FROM  menus`;

  if (name) {
    query += ` WHERE name LIKE '%${name}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("menus: ", res);
    result(null, res);
  });
};

Menu.getAllPublished = result => {
  sql.query("SELECT * FROM menus WHERE price=true", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("menus: ", res);
    result(null, res);
  });
};

Menu.updateById = (id, menu, result) => {
  // console.log("kill me now: ");

  sql.query(
    "UPDATE menus SET name = ?, description = ?, price = ? restaurant_id = ? WHERE id = ? ",
    [menu.name, menu.description, menu.price,menu.available_hours,menu.date, menu.restaurant_id, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        err
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Menu with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated menu: ", { id: id, ...menu });
      result(null, { id: id, ...menu });
    }
  );
};

Menu.remove = (id, result) => {
  sql.query("DELETE FROM menus WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Menu with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted menu with id: ", id);
    result(null, res);
  });
};

Menu.removeAll = result => {
  sql.query("DELETE FROM menus", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} menus`);
    result(null, res);
  });
};

module.exports = Menu;
