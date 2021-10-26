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
router.get('/page', jsonParser, CmsPageController.get_single_page); // Get single/multiple pages
router.get('/page/:limit/:skip', jsonParser, CmsPageController.get_multiple_pages); // Get single/multiple pages
// Components
router.get('/components/:pageId', jsonParser, CmsComponentController.get_page_components); // Get all components that belong to a page.

module.exports = router;