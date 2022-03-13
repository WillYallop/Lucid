// Key: gen_

// ---------------------
// -- NEW
// ---------------------
interface gen_generatePreviewConfig {
    data_mode: 'live' | 'provided'
    page_id: mod_pageModel["_id"]
    template: mod_pageModel["template"]
    location: string
    page_components: Array<{
        _id: mod_pageComponentsModel["_id"]
        component: {
            _id: mod_componentModel["_id"]
            file_path: mod_componentModel["file_path"]
            name: mod_componentModel["name"]
        }
        groups?: Array<mod_contentTypeFieldGroupModel>
        data?: Array<mod_contentTypesDatabaseModel>
    }>
}

// Template compiler
interface gen_templateCompilerProps {
    mode: 'site' | 'preview'
    relative_path: mod_pageModel["path"]
    template: mod_pageModel["template"]
    seo: mod_pageModel["seo"]
    components: gen_componentCompiledMap

    // Undecided!
    head: string
    footer: string
}

// Components comiler
interface gen_componentCompilerProps {
    component: {
        _id: mod_componentModel["_id"]
        page_component_id: mod_pageComponentsModel["_id"]
        file_path: mod_componentModel["file_path"]
        name: mod_componentModel["name"]
    }
    mode: 'site' | 'preview'
    relative_path: mod_pageModel["path"]
    content_types: Array<mod_contentTypesConfigModel>
    groups: Array<mod_contentTypeFieldGroupModel>
    data: Array<mod_contentTypesDatabaseModel>
}
type gen_componentCompiledMap = Map<mod_componentModel["_id"], {
    _id: mod_componentModel["_id"]
    page_component_id: mod_pageComponentsModel["_id"]
    markup: string,
    scriptConfig: Array<gen_islandScriptConfig>
}>

// Island script gen
interface gen_islandScriptConfig {
    id: string
    src: string
}

type gen_builtPagesMap = Map<mod_pageModel["_id"], {
    slug: mod_pageModel["slug"]
    markup: string
}>