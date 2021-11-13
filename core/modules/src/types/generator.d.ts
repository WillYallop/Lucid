// KEY gen_

// getPageList
type gen_pageListRes = Array<[string, string]>

// Save all pages
type gen_pagseMap = Map<string, {
    slug: string
    path: string
    markup: string
}>

// compilePage
interface gen_compilePage {
    template: {
        markup: string
    },
    seo: {
        title: string
        description: string
    }
    components: gen_componentsMap
    head: string
    footer: string
}

// generateComponents 
type gen_componentsMap = Map<string, {
    id: string
    markup: string
}>

// generateTemplates
type gen_templatesMap = Map<string, {
    markup: string
}>