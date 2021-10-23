// This route is used to handle getting theme data

const express = require('express');
const router = express.Router();

// Controller
const ThemeController = require('../controllers/theme');

router.get('/templates', ThemeController.get_theme_templates);
router.get('/layouts', ThemeController.get_theme_layouts);
router.get('/posts', ThemeController.get_theme_posts);

module.exports = router;