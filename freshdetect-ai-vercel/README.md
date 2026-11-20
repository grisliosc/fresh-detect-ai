# FreshDetect AI — Web Prototype

Prototype interaktif berdasarkan alur UI pada gambar:
1. Animated splash screen
2. Login / daftar
3. Dashboard inventori UMKM
4. Scan bahan pangan
5. Hasil analisis kesegaran
6. Rekomendasi resep
7. Konsultasi gratis dengan admin

## Menjalankan secara lokal
Pastikan Node.js 18+ sudah terpasang.

```bash
npm install
npm run dev
```

Buka alamat lokal yang ditampilkan Vite.

## Deploy ke Vercel
**Cara paling mudah**
1. Ekstrak ZIP ini.
2. Upload folder project ke repository GitHub.
3. Buka https://vercel.com/new lalu import repository tersebut.
4. Framework Preset: **Vite**.
5. Build Command: `npm run build`.
6. Output Directory: `dist`.
7. Klik **Deploy**.

Tidak membutuhkan Environment Variables untuk demo ini.

## Catatan penting
Ini adalah prototype front-end. Login, pemindaian AI, dan chat admin masih berupa simulasi di browser; belum terhubung ke database, layanan AI vision, atau admin sungguhan. Jangan gunakan hasil skor demo sebagai penilaian keamanan pangan. Untuk produksi, hubungkan autentikasi, backend, penyimpanan data, model AI tervalidasi, dan layanan chat/admin.
