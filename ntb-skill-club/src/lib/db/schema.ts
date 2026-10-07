// Mirrors db/migrations/0001_foundation.sql. schema.test.ts checks the status lists stay in sync.
export const ACCOUNT_STATUSES = ["active", "inactive", "locked", "pending", "restricted"] as const;
export const CARD_STATUSES = ["active", "inactive", "revoked"] as const;

export type AccountStatus = (typeof ACCOUNT_STATUSES)[number];
export type CardStatus = (typeof CARD_STATUSES)[number];

export interface AccountRow {
  id: string;
  email: string;
  status: AccountStatus;
  last_login_at: Date | null;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}

export interface MemberRow {
  id: string;
  account_id: string;
  full_name: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}

export interface MemberCardRow {
  id: string;
  member_id: string;
  card_code: string;
  status: CardStatus;
  issued_at: Date;
  created_at: Date;
  updated_at: Date;
}
