var db = require("../models");

module.exports = function(app) {
  //GET for appointment
  //GET for appointment
  app.get("/api/appointments", function(req, res) {
    db.Appointment.findAll({}).then(function(dbAppointment) {
      res.json(dbAppointment);
    });
  });

  //GET for appointment by ID
  //GET for appointment by ID
  app.get("/api/appointments/:id", function(req, res) {
    db.Appointment.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbAppointment) {
      res.json(dbAppointment);
    });
  });

  //POST for appointment
  //POST for appointment
  app.post("/api/appointments", function(req, res) {
    db.Appointment.create(req.body).then(function(dbAppointment) {
      res.json(dbAppointment);
    });
  });

  //PUT for isPresent on appointment
  app.post("/api/appointments/:routeName", function(req, res) {
    console.log(req.body);
    db.Appointment.update(req.body, {
      where: {
        routeName: req.params.routeName
      }
    }).then(function(dbAppointment) {
      res.json(dbAppointment);
    });
  });

  //GET for patient
  //GET for patient
  app.get("/api/patients", function(req, res) {
    db.Patient.findAll({}).then(function(dbPatient) {
      res.json(dbPatient);
    });
  });

  //GET for one patient
  //GET for one patient
  app.get("/api/patients/:id", function(req, res) {
    db.Patient.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbPatient) {
      res.json(dbPatient);
    });
  });

  //PUT for one patient
  //PUT for one patient
  app.put("/api/patients/:id", function(req, res) {
    db.Patient.update(req.body, {
      where: {
        id: req.params.id
      }
    }).then(function(dbPatient) {
      res.json(dbPatient);
    });
  });

  //POST for patientDetails
  //POST for patientDetails
  app.post("/api/patients", function(req, res) {
    db.Patient.create(req.body).then(function(dbPatient) {
      res.json(dbPatient);
    });
  });

  //GET for doctors
  //GET for doctors
  app.get("/api/doctors", function(req, res) {
    db.Doctor.findAll({}).then(function(dbDoctor) {
      res.json(dbDoctor);
    });
  });

  //POST for doctors
  //POST for doctors
  app.post("/api/doctors", function(req, res) {
    db.Doctor.create(req.body).then(function(dbPatient) {
      res.json(dbPatient);
    });
  });

  app.post("/auth", function(req, res) {
    db.Account.findAll({
      where: {
        username: req.body.username,
        password: req.body.password
      }
    }).then(function(results) {
      if (results.length > 0) {
        req.session.loggedin = true;
        res.redirect("/home");
        console.log(req.session.loggedin);
      } else {
        console.log(req.session);
        res.redirect("/");
      }
    });
  });

  app.get("/api/opform", function(req, res) {
    db.Postop.findAll({ include: [db.Patient] }).then(function(dbPostop) {
      res.json(dbPostop);
    });
  });

  app.get("/api/opform/:patientId", function(req, res) {
    console.log(req.params);
    db.Postop.findOne({
      include: [db.Patient],
      where: {
        patientId: req.params.patientId
      }
    }).then(function(dbPostop) {
      res.json(dbPostop);
    });
  });

  app.post("/api/opform/", function(req, res) {
    db.Postop.create(req.body).then(function(dbPostop) {
      res.json(dbPostop);
    });
  });
};
