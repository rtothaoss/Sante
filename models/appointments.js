module.exports = function(sequelize, DataTypes) {
  var Appointment = sequelize.define("Appointment", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    age: {
      type: DataTypes.INTEGER,

      validate: {
        len: [1, 3]
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
    }
  });

  Appointment.associate = function(models) {
    Appointment.belongTo(models.Doctor, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Appointment;
};
