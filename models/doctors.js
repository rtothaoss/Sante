module.exports = function(sequelize, DataTypes) {
  var Doctor = sequelize.define("Doctor", {
    name: DataTypes.STRING,
    speciality: DataTypes.STRING
  });

  return Doctor;
};
