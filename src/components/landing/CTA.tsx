'use client';

import { m } from 'framer-motion';
import { fadeInUp, containerVariants, scaleIn } from '@/lib/animations';
import { CheckCircle } from 'lucide-react';
import WaitlistForm from './WaitlistForm';

export default function CTA() {
  return (
    <>
      {/* Pricing Section */}
      <section id="pricing" className="py-24 sm:py-32 bg-slate-800/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <m.div 
            className="mx-auto max-w-4xl text-center"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            <m.h2 
              className="text-base font-semibold leading-7 text-purple-400"
              variants={fadeInUp}
            >
              Simple Pricing
            </m.h2>
            <m.p 
              className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl"
              variants={fadeInUp}
            >
              Flexible pricing for every need
            </m.p>
            
            {/* Pricing Cards */}
            <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 gap-8 lg:max-w-4xl lg:grid-cols-3">
              {/* Project Unlock */}
              <m.div 
                className="rounded-3xl bg-slate-800/50 border border-slate-700 p-8 ring-1 ring-gray-700/50"
                variants={scaleIn}
              >
                <h3 className="text-lg font-semibold leading-8 text-white">
                  Project Unlock
                </h3>
                <p className="mt-4 text-sm leading-6 text-gray-300">
                  Perfect for single projects
                </p>
                <p className="mt-6 flex items-baseline gap-x-1">
                  <span className="text-4xl font-bold tracking-tight text-white">$9.97</span>
                  <span className="text-sm font-semibold leading-6 text-gray-300">one-time</span>
                </p>
                <ul className="mt-8 space-y-3 text-sm leading-6 text-gray-300">
                  <li className="flex gap-x-3">
                    <CheckCircle className="h-6 w-5 flex-none text-purple-400" aria-hidden="true" />
                    Complete 9-step AI workflow
                  </li>
                  <li className="flex gap-x-3">
                    <CheckCircle className="h-6 w-5 flex-none text-purple-400" aria-hidden="true" />
                    Export ready specifications
                  </li>
                  <li className="flex gap-x-3">
                    <CheckCircle className="h-6 w-5 flex-none text-purple-400" aria-hidden="true" />
                    Lifetime access to project
                  </li>
                </ul>
              </m.div>
              
              {/* Monthly - Most Popular */}
              <m.div 
                className="rounded-3xl bg-slate-800/50 border border-purple-500 p-8 ring-1 ring-purple-500/50 relative"
                variants={scaleIn}
              >
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-purple-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
                <h3 className="text-lg font-semibold leading-8 text-white">
                  Monthly Plan
                </h3>
                <p className="mt-4 text-sm leading-6 text-gray-300">
                  Best for active developers
                </p>
                <p className="mt-6 flex items-baseline gap-x-1">
                  <span className="text-4xl font-bold tracking-tight text-white">$29.97</span>
                  <span className="text-sm font-semibold leading-6 text-gray-300">per month</span>
                </p>
                <ul className="mt-8 space-y-3 text-sm leading-6 text-gray-300">
                  <li className="flex gap-x-3">
                    <CheckCircle className="h-6 w-5 flex-none text-purple-400" aria-hidden="true" />
                    Unlimited projects
                  </li>
                  <li className="flex gap-x-3">
                    <CheckCircle className="h-6 w-5 flex-none text-purple-400" aria-hidden="true" />
                    All AI workflow features
                  </li>
                  <li className="flex gap-x-3">
                    <CheckCircle className="h-6 w-5 flex-none text-purple-400" aria-hidden="true" />
                    Priority support
                  </li>
                  <li className="flex gap-x-3">
                    <CheckCircle className="h-6 w-5 flex-none text-purple-400" aria-hidden="true" />
                    Advanced analytics
                  </li>
                </ul>
              </m.div>
              
              {/* Yearly */}
              <m.div 
                className="rounded-3xl bg-slate-800/50 border border-slate-700 p-8 ring-1 ring-gray-700/50"
                variants={scaleIn}
              >
                <h3 className="text-lg font-semibold leading-8 text-white">
                  Yearly Plan
                </h3>
                <p className="mt-4 text-sm leading-6 text-gray-300">
                  Save $59.94 per year
                </p>
                <p className="mt-6 flex items-baseline gap-x-1">
                  <span className="text-4xl font-bold tracking-tight text-white">$299.70</span>
                  <span className="text-sm font-semibold leading-6 text-gray-300">per year</span>
                </p>
                <ul className="mt-8 space-y-3 text-sm leading-6 text-gray-300">
                  <li className="flex gap-x-3">
                    <CheckCircle className="h-6 w-5 flex-none text-purple-400" aria-hidden="true" />
                    Unlimited projects
                  </li>
                  <li className="flex gap-x-3">
                    <CheckCircle className="h-6 w-5 flex-none text-purple-400" aria-hidden="true" />
                    All AI workflow features
                  </li>
                  <li className="flex gap-x-3">
                    <CheckCircle className="h-6 w-5 flex-none text-purple-400" aria-hidden="true" />
                    Priority support
                  </li>
                  <li className="flex gap-x-3">
                    <CheckCircle className="h-6 w-5 flex-none text-purple-400" aria-hidden="true" />
                    2 months free
                  </li>
                </ul>
              </m.div>
            </div>
          </m.div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-24 sm:py-32 bg-gradient-to-r from-purple-900/20 to-pink-900/20">
        <div className="px-6 sm:px-6 lg:px-8">
          <m.div 
            className="mx-auto max-w-4xl text-center"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            <m.h2 
              className="text-3xl font-bold text-white mb-6"
              variants={fadeInUp}
            >
              Ready to Plan Like a Pro?
            </m.h2>
            <m.p 
              className="text-xl text-gray-300 mb-8"
              variants={fadeInUp}
            >
              Join thousands of developers who&apos;ve transformed their chaotic ideas into successful projects.
            </m.p>
            
            {/* Waitlist Form */}
            <m.div 
              className="mt-10 flex justify-center"
              variants={fadeInUp}
            >
              <div className="w-full max-w-md">
                <h3 className="text-base font-semibold text-white mb-4">
                  Be the first to know when we launch
                </h3>
                <WaitlistForm source="cta" />
              </div>
            </m.div>
            
            <m.div 
              className="mt-8 text-sm text-gray-300"
              variants={fadeInUp}
            >
              <p className="mt-2">No credit card required • Free to start • Cancel anytime</p>
            </m.div>
          </m.div>
        </div>
      </section>
    </>
  );
}