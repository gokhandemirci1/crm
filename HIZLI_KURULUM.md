# 🚀 Hızlı Supabase Kurulumu (5 Dakika)

Farklı cihazlardan müşteri görmek için Supabase kurulumu yapın.

## ⚡ Hızlı Adımlar

### 1️⃣ Supabase Hesabı Oluştur (2 dakika)

1. https://supabase.com adresine git
2. "Start your project" tıkla
3. GitHub ile giriş yap (veya e-posta ile kayıt ol)
4. "New Project" tıkla
5. Proje adı gir ve şifre belirle
6. Bölge seç (en yakın bölgeyi seç)
7. "Create new project" tıkla (1-2 dakika bekleyin)

### 2️⃣ Database Tablosu Oluştur (1 dakika)

1. Supabase Dashboard'da sol menüden **SQL Editor**'a tıkla
2. "New query" tıkla
3. Aşağıdaki SQL'i kopyala-yapıştır:

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

-- Index ekle
CREATE INDEX idx_customers_created_at ON customers(created_at DESC);

-- Row Level Security
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;

-- Herkesin erişebilmesi için policy
CREATE POLICY "Enable read access for all users" ON customers
  FOR SELECT USING (true);

CREATE POLICY "Enable insert access for all users" ON customers
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable delete access for all users" ON customers
  FOR DELETE USING (true);
```

4. "Run" butonuna tıkla (veya Ctrl+Enter)
5. ✅ "Success" mesajını gör

### 3️⃣ API Bilgilerini Al (30 saniye)

1. Sol menüden **Settings** (⚙️) tıkla
2. **API** sekmesine tıkla
3. Şu iki bilgiyi kopyala:
   - **Project URL** (örn: `https://abcdefgh.supabase.co`)
   - **anon public** key (uzun bir string)

### 4️⃣ Environment Variables Ekle (1 dakika)

#### Yerel Geliştirme için:

Proje klasöründe `.env` dosyası oluştur:

```env
VITE_SUPABASE_URL=https://abcdefgh.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Önemli:** `.env` dosyası zaten varsa, sadece bu iki satırı ekle.

#### Vercel için (Production):

1. https://vercel.com adresine git
2. Projeni seç
3. **Settings** > **Environment Variables**
4. Şu iki değişkeni ekle:
   - `VITE_SUPABASE_URL` = Supabase URL'in
   - `VITE_SUPABASE_ANON_KEY` = Supabase anon key'in
5. **Save** tıkla
6. **Deployments** sekmesinden son deployment'ı yeniden deploy et

### 5️⃣ Test Et (30 saniye)

1. Uygulamayı yeniden başlat: `npm run dev`
2. Dashboard'da yeşil "Supabase Aktif" mesajını gör
3. Bir müşteri ekle
4. Farklı bir cihazdan/tarayıcıdan giriş yap
5. ✅ Eklediğin müşteriyi gör!

## 🔄 Mevcut Verileri Taşıma

Eğer localStorage'da müşterilerin varsa:

1. Dashboard'da yeşil "Supabase Aktif" mesajını gör
2. "LocalStorage Verilerini Supabase'e Taşı" butonuna tıkla
3. Tüm müşteriler otomatik olarak Supabase'e taşınır

## ❓ Sorun mu var?

### Müşteriler görünmüyor
- Browser console'u aç (F12) ve hata var mı kontrol et
- Supabase Dashboard > Table Editor'da `customers` tablosuna bak
- Environment variables'ları kontrol et

### "Failed to fetch" hatası
- Supabase URL'inin doğru olduğundan emin ol
- `.env` dosyasını kaydettiğinden emin ol
- Uygulamayı yeniden başlat

### Hala localStorage kullanıyor
- `.env` dosyasını kontrol et
- Uygulamayı tamamen kapat ve yeniden başlat
- Browser cache'ini temizle

## 📞 Yardım

Detaylı bilgi için `SUPABASE_SETUP.md` dosyasına bak.

