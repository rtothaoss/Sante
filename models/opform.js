module.exports = function(sequelize, DataTypes) {
  var Postop = sequelize.define("Postop", {
    DateOfService: DataTypes.STRING,
    SurgeonName: DataTypes.STRING,
    PreOpDiag: DataTypes.STRING,
    PostOpDiag: DataTypes.STRING,
    Operation: DataTypes.STRING,
    Findings: DataTypes.STRING
  });

  Postop.associate = function(models) {
    Postop.belongsTo(models.Patient, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Postop;
};
