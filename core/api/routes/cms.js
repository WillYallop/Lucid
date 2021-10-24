const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

// create application/json parser
var jsonParser = bodyParser.json()

// Controller
const CmsController = require('../controllers/cms');

// Pages
router.post('/page', jsonParser, CmsController.add_new_page);
router.get('/page', jsonParser, CmsController.get_single_page); // Get single/multiple pages
router.get('/page/:limit/:skip', jsonParser, CmsController.get_multiple_pages); // Get single/multiple pages


module.exports = router;