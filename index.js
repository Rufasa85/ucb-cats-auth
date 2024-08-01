const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;
const sequelize = require("./config/connection");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const allRoutes = require("./controllers");
app.use(allRoutes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`listenin on port ${PORT}`);
  });
});
