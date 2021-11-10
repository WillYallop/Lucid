const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

// create application/json parser
var jsonParser = bodyParser.json()

// Controller
const CmsPageController = require('../controllers/cms/page');
const CmsComponentController = require('../controllers/cms/components');

// Pages
router.post('/page', jsonParser, CmsPageController.add_new_page);
router.get('/page/:type/:page_title/:post_name', jsonParser, CmsPageController.get_single_page); // Get single/multiple pages
router.get('/pages/:post_name/:limit/:skip', jsonParser, CmsPageController.get_multiple_pages); // Get multiple pages / posts
// Components
router.get('/components/:page_id', jsonParser, CmsComponentController.get_page_components); // Get all components that belong to a page.
router.post('/components', jsonParser, CmsComponentController.add_page_component); // Create a new componenet entry for specific page

module.exports = router;