// Key: sch_

// MongoDB page components scheama
interface sch_pageDBComponent {
    _id: string
    page_id: mod_pageModel["_id"]
    component_id: mod_componentModel["_id"]
    component_data: Array<mod_contentTypesDatabaseModel>
}