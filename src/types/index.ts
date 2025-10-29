export interface User {
  id: string;
  email: string;
  name: string;
  picture?: string;
  createdAt: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  user: User;
}

export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  startTime: string;
  endTime: string;
  location?: string;
  attendees?: string[];
  color?: string;
  googleEventId?: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateEventRequest {
  title: string;
  description?: string;
  startTime: string;
  endTime: string;
  location?: string;
  attendees?: string[];
  color?: string;
}

export interface UpdateEventRequest extends Partial<CreateEventRequest> {
  id: string;
}

export interface AIEventRequest {
  prompt: string;
  contextDate?: string;
}

export interface AIEventResponse {
  events: CreateEventRequest[];
  interpretation: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  email: string;
  password: string;
  name: string;
}

export interface GoogleAuthRequest {
  code: string;
}

export type EventView = 'day' | 'week' | 'month';

export interface CalendarFilters {
  startDate: Date;
  endDate: Date;
  view: EventView;
}
