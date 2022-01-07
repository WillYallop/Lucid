import mongoose from 'mongoose';

const SeoSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    page_id: {
        type: String
    },
    title: {
        type: String
    },
    description: {
        type: String
    },
    og_title: {
        type: String
    },
    og_description: {
        type: String
    },
    og_image: {
        type: String
    }
});

export default mongoose.model('seo', SeoSchema);