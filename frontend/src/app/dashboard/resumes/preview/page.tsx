"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { TemplateData } from '@/types';
import { sessionStorage } from '@/utils/storage';

export default function ResumePreviewPage() {
  const [uploadedPdfName, setUploadedPdfName] = useState<string | null>(null);
  const [uploadedPdfDataUrl, setUploadedPdfDataUrl] = useState<string | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateData | null>(null);

  useEffect(() => {
    const { name, dataUrl } = sessionStorage.getUploadedPdf();
    const template = sessionStorage.getSelectedTemplate();
    
    setUploadedPdfName(name);
    setUploadedPdfDataUrl(dataUrl);
    setSelectedTemplate(template);
  }, []);

  const hasTemplate = Boolean(selectedTemplate);

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950">
      {/* Page Header with breadcrumb */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4 text-sm text-slate-600 dark:text-slate-300">
          <div className="flex items-center gap-3">
            <Link href="/dashboard/resumes" className="flex items-center gap-2 hover:text-slate-900 dark:hover:text-white transition">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              <span>Back</span>
            </Link>
            <span>/</span>
            <span className="font-semibold text-slate-900 dark:text-white">Senior Product Designer</span>
            <span>/</span>
            <span className="font-semibold text-slate-900 dark:text-white">Preview</span>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/dashboard/resumes/new"
              className="px-4 py-2 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white font-semibold rounded-lg transition"
            >
              Edit
            </Link>
            <Link
              href="/dashboard/resumes/templates"
              className="px-4 py-2 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white font-semibold rounded-lg transition"
            >
              Change Template
            </Link>
            {uploadedPdfDataUrl ? (
              <a
                href={uploadedPdfDataUrl}
                download={uploadedPdfName || 'resume.pdf'}
                className="px-4 py-2 bg-[#1a47e8] hover:bg-[#0f32b8] text-white text-sm font-semibold rounded-lg transition"
              >
                ⬇️ Download PDF
              </a>
            ) : (
              <button
                className="px-4 py-2 bg-[#1a47e8] text-white text-sm font-semibold rounded-lg opacity-60 cursor-not-allowed"
                title="Upload a PDF from the dashboard to enable download"
              >
                ⬇️ Download PDF
              </button>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto bg-white shadow-sm rounded-lg p-10 relative mt-8">
        {selectedTemplate && (
          <div className="mb-6 px-4 py-3 bg-slate-900 text-white rounded-lg text-sm flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              {selectedTemplate.badge && (
                <span className="px-2 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-bold">{selectedTemplate.badge}</span>
              )}
              <span>Template selected:</span>
              <span className="font-semibold">{selectedTemplate.name}</span>
            </div>
            <Link
              href="/dashboard/resumes/templates"
              className="text-xs font-semibold underline decoration-dotted underline-offset-4"
            >
              Pick another
            </Link>
          </div>
        )}

        {uploadedPdfName && !hasTemplate && (
          <div className="mb-6 px-4 py-3 bg-blue-50 text-blue-800 rounded-lg text-sm flex items-center gap-2">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            <span>Uploaded PDF:</span>
            <span className="font-semibold">{uploadedPdfName}</span>
          </div>
        )}

        {hasTemplate && selectedTemplate ? (
          <FullResumePreview template={selectedTemplate} />
        ) : uploadedPdfDataUrl ? (
          <div className="mb-8 border border-slate-200 rounded-lg overflow-hidden">
            <iframe
              title="Uploaded PDF Preview"
              src={uploadedPdfDataUrl}
              className="w-full h-225"
            />
          </div>
        ) : (
          <p className="mb-8 text-sm text-slate-500">
            No PDF or template selected. Upload a PDF from the dashboard or pick a template from the gallery.
          </p>
        )}
      </div>
    </div>
  );
}

