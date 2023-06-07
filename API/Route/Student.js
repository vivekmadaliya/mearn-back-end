const express = require("express");
const mongoose = require("mongoose");
const Student = require("../modal/student");

const router = express.Router();

// get all the data from database
router.get("/", (req, res, next) => {
  Student.find()
    .then((result) => {
      res.status(200).json({
        data: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

// get data by id
router.get("/:id", (req, res, next) => {
  Student.findById(req.params.id)
    .then((result) => {
      res.status(200).json({
        data: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

// create student
router.post("/", (req, res, next) => {
  // for getting data from front-side
  const student = new Student({
    _id: new mongoose.Types.ObjectId(), // genereted by mongoose back-end side
    name: req.body.name,
    gender: req.body.gender,
    age: req.body.age,
  });

  // for save data into the database
  student
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        msg: "Student created successfully",
      });
    })

    // for getting error execute code
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        erro: err,
      });
    });
});

// delete student by id
router.delete("/:id", (req, res, next) => {
  Student.findByIdAndRemove(req.params.id)
    .then((result) => {
      res.status(200).json({
        msg: "Student deleted",
        data: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

// for updating student data
router.put("/:id", (req, res, next) => {
  Student.findOneAndUpdate({_id:req.params.id}, {
    $set: {
      name: req.body.name,
      gender: req.body.gender,
      age: req.body.age,
    },
  })
    .then((result) => {
      res.status(201).json({
        data: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

module.exports = router;
