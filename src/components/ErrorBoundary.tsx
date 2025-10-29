import { Component, ErrorInfo, ReactNode } from 'react';
import { Alert } from '@/components/ui/Alert';
import { Button } from '@/components/ui/Button';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
          <div className="max-w-lg w-full">
            <Alert type="error" title="오류가 발생했습니다">
              <p className="mb-4">
                죄송합니다. 예상치 못한 오류가 발생했습니다.
              </p>
              {this.state.error && (
                <pre className="text-xs bg-red-100 p-2 rounded overflow-auto mb-4">
                  {this.state.error.message}
                </pre>
              )}
              <Button
                onClick={() => {
                  this.setState({ hasError: false, error: undefined });
                  window.location.href = '/';
                }}
              >
                홈으로 돌아가기
              </Button>
            </Alert>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
