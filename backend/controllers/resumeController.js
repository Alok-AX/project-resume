const Resume = require('../models/Resume');

// @desc    Create a new resume
// @route   POST /api/resumes
// @access  Private
exports.createResume = async (req, res) => {
  try {
    const {
      title,
      personalInfo,
      summary,
      experiences,
      education,
      projects,
      skills,
      templateId,
      status
    } = req.body;

    // Validation
    if (!title || !personalInfo || !personalInfo.fullName || !personalInfo.email) {
      return res.status(400).json({
        success: false,
        message: 'Please provide resume title, name, and email',
        errors: ['Resume title, full name, and email are required'],
      });
    }

    // Create resume
    const resume = await Resume.create({
      user: req.user._id,
      title,
      personalInfo,
      summary: summary || '',
      experiences: experiences || [],
      education: education || [],
      projects: projects || [],
      skills: skills || [],
      templateId: templateId || 'modern-classic',
      status: status || 'draft',
    });

    res.status(201).json({
      success: true,
      message: 'Resume created successfully',
      data: resume,
    });
  } catch (error) {
    console.error('Create resume error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create resume',
      errors: [error.message],
    });
  }
};

// @desc    Get all user's resumes
// @route   GET /api/resumes
// @access  Private
exports.getResumes = async (req, res) => {
  try {
    const { status, limit = 50, page = 1 } = req.query;

    const query = { user: req.user._id };
    if (status) {
      query.status = status;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const resumes = await Resume.find(query)
      .sort({ lastModified: -1, createdAt: -1 })
      .limit(parseInt(limit))
      .skip(skip)
      .select('-__v');

    const total = await Resume.countDocuments(query);

    res.status(200).json({
      success: true,
      data: resumes,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    console.error('Get resumes error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch resumes',
      errors: [error.message],
    });
  }
};

// @desc    Get single resume by ID
// @route   GET /api/resumes/:id
// @access  Private
exports.getResumeById = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      user: req.user._id,
    }).select('-__v');

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: 'Resume not found',
        errors: ['Resume not found or access denied'],
      });
    }

    res.status(200).json({
      success: true,
      data: resume,
    });
  } catch (error) {
    console.error('Get resume error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch resume',
      errors: [error.message],
    });
  }
};

// @desc    Update resume
// @route   PUT /api/resumes/:id
// @access  Private
exports.updateResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: 'Resume not found',
        errors: ['Resume not found or access denied'],
      });
    }

    // Update fields
    const allowedFields = [
      'title',
      'personalInfo',
      'summary',
      'experiences',
      'education',
      'projects',
      'skills',
      'templateId',
      'status',
    ];

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        resume[field] = req.body[field];
      }
    });

    await resume.save();

    res.status(200).json({
      success: true,
      message: 'Resume updated successfully',
      data: resume,
    });
  } catch (error) {
    console.error('Update resume error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update resume',
      errors: [error.message],
    });
  }
};

// @desc    Delete resume
// @route   DELETE /api/resumes/:id
// @access  Private
exports.deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: 'Resume not found',
        errors: ['Resume not found or access denied'],
      });
    }

    await resume.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Resume deleted successfully',
    });
  } catch (error) {
    console.error('Delete resume error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete resume',
      errors: [error.message],
    });
  }
};

// @desc    Duplicate resume
// @route   POST /api/resumes/:id/duplicate
// @access  Private
exports.duplicateResume = async (req, res) => {
  try {
    const original = await Resume.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!original) {
      return res.status(404).json({
        success: false,
        message: 'Resume not found',
        errors: ['Resume not found or access denied'],
      });
    }

    const duplicate = await Resume.create({
      user: req.user._id,
      title: `${original.title} (Copy)`,
      personalInfo: original.personalInfo,
      summary: original.summary,
      experiences: original.experiences,
      education: original.education,
      projects: original.projects,
      skills: original.skills,
      templateId: original.templateId,
      status: 'draft',
    });

    res.status(201).json({
      success: true,
      message: 'Resume duplicated successfully',
      data: duplicate,
    });
  } catch (error) {
    console.error('Duplicate resume error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to duplicate resume',
      errors: [error.message],
    });
  }
};
