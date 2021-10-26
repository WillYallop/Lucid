const mongoose = require('mongoose');

// Models
const Components = require('../../models/components');

// ------------------------------------ ------------------------------------
// GET - return all page components for specific page
// ------------------------------------ ------------------------------------

exports.get_page_components = async (req, res, next) => {
    try {
        let componentResponse = await Components.find({ page_id: req.params.pageId });
        res.status(200).json({
            meta: {
              total_components: componentResponse.length,
              page_id: req.params.pageId
            },
            data: componentResponse,
            links: {
                self: `/cms/components/${req.params.pageId}`,
                page: `/cms/page/${req.params.pageId}`
            }
        });
    }
    catch(err) {
        res.status(500).json({
            error: err
        })
    }
}