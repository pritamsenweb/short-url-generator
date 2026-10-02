const express = require("express");
const { handlerUserSignUp, handleUserLogin } = require("../controller/user");

const router = express.Router();

router.post("/", handlerUserSignUp);
router.post("/login", handleUserLogin )

module.exports = router;