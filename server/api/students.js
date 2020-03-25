const router = require("express").Router();
const Student = require("../db/student");

router.get("/", async (req, res) => {
  res.json(await Student.findAll());
});

module.exports = router;
