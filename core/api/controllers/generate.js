const { generateApp } = require('../../modules/dist/generate')


const {TwingEnvironment, TwingLoaderFilesystem} = require('twing');
const path = require('path');
const componentsDir = path.resolve(__dirname, '../../theme/components');
const templateDir = path.resolve(__dirname, '../../theme/templates');
let loader = new TwingLoaderFilesystem([componentsDir, templateDir]);
let twing = new TwingEnvironment(loader);

function format(html) {
    return html.replace(/\r?\n|\rs/g, '');
    // return res.replace(/\s/g, ' ').trim()
}


// Build out all components for every page
// Build out the template pages
// Then
// Search the template page for a few custom tags ie: willpress, willpressHead, willpressFooter
// Replace willpress with all of the components for that page.


exports.generate_app = async (req, res, next) => {
    let generateAppRes = await generateApp();
    const obj = Object.fromEntries(generateAppRes);
    res.send( obj['12345'].markup )
}


exports.generate_component = (req, res, next) => {
    const data = {
        name: 'test'
    }
    twing.render('columns.twig', data)
    .then((output) => {
        res.status(200).json({
            html: format(output)
        })
    });
}


exports.generate_page = (req, res, next) => {
    const data = {
        content: '<div class=\"grid\"><h1>Hello test!</h1><div><h2>0</h2><h2>1</h2><h2>2</h2><h2>3</h2></div></div>'
    }
    twing.render('page.twig', data)
    .then((output) => {
        res.status(200).json({
            html: format(output)
        })
    });
}