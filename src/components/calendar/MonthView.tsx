import { useMemo } from 'react';
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  isSameMonth,
  isSameDay,
  isToday,
} from 'date-fns';
import { ko } from 'date-fns/locale';
import clsx from 'clsx';
import type { CalendarEvent } from '@/types';

interface MonthViewProps {
  currentDate: Date;
  events: CalendarEvent[];
  onEventClick: (event: CalendarEvent) => void;
  onDayClick: (date: Date) => void;
}

export const MonthView = ({
  currentDate,
  events,
  onEventClick,
  onDayClick,
}: MonthViewProps) => {
  const days = useMemo(() => {
    const start = startOfWeek(startOfMonth(currentDate), { locale: ko });
    const end = endOfWeek(endOfMonth(currentDate), { locale: ko });
    return eachDayOfInterval({ start, end });
  }, [currentDate]);

  const getEventsForDay = (date: Date) => {
    return events.filter((event) =>
      isSameDay(new Date(event.startTime), date)
    );
  };

  return (
    <div className="bg-white rounded-lg shadow">
      {/* Weekday Headers */}
      <div className="grid grid-cols-7 border-b">
        {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
          <div
            key={day}
            className="py-3 text-center text-sm font-semibold text-gray-700"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 divide-x divide-y">
        {days.map((day) => {
          const dayEvents = getEventsForDay(day);
          const isCurrentMonth = isSameMonth(day, currentDate);
          const isDayToday = isToday(day);

          return (
            <div
              key={day.toISOString()}
              onClick={() => onDayClick(day)}
              className={clsx(
                'min-h-[120px] p-2 cursor-pointer hover:bg-gray-50 transition-colors',
                !isCurrentMonth && 'bg-gray-50'
              )}
            >
              <div
                className={clsx(
                  'text-sm font-medium mb-1',
                  isCurrentMonth ? 'text-gray-900' : 'text-gray-400',
                  isDayToday &&
                    'bg-primary-600 text-white w-6 h-6 rounded-full flex items-center justify-center'
                )}
              >
                {format(day, 'd')}
              </div>

              {/* Events */}
              <div className="space-y-1">
                {dayEvents.slice(0, 3).map((event) => (
                  <div
                    key={event.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      onEventClick(event);
                    }}
                    className="text-xs p-1 rounded bg-primary-100 text-primary-800 truncate hover:bg-primary-200 transition-colors"
                  >
                    {format(new Date(event.startTime), 'HH:mm')} {event.title}
                  </div>
                ))}
                {dayEvents.length > 3 && (
                  <div className="text-xs text-gray-500">
                    +{dayEvents.length - 3} 더보기
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
