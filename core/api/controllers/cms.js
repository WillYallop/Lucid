const mongoose = require('mongoose');

// Models
const Pages = require('../models/pages');

// ------------------------------------ ------------------------------------
// POST - add a new page
// ------------------------------------ ------------------------------------
exports.add_new_page = (req, res, next) => {
    Pages.find({ page_slug: req.body.page_slug })
    .then((response) => {
       if(response.length) {
            // Page exists
            res.status(403).json({
                exists: true
            });
       }
       else {
            // Get layout name from prewritten config
            // Add page
            const page = new Pages({
                _id: new mongoose.Types.ObjectId(),
                template_name: req.body.template_name,
                layout_name: 'default.html',
                page_name: req.body.page_name,
                page_slug: req.body.page_slug
            });
            page
            .save()
            .then((response) => {
                res.status(200).json({
                    success: true,
                    page: response
                })
            })
            .catch((err) => {
                res.status(500).json({
                    error: err
                })
            })
        }       
    })
    .catch((err) => {
        res.status(500).json({
            error: err
        })
    })
}