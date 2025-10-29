import { ReactNode } from 'react';
import { AlertCircle, CheckCircle, Info, XCircle } from 'lucide-react';
import clsx from 'clsx';

interface AlertProps {
  type?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  children: ReactNode;
  onClose?: () => void;
}

export const Alert = ({ type = 'info', title, children, onClose }: AlertProps) => {
  const icons = {
    info: <Info className="w-5 h-5" />,
    success: <CheckCircle className="w-5 h-5" />,
    warning: <AlertCircle className="w-5 h-5" />,
    error: <XCircle className="w-5 h-5" />,
  };

  return (
    <div
      className={clsx('rounded-lg p-4 flex items-start gap-3', {
        'bg-blue-50 text-blue-900': type === 'info',
        'bg-green-50 text-green-900': type === 'success',
        'bg-yellow-50 text-yellow-900': type === 'warning',
        'bg-red-50 text-red-900': type === 'error',
      })}
    >
      <div
        className={clsx({
          'text-blue-600': type === 'info',
          'text-green-600': type === 'success',
          'text-yellow-600': type === 'warning',
          'text-red-600': type === 'error',
        })}
      >
        {icons[type]}
      </div>
      <div className="flex-1">
        {title && <h4 className="font-medium mb-1">{title}</h4>}
        <div className="text-sm">{children}</div>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600"
        >
          <XCircle className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};
