const state = () => ({
    
})
  
const mutations  = {

}

const actions = {
    cmth_verifyPostName({  }, name) {
        return new Promise((resolve, reject) => {
            this.$axios.get(`${process.env.API_URL}/theme/post/verify/${name}`)
            .then((res) => {
                resolve(res.data)
            })
            .catch((err) => {
                // Handle default error from request
                var errorMsgs = [];
                // Add custom errors from api
                if(err.response.data) {
                    if(err.response.data.errors.length) {
                        for(let i = 0; i < err.response.data.errors.length; i++) {
                            let error = err.response.data.errors[i];
                            let obj = {
                                status: error.status,
                                title: error.title,
                                source: 'cmth_verifyPostName',
                                response: error.detail
                            }
                            errorMsgs.push(obj)
                        } 
                    }
                }
                else {
                    let obj = {
                        status: err.response.status,
                        title: 'Request Error',
                        source: 'cmth_verifyPostName',
                        response: err.response
                    }
                    errorMsgs.push(obj)
                }
                errorMsgs.forEach((error) => {
                    console.error(error)
                });
                reject(err)
            })
        })
    },

    // ----------------------------------------------------------------------------------------------------//
    // --- Components -------------------------------------------------------------------------------------//
    // ----------------------------------------------------------------------------------------------------//
    cmth_getUnregisteredComponents({ }) {
        return new Promise((resolve, reject) => {
            this.$axios.get(`${process.env.API_URL}/theme/components/unregistered`)
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                let obj = {
                    status: err.response.status,
                    title: 'Request Error',
                    source: 'cmth_getUnregisteredComponents',
                    response: err.response
                }
                console.error(obj);
                reject(err)
            })
        })
    },
    cmth_getComponentsRegisterState({ }) {
        return new Promise((resolve, reject) => {
            this.$axios.get(`${process.env.API_URL}/theme/components/register-state`)
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                let obj = {
                    status: err.response.status,
                    title: 'Request Error',
                    source: 'cmth_getComponentsRegisterState',
                    response: err.response
                }
                console.error(obj);
                reject(err)
            })
        })
    },
    /**
     * Register a new component
     * @param {Object} component - The base component data to register.
     * @param {string} component.name - The components name.
     * @param {string} component.description - The components description.
     * @param {string} component.file_name - The file name the component can be found with in the theme directory.
     */
    cmth_registerComponent({}, component) {
        return new Promise((resolve, reject) => {
            this.$axios.post(`${process.env.API_URL}/theme/components`, component)
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                let obj = {
                    status: err.response.status,
                    title: 'Request Error',
                    source: 'cmth_registerComponent',
                    response: err.response
                }
                console.error(obj);
                reject(err)
            })
        })
    }
}

export default {
    state, 
    mutations,
    actions
}