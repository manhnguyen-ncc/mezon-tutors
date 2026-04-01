'use client';

import { useTranslations } from 'next-intl';
import styles from './Seamless.module.css';

export default function Seamless() {
  const t = useTranslations('Home.Seamless');

  return (
    <section className={styles.seamless}>
      {/* TITLE */}
      <div className={styles.header}>
        <h2>{t('title')}</h2>
        <p>{t('description')}</p>
      </div>

      {/* CARDS */}
      <div className={styles.cards}>
        <div className={styles.card}>
          <div className={styles.icons}>
            <img src="/icons/ic1seamless.svg" alt="ic1" />
          </div>
          <div className={styles.cardContent}>
            <h3>{t('virtualClassroom.title')}</h3>
            <p>{t('virtualClassroom.description')}</p>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.icons}>
            <img src="/icons/ic2seamless.svg" alt="ic2" />
          </div>
          <div className={styles.cardContent}>
            <h3>{t('instantMessaging.title')}</h3>
            <p>{t('instantMessaging.description')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
