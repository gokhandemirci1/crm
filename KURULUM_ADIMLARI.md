# 🚀 Supabase Kurulum Adımları

Supabase bilgileriniz hazır! Şimdi şu adımları takip edin:

## ✅ 1. Supabase Database Tablosunu Oluştur

1. https://supabase.com/dashboard adresine gidin
2. Projenize girin (dtovestdhtexojfnhglt)
3. Sol menüden **SQL Editor**'a tıklayın
4. **New query** butonuna tıklayın
5. `SUPABASE_SQL.sql` dosyasındaki tüm SQL kodunu kopyalayın
6. SQL Editor'a yapıştırın
7. **Run** butonuna tıklayın (veya Ctrl+Enter)
8. ✅ "Success" mesajını görmelisiniz

## ✅ 2. Yerel Geliştirme için .env Dosyası Oluştur

Proje klasöründe (main_admin klasöründe) `.env` dosyası oluşturun:

**Windows için:**
- Notepad veya herhangi bir editörle `.env` dosyası oluşturun
- İçine şunu yazın:

```env
VITE_SUPABASE_URL=https://dtovestdhtexojfnhglt.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR0b3Zlc3RkaHRleG9qZm5oZ2x0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM4MjEwOTksImV4cCI6MjA3OTM5NzA5OX0.Ega7Tf6_lV6sVi9xh-A7Mp_EMJAWIV99JBFtmeo2VkY
```

**Önemli:** Dosya adı sadece `.env` olmalı (uzantı yok!)

## ✅ 3. Vercel için Environment Variables Ekle

1. https://vercel.com/dashboard adresine gidin
2. Projenizi seçin (crm)
3. **Settings** > **Environment Variables** bölümüne gidin
4. Şu iki değişkeni ekleyin:

   **Değişken 1:**
   - Name: `VITE_SUPABASE_URL`
   - Value: `https://dtovestdhtexojfnhglt.supabase.co`
   - Environment: Production, Preview, Development (hepsini seç)

   **Değişken 2:**
   - Name: `VITE_SUPABASE_ANON_KEY`
   - Value: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR0b3Zlc3RkaHRleG9qZm5oZ2x0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM4MjEwOTksImV4cCI6MjA3OTM5NzA5OX0.Ega7Tf6_lV6sVi9xh-A7Mp_EMJAWIV99JBFtmeo2VkY`
   - Environment: Production, Preview, Development (hepsini seç)

5. **Save** butonuna tıklayın
6. **Deployments** sekmesine gidin
7. Son deployment'ın yanındaki **⋯** menüsünden **Redeploy** seçin

## ✅ 4. Uygulamayı Test Et

1. Uygulamayı yeniden başlatın:
   ```bash
   npm run dev
   ```

2. Dashboard'a giriş yapın
3. Yeşil "✅ Supabase Aktif - Çoklu Cihaz Desteği" mesajını görmelisiniz
4. Eğer localStorage'da müşterileriniz varsa, "LocalStorage Verilerini Supabase'e Taşı" butonuna tıklayın
5. Bir müşteri ekleyin
6. Farklı bir cihazdan/tarayıcıdan giriş yapın
7. ✅ Eklediğiniz müşteriyi görebilmelisiniz!

## 🔍 Kontrol Listesi

- [ ] Supabase SQL'i çalıştırıldı
- [ ] `.env` dosyası oluşturuldu (yerel için)
- [ ] Vercel'de environment variables eklendi
- [ ] Vercel deployment yeniden yapıldı
- [ ] Uygulama test edildi
- [ ] Farklı cihazdan test edildi

## ❓ Sorun mu var?

### "Supabase Kurulumu Gerekli" mesajı görünüyor
- `.env` dosyasının doğru yerde olduğundan emin olun (proje kök dizininde)
- Uygulamayı tamamen kapatıp yeniden başlatın
- Browser cache'ini temizleyin

### Müşteriler görünmüyor
- Browser console'u açın (F12) ve hata var mı kontrol edin
- Supabase Dashboard > Table Editor'da `customers` tablosuna bakın
- SQL'in başarıyla çalıştırıldığından emin olun

### "Failed to fetch" hatası
- Supabase URL'inin doğru olduğundan emin olun
- Network sekmesinde request'leri kontrol edin
- Supabase Dashboard'da API ayarlarını kontrol edin

