const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
  jobTitle: { type: String, required: true },
  company: { type: String, required: true },
  location: String,
  startDate: { type: String, required: true }, // e.g., "Jan 2023"
  endDate: String, // e.g., "Present" or "Dec 2023"
  isCurrent: { type: Boolean, default: false },
  description: String,
  achievements: [String],
}, { _id: true });

const educationSchema = new mongoose.Schema({
  school: { type: String, required: true },
  degree: { type: String, required: true },
  field: String,
  startDate: String,
  endDate: String,
  city: String,
  gpa: String,
  description: String,
}, { _id: true });

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  technologies: [String],
  link: String,
  startDate: String,
  endDate: String,
}, { _id: true });

const resumeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  
  // Resume metadata
  title: {
    type: String,
    required: true,
    trim: true,
  },
  
  // Personal Details
  personalInfo: {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, trim: true },
    location: { type: String, trim: true },
    website: { type: String, trim: true },
    linkedin: { type: String, trim: true },
    profilePhoto: String, // Base64 or URL
  },
  
  // Professional Summary
  summary: {
    type: String,
    maxlength: 800,
  },
  
  // Work Experience
  experiences: [experienceSchema],
  
  // Education
  education: [educationSchema],
  
  // Projects
  projects: [projectSchema],
  
  // Skills
  skills: [String],
  
  // Template selection
  templateId: {
    type: String,
    default: 'modern-classic',
  },
  
  // Status
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'draft',
  },
  
  // Metadata
  lastModified: {
    type: Date,
    default: Date.now,
  },
  
}, {
  timestamps: true,
});

// Update lastModified on save
resumeSchema.pre('save', function(next) {
  this.lastModified = Date.now();
  next();
});

// Indexes
resumeSchema.index({ user: 1, createdAt: -1 });
resumeSchema.index({ user: 1, status: 1 });

const Resume = mongoose.model('Resume', resumeSchema);

module.exports = Resume;
