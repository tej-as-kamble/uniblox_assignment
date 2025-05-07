const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Admin route is working!');
});

module.exports = router;
