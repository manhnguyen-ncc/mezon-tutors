'use client';

import Header from './Header/Header';
import Hero from './Hero/Hero';
import Features from './Features/Features';
import Stats from './Stats/Stats';
import Seamless from './Seamless/Seamless';
import Footer from './Footer/Footer';
import { YStack } from 'tamagui';

export default function LandingPage() {
  return (
    <YStack backgroundColor="#050A15" minHeight="100vh">
      <Header />
      <Hero />
      <Features />
      <Stats />
      <Seamless />
      <Footer />
    </YStack>
  );
}