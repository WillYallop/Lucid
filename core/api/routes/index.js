const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('HELLO')
    // res.sendFile(path.join(__dirname, '/index.html'));
});

module.exports = router;