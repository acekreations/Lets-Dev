const router = require("express").Router();
const articleRoutes = require("./example");

router.use("/example", articleRoutes);

module.exports = router;