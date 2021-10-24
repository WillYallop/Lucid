import axios from 'axios';

const state = () => ({
    pages: []
})
  
const mutations = {
    cmpa_addPage(state, page) {
        state.pages.push(page);
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
    cmpa_loadSinglePage({ state, commit }) {
        axios.get(`${process.env.API_URL}/cms/page`)
        .then((response) => {
            console.log(response.data);
        })
        .catch((err) => {
            console.log(err);
        })
    }
}

export default {
    state, 
    mutations,
    actions
}