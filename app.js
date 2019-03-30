const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 4000;
const starRouter = require('./routes/stars');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use('/api/stars', starRouter);

app.listen(port, () => {
    console.log(`Server running on ${port}`);
});
