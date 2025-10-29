import { apiClient } from './axios';
import type {
  AuthResponse,
  LoginRequest,
  SignupRequest,
  GoogleAuthRequest,
  CalendarEvent,
  CreateEventRequest,
  UpdateEventRequest,
  AIEventRequest,
  AIEventResponse,
} from '@/types';

// Auth API
export const authApi = {
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/auth/login', data);
    return response.data;
  },

  signup: async (data: SignupRequest): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/auth/signup', data);
    return response.data;
  },

  googleAuth: async (data: GoogleAuthRequest): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/auth/google', data);
    return response.data;
  },

  logout: async (): Promise<void> => {
    await apiClient.post('/auth/logout');
  },

  getCurrentUser: async () => {
    const response = await apiClient.get('/auth/me');
    return response.data;
  },
};

// Calendar Events API
export const eventsApi = {
  getEvents: async (startDate?: string, endDate?: string): Promise<CalendarEvent[]> => {
    const params = new URLSearchParams();
    if (startDate) params.append('start_date', startDate);
    if (endDate) params.append('end_date', endDate);
    
    const response = await apiClient.get<CalendarEvent[]>(`/events?${params.toString()}`);
    return response.data;
  },

  getEvent: async (id: string): Promise<CalendarEvent> => {
    const response = await apiClient.get<CalendarEvent>(`/events/${id}`);
    return response.data;
  },

  createEvent: async (data: CreateEventRequest): Promise<CalendarEvent> => {
    const response = await apiClient.post<CalendarEvent>('/events', data);
    return response.data;
  },

  updateEvent: async (data: UpdateEventRequest): Promise<CalendarEvent> => {
    const { id, ...updateData } = data;
    const response = await apiClient.put<CalendarEvent>(`/events/${id}`, updateData);
    return response.data;
  },

  deleteEvent: async (id: string): Promise<void> => {
    await apiClient.delete(`/events/${id}`);
  },
};

// AI Agent API
export const aiApi = {
  createEventFromPrompt: async (data: AIEventRequest): Promise<AIEventResponse> => {
    const response = await apiClient.post<AIEventResponse>('/ai/create-event', data);
    return response.data;
  },
};

// Google Calendar API
export const googleCalendarApi = {
  syncEvents: async (): Promise<{ synced: number }> => {
    const response = await apiClient.post('/google/sync');
    return response.data;
  },

  getAuthUrl: async (): Promise<{ url: string }> => {
    const response = await apiClient.get('/google/auth-url');
    return response.data;
  },
};
