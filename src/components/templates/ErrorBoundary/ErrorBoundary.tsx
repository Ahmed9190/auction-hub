import React, { Component, ReactNode } from 'react';
import { logger } from '../../../utils/logger';
import styles from './ErrorBoundary.module.css';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({ errorInfo });

    try {
      logger.error('React Error Boundary caught error', {
        errorName: error.name,
        errorMessage: error.message,
        componentStack: errorInfo.componentStack?.substring(0, 200),
      });
    } catch (logError) {
      console.error('Failed to log error in boundary:', error.message);
    }
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.container}>
          <div className={styles.content}>
            <h1 className={styles.title}>🔴 حدث خطأ</h1>
            <p className={styles.message}>عذراً، حدث خطأ غير متوقع في التطبيق.</p>

            {import.meta.env.DEV && this.state.error && (
              <details className={styles.errorDetails}>
                <summary>تفاصيل الخطأ (التطوير فقط)</summary>
                <pre className={styles.errorStack}>
                  {this.state.error.stack}
                </pre>
                {this.state.errorInfo?.componentStack && (
                  <pre className={styles.errorStack}>
                    {this.state.errorInfo.componentStack}
                  </pre>
                )}
              </details>
            )}

            <button onClick={this.handleReset} className={styles.button}>
              محاولة مجدداً
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}