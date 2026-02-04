'use client';

import { useState } from 'react';
import Image from 'next/image';

type TabType = 'personal';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<TabType>('personal');
  const [isEditing, setIsEditing] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    fullName: 'Alex Johnson',
    professionalHeadline: 'Product Designer & Content Strategist',
    location: 'San Francisco, CA',
    linkedinUrl: 'linkedin.com/in/alexjohnson',
    bio: 'Experienced Product Designer with over 8 years in the industry. Specialized in creating user-centered designs for SaaS products and building strategic content frameworks.',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    // Handle save logic here
    setIsEditing(false);
    console.log('Saved:', formData);
  };

  const handleCancel = () => {
    // Reset form or cancel editing
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 py-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Profile
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Manage your personal information and professional details.
          </p>
        </div>
      </div>



      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 sm:px-8 py-8">
          <div className="space-y-6">
            {/* Profile Card */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div className="flex items-center gap-4 sm:gap-6">
                  {/* Avatar */}
                  <div className="relative">
                    <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-full bg-linear-to-br from-orange-200 to-orange-400 overflow-hidden">
                      <div className="absolute inset-0 flex items-end justify-center">
                        <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-orange-300" />
                      </div>
                    </div>
                    <button className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-700 transition">
                      <svg className="h-4 w-4 text-slate-600 dark:text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </button>
                  </div>

                  {/* Info */}
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                      {formData.fullName}
                    </h2>
                    <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-1">
                      {formData.professionalHeadline}
                    </p>
                    <div className="flex items-center gap-2 mt-2 text-sm text-slate-500 dark:text-slate-500">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {formData.location}
                    </div>
                  </div>
                </div>

                {/* Edit Button */}
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="w-full sm:w-auto px-6 py-2.5 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                >
                  Edit Profile
                </button>
              </div>
            </div>

            {/* Personal Details Form */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">
                Personal Details
              </h3>

              <div className="space-y-6">
                {/* Full Name & Professional Headline */}
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#1a47e8] disabled:bg-slate-50 dark:disabled:bg-slate-800 disabled:text-slate-500 dark:disabled:text-slate-400 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                      Professional Headline
                    </label>
                    <input
                      type="text"
                      name="professionalHeadline"
                      value={formData.professionalHeadline}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#1a47e8] disabled:bg-slate-50 dark:disabled:bg-slate-800 disabled:text-slate-500 dark:disabled:text-slate-400 transition"
                    />
                  </div>
                </div>

                {/* Location & LinkedIn */}
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#1a47e8] disabled:bg-slate-50 dark:disabled:bg-slate-800 disabled:text-slate-500 dark:disabled:text-slate-400 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                      LinkedIn Profile URL
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                        </svg>
                      </div>
                      <input
                        type="text"
                        name="linkedinUrl"
                        value={formData.linkedinUrl}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full pl-11 pr-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#1a47e8] disabled:bg-slate-50 dark:disabled:bg-slate-800 disabled:text-slate-500 dark:disabled:text-slate-400 transition"
                      />
                    </div>
                  </div>
                </div>

                {/* Professional Bio */}
                <div>
                  <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                    Professional Bio
                  </label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    rows={5}
                    className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#1a47e8] disabled:bg-slate-50 dark:disabled:bg-slate-800 disabled:text-slate-500 dark:disabled:text-slate-400 resize-none transition"
                  />
                </div>

                {/* Action Buttons */}
                {isEditing && (
                  <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 pt-4">
                    <button
                      onClick={handleCancel}
                      className="w-full sm:w-auto px-6 py-2.5 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      className="w-full sm:w-auto px-6 py-2.5 bg-[#1a47e8] hover:bg-[#0f32b8] text-white font-semibold rounded-lg transition"
                    >
                      Save Changes
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
      </div>
    </div>
  );
}
