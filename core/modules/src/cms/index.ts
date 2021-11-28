{
    
    // Handlers
    const componentHandler = require('./handlers/component');


    enum types {
        Component = 'component',
        Page = 'page'
    }

    const deleteSingle = async (type: types) => {
        if(type === 'component') componentHandler.deleteSingle();
    }

    const updateSingle = async (type: types) => {
        if(type === 'component') componentHandler.updateSingle();
    }

    const saveSingle = async (type: types, data: any) => {
        if(type === 'component') componentHandler.saveSingle();
    }

    module.exports = {
        saveSingle,
        updateSingle,
        deleteSingle
    }

}



// EXAMPLE USE CASE

// cms.saveSingle('component', {
//     // component data
// })

