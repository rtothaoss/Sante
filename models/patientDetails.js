module.exports = function(sequelize, DataTypes) {
  var Patient = sequelize.define("Patient", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    DOB: {
      type: DataTypes.STRING
    },
    allergies: {
      type: DataTypes.STRING,
      defaultValue: "None"
    },
    history: DataTypes.TEXT,
    doctorNotes: DataTypes.TEXT,
    emergencyContact: DataTypes.STRING,
    pictureURL: DataTypes.STRING
  });

  return Patient;
};
