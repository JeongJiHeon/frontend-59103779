import { useMemo } from 'react';
import {
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  isSameDay,
  isToday,
} from 'date-fns';
import { ko } from 'date-fns/locale';
import clsx from 'clsx';
import type { CalendarEvent } from '@/types';

interface WeekViewProps {
  currentDate: Date;
  events: CalendarEvent[];
  onEventClick: (event: CalendarEvent) => void;
  onTimeSlotClick: (date: Date, hour: number) => void;
}

export const WeekView = ({
  currentDate,
  events,
  onEventClick,
  onTimeSlotClick,
}: WeekViewProps) => {
  const weekDays = useMemo(() => {
    const start = startOfWeek(currentDate, { locale: ko });
    const end = endOfWeek(currentDate, { locale: ko });
    return eachDayOfInterval({ start, end });
  }, [currentDate]);

  const hours = Array.from({ length: 24 }, (_, i) => i);

  const getEventsForDay = (date: Date) => {
    return events.filter((event) =>
      isSameDay(new Date(event.startTime), date)
    );
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {/* Header */}
      <div className="grid grid-cols-8 border-b">
        <div className="p-2 text-sm font-semibold text-gray-700">시간</div>
        {weekDays.map((day) => (
          <div
            key={day.toISOString()}
            className={clsx(
              'p-2 text-center text-sm font-semibold',
              isToday(day) ? 'bg-primary-50 text-primary-700' : 'text-gray-700'
            )}
          >
            <div>{format(day, 'E', { locale: ko })}</div>
            <div className="text-lg">{format(day, 'd')}</div>
          </div>
        ))}
      </div>

      {/* Time Grid */}
      <div className="overflow-y-auto max-h-[600px]">
        {hours.map((hour) => (
          <div key={hour} className="grid grid-cols-8 border-b">
            <div className="p-2 text-xs text-gray-500 border-r">
              {format(new Date().setHours(hour, 0), 'HH:00')}
            </div>
            {weekDays.map((day) => {
              const dayEvents = getEventsForDay(day).filter((event) => {
                const eventHour = new Date(event.startTime).getHours();
                return eventHour === hour;
              });

              return (
                <div
                  key={day.toISOString()}
                  onClick={() => onTimeSlotClick(day, hour)}
                  className="min-h-[60px] p-1 border-r cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  {dayEvents.map((event) => (
                    <div
                      key={event.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        onEventClick(event);
                      }}
                      className="text-xs p-1 mb-1 rounded bg-primary-100 text-primary-800 truncate hover:bg-primary-200 transition-colors cursor-pointer"
                    >
                      <div className="font-medium">{event.title}</div>
                      <div>{format(new Date(event.startTime), 'HH:mm')}</div>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};
