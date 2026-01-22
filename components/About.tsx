'use client'

import Image from 'next/image'

export default function About() {
  return (
    <section id="about" className="min-h-screen py-32 px-8 lg:pl-8">
      <div className="max-w-4xl mx-auto lg:mx-0">
        <h2 className="text-3xl font-bold text-white mb-12 flex items-center">
          <span className="text-accent text-xl mr-4 font-mono">01.</span>
          About Me
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-12 items-start">
          {/* Text Content */}
          <div className="space-y-6 text-slate leading-relaxed order-2 lg:order-1">
            <p>
              Hello! I&apos;m Nom, a software engineer based in New York, NY.
            </p>
            <p>
              I am passionate about building high-performance systems at the intersection of software engineering and{' '}
              <a
                href="#"
                className="text-accent hover:underline inline-block relative group"
              >
                interference models
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </a>
              . While I have a strong foundation in application development, my recent focus has shifted toward designing{' '}
              <a
                href="#"
                className="text-accent hover:underline inline-block relative group"
              >
                AI/ML solutions
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </a>
              {' '}that solve complex, data-heavy problems.
            </p>
            <p>
              My goal is to engineer scalable, intelligent products that bridge the gap between{' '}
              <a
                href="#"
                className="text-accent hover:underline inline-block relative group"
              >
                complex algorithms
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </a>
              {' '}and modern software architecture.
            </p>
            <p>
              Here are a few technologies I&apos;ve been working with recently:
            </p>
            
            <ul className="grid grid-cols-2 gap-2 mt-4 list-none">
              {['JavaScript (ES6+)', 'TypeScript', 'React', 'Next.js', 'Node.js', 'Python'].map((tech) => (
                <li key={tech} className="flex items-center before:content-['▹'] before:text-accent before:mr-3 before:text-sm">
                  <span className="text-slate-light">{tech}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Photo */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[300px] group">
              {/* Outer shadow/outline effect */}
              <div className="absolute -top-4 -right-4 w-full h-full border-2 border-accent rounded transition-all duration-300 group-hover:-top-3 group-hover:-right-3"></div>
              
              {/* Main image container */}
              <div className="relative z-10 bg-accent rounded p-2 transition-all duration-300 group-hover:bg-accent/90">
                <div className="relative w-full aspect-square rounded overflow-hidden">
                  <Image
                    src="/images/nom1.png"
                    alt="Nom Phan"
                    fill
                    className="object-cover rounded"
                    sizes="(max-width: 768px) 100vw, 300px"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
