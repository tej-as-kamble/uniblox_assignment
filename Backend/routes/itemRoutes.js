const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Item route is working!');
});

module.exports = router;