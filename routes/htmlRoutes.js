var db = require("../models");

module.exports = function(app) {
  //LOGIN PAGE
  app.get("/", function(req, res) {
    res.render("login");
  });

  //OPFORM
  app.get("/opform", function(req, res) {
    if (req.session.loggedin) {
      res.render("opform");
    } else {
      res.render("login");
    }
  });
  //HOME PAGE
  app.get("/home", function(req, res) {
    if (req.session.loggedin) {
      res.render("home");
    } else {
      res.render("login");
    }
  });

  //patientDetails Page
  app.get("/patients", function(req, res) {
    if (req.session.loggedin) {
      res.render("patientDetails");
    } else {
      res.render("login");
    }
  });

  //appointments Page
  app.get("/appointments", function(req, res) {
    if (req.session.loggedin) {
      res.render("appointments");
    } else {
      res.render("login");
    }
  });

  //checkin Page
  app.get("/checkin", function(req, res) {
    db.Appointment.findAll({}).then(function(results) {
      res.render("checkin", results);
    });
  });

  //waitingRoom Page
  app.get("/waitingroom", function(req, res) {
    db.Appointment.findAll({
      where: {
        isPresent: true
      }
    }).then(function(results) {
      if (req.session.loggedin) {
        res.render("waitingRoom", results);
      } else {
        res.render("login");
      }
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
