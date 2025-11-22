-- Mevcut customers tablosuna age ve grade kolonlarını ekle
-- Bu SQL'i Supabase Dashboard > SQL Editor'da çalıştırın

ALTER TABLE customers ADD COLUMN IF NOT EXISTS age INTEGER;
ALTER TABLE customers ADD COLUMN IF NOT EXISTS grade TEXT;

-- Kolonların eklendiğini kontrol et
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'customers' 
AND column_name IN ('age', 'grade');

