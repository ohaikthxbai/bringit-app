const express = require('express');
const passport = require('passport');
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
const router = express.Router();
var brackets = require("../models/brackets.js");

/* GET user profile. */
router.post('/', ensureLoggedIn, function(req, res, next) {
    console.log(req.body.DBA_NAME);
  var USER_CB = req.user
  var USER_ID = req.user._json.sub
  brackets.selectAll([
    "BRACKET"
  ], [
      USER_ID
    ], function (data) {

      res.render('user', {
        user: USER_CB,
        bracket: data
      });
    //   console.log(data);
    });
});

module.exports = router;
