import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Alert } from '@/components/ui/Alert';
import { useAI } from '@/hooks/useAI';
import { useEvents } from '@/hooks/useEvents';
import type { CreateEventRequest } from '@/types';

interface AIEventCreatorProps {
  onSuccess?: () => void;
}

export const AIEventCreator = ({ onSuccess }: AIEventCreatorProps) => {
  const [prompt, setPrompt] = useState('');
  const [suggestedEvents, setSuggestedEvents] = useState<CreateEventRequest[]>([]);
  const { createEventFromPromptAsync, isLoading } = useAI();
  const { createEvent } = useEvents();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    try {
      const result = await createEventFromPromptAsync({ prompt });
      setSuggestedEvents(result.events);
    } catch (error) {
      console.error('AI 이벤트 생성 실패:', error);
    }
  };

  const handleCreateEvent = (event: CreateEventRequest) => {
    createEvent(event);
    setSuggestedEvents([]);
    setPrompt('');
    onSuccess?.();
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Sparkles className="inline w-4 h-4 mr-1" />
            AI로 이벤트 생성하기
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="예: 내일 오후 2시에 팀 미팅 일정을 잡아줘"
            rows={3}
            className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
        <Button type="submit" isLoading={isLoading} className="w-full">
          AI로 일정 생성
        </Button>
      </form>

      {suggestedEvents.length > 0 && (
        <div className="space-y-3">
          <Alert type="success" title="AI가 다음 이벤트를 제안합니다:">
            아래 제안된 이벤트를 확인하고 생성해보세요.
          </Alert>

          {suggestedEvents.map((event, index) => (
            <div
              key={index}
              className="p-4 border border-gray-200 rounded-lg space-y-2"
            >
              <h4 className="font-semibold text-gray-900">{event.title}</h4>
              {event.description && (
                <p className="text-sm text-gray-600">{event.description}</p>
              )}
              <div className="text-sm text-gray-500">
                <p>
                  시작: {new Date(event.startTime).toLocaleString('ko-KR')}
                </p>
                <p>종료: {new Date(event.endTime).toLocaleString('ko-KR')}</p>
                {event.location && <p>장소: {event.location}</p>}
              </div>
              <Button
                size="sm"
                onClick={() => handleCreateEvent(event)}
                className="mt-2"
              >
                이 이벤트 생성
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
