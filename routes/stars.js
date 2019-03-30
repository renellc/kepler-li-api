const express = require('express');
const db = require('../db/db');

const router = express.Router();

const pageLimit = 10;

router.get('/', (req, res) => {
  const offset = req.query.offset ? req.query.offset : 0;
  db.getStars(pageLimit, offset, (err, data) => {
    if (err) {
      console.log(err);
      res.setHeader('Content-Type', 'application/json');
      res.status(404).send(JSON.parse({}));
    }
    res.send(data);
  });
});

router.get('/:starId', (req, res) => {
  res.send(`Requesting star data for star ${req.params.starId}`);
});

module.exports = router;
