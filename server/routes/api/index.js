const router = require("express").Router();
const dbController = require("../../controllers/dbController");

router.route("/")
    .get(dbController.functionName);

module.exports = router;