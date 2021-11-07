// This route is used to handle getting theme data

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

// create application/json parser
var jsonParser = bodyParser.json()

// Controller
const ThemeTemplateController = require('../controllers/theme/template');
const ThemeLayoutController = require('../controllers/theme/layout');
const ThemePostController = require('../controllers/theme/post');
const ThemeComponentController = require('../controllers/theme/component');

// Template
router.get('/templates', jsonParser, ThemeTemplateController.get_theme_templates);
// Layouts
router.get('/layouts', jsonParser, ThemeLayoutController.get_theme_layouts);
// Posts
router.get('/posts', jsonParser, ThemePostController.get_theme_posts); // Get a list of alll valid and non valid post types
router.get('/post/verify/:post_name', jsonParser, ThemePostController.verify_post_name); // verify whether the given post name exists in the config
// Components
router.get('/components/unregistered', jsonParser, ThemeComponentController.get_unregistered_components); // Return a list of all unregistered components
router.get('/components/register-state', jsonParser, ThemeComponentController.get_component_registered_state); // Return a list of file names for registered and unregistered componenets

module.exports = router;

