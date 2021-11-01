import axios from 'axios';

const state = () => ({
    totalPages: undefined,
    page: {}
})
  
const mutations = {
    // ----------------------------------------------------------------------------------------------------//
    // --- STATE: page ------------------------------------------------------------------------------------//
    // ----------------------------------------------------------------------------------------------------//
    cmpa_setPage(state, page) {
        state.page = page;
    },
    // ----------------------------------------------------------------------------------------------------//
    // --- STATE: totalPages ------------------------------------------------------------------------------//
    // ----------------------------------------------------------------------------------------------------//
    cmpa_setTotalPages(state, total) {
        state.totalPages = total;
    },
    // ----------------------------------------------------------------------------------------------------//
    // --- GENERAL ----------------------------------------------------------------------------------------//
    // ----------------------------------------------------------------------------------------------------//
    cmpa_stateMultiMutate(state, config) {
        // Includes:
        // action (push, set), state, item, data
        // Use:
        // Used to update objects data one level deep with various action types 
        if(config.action === 'push') {
            state[config.state][config.item].push(config.data);
        }
        if(config.action === 'set') {
            state[config.state][config.item] = config.data;
        }
    }
}

const actions = {
    // ----------------------------------------------------------------------------------------------------//
    // --- LOAD PAGES -------------------------------------------------------------------------------------//
    // ----------------------------------------------------------------------------------------------------//
    // Load multiple pages
    cmpa_loadMultiplePages({ state, commit }, data) {
        // Data
        // limit: int, skip: int
        axios.get(`${process.env.API_URL}/cms/pages/${data.limit}/${data.skip}`)
        .then((response) => {
            console.log(response.data);
        })
        .catch((err) => {
            console.log(err);
        })
    },
    // Load single page
    cmpa_loadSinglePage({ commit }, data) {
        // Includes:
        // slug, postName, type
        return new Promise((resolve, reject) => {
            axios.get(`${process.env.API_URL}/cms/page/${data.slug}/${data.type}/${data.postName}`)
            .then((res) => {
                commit('cmpa_setPage', res.data.data)
                commit('cmpa_setTotalPages', res.data.meta.total_pages)
                resolve(res.data)
            })
            .catch((err) => {
                let errorMsg = {
                    status: err.response.status,
                    title: 'Request Error',
                    source: 'cmpa_loadSinglePage',
                    response: err.response
                }
                console.error(errorMsg)
                reject(errorMsg)
            })
        })
    },

    // ----------------------------------------------------------------------------------------------------//
    // --- SAVE PAGES -------------------------------------------------------------------------------------//
    // ----------------------------------------------------------------------------------------------------//
    cmpa_saveNewPage({ state }, data) {

    }
}

export default {
    state, 
    mutations,
    actions
}