const User = require("./User");
const Cat = require("./Cat");

Cat.belongsTo(User, {
  onDelete: "CASCADE",
});
User.hasMany(Cat);

module.exports = {
  Cat,
  User,
};
