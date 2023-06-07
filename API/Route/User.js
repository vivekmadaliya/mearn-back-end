const express = require("express");
const mongoose = require("mongoose");
const User = require("../modal/user");
const bcrypt = require("bcrypt");
const router = express.Router();
const jwt = require("jsonwebtoken");

// get users details
router.get("/", (req, res, next) => {
  User.find()
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

//match value of user

router.post("/login", (req, res, next) => {
  User.find({ email: req.body.email })
  .then((user) => {
    if (user.length < 1) {
      return res.status(401).json({
        msg: "user not exist",
      });
    }
    bcrypt.compare(req.body.password, user[0].password, (err, result) => {
      if (!result) {
        return res.status(401).json({
          msg: "password match fail",
        });
      }
      if (result) {
        const token = jwt.sign(
          {
            email: user[0].email,
            usertype: user[0].usertype,
            firstname: user[0].firstname,
          },
          "This is dummy text",
          {
            expiresIn: "24h",
          }
        );
        res.status(200).json({
          firstname: user[0].firstname,
          lastname: user[0].lastname,
          email: user[0].email,
          usertype:user[0].usertype,
          token:token
        });
      }
    });
  })
  .catch(err=>{
    res.status(500).json({
        error:err
    })
  })
});

// create users
router.post("/signup", (req, res, next) => {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({
        error: err,
      });
    } else {
      const user = new User({
        _id: new mongoose.Types.ObjectId(),
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hash,
        usertype: req.body.usertype,
      });
      // for save data
      user.save().then((result) => {
        res
          .status(201)
          .json({
            msg: "user created successfully",
            data: result,
          })
          .catch((err) => {
            res.status(500).json({
              error: err,
            });
          });
      });
    }
  });
});

module.exports = router;
