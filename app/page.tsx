import Sidebar from '@/components/Sidebar'
import SpotlightCursor from '@/components/SpotlightCursor'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Experience from '@/components/Experience'
import Projects from '@/components/Projects'

export default function Home() {
  return (
    <main className="flex min-h-screen">
      <SpotlightCursor />
      <Sidebar />
      <div className="flex-1 lg:ml-64">
        <Hero />
        <About />
        <Experience />
        <Projects />
      </div>
    </main>
  )
}
