# Admin Dashboard

Modern bir kullanıcı yönetim admin dashboard'u.

## Özellikler

- ✅ Güvenli giriş sistemi
- ✅ Müşteri ekleme
- ✅ Müşteri silme
- ✅ Müşteri listesi görüntüleme
- ✅ Finansal Dashboard (günlük, aylık, 3 aylık satış)
- ✅ Modern ve responsive tasarım
- ✅ Supabase entegrasyonu (çoklu cihaz desteği)
- ✅ LocalStorage fallback (Supabase olmadan da çalışır)

## Giriş Bilgileri

- **E-posta:** admin@kampus.com
- **Şifre:** Kampus345

## Müşteri Alanları

- İsim (zorunlu)
- Soyisim (zorunlu)
- Telefon (zorunlu)
- E-posta (zorunlu)
- Aldığı Kamp (zorunlu)
- Ödenen Tutar (zorunlu)
- Önceki Sınav Derecesi (opsiyonel)
- Promosyon Kodu (opsiyonel)

## Kurulum

```bash
npm install
```

## Geliştirme

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Vercel Deployment

1. GitHub repository'yi Vercel'e bağlayın
2. Vercel dashboard'da Environment Variables ekleyin (gerekirse):
   - `VITE_DATABASE_URL` (opsiyonel, gelecekte database entegrasyonu için)

## Çoklu Cihaz Desteği (Supabase)

Farklı cihazlardan müşteri eklediğinizde görebilmek için Supabase entegrasyonu yapılmıştır.

### Hızlı Kurulum

1. [Supabase](https://supabase.com) hesabı oluşturun
2. Yeni proje oluşturun
3. `SUPABASE_SETUP.md` dosyasındaki SQL'i çalıştırın
4. `.env` dosyası oluşturun:
   ```
   VITE_SUPABASE_URL=https://xxxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=your_anon_key_here
   ```
5. Vercel'de de aynı environment variables'ları ekleyin

Detaylı kurulum için `SUPABASE_SETUP.md` dosyasına bakın.

### Not

Eğer Supabase kurulumu yapmazsanız, uygulama otomatik olarak localStorage kullanır. Ancak bu durumda veriler sadece o cihazda görünür.

