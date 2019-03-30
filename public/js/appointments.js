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
});
