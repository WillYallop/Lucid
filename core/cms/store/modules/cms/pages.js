import axios from 'axios';

const state = () => ({
    totalPages: undefined,
    page: null
})
  
const mutations = {
    cmpa_setPage(state, page) {
        state.page = page;
    },
    cmpa_setTotalPages(state, total) {
        state.totalPages = total;
    }
}

const actions = {
    // Load multiple pages
    cmpa_loadMultiplePages({ state, commit }, data) {
        // Data
        // limit: int, skip: int
        axios.get(`${process.env.API_URL}/cms/page/${data.limit}/${data.skip}`)
        .then((response) => {
            console.log(response.data);
        })
        .catch((err) => {
            console.log(err);
        })
    },
    // Load single page
    async cmpa_loadSinglePage({ commit }, pageID) {
        return new Promise((resolve, reject) => {
            axios.get(`${process.env.API_URL}/cms/page/${pageID}`)
            .then((res) => {
                commit('cmpa_setPage', res.data.data)
                commit('cmpa_setTotalPages', res.data.meta.total_pages)
                resolve(res.data)
            })
            .catch((err) => {
                reject({
                    status: err.response.status,
                    title: 'Request Error',
                    source: 'cmpa_loadSinglePage',
                    response: err.response
                })
            })
        })
    }
}

export default {
    state, 
    mutations,
    actions
}