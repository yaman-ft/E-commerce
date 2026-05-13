# 🏃 أوامر سريعة - Copy & Paste

## اختبار محلي (5 دقائق)

```bash
# 1. تثبيت Netlify CLI (مرة واحدة فقط)
npm install -g netlify-cli

# 2. شغّل التطبيق
netlify dev

# 3. افتح في المتصفح
# http://localhost:8888
```

## اختبار الـ API

```bash
# اختبر الـ API في terminal جديد

# 1. صحة الـ API
curl http://localhost:8888/api/health

# 2. جميع المنتجات
curl http://localhost:8888/api/products

# 3. التسجيل
curl -X POST http://localhost:8888/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "name":"Ahmed",
    "email":"ahmed@test.com",
    "password":"password123"
  }'

# 4. الدخول
curl -X POST http://localhost:8888/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email":"ahmed@test.com",
    "password":"password123"
  }'
```

## Git & GitHub

```bash
# 1. أضف جميع الملفات
git add .

# 2. اكتب رسالة
git commit -m "Convert to Netlify Functions"

# 3. ادفع إلى GitHub
git push origin main
```

## Netlify Deployment

```bash
# 1. سجّل الدخول (مرة واحدة)
netlify login

# 2. انشر من folder
netlify deploy --prod

# أو: من الواجهة
# https://app.netlify.com → New site from Git
```

## Environment Setup

```bash
# 1. عدّل .env
# أضف:
JWT_SECRET=your_secure_key_here

# 2. على Netlify Dashboard:
# Site settings → Environment → Add variable
# JWT_SECRET = value
# MONGODB_URI = value
```

## MongoDB Setup (Quick)

```bash
# 1. اذهب إلى:
# https://www.mongodb.com/cloud/atlas

# 2. أنشئ Cluster مجاني

# 3. احصل على Connection String:
# mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority

# 4. أضفه إلى .env:
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority
```

## Build & Production

```bash
# 1. بناء الفرونت
npm run build

# 2. تحقق من dist/ موجود
ls dist/

# 3. شغّل preview (بدون functions)
npm run serve

# 4. شغّل مع functions
netlify dev
```

## Troubleshooting

```bash
# 1. شغّل مع verbose logs
netlify dev --verbose

# 2. استخدم port مختلف
netlify dev --port 3000

# 3. نظّف cache
netlify cache:clean

# 4. تحقق من الحالة
netlify status

# 5. تحقق من الـ builds
netlify builds:list
```

## Read Documentation

```bash
# الملفات بالترتيب:
1. 00_START_HERE.md
2. QUICK_START.md
3. TESTING_GUIDE.md
4. NETLIFY_SETUP.md
5. MONGODB_SETUP.md
6. VERIFICATION_CHECKLIST.md
```

---

## معالجة المتغيرات البيئية

```javascript
// في الـ functions، استخدم:
process.env.JWT_SECRET;
process.env.MONGODB_URI;
process.env.NODE_ENV;
```

```bash
# محلياً: قراءة من .env
netlify dev

# على Netlify: قراءة من Environment variables
# Site settings → Environment
```

---

## أوامر Node.js مفيدة

```bash
# تحقق من الإصدارات
node --version
npm --version

# تثبيت dependencies
npm install

# تثبيت globally
npm install -g netlify-cli

# تحديث packages
npm update

# مسح cache
npm cache clean --force
```

---

## اختبارات سريعة

### المتصفح (افتح DevTools):

```javascript
// اختبر في Console:

// 1. احصل على المنتجات
fetch("/api/products")
  .then((r) => r.json())
  .then(console.log);

// 2. سجّل
fetch("/api/users/register", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    name: "أحمد",
    email: "ahmed@test.com",
    password: "password123",
  }),
})
  .then((r) => r.json())
  .then(console.log);
```

---

## Git Workflow سريع

```bash
# 1. تحقق من التغييرات
git status

# 2. أضف التغييرات
git add .

# 3. اكتب رسالة واضحة
git commit -m "feat: add MongoDB setup"

# 4. ادفع
git push

# 5. تحقق من Netlify build
# https://app.netlify.com
```

---

## Database Backup

```bash
# MongoDB:
# اذهب إلى: MongoDB Atlas Dashboard
# إضغط: Export
# حدّد: Collection
# انقر: Generate Export

# النتيجة: backup.archive.tar
```

---

## Domain Setup

```
# على Netlify:
1. Site settings → General
2. إضغط: Edit site name
3. أو: اربط domain مخصص
4. تابع التعليمات
```

---

## Analytics

```
# على Netlify:
1. Analytics
2. اعرض: Requests, CPU, etc.

# Firebase Analytics:
# اضف: firebase-analytics SDK
```

---

## Logs & Debugging

```bash
# اعرض logs محلياً
netlify dev

# اعرض production logs
netlify functions:log

# debugging مع VS Code
# اضفت breakpoints في الـ functions
```

---

## إزالة cache

```bash
# محلياً
rm -rf .netlify

# GitHub
git rm -r --cached node_modules

# npm
npm cache clean --force
```

---

## نسخ & الصق سريع

```bash
# الأمر الأساسي:
netlify dev --port 8888

# Build & Deploy:
npm run build && netlify deploy --prod

# مسح و إعادة:
npm install && npm run build && netlify dev
```

---

## استدعاء Function من الـ Frontend

```javascript
// قديم ❌
fetch("http://localhost:5000/api/products");

// جديد ✅
fetch("/api/products");

// محلي: http://localhost:8888/api/products
// أونلاين: https://yoursite.netlify.app/api/products
```

---

## Variables على Netlify Dashboard

```
Site settings → Environment variables

Add:
- JWT_SECRET: uP8@kL2$mN9!xQ4*vR7&wT3%jY6#hZ1
- MONGODB_URI: mongodb+srv://...
```

---

**جاهز؟ ابدأ بـ:**

```bash
netlify dev
```

ثم افتح `00_START_HERE.md` 🚀
