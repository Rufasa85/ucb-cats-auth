const express = require("express");
const router = express.Router();
const { User } = require("../models");
const bcrypt = require("bcrypt");

router.get("/", (req, res) => {
  User.findAll()
    .then((allUsers) => {
      res.json(allUsers);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "trumpet noise", err });
    });
});

router.get("/:id", async (req, res) => {
  try {
    const thisUser = await User.findByPk(req.params.id);
    res.json(thisUser);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "trumpet noise", err });
  }
});

router.post("/", (req, res) => {
  User.create({
    email: req.body.email,
    password: req.body.password,
  })
    .then((newUser) => {
      res.json(newUser);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "womp womp", err });
    });
});

router.post("/login", (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((foundUser) => {
      if (!foundUser) {
        return res.status(401).json({ msg: "incorrect username or password" });
      }
      if (!bcrypt.compareSync(req.body.password, foundUser.password)) {
        return res.status(401).json({ msg: "incorrect username or password" });
      } else {
        res.json({
          id: foundUser.id,
          email: foundUser.email,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "womp womp", err });
    });
});

router.put("/:id", (req, res) => {
  User.update(
    {
      email: req.body.email,
      password: req.body.password,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((updatedUser) => {
      if (updatedUser[0] === 0) {
        return res.status(404).json({ msg: "no such User" });
      }
      res.json(updatedUser);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "womp womp", err });
    });
});
router.delete("/:id", (req, res) => {
  User.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((delUser) => {
      if (delUser === 0) {
        return res.status(404).json({ msg: "no such User" });
      }
      res.json(delUser);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "womp womp", err });
    });
});

module.exports = router;
