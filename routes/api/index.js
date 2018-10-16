const router = require("express").Router();
const loginController = require("../../controllers/loginController");
const requestsController = require("../../controllers/requestsController");
const usersController = require("../../controllers/usersController");
const updateController = require("../../controllers/updateController");

// Login Controller Routes
router.route("/login/:username").get(loginController.getUser);
router.route("/signup").post(loginController.createUser);

// Users Controller Routes
router.route("/users/:username").get(usersController.getUser);
router.route("/friends/:id").get(usersController.getFriends);
router.route("/search/:query").get(usersController.findUsers);
router.route("/users").get(usersController.getAll);

// Update Controller Route
router.route("/updateNew/:id").post(updateController.updateNew);
router.route("/updateCheck/:id").post(updateController.checkForUpdate);
router.route("/compileUpdate/:id").post(updateController.compileActivity);

// Requests Controller
router.route("/request").post(requestsController.createRequest);
router.route("/request").put(requestsController.acceptRequest);
router.route("/request/:id").get(requestsController.getAll);

module.exports = router;
