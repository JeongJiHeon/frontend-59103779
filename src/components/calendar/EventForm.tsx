import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import type { CalendarEvent, CreateEventRequest } from '@/types';

const eventSchema = z.object({
  title: z.string().min(1, '제목을 입력해주세요'),
  description: z.string().optional(),
  startTime: z.string().min(1, '시작 시간을 입력해주세요'),
  endTime: z.string().min(1, '종료 시간을 입력해주세요'),
  location: z.string().optional(),
  color: z.string().optional(),
});

type EventFormData = z.infer<typeof eventSchema>;

interface EventFormProps {
  event?: CalendarEvent;
  initialDate?: Date;
  onSubmit: (data: CreateEventRequest) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export const EventForm = ({
  event,
  initialDate,
  onSubmit,
  onCancel,
  isLoading,
}: EventFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
    defaultValues: event
      ? {
          title: event.title,
          description: event.description || '',
          startTime: event.startTime,
          endTime: event.endTime,
          location: event.location || '',
          color: event.color || '#3B82F6',
        }
      : {
          startTime: initialDate
            ? new Date(initialDate.setHours(9, 0)).toISOString().slice(0, 16)
            : '',
          endTime: initialDate
            ? new Date(initialDate.setHours(10, 0)).toISOString().slice(0, 16)
            : '',
          color: '#3B82F6',
        },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="제목"
        {...register('title')}
        error={errors.title?.message}
        placeholder="이벤트 제목을 입력하세요"
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          설명
        </label>
        <textarea
          {...register('description')}
          rows={3}
          className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          placeholder="이벤트 설명 (선택사항)"
        />
      </div>

      <Input
        label="시작 시간"
        type="datetime-local"
        {...register('startTime')}
        error={errors.startTime?.message}
      />

      <Input
        label="종료 시간"
        type="datetime-local"
        {...register('endTime')}
        error={errors.endTime?.message}
      />

      <Input
        label="장소"
        {...register('location')}
        placeholder="장소 (선택사항)"
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          색상
        </label>
        <input
          type="color"
          {...register('color')}
          className="h-10 w-full rounded-lg cursor-pointer"
        />
      </div>

      <div className="flex gap-3 pt-4">
        <Button type="submit" isLoading={isLoading} className="flex-1">
          {event ? '수정' : '생성'}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          취소
        </Button>
      </div>
    </form>
  );
};
