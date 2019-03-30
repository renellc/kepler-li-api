const { Pool }  = require('pg');
const pool = new Pool({
  connectionString: process.env.NODE_ENV === 'PROD' ? process.env.DATABASE_URL : '',
  ssl: true
});

function getStars(limit, offset, getStarsHandler) {
  pool.connect().then(client => {
    client.query(`SELECT * FROM Star LIMIT ${limit} OFFSET ${offset}`).then(results => {
      client.release();
      getStarsHandler(results);
    }).catch(queryErr => {
      client.release();
      console.log(queryErr);
      getStarsHandler(null);
    });
  }).catch(connectErr => {
    console.log(queryErr);
    getStarsHandler(null);
  });
}

function getStar(starId, getStarHandler) {
  pool.connect().then(client => {
    client.query(`
    SELECT
      *
    FROM Star S
    JOIN StarPoints P
      ON P.starId = S.starId
    LIMIT 1;
    `).then(results => {
      client.release();
      getStarHandler(results);
    }).catch(queryErr => {
      client.release();
      console.log(queryErr);
      getStarHandler(null);
    });
  }).catch(connectErr => {
    console.log(connectErr);
    getStarHandler(null);
  });
}

exports.getStars = getStars;
exports.getStar = getStar;
