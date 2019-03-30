$(function() {
  console.log("patientDetails.js is working");

  $.get("/api/patients", function(data) {
    var rowsToAdd = [];
    for (var i = 0; i < data.length; i++) {
      rowsToAdd.push(createPatient(data[i]));
    }
    console.log(rowsToAdd);
    $("#patient").append(rowsToAdd);

    function createPatient(patient) {
      var listOption = $("<option>");
      listOption.attr("value", patient.id);
      listOption.text(patient.name);
      return listOption;
    }
  });

  var patientID;

  $("#patientBtn").on("click", function() {
    event.preventDefault();
    $(".patientStuff").empty();

    patientID = $("#patient").val();

    $.get("/api/patients/" + patientID, function(data) {
      console.log(data);
      var patientDetailsDiv = $("<div>");
      patientDetailsDiv.addClass("patientDetailsDiv");
      patientDetailsDiv.append("Patient Name: " + data.name + "<br>");
      patientDetailsDiv.append("Date of Birth: " + data.DOB + "<br>");
      patientDetailsDiv.append(
        "Emergency Contact: " + data.emergencyContact + "<br>"
      );
      patientDetailsDiv.append("Allergies: " + data.allergies + "<br>");
      $(".patientStuff").append(patientDetailsDiv);
    });
  });

  $("#historyBtn").on("click", function() {
    event.preventDefault();
    $(".patientStuff").empty();

    patientID = $("#patient").val();

    $.get("/api/patients/" + patientID, function(data) {
      console.log(data);
      var patientHistoryDiv = $("<div>");
      patientHistoryDiv.append("Patient History: " + data.history);
      $(".patientStuff").append(patientHistoryDiv);
    });
  });
});
