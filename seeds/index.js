const sequelize = require("../config/connection");
const { User, Cat } = require("../models");

const userData = [
  {
    email: "joe@joe.joe",
    password: "password",
  },
  {
    email: "arra@joe.joe",
    password: "meowmeow",
  },
];

const catData = [
  {
    name: "Shiva",
    color: "Tortie",
    age: 4,
    isCute: true,
    UserId: 1,
  },
  {
    name: "Bahamut",
    color: "Buff Tabby",
    age: 4,
    isCute: true,
    UserId: 1,
  },
  {
    name: "KoopaTroopa Dumbledore",
    color: "Gray Tabby",
    age: 12,
    isCute: true,
    UserId: 1,
  },
  {
    name: "Grendel",
    color: "Gray Tabby",
    age: 7,
    isCute: false,
    UserId: 2,
  },
];

const seedMe = async () => {
  try {
    await sequelize.sync({ force: true });
    const users = await User.bulkCreate(userData, {
      individualHooks: true,
    });
    const cats = await Cat.bulkCreate(catData);
    console.log("seeded!");
    process.exit(1);
  } catch (err) {
    console.log(err);
  }
};

seedMe();
