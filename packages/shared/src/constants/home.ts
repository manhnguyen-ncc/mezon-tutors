export const HOME_STATS = [
  { key: 'students', value: '10,000+' },
  { key: 'tutors', value: '500+' },
  { key: 'languages', value: '50+' },
  { key: 'satisfaction', value: '98%' },
] as const;

export const HOME_FEATURES = [
  {
    id: 'evening-classes',
    iconKey: 'ft1',
    titleKey: 'eveningClasses.title',
    descriptionKey: 'eveningClasses.description',
  },
  {
    id: 'flexible-weekends',
    iconKey: 'ft2',
    titleKey: 'flexibleWeekends.title',
    descriptionKey: 'flexibleWeekends.description',
  },
  {
    id: 'learn-via-mezon',
    iconKey: 'ft3',
    titleKey: 'learnViaMezon.title',
    descriptionKey: 'learnViaMezon.description',
  },
] as const;

export const HOME_SEAMLESS_FEATURES = [
  {
    id: 'video-call',
    iconKey: 'ic1seamless',
    titleKey: 'virtualClassroom.title',
    descriptionKey: 'virtualClassroom.description',
  },
  {
    id: 'messaging',
    iconKey: 'ic2seamless',
    titleKey: 'instantMessaging.title',
    descriptionKey: 'instantMessaging.description',
  },
] as const;

export const HOME_HERO_CARD = {
  image: '/tutor.png',
  name: 'Nguyen Minh Anh, 24',
  description: 'IELTS 8.0 - Dedicated to busy learners',
  match: 95,
  rating: 4.9,
  videoThumbnail: '/cardbe.svg',
} as const;
