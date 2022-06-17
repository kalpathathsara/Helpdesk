const User = require("../models/User");
const router = require("express").Router();
const bcrypt = require("bcrypt");

//update a user
router.put("/:id", async (req, res) => {
  //put("/:id") allows to use any id number
  if (req.body.userId === req.params.id || req.user.isAdmin) {
    //if the account's user id matches with the id in the url || or the user is an admin
    if (req.body.password) {
      //if user try to update the password, it should be generated again (enctyption)
      try {
        const salt = await bcrypt.genSalt(10); //Generating a new password
        req.body.password = await bcrypt.hash(req.body.password, salt); //password hashing
      } catch (err) {
        return res.status(500).json(err);
      }
    }

    try {
      //updating the profile
      const user = await User.findByIdAndUpdate(req.body.userId, {
        //find the user to update
        $set: req.body,
      });
      res.status(200).json("Account has been updated");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You cannot update others' accounts!"); //if not(line #7)
  }
});

//delete user
//get a user
//follow a user
//unfollow a user

module.exports = router;
