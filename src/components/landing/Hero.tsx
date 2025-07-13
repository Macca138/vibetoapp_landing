'use client';

import Link from 'next/link';
import { m } from 'framer-motion';
import WaitlistForm from './WaitlistForm';
import { fadeInUp, fadeIn, containerVariants } from '@/lib/animations';

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* Hero Image - Developer coding with inspiration */}
        <m.div 
          className="mx-auto max-w-4xl mb-16"
          variants={fadeIn}
          initial="initial"
          animate="animate"
        >
          <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-purple-500/20">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl md:text-8xl mb-4">💻✨</div>
                <p className="text-lg md:text-xl text-purple-200 font-medium">
                  From Idea to Code
                </p>
                <p className="text-sm md:text-base text-purple-300/80 mt-2">
                  Transform your vision into reality
                </p>
              </div>
            </div>
            {/* Floating code elements */}
            <div className="absolute top-4 left-4 bg-slate-800/60 backdrop-blur rounded-md px-3 py-1 text-xs text-green-400 font-mono">
              &gt; npm create app
            </div>
            <div className="absolute top-4 right-4 bg-slate-800/60 backdrop-blur rounded-md px-3 py-1 text-xs text-blue-400 font-mono">
              &lt;App /&gt;
            </div>
            <div className="absolute bottom-4 left-4 bg-slate-800/60 backdrop-blur rounded-md px-3 py-1 text-xs text-yellow-400 font-mono">
              console.log("success!")
            </div>
            <div className="absolute bottom-4 right-4 bg-slate-800/60 backdrop-blur rounded-md px-3 py-1 text-xs text-purple-400 font-mono">
              🚀 deployed
            </div>
          </div>
        </m.div>
        <m.div 
          className="mx-auto max-w-4xl text-center"
          variants={containerVariants}
          initial="initial"
          animate="animate"
        >
          <m.h1 
            className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight"
            variants={fadeInUp}
          >
            Transform Vague Ideas into{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              Concrete Plans
            </span>
          </m.h1>
          <m.p 
            className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto"
            variants={fadeInUp}
          >
            Stop jumping into development without a plan. Our AI-powered 9-step methodology 
            guides you from rough concepts to detailed, actionable project specifications.
          </m.p>
          
          {/* Waitlist Form for Hero */}
          <m.div className="mt-10" variants={fadeIn} id="waitlist">
            <p className="text-sm font-semibold text-white mb-4">
              Join the waitlist to get early access
            </p>
            <div className="flex justify-center">
              <WaitlistForm source="hero" />
            </div>
          </m.div>
          
          <m.div 
            className="mt-6 flex items-center justify-center"
            variants={fadeInUp}
          >
            <Link
              href="#features"
              className="text-sm font-semibold leading-6 text-white hover:text-purple-400 transition-colors duration-200"
            >
              Learn more <span aria-hidden="true">→</span>
            </Link>
          </m.div>
        </m.div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute inset-x-0 top-0 -z-10 transform-gpu overflow-hidden blur-3xl" aria-hidden="true">
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
    </section>
  );
}