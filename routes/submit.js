const express = require('express');
const passport = require('passport');
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
const router = express.Router();
var brackets = require("../models/brackets.js");

router.post('/', ensureLoggedIn, function(req, res, next) {
    var USER_CB = req.user
    var USER_ID = req.user._json.sub
    var BRACKET_STRING = req.body.DBA_NAME
    brackets.insertBracket([
      "BRACKET"
    ], [
        USER_ID, BRACKET_STRING
      ], function (data) {
  
        res.render('user', {
          user: USER_CB,
          bracket: data
        });
      //   console.log(data);
      });
  });

module.exports = router;
