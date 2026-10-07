import Link from "next/link";

export default function Home() {
  return (
    <main className="container stack">
      <h1>NTB SKILL CLUB</h1>
      <p className="muted">Project Foundation</p>
      <div>
        <Link href="/preview" className="btn btn-primary" style={{ display: "inline-flex", alignItems: "center", textDecoration: "none" }}>
          Xem Design System Preview
        </Link>
      </div>
    </main>
  );
}
