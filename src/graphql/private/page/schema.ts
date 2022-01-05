import mongoose from 'mongoose';

const PageSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    template: { 
        type: String, 
        required: true 
    },
    slug: { 
        type: String, 
        unique: true, 
        required: true 
    },
    name: {
        type: String, 
        required: true
    },
    type: {
        type: String,
        enum : ['page','post'],
        required: true
    },
    post_name: {
        type: String
    },
    has_parent: {
        type: Boolean
    },
    parent_id: {
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

export default mongoose.model('pages', PageSchema);