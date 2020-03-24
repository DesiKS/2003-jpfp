const router = require("express").Router();
const Campus = require("../db/campus");

router.get("/", async (req, res) => {
  res.json(await Campus.findAll())
})

module.exports = router;
