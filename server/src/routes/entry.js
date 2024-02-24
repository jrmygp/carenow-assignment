const entryController = require("../controllers/entry");

const router = require("express").Router();

router.post("/create", entryController.createEntry);

module.exports = router;
