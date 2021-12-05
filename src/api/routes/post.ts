// Handle everything to do with theme posts

import express from 'express';
const router = express.Router();

router.get('/', express.json(), (req, res, next) => {
    res.send('POST ROUTE!');
})

// Routes needed:
// - (post) - create a new post entry in the config/post.json file
// - (get) - get config/posts.json config 
// - 
// - 
// - 

module.exports = router;