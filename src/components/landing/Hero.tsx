'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { m } from 'framer-motion';
import WaitlistForm from './WaitlistForm';
import { fadeInUp, fadeIn, containerVariants } from '@/lib/animations';

const heroImages = [
  {
    src: '/images/pexels-diva-plavalaguna-6149793.jpg',
    alt: 'Professional woman coding at desk',
    flip: false, // Person facing right
    textPosition: 'left' // Text on left, person looks toward it
  },
  {
    src: '/images/pexels-olly-926390.jpg', 
    alt: 'Young professional at computer',
    flip: false, // Person naturally facing right
    textPosition: 'left' // Text on left, person looks toward it
  },
  {
    src: '/images/pexels-rdne-5915203.jpg',
    alt: 'Team collaborating on project',
    flip: true, // Flip so people face right
    textPosition: 'left' // Text on left, people look toward it
  },
  {
    src: '/images/pexels-shvetsa-3727459.jpg',
    alt: 'Developer working on laptop',
    flip: true, // Flip so person faces right
    textPosition: 'left' // Text on left, person looks toward it
  },
  {
    src: '/images/pexels-tima-miroshnichenko-5198239.jpg',
    alt: 'Professional coding session',
    flip: false, // Person facing left naturally
    textPosition: 'right' // Text on right, person looks toward it
  },
  {
    src: '/images/pexels-vanessa-garcia-6325895.jpg',
    alt: 'Creative professional at work',
    flip: false, // Person facing right naturally
    textPosition: 'left' // Text on left, person looks toward it
  },
  {
    src: '/images/pexels-vlada-karpovich-4050292.jpg',
    alt: 'Focused developer coding',
    flip: true, // Flip so person faces right
    textPosition: 'left' // Text on left, person looks toward it
  },
  {
    src: '/images/pexels-yankrukov-4458386.jpg',
    alt: 'Developer working on project',
    flip: false, // Person facing left naturally
    textPosition: 'right' // Text on right, person looks toward it
  }
];

export default function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  useEffect(() => {
    // Randomly select an image on component mount
    const randomIndex = Math.floor(Math.random() * heroImages.length);
    setCurrentImageIndex(randomIndex);
  }, []);
  
  const currentImage = heroImages[currentImageIndex];
  const isTextLeft = currentImage.textPosition === 'left';
  
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Full-width background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={currentImage.src}
          alt={currentImage.alt}
          fill
          className={`object-cover object-center transition-opacity duration-500 ${currentImage.flip ? 'scale-x-[-1]' : ''} ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          priority
          onLoad={() => setImageLoaded(true)}
        />
        {/* Fallback gradient background */}
        <div className={`absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 transition-opacity duration-500 ${imageLoaded ? 'opacity-0' : 'opacity-100'}`} />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/40" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 w-full">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-screen py-24`}>
          {/* Text Content */}
          <m.div 
            className={`${isTextLeft ? 'lg:order-1' : 'lg:order-2'} text-center lg:text-left`}
            variants={containerVariants}
            initial="initial"
            animate="animate"
          >
            <m.h1 
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
              variants={fadeInUp}
            >
              Transform Vague Ideas into{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                Concrete Plans
              </span>
            </m.h1>
            <m.p 
              className="text-xl text-gray-100 mb-8 max-w-2xl"
              variants={fadeInUp}
            >
              Stop jumping into development without a plan. Our AI-powered 9-step methodology 
              guides you from rough concepts to detailed, actionable project specifications.
            </m.p>
            
            {/* Waitlist Form for Hero */}
            <m.div className="mb-8" variants={fadeIn} id="waitlist">
              <m.p 
                className="text-lg font-semibold text-white mb-6"
                variants={fadeInUp}
              >
                Join the waitlist to get early access
              </m.p>
              <div className="flex justify-center lg:justify-start">
                <WaitlistForm source="hero" />
              </div>
            </m.div>
            
            <m.div 
              className="flex items-center justify-center lg:justify-start"
              variants={fadeInUp}
            >
              <Link
                href="#features"
                className="inline-flex items-center text-lg font-semibold leading-6 text-white hover:text-purple-400 transition-colors duration-200 bg-black/20 backdrop-blur-sm px-6 py-3 rounded-full"
              >
                Learn more <span className="ml-2" aria-hidden="true">→</span>
              </Link>
            </m.div>
          </m.div>
          
          {/* Empty space for image (image is background) */}
          <div className={`${isTextLeft ? 'lg:order-2' : 'lg:order-1'} hidden lg:block`}>
            {/* This space allows the background image person to be visible */}
          </div>
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute inset-x-0 top-0 -z-10 transform-gpu overflow-hidden blur-3xl" aria-hidden="true">
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
    </section>
  );
}