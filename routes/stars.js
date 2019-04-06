const express = require('express');
const db = require('../db/db');

const router = express.Router();

const pageLimit = 10;

/**
 * Gets the queries for the route /api/stars.
 * @param {Object} query The object containing the query object from a Request of a client.
 */
const getQueries = function getQueryParameters(query) {
  const queries = {
    sort: query.sort ? query.sort : 'starid',
    offset: query.offset ? query.offset : 0,
  };

  return queries;
};

router.get('/', (req, res) => {
  const queries = getQueries(req.query);
  db.getStars(pageLimit, queries.offset, queries.sort, (err, data) => {
    if (err) {
      res.sendStatus(404);
    }
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(data));
  });
});

router.get('/:starId', (req, res) => {
  db.getStar(req.params.starId, (err, data) => {
    if (err || data.length === 0) {
      res.sendStatus(404);
      return;
    }
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(data));
  });
});

module.exports = router;
