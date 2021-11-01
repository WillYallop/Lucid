import axios from 'axios';

const state = () => ({
    
})
  
const mutations  = {

}

const actions = {
    cmth_verifyPostName({  }, name) {
        return new Promise((resolve, reject) => {
            axios.get(`${process.env.API_URL}/theme/post/verify/${name}`)
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
    }
}

export default {
    state, 
    mutations,
    actions
}