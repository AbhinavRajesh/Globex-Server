const axios = require("axios");
const mongoose = require("mongoose");
const ObjectId = require("mongodb").ObjectID;
const User = require("../models/User");

exports.addUser = (req, res) => {
  const { id, name, email } = req.body;
  User.findById({ _id: id }, (err, user) => {
    if (user) return res.status(200).send({ user: user });
    else {
      const newUser = new User({
        _id: id,
        name: name,
        email: email,
      });
      newUser
        .save()
        .then((result) => console.log(result))
        .catch((error) => console.error(error));
      return res.status(200).send({ user: newUser });
    }
  });
};

exports.getWebsites = (req, res) => {
  User.findById({ _id: req.userId }, (err, user) => {
    if (err)
      return res
        .status(200)
        .send({ error: "Some Error Occured! Please try again later!" });
    if (user) {
      return res.status(200).send({
        websites: user.history.reverse(),
      });
    }
  });
};

exports.addWebsite = (req, res) => {
  const { url, wordCount } = req.body;
  User.findById({ _id: req.userId }, (err, user) => {
    if (err)
      return res
        .status(200)
        .send({ error: "Some Error Occured! Try Again Later!" });
    if (user) {
      user.history.push({
        _id: ObjectId(),
        url: url,
        wordCount: wordCount,
        favourite: false,
      });
      user.save((error, obj) => {
        if (error)
          return res
            .status(200)
            .send({ error: "Some Error Occured! Try Again Later!" });
        if (obj)
          return res.status(200).send({ websites: obj.history.reverse() });
      });
    }
  });
};

exports.getWordCount = async (req, res) => {
  const { url } = req.body;

  axios
    .get(url)
    .then((response) => {
      if (response.status === 200) {
        return res.status(200).send({
          htmlText: response.data,
        });
      }
    })
    .catch((error) => res.status(200).send({ error: "Some error Occurred" }));
};

exports.deleteHistory = (req, res) => {
  User.findById({ _id: req.userId }, (err, user) => {
    if (err)
      return res
        .status(200)
        .send({ error: "Some Error Occured! Please try again later!" });
    if (user) {
      const { id } = req.params;
      console.log(id);
      user.history = user.history.filter((url) => url._id != id);
      user.save((error, obj) => {
        if (error)
          return res
            .status(200)
            .send({ error: "Some Error Occured! Try Again Later!" });
        if (obj)
          return res.status(200).send({ websites: obj.history.reverse() });
      });
    }
  });
};

exports.toggleFavourite = (req, res) => {
  User.findById({ _id: req.userId }, (err, user) => {
    if (err)
      return res
        .status(200)
        .send({ error: "Some Error Occured! Please try again later!" });
    if (user) {
      const { id } = req.params;
      user.history.map((website) => {
        if (website._id.equals(id)) {
          website.favourite = !website.favourite;
        }
      });
      user.markModified("history");
      user.save((error, obj) => {
        if (error)
          return res
            .status(200)
            .send({ error: "Some Error Occured! Try Again Later!" });
        if (obj)
          return res.status(200).send({ websites: obj.history.reverse() });
      });
    }
  });
};
