const express = require('express');
const router = express.Router();

// Controller
const GeneratorController = require('../controllers/generate');

router.post('/page', GeneratorController.generate_page)

module.exports = router;