const path = require('path');

const themeDirectory = path.resolve(__dirname, '../../../theme');
const configPostTypes = require(`${themeDirectory}/config/post-types.json`);

// Modules
const verifyFileExists = require('../../../generator/util/verify-file');

// ------------------------------------ ------------------------------------
// GET - get list of valid post types
// ------------------------------------ ------------------------------------
exports.get_theme_posts = (req, res, next) => {
    // Verify post name isnt a duplicate - if it is we cannot use it.
    // Verify the template_name given exists
    var validPosts = [];
    var nonValidPosts = [];

    for(let i = 0; i < configPostTypes.length; i++) {
        let post = configPostTypes[i];

        // Check if the post has a valid post.name
        if(typeof post.name != 'string') {
            nonValidPosts.push({
                postObject: post,
                error: `Make sure your posts entries in post-types.json include a post.name of the type "string"!`
            });
            continue;
        }
        // Check if the post has a valid post.name
        if(typeof post.template_name != 'string') {
            nonValidPosts.push({
                postObject: post,
                error: `Make sure your posts entries in post-types.json include a post.template_name of the type "string"!`
            });
            continue;
        }

        // Check if validPosts already contains a matching post name
        let foundMatch = validPosts.find(x => x.name === post.name);
        if(foundMatch) {
            nonValidPosts.push({
                postObject: post,
                error: `Duplicate post name of ${post.name} found in post-types.json file!`
            });
        }
        else {
            if(verifyFileExists(`${themeDirectory}/templates/${post.template_name}`)) validPosts.push(post);
            else {
                nonValidPosts.push({
                    postObject: post,
                    error: `Template name of ${post.template_name} cannot be found in the theme/layouts directory!`
                });
            }
        }
    }

    res.status(200).json({
        posts: validPosts,
        failed: nonValidPosts
    });
}

// ------------------------------------ ------------------------------------
// GET - verify if the given post name exists
// ------------------------------------ ------------------------------------
exports.verify_post_name = async (req, res, next) => {
    // Grab names of all templates in theme/templates directory
    var postName = req.params.post_name.toLowerCase();
    if(postName === 'page') {
        res.status(200).json({
            data: {
                exists: true,
                type: 'page',
                post_name: false
            },
            links: [

            ]
        })
    } 
    else {
        let findPostName = configPostTypes.find( x => x.name === postName);
        if(findPostName) {
            res.status(200).json({
                data: {
                    exists: true,
                    type: 'post',
                    post_name: postName
                },
                links: [
    
                ]
            })
        }
        else {
            res.status(404).json({
                data: {
                    exists: false,
                    type: false,
                    post_name: postName
                },
                errors: [
                    {
                        status: 404,
                        title:  'Post Name Doesnt Exist',
                        detail: `A post with the name of "${postName}" does not exist in the "theme/config/post-types.json" file!`
                    }
                ]
            })
        }
    } 
}