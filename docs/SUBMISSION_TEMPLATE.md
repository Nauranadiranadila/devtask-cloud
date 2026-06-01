# Template Pengumpulan LMS

Nama Project:
DevTask Cloud — Full-Stack Task Manager

Repository GitHub:
https://github.com/USERNAME/devtask-cloud

Link Pipeline CI/CD:
https://github.com/USERNAME/devtask-cloud/actions

Link Aplikasi Live:
https://devtask-cloud.onrender.com

Link Backend API Health Check:
https://devtask-cloud-api.onrender.com/api/health

Security Measure:
- Secret menggunakan environment variable.
- DATABASE_URL tidak di-hardcode.
- Backend memakai Helmet, CORS whitelist, dan rate limiting.
- Input API divalidasi dengan Zod.

Monitoring:
- Render Logs.
- Render Metrics.
- Screenshot dashboard monitoring dilampirkan di LMS.

Scaling Strategy:
- Manual scaling melalui Render Dashboard.
- Backend stateless sehingga siap horizontal scaling.
- Database dapat dinaikkan kapasitasnya dan dapat memakai connection pooling jika traffic meningkat.
