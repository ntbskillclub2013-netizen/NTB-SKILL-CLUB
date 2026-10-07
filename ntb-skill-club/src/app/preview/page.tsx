"use client";

import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Input, Select, Textarea } from "@/components/Fields";
import { StatusBadge, STATUS_CONFIG, type Status } from "@/components/StatusBadge";
import { EmptyState, ErrorState, LoadingState } from "@/components/States";

const statuses = Object.keys(STATUS_CONFIG) as Status[];

export default function PreviewPage() {
  return (
    <main className="container stack">
      <header className="stack" style={{ gap: 4 }}>
        <h1>NTB SKILL CLUB</h1>
        <p className="muted">Design System Preview</p>
      </header>

      <Card title="Nút bấm">
        <div className="row">
          <Button>Chính</Button>
          <Button variant="secondary">Phụ</Button>
          <Button variant="outline">Viền</Button>
          <Button disabled>Vô hiệu hóa</Button>
        </div>
      </Card>

      <div className="grid">
        <Card title="Thẻ">
          <p className="muted">Thẻ bo góc, nền sáng, khoảng cách thoáng.</p>
        </Card>
        <Card title="Huy hiệu">
          <div className="row">
            <Badge>Mặc định</Badge>
            <Badge accent>Nổi bật</Badge>
          </div>
        </Card>
      </div>

      <Card title="Trạng thái">
        <div className="row">
          {statuses.map((s) => (
            <StatusBadge key={s} status={s} />
          ))}
        </div>
      </Card>

      <Card title="Biểu mẫu">
        <div className="grid">
          <Input id="pv-input" label="Họ và tên" placeholder="Nhập họ và tên" />
          <Select id="pv-select" label="Lựa chọn" defaultValue="">
            <option value="" disabled>Chọn một mục</option>
            <option value="a">Mục A</option>
            <option value="b">Mục B</option>
          </Select>
          <Textarea id="pv-textarea" label="Ghi chú" placeholder="Nhập ghi chú" />
          <Input id="pv-disabled" label="Ô bị vô hiệu hóa" value="Không thể chỉnh sửa" disabled readOnly />
        </div>
      </Card>

      <div className="grid">
        <Card title="Đang tải"><LoadingState /></Card>
        <Card title="Trống"><EmptyState description="Dữ liệu sẽ hiển thị tại đây khi có." /></Card>
        <Card title="Lỗi">
          <ErrorState description="Không thể tải nội dung. Kiểm tra kết nối rồi thử lại." onRetry={() => {}} />
        </Card>
      </div>
    </main>
  );
}
