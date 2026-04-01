'use client';

import { useTranslations } from 'next-intl';
import Hero from './Hero/Hero';
import Features from './Features/Features';
import Stats from './Stats/Stats';
import Seamless from './Seamless/Seamless';
import styles from './index.module.css';

export default function LandingPage() {
  return (
    <div className={styles.landingPage}>
      <Hero />
      <Features />
      <Stats />
      <Seamless />
    </div>
  );
}