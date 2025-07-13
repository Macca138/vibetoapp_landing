export default function Footer() {
  return (
    <footer className="bg-slate-900/50 border-t border-slate-800">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="text-2xl font-bold text-white">
            VibeToApp
          </div>
          <p className="text-sm text-gray-400 text-center">
            Transform your ideas into actionable project plans with AI-powered guidance.
          </p>
          <p className="text-xs text-gray-500">
            © 2025 VibeToApp. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}