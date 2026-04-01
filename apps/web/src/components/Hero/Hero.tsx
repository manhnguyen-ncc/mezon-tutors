'use client';

import { useTranslations } from 'next-intl';
import styles from './Hero.module.css';

export default function Hero() {
  const t = useTranslations('Home.Hero');

  return (
    <section className={styles.hero}>
      {/* LEFT CONTENT */}
      <div className={styles.left}>
        <span className={styles.badge}>
          <img src="/icons/flash.svg" alt="flash" /> {t('badge')}
        </span>

        <h1 className={styles.title}>
          {t('title')}
          <br />
          <span>{t('titleHighlight')}</span>
        </h1>

        <p className={styles.desc}>{t('description')}</p>

        <div className={styles.buttons}>
          <button className={styles.primary}>{t('startNow')}</button>

          <button className={styles.secondary}>
            <img src="/icons/wdemo.svg" alt="demo" />
            <span>{t('watchDemo')}</span>
          </button>
        </div>
      </div>

      {/* RIGHT IMAGE */}
      <div className={styles.right}>
        <div className={styles.cardWrapper}>
          {/* CARD CHÍNH */}
          <div className={styles.card}>
            <img src="/tutor.png" alt="Tutor" />

            <div className={styles.cardInfo}>
              <div className={styles.topRow}>
                <span className={styles.match}>95% {t('match')}</span>

                <div className={styles.rating}>
                  <img src="/icons/star.svg" alt="star" />
                  <span>4.9</span>
                </div>
              </div>

              <h3>Nguyen Minh Anh, 24</h3>
              <p>IELTS 8.0 • Dedicated to busy learners</p>

              <div className={styles.cardButtons}>
                <button className={styles.profile}>{t('profile')}</button>
                <button className={styles.connect}>{t('connect')}</button>
              </div>
            </div>
          </div>

          {/* CARD NHỎ */}
          <div className={styles.smallCard}>
            <img src="/cardbe.svg" alt="cardbe" />
            <div className={styles.play}>
              <img src="/icons/play.svg" alt="play" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
