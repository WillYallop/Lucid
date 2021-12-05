// Handle everything to do with theme templates

import express from 'express';
const router = express.Router();

router.get('/', express.json(), (req, res, next) => {
    res.send('TEMPLATES ROUTE!');
})

// Routes needed:
// - (get) - get template file names from theme directory
// - 

module.exports = router;