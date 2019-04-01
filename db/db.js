const { Pool } = require('pg');

const pool = process.env.NODE_ENV === 'PROD'
  ? new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: true,
  })
  : new Pool({
    user: 'admin',
    host: 'localhost',
    database: 'admin',
    password: process.env.LOCAL_DB_PASS,
  });

/**
 * Retrieves the specified amount of stars from the Stars database.
 *
 * @param {Number}   limit           The amount of stars that will be retrieved from the database.
 * @param {Number}   offset          The amount to offset the first item from.
 * @param {Function} getStarsHandler A callback that takes in as its first argument the error, and
 *                                   it second argument the data retrieved from the database.
 */
const getStars = function getStarsAmount(limit, offset, sortBy, getStarsHandler) {
  pool.connect().then((client) => {
    client.query(`
    SELECT
      S.starid AS starId,
      S.min,
      S.max,
      (S.max - S.min) AS range,
      S.std AS stdDeviation,
      S.haspossibleexoplanets AS hasPossibleExoplanets,
      P.simplified as simplifiedFluxPoints
    FROM Star S
    JOIN StarPoints P
      ON P.starId = S.starId
    ORDER BY ${sortBy} ${sortBy === 'haspossibleexoplanets' ? 'DESC' : 'ASC'}
    LIMIT ${limit}
    OFFSET ${offset}
    `).then((results) => {
      client.release();
      getStarsHandler(null, results.rows);
    }).catch((queryErr) => {
      client.release();
      getStarsHandler(queryErr, null);
    });
  }).catch((connectErr) => {
    getStarsHandler(connectErr, null);
  });
};

/**
 * Gets a specified star from the Stars database.
 *
 * @param {Number}   starId         The id of the star in the database.
 * @param {Function} getStarHandler A callback that takes in as its first argument the error, and
 *                                  it second argument the data retrieved from the database.
 */
const getStar = function getSingleStar(starId, getStarHandler) {
  pool.connect().then((client) => {
    client.query(`
    SELECT
      S.starid AS starId,
      S.min,
      S.max,
      (S.max - S.min) AS range,
      S.std AS stdDeviation,
      S.haspossibleexoplanets AS hasPossibleExoplanets,
      P.extended as fluxPoints
    FROM Star S
    JOIN StarPoints P
      ON P.starid = S.starid
    WHERE
      S.starid = ${starId}
    LIMIT 1;
    `).then((results) => {
      client.release();
      getStarHandler(null, results.rows[0]);
    }).catch((queryErr) => {
      client.release();
      getStarHandler(queryErr, null);
    });
  }).catch((connectErr) => {
    getStarHandler(connectErr, null);
  });
};

exports.getStars = getStars;
exports.getStar = getStar;
