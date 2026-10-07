import { Button } from "./Button";

export function LoadingState({ message = "Đang tải..." }: { message?: string }) {
  return (
    <div className="state" role="status" aria-live="polite">
      <div className="spinner" aria-hidden="true" />
      <p className="muted">{message}</p>
    </div>
  );
}

export function EmptyState({ title = "Chưa có dữ liệu", description }: { title?: string; description?: string }) {
  return (
    <div className="state">
      <div className="state-icon" aria-hidden="true">📭</div>
      <h3>{title}</h3>
      {description && <p className="muted">{description}</p>}
    </div>
  );
}

export function ErrorState({ title = "Đã xảy ra lỗi", description, onRetry }: { title?: string; description?: string; onRetry?: () => void }) {
  return (
    <div className="state" role="alert">
      <div className="state-icon" aria-hidden="true">⚠️</div>
      <h3>{title}</h3>
      {description && <p className="muted">{description}</p>}
      {onRetry && <Button variant="outline" onClick={onRetry}>Thử lại</Button>}
    </div>
  );
}
