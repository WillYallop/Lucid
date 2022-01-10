#!/usr/bin/env node
'use strict';
const { generator } = require('../dist/index');

const shell = require('shelljs');

// Command arguments
const [,, ...args] = process.argv;

// Run dev commands
let hasDev = args.find( x => x === '--dev' );
if(hasDev) shell.exec(`tsc-watch --onSuccess \"nodemon ${__dirname}/../dist/server.js\"`);

// Run start commands
let hasStart = args.find( x => x === '--start' );
if(hasStart) shell.exec(`tsc && node ${__dirname}/../dist/server.js`);




// Generate - generates the static app
// THIS IS TEMP
let hasGenerate = args.find( x => x === '--generate' );
if(hasGenerate) {
    const pagesData = [
        {
            _id: '1',
            template: 'page.liquid',
            slug: '/',
            name: 'Home',
            seo: {
                title: 'Meta Title',
                description: 'Meta Description',
                og_title: 'Meta OG Title',
                og_description: 'Meta OG Description',
                og_image: 'Meta OG Image'
            },
            components: [
                {  
                    _id: '1',
                    file_name: 'columns.liquid',
                    file_path: 'columns.liquid',
                    name: 'Columns',
                    content_types: [
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
        // {
        //     _id: '2',
        //     template: 'page.liquid',
        //     slug: '/blog',
        //     name: 'Blog',
        //     seo: {
        //         title: 'Meta Title',
        //         description: 'Meta Description',
        //         og_title: 'Meta OG Title',
        //         og_description: 'Meta OG Description',
        //         og_image: 'Meta OG Image'
        //     },
        //     components: [
        //         {  
        //             _id: '1',
        //             file_name: 'columns.liquid',
        //             file_path: 'columns.liquid',
        //             name: 'Columns',
        //             content_types: [
        //                 {
        //                     name: 'title',
        //                     data: 'I am the h1 title for blog page'
        //                 },
        //                 {
        //                     name: 'totalColumns',
        //                     data: 2
        //                 }
        //             ]
        //         }
        //     ]
        // },
    ]
    generator.generateApp(pagesData)
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.log(err);
    })
}