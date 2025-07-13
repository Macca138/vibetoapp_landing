'use client';

import { m } from 'framer-motion';
import { fadeInUp, containerVariants } from '@/lib/animations';
import WaitlistForm from './WaitlistForm';

export default function CTA() {
  return (
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
            Join thousands of developers who've transformed their chaotic ideas into successful projects.
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
  );
}