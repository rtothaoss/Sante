module.exports = function(sequelize, DataTypes) {
  var Patient = sequelize.define("Patient", {
    name: DataTypes.STRING,
    DOB: DataTypes.STRING,
    allergies: DataTypes.STRING,
    history: DataTypes.TEXT,
    doctorNotes: DataTypes.TEXT,
    emergencyContact: DataTypes.STRING,
    pictureURL: DataTypes.STRING
  });

  return Patient;
};
