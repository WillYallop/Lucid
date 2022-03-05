import { createContext } from "react";

// ---------------------------------------
// Page Object
// ---------------------------------------
interface pageContextInt {
    page: mod_pageModel,
    setPage?: any
}
export const defaultState = { 
    page: {} as mod_pageModel
}
export const PageContext = createContext<Partial<pageContextInt>>(defaultState);


// ---------------------------------------
// Updated Data Obj for page
// ---------------------------------------
interface updatedDataContextInt {
    updatedData: updateDataObjInterface,
    setUpdatedData?: any
}
export const defaultUpdateDataObj: updatedDataContextInt = {
    updatedData: {
        template: false,
        componentPositions: false,
        addComponents: [],
        modifiedComponents: [],
        deleteComponents: [],
        deleteGroups: [],
        pageComponentDownloaded: []
    }
};
export const UpdatedDataContext = createContext<Partial<updatedDataContextInt>>(defaultUpdateDataObj);


// ---------------------------------------
// Page preview markup data
// ---------------------------------------
export interface pageMarkupContextInt {
    markupObj: {
        template: string
        components: Array<{
            _id: string
            markup: string
        }>
    }
    setMarkupObj?: any
}
export const defaultPageMarkupContextInt: pageMarkupContextInt = {
    markupObj: {
        template: '',
        components: []
    }
};
export const PageMarkupContext = createContext<Partial<pageMarkupContextInt>>(defaultPageMarkupContextInt);