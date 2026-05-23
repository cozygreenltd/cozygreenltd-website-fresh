import { Component, type ReactNode } from "react";

type ErrorBoundaryProps = {
  children: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
};

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error("App render error:", error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-background px-4">
          <div className="max-w-lg rounded-2xl border border-border bg-card p-8 text-center shadow-lg">
            <h1 className="text-3xl font-bold text-foreground">Something went wrong</h1>
            <p className="mt-3 text-sm text-muted-foreground">
              The site hit a render error. Refresh the page, and if it still stays blank, send me the
              browser console error so I can fix the exact component.
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
