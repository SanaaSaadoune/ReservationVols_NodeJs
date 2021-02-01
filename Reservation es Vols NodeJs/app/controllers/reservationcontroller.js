const reservation = require("../models/reservationmodel.js");
const Vol = require("../models/volmodel.js");

const nodemailer = require("nodemailer");
const fs = require('fs')
const path = require('path')

exports.testemail = async (req,res) =>{
  
}

exports.AddReservation = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a reservation
  const reservationPost = new reservation({
    code : 123,
    nom : req.body.nom,
    prenom : req.body.prenom,
    email : req.body.email,
    telephone : req.body.telephone,
    idVol : req.body.idVol,
    nbrPlacesReserves : req.body.nbrPlacesReserves
    
  });

  

  // Save Vol in the database
  reservation.AddReservation(reservationPost, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Post."
      });
    else{
      Vol.ShowVol( reservationPost.idVol,
        (err, data) =>{
          if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving posts."
      });
      
    async function main() {
  
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: "voliniinfos@gmail.com", // generated ethereal user
          pass: "volini123", // generated ethereal password
        },
      });
   // send mail with defined transport object
      let info = await transporter.sendMail({
        from: '"Volini 👻" <voliniinfos@gmail.com>', // sender address
        to: reservationPost.email, // list of receivers
        subject: "Confirmation de reservation !", // Subject line
        text: "Reserved !", // plain text body
        html: "Bonjour <b> "+reservationPost.nom + " "+reservationPost.prenom +" </b><br><p>Voici les informations de votre reservation :<br>villeDepart : "+data[0].villeDepart+"<br>villeArrivee : "+data[0].villeArrivee+"<br>dateDepart : "+data[0].dateDepart+"<br>dateArrivee : "+data[0].dateArrivee+"<br>heureDepart : "+data[0].heureDepart+"<br>heureArrivee : "+data[0].heureArrivee+"<br>nbrPlaces : "+data[0].nbrPlaces+"<br>escale : "+data[0].escale+" </p>", // html body
      });
      console.log("Message sent: %s", info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
       // Preview only available when sending through an Ethereal account
      console.log("Preview URL: %s", "test");
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
          }
          main();
          
        
    });


      
        const pathing = path.join(__dirname, "./infos.txt")

        fs.appendFileSync(pathing, JSON.stringify(reservationPost)+"\n", "UTF-8", {flags: "a+"});

        res.writeHead(301,
          {Location: 'http://paypal.com/'}
          );
        res.end();
    } 
  });
 
};

//show All Vols in DB
exports.ShowReservations = (req, res) => {
  reservation.ShowReservations((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving posts."
      });
    else res.send(data);
  });
};

exports.reservation = (req, res) => {
  var nbrPlaces = req.params.nbr;
  var idVol = req.params.volId
  res.render('Reservation', {
    nbrPlaces: nbrPlaces,
    idVol: idVol
  });
}

// Update a Post identified by the VolId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  reservation.updateById(
    req.params.volId,
    new reservation(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Reservarion with id ${req.params.volId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Reservarion with id " + req.params.volId
          });
        }
      } else res.send(data);
    }
  );
};



// Delete a reservation with the specified volId in the request
exports.delete = (req, res) => {
  reservation.remove(req.params.volId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Reservation with id ${req.params.volId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Reservation with id " + req.params.volId
        });
      }
    } else res.send({ message: `Reservation was deleted successfully!` });
  });
};

