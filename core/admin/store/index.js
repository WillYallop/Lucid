//  Plugins
import PersistedState from 'vuex-persistedstate'

// Modules - Core
import coreLoading from './modules/core/loading'


export const state = () => ({

})

export const mutations = {

}

export const actions = {

}

export const modules = {
    coreLoading
}

export const plugins = [
    PersistedState({
        paths: [],
    }),
]