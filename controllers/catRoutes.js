const express = require("express");
const router = express.Router();
const { Cat } = require("../models");

router.get("/", (req, res) => {
  Cat.findAll()
    .then((allCats) => {
      res.json(allCats);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "trumpet noise", err });
    });
});

router.get("/:id", async (req, res) => {
  try {
    const thisCat = await Cat.findByPk(req.params.id);
    res.json(thisCat);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "trumpet noise", err });
  }
});

router.post("/", (req, res) => {
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

router.put("/:id", (req, res) => {
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
      if (updatedCat[0] === 0) {
        return res.status(404).json({ msg: "no such cat" });
      }
      res.json(updatedCat);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "womp womp", err });
    });
});
router.delete("/:id", (req, res) => {
  Cat.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((delCat) => {
      if (delCat === 0) {
        return res.status(404).json({ msg: "no such cat" });
      }
      res.json(delCat);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "womp womp", err });
    });
});

module.exports = router;
