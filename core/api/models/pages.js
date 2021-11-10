const mongoose = require('mongoose');

const PageSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,

    template_name: { 
        type: String, 
        required: true 
    },
    page_name: { 
        type: String, 
        required: true
    },
    page_title: {
        type: String, 
        required: true,
        unique: true
    },
    slug: { 
        type: String, 
        unique: true, 
        required: true 
    },
    page_type: {
        type: String,
        enum : ['page','post'],
        required: true
    },
    post_name: {
        type: String,
        required: true,
        default: 'page'
    },

    parent_page: {
        type: String,
        default: '/'
    },
    parent_page_id: {
        type: String
    },

    date_created: {
        type: Date,
        required: true,
        default: new Date()
    },
    last_edited: {
        type: Date,
        required: true,
        default: new Date()
    },
    author: {
        type: String,
        required: true
    },
    is_homepage: {
        type: Boolean,
        required: true,
        default: false
    }

});

module.exports = mongoose.model('pages', PageSchema);