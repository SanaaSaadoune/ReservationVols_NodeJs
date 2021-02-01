const sql = require("./db.js");

const Vol = function(post) {
    this.villeDepart = post.villeDepart,
    this.villeArrivee = post.villeArrivee,
    this.dateDepart = post.dateDepart,
    this.dateArrivee = post.dateArrivee,
    this.heureDepart = post.heureDepart,
    this.heureArrivee = post.heureArrivee,
    this.nbrPlaces = post.nbrPlaces,
    this.escale = post.escale

  };

  //Show All 

  Vol.ShowVols = result => {
    sql.query(`SELECT * FROM vol`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("vols: ", res);
      result(null, res);
    });
  };
//show vol
  Vol.ShowVol = (id,result) => {
    sql.query(`SELECT * FROM vol WHERE id='${id}'`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("vol: ", res);
      result(null, res);
    });
  };


  //Add Vol
  Vol.Add = (newVol, result) => {
    sql.query("INSERT INTO vol SET ?", newVol, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created post: ", { id: res.insertId, ...newVol });
      result(null, { id: res.insertId, ...newVol });
    });
  };


  //Update Vol
  Vol.updateById = (id, vol, result) => {
    sql.query(
      "UPDATE vol SET villeDepart=?, villeArrivee=? , dateDepart=?, dateArrivee = ?, heureDepart = ?, heureArrivee = ?, nbrPlaces = ?, escale = ? WHERE id = ?",
      [vol.villeDepart, vol.villeArrivee, vol.dateDepart, vol.dateArrivee, vol.heureDepart, vol.heureArrivee, vol.nbrPlaces, vol.escale, id],
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
  
        console.log("updated post: ", { id: id, ...vol });
        result(null, { id: id, ...vol });
      }
    );
  };



  //search for Vol
  Vol.Search = (vol, result) => {
    sql.query(
      "SELECT * FROM vol WHERE villeDepart=? AND villeArrivee=? AND dateDepart=?",
      [vol.villeDepart, vol.villeArrivee, vol.dateDepart],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        console.log("vols: ", res);
         result(null, res);
      }
    );
  };



//delete vol
  Vol.remove = (id, result) => {
    sql.query("DELETE FROM vol WHERE id = ?", id, (err, res) => {
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
  
      console.log("deleted post with id: ", id);
      result(null, res);
    });
  };


  module.exports = Vol;

  
