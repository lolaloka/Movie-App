const router = require('express').Router();
const AuthHandlers = require('./../controllers/auth.controller');

router.post('/signup', AuthHandlers.signUp);

module.exports = router;