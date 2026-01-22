'use client'

const projects = [
  {
    title: 'Bloomberg vLEI Terminal',
    description: 'A web application for managing vLEIs across 200+ countries. Built with React and TypeScript.',
    tech: ['React', 'TypeScript', 'Node.js'],
    link: 'https://lei.bloomberg.com/',
    github: null,
  },
  {
    title: 'Mock&Roll: AI-powered Interview Platform',
    description: 'An interview platform to help technical interview prep by tone and facial analysis.',
    tech: ['React', 'Python', 'OpenCV'],
    link: 'https://mocknroll.io/',
    github: null,
  },
  {
    title: '3D GUI for Indoor Autonomous Drone Systems',
    description: 'A 3D visualization system for controlling and monitoring autonomous drone operations indoors.',
    tech: ['C#', 'WinForms', 'Tello Drones'],
    link: 'https://research.coe.drexel.edu/caee/basl/',
    github: null,
  },
  {
    title: 'Running Hand: ASL Learning Game',
    description: 'An endless runner game that teaches American Sign Language through interactive gameplay.',
    tech: ['C#', 'Unity', 'OpenCV'],
    link: 'https://devpost.com/software/asl-alphabet',
    github: null,
  },
]

export default function Projects() {
  return (
    <section id="projects" className="min-h-screen py-32 px-8 lg:pl-8">
      <div className="max-w-4xl mx-auto lg:mx-0">
        <h2 className="text-3xl font-bold text-white mb-12 flex items-center">
          <span className="text-accent text-xl mr-4 font-mono">03.</span>
          Some Things I&apos;ve Built
        </h2>

        <div className="grid gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group relative bg-navy-light/50 rounded-lg p-6 hover:bg-navy-light transition-all duration-300 border border-navy-light hover:border-accent/50"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-accent transition-colors">
                    {project.link ? (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center"
                      >
                        {project.title}
                        <svg
                          className="ml-2 w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </a>
                    ) : (
                      project.title
                    )}
                  </h3>
                  <p className="text-slate-light mb-4 leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-3">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs font-mono text-slate border border-slate/30 px-3 py-1 rounded hover:text-accent hover:border-accent/50 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate hover:text-accent transition-colors ml-4"
                    aria-label="GitHub"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
