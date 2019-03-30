const { Pool }  = require('pg');
const pool = process.env.NODE_ENV === 'PROD' ? 
  new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: true
  }) : 
  new Pool({
    user: 'admin',
    host: 'localhost',
    database: 'admin',
    password: process.env.LOCAL_DB_PASS
  });

function getStars(limit, offset, getStarsHandler) {
  pool.connect().then(client => {
    client.query(`SELECT * FROM Star ORDER BY starId ASC LIMIT ${limit} OFFSET ${offset}`).then(results => {
      client.release();
      getStarsHandler(null, results.rows);
    }).catch(queryErr => {
      client.release();
      console.log(queryErr);
      getStarsHandler(queryErr, null);
    });
  }).catch(connectErr => {
    console.log(connectErr);
    getStarsHandler(connectErr, null);
  });
}

function getStar(starId, getStarHandler) {
  pool.connect().then(client => {
    client.query(`
    SELECT
      S.starId,
      S.min,
      S.max,
      S.std,
      S.hasPossibleExoplanets,
      P.simplified
    FROM Star S
    JOIN StarPoints P
      ON P.starId = S.starId
    LIMIT 1;
    `).then(results => {
      client.release();
      getStarHandler(null, results.rows);
    }).catch(queryErr => {
      client.release();
      console.log(queryErr);
      getStarHandler(queryErr, null);
    });
  }).catch(connectErr => {
    console.log(connectErr);
    getStarHandler(connectErr, null);
  });
}

exports.getStars = getStars;
exports.getStar = getStar;
