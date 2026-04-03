'use client';

import { YStack } from '@mezon-tutors/app/ui';
import Hero from './components/Hero/Hero';
import FeaturesSection from './components/FeaturesSection/FeaturesSection';
import Stats from './components/Stats/Stats';
import Seamless from './components/Seamless/Seamless';

export default function Home() {
  return (
    <YStack minHeight="100vh" backgroundColor="$homePageBackground">
      <Hero />
      <FeaturesSection />
      <Stats />
      <Seamless />
    </YStack>
  );
}
