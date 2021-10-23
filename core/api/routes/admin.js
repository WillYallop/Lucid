const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

// create application/json parser
var jsonParser = bodyParser.json()

// Controller
const AdminController = require('../controllers/admin');

router.post('/page', jsonParser, AdminController.add_new_page);

module.exports = router;