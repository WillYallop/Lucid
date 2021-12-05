import express from 'express';
import * as lucid from 'lucid-core';
const router = express.Router();

router.get('/', express.json(), (req, res, next) => {
    const pagesData: Array<mod_pageModel> = [
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
    lucid.generateApp(pagesData)
    .then((response) => {
        res.status(200).json(response);
    })
    .catch((err) => {
        console.log(err);
    })
})

module.exports = router;