function FullResumePreview({ template }: { template: TemplateData }) {
  // Sidebar layout templates
  if (["slate-sidebar", "split-column", "contact-sidebar", "colorful-sidebar"].includes(template.id)) {
    return (
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="grid grid-cols-[35%_1fr] min-h-200">
          <div className="p-8 space-y-6 text-white" style={{ background: template.accentGradient }}>
            <div className="text-center space-y-4">
              <div className="h-32 w-32 rounded-full bg-white/20 border-4 border-white/40 mx-auto" />
              <div>
                <h2 className="text-2xl font-bold text-white">Diya Agarwal</h2>
                <p className="text-lg text-white/90 mt-1">Retail Sales Professional</p>
              </div>
            </div>
            <div className="h-px bg-white/30" />
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wide text-white/80">Contact</h3>
              <div className="space-y-2 text-sm text-white/90">
                <p>d.agarwal@example.in</p>
                <p>+91 11 5555 3345</p>
                <p>New Delhi, India 110034</p>
              </div>
            </div>
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wide text-white/80">Skills</h3>
              <ul className="space-y-1 text-sm text-white/90">
                <li>• Cash register operation</li>
                <li>• POS system operation</li>
                <li>• Sales expertise</li>
                <li>• Teamwork</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wide text-white/80">Languages</h3>
              <div className="space-y-2 text-sm text-white/90">
                <div><span className="font-semibold">Hindi:</span> Native speaker</div>
                <div><span className="font-semibold">English:</span> C2</div>
              </div>
            </div>
          </div>
          <div className="p-10 space-y-8 bg-white">
            <section>
              <h2 className="text-xs font-bold uppercase tracking-wide mb-4" style={{ color: template.primary }}>Summary</h2>
              <p className="text-sm leading-relaxed" style={{ color: template.muted }}>
                Customer-focused Retail Sales professional with solid understanding of retail dynamics, marketing and customer service. Offering 5 years of experience providing quality product recommendations and solutions to meet customer needs and exceed expectations.
              </p>
            </section>
            <section>
              <h2 className="text-xs font-bold uppercase tracking-wide mb-4" style={{ color: template.primary }}>Experience</h2>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold" style={{ color: template.primary }}>Retail Sales Associate</h3>
                      <p className="text-sm" style={{ color: template.accentColor }}>ZARA • New Delhi, India</p>
                    </div>
                    <span className="text-xs font-semibold" style={{ color: template.muted }}>02/2017 - Current</span>
                  </div>
                  <ul className="list-disc list-outside pl-5 space-y-1 text-sm" style={{ color: template.muted }}>
                    <li>Increased monthly sales 10% by effectively upselling and cross-selling products to maximize profitability.</li>
                    <li>Prevented store losses by leveraging awareness, attention to detail, and integrity to identify and investigate concerns.</li>
                  </ul>
                </div>
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold" style={{ color: template.primary }}>Barista</h3>
                      <p className="text-sm" style={{ color: template.muted }}>Dunkin' Donuts • New Delhi, India</p>
                    </div>
                    <span className="text-xs font-semibold" style={{ color: template.muted }}>03/2015 - 01/2017</span>
                  </div>
                  <ul className="list-disc list-outside pl-5 space-y-1 text-sm" style={{ color: template.muted }}>
                    <li>Upsold seasonal drinks and pastries, boosting average store sales by ₹1500 weekly.</li>
                    <li>Managed morning rush of over 300 customers daily with efficient, levelheaded customer service.</li>
                  </ul>
                </div>
              </div>
            </section>
            <section className="grid md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-xs font-bold uppercase tracking-wide mb-3" style={{ color: template.primary }}>Education</h2>
                <div className="text-sm">
                  <p className="font-bold" style={{ color: template.primary }}>Diploma in Financial Accounting</p>
                  <p style={{ color: template.muted }}>Oxford Software Institute, 2016</p>
                </div>
              </div>
              <div>
                <h2 className="text-xs font-bold uppercase tracking-wide mb-3" style={{ color: template.primary }}>Interests</h2>
                <p className="text-sm" style={{ color: template.muted }}>Football, Team sports, Volunteering</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    );
  }

  // Header templates
  if (["photo-header", "header-gray", "blue-header-bold"].includes(template.id)) {
    return (
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="h-40 px-10 py-6 flex items-center gap-6" style={{ background: template.accentGradient }}>
          <div className="h-28 w-28 rounded-full bg-white/30 border-4 border-white" />
          <div className="text-white">
            <h1 className="text-4xl font-bold">DIYA AGARWAL</h1>
            <p className="text-xl mt-2">Retail Sales Professional</p>
            <p className="text-sm mt-1">New Delhi, India 110034 | +91 11 5555 3345 | d.agarwal@example.in</p>
          </div>
        </div>
        <div className="p-10 space-y-8">
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wide mb-3 pb-2 border-b" style={{ color: template.primary, borderColor: template.muted + "40" }}>Summary</h2>
            <p className="text-sm leading-relaxed" style={{ color: template.muted }}>
              Customer-focused Retail Sales professional with solid understanding of retail dynamics, marketing and customer service. Offering 5 years of experience providing quality product recommendations and solutions to meet customer needs and exceed expectations.
            </p>
          </section>
          <section className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wide mb-4" style={{ color: template.primary }}>Skills</h2>
              <ul className="grid grid-cols-2 gap-2 text-sm" style={{ color: template.muted }}>
                <li>• Cash register operation</li>
                <li>• Inventory management</li>
                <li>• POS system operation</li>
                <li>• Accurate money handling</li>
                <li>• Sales expertise</li>
                <li>• Documentation</li>
                <li>• Teamwork</li>
                <li>• Retail merchandising</li>
              </ul>
            </div>
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wide mb-4" style={{ color: template.primary }}>Languages</h2>
              <div className="space-y-2 text-sm" style={{ color: template.muted }}>
                <div className="flex justify-between">
                  <span className="font-semibold">Hindi:</span>
                  <span>Native speaker</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">English:</span>
                  <span>C2</span>
                </div>
              </div>
            </div>
          </section>
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wide mb-4" style={{ color: template.primary }}>Experience</h2>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-base" style={{ color: template.primary }}>Retail Sales Associate</h3>
                    <p className="text-sm" style={{ color: template.accentColor }}>ZARA | New Delhi, India</p>
                  </div>
                  <span className="text-sm font-semibold" style={{ color: template.muted }}>02/2017 to Current</span>
                </div>
                <ul className="list-disc list-outside pl-5 space-y-1 text-sm" style={{ color: template.muted }}>
                  <li>Increased monthly sales 10% by effectively upselling and cross-selling products to maximize profitability.</li>
                  <li>Prevented store losses by leveraging awareness, attention to detail, and integrity to identify and investigate concerns.</li>
                  <li>Processed payments and maintained accurate drawers to meet financial targets.</li>
                </ul>
              </div>
              <div>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-base" style={{ color: template.primary }}>Barista</h3>
                    <p className="text-sm" style={{ color: template.muted }}>Dunkin' Donuts | New Delhi, India</p>
                  </div>
                  <span className="text-sm font-semibold" style={{ color: template.muted }}>03/2015 - 01/2017</span>
                </div>
                <ul className="list-disc list-outside pl-5 space-y-1 text-sm" style={{ color: template.muted }}>
                  <li>Upsold seasonal drinks and pastries, boosting average store sales by ₹1500 weekly.</li>
                  <li>Managed morning rush of over 300 customers daily with efficient customer service.</li>
                </ul>
              </div>
            </div>
          </section>
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wide mb-3" style={{ color: template.primary }}>Education and Training</h2>
            <div className="text-sm">
              <p className="font-bold" style={{ color: template.primary }}>Diploma in Financial Accounting</p>
              <p style={{ color: template.muted }}>Oxford Software Institute & Oxford School of English • New Delhi, India | 2016</p>
            </div>
          </section>
        </div>
      </div>
    );
  }

  // Minimal/Simple centered templates
  if (["minimal-classic", "center-minimal", "simple-underline", "minimal-border"].includes(template.id)) {
    return (
      <div className="bg-white shadow-lg rounded-lg p-10 space-y-6">
        <header className="text-center space-y-2 pb-6 border-b" style={{ borderColor: template.muted + "30" }}>
          <h1 className="text-3xl font-bold" style={{ color: template.primary }}>DIYA AGARWAL</h1>
          <p className="text-lg" style={{ color: template.accentColor }}>Retail Sales Professional</p>
          <p className="text-sm" style={{ color: template.muted }}>
            d.agarwal@example.in | +91 11 5555 3345 | New Delhi, India 110034
          </p>
        </header>
        <section>
          <h2 className="text-xs font-bold uppercase tracking-wide mb-3" style={{ color: template.primary }}>Summary</h2>
          <p className="text-sm leading-relaxed" style={{ color: template.muted }}>
            Customer-focused Retail Sales professional with solid understanding of retail dynamics, marketing and customer service. Offering 5 years of experience providing quality product recommendations and solutions to meet customer needs and exceed expectations.
          </p>
        </section>
        <section className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wide mb-3" style={{ color: template.primary }}>Skills</h2>
            <ul className="space-y-1 text-sm" style={{ color: template.muted }}>
              <li>• Cash register operation</li>
              <li>• POS system operation</li>
              <li>• Sales expertise</li>
              <li>• Teamwork</li>
              <li>• Inventory management</li>
              <li>• Accurate money handling</li>
            </ul>
          </div>
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wide mb-3" style={{ color: template.primary }}>Languages</h2>
            <div className="space-y-2 text-sm" style={{ color: template.muted }}>
              <div>
                <span className="font-semibold">Hindi:</span> Native speaker
              </div>
              <div>
                <span className="font-semibold">English:</span> C2 - Proficient
              </div>
            </div>
          </div>
        </section>
        <section>
          <h2 className="text-xs font-bold uppercase tracking-wide mb-4" style={{ color: template.primary }}>Experience</h2>
          <div className="space-y-5">
            <div>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold" style={{ color: template.primary }}>Retail Sales Associate</h3>
                  <p className="text-sm" style={{ color: template.muted }}>ZARA | New Delhi, India</p>
                </div>
                <span className="text-xs font-semibold whitespace-nowrap" style={{ color: template.muted }}>02/2017 - Current</span>
              </div>
              <ul className="list-disc list-outside pl-5 space-y-1 text-sm" style={{ color: template.muted }}>
                <li>Increased monthly sales 10% by effectively upselling and cross-selling products.</li>
                <li>Prevented store losses by leveraging awareness and attention to detail.</li>
                <li>Processed payments and maintained accurate drawers to meet financial targets.</li>
              </ul>
            </div>
            <div>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold" style={{ color: template.primary }}>Barista</h3>
                  <p className="text-sm" style={{ color: template.muted }}>Dunkin' Donuts | New Delhi, India</p>
                </div>
                <span className="text-xs font-semibold whitespace-nowrap" style={{ color: template.muted }}>03/2015 - 01/2017</span>
              </div>
              <ul className="list-disc list-outside pl-5 space-y-1 text-sm" style={{ color: template.muted }}>
                <li>Upsold seasonal drinks and pastries, boosting average store sales by ₹1500 weekly.</li>
                <li>Managed morning rush of over 300 customers daily with efficient customer service.</li>
              </ul>
            </div>
          </div>
        </section>
        <section>
          <h2 className="text-xs font-bold uppercase tracking-wide mb-3" style={{ color: template.primary }}>Education and Training</h2>
          <div className="text-sm">
            <p className="font-bold" style={{ color: template.primary }}>Diploma in Financial Accounting</p>
            <p style={{ color: template.muted }}>Oxford Software Institute & Oxford School of English • New Delhi, India</p>
            <p className="text-xs mt-1" style={{ color: template.muted }}>2016</p>
          </div>
        </section>
      </div>
    );
  }

  // Default: Standard resume with timeline/bullets
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="h-6" style={{ background: template.accentGradient }} />
      <div className="p-10 space-y-6">
        <header className="space-y-2">
          <h1 className="text-3xl font-bold" style={{ color: template.primary }}>Diya Agarwal</h1>
          <p className="text-lg" style={{ color: template.accentColor }}>Retail Sales Professional</p>
          <p className="text-sm" style={{ color: template.muted }}>
            New Delhi, India 110034 | +91 11 5555 3345 | d.agarwal@example.in
          </p>
        </header>
        <div className="h-px" style={{ backgroundColor: template.muted + "40" }} />
        <section>
          <h2 className="text-xs font-bold uppercase tracking-wide mb-3" style={{ color: template.primary }}>Summary</h2>
          <p className="text-sm leading-relaxed" style={{ color: template.muted }}>
            Customer-focused Retail Sales professional with solid understanding of retail dynamics, marketing and customer service. Offering 5 years of experience providing quality product recommendations and solutions to meet customer needs and exceed expectations.
          </p>
        </section>
        <section className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wide mb-3" style={{ color: template.primary }}>Skills</h2>
            <ul className="grid grid-cols-2 gap-y-1 text-sm" style={{ color: template.muted }}>
              <li>• Cash register</li>
              <li>• Inventory mgmt</li>
              <li>• POS systems</li>
              <li>• Money handling</li>
              <li>• Sales expertise</li>
              <li>• Documentation</li>
              <li>• Teamwork</li>
              <li>• Merchandising</li>
            </ul>
          </div>
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wide mb-3" style={{ color: template.primary }}>Languages</h2>
            <div className="space-y-2 text-sm" style={{ color: template.muted }}>
              <div className="flex items-center gap-2">
                <span className="font-semibold">Hindi:</span>
                <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: "100%", backgroundColor: template.accentColor }} />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">English:</span>
                <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: "85%", backgroundColor: template.accentColor }} />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section>
          <h2 className="text-xs font-bold uppercase tracking-wide mb-4" style={{ color: template.primary }}>Experience</h2>
          <div className="space-y-5">
            <div className="flex gap-3">
              <div className="flex flex-col items-center pt-1.5">
                <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: template.accentColor }} />
                <div className="w-px flex-1 mt-1" style={{ backgroundColor: template.muted + "40" }} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold" style={{ color: template.primary }}>Retail Sales Associate</h3>
                    <p className="text-sm" style={{ color: template.accentColor }}>ZARA • New Delhi, India</p>
                  </div>
                  <span className="text-xs font-semibold whitespace-nowrap" style={{ color: template.muted }}>02/2017 - Current</span>
                </div>
                <ul className="list-disc list-outside pl-5 space-y-1 text-sm" style={{ color: template.muted }}>
                  <li>Increased monthly sales 10% by effectively upselling and cross-selling products to maximize profitability.</li>
                  <li>Prevented store losses by leveraging awareness, attention to detail, and integrity.</li>
                  <li>Processed payments and maintained accurate drawers to meet financial targets.</li>
                </ul>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex flex-col items-center pt-1.5">
                <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: template.muted }} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold" style={{ color: template.primary }}>Barista</h3>
                    <p className="text-sm" style={{ color: template.muted }}>Dunkin' Donuts • New Delhi, India</p>
                  </div>
                  <span className="text-xs font-semibold whitespace-nowrap" style={{ color: template.muted }}>03/2015 - 01/2017</span>
                </div>
                <ul className="list-disc list-outside pl-5 space-y-1 text-sm" style={{ color: template.muted }}>
                  <li>Upsold seasonal drinks and pastries, boosting average store sales by ₹1500 weekly.</li>
                  <li>Managed morning rush of over 300 customers daily with efficient, levelheaded customer service.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section>
          <h2 className="text-xs font-bold uppercase tracking-wide mb-3" style={{ color: template.primary }}>Education and Training</h2>
          <div className="text-sm">
            <p className="font-bold" style={{ color: template.primary }}>Diploma in Financial Accounting</p>
            <p style={{ color: template.muted }}>Oxford Software Institute & Oxford School of English</p>
            <p className="text-xs mt-1" style={{ color: template.muted }}>New Delhi, India • 2016</p>
          </div>
        </section>
      </div>
    </div>
  );
}

