'use client'

import { useState } from 'react'
import HeroSection from '@/components/HeroSection'
import PainPointsSection from '@/components/PainPointsSection'
import SolutionSection from '@/components/SolutionSection'
import SocialProofSection from '@/components/SocialProofSection'
import RegistrationForm from '@/components/RegistrationForm'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <PainPointsSection />
      <SolutionSection />
      <SocialProofSection />
      <RegistrationForm />
      <Footer />
    </main>
  )
}
