'use client';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '@/store';
import { fetchProfile, updateProfile, clearProfileError } from '@/store/slices/profileSlice';
import { showSuccess, showError, showErrorFromException } from '@/utils/toast';
import { isValidImage } from '@/utils/validation';
import { createFormChangeHandler } from '@/utils/form';
import { getToken } from '@/utils/auth';

export default function SettingsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { profile, loading, updateLoading, error, updateError } = useSelector(
    (state: RootState) => state.profile
  );

  const [isEditing, setIsEditing] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    professionalHeadline: '',
    location: '',
    linkedinUrl: '',
    bio: '',
    profilePicture: '',
  });

  // Fetch profile on mount
  useEffect(() => {
    const token = getToken();
    if (token) {
      dispatch(fetchProfile());
    }
  }, []);

  // Update form when profile loads
  useEffect(() => {
    if (profile) {
      setFormData({
        fullName: profile.fullName || '',
        professionalHeadline: profile.professionalHeadline || '',
        location: profile.location || '',
        linkedinUrl: profile.linkedinUrl || '',
        bio: profile.bio || '',
        profilePicture: profile.profilePicture || '',
      });
      setImagePreview(profile.profilePicture || null);
    }
  }, [profile]);

  // Show error toast only for fetch errors
  useEffect(() => {
    if (error) {
      showError(error);
      dispatch(clearProfileError());
    }
  }, [error]);

  const handleInputChange = createFormChangeHandler(setFormData);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate using utility
      const validation = isValidImage(file, 2);
      if (!validation.valid) {
        showError(validation.error!);
        return;
      }
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImagePreview(base64String);
        setFormData({
          ...formData,
          profilePicture: base64String,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {
      const result = await dispatch(updateProfile(formData)).unwrap();
      // Use success message from backend if available
      const successMessage = result?.message || 'Profile updated successfully!';
      showSuccess(successMessage);
      setIsEditing(false);
    } catch (err) {
      showErrorFromException(err, 'Failed to update profile');
    }
  };

  const handleCancel = () => {
    if (profile) {
      setFormData({
        fullName: profile.fullName || '',
        professionalHeadline: profile.professionalHeadline || '',
        location: profile.location || '',
        linkedinUrl: profile.linkedinUrl || '',
        bio: profile.bio || '',
        profilePicture: profile.profilePicture || '',
      });
      setImagePreview(profile.profilePicture || null);
    }
    setIsEditing(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-400">Loading profile...</p>
        </div>
      </div>
    );
  }

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
                    <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-full overflow-hidden border-2 border-slate-200 dark:border-slate-700">
                      {imagePreview ? (
                        <img 
                          src={imagePreview} 
                          alt={formData.fullName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-linear-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-3xl font-bold">
                          {formData.fullName.charAt(0).toUpperCase() || 'U'}
                        </div>
                      )}
                    </div>
                    <input
                      type="file"
                      id="profilePictureInput"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      disabled={!isEditing}
                    />
                    <button 
                      onClick={() => document.getElementById('profilePictureInput')?.click()}
                      disabled={!isEditing}
                      className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
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
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="w-full sm:w-auto px-6 py-2.5 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                  >
                    Edit Profile
                  </button>
                )}
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
                  <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                    {formData.bio.length}/500 characters
                  </p>
                </div>

                {/* Action Buttons */}
                {isEditing && (
                  <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 pt-4">
                    <button
                      onClick={handleCancel}
                      disabled={updateLoading}
                      className="w-full sm:w-auto px-6 py-2.5 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      disabled={updateLoading}
                      className="w-full sm:w-auto px-6 py-2.5 bg-[#1a47e8] hover:bg-[#0f32b8] text-white font-semibold rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {updateLoading ? (
                        <>
                          <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Saving...
                        </>
                      ) : (
                        'Save Changes'
                      )}
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
