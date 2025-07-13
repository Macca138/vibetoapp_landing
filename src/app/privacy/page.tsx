import Link from 'next/link';
import { Metadata } from 'next';
import PrivacyPolicy from '@/components/landing/PrivacyPolicy';

export const metadata: Metadata = {
  title: 'Privacy Policy - VibeToApp',
  description: 'VibeToApp privacy policy and data protection information for GDPR compliance.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Simple header */}
      <header className="border-b border-slate-800">
        <div className="mx-auto max-w-7xl px-6 py-4 lg:px-8">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-white hover:text-purple-400 transition-colors">
              VibeToApp
            </Link>
            <Link href="/" className="text-sm text-gray-300 hover:text-white transition-colors">
              ← Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Privacy Policy Content */}
      <main>
        <PrivacyPolicy />
      </main>

      {/* Simple footer */}
      <footer className="border-t border-slate-800">
        <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
          <div className="text-center">
            <p className="text-xs text-gray-500">
              © 2025 VibeToApp. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}