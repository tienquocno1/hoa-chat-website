# 🧪 Website Hóa Chất Việt Thịnh

Website giới thiệu và bán hóa chất công nghiệp xây dựng bằng **Next.js 14 + Sanity CMS**.

## ⚡ Bước 1 — Cài Node.js (bắt buộc)

Máy của bạn chưa có Node.js. Hãy cài đặt:

1. Truy cập: https://nodejs.org/en/download
2. Tải bản **LTS (v20.x)** → chọn Windows Installer (.msi)
3. Cài đặt, **tick vào "Add to PATH"**
4. Mở PowerShell mới, kiểm tra: `node --version`

---

## ⚙️ Bước 2 — Tạo Sanity Project (miễn phí)

1. Truy cập: https://sanity.io → Sign up (dùng Google được)
2. Tạo project mới → đặt tên "hoa-chat-viet-thinh"
3. Dataset: production
4. Vào Project Settings → copy Project ID

---

## 🔑 Bước 3 — Cấu hình Environment Variables

1. Copy file `.env.local.example` thành `.env.local`
2. Điền thông tin Sanity vào:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=abc123xyz
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_TOKEN=your-token
```

Tạo API Token: Sanity Dashboard → API → Tokens → Add token (quyền Editor)

---

## 📦 Bước 4 — Cài và chạy

```powershell
cd C:\Users\Admin\.gemini\antigravity-ide\scratch\hoa-chat-website
npm install
npm run dev
```

- Website: http://localhost:3000
- Admin Studio: http://localhost:3000/studio

---

## ✏️ Cập nhật thông tin công ty

Chỉnh sửa `lib/types.ts` → tìm `SITE_CONFIG` → cập nhật phone, zalo, messenger, address.
