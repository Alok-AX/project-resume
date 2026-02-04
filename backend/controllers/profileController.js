const User = require('../models/User');

// @desc    Get user profile
// @route   GET /api/profile
// @access  Private
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.status(200).json({
      success: true,
      data: {
        fullName: user.fullName,
        email: user.email,
        professionalHeadline: user.professionalHeadline || '',
        location: user.location || '',
        linkedinUrl: user.linkedinUrl || '',
        bio: user.bio || '',
        profilePicture: user.profilePicture || '',
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching profile',
      error: error.message,
    });
  }
};

// @desc    Update user profile
// @route   PUT /api/profile
// @access  Private
exports.updateProfile = async (req, res) => {
  try {
    const {
      fullName,
      professionalHeadline,
      location,
      linkedinUrl,
      bio,
      profilePicture,
    } = req.body;

    // Validation
    const errors = [];

    if (fullName !== undefined) {
      if (!fullName || fullName.trim().length < 2) {
        errors.push('Full name must be at least 2 characters');
      }
      if (fullName.length > 50) {
        errors.push('Full name cannot exceed 50 characters');
      }
    }

    if (professionalHeadline !== undefined && professionalHeadline.length > 100) {
      errors.push('Professional headline cannot exceed 100 characters');
    }

    if (location !== undefined && location.length > 100) {
      errors.push('Location cannot exceed 100 characters');
    }

    if (linkedinUrl !== undefined && linkedinUrl.trim()) {
      const linkedinRegex = /^(https?:\/\/)?(www\.)?linkedin\.com\/(in|pub|company)\/[\w-]+\/?$/;
      if (!linkedinRegex.test(linkedinUrl)) {
        errors.push('Please provide a valid LinkedIn URL (e.g., linkedin.com/in/yourname)');
      }
    }

    if (bio !== undefined && bio.length > 500) {
      errors.push('Bio cannot exceed 500 characters');
    }

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: errors[0],
        errors,
      });
    }

    // Update user profile
    const updateData = {};
    if (fullName !== undefined) updateData.fullName = fullName.trim();
    if (professionalHeadline !== undefined) updateData.professionalHeadline = professionalHeadline.trim();
    if (location !== undefined) updateData.location = location.trim();
    if (linkedinUrl !== undefined) updateData.linkedinUrl = linkedinUrl.trim();
    if (bio !== undefined) updateData.bio = bio.trim();
    if (profilePicture !== undefined) updateData.profilePicture = profilePicture;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    ).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: {
        fullName: user.fullName,
        email: user.email,
        professionalHeadline: user.professionalHeadline || '',
        location: user.location || '',
        linkedinUrl: user.linkedinUrl || '',
        bio: user.bio || '',
        profilePicture: user.profilePicture || '',
        updatedAt: user.updatedAt,
      },
    });
  } catch (error) {
    console.error('Update profile error:', error);

    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: messages[0],
        errors: messages,
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error updating profile',
      error: error.message,
    });
  }
};
