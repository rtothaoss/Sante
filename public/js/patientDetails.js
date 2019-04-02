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
  //PATIENT DETAILS BUTTON
  //PATIENT DETAILS BUTTON
  $("#patientBtn").on("click", function() {
    event.preventDefault();
    $(".patientStuff").empty();
    $(".newPatientForm").addClass("hidden");

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

  //PATIENT HISTORY BUTTON
  //PATIENT HISTORY BUTTON
  $("#historyBtn").on("click", function() {
    event.preventDefault();
    $(".patientStuff").empty();
    $(".newPatientForm").addClass("hidden");

    patientID = $("#patient").val();

    $.get("/api/patients/" + patientID, function(data) {
      var updatedAt = data.updatedAt;
      var regex = /(\d{4}-\d{2}-\d{1,2}).*/;
      var newUpdatedAt = updatedAt.match(regex);

      var patientHistoryDiv = $("<div>");
      patientHistoryDiv.append(newUpdatedAt[1] + "<br>");
      patientHistoryDiv.append(
        "<b>" + "Patient History: " + "</b>" + data.history
      );
      $(".patientStuff").append(patientHistoryDiv);
    });
  });

  //PATIENT NOTES BUTTON
  //PATIENT NOTES BUTTON

  $("#patientNotesBtn").on("click", function() {
    patientID = $("#patient").val();
    $(".patientStuff").empty();
    $(".newPatientForm").addClass("hidden");
    getPatientNotes();

    function getPatientNotes() {
      $.get("/api/patients/" + patientID, function(data) {
        if (!data.doctorNotes) {
          $(".newNotesForm").removeClass("hidden");

          $("#patientNotesSubmitBtn").on("click", function() {
            event.preventDefault();
            var doctorNotes = $("#doctorNotesText")
              .val()
              .trim();

            var newNotes = {
              doctorNotes: doctorNotes
            };

            $.ajax({
              method: "PUT",
              url: "/api/patients/" + patientID,
              data: newNotes
            }).then(function() {
              console.log("updated notes");
              $(".newNotesForm").addClass("hidden");
              getPatientNotes();
            });
          });
        } else {
          var updatedAt = data.updatedAt;
          var regex = /(\d{4}-\d{2}-\d{1,2}).*/;
          var newUpdatedAt = updatedAt.match(regex);

          var patientNotesDiv = $("<div>");
          patientNotesDiv.append(newUpdatedAt[1] + "<br>");
          patientNotesDiv.append("<b>" + "Notes: " + "</b>" + data.doctorNotes);
          $(".patientStuff").append(patientNotesDiv);
        }
      });
    }
  });

  //OP FORM BUTTON
  //OP FORM BUTTON

  $("#opFormBtn").on("click", function() {
    patientID = $("#patient").val();
    $(".patientStuff").empty();
    $(".newPatientForm").addClass("hidden");

    $.get("/api/opform/" + patientID, function(data) {
      console.log(data);
      if (!data) {
        console.log(patientID);
        window.location.href = "/opform/?patientID=" + patientID;
      } else {
        var patientOpFormDiv = $("<div>");
        patientOpFormDiv.append("Name: " + data.Patient.name + "<br>");
        patientOpFormDiv.append("PatientID: " + data.PatientId + "<br>");
        patientOpFormDiv.append("Date of Birth: " + data.Patient.DOB + "<br>");
        patientOpFormDiv.append(
          "Date of Service: " + data.DateOfService + "<br>"
        );
        patientOpFormDiv.append("Surgeon Name: " + data.SurgeonName + "<br>");
        patientOpFormDiv.append(
          "Pre-Operative Diagnosis: " + data.PreOpDiag + "<br>"
        );
        patientOpFormDiv.append(
          "Post-Operative Diagnosis: " + data.PostOpDiag + "<br>"
        );
        patientOpFormDiv.append("Operation: " + data.Operation + "<br>");
        patientOpFormDiv.append(
          "Findings of the Operation: " + data.Findings + "<br>"
        );
        $(".patientStuff").append(patientOpFormDiv);
      }
    });
  });

  //NEW PATIENT BUTTON
  //NEW PATIENT BUTTON

  $("#newPatientBtn").on("click", function() {
    $(".patientStuff").empty();
    $(".newPatientForm").removeClass("hidden");
    event.preventDefault();

    $("#patientSubmitBtn").on("click", function() {
      event.preventDefault();

      var newName = $("#newPatientName")
        .val()
        .trim();

      var dob = $("#newPatientDOB")
        .val()
        .trim();

      var allergies = $("#newPatientAllergies")
        .val()
        .trim();

      var emergencyContact = $("#newPatientEmergency")
        .val()
        .trim();

      var picture = $("#newPatientPicture")
        .val()
        .trim();

      var doctorNotes = $("#newPatientNotes")
        .val()
        .trim();

      var history = $("#newPatientHistory")
        .val()
        .trim();

      console.log(newName);
      console.log(dob);

      var newPatientData = {
        name: newName,
        DOB: dob,
        allergies: allergies,
        history: history,
        doctorNotes: doctorNotes,
        emergencyContact: emergencyContact,
        pictureURL: picture
      };

      $.post("/api/patients", newPatientData, function() {
        console.log("new patient added");
        Swal.fire({
          type: "success",
          text: "Added New Patient!"
        }).then(function() {
          location.reload();
        });
      });
    });
  });
});
