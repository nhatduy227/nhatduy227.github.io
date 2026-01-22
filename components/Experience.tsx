'use client'

import { useState } from 'react'

const experiences = [
  {
    company: 'Nvidia',
    role: 'AI Engineer',
    location: 'Ho Chi Minh, Vietnam',
    period: 'Feb. 2026 - Present',
    description: [
      'Optimize end-to-end deep learning training loops, targeting a 20-30% reduction in latency and maximizing GPU clock-cycle utilization across datacenter workloads.',
      'Architect automated profiling workflows for LLM inference (e.g., TRT-LLM), aiming to cut manual workload analysis time by 50% for research and engineering teams.',
      'Drive cross-layer performance strategies (Silicon to Framework) to support exponentially scaling cluster deployments and influence the 3-5 year hardware roadmap.',
    ],
  },
  {
    company: 'Coinbase',
    role: 'Software Engineer',
    location: 'Remote, USA',
    period: 'Jun. 2023 - Jan. 2026',
    description: [
      'Maintained 99.9% uptime for critical contract and customer query services, handling 5000+ requests per day by optimizing factory-patterned microservices (Python, TypeScript).',
      'Accelerated internal data retrieval speed by 25% and improved query accuracy for VISDOM AI by architecting a hybrid RAG framework (dense + sparse) over pgvector and Elasticsearch.',
      'Engineered 8+ critical front-end features using React.js and ASP.NET MVC 5 as part of a major UI revamp.',
    ],
  },
  {
    company: 'Bloomberg',
    role: 'Software Engineer Contractor',
    location: 'Princeton, NJ',
    period: 'Sep. 2022 - Jul. 2023',
    description: [
      'Engineered software system that handles creation of vLEIs for Bloomberg&apos;s partners over 200+ countries (Miro, Figma).',
      'Integrated back-end system with web app that collects required information for vLEIs generation (Python, React.js).',
      'Deployed vLEIs purchasing flow on Bloomberg&apos;s terminal within 9 months, increase profit margin to 20% (Stripe).',
    ],
  },
  {
    company: 'SIG',
    role: 'Software Engineer Co-op',
    location: 'Bala Cynwyd, PA',
    period: 'Sep. 2021 - Mar. 2022',
    description: [
      'Maintained low latency hardware system that handle trading logics to verify 10000+ daily trading records (Python).',
      'Implemented multi-threaded programming to store 3000+ XML files of trading histories to database (C#, SQL).',
    ],
  },
]

export default function Experience() {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <section id="experience" className="min-h-screen py-20 sm:py-32 px-4 sm:px-8 lg:pl-8">
      <div className="max-w-4xl mx-auto lg:mx-0">
        <h2 className="text-3xl font-bold text-white mb-12 flex items-center">
          <span className="text-accent text-xl mr-4 font-mono">02.</span>
          Where I&apos;ve Worked
        </h2>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Tab List */}
          <div className="flex md:flex-col md:border-l border-navy-light overflow-x-auto md:overflow-x-visible -mx-4 sm:mx-0 px-4 sm:px-0 scrollbar-hide">
            {experiences.map((exp, index) => (
              <button
                key={exp.company}
                onClick={() => setActiveTab(index)}
                className={`px-6 py-3 text-sm font-mono whitespace-nowrap border-b md:border-b-0 md:border-l transition-colors flex-shrink-0 ${
                  activeTab === index
                    ? 'text-accent border-accent bg-navy-light/50'
                    : 'text-slate border-navy-light hover:text-accent hover:bg-navy-light/30'
                }`}
              >
                {exp.company}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="flex-1">
            {experiences[activeTab] && (
              <div className="space-y-2">
                <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-2">
                  <div>
                    <h3 className="text-xl font-semibold text-white">
                      <span className="text-accent">{experiences[activeTab].role}</span>{' '}
                      <span className="text-white">@ {experiences[activeTab].company}</span>
                    </h3>
                    {experiences[activeTab].location && (
                      <p className="text-sm text-slate mt-1">{experiences[activeTab].location}</p>
                    )}
                  </div>
                  <p className="text-sm text-slate font-mono mt-2 md:mt-0">{experiences[activeTab].period}</p>
                </div>
                <ul className="space-y-3 mt-6">
                  {experiences[activeTab].description.map((item, idx) => (
                    <li key={idx} className="flex items-start before:content-['▹'] before:text-accent before:mr-3 before:mt-1">
                      <span className="text-slate-light">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
