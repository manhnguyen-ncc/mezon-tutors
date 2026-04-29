'use client';

import { useTranslations } from 'next-intl';
import { Calendar, Users, Check } from 'lucide-react';
import { Button } from '@/components/ui';
import { TutorAboutDto } from '@mezon-tutors/shared';

type TutorDetailSidebarProps = {
  tutor: TutorAboutDto;
};

export function TutorDetailSidebar({ tutor }: TutorDetailSidebarProps) {
  const t = useTranslations('Tutors.Detail');

  const handleBookTrialClick = () => {
    console.log('Book trial clicked');
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="bg-white border border-gray-200 rounded-2xl p-4 flex flex-col gap-3">
        <div className="flex items-baseline gap-1.5">
          <span className="text-3xl font-black text-gray-900">
            ${tutor.pricePerHour}
          </span>
          <span className="text-sm text-gray-500">{t('perLesson')}</span>
        </div>

        <Button
          onClick={handleBookTrialClick}
          className="w-full font-semibold py-2.5 px-4 rounded-lg transition-colors"
        >
          {t('bookTrial')}
        </Button>

        <Button
          variant="outline"
          className="w-full font-semibold py-2.5 px-4 rounded-lg transition-colors"
        >
          {t('sendMessage')}
        </Button>

        <div className="flex flex-col gap-2 pt-2">
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-primary" />
            <span className="text-sm text-gray-600">
              {t('bookedLast48h', { count: tutor.stats.bookedLessonsLast48h })}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Users size={16} className="text-primary" />
            <span className="text-sm text-gray-600">
              {t('totalStudents', { count: tutor.stats.totalStudents })}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Check size={16} className="text-primary" />
            <span className="text-sm text-gray-600">
              {t('totalLessons', { count: tutor.stats.totalLessonsTaught })}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-2xl p-4 flex flex-col gap-2.5">
        <h3 className="text-lg font-extrabold text-gray-900">
          {t('promoTitle')}
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          {t('promoDescription')}
        </p>
        <Button className="font-semibold py-2 px-4 rounded-lg transition-colors text-sm">
          {t('promoAction')}
        </Button>
      </div>
    </div>
  );
}
