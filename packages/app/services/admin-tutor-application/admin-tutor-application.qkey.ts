export const adminTutorApplicationQKey = {
  all: ['admin-tutor-application'] as const,
  list: () => [...adminTutorApplicationQKey.all, 'list'] as const,
  tutorProfile: (tutorId: string) =>
    [...adminTutorApplicationQKey.all, tutorId] as const,
  metrics: () => [...adminTutorApplicationQKey.all, 'metrics'] as const,
};
