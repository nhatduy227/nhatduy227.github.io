'use client'

export default function Hero() {
  return (
    <section id="hero" className="min-h-screen flex items-center px-8 lg:pl-8">
      <div className="max-w-4xl mx-auto lg:mx-0">
        <p className="text-accent font-mono text-sm md:text-base mb-4">
          Hi, my name is
        </p>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight">
          Nom Phan.
        </h1>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-light mb-6 leading-tight whitespace-nowrap">
          I build high-performance systems.
        </h2>
        <p className="text-slate text-base md:text-lg max-w-2xl mb-12 leading-relaxed">
          I'm a software engineer specializing in architecting{' '}
          <a
            href="#"
            className="text-accent inline-block relative group"
          >
            high-performance systems
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </a>
          {' '}and optimizing{' '}
          <a
            href="#"
            className="text-accent inline-block relative group"
          >
            complex algorithms
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </a>
          . Currently, I'm focused on accelerating Deep Learning infrastructure at{' '}
          <a
            href="https://www.nvidia.com/en-us/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent inline-block relative group"
          >
            NVIDIA
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </a>
          .
        </p>
        <a
          href="/data/NomPhanResume.pdf"
          download="NomPhanResume.pdf"
          className="inline-block border border-accent text-accent px-6 py-3 rounded font-mono text-sm transition-all hover:bg-accent/10 hover:shadow-[0_0_20px_rgba(127,0,255,0.3)]"
        >
          Check out my resume
        </a>
      </div>
    </section>
  )
}
