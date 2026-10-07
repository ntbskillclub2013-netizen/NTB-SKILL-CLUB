import type { ReactNode } from "react";

export function Badge({ accent = false, children }: { accent?: boolean; children: ReactNode }) {
  return <span className={accent ? "badge badge-accent" : "badge"}>{children}</span>;
}
