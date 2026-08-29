import Layout from './components/Layout'
import Hero from './sections/Hero'
import Projects from './sections/Projects'
import Journey from './sections/Journey'
import About from './sections/About'
import Services from './sections/Services'
import Contact from './sections/Contact'

export default function App() {
  return (
    <Layout>
      <Hero />
      <Projects />
      <Journey />
      <About />
      <Services />
      <Contact />
    </Layout>
  )
}
