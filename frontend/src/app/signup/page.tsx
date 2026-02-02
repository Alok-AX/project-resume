'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { signupUser, clearError } from '@/store/slices/authSlice';
import type { RootState, AppDispatch } from '@/store';

export default function SignupPage() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, isAuthenticated } = useSelector((state: RootState) => state.auth);
  
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  });

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  // Clear error on unmount
  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await dispatch(signupUser(formData)).unwrap();
      console.log('Signup successful:', result);
      router.push('/dashboard');
    } catch (err) {
      console.error('Signup failed:', err);
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-slate-950">
      {/* Left Side - Hero Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-linear-to-br from-slate-800 to-slate-950 dark:from-slate-900 dark:to-black flex-col justify-between p-12 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 h-40 w-40 rounded-full bg-blue-500 blur-3xl" />
          <div className="absolute bottom-20 right-20 h-60 w-60 rounded-full bg-purple-500 blur-3xl" />
        </div>

        {/* Logo */}
        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-2">
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-white/10 text-white font-semibold">C</span>
            <span className="text-xl font-bold">CareerPad</span>
          </Link>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 space-y-8">
          <h1 className="text-4xl font-bold leading-tight">
            Craft a CV that gets you hired.
          </h1>
          <p className="text-lg text-slate-300">
            Join over 50,000 professionals who have landed their dream jobs using our AI-powered resume builder and career tools.
          </p>

          {/* Testimonial */}
          <div className="flex items-center gap-3 pt-4">
            <div className="flex -space-x-2">
              <div className="h-10 w-10 rounded-full bg-linear-to-br from-blue-400 to-blue-600 ring-2 ring-slate-800 flex items-center justify-center text-sm font-bold">A</div>
              <div className="h-10 w-10 rounded-full bg-linear-to-br from-green-400 to-green-600 ring-2 ring-slate-800 flex items-center justify-center text-sm font-bold">B</div>
              <div className="h-10 w-10 rounded-full bg-linear-to-br from-purple-400 to-purple-600 ring-2 ring-slate-800 flex items-center justify-center text-sm font-bold">C</div>
            </div>
            <div>
              <div className="flex gap-1 text-yellow-400 text-sm">
                ★★★★★
              </div>
              <p className="text-xs text-slate-400 mt-1">Trusted by 10k users</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 text-sm text-slate-400">
          <p>© 2026 CareerPad Inc.</p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-6 sm:px-8 py-12">
        {/* Mobile Logo */}
        <div className="lg:hidden absolute top-6 left-6">
          <Link href="/" className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#1a47e8] text-white font-semibold text-xs">C</span>
            <span className="text-base font-bold text-slate-900 dark:text-white">CareerPad</span>
          </Link>
        </div>

        {/* Login Link */}
        <div className="absolute top-6 right-6 text-sm">
          <span className="text-slate-600 dark:text-slate-400">Already have an account?</span>{' '}
          <Link href="/login" className="font-semibold text-[#1a47e8] hover:text-[#0f32b8]">
            Log In
          </Link>
        </div>

        <div className="w-full max-w-md mt-12 lg:mt-0">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
              Create your account
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Start building your professional brand today.
            </p>
          </div>

          {/* OAuth Buttons */}
          <div className="mb-6">
            <div className="flex gap-3 mb-4">
              <button
                type="button"
                className="flex-1 py-3 px-4 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 bg-white dark:bg-slate-900 transition flex items-center justify-center gap-2 font-semibold text-slate-700 dark:text-slate-300"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Google
              </button>
              <button
                type="button"
                className="flex-1 py-3 px-4 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 bg-white dark:bg-slate-900 transition flex items-center justify-center gap-2 font-semibold text-slate-700 dark:text-slate-300"
              >
                <svg className="h-5 w-5" fill="#0A66C2" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn
              </button>
            </div>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200 dark:border-slate-700" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-2 bg-slate-50 dark:bg-slate-950 text-slate-500 dark:text-slate-400 font-semibold uppercase">
                  Or continue with email
                </span>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="e.g. John Morgan"
                className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#1a47e8] focus:border-transparent transition"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@company.com"
                className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#1a47e8] focus:border-transparent transition"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#1a47e8] focus:border-transparent transition"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    {showPassword ? (
                      <path d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    ) : (
                      <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    )}
                  </svg>
                </button>
              </div>
            </div>

            {/* Terms */}
            <div className="text-xs text-slate-600 dark:text-slate-400 pt-2">
              By continuing, you agree to our{' '}
              <Link href="#" className="font-semibold text-[#1a47e8] hover:text-[#0f32b8]">
                Terms and Conditions
              </Link>{' '}
              and{' '}
              <Link href="#" className="font-semibold text-[#1a47e8] hover:text-[#0f32b8]">
                Privacy Policy
              </Link>
              .
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#1a47e8] hover:bg-[#0f32b8] text-white font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2"
            >
              Create Account
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
