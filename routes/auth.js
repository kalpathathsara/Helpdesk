const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//Register a new user
router.post("/register", async (req, res) => {
  try {
    //Password encryption
    const salt = await bcrypt.genSalt(10); //Generate a salt(a random string)
    const hashedPassword = await bcrypt.hash(req.body.password, salt); //hash the actual password with the salt

    //Create new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    //Save user and return the response
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email }); //Searching the user using the email. Use findOne because there is only one document have this email
    !user && res.status(404).json("User Not Found"); //if there is no user

    const validPassword = await bcrypt.compare(
      //Compare the entered password with the founded user's password
      req.body.password,
      user.password
    );
    !validPassword && res.status(400).json("Password is Invalid"); //if password is invalid

    res.status(200).json(user); //if the email and the password is valid
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
