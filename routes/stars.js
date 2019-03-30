var express = require('express');
var router = express.Router();

router.get('/:starId', (req, res) => {
    res.send(`Requesting star data for star ${req.params.starId}`);
});

module.exports = router;

