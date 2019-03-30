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
});
