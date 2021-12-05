// Handle everything to do with theme components

import express from 'express';
const router = express.Router();

router.get('/', express.json(), (req, res, next) => {
    res.send('PAGE ROUTE!');
})

// Routes needed:
// - 
// - 
// - 

module.exports = router;