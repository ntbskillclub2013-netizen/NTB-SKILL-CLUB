export type Status = "SUCCESS" | "WARNING" | "DANGER" | "INFO" | "PENDING" | "NEUTRAL";

export const STATUS_CONFIG: Record<Status, { label: string; icon: string }> = {
  SUCCESS: { label: "Thành công", icon: "✓" },
  WARNING: { label: "Cảnh báo", icon: "!" },
  DANGER: { label: "Nguy hiểm", icon: "✕" },
  INFO: { label: "Thông tin", icon: "i" },
  PENDING: { label: "Đang chờ", icon: "…" },
  NEUTRAL: { label: "Không có trạng thái", icon: "–" },
};

export function StatusBadge({ status }: { status: Status }) {
  const { label, icon } = STATUS_CONFIG[status];
  return (
    <span className={`status status-${status.toLowerCase()}`} data-status={status}>
      <span aria-hidden="true">{icon}</span>
      {label}
    </span>
  );
}
