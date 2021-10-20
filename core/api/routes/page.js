const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('PAGE')
});

module.exports = router;