'use client';

import { useState } from 'react';
import { m } from 'framer-motion';
import AnimatedButton from '../animations/AnimatedButton';
import AnimatedInput from '../animations/AnimatedInput';
import { scaleIn, checkmarkVariants } from '@/lib/animations';

interface WaitlistFormProps {
  source?: string;
}

export default function WaitlistForm({ source = 'landing' }: WaitlistFormProps) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          source,
          referrer: typeof document !== 'undefined' ? document.referrer || undefined : undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      setSuccess(true);
      setEmail('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to join waitlist');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <m.div 
        className="text-center py-8"
        initial="initial"
        animate="animate"
        variants={scaleIn}
      >
        <m.div 
          className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-purple-500/20 mb-4"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        >
          <svg className="h-6 w-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <m.path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M5 13l4 4L19 7"
              variants={checkmarkVariants}
              initial="initial"
              animate="animate"
            />
          </svg>
        </m.div>
        <m.h3 
          className="text-lg font-medium text-white mb-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          You&apos;re on the list!
        </m.h3>
        <m.p 
          className="text-sm text-gray-300"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          We&apos;ll notify you when VibeToApp is ready for you to try.
        </m.p>
      </m.div>
    );
  }

  return (
    <m.form 
      onSubmit={handleSubmit} 
      className="mt-8 sm:flex sm:max-w-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="min-w-0 flex-1">
        <label htmlFor="email" className="sr-only">
          Email address
        </label>
        <AnimatedInput
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
      </div>
      <div className="mt-3 sm:ml-3 sm:mt-0">
        <AnimatedButton
          type="submit"
          disabled={loading}
          className="block w-full px-4 py-3 font-medium"
        >
          {loading ? (
            <m.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-center"
            >
              <m.div
                className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              />
              Joining...
            </m.span>
          ) : (
            'Join Waitlist'
          )}
        </AnimatedButton>
      </div>
      {error && (
        <m.p 
          className="mt-3 text-sm text-red-600"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {error}
        </m.p>
      )}
    </m.form>
  );
}