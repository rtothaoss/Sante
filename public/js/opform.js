$(function() {
  var URL = window.location.search;
  var patientID = URL.replace(/\D/g, "");
  console.log(patientID);

  $("#submitBtn").on("click", function() {
    event.preventDefault();

    var date = $("#dateOp")
      .val()
      .trim();
    var surgeon = $("#surgeonOp")
      .val()
      .trim();
    var preOp = $("#PreOp")
      .val()
      .trim();
    var postOp = $("#PostOp")
      .val()
      .trim();
    var operation = $("#OperationOp").val();
    var findings = $("#findingsOp")
      .val()
      .trim();

    var PostOpData = {
      DateOfService: date,
      SurgeonName: surgeon,
      PreOpDiag: preOp,
      PostOpDiag: postOp,
      Operation: operation,
      Findings: findings,
      PatientId: patientID
    };

    $.post("/api/opform", PostOpData, function() {
      console.log("appointment added");
    });

    window.history.back();
  });
});
