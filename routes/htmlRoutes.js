var db = require("../models");

module.exports = function(app) {
  app.get("/", function(req, res) {
    db.Account.findAll({}).then(function(results) {
      res.render("login", results);
    });
  });

  app.get("/home", function(req, res) {
    db.Appointment.findAll({}).then(function(results) {
      if (req.session.loggedin) {
        res.render("home", results);
      } else {
        res.render("login");
      }
    });
  });

  //patientDetails Page
  app.get("/patients", function(req, res) {
    db.Patient.findAll({}).then(function(results) {
      if (req.session.loggedin) {
        res.render("patientDetails", results);
      } else {
        res.render("login");
      }
    });
  });

  //appointments Page
  app.get("/appointments", function(req, res) {
    db.Appointment.findAll({}).then(function(results) {
      if (req.session.loggedin) {
        res.render("appointments", results);
      } else {
        res.render("login");
      }
    });
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
