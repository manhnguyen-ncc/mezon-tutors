import { useMutation, useQuery } from '@tanstack/react-query'
import type {
  ApiResponse,
  ETrialLessonBookingStatus,
  PaginatedData,
  PaginatedResponse,
} from '@mezon-tutors/shared'
import { apiClient } from '../api-client'
import { trialLessonBookingQueryKey } from './trial-lesson-booking.qkey'

export type CreateTrialLessonBookingPayload = {
  tutorId: string
  startAt: string
  dayOfWeek: number
  durationMinutes: number
}

type TrialLessonBooking = {
  id: string
  tutorId: string
  studentId: string
  startAt: string
  durationMinutes: number
  status: string
  priceAtBooking: string | number
}


export type OccupiedTrialLessonSlotDto = {
  id: string
  startTime: string
  durationMinutes: number
}

export type OccupiedTrialLessonSlotsResponse = {
  items: OccupiedTrialLessonSlotDto[]
}

export type AlreadyBookedTrialLessonResponse = {
  hasBooked: boolean
  bookingId: string | null
  status: ETrialLessonBookingStatus
}

export type TrialLessonBookingRequestItem = {
  id: string
  studentName: string
  studentAvatarUrl?: string
  startAt: string
  durationMinutes: number
  priceAtBooking: number
  status: ETrialLessonBookingStatus
  createdAt: string
}

export type TrialLessonBookingRequestsResponse = PaginatedData<TrialLessonBookingRequestItem>

export type TrialLessonBookingRequestStatusFilter = 'PENDING' | 'CONFIRMED' | 'COMPLETED'

export const trialLessonBookingApi = {
  getOccupiedByTutorAndDate(tutorId: string, date: string): Promise<OccupiedTrialLessonSlotsResponse> {
    return apiClient.get<ApiResponse<OccupiedTrialLessonSlotsResponse>, OccupiedTrialLessonSlotsResponse>(
      '/trial-lesson-bookings/occupied',
      {
        params: { tutorId, date },
      }
    )
  },

  getAlreadyBookedStatus(tutorId: string): Promise<AlreadyBookedTrialLessonResponse> {
    return apiClient.get<ApiResponse<AlreadyBookedTrialLessonResponse>, AlreadyBookedTrialLessonResponse>(
      '/trial-lesson-bookings/already-booked',
      {
        params: { tutorId },
      }
    )
  },

  createTrialLessonBooking(
    payload: CreateTrialLessonBookingPayload
  ): Promise<TrialLessonBooking> {
    return apiClient.post<ApiResponse<TrialLessonBooking>, TrialLessonBooking>(
      '/trial-lesson-bookings',
      payload
    )
  },

  async getMyTrialLessonBookingRequests(params?: {
    status?: TrialLessonBookingRequestStatusFilter
    page?: number
    limit?: number
  }): Promise<TrialLessonBookingRequestsResponse> {
    const response = await apiClient.get<PaginatedResponse<TrialLessonBookingRequestItem>>(
      '/trial-lesson-bookings/my-requests',
      { params }
    )
    const page = response.data
    if (!page) {
      return {
        items: [],
        meta: {
          page: params?.page ?? 1,
          limit: params?.limit ?? 10,
          total: 0,
          totalPages: 1,
          hasNext: false,
          hasPrev: false,
        },
      }
    }
    return page
  },
}

export function useGetOccupiedTrialLessonSlots(tutorId: string, date: string, enabled = true) {
  return useQuery({
    queryKey: trialLessonBookingQueryKey.occupied(tutorId, date),
    queryFn: () => trialLessonBookingApi.getOccupiedByTutorAndDate(tutorId, date),
    enabled: Boolean(tutorId) && Boolean(date) && enabled,
  })
}

export function useGetAlreadyBookedTrialLesson(tutorId: string, enabled = true) {
  return useQuery({
    queryKey: trialLessonBookingQueryKey.alreadyBooked(tutorId),
    queryFn: () => trialLessonBookingApi.getAlreadyBookedStatus(tutorId),
    enabled: Boolean(tutorId) && enabled,
  })
}


export function useCreateTrialLessonBookingMutation() {
  return useMutation({
    mutationFn: (payload: CreateTrialLessonBookingPayload) =>
      trialLessonBookingApi.createTrialLessonBooking(payload),
  })
}

export function useGetMyTrialLessonBookingRequests(
  params?: {
    status?: TrialLessonBookingRequestStatusFilter
    page?: number
    limit?: number
  },
  enabled = true
) {
  return useQuery({
    queryKey: trialLessonBookingQueryKey.myRequests(params?.status, params?.page, params?.limit),
    queryFn: () => trialLessonBookingApi.getMyTrialLessonBookingRequests(params),
    enabled,
  })
}
