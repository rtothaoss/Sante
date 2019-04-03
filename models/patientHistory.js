module.exports = function(sequelize, DataTypes) {
  var Patienthistory = sequelize.define("Patienthistory", {
    history: DataTypes.TEXT,
    patientId: DataTypes.STRING
  });
  return Patienthistory;
};
