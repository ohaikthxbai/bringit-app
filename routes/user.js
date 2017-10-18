const express = require('express');
const passport = require('passport');
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
const router = express.Router();
var brackets = require("../models/brackets.js");

/* GET user profile. */
router.get('/', ensureLoggedIn, function(req, res, next) {
  var USER_CB = req.user
  var USER_ID = ""+req.user._json.sub;
  brackets.selectAll([
    "BRACKET"
  ], [
      123
    ], function (data) {

      res.render('user', {
        user: USER_CB
      });
      console.log(data);
    });


});


module.exports = router;
