# Deployment Rehberi

## Vercel Deployment

### 1. GitHub Repository'yi Vercel'e Bağlama

1. [Vercel](https://vercel.com) hesabınıza giriş yapın
2. "New Project" butonuna tıklayın
3. GitHub repository'nizi seçin: `gokhandemirci1/crm`
4. Vercel otomatik olarak projeyi algılayacaktır (Vite + React)

### 2. Build Ayarları

Vercel otomatik olarak şu ayarları algılar:
- **Framework Preset:** Vite
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

### 3. Environment Variables (Opsiyonel)

Eğer gelecekte database entegrasyonu yapmak isterseniz:

1. Vercel Dashboard'da projenize gidin
2. **Settings** > **Environment Variables** bölümüne gidin
3. Şu değişkeni ekleyin:
   - **Name:** `VITE_DATABASE_URL`
   - **Value:** Database URL'iniz (örn: Supabase, Firebase, vb.)

### 4. Deploy

1. "Deploy" butonuna tıklayın
2. Vercel otomatik olarak build alacak ve deploy edecek
3. Deployment tamamlandıktan sonra size bir URL verecek

## Database URL Örnekleri

### Supabase
```
VITE_DATABASE_URL=https://your-project.supabase.co
```

### Firebase
```
VITE_DATABASE_URL=https://your-project.firebaseio.com
```

### Custom API
```
VITE_DATABASE_URL=https://api.yourdomain.com
```

## Notlar

- Şu an uygulama **localStorage** kullanmaktadır
- Database entegrasyonu için backend API'ye ihtiyaç vardır
- Environment variables Vercel'de Production, Preview ve Development için ayrı ayrı ayarlanabilir

## GitHub Repository

Proje şu adreste: https://github.com/gokhandemirci1/crm

