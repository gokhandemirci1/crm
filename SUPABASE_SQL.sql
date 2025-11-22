-- Müşteriler tablosu oluştur
CREATE TABLE IF NOT EXISTS customers (
  id BIGSERIAL PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  exam_score TEXT,
  promo_code TEXT,
  camp TEXT NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index ekle (performans için)
CREATE INDEX IF NOT EXISTS idx_customers_created_at ON customers(created_at DESC);

-- Row Level Security (RLS) ayarları
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;

-- Mevcut policy'leri sil (eğer varsa)
DROP POLICY IF EXISTS "Enable read access for all users" ON customers;
DROP POLICY IF EXISTS "Enable insert access for all users" ON customers;
DROP POLICY IF EXISTS "Enable delete access for all users" ON customers;

-- Herkesin okuyabilmesi için policy
CREATE POLICY "Enable read access for all users" ON customers
  FOR SELECT USING (true);

-- Herkesin ekleyebilmesi için policy
CREATE POLICY "Enable insert access for all users" ON customers
  FOR INSERT WITH CHECK (true);

-- Herkesin silebilmesi için policy
CREATE POLICY "Enable delete access for all users" ON customers
  FOR DELETE USING (true);

