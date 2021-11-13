{

    // --------- !! IMPORTANT !! --------- //
    // ALL OF THESE USE MOCK DATA FOR TESTING PURPOSES



    // Return list of all page/post IDs and their template
    const getPageList = async (): Promise<gen_pageListRes> => {

        return [
            ['1', 'page.twig'],
            ['2', 'page.twig'],
        ]
    }

    // Get data for a single page
    const getPage = async (pageConfig: Array<string>) => {
        // find page based on pageConfig
        // Return all of page data.
        const pagesData: Array<mod_pageData> = [
            {
                id: '1',
                template: 'page.twig',
                slug: '/',
                path: '/index.html',
                name: 'Home',
                seo: {
                    title: 'HOME PAGE',
                    description: 'I AM A HOME PAGE'
                },
                components: [
                    {  
                        id: '1',
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
            },
            {
                id: '2',
                template: 'page.twig',
                slug: '/blog',
                path: '/blog/index.html',
                name: 'Blog',
                seo: {
                    title: 'BLOG PAGE',
                    description: 'I AM A BLOG PAGE'
                },
                components: [
                    {  
                        id: '1',
                        file_name: 'columns.twig',
                        name: 'Columns',
                        description: 'I have some columns',
                        preview_url: '',
                        date_added: '10/02/1999',
                        date_modified: '10/02/1999',
                        fields: [
                            {
                                name: 'title',
                                data: 'I am the h1 title for blog page'
                            },
                            {
                                name: 'totalColumns',
                                data: 2
                            }
                        ]
                    }
                ]
            },
        ]
        let page = pagesData.find( x => x.id === pageConfig[0] )
        if(page) {
            return page
        }
    }   

    module.exports = {
        getPageList,
        getPage
    }
}