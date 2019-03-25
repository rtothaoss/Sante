module.exports = function(sequelize, DataTypes) {
  var Doctor = sequelize.define("Doctor", {
    name: DataTypes.STRING
  });

  Doctor.assosciate = function(models) {
    Doctor.hasMany(models.Appointment, {
      onDelete: "cascade"
    });
  };

  return Doctor;
};
