import { ROUTES } from './routes';

export type FooterLinkConfig = {
  labelKey: string;
  href: string;
};

export type FooterColumnConfig = {
  titleKey: string;
  links: FooterLinkConfig[];
};

export type FooterSocialConfig = {
  src: string;
  altKey: string;
};

export const FOOTER_COLUMNS: FooterColumnConfig[] = [
  {
    titleKey: 'product.title',
    links: [
      { labelKey: 'product.findTutor', href: ROUTES.TUTOR.INDEX },
      { labelKey: 'product.pricing', href: ROUTES.HOME.index },
      { labelKey: 'product.enterprise', href: ROUTES.HOME.index },
    ],
  },
  {
    titleKey: 'community.title',
    links: [
      { labelKey: 'community.becomeTutor', href: ROUTES.BECOME_TUTOR.INDEX },
      { labelKey: 'community.blog', href: ROUTES.HOME.index },
      { labelKey: 'community.events', href: ROUTES.HOME.index },
    ],
  },
  {
    titleKey: 'support.title',
    links: [
      { labelKey: 'support.helpCenter', href: ROUTES.HOME.index },
      { labelKey: 'support.privacyPolicy', href: ROUTES.HOME.index },
      { labelKey: 'support.contact', href: ROUTES.HOME.index },
    ],
  },
];

export const FOOTER_SOCIALS: FooterSocialConfig[] = [
  { src: '/icons/foot1.svg', altKey: 'social.facebook' },
  { src: '/icons/foot2.svg', altKey: 'social.linkedin' },
];
