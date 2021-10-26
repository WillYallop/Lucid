const mongoose = require('mongoose');

const ComponentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,

    page_id: { 
        type: String, 
        required: true 
    },
    component_order: { 
        type: Number, 
        required: true 
    },
    component_name: {
        type: String,
        required: true
    },
    // This may change
    field_data: {
        type: Array
    }

});

module.exports = mongoose.model('components', ComponentSchema);