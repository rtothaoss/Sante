module.exports = function(sequelize, DataTypes) {
  var Appointment = sequelize.define("Appointment", {
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
    reasonForVisit: {
      type: DataTypes.STRING,
      allowNull: false,

      validate: {
        len: [1, 160]
      }
    },
    allergies: {
      type: DataTypes.STRING,
      defaultValue: "None"
    },
    isPresent: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0
    }
  });

  Appointment.associate = function(models) {
    Appointment.belongsTo(models.Doctor, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Appointment;
};
