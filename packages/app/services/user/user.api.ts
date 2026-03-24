import { ApiResponse, PaginatedData, PaginatedResponse, User } from '@mezon-tutors/shared';
import { apiClient } from '../api-client';
import { useQuery } from '@tanstack/react-query';
type UserFilter = {
  cursor?: string;
  limit?: number;
  gender?: string;
  ageGroup?: string;
  gameIds?: string[];
};

export const userApi = {
  getUserById(id: string): Promise<User> {
    return apiClient.get<ApiResponse<User>, User>(`/users/${id}`);
  },

  listUsers(filter?: UserFilter): Promise<PaginatedData<User>> {
    const queryParams = new URLSearchParams();
    if (filter) {
      if (filter.cursor) queryParams.append('cursor', filter.cursor);
      if (filter.limit) queryParams.append('limit', filter.limit.toString());
      if (filter.gender) queryParams.append('gender', filter.gender);
      if (filter.ageGroup) queryParams.append('ageGroup', filter.ageGroup);
      if (filter.gameIds && filter.gameIds.length > 0) {
        queryParams.append('gameIds', filter.gameIds.join(','));
      }
    }

    const query = queryParams.toString();
    return apiClient.get<PaginatedResponse<User>, PaginatedData<User>>(
      `/users${query ? `?${query}` : ''}`
    );
  },
};

const userQueryKey = {
  all: ['users'] as const,
  detail: (id: string) => [...userQueryKey.all, 'detail', id] as const,
  list: (filter?: UserFilter) => {
    const gameIdsKey = filter?.gameIds ? [...filter.gameIds].sort().join(',') : null;

    return [
      ...userQueryKey.all,
      'list',
      filter?.cursor ?? null,
      filter?.limit ?? null,
      filter?.gender ?? null,
      filter?.ageGroup ?? null,
      gameIdsKey,
    ] as const;
  },
};

export const useUserByIdQuery = (id?: string) => {
  return useQuery({
    queryKey: userQueryKey.detail(id ?? 'missing'),
    queryFn: () => userApi.getUserById(id as string),
    enabled: !!id,
  });
};

export const useUsersQuery = (filter?: UserFilter) => {
  return useQuery({
    queryKey: userQueryKey.list(filter),
    queryFn: () => userApi.listUsers(filter),
  });
};
