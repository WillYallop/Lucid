const { response } = require('express');
const mongoose = require('mongoose');

// Functions
const pageCount = require('../../functions/page-count');

// Models
const Pages = require('../../models/pages');

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

// ------------------------------------ ------------------------------------
// GET - get single pages
// ------------------------------------ ------------------------------------
exports.get_single_page = (req, res, next) => {

    // Get page count
    pageCount()
    .then((count) => {

        Pages.findOne({ is_post_type: false })
        .then((response) => {
            res.status(200).json({
                meta: {
                    totalPages: count
                },
                data: response
            })
        })
        .catch((err) => {
            res.status(500).json({
                error: err
            })
        })

    })
}

// ------------------------------------ ------------------------------------
// GET - get multiple pages
// ------------------------------------ ------------------------------------
exports.get_multiple_pages = (req, res, next) => {
    var queryLimit = parseInt(req.params.limit);
    var querySkip = parseInt(req.params.skip);

    Pages.find({ is_post_type: false })
    .limit(queryLimit)
    .skip(querySkip)
    .then((response) => {

        // Get page count
        pageCount()
        .then((count) => {

            var next, prev;
            // Work out next
            if(querySkip + queryLimit >= count) next = false;
            else next = `/cms/page/${queryLimit}/${querySkip + queryLimit}`
            // Work out prev
            if(querySkip - queryLimit <= 0) prev = false;
            else prev = `/cms/page/${queryLimit}/${querySkip - queryLimit}`

            // Reponse
            res.status(200).json({
                meta: {
                    totalPages: count
                },
                data: response,
                links: {
                    self: `/cms/page/${queryLimit}/${querySkip}`,
                    first: `/cms/page/${queryLimit}/0`,
                    prev: prev,
                    next: next
                }
            })
        })

    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
}