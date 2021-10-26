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
    field_data: {
        type: Array
    }


});

module.exports = mongoose.model('pageComponents', ComponentSchema);