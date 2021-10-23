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
        if(typeof data.toggle === 'boolean') commit('colo_setLoadingState', !state.loadingState);
        else {
            if(typeof data.state === 'boolean') commit('colo_setLoadingState', data.state);
            else commit('colo_setLoadingState', false);
        }
    }
}

export default {
    state, 
    mutations,
    actions
}