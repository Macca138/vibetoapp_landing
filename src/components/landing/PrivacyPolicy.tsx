'use client';

import { m } from 'framer-motion';
import { fadeInUp, containerVariants } from '@/lib/animations';

export default function PrivacyPolicy() {
  return (
    <section id="privacy" className="py-24 sm:py-32 bg-slate-800/30">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <m.div 
          className="mx-auto max-w-3xl"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <m.h2 
            className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-8"
            variants={fadeInUp}
          >
            Privacy & Data Protection
          </m.h2>
          
          <m.div 
            className="prose prose-gray prose-invert max-w-none"
            variants={fadeInUp}
          >
            <h3 className="text-xl font-semibold text-white mb-4">Waitlist Data Collection</h3>
            <p className="text-gray-300 mb-6">
              By joining our waitlist, you consent to us collecting and processing your email address 
              for the purpose of notifying you about VibeToApp&apos;s launch and providing you with early access.
            </p>

            <h3 className="text-xl font-semibold text-white mb-4">Your Rights (GDPR)</h3>
            <ul className="text-gray-300 space-y-2 mb-6">
              <li>• <strong>Access:</strong> Request a copy of your personal data</li>
              <li>• <strong>Rectification:</strong> Correct any inaccurate personal data</li>
              <li>• <strong>Erasure:</strong> Request deletion of your personal data</li>
              <li>• <strong>Portability:</strong> Request transfer of your data</li>
              <li>• <strong>Withdrawal:</strong> Unsubscribe at any time</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-4">Data Processing</h3>
            <div className="bg-slate-700/50 p-6 rounded-lg mb-6">
              <p className="text-gray-300 mb-4">
                <strong>What we collect:</strong> Email address, signup source, referrer URL
              </p>
              <p className="text-gray-300 mb-4">
                <strong>Why we collect it:</strong> To notify you about product launch and provide early access
              </p>
              <p className="text-gray-300 mb-4">
                <strong>Legal basis:</strong> Consent (Article 6(1)(a) GDPR)
              </p>
              <p className="text-gray-300">
                <strong>Data retention:</strong> Until product launch + 12 months, or until you unsubscribe
              </p>
            </div>

            <h3 className="text-xl font-semibold text-white mb-4">Contact & Data Protection</h3>
            <p className="text-gray-300 mb-4">
              Data Controller: VibeToApp<br/>
              Email: <a href="mailto:privacy@vibetoapp.com" className="text-purple-400 hover:text-purple-300">privacy@vibetoapp.com</a>
            </p>
            
            <p className="text-gray-300 text-sm">
              We use secure, encrypted storage and will never sell your data to third parties. 
              You can unsubscribe from our communications at any time using the link in our emails 
              or by contacting us directly.
            </p>
          </m.div>
        </m.div>
      </div>
    </section>
  );
}