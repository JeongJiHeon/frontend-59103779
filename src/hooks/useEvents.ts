import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { eventsApi } from '@/lib/api';
import type { CreateEventRequest, UpdateEventRequest } from '@/types';
import { format } from 'date-fns';

export const useEvents = (startDate?: Date, endDate?: Date) => {
  const queryClient = useQueryClient();

  const startDateStr = startDate ? format(startDate, 'yyyy-MM-dd') : undefined;
  const endDateStr = endDate ? format(endDate, 'yyyy-MM-dd') : undefined;

  const eventsQuery = useQuery({
    queryKey: ['events', startDateStr, endDateStr],
    queryFn: () => eventsApi.getEvents(startDateStr, endDateStr),
  });

  const createEventMutation = useMutation({
    mutationFn: (data: CreateEventRequest) => eventsApi.createEvent(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
    },
  });

  const updateEventMutation = useMutation({
    mutationFn: (data: UpdateEventRequest) => eventsApi.updateEvent(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
    },
  });

  const deleteEventMutation = useMutation({
    mutationFn: (id: string) => eventsApi.deleteEvent(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
    },
  });

  return {
    events: eventsQuery.data ?? [],
    isLoading: eventsQuery.isLoading,
    error: eventsQuery.error,
    refetch: eventsQuery.refetch,
    createEvent: createEventMutation.mutate,
    updateEvent: updateEventMutation.mutate,
    deleteEvent: deleteEventMutation.mutate,
    isCreating: createEventMutation.isPending,
    isUpdating: updateEventMutation.isPending,
    isDeleting: deleteEventMutation.isPending,
  };
};

export const useEvent = (id: string) => {
  const queryClient = useQueryClient();

  const eventQuery = useQuery({
    queryKey: ['event', id],
    queryFn: () => eventsApi.getEvent(id),
    enabled: !!id,
  });

  const updateEventMutation = useMutation({
    mutationFn: (data: UpdateEventRequest) => eventsApi.updateEvent(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
      queryClient.invalidateQueries({ queryKey: ['event', id] });
    },
  });

  const deleteEventMutation = useMutation({
    mutationFn: () => eventsApi.deleteEvent(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
    },
  });

  return {
    event: eventQuery.data,
    isLoading: eventQuery.isLoading,
    error: eventQuery.error,
    updateEvent: updateEventMutation.mutate,
    deleteEvent: deleteEventMutation.mutate,
    isUpdating: updateEventMutation.isPending,
    isDeleting: deleteEventMutation.isPending,
  };
};
