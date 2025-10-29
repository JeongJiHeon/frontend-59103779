import { useState, useMemo } from 'react';
import { startOfMonth, endOfMonth } from 'date-fns';
import { Plus } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { CalendarHeader } from '@/components/calendar/CalendarHeader';
import { MonthView } from '@/components/calendar/MonthView';
import { WeekView } from '@/components/calendar/WeekView';
import { DayView } from '@/components/calendar/DayView';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { EventForm } from '@/components/calendar/EventForm';
import { AIEventCreator } from '@/components/calendar/AIEventCreator';
import { Card } from '@/components/ui/Card';
import { Spinner } from '@/components/ui/Spinner';
import { useCalendarStore } from '@/store/calendarStore';
import { useEvents } from '@/hooks/useEvents';
import type { CalendarEvent, CreateEventRequest } from '@/types';
import { format } from 'date-fns';

export const DashboardPage = () => {
  const { currentDate, view } = useCalendarStore();
  const [showEventModal, setShowEventModal] = useState(false);
  const [showAIModal, setShowAIModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | undefined>();

  const startDate = useMemo(() => startOfMonth(currentDate), [currentDate]);
  const endDate = useMemo(() => endOfMonth(currentDate), [currentDate]);

  const { events, isLoading, createEvent, updateEvent, deleteEvent, isCreating } =
    useEvents(startDate, endDate);

  const handleDayClick = (date: Date) => {
    setSelectedDate(date);
    setSelectedEvent(undefined);
    setShowEventModal(true);
  };

  const handleTimeSlotClick = (date: Date, hour?: number) => {
    const newDate = new Date(date);
    if (hour !== undefined) {
      newDate.setHours(hour, 0, 0, 0);
    }
    setSelectedDate(newDate);
    setSelectedEvent(undefined);
    setShowEventModal(true);
  };

  const handleEventClick = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setSelectedDate(undefined);
    setShowEventModal(true);
  };

  const handleEventSubmit = (data: CreateEventRequest) => {
    if (selectedEvent) {
      updateEvent({ ...data, id: selectedEvent.id });
    } else {
      createEvent(data);
    }
    setShowEventModal(false);
    setSelectedEvent(undefined);
    setSelectedDate(undefined);
  };

  const handleEventDelete = () => {
    if (selectedEvent) {
      deleteEvent(selectedEvent.id);
      setShowEventModal(false);
      setSelectedEvent(undefined);
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <CalendarHeader />
          <div className="flex gap-2">
            <Button onClick={() => setShowAIModal(true)}>
              <Plus className="w-4 h-4 mr-2" />
              AI로 생성
            </Button>
            <Button variant="outline" onClick={() => setShowEventModal(true)}>
              <Plus className="w-4 h-4 mr-2" />
              일정 추가
            </Button>
          </div>
        </div>

        {/* Calendar View */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Spinner size="lg" />
          </div>
        ) : view === 'month' ? (
          <MonthView
            currentDate={currentDate}
            events={events}
            onEventClick={handleEventClick}
            onDayClick={handleDayClick}
          />
        ) : view === 'week' ? (
          <WeekView
            currentDate={currentDate}
            events={events}
            onEventClick={handleEventClick}
            onTimeSlotClick={handleTimeSlotClick}
          />
        ) : (
          <DayView
            currentDate={currentDate}
            events={events}
            onEventClick={handleEventClick}
            onTimeSlotClick={(hour) => handleTimeSlotClick(currentDate, hour)}
          />
        )}

        {/* Upcoming Events */}
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            다가오는 일정
          </h3>
          <div className="space-y-3">
            {events
              .filter((event) => new Date(event.startTime) >= new Date())
              .slice(0, 5)
              .map((event) => (
                <div
                  key={event.id}
                  onClick={() => handleEventClick(event)}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <div
                    className="w-1 h-16 rounded"
                    style={{ backgroundColor: event.color || '#3B82F6' }}
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{event.title}</h4>
                    <p className="text-sm text-gray-600">
                      {format(new Date(event.startTime), 'yyyy년 MM월 dd일 HH:mm')}
                    </p>
                    {event.location && (
                      <p className="text-sm text-gray-500">{event.location}</p>
                    )}
                  </div>
                </div>
              ))}
            {events.length === 0 && (
              <p className="text-center text-gray-500 py-4">
                예정된 일정이 없습니다
              </p>
            )}
          </div>
        </Card>
      </div>

      {/* Event Modal */}
      <Modal
        isOpen={showEventModal}
        onClose={() => {
          setShowEventModal(false);
          setSelectedEvent(undefined);
          setSelectedDate(undefined);
        }}
        title={selectedEvent ? '일정 수정' : '일정 생성'}
      >
        <EventForm
          event={selectedEvent}
          initialDate={selectedDate}
          onSubmit={handleEventSubmit}
          onCancel={() => {
            setShowEventModal(false);
            setSelectedEvent(undefined);
            setSelectedDate(undefined);
          }}
          isLoading={isCreating}
        />
        {selectedEvent && (
          <div className="mt-4 pt-4 border-t">
            <Button
              variant="danger"
              onClick={handleEventDelete}
              className="w-full"
            >
              일정 삭제
            </Button>
          </div>
        )}
      </Modal>

      {/* AI Event Creator Modal */}
      <Modal
        isOpen={showAIModal}
        onClose={() => setShowAIModal(false)}
        title="AI로 일정 생성"
        size="lg"
      >
        <AIEventCreator onSuccess={() => setShowAIModal(false)} />
      </Modal>
    </Layout>
  );
};
