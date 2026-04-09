import type { ETrialLessonBookingStatus } from '../enums/trial-lesson-booking'

export interface TutorTrialLessonBookingRequestDto {
  id: string
  studentName: string
  studentAvatarUrl?: string
  startAt: string
  durationMinutes: number
  priceAtBooking: number
  status: ETrialLessonBookingStatus
  createdAt: string
}
