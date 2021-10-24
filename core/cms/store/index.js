//  Plugins
import PersistedState from 'vuex-persistedstate'

// Modules - Core
import coreLoading from './modules/core/loading'
// Modules - CMS
import cmsPages from './modules/cms/pages'


export const state = () => ({

})

export const mutations = {

}

export const actions = {

}

export const modules = {
    coreLoading,
    cmsPages
}

export const plugins = [
    PersistedState({
        paths: [],
    }),
]