export const trialLessonBookingQueryKey = {
  occupied: (tutorId: string, date: string) => ['trial-lesson-booking-occupied', tutorId, date] as const,
  alreadyBooked: (tutorId: string) => ['trial-lesson-booking-already-booked', tutorId] as const,
} as const
