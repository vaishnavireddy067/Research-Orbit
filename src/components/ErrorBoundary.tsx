import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallbackTitle?: string;
  onReset?: () => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[450px] p-8 text-center bg-slate-900/60 border border-slate-800 rounded-3xl backdrop-blur-xl m-4">
          <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 mb-6 shadow-lg shadow-rose-500/10">
            <AlertTriangle className="w-8 h-8 animate-pulse" />
          </div>

          <h2 className="text-xl font-bold text-white mb-2">
            {this.props.fallbackTitle || 'Something went wrong rendering this view'}
          </h2>

          <p className="text-sm text-slate-400 max-w-md mb-6 leading-relaxed">
            {this.state.error?.message || 'An unexpected rendering error occurred. You can safely reset this view or navigate back to the Overview.'}
          </p>

          <div className="flex items-center gap-3">
            <button
              onClick={this.handleReset}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Retry View</span>
            </button>

            {this.props.onReset && (
              <button
                onClick={() => {
                  this.handleReset();
                  window.location.hash = '#overview';
                }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold border border-slate-700 transition-all cursor-pointer"
              >
                <Home className="w-4 h-4" />
                <span>Return to Overview</span>
              </button>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
