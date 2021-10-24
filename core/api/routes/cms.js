const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

// create application/json parser
var jsonParser = bodyParser.json()

// Controller
const CmsController = require('../controllers/cms');

router.post('/page', jsonParser, CmsController.add_new_page);

module.exports = router;