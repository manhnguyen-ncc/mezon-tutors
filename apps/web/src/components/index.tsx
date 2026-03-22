import Hero from './Hero/Hero'
import Features from './Features/Features'
import Stats from './Stats/Stats'
import Seamless from './Seamless/Seamless'

export default function LandingPage() {
  return (
    <div className="bg-[#050A15] min-h-screen text-white">
      <Hero />
      <Features />
      <Stats />
      <Seamless />
    </div>
  )
}