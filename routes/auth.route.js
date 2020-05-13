const express = require("express");
const router = express.Router();

const AuthHandlers = require("./../controller/AuthHandlers");

router.post("/signup", AuthHandlers.signup);

module.exports = router;
