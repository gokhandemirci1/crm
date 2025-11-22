# Admin Dashboard

Modern bir kullanıcı yönetim admin dashboard'u.

## Özellikler

- ✅ Güvenli giriş sistemi
- ✅ Kullanıcı ekleme
- ✅ Kullanıcı silme
- ✅ Kullanıcı listesi görüntüleme
- ✅ Modern ve responsive tasarım
- ✅ LocalStorage ile veri saklama

## Giriş Bilgileri

- **E-posta:** admin@kampus.com
- **Şifre:** Kampus345

## Kullanıcı Alanları

- İsim (zorunlu)
- Soyisim (zorunlu)
- Telefon (zorunlu)
- TC Kimlik No (zorunlu, 11 haneli)
- E-posta (zorunlu)
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

## Database URL

Database entegrasyonu için `.env` dosyası oluşturun veya Vercel'de environment variable olarak ekleyin:

```
VITE_DATABASE_URL=your_database_url_here
```

Şu an uygulama localStorage kullanmaktadır. Database entegrasyonu için Supabase, Firebase veya başka bir servis kullanabilirsiniz.

