# 🌐 Website PML PKL 65 STIS



**Website Manajemen Petugas Monitoring Lapangan (PML)** untuk Program Praktik Kerja Lapangan (PKL) Angkatan 65 STIS - Terintegrasi dengan ODK Central untuk survey karakteristik rumah tangga.

[![Next.js](https://img.shields.io/badge/Next.js-16.0-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## 📋 Daftar Isi

- [Tentang Project](#-tentang-project)
- [Fitur Utama](#-fitur-utama)
- [Tech Stack](#-tech-stack)
- [Quick Start](#-quick-start)
- [Dokumentasi](#-dokumentasi)
- [Struktur Project](#-struktur-project)
- [Screenshots](#-screenshots)
- [Kontribusi](#-kontribusi)
- [Tim](#-tim)
- [Lisensi](#-lisensi)

---

## 📖 Tentang Project

Website PML PKL 65 STIS adalah platform manajemen untuk monitoring dan tracking progress petugas lapangan dalam survey karakteristik rumah tangga. Platform ini terintegrasi dengan **ODK Central** untuk pengumpulan data survey secara real-time.

### Latar Belakang

Program PKL 65 STIS memerlukan sistem yang efisien untuk:
- ✅ Monitoring progress petugas lapangan secara real-time
- ✅ Tracking submission data survey
- ✅ Manajemen status approval data
- ✅ Visualisasi statistik dan analytics
- ✅ Koordinasi tim di berbagai wilayah

### Tujuan

1. Mempermudah koordinator dalam monitoring progress tim
2. Meningkatkan efisiensi approval dan review data submission
3. Memberikan visibility real-time terhadap performa individu dan tim
4. Menyediakan analytics untuk pengambilan keputusan

---

## ✨ Fitur Utama

### 🔐 Authentication
- Login terintegrasi dengan ODK Central
- Session management dengan secure cookies
- Auto-redirect untuk protected routes

### 📊 Dashboard
- **Statistics Overview**: Total submission, approved, modified, problematic, rejected
- **Recent Submissions Table**: 10 submission terbaru dengan quick action
- **Real-time Updates**: Auto-refresh data setiap interval
- **Quick Status Change**: Update status langsung dari dashboard

### 📋 Submission Management
- **Advanced Filtering**: Filter by status, submitter, wilayah
- **Full Data Table**: Semua submission dengan pagination
- **Bulk Actions**: Export to Excel/CSV
- **Status Management**: Approve, reject, mark as problematic
- **Detailed View**: Lihat detail lengkap submission

### 👥 Data Team
- **Team Cards**: Informasi detail setiap field officer
  - NIM dan nama
  - Total data sent & approved
  - Approval rate (color-coded)
  - Location & online status
- **Live Location Tracking**: Map view untuk tracking lokasi real-time
- **Performance Metrics**: Approval rate, productivity stats

### 🎨 Design System
- **Theme**: Orange & cream color palette (PKL 65 branding)
- **Responsive**: Mobile-first design
- **Accessible**: WCAG 2.1 compliant
- **Modern UI**: Clean, intuitive interface

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

### Backend
- **API Routes**: Next.js API Routes
- **Data Source**: [ODK Central](https://docs.getodk.org/central-intro/)
- **Authentication**: ODK Central Session Token

### Development Tools
- **Package Manager**: npm
- **Linting**: ESLint
- **Formatting**: Prettier (optional)
- **Version Control**: Git & GitHub

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ dan npm
- Git
- Akses ke ODK Central server

### Installation

```bash
# 1. Clone repository
git clone https://github.com/USERNAME/REPO-NAME.git
cd REPO-NAME

# 2. Install dependencies
npm install --legacy-peer-deps

# 3. Setup environment variables
cp .env.example .env.local
# Edit .env.local dengan kredensial yang benar

# 4. Run development server
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

### Environment Variables

Buat file `.env.local` di root project:

```env
# ODK Central Configuration
NEXT_PUBLIC_ODK_BASE_URL=https://ws.pkl65.my.id
NEXT_PUBLIC_ODK_PROJECT_ID=1
NEXT_PUBLIC_ODK_FORM_ID=shelter_material_survey

# Credentials
ODK_EMAIL=admin@example.com
ODK_PASSWORD=your_password
```

> ⚠️ **PENTING**: Jangan commit file `.env.local` ke Git!

---

## 📚 Dokumentasi

- **[Setup Guide](./SETUP_GUIDE.md)** - Panduan lengkap setup untuk tim
- **[Contributing Guidelines](./CONTRIBUTING.md)** - Cara berkontribusi
- **[API Documentation](./docs/API.md)** - API endpoints reference
- **[Deployment Guide](./docs/DEPLOYMENT.md)** - Deploy ke production

### External Documentation
- [ODK Central API](https://docs.getodk.org/central-api/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

---

## 📁 Struktur Project

```
v0-field-worker-website/
├── app/                          # Next.js App Router
│   ├── api/                      # API Routes
│   │   ├── auth/                 # Authentication
│   │   │   └── login/
│   │   ├── submissions/          # Submissions API
│   │   └── team/                 # Team data API
│   ├── dashboard/                # Dashboard pages
│   │   ├── page.tsx              # Main dashboard
│   │   ├── submission/           # Submission management
│   │   └── team/                 # Team page
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Login page
│   └── globals.css               # Global styles
├── components/                   # React components
│   ├── ui/                       # shadcn/ui components
│   ├── LoginForm.tsx             # Login form component
│   ├── Sidebar.tsx               # Navigation sidebar
│   └── ...                       # Other components
├── lib/                          # Utility functions
│   ├── odk-api.ts               # ODK Central API utils
│   ├── odk-client.ts            # ODK Client singleton
│   └── utils.ts                 # Helper functions
├── public/                       # Static assets
│   └── images/                   # Images & icons
├── docs/                         # Documentation
├── .env.local                    # Environment variables (gitignored)
├── .env.example                  # Example env file
├── .gitignore                    # Git ignore rules
├── next.config.mjs              # Next.js config
├── package.json                 # Dependencies
├── tailwind.config.ts           # Tailwind config
├── tsconfig.json                # TypeScript config
├── SETUP_GUIDE.md               # Setup guide
├── CONTRIBUTING.md              # Contributing guide
└── README.md                    # This file
```

---

## 📸 Screenshots

### Login Page
![Login Page](docs/screenshots/login.png)

### Dashboard
![Dashboard](docs/screenshots/dashboard.png)

### Submission Management
![Submission Page](docs/screenshots/submission.png)

### Team Data
![Team Page](docs/screenshots/team.png)

> 📝 **Note**: Tambahkan screenshot actual setelah UI final

---

## 🤝 Kontribusi

Kami sangat terbuka untuk kontribusi! Silakan baca [Contributing Guidelines](./CONTRIBUTING.md) untuk detail lebih lanjut.

### Quick Contribution Guide

1. **Fork** repository ini
2. **Clone** fork Anda
3. **Create branch**: `git checkout -b feature/amazing-feature`
4. **Commit**: `git commit -m 'feat: add amazing feature'`
5. **Push**: `git push origin feature/amazing-feature`
6. **Open Pull Request**

### Development Workflow

```bash
# Update dari upstream
git checkout dev
git pull origin dev

# Buat feature branch
git checkout -b feature/nama-fitur

# Develop & test
npm run dev

# Commit & push
git add .
git commit -m "feat: deskripsi"
git push origin feature/nama-fitur

# Buat Pull Request di GitHub
```

---

## 👥 Tim

### Core Team

- **Project Lead** - [Nama] (@username)
- **Tech Lead** - [Nama] (@username)
- **Frontend Developer** - [Nama] (@username)
- **Backend Developer** - [Nama] (@username)
- **UI/UX Designer** - [Nama] (@username)
- **QA Engineer** - [Nama] (@username)

### Contributors

Lihat [CONTRIBUTORS.md](./CONTRIBUTORS.md) untuk daftar lengkap kontributor.

### Contact

- **Email**: pkl65.stis@example.com
- **WhatsApp Group**: [Link]
- **Telegram Group**: [Link]
- **GitHub Issues**: [Project Issues](https://github.com/USERNAME/REPO-NAME/issues)

---

## 📊 Project Status

### Current Version: v1.0.0

### Roadmap

#### Phase 1: Core Features ✅ (Selesai)
- [x] Authentication & Authorization
- [x] Dashboard with statistics
- [x] Submission management
- [x] Team data & aggregation
- [x] ODK Central integration

#### Phase 2: Enhanced Features 🔄 (In Progress)
- [ ] Export to Excel/CSV
- [ ] Live location tracking map
- [ ] Advanced filtering & search
- [ ] Dashboard analytics charts
- [ ] Notification system

#### Phase 3: Advanced Features 📋 (Planned)
- [ ] Role-based access control
- [ ] Offline mode support
- [ ] Mobile app (React Native)
- [ ] Automated reports
- [ ] Performance optimization

---

## 🐛 Known Issues

Lihat [GitHub Issues](https://github.com/USERNAME/REPO-NAME/issues) untuk bug reports dan feature requests.

### Critical
- None

### Major
- [ ] Performance optimization untuk large datasets (1000+ submissions)

### Minor
- [ ] Improve error messages
- [ ] Add loading skeletons

---

## 📝 Changelog

### [1.0.0] - 2025-11-10

#### Added
- Initial release
- Authentication with ODK Central
- Dashboard with statistics
- Submission management page
- Team data page
- Real-time data fetching
- Status management

#### Changed
- N/A

#### Fixed
- N/A

Lihat [CHANGELOG.md](./CHANGELOG.md) untuk history lengkap.

---

## 🔒 Security

Jika menemukan security vulnerability, **JANGAN** buat public issue. Hubungi tim di:
- Email: security@pkl65stis.example.com
- DM ke Project Lead

---

## 📄 Lisensi

Project ini dilisensikan di bawah [MIT License](./LICENSE).

```
Copyright (c) 2025 PKL 65 STIS

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction...
```

---

## 🙏 Acknowledgments

- **STIS** - Sekolah Tinggi Ilmu Statistik
- **ODK** - Open Data Kit untuk platform survey
- **Vercel** - Deployment platform
- **v0.dev** - Initial UI scaffolding
- **shadcn/ui** - UI component library

---

## 📞 Support

Butuh bantuan? Hubungi kami:

- 📧 Email: support@pkl65stis.example.com
- 💬 Discussions: [GitHub Discussions](https://github.com/USERNAME/REPO-NAME/discussions)
- 🐛 Bug Reports: [GitHub Issues](https://github.com/USERNAME/REPO-NAME/issues)
- 📚 Documentation: [Wiki](https://github.com/USERNAME/REPO-NAME/wiki)

---

<div align="center">

**Made with ❤️ by PKL 65 STIS Team**

[Website](https://pml.pkl65stis.id) • [Documentation](./docs) • [Report Bug](https://github.com/USERNAME/REPO-NAME/issues) • [Request Feature](https://github.com/USERNAME/REPO-NAME/issues)

</div>
