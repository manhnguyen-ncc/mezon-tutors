'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui';
import { type TutorAboutDto, type TutorDetailAvailabilitySlotDto } from '@mezon-tutors/shared';

type TutorScheduleTabProps = {
  tutor: TutorAboutDto & {
    availability: TutorDetailAvailabilitySlotDto[];
  };
};

export function TutorScheduleTab({ tutor }: TutorScheduleTabProps) {
  const t = useTranslations('Tutors.Detail');

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="text-xl font-extrabold text-gray-900 mb-2">
          {t('scheduleTitle')}
        </h2>
        <p className="text-sm text-gray-600">
          {t('scheduleHint', { timezone: tutor.timezone })}
        </p>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
        <p className="text-center text-gray-600">
          Schedule calendar will be displayed here
        </p>
      </div>
    </div>
  );
}
