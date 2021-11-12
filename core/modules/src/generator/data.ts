{

    // --------- !! IMPORTANT !! --------- //
    // ALL OF THESE USE MOCK DATA FOR TESTING PURPOSES



    // Return list of all page/post IDs and their template
    const getPageList = async (): Promise<gen_pageListRes> => {

        return [
            ['12345', 'page.twig']
        ]
    }

    // Get data for a single page
    const getPage = async (pageConfig: gen_pageListRes): Promise<mod_pageData> => {

        // find page based on pageConfig
        // Return all of page data.

        return {
            id: '12345',
            template: 'page.twig',
            slug: '/',
            name: 'Home',
            seo: {
                title: 'HOME PAGE',
                description: 'I AM A HOME PAGE'
            },
            components: [
                {  
                    id: '12',
                    file_name: 'columns.twig',
                    name: 'Columns',
                    description: 'I have some columns',
                    preview_url: '',
                    date_added: '10/02/1999',
                    date_modified: '10/02/1999',
                    fields: [
                        {
                            name: 'title',
                            data: 'I am the h1 title'
                        },
                        {
                            name: 'totalColumns',
                            data: 4
                        }
                    ]
                }
            ]
        }
    }   

    module.exports = {
        getPageList,
        getPage
    }
}