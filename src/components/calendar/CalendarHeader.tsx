import { ChevronLeft, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Button } from '@/components/ui/Button';
import { useCalendarStore } from '@/store/calendarStore';
import type { EventView } from '@/types';

export const CalendarHeader = () => {
  const {
    currentDate,
    view,
    setView,
    goToToday,
    goToNextPeriod,
    goToPreviousPeriod,
  } = useCalendarStore();

  const getDateLabel = () => {
    switch (view) {
      case 'day':
        return format(currentDate, 'yyyy년 MM월 dd일 (E)', { locale: ko });
      case 'week':
        return format(currentDate, 'yyyy년 MM월', { locale: ko });
      case 'month':
        return format(currentDate, 'yyyy년 MM월', { locale: ko });
    }
  };

  return (
    <div className="flex items-center justify-between mb-6">
      {/* Date Navigation */}
      <div className="flex items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-900">{getDateLabel()}</h2>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={goToPreviousPeriod}
            className="p-2"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={goToToday}>
            오늘
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={goToNextPeriod}
            className="p-2"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* View Selector */}
      <div className="flex gap-2">
        {(['day', 'week', 'month'] as EventView[]).map((v) => (
          <Button
            key={v}
            variant={view === v ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setView(v)}
          >
            {v === 'day' ? '일' : v === 'week' ? '주' : '월'}
          </Button>
        ))}
      </div>
    </div>
  );
};
