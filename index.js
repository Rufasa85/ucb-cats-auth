const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;
const sequelize = require("./config/connection");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const Cat = require("./models/Cat");

app.get("/", (req, res) => {
  console.log("hello from the server");
  res.send("this is the homepage");
});

app.get("/api/cats", (req, res) => {
  Cat.findAll()
    .then((allCats) => {
      res.json(allCats);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "trumpet noise", err });
    });
});

app.post("/api/cats", (req, res) => {
  Cat.create({
    name: req.body.name,
    color: req.body.color,
    age: req.body.age,
    isCute: req.body.isCute,
  })
    .then((newCat) => {
      res.json(newCat);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "womp womp", err });
    });
});

app.put("/api/cats/:id", (req, res) => {
  Cat.update(
    {
      name: req.body.name,
      color: req.body.color,
      age: req.body.age,
      isCute: req.body.isCute,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((updatedCat) => {
      res.json(updatedCat);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "womp womp", err });
    });
});
app.delete("/api/cats/:id", (req, res) => {});

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`listenin on port ${PORT}`);
  });
});
