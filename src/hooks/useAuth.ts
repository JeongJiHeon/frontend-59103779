import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { authApi } from '@/lib/api';
import { useAuthStore } from '@/store/authStore';
import type { LoginRequest, SignupRequest, GoogleAuthRequest } from '@/types';

export const useAuth = () => {
  const { setAuth, clearAuth, isAuthenticated, user } = useAuthStore();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: (data: LoginRequest) => authApi.login(data),
    onSuccess: (data) => {
      setAuth(data.user, data.access_token);
      navigate('/dashboard');
    },
  });

  const signupMutation = useMutation({
    mutationFn: (data: SignupRequest) => authApi.signup(data),
    onSuccess: (data) => {
      setAuth(data.user, data.access_token);
      navigate('/dashboard');
    },
  });

  const googleAuthMutation = useMutation({
    mutationFn: (data: GoogleAuthRequest) => authApi.googleAuth(data),
    onSuccess: (data) => {
      setAuth(data.user, data.access_token);
      navigate('/dashboard');
    },
  });

  const logoutMutation = useMutation({
    mutationFn: () => authApi.logout(),
    onSuccess: () => {
      clearAuth();
      queryClient.clear();
      navigate('/login');
    },
  });

  const { data: currentUser, refetch: refetchUser } = useQuery({
    queryKey: ['currentUser'],
    queryFn: authApi.getCurrentUser,
    enabled: isAuthenticated,
    retry: false,
  });

  return {
    user,
    isAuthenticated,
    currentUser,
    login: loginMutation.mutate,
    signup: signupMutation.mutate,
    googleAuth: googleAuthMutation.mutate,
    logout: logoutMutation.mutate,
    refetchUser,
    isLoading:
      loginMutation.isPending ||
      signupMutation.isPending ||
      googleAuthMutation.isPending ||
      logoutMutation.isPending,
    error:
      loginMutation.error ||
      signupMutation.error ||
      googleAuthMutation.error ||
      logoutMutation.error,
  };
};
