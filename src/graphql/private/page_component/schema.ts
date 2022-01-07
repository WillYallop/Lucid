import mongoose from 'mongoose';

const PageComponentSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    page_id: {
        type: String
    },
    component_id: {
        type: String
    },
    component_data: {
        type: Array
    }
});

export default mongoose.model('page_components', PageComponentSchema);