const express = require('express');
const router = express.Router();
const {
  ensureAuthenticated
} = require('../config/auth');

// Landing Page
router.get('/', (req, res) => res.render('index'));


// Play Page
router.get('/play', ensureAuthenticated, (req, res) =>
  res.render('play', {
    name: req.user.name
  })
);

module.exports = router;