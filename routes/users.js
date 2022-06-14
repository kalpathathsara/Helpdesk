const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("hey its user route");
});

// Use Comments Bruh

module.exports = router;
