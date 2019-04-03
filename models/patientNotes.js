module.exports = function(sequelize, DataTypes) {
  var Patientnotes = sequelize.define("Patientnotes", {
    notes: DataTypes.TEXT,
    patientId: DataTypes.STRING
  });
  return Patientnotes;
};
