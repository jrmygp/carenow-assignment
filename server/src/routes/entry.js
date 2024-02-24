const entryController = require("../controllers");

const router = require("express").Router();

router.get("/", entryController.entryController.getAllEntry);
router.post("/create", entryController.entryController.createEntry);

module.exports = router;
