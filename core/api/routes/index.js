// THIS FILE IS AUTO GENERATED

const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.send(__dirname);
    // res.sendFile(path.join(__dirname, '/index.html'));
});

module.exports = router;