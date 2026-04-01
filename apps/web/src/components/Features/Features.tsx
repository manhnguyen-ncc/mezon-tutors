'use client';

import { useTranslations } from 'next-intl';
import styles from './Features.module.css';

export default function Features() {
  const t = useTranslations('Home.Features');

  return (
    <section className={styles.features}>
      {/* TOP */}
      <div className={styles.top}>
        <div className={styles.topLeft}>
          <h2>{t('title')}</h2>
          <p>{t('description')}</p>
        </div>

        <a className={styles.explore}>{t('exploreAll')}</a>
      </div>

      {/* CARDS */}
      <div className={styles.cards}>
        <div className={styles.card}>
          <div className={styles.icon}>
            <img src="/icons/ft1.svg" alt="icft1" />
          </div>

          <h3>{t('eveningClasses.title')}</h3>
          <p>{t('eveningClasses.description')}</p>
        </div>

        <div className={styles.card}>
          <div className={styles.icon}>
            <img src="/icons/ft2.svg" alt="icft2" />
          </div>

          <h3>{t('flexibleWeekends.title')}</h3>
          <p>{t('flexibleWeekends.description')}</p>
        </div>

        <div className={styles.card}>
          <div className={styles.icon}>
            <img src="/icons/ft3.svg" alt="icft3" />
          </div>

          <h3>{t('learnViaMezon.title')}</h3>
          <p>{t('learnViaMezon.description')}</p>
        </div>
      </div>
    </section>
  );
}
