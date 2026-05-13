## ✅ قائمة فحص التحويل إلى Netlify

استخدم هذه القائمة للتحقق من أن التحويل نجح:

### 📁 ملفات ومجلدات مطلوبة

- [ ] `netlify/functions/products.js` موجود
- [ ] `netlify/functions/users.js` موجود
- [ ] `netlify/functions/cart.js` موجود
- [ ] `netlify/functions/orders.js` موجود
- [ ] `netlify/functions/health.js` موجود
- [ ] `netlify/functions/utils.js` موجود
- [ ] `netlify/functions/db.js` موجود
- [ ] `netlify/functions/package.json` موجود
- [ ] `netlify.toml` موجود في الجذر
- [ ] `.env` موجود في الجذر (مع JWT_SECRET)
- [ ] `.env.example` موجود

### 🔧 تحديثات الكود

- [ ] `src/utils/api.js` يستخدم `const API_BASE = "/api"`
- [ ] `src/store/index.js` يستخدم `fetch("/api/cart", ...)`
- [ ] لا يوجد `localhost` أو `5000` في الكود الأمامي
- [ ] `package.json` في الجذر يحتوي على `"build": "vue-cli-service build"`

### 🚀 الاختبار المحلي

```bash
# اختبر البناء
npm run build
# النتيجة المتوقعة: مجلد dist/ منشأ بنجاح ✅

# تثبيت Netlify CLI
npm install -g netlify-cli

# شغّل التطبيق محلياً
netlify dev
# النتيجة المتوقعة: يعمل على http://localhost:8888 ✅

# اختبر الـ API
curl http://localhost:8888/api/health
# النتيجة المتوقعة: {"status":"ok","message":"API is running"} ✅
```

### 🔐 الأمان والمتغيرات

- [ ] `JWT_SECRET` موجود في `.env`
- [ ] `JWT_SECRET` قوي وليس مكتوب بشكل واضح
- [ ] `.gitignore` يحتوي على `.env`
- [ ] لا توجد مفاتيح سرية في الـ git history

### 🌐 الإعدادات على Netlify

عندما تنشر على Netlify:

- [ ] **Build command**: `npm run build` ✅
- [ ] **Publish directory**: `dist` ✅
- [ ] **Functions directory**: `netlify/functions` ✅
- [ ] متغيرات البيئة مضافة:
  - [ ] `JWT_SECRET` = قيمة قوية
  - [ ] `MONGODB_URI` = اتصال MongoDB (مهم!)

### 📊 اختبار الـ Endpoints

بعد `netlify dev`:

```bash
# صحة الـ API
curl http://localhost:8888/api/health
# ✅ يجب يعيد: {"status":"ok","message":"API is running"}

# جميع المنتجات
curl http://localhost:8888/api/products
# ✅ يجب يعيد: [] أو قائمة منتجات

# منتج محدد
curl http://localhost:8888/api/products/1
# ✅ يجب يعيد: منتج واحد أو 404

# التسجيل (اختبار POST)
curl -X POST http://localhost:8888/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","password":"123456"}'
# ✅ يجب يعيد: {user: {...}, token: "..."}

# الدخول
curl -X POST http://localhost:8888/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"123456"}'
# ✅ يجب يعيد: {user: {...}, token: "..."}

# السلة (يحتاج token)
TOKEN="your_token_here"
curl http://localhost:8888/api/cart \
  -H "Authorization: Bearer $TOKEN"
# ✅ يجب يعيد: {items: [], total: 0}
```

### 🐛 حل المشاكل

**❌ "Cannot find module"**

```bash
# تأكد من تثبيت dependencies
cd netlify/functions
npm install
```

**❌ "EADDRINUSE: address already in use"**

```bash
# الـ port 8888 مشغول، غيّره:
netlify dev --port 3000
```

**❌ "Database errors"**

- أنشئ MongoDB cluster
- أضف MONGODB_URI إلى .env و Netlify environment

**❌ "Unauthorized/401"**

- تأكد من أن Token يُمرر في Authorization header
- تحقق من أن JWT_SECRET موجود في .env

**❌ "CORS errors"**

- تأكد من أن `netlify.toml` يحتوي على CORS headers
- جرّب في private window لمسح cookies

### 📋 Checklist نهائي قبل النشر

- [ ] تشغيل `netlify dev` بدون أخطاء
- [ ] الـ endpoints تعمل محلياً
- [ ] البناء (`npm run build`) ينجح
- [ ] لا توجد console errors في المتصفح
- [ ] JWT_SECRET قوي (ليس "secret")
- [ ] MongoDB configured (اختياري لكن موصى به)
- [ ] جميع الملفات مدفوعة إلى GitHub
- [ ] الـ environment variables مضافة إلى Netlify

### ✨ نجح التحويل إذا:

✅ استطعت تشغيل `netlify dev` بدون أخطاء
✅ الـ endpoints ترد بشكل صحيح
✅ الواجهة الأمامية تحمل المنتجات
✅ التسجيل والدخول يعملان
✅ السلة والطلبات تعملان

### 🚀 النشر النهائي

```bash
# تأكد من كل شيء
netlify dev

# ادفع إلى GitHub
git add .
git commit -m "Ready for Netlify production"
git push

# على Netlify، ستُرى الـ site في:
https://your-site.netlify.app
```

---

إذا واجهت مشكلة:

1. راجع `NETLIFY_SETUP.md` للتفاصيل
2. تحقق من console في المتصفح للأخطاء
3. استخدم `netlify dev --verbose` للمزيد من المعلومات

جاهز؟ ابدأ بـ `netlify dev` وأخبرني بالنتائج! 🎉
