const sql = require("./db.js");



const reservation = function(post) {
    this.code = post.code,
    this.nom = post.nom,
    this.prenom = post.prenom,
    this.email = post.email,
    this.telephone = post.telephone,
    this.idVol = post.idVol,
    this.nbrPlacesReserves = post.nbrPlacesReserves

  };

  //Show All 

  reservation.ShowReservations = result => {
    sql.query(`SELECT * FROM reservation`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("reservations: ", res);
      result(null, res);
    });
  };


  //Add Reservation
  reservation.AddReservation = (newReserv, result) => {
    sql.query("INSERT INTO reservation SET ?", newReserv, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created reservation: ", { id: res.insertId, ...newReserv });
      result(null, { id: res.insertId, ...newReserv });
    });
  };


  //Update Reservation
  reservation.updateById = (id, reserv, result) => {
    sql.query(
      "UPDATE reservation SET code=?, nom=?, prenom=?, email=?, telephone=?, nbrPlacesReserves=?  WHERE id = ?",
      [reserv.code, reserv.nom, reserv.prenom, reserv.email, reserv.telephone , reserv.nbrPlacesReserves, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found post with the id
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated post: ", { id: id, ...reserv });
        result(null, { id: id, ...reserv });
      }
    );
  };



  reservation.remove = (id, result) => {
    sql.query("DELETE FROM reservation WHERE id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found post with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted Reservation with id: ", id);
      result(null, res);
    });
  };


  module.exports = reservation;

  
