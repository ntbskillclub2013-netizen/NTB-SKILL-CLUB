import { render, screen } from "@testing-library/react";
import { StatusBadge, STATUS_CONFIG, type Status } from "./StatusBadge";

describe("StatusBadge", () => {
  const all = Object.keys(STATUS_CONFIG) as Status[];

  it.each(all)("renders %s with its Vietnamese label and class", (status) => {
    render(<StatusBadge status={status} />);
    const el = screen.getByText(STATUS_CONFIG[status].label);
    expect(el).toBeInTheDocument();
    expect(el).toHaveClass(`status-${status.toLowerCase()}`);
  });

  it("covers exactly 6 statuses", () => {
    expect(all).toHaveLength(6);
  });
});
