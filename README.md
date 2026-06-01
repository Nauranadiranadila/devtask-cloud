# DevTask Cloud — Full-Stack Task Manager

![CI/CD Pipeline](https://github.com/Nauranadiranadila/devtask-cloud/actions/workflows/deploy.yml/badge.svg)

DevTask Cloud adalah aplikasi **full-stack task manager** sederhana untuk memenuhi Final Project **Cloud Full-Stack Deployment**. Project ini mencakup backend API, frontend web, database PostgreSQL, CI/CD pipeline, security measure, monitoring, dan strategi scaling.

## 1. Informasi Project

| Komponen | Teknologi |
|---|---|
| Frontend | React + Vite |
| Backend | Node.js + Express |
| Database | Neon PostgreSQL |
| ORM | Prisma |
| CI/CD | GitHub Actions |
| Deployment | Vercel |
| Security | Environment variables, Helmet, CORS whitelist, rate limit, input validation |
| Monitoring | Vercel Logs / Observability |

## 2. Link Final Project

| Kebutuhan | Link |
|---|---|
| Repository GitHub | https://github.com/Nauranadiranadila/devtask-cloud |
| Pipeline CI/CD | https://github.com/Nauranadiranadila/devtask-cloud/actions |
| Frontend Live App | https://devtask-cloud-frontend-live.vercel.app |
| Backend API Health Check | https://devtask-cloud-api-live.vercel.app/api/health |

## 3. Cara Clone Project

```bash
git clone https://github.com/Nauranadiranadila/devtask-cloud.git
cd devtask-cloud
```

## 4. Backend Setup

```bash
cd backend
npm install
npx prisma generate
npx prisma migrate deploy
npm start
```

Environment variable backend:

```env
NODE_ENV=production
DATABASE_URL=<Neon PostgreSQL connection string>
CORS_ORIGIN=https://devtask-cloud-frontend-live.vercel.app
```

## 5. Frontend Setup

```bash
cd frontend
npm install
npm run build
npm run preview
```

Environment variable frontend:

```env
VITE_API_BASE_URL=https://devtask-cloud-api-live.vercel.app/api
```

## 6. CI/CD Pipeline

Project ini menggunakan **GitHub Actions** untuk menjalankan pipeline otomatis setiap kali ada push ke branch `main`.

Pipeline menjalankan proses:

1. Install dependency backend dan frontend.
2. Generate Prisma Client.
3. Menjalankan test backend.
4. Menjalankan test frontend.
5. Memvalidasi project sebelum deployment.

Link CI/CD:

```txt
https://github.com/Nauranadiranadila/devtask-cloud/actions
```

## 7. Database

Database menggunakan **Neon PostgreSQL** sebagai cloud database.

Prisma migration dijalankan melalui command:

```bash
npx prisma migrate deploy
```

Database credential tidak ditulis langsung di source code, tetapi disimpan melalui environment variable:

```env
DATABASE_URL=<Neon PostgreSQL connection string>
```

## 8. Deployment

Project dideploy menggunakan **Vercel**.

Backend API:

```txt
https://devtask-cloud-api-live.vercel.app/api/health
```

Frontend App:

```txt
https://devtask-cloud-frontend-live.vercel.app
```

## 9. Security Measure

Security yang diterapkan:

1. `DATABASE_URL` disimpan di environment variable, bukan di-hardcode.
2. Frontend menggunakan `VITE_API_BASE_URL` dari environment variable.
3. Backend menggunakan `helmet` untuk HTTP security headers.
4. Backend menggunakan rate limit untuk membatasi request berlebihan.
5. Backend menggunakan input validation.
6. Backend menggunakan CORS whitelist melalui variable `CORS_ORIGIN`.
7. `CORS_ORIGIN` sudah dibatasi ke domain frontend production:

```env
CORS_ORIGIN=https://devtask-cloud-frontend-live.vercel.app
```

## 10. Monitoring

Monitoring dilakukan melalui fitur Vercel:

1. Deployment logs.
2. Runtime logs.
3. Observability dashboard.
4. Error rate.
5. Edge requests.
6. Function invocations.

## 11. Scaling Strategy

Strategi scaling yang digunakan:

### Frontend Scaling

Frontend dideploy di Vercel sehingga dapat disajikan melalui global edge network.

### Backend Scaling

Backend bersifat stateless dan dideploy di Vercel sehingga lebih mudah diskalakan secara horizontal melalui serverless/function-based deployment.

### Database Scaling

Database menggunakan Neon PostgreSQL cloud yang mendukung cloud database management dan dapat ditingkatkan sesuai kebutuhan.

### Configuration Scaling

Credential dan konfigurasi penting dipisahkan melalui environment variables sehingga lebih aman dan mudah dipindahkan antar environment.

## 12. Final Checklist

| Requirement | Status |
|---|---|
| Repository GitHub | ✅ |
| CI/CD Pipeline | ✅ |
| Backend API deployed | ✅ |
| Frontend deployed | ✅ |
| PostgreSQL cloud database | ✅ |
| Security measure | ✅ |
| Monitoring/logging | ✅ |
| Scaling strategy | ✅ |
| CRUD task test | ✅ |

## 13. Link Pengumpulan

Nama Project:

```txt
DevTask Cloud — Full-Stack Task Manager
```

Repository GitHub:

```txt
https://github.com/Nauranadiranadila/devtask-cloud
```

Pipeline CI/CD:

```txt
https://github.com/Nauranadiranadila/devtask-cloud/actions
```

Frontend Live App:

```txt
https://devtask-cloud-frontend-live.vercel.app
```

Backend API:

```txt
https://devtask-cloud-api-live.vercel.app/api/health
```

Database:

```txt
Neon PostgreSQL
```

Cloud Deployment:

```txt
Vercel
```

Monitoring:

```txt
Vercel Logs / Observability Dashboard
```