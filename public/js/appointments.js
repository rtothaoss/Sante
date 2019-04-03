$(function() {
  console.log("appointment.js is working");

  $.get("/api/appointments", function(data) {
    for (var i = 0; i < data.length; i++) {
      var createNewRow = $("<tr>");
      createNewRow.append("<td>" + data[i].name + "</td>");
      createNewRow.append("<td>" + data[i].reasonForVisit + "</td>");
      createNewRow.append("<td>" + data[i].DOB + "</td>");
      createNewRow.append("<td>" + data[i].phoneNumber + "</td>");
      createNewRow.append("<td>" + data[i].email + "</td>");

      $(".table").append(createNewRow);
    }
  });
  $("#submitbtn").on("click", function() {
    event.preventDefault();

    var apptRouteName = $("#patientNameInput")
      .val()
      .trim();

    apptRouteName = apptRouteName.replace(/\s+/g, "").toLowerCase();

    var apptName = $("#patientNameInput")
      .val()
      .trim();

    var apptDOB = $("#patientDOBInput")
      .val()
      .trim();

    var apptPhone = $("#patientPhoneInput")
      .val()
      .trim();

    var apptEmail = $("#patientEmailInput")
      .val()
      .trim();

    var apptReason = $("#paitentReasonInput")
      .val()
      .trim();

    var appointmentData = {
      routeName: apptRouteName,
      name: apptName,
      reasonForVisit: apptReason,
      isPresent: 0,
      DOB: apptDOB,
      phoneNumber: apptPhone,
      email: apptEmail
    };

    $.post("/api/appointments", appointmentData, function() {
      console.log("appointment added");
      location.reload();
    });
  });
});
