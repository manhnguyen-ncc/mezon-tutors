'use client';

import { ReviewsSection } from './ReviewsSection';
import { type TutorAboutDto, type TutorReviewDto } from '@mezon-tutors/shared';

type TutorReviewsTabProps = {
  tutor: TutorAboutDto & {
    reviews: TutorReviewDto[];
    ratingCount: number;
    ratingAverage: number;
  };
};

export function TutorReviewsTab({ tutor }: TutorReviewsTabProps) {
  return (
    <ReviewsSection
      tutorId={tutor.id}
      tutorName={`${tutor.firstName} ${tutor.lastName}`}
      ratingAverage={tutor.ratingAverage}
      ratingCount={tutor.ratingCount}
      reviews={tutor.reviews}
    />
  );
}
