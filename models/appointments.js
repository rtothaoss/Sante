module.exports = function(sequelize, DataTypes) {
  var Appointment = sequelize.define("Appointment", {
    routeName: DataTypes.STRING,
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    reasonForVisit: {
      type: DataTypes.STRING,
      allowNull: false,

      validate: {
        len: [1, 160]
      }
    },
    isPresent: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0
    },
    DOB: DataTypes.STRING,
    phoneNumber: DataTypes.INTEGER,
    email: DataTypes.STRING
  });

  // Appointment.associate = function(models) {
  //   // Appointment.belongsTo(models.Doctor, {
  //   //   foreignKey: {
  //   //     allowNull: false
  //   //   }
  //   // });
  //   Appointment.belongsTo(models.Patient, {
  //     foreignKey: {
  //       allowNull: false
  //     }
  //   });
  // };
  return Appointment;
};
