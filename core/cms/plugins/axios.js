export default function ({ $axios, store }) {

    // Request interceptor
    $axios.interceptors.request.use((config) => {

        // Add loading indicator
        store.dispatch('colo_toggleLoadingState', {
            toggle: false,
            state: true
        });

        // Do something before request is sent
        return config;
    }, 
    (error) => {

        // Remove loading indicator
        store.dispatch('colo_toggleLoadingState', {
            toggle: false,
            state: false
        });

        // Do something with request error
        return Promise.reject(error);
    });

    // Add a response interceptor
    $axios.interceptors.response.use((response) => { 
        
        // Remove loading indicator
        store.dispatch('colo_toggleLoadingState', {
            toggle: false,
            state: false
        });

        return response; 
    }, 
    (error) => {

        // Remove loading indicator
        store.dispatch('colo_toggleLoadingState', {
            toggle: false,
            state: false
        });

        // return error
        return Promise.reject(error);
    });
}