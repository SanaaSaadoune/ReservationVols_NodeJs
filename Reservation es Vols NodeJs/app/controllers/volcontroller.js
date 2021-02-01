const Vol = require("../models/volmodel.js");

exports.AddVol = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Vol
  const volPost = new Vol({
    villeDepart : req.body.villeDepart,
    villeArrivee : req.body.villeArrivee,
    dateDepart : req.body.dateDepart,
    dateArrivee : req.body.dateArrivee,
    heureDepart : req.body.heureDepart,
    heureArrivee : req.body.heureArrivee,
    nbrPlaces : req.body.nbrPlaces,
    escale : req.body.escale,
  });

  // Save Vol in the database
  Vol.Add(volPost, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Post."
      });
   else res.redirect('/admin');

  });
 
};

//show All Vols in DB
exports.ShowVols = (req, res) => {
  Vol.ShowVols((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving posts."
      });
    else {
      let info={
        data:data
      }
      res.render('Dashboard',info);
    }
  });
};


// Update a Vol identified by the VolId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // console.log(req.body);

  Vol.updateById(
    req.body.id,
    new Vol(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Vol with id ${req.params.volId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Vol with id " + req.params.volId
          });
        }
      } else res.redirect('/admin');
    }
  );
};

exports.home = (req, res) => {
  res.render('Home');
}

exports.voladd = (req, res) => {
  res.render('Ajout_vol');
}

exports.updatepage = (req, res) => {
  Vol.ShowVol(req.params.volId,(err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving posts."
      });
    else {
      let info={
        data:data
      }
      res.render('Modif_vol',info);
    }
  });
  
}

// search for a vol
exports.Search = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Vol.Search(
    req.body,
    (err, data) => {
      if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving posts."
      });
      
    else res.send(data);
    // else{
    //   volssearched = {
    //       vs : data
    //   }
    //  res.render('index', volssearched)
    // }
    }
  );
};

// Delete a Vol with the specified volId in the request
exports.delete = (req, res) => {
  Vol.remove(req.params.volId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Vol with id ${req.params.volId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Vol with id " + req.params.volId
        });
      }
    } else res.redirect('/admin')
  });
};

