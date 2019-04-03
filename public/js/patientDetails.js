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
    $(".newNotesForm").addClass("hidden");
    $(".newHistoryForm").addClass("hidden");

    patientID = $("#patient").val();

    $.get("/api/patients/" + patientID, function(data) {
      console.log(data);

      var patientDetailsDiv = $("<div>");
      patientDetailsDiv.addClass("patientDetailsDiv");
      patientDetailsDiv.append(
        "<b>" + "Patient Name: " + "</b>" + data.name + "<br>"
      );
      patientDetailsDiv.append(
        "<b>" + "Date of Birth: " + "</b>" + data.DOB + "<br>"
      );
      patientDetailsDiv.append(
        "<b>" + "Emergency Contact: " + "</b>" + data.emergencyContact + "<br>"
      );
      patientDetailsDiv.append(
        "<b>" + "Allergies: " + "</b>" + data.allergies + "<br>"
      );
      $(".patientStuff").append(patientDetailsDiv);
    });
  });

  //PATIENT HISTORY BUTTON
  //PATIENT HISTORY BUTTON
  $("#historyBtn").on("click", function() {
    event.preventDefault();
    $(".patientStuff").empty();
    $(".newPatientForm").addClass("hidden");
    $(".newNotesForm").addClass("hidden");

    patientID = $("#patient").val();
    getPatientHistory();

    function getPatientHistory() {
      $.get("/api/patientHistory/" + patientID, function(data) {
        console.log(data);
        $(".patientStuff").empty();
        for (var i = 0; i < data.length; i++) {
          var updatedAt = data[i].updatedAt;
          var regex = /(\d{4}-\d{2}-\d{1,2}).*/;
          var newUpdatedAt = updatedAt.match(regex);

          var patientHistoryDiv = $("<div>");
          patientHistoryDiv.append(newUpdatedAt[1] + "<br>");
          patientHistoryDiv.append(
            "<b>" + "History: " + "</b>" + data[i].history
          );
          $(".patientStuff").append(patientHistoryDiv);
        }
        // if (!data.history) {
        $(".newHistoryForm").removeClass("hidden");

        $("#patientHistorySubmitBtn").on("click", function() {
          event.preventDefault();
          var history = $("#patientHistoryText")
            .val()
            .trim();

          var newHistory = {
            history: history,
            patientId: patientID
          };

          $.ajax({
            method: "POST",
            url: "/api/patientHistory",
            data: newHistory
          }).then(function() {
            console.log("updated notes");
            // $(".newHistoryForm").addClass("hidden");
            getPatientHistory();
            $("#patientHistoryText").val("");
          });
        });
      });
    }
  });
  //PATIENT NOTES BUTTON
  //PATIENT NOTES BUTTON

  $("#patientNotesBtn").on("click", function() {
    event.preventDefault();
    $(".patientStuff").empty();
    $(".newPatientForm").addClass("hidden");
    $(".newNotesForm").addClass("hidden");
    $(".newHistoryForm").addClass("hidden");

    patientID = $("#patient").val();
    getPatientNotes();

    function getPatientNotes() {
      $.get("/api/patientNotes/" + patientID, function(data) {
        console.log(data);
        $(".patientStuff").empty();
        for (var i = 0; i < data.length; i++) {
          var updatedAt = data[i].updatedAt;
          var regex = /(\d{4}-\d{2}-\d{1,2}).*/;
          var newUpdatedAt = updatedAt.match(regex);

          var patientNotesDiv = $("<div>");
          patientNotesDiv.append(newUpdatedAt[1] + "<br>");
          patientNotesDiv.append("<b>" + "Notes: " + "</b>" + data[i].notes);
          $(".patientStuff").append(patientNotesDiv);
        }
        // if (!data.history) {
        $(".newNotesForm").removeClass("hidden");

        $("#patientNotesSubmitBtn").on("click", function() {
          event.preventDefault();
          var notes = $("#doctorNotesText")
            .val()
            .trim();

          var newNotes = {
            notes: notes,
            patientId: patientID
          };
          console.log(newNotes)
          $.ajax({
            method: "POST",
            url: "/api/patientNotes",
            data: newNotes
          }).then(function() {
            console.log("updated notes");
            // $(".newHistoryForm").addClass("hidden");
            getPatientNotes();
            $("#doctorNotesText").val("");
          });
        });
      });
    }
  });

  //OP FORM BUTTON
  //OP FORM BUTTON

  $("#opFormBtn").on("click", function() {
    patientID = $("#patient").val();
    $(".patientStuff").empty();
    $(".newPatientForm").addClass("hidden");
    $(".newNotesForm").addClass("hidden");
    $(".newHistoryForm").addClass("hidden");

    $.get("/api/opform/" + patientID, function(data) {
      console.log(data);
      if (!data) {
        console.log(patientID);
        window.location.href = "/opform/?patientID=" + patientID;
      } else {
        var patientOpFormDiv = $("<div>");
        patientOpFormDiv.append(
          "<b>" + "Name: " + "</b>" + data.Patient.name + "<br>"
        );
        patientOpFormDiv.append(
          "<b>" + "PatientID: " + "</b>" + data.PatientId + "<br>"
        );
        patientOpFormDiv.append(
          "<b>" + "Date of Birth: " + "</b>" + data.Patient.DOB + "<br>"
        );
        patientOpFormDiv.append(
          "<b>" + "Date of Service: " + "</b>" + data.DateOfService + "<br>"
        );
        patientOpFormDiv.append(
          "<b>" + "Surgeon Name: " + "</b>" + data.SurgeonName + "<br>"
        );
        patientOpFormDiv.append(
          "<b>" + "Pre-Operative Diagnosis: " + "</b>" + data.PreOpDiag + "<br>"
        );
        patientOpFormDiv.append(
          "<b>" +
            "Post-Operative Diagnosis: " +
            "</b>" +
            data.PostOpDiag +
            "<br>"
        );
        patientOpFormDiv.append(
          "<b>" + "Operation: " + "</b>" + data.Operation + "<br>"
        );
        patientOpFormDiv.append(
          "<b>" +
            "Findings of the Operation: " +
            "</b>" +
            data.Findings +
            "<br>"
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
    $(".newHistoryForm").addClass("hidden");
    $(".newNotesForm").addClass("hidden");
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

      console.log(newName);
      console.log(dob);

      var newPatientData = {
        name: newName,
        DOB: dob,
        allergies: allergies,
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
