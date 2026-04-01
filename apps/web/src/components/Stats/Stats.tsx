'use client';

import { useTranslations } from 'next-intl';
import styles from './Stats.module.css';

export default function Stats() {
  const t = useTranslations('Home.Stats');

  return (
    <section className={styles.stats}>
      {/* LEFT IMAGE */}
      <div className={styles.imageBox}>
        <img src="/teach.jpg" alt="Teaching" />

        <div className={styles.badge}>
          <h3>{t('badgeAmount')}</h3>
          <span>{t('badgeLabel')}</span>
        </div>
      </div>

      {/* RIGHT CONTENT */}
      <div className={styles.content}>
        <h2>
          {t('title')} <br />
          <span>{t('titleHighlight')}</span>
        </h2>

        <p>{t('description')}</p>

        <ul className={styles.list}>
          <li>
            <img src="/icons/iccheck.svg" alt="check" />
            <span>{t('benefits.payment')}</span>
          </li>
          <li>
            <img src="/icons/iccheck.svg" alt="check" />
            <span>{t('benefits.tools')}</span>
          </li>
          <li>
            <img src="/icons/iccheck.svg" alt="check" />
            <span>{t('benefits.schedule')}</span>
          </li>
        </ul>

        <button className={styles.button}>{t('registerButton')}</button>
      </div>
    </section>
  );
}
