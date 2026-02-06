const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  createResume,
  getResumes,
  getResumeById,
  updateResume,
  deleteResume,
  duplicateResume,
} = require('../controllers/resumeController');

// All routes require authentication
router.use(protect);

// Resume CRUD routes
router.route('/')
  .post(createResume)     // Create new resume
  .get(getResumes);        // Get all user's resumes

router.route('/:id')
  .get(getResumeById)      // Get single resume
  .put(updateResume)       // Update resume
  .delete(deleteResume);   // Delete resume

router.post('/:id/duplicate', duplicateResume); // Duplicate resume

module.exports = router;
