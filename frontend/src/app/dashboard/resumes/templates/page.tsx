"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import PageHeader from "@/components/common/PageHeader";
import { TemplateData } from "@/types";
import { templates, categories } from "@/data/templates";
import { sessionStorage } from "@/utils/storage";

export default function TemplateGalleryPage() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]>("All");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("popular");
  const [sendingId, setSendingId] = useState<string | null>(null);
  const [status, setStatus] = useState<string>("");

  const filteredTemplates = useMemo(() => {
    const term = search.trim().toLowerCase();
    return templates
      .filter((tpl) => (activeCategory === "All" ? true : tpl.category === activeCategory))
      .filter((tpl) =>
        term
          ? tpl.name.toLowerCase().includes(term) || tpl.tags.some((tag) => tag.includes(term))
          : true,
      )
      .sort((a, b) => {
        if (sortBy === "new") return (b.badge === "NEW" ? 1 : 0) - (a.badge === "NEW" ? 1 : 0);
        if (sortBy === "pro") return (b.badge === "PRO" ? 1 : 0) - (a.badge === "PRO" ? 1 : 0);
        return a.name.localeCompare(b.name);
      });
  }, [activeCategory, search, sortBy]);

  const handleSelect = (template: TemplateData) => {
    setSendingId(template.id);
    sessionStorage.setSelectedTemplate(template);
    setStatus(`${template.name} sent to preview`);
    router.push("/dashboard/resumes/preview");
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <PageHeader
        title="Template Gallery"
        description="Choose your next design • ATS friendly • One-click preview"
        action={
          <span className="px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 text-xs font-semibold">
            23 Templates
          </span>
        }
      />

      <div className="max-w-6xl mx-auto px-8 py-8 space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition border ${
                  activeCategory === cat
                    ? "bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-slate-900 dark:border-white"
                    : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-800"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            <div className="relative">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by role or style"
                className="pl-10 pr-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm text-slate-700 dark:text-slate-200 min-w-60"
              />
              <svg className="h-4 w-4 absolute left-3 top-2.5 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15.5 15.5L19 19" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="11" cy="11" r="6" />
              </svg>
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm text-slate-700 dark:text-slate-200"
            >
              <option value="popular">Most Popular</option>
              <option value="new">Newest</option>
              <option value="pro">Pro First</option>
            </select>
          </div>
        </div>

        {status && (
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-700 px-4 py-3 text-sm">
            {status}
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredTemplates.map((template) => (
            <div
              key={template.id}
              className="group relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-xl transition"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition" aria-hidden>
                <div
                  className="h-full w-full opacity-10"
                  style={{ background: template.accentGradient }}
                />
              </div>
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200">
                    {template.category}
                  </span>
                  {template.badge && (
                    <span className="px-2 py-1 rounded-full bg-amber-100 text-amber-700">{template.badge}</span>
                  )}
                </div>
                <button
                  onClick={() => handleSelect(template)}
                  disabled={sendingId === template.id}
                  className="text-xs font-semibold text-[#1a47e8] hover:text-[#0f32b8] disabled:opacity-50"
                >
                  {sendingId === template.id ? "Sending…" : "Send to Preview"}
                </button>
              </div>

              <div className="px-4 pb-4">
                <ResumeMock template={template} />
                <div className="mt-4 space-y-1">
                  <p className="text-lg font-semibold text-slate-900 dark:text-white">{template.name}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{template.description}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {template.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ResumeMock({ template }: { template: TemplateData }) {
  // Sidebar templates
  if (["slate-sidebar", "split-column", "contact-sidebar", "colorful-sidebar"].includes(template.id)) {
    return (
      <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white shadow-sm">
        <div className="grid grid-cols-[35%_1fr] h-56">
          <div className="p-3 space-y-2" style={{ background: template.accentGradient }}>
            <div className="h-10 w-10 rounded-full bg-white/20 border-2 border-white/40 mx-auto" />
            <div className="space-y-1">
              <div className="h-2 w-3/4 mx-auto rounded bg-white/80" />
              <div className="h-1.5 w-2/3 mx-auto rounded bg-white/60" />
            </div>
            <div className="h-px bg-white/30 my-2" />
            <div className="space-y-1.5">
              <div className="h-1.5 w-16 rounded bg-white/90" />
              <div className="h-1 w-20 rounded bg-white/60" />
              <div className="h-1 w-24 rounded bg-white/60" />
            </div>
            <div className="space-y-1.5 pt-2">
              <div className="h-1.5 w-16 rounded bg-white/90" />
              <div className="h-1 w-20 rounded bg-white/60" />
              <div className="h-1 w-18 rounded bg-white/60" />
            </div>
          </div>
          <div className="p-3 space-y-2 bg-white">
            <div className="h-2.5 w-28 rounded" style={{ backgroundColor: template.primary }} />
            <div className="h-1.5 w-24 rounded" style={{ backgroundColor: template.accentColor }} />
            <div className="h-px" style={{ backgroundColor: template.muted + "40" }} />
            <div className="space-y-1 pt-1">
              <div className="h-1.5 w-full rounded" style={{ backgroundColor: template.muted + "60" }} />
              <div className="h-1.5 w-5/6 rounded" style={{ backgroundColor: template.muted + "60" }} />
              <div className="h-1.5 w-4/5 rounded" style={{ backgroundColor: template.muted + "60" }} />
            </div>
            <div className="space-y-2 pt-2">
              <div className="h-2 w-20 rounded" style={{ backgroundColor: template.primary }} />
              <div className="space-y-1">
                <div className="h-1.5 w-full rounded" style={{ backgroundColor: template.muted + "50" }} />
                <div className="h-1.5 w-11/12 rounded" style={{ backgroundColor: template.muted + "50" }} />
              </div>
              <div className="h-1.5 w-3/4 rounded" style={{ backgroundColor: template.muted + "50" }} />
            </div>
            <div className="flex gap-1 pt-1">
              {[0, 1, 2].map((i) => (
                <div key={i} className="h-1 w-12 rounded" style={{ backgroundColor: template.accentColor + "80" }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Header templates
  if (["photo-header", "header-gray", "blue-header-bold"].includes(template.id)) {
    return (
      <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white shadow-sm">
        <div className="h-56 space-y-0">
          <div className="h-16 px-3 py-2 flex items-center gap-2" style={{ background: template.accentGradient }}>
            <div className="h-10 w-10 rounded-full bg-white/30 border-2 border-white" />
            <div className="space-y-1">
              <div className="h-2.5 w-24 rounded bg-white" />
              <div className="h-1.5 w-20 rounded bg-white/80" />
            </div>
          </div>
          <div className="p-3 space-y-2">
            <div className="h-2 w-16 rounded" style={{ backgroundColor: template.primary }} />
            <div className="space-y-1">
              <div className="h-1.5 w-full rounded" style={{ backgroundColor: template.muted + "60" }} />
              <div className="h-1.5 w-5/6 rounded" style={{ backgroundColor: template.muted + "60" }} />
              <div className="h-1.5 w-4/5 rounded" style={{ backgroundColor: template.muted + "60" }} />
            </div>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="space-y-1">
                <div className="h-2 w-12 rounded" style={{ backgroundColor: template.primary }} />
                <div className="h-1.5 w-16 rounded" style={{ backgroundColor: template.muted + "50" }} />
                <div className="h-1.5 w-20 rounded" style={{ backgroundColor: template.muted + "50" }} />
              </div>
              <div className="space-y-1">
                <div className="h-2 w-16 rounded" style={{ backgroundColor: template.primary }} />
                <div className="h-1.5 w-20 rounded" style={{ backgroundColor: template.muted + "50" }} />
                <div className="h-1.5 w-18 rounded" style={{ backgroundColor: template.muted + "50" }} />
              </div>
            </div>
            <div className="space-y-1 pt-2">
              <div className="h-2 w-20 rounded" style={{ backgroundColor: template.primary }} />
              <div className="h-1.5 w-full rounded" style={{ backgroundColor: template.muted + "50" }} />
              <div className="h-1.5 w-4/5 rounded" style={{ backgroundColor: template.muted + "50" }} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Geometric/Hexagon templates
  if (["hexagon-design", "geometric-blue"].includes(template.id)) {
    return (
      <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white shadow-sm">
        <div className="h-56 p-3 space-y-2">
          <div className="flex items-center gap-2">
            <div className="relative h-12 w-12">
              <div className="absolute inset-0 rotate-45 rounded-md" style={{ background: template.accentGradient }} />
              <div className="absolute inset-2 bg-white rounded-sm" />
            </div>
            <div className="space-y-1">
              <div className="h-2.5 w-24 rounded" style={{ backgroundColor: template.primary }} />
              <div className="h-1.5 w-20 rounded" style={{ backgroundColor: template.accentColor }} />
            </div>
          </div>
          <div className="h-px" style={{ backgroundColor: template.muted + "40" }} />
          <div className="space-y-1">
            <div className="h-1.5 w-full rounded" style={{ backgroundColor: template.muted + "60" }} />
            <div className="h-1.5 w-5/6 rounded" style={{ backgroundColor: template.muted + "60" }} />
            <div className="h-1.5 w-4/5 rounded" style={{ backgroundColor: template.muted + "60" }} />
          </div>
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="space-y-1">
              <div className="h-2 w-12 rounded" style={{ backgroundColor: template.primary }} />
              <div className="h-1.5 w-16 rounded" style={{ backgroundColor: template.muted + "50" }} />
            </div>
            <div className="space-y-1">
              <div className="h-2 w-16 rounded" style={{ backgroundColor: template.primary }} />
              <div className="h-1.5 w-20 rounded" style={{ backgroundColor: template.muted + "50" }} />
            </div>
          </div>
          <div className="space-y-1 pt-2">
            <div className="h-2 w-20 rounded" style={{ backgroundColor: template.primary }} />
            <div className="h-1.5 w-full rounded" style={{ backgroundColor: template.muted + "50" }} />
            <div className="h-1.5 w-4/5 rounded" style={{ backgroundColor: template.muted + "50" }} />
          </div>
        </div>
      </div>
    );
  }

  // Simple/Minimal templates (centered or traditional)
  if (["minimal-classic", "center-minimal", "simple-underline", "minimal-border"].includes(template.id)) {
    return (
      <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white shadow-sm">
        <div className="h-56 p-4 space-y-2">
          <div className="text-center space-y-1 border-b pb-2" style={{ borderColor: template.muted + "40" }}>
            <div className="h-3 w-28 mx-auto rounded" style={{ backgroundColor: template.primary }} />
            <div className="h-1.5 w-24 mx-auto rounded" style={{ backgroundColor: template.accentColor }} />
            <div className="h-1 w-32 mx-auto rounded" style={{ backgroundColor: template.muted + "60" }} />
          </div>
          <div className="space-y-1.5 pt-1">
            <div className="h-2 w-16 rounded" style={{ backgroundColor: template.primary }} />
            <div className="h-1.5 w-full rounded" style={{ backgroundColor: template.muted + "50" }} />
            <div className="h-1.5 w-5/6 rounded" style={{ backgroundColor: template.muted + "50" }} />
            <div className="h-1.5 w-4/5 rounded" style={{ backgroundColor: template.muted + "50" }} />
          </div>
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="space-y-1">
              <div className="h-2 w-12 rounded" style={{ backgroundColor: template.primary }} />
              <div className="h-1.5 w-16 rounded" style={{ backgroundColor: template.muted + "50" }} />
              <div className="h-1.5 w-20 rounded" style={{ backgroundColor: template.muted + "50" }} />
            </div>
            <div className="space-y-1">
              <div className="h-2 w-16 rounded" style={{ backgroundColor: template.primary }} />
              <div className="h-1.5 w-20 rounded" style={{ backgroundColor: template.muted + "50" }} />
              <div className="h-1.5 w-18 rounded" style={{ backgroundColor: template.muted + "50" }} />
            </div>
          </div>
          <div className="space-y-1 pt-2">
            <div className="h-2 w-20 rounded" style={{ backgroundColor: template.primary }} />
            <div className="h-1.5 w-full rounded" style={{ backgroundColor: template.muted + "50" }} />
            <div className="h-1.5 w-4/5 rounded" style={{ backgroundColor: template.muted + "50" }} />
          </div>
        </div>
      </div>
    );
  }

  // Accent color templates (yellow, cyan, red, green, teal)
  if (["yellow-accent", "cyan-accent", "red-accent-bold", "accent-green", "teal-modern"].includes(template.id)) {
    return (
      <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white shadow-sm">
        <div className="h-56 space-y-0">
          <div className="h-3" style={{ background: template.accentGradient }} />
          <div className="p-3 space-y-2">
            <div className="h-2.5 w-28 rounded" style={{ backgroundColor: template.primary }} />
            <div className="h-1.5 w-24 rounded" style={{ backgroundColor: template.accentColor }} />
            <div className="h-px" style={{ backgroundColor: template.muted + "40" }} />
            <div className="space-y-1">
              <div className="h-1.5 w-full rounded" style={{ backgroundColor: template.muted + "60" }} />
              <div className="h-1.5 w-5/6 rounded" style={{ backgroundColor: template.muted + "60" }} />
              <div className="h-1.5 w-4/5 rounded" style={{ backgroundColor: template.muted + "60" }} />
            </div>
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="space-y-1">
                <div className="h-2 w-12 rounded" style={{ backgroundColor: template.primary }} />
                <div className="h-1.5 w-16 rounded" style={{ backgroundColor: template.muted + "50" }} />
                <div className="h-1.5 w-20 rounded" style={{ backgroundColor: template.muted + "50" }} />
              </div>
              <div className="space-y-1">
                <div className="h-2 w-16 rounded" style={{ backgroundColor: template.primary }} />
                <div className="h-1.5 w-20 rounded" style={{ backgroundColor: template.muted + "50" }} />
              </div>
            </div>
            <div className="flex gap-1 pt-2">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="h-4 w-4 rounded" style={{ backgroundColor: template.accentColor + "40" }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default: Two-column/Timeline templates
  return (
    <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white shadow-sm">
      <div className="h-56 p-3 space-y-2">
        <div className="space-y-1">
          <div className="h-3 w-28 rounded" style={{ backgroundColor: template.primary }} />
          <div className="h-1.5 w-24 rounded" style={{ backgroundColor: template.accentColor }} />
          <div className="h-1 w-32 rounded" style={{ backgroundColor: template.muted + "60" }} />
        </div>
        <div className="h-px" style={{ backgroundColor: template.muted + "40" }} />
        <div className="space-y-1">
          <div className="h-1.5 w-full rounded" style={{ backgroundColor: template.muted + "60" }} />
          <div className="h-1.5 w-5/6 rounded" style={{ backgroundColor: template.muted + "60" }} />
        </div>
        <div className="space-y-2 pt-1">
          <div className="h-2 w-16 rounded" style={{ backgroundColor: template.primary }} />
          <div className="flex gap-2">
            <div className="h-2 w-2 rounded-full mt-0.5" style={{ backgroundColor: template.accentColor }} />
            <div className="flex-1 space-y-1">
              <div className="h-1.5 w-full rounded" style={{ backgroundColor: template.muted + "50" }} />
              <div className="h-1.5 w-4/5 rounded" style={{ backgroundColor: template.muted + "50" }} />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 pt-2">
          <div className="space-y-1">
            <div className="h-2 w-12 rounded" style={{ backgroundColor: template.primary }} />
            <div className="h-1.5 w-16 rounded" style={{ backgroundColor: template.muted + "50" }} />
          </div>
          <div className="space-y-1">
            <div className="h-2 w-16 rounded" style={{ backgroundColor: template.primary }} />
            <div className="h-1.5 w-20 rounded" style={{ backgroundColor: template.muted + "50" }} />
          </div>
        </div>
      </div>
    </div>
  );
}
