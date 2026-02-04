const express = require('express');
const router = express.Router();
const { getProfile, updateProfile } = require('../controllers/profileController');
const { protect } = require('../middleware/auth');

// All routes require authentication
router.use(protect);

// @route   GET /api/profile
// @desc    Get user profile
router.get('/', getProfile);

// @route   PUT /api/profile
// @desc    Update user profile
router.put('/', updateProfile);

module.exports = router;
