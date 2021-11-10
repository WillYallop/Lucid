'use strict';

// Modules
const { getUnregisteredComponents, getRegisteredComponents, registerNewComponent } = require('../../../modules/dist/components');

// ------------------------------------ ------------------------------------
// GET - get a list of unregistered components
// ------------------------------------ ------------------------------------
exports.get_unregistered_components = async (req, res, next) => {
    try {
        let unregisteredComponents = await getUnregisteredComponents();
        res.status(200).json({
            meta: {
                has_components: unregisteredComponents.has_components,
                total_unregistered: unregisteredComponents.unregistered.length
            },
            data: unregisteredComponents.unregistered
        })
    }
    catch(err) {
        res.status(500).json({
            error: err
        })
    }
}

// ------------------------------------ ------------------------------------
// GET - get a list of unregistered and registered component names
// ------------------------------------ ------------------------------------
exports.get_component_registered_state = async (req, res, next) => {
    try {
        let registeredComponents = await getRegisteredComponents('names');
        res.status(200).json({
            meta: {
                has_components: registeredComponents.has_components,
                total_unregistered: registeredComponents.unregistered.length,
                total_registered: registeredComponents.registered.length
            },
            data: {
                unregistered: registeredComponents.unregistered,
                registered: registeredComponents.registered
            }
        })
    }
    catch(err) {
        res.status(500).json({
            error: err
        })
    }
}

// ------------------------------------ ------------------------------------
// POST - get a list of unregistered and registered component names
// ------------------------------------ ------------------------------------
exports.register_new_component = async (req, res, next) => {
    try {

        // name: String, description: String, file_name: String
        let registerComponentRes = await registerNewComponent({
            name: req.body.name,
            description: req.body.description,
            file_name: req.body.file_name
        })
        
        if(!registerComponentRes.valid) {
            res.status(500).json({
                meta: {
                    valid: false
                },
                errors: registerComponentRes.errors
            })
        } 
        else {
            res.status(200).json({
                meta: {
                    valid: true
                },
                data: registerComponentRes.component
            })
        }
     
    }
    catch(err) {
        res.status(500).json({
            error: err
        })
    }
}