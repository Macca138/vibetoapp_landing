'use client';

import { m } from 'framer-motion';
import { fadeInUp, containerVariants } from '@/lib/animations';

const features = [
  {
    name: 'AI-Powered Guidance',
    description: 'Our intelligent system helps you articulate and refine your ideas through a proven 9-step methodology.',
    icon: '🧠',
  },
  {
    name: 'Structured Workflow',
    description: 'Follow a step-by-step process that transforms vague concepts into detailed project specifications.',
    icon: '📋',
  },
  {
    name: 'Export Ready Plans',
    description: 'Generate professional documentation and project plans ready for development teams.',
    icon: '📄',
  },
  {
    name: 'Save Time & Money',
    description: 'Avoid costly mistakes and endless revisions with clear requirements from the start.',
    icon: '💰',
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <m.div 
          className="mx-auto max-w-2xl text-center"
          variants={containerVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <m.h2 
            className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
            variants={fadeInUp}
          >
            Turn Ideas Into Action
          </m.h2>
          <m.p 
            className="mt-6 text-lg leading-8 text-gray-300"
            variants={fadeInUp}
          >
            Our proven methodology helps founders, product managers, and developers 
            create clear, actionable project specifications.
          </m.p>
        </m.div>
        
        <m.div 
          className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none"
          variants={containerVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2 xl:grid-cols-4">
            {features.map((feature, index) => (
              <m.div 
                key={feature.name} 
                className="flex flex-col items-center text-center"
                variants={fadeInUp}
                transition={{ delay: index * 0.1 }}
              >
                <dt className="flex flex-col items-center gap-y-4">
                  <div className="text-4xl">{feature.icon}</div>
                  <div className="text-base font-semibold leading-7 text-white">
                    {feature.name}
                  </div>
                </dt>
                <dd className="mt-1 text-base leading-7 text-gray-300">
                  {feature.description}
                </dd>
              </m.div>
            ))}
          </dl>
        </m.div>
      </div>
    </section>
  );
}