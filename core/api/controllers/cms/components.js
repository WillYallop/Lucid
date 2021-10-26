const mongoose = require('mongoose');

// Models
const Components = require('../../models/components');

// ------------------------------------------------------------------------
// GET - return all page components for specific page
// ------------------------------------------------------------------------
exports.get_page_components = async (req, res, next) => {
    try {
        let componentResponse = await Components.find({ page_id: req.params.page_id });
        res.status(200).json({
            meta: {
              total_components: componentResponse.length,
              page_id: req.params.page_id
            },
            data: componentResponse,
            links: {
                self: `/cms/components/${req.params.page_id}`,
                page: `/cms/page/${req.params.page_id}`
            }
        });
    }
    catch(err) {
        res.status(500).json({
            error: err
        })
    }
}

// ------------------------------------------------------------------------
// POST - add a new page component
// ------------------------------------------------------------------------
exports.add_page_component = async (req, res, next) => {
    try {
        const component = new Components({
            _id: new mongoose.Types.ObjectId(),
            page_id: req.body.page_id,
            component_order: req.body.component_order,
            component_name: req.body.component_name,
            field_data: req.body.field_data
        });

        var componentResponse = await component.save();
        var totalPageComponents = await component.count({ page_id: req.body.page_id });

        res.status(200).json({
            meta: {
              total_components: totalPageComponents
            },
            data: componentResponse,
            links: {
                page_components: `/cms/components/${req.body.page_id}`,
                page: `/cms/page/${req.body.page_id}`
            }
          })
    }
    catch(err) {
        res.status(500).json({
            error: err
        })
    }
}