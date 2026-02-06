'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '@/store';
import { fetchProfile } from '@/store/slices/profileSlice';
import { createResume, updateResume, fetchResumeById, clearCurrentResume } from '@/store/slices/resumeSlice';
import { showSuccess, showError, showErrorFromException } from '@/utils/toast';

type Tab = 'personal' | 'summary' | 'experience' | 'education' | 'projects' | 'skills';

const tabs = [
  { id: 'personal', label: 'Personal Details', icon: '👤' },
  { id: 'summary', label: 'Summary', icon: '📝' },
  { id: 'experience', label: 'Experience', icon: '💼' },
  { id: 'education', label: 'Education', icon: '🎓' },
  { id: 'projects', label: 'Projects', icon: '🚀' },
  { id: 'skills', label: 'Skills', icon: '⚡' },
] as const;

export default function NewResumePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();
  const resumeId = searchParams.get('id');
  
  const { profile } = useSelector((state: RootState) => state.profile);
  const { currentResume, createLoading, updateLoading } = useSelector((state: RootState) => state.resume);
  
  const [activeTab, setActiveTab] = useState<Tab>('personal');
  const [isSaving, setIsSaving] = useState(false);
  const [resumeTitle, setResumeTitle] = useState('Untitled Resume');
  const [formData, setFormData] = useState({
    // Personal
    fullName: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    linkedin: '',
    profilePhoto: '',
    
    // Summary
    summary: '',
    
    // Experience
    experiences: [] as any[],
    
    // Education
    education: [] as any[],
    
    // Projects
    projects: [] as any[],
    
    // Skills
    skills: [] as string[],
  });

  // Fetch profile data on mount
  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  // Fetch existing resume if editing
  useEffect(() => {
    if (resumeId) {
      dispatch(fetchResumeById(resumeId));
    }
    return () => {
      dispatch(clearCurrentResume());
    };
  }, [resumeId, dispatch]);

  // Prefill from profile data
  useEffect(() => {
    if (profile && !resumeId && !formData.fullName) {
      setFormData(prev => ({
        ...prev,
        fullName: profile.fullName || '',
        email: profile.email || '',
        phone: prev.phone || '',
        location: profile.location || '',
        linkedin: profile.linkedinUrl || '',
        profilePhoto: profile.profilePicture || '',
      }));
    }
  }, [profile, resumeId]);

  // Load existing resume data
  useEffect(() => {
    if (currentResume && resumeId) {
      setResumeTitle(currentResume.title || 'Untitled Resume');
      setFormData({
        fullName: currentResume.personalInfo?.fullName || '',
        email: currentResume.personalInfo?.email || '',
        phone: currentResume.personalInfo?.phone || '',
        location: currentResume.personalInfo?.location || '',
        website: currentResume.personalInfo?.website || '',
        linkedin: currentResume.personalInfo?.linkedin || '',
        profilePhoto: currentResume.personalInfo?.profilePhoto || '',
        summary: currentResume.summary || '',
        experiences: currentResume.experiences || [],
        education: currentResume.education || [],
        projects: currentResume.projects || [],
        skills: currentResume.skills || [],
      });
    }
  }, [currentResume, resumeId]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleClearForm = () => {
    if (confirm('Are you sure you want to clear all data? This cannot be undone.')) {
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        location: '',
        website: '',
        linkedin: '',
        profilePhoto: '',
        summary: '',
        experiences: [],
        education: [],
        projects: [],
        skills: [],
      });
      showSuccess('Form cleared');
    }
  };

  const handleSaveResume = async (status: 'draft' | 'published' = 'draft') => {
    try {
      setIsSaving(true);

      const resumeData = {
        title: resumeTitle,
        personalInfo: {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          location: formData.location,
          website: formData.website,
          linkedin: formData.linkedin,
          profilePhoto: formData.profilePhoto,
        },
        summary: formData.summary,
        experiences: formData.experiences,
        education: formData.education,
        projects: formData.projects,
        skills: formData.skills,
        status,
      };

      if (resumeId) {
        // Update existing resume
        const result = await dispatch(updateResume({ id: resumeId, data: resumeData })).unwrap();
        const successMessage = result?.message || 'Resume updated successfully!';
        showSuccess(successMessage);
      } else {
        // Create new resume
        const result = await dispatch(createResume(resumeData)).unwrap();
        const successMessage = result?.message || 'Resume created successfully!';
        showSuccess(successMessage);
        // Redirect to edit mode with the new resume ID
        if (result._id) {
          router.replace(`/dashboard/resumes/new?id=${result._id}`);
        }
      }
    } catch (err) {
      showErrorFromException(err, 'Failed to save resume');
    } finally {
      setIsSaving(false);
    }
  };

  // Navigation helpers
  const goToNextTab = () => {
    const currentIndex = tabs.findIndex(tab => tab.id === activeTab);
    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1].id as Tab);
    }
  };

  const goToPreviousTab = () => {
    const currentIndex = tabs.findIndex(tab => tab.id === activeTab);
    if (currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1].id as Tab);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-sm">
            <Link href="/dashboard/resumes" className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              <span>Back</span>
            </Link>
            <span className="text-slate-400">/</span>
            <input
              type="text"
              value={resumeTitle}
              onChange={(e) => setResumeTitle(e.target.value)}
              className="font-semibold text-slate-900 dark:text-white bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1"
              placeholder="Resume Title"
            />
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleClearForm}
              className="px-4 py-2 text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 font-semibold text-sm transition"
              title="Clear all data"
            >
              🗑️ Clear
            </button>
            <button
              onClick={() => handleSaveResume('draft')}
              disabled={isSaving || createLoading || updateLoading}
              className="px-5 py-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-900 dark:text-white text-sm font-semibold rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? '💾 Saving...' : '💾 Save Draft'}
            </button>
            <Link href="/dashboard/resumes/preview" className="px-4 py-2 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white font-semibold text-sm transition">
              👁️ Preview
            </Link>
            <button
              onClick={() => handleSaveResume('published')}
              disabled={isSaving || createLoading || updateLoading}
              className="px-5 py-2 bg-[#1a47e8] hover:bg-[#0f32b8] text-white text-sm font-semibold rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? 'Publishing...' : '✓ Save & Publish'}
            </button>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-8">
        <nav className="flex gap-6 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as Tab)}
              className={`flex items-center gap-2 px-4 py-4 text-sm font-semibold border-b-2 transition whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-[#1a47e8] text-[#1a47e8]'
                  : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <div className="p-8 max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {activeTab === 'personal' && <PersonalDetailsTab formData={formData} onChange={handleInputChange} onNext={goToNextTab} />}
            {activeTab === 'summary' && <SummaryTab formData={formData} onChange={handleInputChange} onNext={goToNextTab} onBack={goToPreviousTab} />}
            {activeTab === 'experience' && <ExperienceTab formData={formData} onChange={handleInputChange} onNext={goToNextTab} onBack={goToPreviousTab} />}
            {activeTab === 'education' && <EducationTab formData={formData} onChange={handleInputChange} onNext={goToNextTab} onBack={goToPreviousTab} />}
            {activeTab === 'projects' && <ProjectsTab formData={formData} onChange={handleInputChange} onNext={goToNextTab} onBack={goToPreviousTab} />}
            {activeTab === 'skills' && <SkillsTab formData={formData} onChange={handleInputChange} onBack={goToPreviousTab} />}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              <ResumeStrengthSidebar formData={formData} activeTab={activeTab} />
              <TemplatesSidebar />
              <TipsSidebar activeTab={activeTab} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PersonalDetailsTab({ formData, onChange, onNext }: any) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8">
      <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Basic Information</h2>
      <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">This information will appear at the top of your resume.</p>

      <div className="space-y-6">
        {/* Profile Photo */}
        <div>
          <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">Profile Photo</label>
          <div className="flex items-center gap-4">
            <div className="h-20 w-20 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center overflow-hidden">
              <svg className="h-10 w-10 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <button className="px-4 py-2 text-sm font-semibold text-[#1a47e8] hover:text-[#0f32b8]">
              Upload Image
            </button>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">Recommended for some regions. Max 2MB.</p>
        </div>

        {/* Full Name */}
        <div>
          <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">Full Name</label>
          <input
            type="text"
            value={formData.fullName}
            onChange={(e) => onChange('fullName', e.target.value)}
            placeholder="Alok"
            className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-950 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1a47e8]"
          />
        </div>

        {/* Email & Phone */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">Email Address</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => onChange('email', e.target.value)}
              placeholder="e.g. alok@example.com"
              className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-950 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1a47e8]"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">Phone Number</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => onChange('phone', e.target.value)}
              placeholder="e.g. +1 (555) 000-0000"
              className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-950 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1a47e8]"
            />
          </div>
        </div>

        {/* Location & Website */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">Location</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => onChange('location', e.target.value)}
              placeholder="e.g. San Francisco, CA"
              className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-950 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1a47e8]"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">Website / LinkedIn</label>
            <input
              type="text"
              value={formData.linkedin}
              onChange={(e) => onChange('linkedin', e.target.value)}
              placeholder="e.g. linkedin.com/in/alok"
              className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-950 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1a47e8]"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center pt-6 border-t border-slate-200 dark:border-slate-800">
          <button className="px-4 py-2 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white">
            Discard
          </button>
          <button 
            onClick={onNext}
            className="px-6 py-3 bg-[#1a47e8] hover:bg-[#0f32b8] text-white font-semibold rounded-lg transition flex items-center gap-2"
          >
            Save & Next
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

function SummaryTab({ formData, onChange, onNext, onBack }: any) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-1">Professional Summary</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">Craft a compelling introduction for recruiters.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold rounded-lg transition">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5z" />
          </svg>
          Generate with AI
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">Summary Text</label>
          <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
            <div className="flex items-center gap-2 px-3 py-2 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950">
              <button className="p-1 hover:bg-slate-200 dark:hover:bg-slate-800 rounded">
                <strong className="text-sm">B</strong>
              </button>
              <button className="p-1 hover:bg-slate-200 dark:hover:bg-slate-800 rounded">
                <em className="text-sm">I</em>
              </button>
              <button className="p-1 hover:bg-slate-200 dark:hover:bg-slate-800 rounded">
                <span className="text-sm underline">U</span>
              </button>
              <div className="h-4 w-px bg-slate-300 dark:bg-slate-600" />
              <button className="p-1 hover:bg-slate-200 dark:hover:bg-slate-800 rounded text-sm">•</button>
              <button className="p-1 hover:bg-slate-200 dark:hover:bg-slate-800 rounded text-sm">1.</button>
              <div className="ml-auto">
                <button className="px-3 py-1 text-xs font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 rounded">
                  AI Improve
                </button>
              </div>
            </div>
            <textarea
              value={formData.summary}
              onChange={(e) => onChange('summary', e.target.value)}
              placeholder="Passionate Software Engineer with 5+ years of experience in building scalable web applications..."
              rows={8}
              className="w-full px-4 py-3 bg-white dark:bg-slate-950 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none resize-none"
            />
          </div>
          <div className="flex items-center justify-between mt-2">
            <p className="text-xs text-slate-500 dark:text-slate-400">0 / 800 characters</p>
          </div>
        </div>

        <div className="flex justify-between items-center pt-6 border-t border-slate-200 dark:border-slate-800">
          <button 
            onClick={onBack}
            className="px-4 py-2 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          >
            Back
          </button>
          <button 
            onClick={onNext}
            className="px-6 py-3 bg-[#1a47e8] hover:bg-[#0f32b8] text-white font-semibold rounded-lg transition flex items-center gap-2"
          >
            Save & Continue
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

function ExperienceTab({ formData, onChange, onNext, onBack }: any) {
  const experiences = formData.experiences.length > 0 ? formData.experiences : [
    {
      id: Date.now(),
      jobTitle: '',
      employer: '',
      startDate: '',
      endDate: '',
      city: '',
      currentlyWork: false,
      description: '',
    },
  ];

  const addExperience = () => {
    const newId = Date.now();
    onChange('experiences', [...experiences, {
      id: newId,
      jobTitle: '',
      employer: '',
      startDate: '',
      endDate: '',
      city: '',
      currentlyWork: false,
      description: '',
    }]);
  };

  const removeExperience = (id: number) => {
    if (experiences.length > 1) {
      onChange('experiences', experiences.filter((e: any) => e.id !== id));
    }
  };

  const updateExperience = (id: number, field: string, value: any) => {
    onChange('experiences', experiences.map((e: any) => e.id === id ? { ...e, [field]: value } : e));
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Professional Experience</h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Showcase your work history and accomplishments.</p>
          </div>
          <button
            onClick={addExperience}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-[#1a47e8] hover:text-[#0f32b8]"
          >
            + Add another position
          </button>
        </div>

        <div className="space-y-8">
          {experiences.map((exp: any) => (
            <div key={exp.id} className="border border-slate-200 dark:border-slate-700 rounded-lg p-6 relative">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-[#1a47e8]">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">{exp.jobTitle || 'Position'}</h3>
                </div>
                {experiences.length > 1 && (
                  <button
                    onClick={() => removeExperience(exp.id)}
                    className="text-slate-400 hover:text-red-600 dark:hover:text-red-400"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">Job Title</label>
                  <input
                    type="text"
                    value={exp.jobTitle}
                    onChange={(e) => updateExperience(exp.id, 'jobTitle', e.target.value)}
                    placeholder="Sales Executive"
                    className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-950 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1a47e8]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">Employer</label>
                  <input
                    type="text"
                    value={exp.employer}
                    onChange={(e) => updateExperience(exp.id, 'employer', e.target.value)}
                    placeholder="TechFlow Solutions"
                    className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-950 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1a47e8]"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">Start & End Date</label>
                  <input
                    type="text"
                    value={exp.startDate}
                    onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                    placeholder="January 2022"
                    className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-950 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1a47e8] mb-2"
                  />
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={exp.currentlyWork}
                      onChange={(e) => updateExperience(exp.id, 'currentlyWork', e.target.checked)}
                      className="rounded border-slate-300 dark:border-slate-600"
                    />
                    <span className="text-sm text-slate-600 dark:text-slate-400">I currently work here</span>
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">City / State</label>
                  <input
                    type="text"
                    value={exp.city}
                    onChange={(e) => updateExperience(exp.id, 'city', e.target.value)}
                    placeholder="Bangalore, India"
                    className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-950 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1a47e8]"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-semibold text-slate-900 dark:text-white">Description</label>
                  <button className="flex items-center gap-2 px-3 py-1 text-xs font-semibold text-purple-600 bg-purple-50 dark:bg-purple-900/20 rounded">
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5z" />
                    </svg>
                    Generate with AI
                  </button>
                </div>
                <textarea
                  value={exp.description}
                  onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                  placeholder="Managed a portfolio of 50+ enterprise clients..."
                  rows={6}
                  className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-950 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1a47e8] resize-none"
                />
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                  Tip: Use bullet points to make your experience easier to scan.
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center pt-6 border-t border-slate-200 dark:border-slate-800 mt-8">
          <button 
            onClick={onBack}
            className="px-4 py-2 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          >
            Back
          </button>
          <button 
            onClick={onNext}
            className="px-6 py-3 bg-[#1a47e8] hover:bg-[#0f32b8] text-white font-semibold rounded-lg transition flex items-center gap-2"
          >
            Save & Continue
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

function EducationTab({ formData, onChange, onNext, onBack }: any) {
  const educations = formData.education.length > 0 ? formData.education : [
    {
      id: Date.now(),
      school: '',
      degree: '',
      startDate: '',
      endDate: '',
      city: '',
      description: '',
    },
  ];

  const addEducation = () => {
    const newId = Date.now();
    onChange('education', [...educations, {
      id: newId,
      school: '',
      degree: '',
      startDate: '',
      endDate: '',
      city: '',
      description: '',
    }]);
  };

  const removeEducation = (id: number) => {
    if (educations.length > 1) {
      onChange('education', educations.filter((e: any) => e.id !== id));
    }
  };

  const updateEducation = (id: number, field: string, value: any) => {
    onChange('education', educations.map((e: any) => e.id === id ? { ...e, [field]: value } : e));
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Education History</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Share your academic background.</p>
        </div>
        <button
          onClick={addEducation}
          className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-[#1a47e8] hover:text-[#0f32b8]"
        >
          + Add another education
        </button>
      </div>

      <div className="space-y-8">
        {educations.map((edu: any) => (
          <div key={edu.id} className="border border-slate-200 dark:border-slate-700 rounded-lg p-6 relative">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-[#1a47e8]">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path d="M12 6.253v13m0-13C6.228 6.228 2 10.428 2 15.5c0 5.072 4.228 9.272 10 9.272s10-4.2 10-9.272c0-5.072-4.228-9.247-10-9.247z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-white">{edu.school || 'School/University'}</h3>
              </div>
              {educations.length > 1 && (
                <button
                  onClick={() => removeEducation(edu.id)}
                  className="text-slate-400 hover:text-red-600 dark:hover:text-red-400"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">School / University</label>
                <input
                  type="text"
                  value={edu.school}
                  onChange={(e) => updateEducation(edu.id, 'school', e.target.value)}
                  placeholder="Massachusetts Institute of Technology"
                  className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-950 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1a47e8]"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">Degree</label>
                <input
                  type="text"
                  value={edu.degree}
                  onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                  placeholder="B.Sc. Computer Science"
                  className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-950 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1a47e8]"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">Start Date</label>
                <input
                  type="text"
                  value={edu.startDate}
                  onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                  placeholder="September 2018"
                  className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-950 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1a47e8]"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">End Date</label>
                <input
                  type="text"
                  value={edu.endDate}
                  onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                  placeholder="May 2022"
                  className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-950 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1a47e8]"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">City</label>
                <input
                  type="text"
                  value={edu.city}
                  onChange={(e) => updateEducation(edu.id, 'city', e.target.value)}
                  placeholder="Cambridge, MA"
                  className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-950 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1a47e8]"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-semibold text-slate-900 dark:text-white">Description</label>
                <button className="flex items-center gap-2 px-3 py-1 text-xs font-semibold text-purple-600 bg-purple-50 dark:bg-purple-900/20 rounded">
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5z" />
                  </svg>
                  Generate with AI
                </button>
              </div>
              <textarea
                value={edu.description}
                onChange={(e) => updateEducation(edu.id, 'description', e.target.value)}
                placeholder="Graduated with honors. Member of the Computer Science Society..."
                rows={4}
                className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-950 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1a47e8] resize-none"
              />
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                Tip: Use bullet points to list achievements.
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center pt-6 border-t border-slate-200 dark:border-slate-800 mt-8">
        <button 
          onClick={onBack}
          className="px-4 py-2 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
        >
          Back
        </button>
        <button 
          onClick={onNext}
          className="px-6 py-3 bg-[#1a47e8] hover:bg-[#0f32b8] text-white font-semibold rounded-lg transition flex items-center gap-2"
        >
          Save & Continue
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}

function ProjectsTab({ formData, onChange, onNext, onBack }: any) {
  const projects = formData.projects.length > 0 ? formData.projects : [
    {
      id: Date.now(),
      title: '',
      link: '',
      role: '',
      description: '',
    },
  ];

  const addProject = () => {
    const newId = Date.now();
    onChange('projects', [...projects, {
      id: newId,
      title: '',
      link: '',
      role: '',
      description: '',
    }]);
  };

  const removeProject = (id: number) => {
    onChange('projects', projects.filter((p: any) => p.id !== id));
  };

  const updateProject = (id: number, field: string, value: any) => {
    onChange('projects', projects.map((p: any) => p.id === id ? { ...p, [field]: value } : p));
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Projects</h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Showcase your relevant work. Add links to live demos or GitHub repos.</p>
          </div>
          <button
            onClick={addProject}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-[#1a47e8] hover:text-[#0f32b8]"
          >
            + Add another project
          </button>
        </div>

        <div className="space-y-8">
          {projects.map((project: any) => (
            <div key={project.id} className="border border-slate-200 dark:border-slate-700 rounded-lg p-6 relative">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-[#1a47e8]">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">Project #{project.id}</h3>
                </div>
                <button
                  onClick={() => removeProject(project.id)}
                  className="text-slate-400 hover:text-red-600 dark:hover:text-red-400"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">Project Title</label>
                  <input
                    type="text"
                    value={project.title}
                    onChange={(e) => updateProject(project.id, 'title', e.target.value)}
                    placeholder="E-commerce Redesign"
                    className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-950 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1a47e8]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">Project Link</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={project.link}
                      onChange={(e) => updateProject(project.id, 'link', e.target.value)}
                      placeholder="behance.net/alok/ecommerce"
                      className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-950 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1a47e8]"
                    />
                    <button className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">Role</label>
                <input
                  type="text"
                  value={project.role}
                  onChange={(e) => updateProject(project.id, 'role', e.target.value)}
                  placeholder="e.g. Lead UX Designer"
                  className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-950 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1a47e8] mb-4"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-semibold text-slate-900 dark:text-white">Description</label>
                  <span className="text-xs text-slate-500 dark:text-slate-400">Markdown supported</span>
                </div>
                <textarea
                  value={project.description}
                  onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                  placeholder="Led a team of 3 designers to revamp the checkout flow..."
                  rows={4}
                  className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-950 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1a47e8] resize-none"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center pt-6 border-t border-slate-200 dark:border-slate-800 mt-8">
          <button 
            onClick={onBack}
            className="px-4 py-2 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          >
            Back
          </button>
          <button 
            onClick={onNext}
            className="px-6 py-3 bg-[#1a47e8] hover:bg-[#0f32b8] text-white font-semibold rounded-lg transition flex items-center gap-2"
          >
            Save & Continue
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

function SkillsTab({ formData, onChange, onBack }: any) {
  const [skillInput, setSkillInput] = useState('');
  const skills = formData.skills || [];

  const suggestedSkills = ['CRM Software', 'Lead Generation', 'Cold Calling', 'B2B Sales', 'Strategic Planning', 'Salesforce', 'HubSpot', 'Data Analysis', 'Microsoft Excel', 'Leadership', 'Public Speaking', 'Problem Solving'];

  const addSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      onChange('skills', [...skills, skillInput.trim()]);
      setSkillInput('');
    }
  };

  const removeSkill = (index: number) => {
    onChange('skills', skills.filter((_: any, i: number) => i !== index));
  };

  const addSuggestedSkill = (skill: string) => {
    if (!skills.includes(skill)) {
      onChange('skills', [...skills, skill]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Add New Skill */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4 uppercase tracking-wide">Add New Skill</h3>
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                addSkill();
              }
            }}
            placeholder="Type a skill (e.g. Negotiation) and hit Enter..."
            className="flex-1 px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-950 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1a47e8]"
          />
          <button
            onClick={addSkill}
            className="h-12 w-12 rounded-lg bg-[#1a47e8] hover:bg-[#0f32b8] text-white font-bold flex items-center justify-center transition"
          >
            +
          </button>
        </div>

        {/* Suggested Skills */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <svg className="h-4 w-4 text-[#1a47e8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span className="text-sm font-semibold text-slate-900 dark:text-white">Suggested Skills</span>
          </div>
          <div className="flex flex-wrap gap-3">
            {suggestedSkills.filter(s => !skills.includes(s)).map((skill) => (
              <button
                key={skill}
                onClick={() => addSuggestedSkill(skill)}
                className="flex items-center gap-2 px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-full text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                +
                <span>{skill}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* All Skills */}
      {skills.length > 0 && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Your Skills</h3>
            <span className="text-sm text-slate-500 dark:text-slate-400">{skills.length} skills added</span>
          </div>
          <div className="flex flex-wrap gap-3">
            {skills.map((skill: string, idx: number) => (
              <button
                key={idx}
                onClick={() => removeSkill(idx)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-slate-800 dark:text-slate-200 rounded-full text-sm font-semibold hover:bg-blue-200 dark:hover:bg-blue-900/50 transition"
              >
                {skill}
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8">
        <div className="flex justify-between items-center">
          <button 
            onClick={onBack}
            className="px-4 py-2 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          >
            Back
          </button>
          <button className="px-6 py-3 bg-[#1a47e8] hover:bg-[#0f32b8] text-white font-semibold rounded-lg transition flex items-center gap-2">
            Save Changes
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

function ResumeStrengthSidebar({ formData, activeTab }: any) {
  // Calculate completion percentage for each section
  const calculateCompletion = () => {
    const sections = {
      personal: {
        label: 'Personal Details',
        filled: (formData.fullName?.length > 0 && formData.email?.length > 0 && formData.phone?.length > 0) ? true : false,
      },
      summary: {
        label: 'Summary',
        filled: formData.summary?.length > 50,
      },
      experience: {
        label: 'Experience (In progress)',
        filled: false, // Will show as in progress
      },
      education: {
        label: 'Education',
        filled: false,
      },
      projects: {
        label: 'Projects',
        filled: (formData.projects?.length > 0),
      },
      skills: {
        label: 'Skills',
        filled: (formData.skills?.length > 0),
      },
    };

    const completedCount = Object.values(sections).filter(s => s.filled).length;
    const totalCount = Object.keys(sections).length;
    const percentage = Math.round((completedCount / totalCount) * 100);

    return { sections, percentage, completedCount, totalCount };
  };

  const { sections, percentage } = calculateCompletion();

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
      {/* Resume Strength Header */}
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-bold text-slate-900 dark:text-white text-sm">Resume Strength</h3>
        <span className="text-lg font-bold text-[#1a47e8]">{percentage}%</span>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3 overflow-hidden">
        <div
          className="h-full bg-linear-to-r from-[#1a47e8] to-[#0f32b8] transition-all duration-300 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Status Items */}
      <div className="space-y-3 pt-2">
        {Object.entries(sections).map(([key, section]: any) => (
          <div key={key} className="flex items-center gap-3">
            {/* Status Icon */}
            {section.filled ? (
              <div className="h-5 w-5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center shrink-0">
                <svg className="h-3 w-3 text-emerald-600 dark:text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            ) : key === 'experience' ? (
              <div className="h-5 w-5 rounded-full border-2 border-[#1a47e8] flex items-center justify-center shrink-0 relative">
                <div className="h-2 w-2 rounded-full bg-[#1a47e8] animate-pulse" />
              </div>
            ) : (
              <div className="h-5 w-5 rounded-full border-2 border-slate-300 dark:border-slate-600 shrink-0" />
            )}

            {/* Label */}
            <span className={`text-xs font-medium ${
              section.filled
                ? 'text-emerald-700 dark:text-emerald-400'
                : key === 'experience'
                ? 'text-[#1a47e8] dark:text-blue-400'
                : 'text-slate-600 dark:text-slate-400'
            }`}>
              {section.label}
            </span>
          </div>
        ))}
      </div>

      {/* Info Text */}
      <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Fill all sections to maximize your resume's visibility to recruiters.
        </p>
      </div>
    </div>
  );
}

function TemplatesSidebar() {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
      {/* Templates Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-slate-900 dark:text-white text-sm">Templates</h3>
        <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14m7-7H5" />
          </svg>
        </button>
      </div>

      {/* Empty State */}
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <div className="h-12 w-12 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-3">
          <svg className="h-6 w-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
          </svg>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400">No templates saved yet</p>
      </div>

      {/* Info Text */}
      <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Save your resume as a template to reuse it for different jobs.
        </p>
      </div>
    </div>
  );
}

function TipsSidebar({ activeTab }: { activeTab: Tab }) {
  const tips = {
    personal: {
      title: 'Pro Tips',
      items: [
        'Use a professional email address, preferably containing your first and last name.',
        'Ensure your phone number includes the country code if applying internationally.',
        'Only include your full address if specifically required—State/Country is usually sufficient.',
      ],
    },
    summary: {
      title: 'Summary Tips',
      items: [
        'Make a strong first impression.',
        'Keep it concise (2-4 sentences max).',
        'Highlight your years of experience.',
        'Mention your top 2-3 hard skills.',
      ],
    },
    experience: {
      title: 'Resume Tip',
      items: [
        'Focus on achievements, not just responsibilities. Use action verbs like "Achieved," "Managed," or "Created."',
        'See examples for Sales roles',
      ],
    },
    education: {
      title: 'Education Tips',
      items: [
        'List your most recent education first.',
        'Include relevant coursework if you\'re a recent graduate.',
        'Mention honors, awards, or high GPA (3.5+).',
      ],
    },
    projects: {
      title: 'Project Tips',
      items: [
        'Highlight projects relevant to the job you\'re applying for.',
        'Include links to live demos or GitHub repos.',
        'Mention technologies used.',
      ],
    },
    skills: {
      title: 'Skills Tips',
      items: [
        'List 10-15 relevant skills.',
        'Separate technical skills from soft skills.',
        'Match keywords from the job description.',
      ],
    },
  };

  const currentTips = tips[activeTab];

  return (
    <div className="bg-blue-50 dark:bg-slate-800 rounded-2xl p-6 border border-blue-100 dark:border-slate-700">
      <div className="flex items-center gap-2 mb-4">
        <div className="h-8 w-8 rounded-full bg-[#1a47e8] flex items-center justify-center text-white">
          💡
        </div>
        <h3 className="font-bold text-slate-900 dark:text-white">{currentTips.title}</h3>
      </div>
      <ul className="space-y-3">
        {currentTips.items.map((tip, index) => (
          <li key={index} className="flex gap-2 text-sm text-slate-700 dark:text-slate-300">
            <span className="text-[#1a47e8] mt-0.5">•</span>
            <span>{tip}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
