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

  // Patient.associate = function(models) {
  //   Patient.belongsTo(models.Doctor, {
  //     foreignKey: {
  //       allowNull: false
  //     }
  //   });
  //   Patient.hasMany(models.Appointment);
  // };
  return Patient;
};
