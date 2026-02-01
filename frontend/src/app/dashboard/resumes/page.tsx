'use client';

import Link from 'next/link';
import { useState } from 'react';
import PageHeader from '@/components/common/PageHeader';
import { Resume } from '@/types';

export default function MyResumesPage() {
  const [resumes, setResumes] = useState<Resume[]>([
    {
      id: '1',
      title: 'Software Engineer CV',
      templateName: 'Modern',
      completion: 85,
      lastEdited: '2 hours ago',
      atsScore: 92,
    },
    {
      id: '2',
      title: 'Senior Product Designer',
      templateName: 'Professional',
      completion: 65,
      lastEdited: '5 days ago',
      atsScore: 78,
    },
  ]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <PageHeader
        title="My Resumes"
        description="Manage and edit all your resume versions"
        action={
          <Link
            href="/dashboard/resumes/new"
            className="flex items-center gap-2 px-6 py-3 bg-[#1a47e8] hover:bg-[#0f32b8] text-white font-semibold rounded-lg transition"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Create New Resume
          </Link>
        }
      />

      {/* Content */}
      <div className="p-8 max-w-6xl mx-auto">
        {resumes.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
            {resumes.map((resume) => (
              <div
                key={resume.id}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-lg transition"
              >
                <div className="p-6 flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-[#1a47e8]">
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path d="M9 12h6M9 16h6M9 8h6M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{resume.title}</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400">{resume.templateName} Template</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {/* Completion Bar */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Completion</span>
                          <span className="text-xs font-bold text-slate-900 dark:text-white">{resume.completion}%</span>
                        </div>
                        <div className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-linear-to-r from-[#1a47e8] to-blue-500 transition-all"
                            style={{ width: `${resume.completion}%` }}
                          />
                        </div>
                      </div>

                      {/* ATS Score & Last Edited */}
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center gap-4">
                          {resume.atsScore && (
                            <div className="flex items-center gap-2">
                              <div className="h-8 w-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 text-xs font-bold">
                                ✓
                              </div>
                              <span className="text-sm text-slate-600 dark:text-slate-400">
                                ATS: <span className="font-semibold text-emerald-600 dark:text-emerald-400">{resume.atsScore}/100</span>
                              </span>
                            </div>
                          )}
                          <span className="text-xs text-slate-500 dark:text-slate-500">
                            Last edited {resume.lastEdited}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="ml-6 flex flex-col gap-2">
                    <Link
                      href={`/dashboard/resumes/${resume.id}`}
                      className="px-4 py-2 text-sm font-semibold text-[#1a47e8] hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition"
                    >
                      Edit
                    </Link>
                    <button className="px-4 py-2 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition">
                      More
                    </button>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="border-t border-slate-200 dark:border-slate-800 px-6 py-4 flex gap-3">
                  <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    Preview
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-[#1a47e8] hover:bg-[#0f32b8] rounded-lg transition">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download PDF
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="mx-auto w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
              <svg className="h-10 w-10 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path d="M9 12h6M9 16h6M9 8h6M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">No resumes yet</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">Get started by creating your first resume</p>
            <Link
              href="/dashboard/resumes/new"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#1a47e8] hover:bg-[#0f32b8] text-white font-semibold rounded-lg transition"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Create Your First Resume
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
