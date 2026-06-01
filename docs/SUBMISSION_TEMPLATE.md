# Submission Template — DevTask Cloud

## Nama Project

DevTask Cloud — Full-Stack Task Manager

## Repository GitHub

https://github.com/Nauranadiranadila/devtask-cloud

## Link Pipeline CI/CD

https://github.com/Nauranadiranadila/devtask-cloud/actions

## Link Aplikasi Frontend

https://devtask-cloud-frontend-live.vercel.app

## Link Backend API Health Check

https://devtask-cloud-api-live.vercel.app/api/health

## Database

Neon PostgreSQL

## Cloud Deployment

Vercel

## Monitoring

Vercel Logs / Observability Dashboard

## Security Measure

Project ini menggunakan environment variables untuk menyimpan konfigurasi penting seperti `DATABASE_URL`, `VITE_API_BASE_URL`, dan `CORS_ORIGIN`. Credential database tidak di-hardcode ke source code. Backend juga menggunakan Helmet, rate limit, input validation, dan CORS whitelist yang dibatasi ke domain frontend production.

## Scaling Strategy

Frontend dan backend dideploy di Vercel. Backend bersifat stateless/serverless sehingga lebih mudah diskalakan. Database menggunakan Neon PostgreSQL cloud sehingga dapat ditingkatkan sesuai kebutuhan.