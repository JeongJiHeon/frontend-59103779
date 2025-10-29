import { create } from 'zustand';
import type { EventView } from '@/types';

interface CalendarState {
  currentDate: Date;
  view: EventView;
  selectedEventId: string | null;
  setCurrentDate: (date: Date) => void;
  setView: (view: EventView) => void;
  setSelectedEventId: (id: string | null) => void;
  goToToday: () => void;
  goToNextPeriod: () => void;
  goToPreviousPeriod: () => void;
}

export const useCalendarStore = create<CalendarState>((set, get) => ({
  currentDate: new Date(),
  view: 'month',
  selectedEventId: null,

  setCurrentDate: (date) => set({ currentDate: date }),

  setView: (view) => set({ view }),

  setSelectedEventId: (id) => set({ selectedEventId: id }),

  goToToday: () => set({ currentDate: new Date() }),

  goToNextPeriod: () => {
    const { currentDate, view } = get();
    const newDate = new Date(currentDate);

    switch (view) {
      case 'day':
        newDate.setDate(newDate.getDate() + 1);
        break;
      case 'week':
        newDate.setDate(newDate.getDate() + 7);
        break;
      case 'month':
        newDate.setMonth(newDate.getMonth() + 1);
        break;
    }

    set({ currentDate: newDate });
  },

  goToPreviousPeriod: () => {
    const { currentDate, view } = get();
    const newDate = new Date(currentDate);

    switch (view) {
      case 'day':
        newDate.setDate(newDate.getDate() - 1);
        break;
      case 'week':
        newDate.setDate(newDate.getDate() - 7);
        break;
      case 'month':
        newDate.setMonth(newDate.getMonth() - 1);
        break;
    }

    set({ currentDate: newDate });
  },
}));
