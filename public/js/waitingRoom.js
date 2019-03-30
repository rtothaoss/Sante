$(function() {
  console.log("waitingRoom.js is working");

  $.get("api/appointments", function(data) {
    for (var i = 0; i < data.length; i++) {
      if (data[i].isPresent === true) {
        // var wellSection = $("<div>");

        // wellSection.append("<h2>" + "Patient Name: " + data[i].name + "</h2>");
        // wellSection.append(
        //   "<h4>" + "Reason for Visit: " + data[i].reasonForVisit
        // ) + "</h4>";
        // wellSection.append("----------------------------");

        // $("#well-section").append(wellSection);

        var createNewRow = $("<tr>");

        createNewRow.append("<td>" + data[i].name + "</td>");
        createNewRow.append("<td>" + data[i].reasonForVisit + "</td>");

        // deleteButton.attr('id', 'delete-button')

        $(".table").append(createNewRow);
      }
    }
  });
});
