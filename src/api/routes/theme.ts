import express from 'express';
const router = express.Router();


router.get('/', express.json(), (req, res, next) => {
    res.send('THEME ROUTE!');
})

module.exports = router;