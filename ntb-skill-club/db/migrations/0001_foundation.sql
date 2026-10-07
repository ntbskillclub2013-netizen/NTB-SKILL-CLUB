-- DAY 02: database foundation. IDs are UUID (gen_random_uuid, built into PostgreSQL 13+).
-- Timestamps are timestamptz, defaulting to database time (now()).
-- No hard deletes of business data: foreign keys use ON DELETE RESTRICT; rows are retired via deleted_at.

CREATE FUNCTION set_updated_at() RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TABLE accounts (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email         text NOT NULL CHECK (email = btrim(email) AND email <> ''),
  status        text NOT NULL DEFAULT 'pending'
                CHECK (status IN ('active', 'inactive', 'locked', 'pending', 'restricted')),
  last_login_at timestamptz,
  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now(),
  deleted_at    timestamptz
);
CREATE UNIQUE INDEX accounts_email_key ON accounts (lower(email));

CREATE TABLE members (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  account_id uuid NOT NULL UNIQUE REFERENCES accounts (id) ON DELETE RESTRICT,
  full_name  text NOT NULL CHECK (btrim(full_name) <> ''),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz
);

CREATE TABLE member_cards (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  member_id  uuid NOT NULL UNIQUE REFERENCES members (id) ON DELETE RESTRICT,
  card_code  text NOT NULL UNIQUE CHECK (btrim(card_code) <> ''),
  status     text NOT NULL DEFAULT 'active'
             CHECK (status IN ('active', 'inactive', 'revoked')),
  issued_at  timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TRIGGER accounts_set_updated_at BEFORE UPDATE ON accounts FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER members_set_updated_at BEFORE UPDATE ON members FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER member_cards_set_updated_at BEFORE UPDATE ON member_cards FOR EACH ROW EXECUTE FUNCTION set_updated_at();
