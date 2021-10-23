const mongoose = require('mongoose');

const PageSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    template_name: { type: String, required: true },
    layout_name: { type: String, required: true },
    page_name: { type: String, required: true },
    page_slug: { type: String, required: true }
});

module.exports = mongoose.model('pages', PageSchema);