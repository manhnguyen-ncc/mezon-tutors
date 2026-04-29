'use client';

import { Star } from 'lucide-react';
import { DEFAULT_AVATAR_URL } from '@mezon-tutors/shared';
import type { TutorReviewDto } from '@mezon-tutors/shared';

type ReviewsSectionProps = {
  tutorId: string;
  tutorName: string;
  ratingAverage: number;
  ratingCount: number;
  reviews: TutorReviewDto[];
};

export function ReviewsSection({
  tutorId,
  tutorName,
  ratingAverage,
  ratingCount,
  reviews,
}: ReviewsSectionProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Star size={24} className="fill-yellow-400 text-yellow-400" />
        <span className="text-2xl font-bold text-gray-900">{ratingAverage.toFixed(2)}</span>
        <span className="text-gray-600">({ratingCount} reviews)</span>
      </div>

      <div className="flex flex-col gap-3">
        {reviews.length === 0 ? (
          <p className="text-gray-500">No reviews yet</p>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="bg-gray-50 border border-gray-200 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <img
                  src={review.reviewerAvatar || DEFAULT_AVATAR_URL}
                  alt={review.reviewerName}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-gray-900">{review.reviewerName}</p>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-700">{review.comment}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
