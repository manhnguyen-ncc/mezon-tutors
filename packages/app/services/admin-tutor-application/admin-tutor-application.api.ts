import {
  type ApiResponse,
  type FullTutorApplication,
  type IdentityVerification,
  type IdentityVerificationStatus,
  type ProfessionalDocument,
  type ProfessionalDocumentStatus,
  type TutorApplication,
  type TutorApplicationMetrics,
  type TutorProfile,
  toIsoString,
  VerificationStatus,
  type TutorAdminNote,
} from '@mezon-tutors/shared';
import { apiClient } from '../api-client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { adminTutorApplicationQKey } from './admin-tutor-application.qkey';

type CreateAdminNotePayload = Omit<TutorAdminNote, 'id' | 'createdAt'>;

type UpdateIdentityVerificationStatusPayload = {
  status: IdentityVerificationStatus;
  nameMatch: boolean;
  notExpired: boolean;
  photoClarity: boolean;
};

const BASE = 'admin/tutor-applications';

const mapItem = (item: TutorProfile): TutorApplication => ({
  id: item.id,
  name: `${item.firstName} ${item.lastName}`.trim(),
  subject: item.subject,
  subjectColor: '#4299E1',
  date: toIsoString(item.createdAt),
  status:
    item.verificationStatus === VerificationStatus.PENDING ||
    item.verificationStatus === VerificationStatus.APPROVED ||
    item.verificationStatus === VerificationStatus.REJECTED
      ? (item.verificationStatus as VerificationStatus)
      : VerificationStatus.PENDING,
  videoUrl: item.videoUrl,
  introVideoTitle: 'Intro Video',
  introPreview: item.introduce || item.motivate || item.experience,
  headline: item.headline,
  motivate: item.motivate,
  introduce: item.introduce,
  experience: item.experience,
  certificates: [],
});

const adminTutorApplicationApi = {
  getTutorProfile(tutorId: string): Promise<FullTutorApplication> {
    return apiClient.get<ApiResponse<FullTutorApplication>, FullTutorApplication>(
      `/admin/tutor-profiles/${tutorId}`
    );
  },

  async getList(): Promise<TutorApplication[]> {
    const data = await apiClient.get<ApiResponse<TutorProfile[]>, TutorProfile[]>(BASE);
    return data.map(mapItem);
  },

  async getMetrics(): Promise<TutorApplicationMetrics> {
    return apiClient.get<ApiResponse<TutorApplicationMetrics>, TutorApplicationMetrics>(
      `${BASE}/metrics`
    );
  },

  createAdminNote(payload: CreateAdminNotePayload): Promise<TutorAdminNote> {
    return apiClient.post<ApiResponse<TutorAdminNote>, TutorAdminNote>(
      `/admin/tutor-admin-notes`,
      {
        tutorId: payload.tutorId,
        reviewerId: payload.reviewerId,
        reviewerName: payload.reviewerName,
        content: payload.content,
      }
    );
  },

  updateProfessionalDocumentStatus(
    documentId: string,
    status: ProfessionalDocumentStatus
  ): Promise<ProfessionalDocument> {
    return apiClient.patch<ApiResponse<ProfessionalDocument>, ProfessionalDocument>(
      `/admin/professional-documents/${documentId}/status`,
      { status }
    );
  },

  updateIdentityVerificationStatus(
    verificationId: string,
    payload: UpdateIdentityVerificationStatusPayload
  ): Promise<IdentityVerification> {
    return apiClient.patch<ApiResponse<IdentityVerification>, IdentityVerification>(
      `/admin/identity-verification/${verificationId}/status`,
      payload
    );
  },

  approveTutorApplication(tutorId: string): Promise<{ success: boolean }> {
    return apiClient.post<ApiResponse<{ success: boolean }>, { success: boolean }>(
      `/admin/tutor-applications/${tutorId}/approve`
    );
  },

  rejectTutorApplication(tutorId: string): Promise<{ success: boolean }> {
    return apiClient.post<ApiResponse<{ success: boolean }>, { success: boolean }>(
      `/admin/tutor-applications/${tutorId}/reject`
    );
  },

  waitlistTutorApplication(tutorId: string): Promise<{ success: boolean }> {
    return apiClient.post<ApiResponse<{ success: boolean }>, { success: boolean }>(
      `/admin/tutor-applications/${tutorId}/waitlist`
    );
  },
};

export const useAdminTutorApplicationApi = (tutorId: string) => {
  return useQuery({
    queryKey: adminTutorApplicationQKey.tutorProfile(tutorId),
    queryFn: () => adminTutorApplicationApi.getTutorProfile(tutorId),
    enabled: !!tutorId,
  });
};

export const useTutorApplicationListQuery = () => {
  return useQuery({
    queryKey: adminTutorApplicationQKey.list(),
    queryFn: () => adminTutorApplicationApi.getList(),
  });
};

export const useTutorApplicationMetricsQuery = () => {
  return useQuery({
    queryKey: adminTutorApplicationQKey.metrics(),
    queryFn: () => adminTutorApplicationApi.getMetrics(),
  });
};

export const useCreateAdminNoteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateAdminNotePayload) =>
      adminTutorApplicationApi.createAdminNote(payload),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: adminTutorApplicationQKey.tutorProfile(variables.tutorId),
      });
    },
  });
};

export const useUpdateProfessionalDocumentStatusMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (variables: {
      tutorId: string;
      documentId: string;
      status: ProfessionalDocumentStatus;
    }) =>
      adminTutorApplicationApi.updateProfessionalDocumentStatus(variables.documentId, variables.status),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: adminTutorApplicationQKey.tutorProfile(variables.tutorId),
      });
    },
  });
};

export const useUpdateIdentityVerificationStatusMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (variables: {
      tutorId: string;
      verificationId: string;
      payload: UpdateIdentityVerificationStatusPayload;
    }) =>
      adminTutorApplicationApi.updateIdentityVerificationStatus(
        variables.verificationId,
        variables.payload,
      ),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: adminTutorApplicationQKey.tutorProfile(variables.tutorId),
      });
    },
  });
};

export const useApproveTutorApplicationMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (tutorId: string) => adminTutorApplicationApi.approveTutorApplication(tutorId),
    onSuccess: (_data, tutorId) => {
      queryClient.invalidateQueries({ queryKey: adminTutorApplicationQKey.list() });
      queryClient.invalidateQueries({ queryKey: adminTutorApplicationQKey.metrics() });
      queryClient.invalidateQueries({ queryKey: adminTutorApplicationQKey.tutorProfile(tutorId) });
    },
  });
};

export const useRejectTutorApplicationMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (tutorId: string) => adminTutorApplicationApi.rejectTutorApplication(tutorId),
    onSuccess: (_data, tutorId) => {
      queryClient.invalidateQueries({ queryKey: adminTutorApplicationQKey.list() });
      queryClient.invalidateQueries({ queryKey: adminTutorApplicationQKey.metrics() });
      queryClient.invalidateQueries({ queryKey: adminTutorApplicationQKey.tutorProfile(tutorId) });
    },
  });
};

export const useWaitlistTutorApplicationMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (tutorId: string) => adminTutorApplicationApi.waitlistTutorApplication(tutorId),
    onSuccess: (_data, tutorId) => {
      queryClient.invalidateQueries({ queryKey: adminTutorApplicationQKey.list() });
      queryClient.invalidateQueries({ queryKey: adminTutorApplicationQKey.metrics() });
      queryClient.invalidateQueries({ queryKey: adminTutorApplicationQKey.tutorProfile(tutorId) });
    },
  });
};


