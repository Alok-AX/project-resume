'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { handlePdfUpload } from '@/utils/fileUpload';
import { sessionStorage } from '@/utils/storage';
import { showSuccess, showError } from '@/utils/toast';

export default function DashboardPage() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();
  const [uploadError, setUploadError] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const handleBrowseClick = () => {
    setUploadError('');
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadError('');

    const result = await handlePdfUpload(file);

    if (result.success && result.fileName && result.dataUrl) {
      sessionStorage.setUploadedPdf(result.fileName, result.dataUrl);
      showSuccess('PDF uploaded successfully!');
      router.push('/dashboard/resumes/preview');
    } else {
      const errorMsg = result.error || 'Failed to upload PDF';
      showError(errorMsg);
      setUploadError(errorMsg);
      setIsUploading(false);
    }

    event.target.value = '';
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Welcome back, Alok!
          </h1>
          <span className="text-3xl">👋</span>
        </div>
        <p className="text-slate-600 dark:text-slate-400">
          Let's create your next job-winning resume. Choose how you want to start.
        </p>
      </div>

      {/* Action Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {/* Upload Resume */}
        <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-8 text-center hover:border-[#1a47e8] dark:hover:border-blue-500 transition bg-white dark:bg-slate-900">
          <div className="mb-6">
            <div className="mx-auto w-20 h-20 rounded-2xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center mb-4">
              <svg className="h-10 w-10 text-[#1a47e8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
              Upload your resume
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
              Drag & drop your existing resume here (PDF only) to preview it.
            </p>
          </div>
          <button
            onClick={handleBrowseClick}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#1a47e8] hover:bg-[#0f32b8] text-white font-semibold rounded-lg transition disabled:opacity-60 disabled:cursor-not-allowed"
            disabled={isUploading}
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            {isUploading ? 'Uploading…' : 'Browse files'}
          </button>
          {uploadError && (
            <p className="mt-4 text-sm text-red-600 dark:text-red-400">{uploadError}</p>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        {/* Start from Scratch */}
        <div className="relative border-2 border-slate-200 dark:border-slate-700 rounded-2xl p-8 text-center bg-linear-to-b from-blue-50 to-white dark:from-slate-800 dark:to-slate-900 hover:shadow-lg transition">
          <div className="absolute top-4 right-4 px-3 py-1 bg-emerald-500 text-white text-xs font-bold rounded-full">
            RECOMMENDED
          </div>
          <div className="mb-6">
            <div className="mx-auto w-20 h-20 rounded-2xl bg-white dark:bg-slate-950 shadow-sm flex items-center justify-center mb-4">
              <svg className="h-10 w-10 text-[#1a47e8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
              Start from Scratch
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
              No resume? No problem. Use our professional builder with smart templates to create a standout CV in minutes.
            </p>
          </div>
          <Link
            href="/dashboard/resumes/new"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#1a47e8] hover:bg-[#0f32b8] text-white font-semibold rounded-lg transition"
          >
            Start Blank
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Browse Templates */}
        <div className="border-2 border-slate-200 dark:border-slate-700 rounded-2xl p-8 bg-white dark:bg-slate-900 hover:shadow-lg transition flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-bold">NEW</span>
            <span className="text-xs text-slate-500 dark:text-slate-400">Gallery</span>
          </div>
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Explore Templates</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 flex-1">
            Pick a design from our gallery and send it straight to preview. Switching clears any previous preview.
          </p>
          <Link
            href="/dashboard/resumes/templates"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold rounded-lg hover:opacity-90 transition"
          >
            Open Template Gallery
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Recent Activity</h2>
        <div className="border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 p-12 text-center">
          <div className="mx-auto w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
            <svg className="h-8 w-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-slate-500 dark:text-slate-400">No recent activity found</p>
        </div>
      </div>
    </div>
  );
}
