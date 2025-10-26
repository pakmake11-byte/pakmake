import { AboutHero } from '@/components/about/AboutHero'
import { CompanyMission } from '@/components/about/CompanyMission'
import { TeamShowcase } from '@/components/about/TeamShowcase'
import { GlobalPresence } from '@/components/about/GlobalPresence'

export default function About() {
  return (
    <div className="min-h-screen pt-16 overflow-x-hidden">
      <AboutHero />
      <CompanyMission />
      <TeamShowcase />
      <GlobalPresence />
    </div>
  )
}