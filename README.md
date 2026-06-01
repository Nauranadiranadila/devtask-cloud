# DevTask Cloud — Full-Stack Task Manager

![CI/CD Pipeline](https://github.com/USERNAME/devtask-cloud/actions/workflows/deploy.yml/badge.svg)

DevTask Cloud adalah aplikasi **full-stack task manager** sederhana untuk memenuhi Final Project **Cloud Full-Stack Deployment**. Project ini mencakup backend API, frontend web, database PostgreSQL, CI/CD pipeline, security measure, monitoring, dan strategi scaling.

> Ganti `USERNAME`, link repository, link pipeline, dan link aplikasi sesuai akun GitHub/Render kamu sebelum submit ke LMS.

---

## 1. Tech Stack

| Layer | Teknologi |
|---|---|
| Frontend | React + Vite |
| Backend | Node.js + Express |
| Database | PostgreSQL |
| ORM | Prisma |
| CI/CD | GitHub Actions |
| Cloud Deployment | Render Web Service + Render Static Site |
| Monitoring | Render Logs + Render Metrics |
| Security | Environment variables, Helmet, CORS whitelist, rate limit |

---

## 2. Fitur Aplikasi

- Membuat task baru.
- Melihat daftar task.
- Mengubah status task: `todo`, `in_progress`, `done`.
- Menghapus task.
- Filter task berdasarkan status.
- Health check API di `/api/health`.
- Logging request backend menggunakan Morgan.
- Validasi input backend menggunakan Zod.

---

## 3. Arsitektur Singkat

```txt
User Browser
    |
    v
React Frontend / Render Static Site
    |
    v
Express REST API / Render Web Service
    |
    v
PostgreSQL / Render PostgreSQL
```

---

## 4. Struktur Folder

```txt
devtask-cloud/
├─ backend/
│  ├─ prisma/
│  │  ├─ migrations/
│  │  └─ schema.prisma
│  ├─ src/
│  │  ├─ app.js
│  │  ├─ db.js
│  │  └─ routes/
│  ├─ tests/
│  ├─ server.js
│  ├─ package.json
│  └─ .env.example
├─ frontend/
│  ├─ src/
│  ├─ tests/
│  ├─ package.json
│  └─ .env.example
├─ .github/workflows/deploy.yml
├─ docs/SUBMISSION_TEMPLATE.md
├─ screenshots/.gitkeep
├─ docker-compose.yml
└─ render.yaml
```

---

## 5. Cara Menjalankan di Local

### 5.1 Clone Repository

```bash
git clone https://github.com/USERNAME/devtask-cloud.git
cd devtask-cloud
```

### 5.2 Jalankan PostgreSQL Local

```bash
docker compose up -d
```

### 5.3 Setup Backend

```bash
cd backend
cp .env.example .env
npm install
npx prisma generate
npx prisma migrate deploy
npm run dev
```

Backend berjalan di:

```txt
http://localhost:4000/api/health
```

### 5.4 Setup Frontend

Buka terminal baru:

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

Frontend berjalan di:

```txt
http://localhost:5173
```

---

## 6. Testing

### Backend

```bash
cd backend
npm test
```

### Frontend

```bash
cd frontend
npm test
npm run build
```

---

## 7. CI/CD Pipeline

Pipeline berada di:

```txt
.github/workflows/deploy.yml
```

Pipeline akan menjalankan:

1. Install dependencies backend.
2. Generate Prisma client.
3. Jalankan migration ke PostgreSQL service di GitHub Actions.
4. Test backend.
5. Install dependencies frontend.
6. Test frontend.
7. Build frontend.
8. Trigger Render Deploy Hook jika secret `RENDER_DEPLOY_HOOK_URL` sudah diatur.

Link pipeline:

```txt
https://github.com/USERNAME/devtask-cloud/actions
```

---

## 8. Deployment ke Render

### 8.1 Buat PostgreSQL Database

1. Login ke Render.
2. Buat PostgreSQL database baru.
3. Copy `Internal Database URL` atau connection string yang disediakan Render.

### 8.2 Deploy Backend API

Buat **Web Service** dari repository GitHub.

Pengaturan backend:

| Field | Value |
|---|---|
| Root Directory | `backend` |
| Build Command | `npm install && npx prisma generate && npx prisma migrate deploy` |
| Start Command | `npm start` |
| Health Check Path | `/api/health` |

Environment variables:

```txt
NODE_ENV=production
DATABASE_URL=<Render PostgreSQL connection string>
CORS_ORIGIN=<URL frontend Render>
```

Contoh URL backend:

```txt
https://devtask-cloud-api.onrender.com
```

Health check:

```txt
https://devtask-cloud-api.onrender.com/api/health
```

### 8.3 Deploy Frontend

Buat **Static Site** dari repository GitHub.

Pengaturan frontend:

| Field | Value |
|---|---|
| Root Directory | `frontend` |
| Build Command | `npm install && npm run build` |
| Publish Directory | `dist` |

Environment variable frontend:

```txt
VITE_API_BASE_URL=https://devtask-cloud-api.onrender.com/api
```

Contoh URL frontend:

```txt
https://devtask-cloud.onrender.com
```

---

## 9. Security Measure

Security yang diterapkan:

1. Secret tidak ditulis langsung di source code.
2. Database URL disimpan di environment variable.
3. Backend menggunakan `helmet` untuk HTTP security headers.
4. Backend menggunakan `express-rate-limit` untuk membatasi request berlebihan.
5. Backend menggunakan CORS whitelist melalui variable `CORS_ORIGIN`.
6. Input divalidasi menggunakan `zod`.

---

## 10. Monitoring

Monitoring menggunakan:

- Render Logs untuk melihat request log dan error log.
- Render Metrics untuk melihat penggunaan resource service seperti CPU dan memory.

Screenshot monitoring disimpan pada:

```txt
screenshots/monitoring-dashboard.png
```

---

## 11. Scaling Strategy

Strategi scaling yang digunakan:

### Manual Scaling

Untuk kebutuhan awal, aplikasi dapat dinaikkan resource-nya melalui Render Dashboard dengan menaikkan instance/service plan.

### Horizontal Scaling

Jika traffic meningkat, backend API dapat diskalakan dengan menambah instance. Karena state aplikasi disimpan di PostgreSQL, service backend tetap stateless dan lebih mudah diskalakan.

### Database Scaling

Database dapat ditingkatkan dengan:
- menaikkan kapasitas database,
- menggunakan connection pooling,
- optimasi query dan index.

---

## 12. Link Final Pengumpulan

| Item | Link |
|---|---|
| Repository GitHub | `https://github.com/USERNAME/devtask-cloud` |
| Pipeline CI/CD | `https://github.com/USERNAME/devtask-cloud/actions` |
| Aplikasi Live | `https://devtask-cloud.onrender.com` |
| Backend Health Check | `https://devtask-cloud-api.onrender.com/api/health` |
| Monitoring Screenshot | Upload screenshot Render Logs/Metrics ke LMS |

---

## 13. Status Checklist Final Project

| Kriteria | Status |
|---|---|
| Source code tersedia di GitHub | ✅ |
| CI/CD pipeline tersedia | ✅ |
| Build dan test otomatis | ✅ |
| Deploy ke cloud | ✅ |
| Security measure | ✅ |
| Monitoring/logging | ✅ |
| Scaling strategy | ✅ |
| Dokumentasi README | ✅ |
