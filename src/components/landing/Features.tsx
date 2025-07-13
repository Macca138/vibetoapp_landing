'use client';

import { m } from 'framer-motion';
import { fadeInUp, scaleIn, containerVariants } from '@/lib/animations';
import { 
  Lightbulb, 
  Target, 
  Users, 
  Layers, 
  GitBranch, 
  Code, 
  DollarSign, 
  Rocket, 
  FileText 
} from 'lucide-react';

const features = [
  {
    step: 1,
    icon: <Lightbulb className="h-6 w-6" />,
    name: 'Articulate Idea',
    description: 'Start with a simple description of your app idea, no matter how vague or rough.',
  },
  {
    step: 2,
    icon: <Target className="h-6 w-6" />,
    name: 'Fleshing Out',
    description: 'AI helps you clarify the main problem your app solves and its core value proposition.',
  },
  {
    step: 3,
    icon: <Users className="h-6 w-6" />,
    name: 'High Level Technical Architecture',
    description: 'Design the overall technical structure and system architecture for your application.',
  },
  {
    step: 4,
    icon: <Layers className="h-6 w-6" />,
    name: 'Feature Stories & UX Flows',
    description: 'Create detailed user stories and UX flows for your app features.',
  },
  {
    step: 5,
    icon: <GitBranch className="h-6 w-6" />,
    name: 'Design System & Style Guide',
    description: 'Create a comprehensive visual identity and design system for your app.',
  },
  {
    step: 6,
    icon: <Code className="h-6 w-6" />,
    name: 'Screen States Specification',
    description: 'Define detailed screen layouts and states for each feature.',
  },
  {
    step: 7,
    icon: <DollarSign className="h-6 w-6" />,
    name: 'Comprehensive Technical Specification',
    description: 'Create a detailed technical specification document for development.',
  },
  {
    step: 8,
    icon: <Rocket className="h-6 w-6" />,
    name: 'Development Rules Integration',
    description: 'Apply best practices and development standards for your tech stack.',
  },
  {
    step: 9,
    icon: <FileText className="h-6 w-6" />,
    name: 'Implementation Planning',
    description: 'Break down the technical specification into detailed, actionable development tasks.',
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 sm:py-32 bg-slate-900/50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <m.div 
          className="mx-auto max-w-2xl text-center"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <m.h2 
            className="text-base font-semibold leading-7 text-purple-400"
            variants={fadeInUp}
          >
            AI-Powered Workflow
          </m.h2>
          <m.p 
            className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl"
            variants={fadeInUp}
          >
            The 9-Step Planning Journey
          </m.p>
          <m.p 
            className="mt-6 text-lg leading-8 text-gray-300"
            variants={fadeInUp}
          >
            Our proven process guides you from initial concept to development-ready specifications
          </m.p>
        </m.div>
        
        <m.div 
          className="mx-auto mt-16 max-w-7xl"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <m.div 
                key={feature.step} 
                className="bg-slate-800/50 border border-slate-700 p-6 rounded-2xl hover:bg-slate-800/70 transition-colors cursor-pointer group"
                variants={scaleIn}
                whileHover={{
                  y: -4,
                  transition: { duration: 0.3, ease: 'easeOut' }
                }}
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400">
                    {feature.icon}
                  </div>
                  <div>
                    <div className="text-sm text-purple-400 font-medium">
                      Step {feature.step}
                    </div>
                    <h3 className="text-white text-sm font-semibold">
                      {feature.name}
                    </h3>
                  </div>
                </div>
                <p className="text-gray-300 text-sm leading-6">
                  {feature.description}
                </p>
              </m.div>
            ))}
          </div>
        </m.div>
      </div>
    </section>
  );
}