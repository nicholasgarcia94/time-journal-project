
const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors')
const app = express();
const db = require('./queries');
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use(cors());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
    next();
  });

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
app.get('/api/express_backend', db.getActivites);
app.post('/addActivity', (req, res) => db.addActivity(req, res));
app.delete('/deleteActivity/:id', db.deleteActivity);