function TemplateMock({ template }: { template: TemplateData }) {
  // Sidebar templates
  if (["slate-sidebar", "split-column", "contact-sidebar", "colorful-sidebar"].includes(template.id)) {
    return (
      <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-white shadow-md h-full min-h-80">
        <div className="grid grid-cols-[35%_1fr] h-full">
          <div className="p-5 space-y-3" style={{ background: template.accentGradient }}>
            <div className="h-16 w-16 rounded-full bg-white/20 border-4 border-white/40 mx-auto" />
            <div className="space-y-2">
              <div className="h-3 w-3/4 mx-auto rounded bg-white/90" />
              <div className="h-2 w-2/3 mx-auto rounded bg-white/70" />
            </div>
            <div className="h-px bg-white/30 my-3" />
            <div className="space-y-2">
              <div className="h-2 w-20 rounded bg-white/90" />
              <div className="h-1.5 w-28 rounded bg-white/60" />
              <div className="h-1.5 w-32 rounded bg-white/60" />
            </div>
            <div className="space-y-2 pt-3">
              <div className="h-2 w-20 rounded bg-white/90" />
              <div className="h-1.5 w-24 rounded bg-white/60" />
            </div>
          </div>
          <div className="p-5 space-y-3 bg-white">
            <div className="h-4 w-36 rounded" style={{ backgroundColor: template.primary }} />
            <div className="h-2 w-28 rounded" style={{ backgroundColor: template.accentColor }} />
            <div className="h-px" style={{ backgroundColor: template.muted + "40" }} />
            <div className="space-y-2 pt-2">
              <div className="h-2 w-full rounded" style={{ backgroundColor: template.muted + "60" }} />
              <div className="h-2 w-5/6 rounded" style={{ backgroundColor: template.muted + "60" }} />
              <div className="h-2 w-4/5 rounded" style={{ backgroundColor: template.muted + "60" }} />
            </div>
            <div className="space-y-3 pt-3">
              <div className="h-3 w-24 rounded" style={{ backgroundColor: template.primary }} />
              <div className="space-y-1.5">
                <div className="h-2 w-full rounded" style={{ backgroundColor: template.muted + "50" }} />
                <div className="h-2 w-11/12 rounded" style={{ backgroundColor: template.muted + "50" }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Header templates
  if (["photo-header", "header-gray", "blue-header-bold"].includes(template.id)) {
    return (
      <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-white shadow-md h-full min-h-80">
        <div className="h-24 px-5 py-3 flex items-center gap-3" style={{ background: template.accentGradient }}>
          <div className="h-16 w-16 rounded-full bg-white/30 border-4 border-white" />
          <div className="space-y-2">
            <div className="h-4 w-32 rounded bg-white" />
            <div className="h-2 w-24 rounded bg-white/80" />
          </div>
        </div>
        <div className="p-5 space-y-3">
          <div className="h-3 w-20 rounded" style={{ backgroundColor: template.primary }} />
          <div className="space-y-2">
            <div className="h-2 w-full rounded" style={{ backgroundColor: template.muted + "60" }} />
            <div className="h-2 w-5/6 rounded" style={{ backgroundColor: template.muted + "60" }} />
          </div>
          <div className="grid grid-cols-2 gap-4 pt-3">
            <div className="space-y-2">
              <div className="h-3 w-16 rounded" style={{ backgroundColor: template.primary }} />
              <div className="h-2 w-20 rounded" style={{ backgroundColor: template.muted + "50" }} />
            </div>
            <div className="space-y-2">
              <div className="h-3 w-20 rounded" style={{ backgroundColor: template.primary }} />
              <div className="h-2 w-24 rounded" style={{ backgroundColor: template.muted + "50" }} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Geometric templates
  if (["hexagon-design", "geometric-blue"].includes(template.id)) {
    return (
      <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-white shadow-md h-full min-h-80 p-5 space-y-3">
        <div className="flex items-center gap-3">
          <div className="relative h-16 w-16">
            <div className="absolute inset-0 rotate-45 rounded-lg" style={{ background: template.accentGradient }} />
            <div className="absolute inset-3 bg-white rounded" />
          </div>
          <div className="space-y-2">
            <div className="h-4 w-32 rounded" style={{ backgroundColor: template.primary }} />
            <div className="h-2 w-24 rounded" style={{ backgroundColor: template.accentColor }} />
          </div>
        </div>
        <div className="h-px" style={{ backgroundColor: template.muted + "40" }} />
        <div className="space-y-2">
          <div className="h-2 w-full rounded" style={{ backgroundColor: template.muted + "60" }} />
          <div className="h-2 w-5/6 rounded" style={{ backgroundColor: template.muted + "60" }} />
        </div>
        <div className="grid grid-cols-2 gap-4 pt-3">
          <div className="space-y-2">
            <div className="h-3 w-16 rounded" style={{ backgroundColor: template.primary }} />
            <div className="h-2 w-20 rounded" style={{ backgroundColor: template.muted + "50" }} />
          </div>
          <div className="space-y-2">
            <div className="h-3 w-20 rounded" style={{ backgroundColor: template.primary }} />
            <div className="h-2 w-24 rounded" style={{ backgroundColor: template.muted + "50" }} />
          </div>
        </div>
      </div>
    );
  }

  // Minimal templates
  if (["minimal-classic", "center-minimal", "simple-underline", "minimal-border"].includes(template.id)) {
    return (
      <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-white shadow-md h-full min-h-80 p-5 space-y-3">
        <div className="text-center space-y-2 border-b pb-3" style={{ borderColor: template.muted + "40" }}>
          <div className="h-4 w-36 mx-auto rounded" style={{ backgroundColor: template.primary }} />
          <div className="h-2 w-28 mx-auto rounded" style={{ backgroundColor: template.accentColor }} />
          <div className="h-1.5 w-40 mx-auto rounded" style={{ backgroundColor: template.muted + "60" }} />
        </div>
        <div className="space-y-2 pt-2">
          <div className="h-3 w-20 rounded" style={{ backgroundColor: template.primary }} />
          <div className="h-2 w-full rounded" style={{ backgroundColor: template.muted + "50" }} />
          <div className="h-2 w-5/6 rounded" style={{ backgroundColor: template.muted + "50" }} />
        </div>
        <div className="grid grid-cols-2 gap-4 pt-3">
          <div className="space-y-2">
            <div className="h-3 w-16 rounded" style={{ backgroundColor: template.primary }} />
            <div className="h-2 w-20 rounded" style={{ backgroundColor: template.muted + "50" }} />
          </div>
          <div className="space-y-2">
            <div className="h-3 w-20 rounded" style={{ backgroundColor: template.primary }} />
            <div className="h-2 w-24 rounded" style={{ backgroundColor: template.muted + "50" }} />
          </div>
        </div>
      </div>
    );
  }

  // Accent templates
  if (["yellow-accent", "cyan-accent", "red-accent-bold", "accent-green", "teal-modern"].includes(template.id)) {
    return (
      <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-white shadow-md h-full min-h-80">
        <div className="h-5" style={{ background: template.accentGradient }} />
        <div className="p-5 space-y-3">
          <div className="h-4 w-36 rounded" style={{ backgroundColor: template.primary }} />
          <div className="h-2 w-28 rounded" style={{ backgroundColor: template.accentColor }} />
          <div className="h-px" style={{ backgroundColor: template.muted + "40" }} />
          <div className="space-y-2">
            <div className="h-2 w-full rounded" style={{ backgroundColor: template.muted + "60" }} />
            <div className="h-2 w-5/6 rounded" style={{ backgroundColor: template.muted + "60" }} />
          </div>
          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="space-y-2">
              <div className="h-3 w-16 rounded" style={{ backgroundColor: template.primary }} />
              <div className="h-2 w-20 rounded" style={{ backgroundColor: template.muted + "50" }} />
            </div>
            <div className="space-y-2">
              <div className="h-3 w-20 rounded" style={{ backgroundColor: template.primary }} />
              <div className="h-2 w-24 rounded" style={{ backgroundColor: template.muted + "50" }} />
            </div>
          </div>
          <div className="flex gap-2 pt-2">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="h-6 w-6 rounded" style={{ backgroundColor: template.accentColor + "40" }} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Default: Timeline/Two-column
  return (
    <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-white shadow-md h-full min-h-80 p-5 space-y-3">
      <div className="space-y-2">
        <div className="h-4 w-36 rounded" style={{ backgroundColor: template.primary }} />
        <div className="h-2 w-28 rounded" style={{ backgroundColor: template.accentColor }} />
        <div className="h-1.5 w-40 rounded" style={{ backgroundColor: template.muted + "60" }} />
      </div>
      <div className="h-px" style={{ backgroundColor: template.muted + "40" }} />
      <div className="space-y-2">
        <div className="h-2 w-full rounded" style={{ backgroundColor: template.muted + "60" }} />
        <div className="h-2 w-5/6 rounded" style={{ backgroundColor: template.muted + "60" }} />
      </div>
      <div className="space-y-3 pt-2">
        <div className="h-3 w-20 rounded" style={{ backgroundColor: template.primary }} />
        <div className="flex gap-2">
          <div className="h-3 w-3 rounded-full mt-0.5" style={{ backgroundColor: template.accentColor }} />
          <div className="flex-1 space-y-1.5">
            <div className="h-2 w-full rounded" style={{ backgroundColor: template.muted + "50" }} />
            <div className="h-2 w-4/5 rounded" style={{ backgroundColor: template.muted + "50" }} />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 pt-3">
        <div className="space-y-2">
          <div className="h-3 w-16 rounded" style={{ backgroundColor: template.primary }} />
          <div className="h-2 w-20 rounded" style={{ backgroundColor: template.muted + "50" }} />
        </div>
        <div className="space-y-2">
          <div className="h-3 w-20 rounded" style={{ backgroundColor: template.primary }} />
          <div className="h-2 w-24 rounded" style={{ backgroundColor: template.muted + "50" }} />
        </div>
      </div>
    </div>
  );
}
