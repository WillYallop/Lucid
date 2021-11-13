const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

// create application/json parser
var jsonParser = bodyParser.json()

// Controller
const GeneratorController = require('../controllers/generate');

router.post('/', jsonParser, GeneratorController.generate_page)


router.post('/app', jsonParser, GeneratorController.generate_app);

module.exports = router;