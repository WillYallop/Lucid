
// Modules
const { 
    getUnregisteredComponents,
    getRegisteredComponents
} = require('../../../modules/util/components');

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