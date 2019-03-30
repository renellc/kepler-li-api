var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    //let offset = Math.round(parseInt(req.query.offset) / 10) * 10;

    // if (req.query.range || req.query.std) {
    //     res.send(`Getting stars with an offset of ${offset} and with a ${req.query.range ? 'range' : 'standard deviation'} sort.`);
    // } else {
    //     res.send(`Getting stars.`);
    // }

    res.send(`Getting stars.`);
});

router.get('/:starId', (req, res) => {
    res.send(`Requesting star data for star ${req.params.starId}`);
});

module.exports = router;

