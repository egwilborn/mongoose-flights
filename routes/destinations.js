var express = require("express");
var router = express.Router();
var destinationsCtrl = require("../controllers/destinations");
//destinationRouter does not have any paths prepended

router.post("/flights/:id/destinations", destinationsCtrl.create);

module.exports = router;
