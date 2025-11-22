# Supabase Kurulum Rehberi

Bu rehber, uygulamanızı Supabase ile entegre etmek için gereken adımları içerir.

## 1. Supabase Hesabı Oluşturma

1. [Supabase](https://supabase.com) adresine gidin
2. "Start your project" butonuna tıklayın
3. GitHub hesabınızla giriş yapın veya e-posta ile kayıt olun
4. Yeni bir proje oluşturun

## 2. Database Tablosu Oluşturma

Supabase Dashboard'da SQL Editor'a gidin ve şu SQL'i çalıştırın:

```sql
-- Müşteriler tablosu oluştur
CREATE TABLE customers (
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
CREATE INDEX idx_customers_created_at ON customers(created_at DESC);

-- Row Level Security (RLS) ayarları
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;

-- Herkesin okuyabilmesi için policy (güvenlik için daha sonra değiştirilebilir)
CREATE POLICY "Enable read access for all users" ON customers
  FOR SELECT USING (true);

-- Herkesin ekleyebilmesi için policy
CREATE POLICY "Enable insert access for all users" ON customers
  FOR INSERT WITH CHECK (true);

-- Herkesin silebilmesi için policy
CREATE POLICY "Enable delete access for all users" ON customers
  FOR DELETE USING (true);
```

## 3. Supabase Credentials Alma

1. Supabase Dashboard'da projenize gidin
2. **Settings** > **API** bölümüne gidin
3. Şu bilgileri kopyalayın:
   - **Project URL** (örn: `https://xxxxx.supabase.co`)
   - **anon public key** (anon/public key)

## 4. Environment Variables Ekleme

### Yerel Geliştirme için (.env dosyası)

Proje kök dizininde `.env` dosyası oluşturun:

```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

### Vercel Deployment için

1. Vercel Dashboard'da projenize gidin
2. **Settings** > **Environment Variables** bölümüne gidin
3. Şu değişkenleri ekleyin:
   - **Name:** `VITE_SUPABASE_URL`
     **Value:** Supabase Project URL'iniz
   - **Name:** `VITE_SUPABASE_ANON_KEY`
     **Value:** Supabase anon key'iniz

## 5. Güvenlik Notları

⚠️ **Önemli:** Yukarıdaki SQL policy'leri herkese açık erişim sağlar. Production ortamında:

1. Authentication ekleyin
2. Row Level Security (RLS) policy'lerini güncelleyin
3. Sadece authenticated kullanıcıların erişebilmesini sağlayın

Örnek güvenli policy:

```sql
-- Sadece authenticated kullanıcılar okuyabilsin
CREATE POLICY "Enable read for authenticated users" ON customers
  FOR SELECT USING (auth.role() = 'authenticated');

-- Sadece authenticated kullanıcılar ekleyebilsin
CREATE POLICY "Enable insert for authenticated users" ON customers
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');
```

## 6. Test Etme

1. Uygulamayı çalıştırın: `npm run dev`
2. Bir müşteri ekleyin
3. Farklı bir cihazdan veya tarayıcıdan giriş yapın
4. Eklediğiniz müşteriyi görebilmelisiniz

## 7. Fallback Mekanizması

Eğer Supabase credentials yoksa, uygulama otomatik olarak localStorage kullanmaya devam eder. Bu sayede:
- Supabase kurulumu yapmadan da uygulama çalışır
- Yerel geliştirme için localStorage yeterlidir
- Production'da Supabase kullanılabilir

## Sorun Giderme

### Müşteriler görünmüyor
- Supabase credentials'ları kontrol edin
- Browser console'da hata var mı kontrol edin
- Supabase Dashboard'da tablo oluşturulmuş mu kontrol edin

### "Failed to fetch" hatası
- CORS ayarlarını kontrol edin
- Supabase URL'inin doğru olduğundan emin olun
- Network sekmesinde request'leri kontrol edin

