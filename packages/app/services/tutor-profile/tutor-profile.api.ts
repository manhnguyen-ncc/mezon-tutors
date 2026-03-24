import { apiClient } from '../api-client'
import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { tutorProfileQueryKey } from './tutor-profile.qkey'
import {
  ApiResponse,
  PaginatedData,
  PaginatedResponse,
  ETutorSortBy,
  ECountry,
  ESubject,
  VerifiedTutorProfileDto,
  SubmitTutorProfileDto,
} from '@mezon-tutors/shared'

type VerifiedTutorFilters = {
  sortBy: ETutorSortBy
  subject?: ESubject
  country?: ECountry
  pricePerLesson?: string
}

export const tutorProfileApi = {
  async getVerifiedTutors(
    page: number,
    limit: number,
    filters: VerifiedTutorFilters
  ): Promise<PaginatedData<VerifiedTutorProfileDto> | null> {
    const { sortBy, subject, country, pricePerLesson } = filters

    const response = await apiClient.get<PaginatedResponse<VerifiedTutorProfileDto>>(
      '/tutor-profiles/verified',
      {
        params: {
          page,
          limit,
          sortBy,
          subject,
          country,
          pricePerLesson,
        },
      }
    )
    return response.data
  },

  submit(payload: SubmitTutorProfileDto): Promise<boolean> {
    return apiClient.post<ApiResponse<boolean>, boolean>('/tutor-profiles', payload)
  },
}

const useGetVerifiedTutors = (page: number, limit: number, filters: VerifiedTutorFilters) => {
  return useQuery({
    queryKey: tutorProfileQueryKey.verifiedTutors(
      page,
      limit,
      filters.sortBy,
      filters.subject,
      filters.country,
      filters.pricePerLesson
    ),
    queryFn: () => tutorProfileApi.getVerifiedTutors(page, limit, filters),
    placeholderData: keepPreviousData,
  })
}

const useSubmitTutorProfileMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: SubmitTutorProfileDto) => tutorProfileApi.submit(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['verified-tutors'] })
    },
  })
}

export function submitTutorProfile(payload: SubmitTutorProfileDto): Promise<boolean> {
  return tutorProfileApi.submit(payload)
}

export { useGetVerifiedTutors, useSubmitTutorProfileMutation }
