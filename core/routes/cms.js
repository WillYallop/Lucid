// THIS FILE IS AUTO GENERATED

const express = require('express');
const router = express.Router();
const path = require('path');

// site-admin
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../dist/cms/index.html'));
});

module.exports = router;