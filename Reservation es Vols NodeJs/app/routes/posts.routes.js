const express = require("express");

module.exports = app => {
  const vols = require("../controllers/volcontroller.js");
  const reserv = require("../controllers/reservationcontroller.js")

  app.get("/addvol", vols.voladd);
  app.post("/addvol", vols.AddVol);
  
  app.get("/admin", vols.ShowVols);
  app.post("/searchvols", vols.Search);

  app.get("/updatevol/:volId", vols.updatepage)
  app.post("/updatevol", vols.update);
  app.get("/deletevol/:volId", vols.delete);

  app.get('/', vols.home);
  app.get("/addreservs/:volId&:nbr", reserv.reservation);

  app.get("/reservs", reserv.ShowReservations);
  app.post("/addreservs", reserv.AddReservation);
  app.put("/updatereserv/:volId", reserv.update);
  app.delete("/deletereserv/:volId", reserv.delete);

  app.get("/testmail", reserv.testemail);
};
