// THIS FILE IS AUTO GENERATED

const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../dist/app/index.html'));
});

module.exports = router;