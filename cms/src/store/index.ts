import Vue from 'vue'
import Vuex from 'vuex'
import PersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

// Modules
import component from './modules/component'
import generate from './modules/generate'
import page from './modules/page'
import post from './modules/post'
import template from './modules/template'


export default new Vuex.Store({
  modules: {
    component,
    generate,
    page,
    post,
    template
  },
  plugins: [
    PersistedState({
      paths: [],
    })
  ]
})
