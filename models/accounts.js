module.exports = function(sequelize, DataTypes) {
  var Account = sequelize.define("Account", {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING
  });
  return Account;
};
