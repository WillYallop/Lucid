//  Plugins
import PersistedState from 'vuex-persistedstate'

// Modules - Core
import coreLoading from './modules/core/loading'
// Modules - CMS
import cmsPages from './modules/cms/pages'
import cmsTheme from './modules/cms/theme'


export const state = () => ({

})

export const mutations = {

}

export const actions = {

}

export const modules = {
    coreLoading,
    cmsPages,
    cmsTheme
}

export const plugins = [
    PersistedState({
        paths: [],
    }),
]