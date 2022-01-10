import { validate, componentController, postsController, themeController, generator, contentTypeController, menuController } from './index';

// menuController.deleteMenu('dc1c1770-6653-11ec-89d2-a929c88c3c26')
// .then((res) => {
//     console.log(res);
// })

// menuController.updateMenu('46b45741-6655-11ec-bb74-bd3b83d7f47e', {
//     name: 'Footer Menu'
// })
// .then((res) => {
//     console.log(res);
// })

// menuController.createMenu({
//     name: 'Header Menu',
//     links: [
//         {
//             text: 'Home',
//             blank: false,
//             external: false,
//             page_id: '123'
//         },
//         {
//             text: 'About Us',
//             blank: false,
//             external: false,
//             page_id: '3434'
//         },
//         {
//             text: 'Contact',
//             blank: false,
//             external: false,
//             page_id: '5453'
//         },        {
//             text: 'Blogs',
//             blank: false,
//             external: false,
//             page_id: '543543'
//         },
//         {
//             text: 'Github',
//             blank: true,
//             external: true,
//             page_id: '123',
//             external_url: 'https://github.com'
//         }
//     ]
// })
// .then((res) => {
//     console.log(res);
// })


// contentTypeController.updateSingle('4c46db90-6431-11ec-b15b-0b09a8ee2287', {
//     id: '445a92a0-64fe-11ec-aab2-15b263b74864',
//     name: 'test_text_two',
//     config: {
//         max_length: 20
//     }
// })
// .then((res) => {
//     console.log(res);
// })

// contentTypeController.deleteSingle('4c46db90-6431-11ec-b15b-0b09a8ee2287', '445a92a0-64fe-11ec-aab2-15b263b74864')
// .then((res) => {
//     console.log(res);
// })

// contentTypeController.getAll('4c46db90-6431-11ec-b15b-0b09a8ee2287')
// .then((res) => {
//     console.log(res);
// })

// contentTypeController.saveSingle('74cd38a0-6415-11ec-bc21-d53d7ba49e21', {
//     name: 'test_repeater',
//     type: 'repeater',
//     config: {
//         max_repeats: 10
//     },
//     fields: [
//         {
//             name: 'test_text_two',
//             type: 'text',
//             config: {
//                 max_length: 20,
//                 min_length: 400
//             }
//         },
//         {
//             name: 'test_number_two',
//             type: 'number',
//             config: {

//             }
//         },
//     ]
// })
// .then((res) => {
//     console.log(res);
// })

// postsController.addPostType('blogs', 'page.liquid')
// .then((response) => {
//     console.log(response);
// })

// postsController.removePostType('3e98dc00-59b0-11ec-a4b9-1f39fe093f9a')
// .then((response) => {
//     console.log(response);
// })


// const pagesData: Array<gen_generateAppInp> = [
//     {
//         _id: '1',
//         template: 'page.liquid',
//         slug: '/',
//         name: 'Home',
//         seo: {
//             title: 'HOME PAGE',
//             description: 'I AM A HOME PAGE'
//         },
//         components: [
//             {  
//                 _id: '1',
//                 file_name: 'columns.liquid',
//                 file_path: 'columns.liquid',
//                 name: 'Columns',
//                 content_types: [
//                     {
//                         name: 'title',
//                         data: 'I am the h1 title'
//                     },
//                     {
//                         name: 'totalColumns',
//                         data: 4
//                     }
//                 ]
//             }
//         ]
//     },
//     {
//         _id: '2',
//         template: 'page.liquid',
//         slug: '/blog',
//         name: 'Blog',
//         seo: {
//             title: 'BLOG PAGE',
//             description: 'I AM A BLOG PAGE'
//         },
//         components: [
//             {  
//                 _id: '1',
//                 file_name: 'columns.liquid',
//                 file_path: 'columns.liquid',
//                 name: 'Columns',
//                 content_types: [
//                     {
//                         name: 'title',
//                         data: 'I am the h1 title for blog page'
//                     },
//                     {
//                         name: 'totalColumns',
//                         data: 2
//                     }
//                 ]
//             }
//         ]
//     },
// ]

// generator.generateApp(pagesData)
// .then((res) => {
//     console.log(res);
// })
// .catch((err) => {
//     console.log(err);
// })


// generator.generateComponents([
//     {  
//         id: '1',
//         file_name: 'columns.liquid',
//         file_path: 'columns.liquid',
//         name: 'Columns',
//         fields: [
//             {
//                 name: 'title',
//                 data: 'I am the h1 title'
//             },
//             {
//                 name: 'totalColumns',
//                 data: 4
//             }
//         ]
//     }
// ])
// .then((res) => {
//     console.log(res);
// })
// .catch((err) => {
//     console.log(err);
// })

// // SAVE COMPONENT
// componentController.saveSingle({
//     name: 'test',
//     description: 'This is a test component!',
//     file_path: 'home/header.liquid'
// })
// .then((res) => {
//     console.log(res);
// })

// // UPDATE COMPONENT
// componentController.updateSingle('ad391730-552a-11ec-9ccc-551e7e08e9cd', {
//     name: 'testing',
//     description: 'This is a test component!'
// })
// .then((res) => {
//     console.log(res);
// })

// DELETE COMPONENT
// componentController.deleteSingle('ad391730-552a-11ec-9ccc-551e7e08e9cd')
// .then((res) => {
//     console.log(res);
// })

// TEST VALIDATE
// async function testValidate() {
//     let verifyData = await validate([
//         {
//             method: 'comp_name',
//             value: 'I am a title'
//         },
//         {
//             method: 'comp_description',
//             value: 'I am a description!-.'
//         },
//         {
//             method: 'comp_verifyFileExists',
//             value: 'test.liquid'
//         }
//     ]);
//     console.log(verifyData);
// }
// testValidate();