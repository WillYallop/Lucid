var loadingStateTimeout;

const state = () => ({
    loadingState: false

})
  
const mutations = {
    colo_setLoadingState(state, bool) {
        state.loadingState = bool;
    }
}

const actions = {
    colo_toggleLoadingState({ state, commit }, data) {
        // data: 
        // toggle: Boolean, state: Boolean
        var bool;
        // Set bool
        if(typeof data.toggle === 'boolean') bool = !state.loadingState;
        else {
            if(typeof data.state === 'boolean') bool = data.state;
            else bool = false;
        }

        // Mutate loading state;
        // timeout craete a min duration the spinner should display
        if(!bool) {
            loadingStateTimeout = setTimeout(() => {
                commit('colo_setLoadingState', bool)  
            }, 300)
        }
        else {
            clearTimeout(loadingStateTimeout);
            commit('colo_setLoadingState', bool)  
        }
    }
}

export default {
    state, 
    mutations,
    actions
}