const mongoose = require('mongoose');

// Functions
const pageCount = require('../../functions/page-count');

// Models
const Pages = require('../../models/pages');

// ------------------------------------ ------------------------------------
// POST - add a new page
// ------------------------------------ ------------------------------------
exports.add_new_page = async (req, res, next) => {
    try {
        let pageSlugExists = await Pages.findOne({ slug: req.body.slug });
        var count = await pageCount(); // Page count
        if(pageSlugExists) {
            res.status(403).json({
                meta: {
                    total_pages: count
                },
                data: {},
                errors: [
                    {
                      status: '403',
                      title:  'Page Exists',
                      detail: 'A page with this slug exists already!'
                    }
                ]
            });
        }
        else {
            // Add page
            const page = new Pages({
                _id: new mongoose.Types.ObjectId(),
                template_name: req.body.template_name,
                page_name: req.body.page_name,
                slug: req.body.slug,
                page_type: req.body.page_type,
                parent_page: req.body.parent_page,
                parent_page_id: req.body.parent_page_id,
                author: req.body.author
            });
            let savePageRes = await page.save();

            res.status(200).json({
                meta: {
                    total_pages: count
                },
                data: savePageRes,
                links: {
                    self: {
                        request_type: 'POST',
                        query: `/cms/page`
                    },
                    get: {
                        request_type: 'GET',
                        query: `/cms/page/${savePageRes._id}`
                    }
                }
            })
        }
    }
    catch(err) {
        res.status(500).json({
            error: err
        })
    }
}

// ------------------------------------ ------------------------------------
// GET - get single pages
// ------------------------------------ ------------------------------------
exports.get_single_page = async (req, res, next) => {
    try {
        let count = await pageCount();
        if(req.params.type === 'page') var pageResponse = await Pages.findOne({ page_name: req.params.page_name, page_type: req.params.type });
        else var pageResponse = await Pages.findOne({ page_name: req.params.page_name, page_type: req.params.type, post_name: req.params.post_name });

        if(!pageResponse) {
            res.status(404).json({
                error: `Page with page name "${req.params.page_name}"" does not exists for post name "${req.params.post_name}" of type "${req.params.type}"!`
            })
        } 
        else {
            res.status(200).json({
                meta: {
                    total_pages: count
                },
                data: pageResponse
            })
        }
    }
    catch(err) {
        res.status(500).json({
            error: err
        })
    }
}

// ------------------------------------ ------------------------------------
// GET - get multiple pages / posts
// ------------------------------------ ------------------------------------
exports.get_multiple_pages = async (req, res, next) => {
    try {
        let queryLimit = parseInt(req.params.limit);
        let querySkip = parseInt(req.params.skip);
        let postName = req.params.post_name.toLowerCase();
        var next, prev;

        let count = await pageCount();
        let postNameCount = await Pages.count({ post_name: postName });
        let pagesResponse = await Pages.find({ post_name: postName }).limit(queryLimit).skip(querySkip)

        // Set the next and previouse query strings
        if(querySkip + queryLimit >= count) next = false; // Work out next
        else next = `/cms/page/${postName}/${queryLimit}/${querySkip + queryLimit}`
        if(querySkip - queryLimit <= 0) prev = false; // Work out prev
        else prev = `/cms/page/${postName}/${queryLimit}/${querySkip - queryLimit}`
        
        // Respond
        res.status(200).json({
            meta: {
                total_pages: count,
                total_of_same_post: postNameCount
            },
            data: pagesResponse,
            links: {
                self: {
                    request_type: 'GET',
                    query: `/cms/page/${postName}/${queryLimit}/${querySkip}`
                },
                first: {
                    request_type: 'GET',
                    query: `/cms/page/${postName}/${queryLimit}/0`
                },
                prev: {
                    request_type: 'GET',
                    query: prev
                },
                next: {
                    request_type: 'GET',
                    query: next
                }
            }
        })
    }
    catch(err) {
        res.status(500).json({
            error: err
        })
    }
}