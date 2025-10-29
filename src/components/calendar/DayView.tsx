import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import clsx from 'clsx';
import type { CalendarEvent } from '@/types';

interface DayViewProps {
  currentDate: Date;
  events: CalendarEvent[];
  onEventClick: (event: CalendarEvent) => void;
  onTimeSlotClick: (hour: number) => void;
}

export const DayView = ({
  currentDate,
  events,
  onEventClick,
  onTimeSlotClick,
}: DayViewProps) => {
  const hours = Array.from({ length: 24 }, (_, i) => i);

  const getEventsForHour = (hour: number) => {
    return events.filter((event) => {
      const eventDate = new Date(event.startTime);
      return (
        eventDate.getDate() === currentDate.getDate() &&
        eventDate.getMonth() === currentDate.getMonth() &&
        eventDate.getFullYear() === currentDate.getFullYear() &&
        eventDate.getHours() === hour
      );
    });
  };

  return (
    <div className="bg-white rounded-lg shadow">
      {/* Header */}
      <div className="p-4 border-b">
        <h3 className="text-lg font-semibold text-gray-900">
          {format(currentDate, 'yyyy년 MM월 dd일 (E)', { locale: ko })}
        </h3>
      </div>

      {/* Time Slots */}
      <div className="overflow-y-auto max-h-[700px]">
        {hours.map((hour) => {
          const hourEvents = getEventsForHour(hour);

          return (
            <div
              key={hour}
              onClick={() => onTimeSlotClick(hour)}
              className="flex border-b hover:bg-gray-50 transition-colors cursor-pointer"
            >
              {/* Time Label */}
              <div className="w-20 p-3 text-sm text-gray-500 border-r">
                {format(new Date().setHours(hour, 0), 'HH:00')}
              </div>

              {/* Events */}
              <div className="flex-1 p-2 min-h-[80px]">
                <div className="space-y-2">
                  {hourEvents.map((event) => (
                    <div
                      key={event.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        onEventClick(event);
                      }}
                      className={clsx(
                        'p-3 rounded-lg cursor-pointer transition-colors',
                        'hover:shadow-md'
                      )}
                      style={{
                        backgroundColor: event.color
                          ? `${event.color}20`
                          : '#EFF6FF',
                        borderLeft: `4px solid ${event.color || '#3B82F6'}`,
                      }}
                    >
                      <div className="font-semibold text-gray-900">
                        {event.title}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        {format(new Date(event.startTime), 'HH:mm')} -{' '}
                        {format(new Date(event.endTime), 'HH:mm')}
                      </div>
                      {event.location && (
                        <div className="text-sm text-gray-500 mt-1">
                          📍 {event.location}
                        </div>
                      )}
                      {event.description && (
                        <div className="text-sm text-gray-600 mt-2">
                          {event.description}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
