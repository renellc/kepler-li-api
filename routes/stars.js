const express = require('express');
const db = require('../db/db');

const router = express.Router();

const pageLimit = 10;

router.get('/', (req, res) => {
  const offset = req.query.offset ? req.query.offset : 0;
  const { sort } = req.query;
  db.getStars(pageLimit, offset, sort, (err, data) => {
    if (err) {
      console.log(err);
      res.setHeader('Content-Type', 'application/json');
      res.sendStatus(404);
    }
    res.send(data);
  });
});

router.get('/:starId', (req, res) => {
  db.getStar(req.params.starId, (err, data) => {
    if (err || data.length === 0) {
      res.status(404).send();
    }
    res.send(data);
  });
});

module.exports = router;
