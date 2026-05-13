# تحويل المشروع إلى Netlify Functions

تم تحويل مشروعك بنجاح ليعمل على Netlify بدلاً من خادم Express تقليدي.

## البنية الجديدة

```
project-root/
├── netlify/
│   └── functions/
│       ├── products.js      # endpoints المنتجات
│       ├── users.js         # endpoints التسجيل والدخول
│       ├── cart.js          # endpoints السلة
│       ├── orders.js        # endpoints الطلبات
│       ├── health.js        # فحص حالة الـ API
│       ├── db.js            # إعداد قاعدة البيانات
│       ├── utils.js         # دوال مساعدة
│       └── package.json     # dependencies للدوال
├── netlify.toml             # إعدادات Netlify
├── src/                     # الواجهة الأمامية (Vue.js)
│   ├── utils/api.js         # ✅ محدث لاستخدام روابط نسبية
│   └── store/index.js       # ✅ محدث لاستخدام روابط نسبية
├── dist/                    # الكود المبني (ينشئ عند البناء)
└── backend/                 # الكود القديم (يمكن حذفه لاحقاً)
```

## ما تم تحديثه

### 1. ✅ `src/utils/api.js`

تم تغيير الرابط من:

```javascript
const API_BASE = "http://localhost:5000/api";
```

إلى:

```javascript
const API_BASE = "/api";
```

**الفائدة**: تعمل الروابط النسبية على localhost والإنترنت بنفس الطريقة.

### 2. ✅ `src/store/index.js`

تم تغيير الـ fetch من:

```javascript
const res = await fetch("http://localhost:5000/api/cart", ...);
```

إلى:

```javascript
const res = await fetch("/api/cart", ...);
```

### 3. ✅ `netlify.toml`

تم إضافة تكوين Netlify الذي يقوم بـ:

- توجيه جميع طلبات `/api/*` إلى Netlify Functions
- إعادة توجيه المسارات الديناميكية للـ SPA (Single Page Application)
- إضافة CORS headers

### 4. ✅ `netlify/functions/`

تم إنشاء دوال Netlify للـ endpoints:

- `products.js` - GET/POST/PUT/DELETE المنتجات
- `users.js` - التسجيل والدخول وملف المستخدم
- `cart.js` - إدارة السلة
- `orders.js` - إنشاء والحصول على الطلبات
- `health.js` - فحص صحة الـ API

## كيفية الاستخدام المحلي (Localhost)

### 1. تثبيت Dependencies

```bash
# على المستوى الرئيسي
npm install

# لـ backend (اختياري للتطوير المحلي)
cd backend
npm install
```

### 2. تشغيل مع Netlify Dev (الطريقة الموصى بها)

```bash
# تثبيت Netlify CLI إذا لم تكن مثبتة
npm install -g netlify-cli

# تشغيل المشروع محلياً (يحاكي بيئة Netlify)
netlify dev
```

سيتم تشغيل الموقع على `http://localhost:8888`

### 3. تشغيل الواجهة الأمامية فقط (بدون الـ backend)

إذا أردت تشغيل Vue فقط، استخدم:

```bash
npm run serve
```

ستظهر أخطاء في console لأن الـ functions لا تعمل، لكن الواجهة ستحمل.

## نشر على Netlify

### 1. تحضير المشروع

```bash
# تأكد من أن الـ build يعمل بنجاح
npm run build
```

يجب أن يُنتج مجلد `dist/` يحتوي على الكود المبني.

### 2. ربط مع GitHub و Netlify

1. اذهب إلى https://app.netlify.com
2. اختر "New site from Git"
3. اختر مستودع GitHub الخاص بك
4. تأكد من هذه الإعدادات:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Functions directory**: `netlify/functions`

### 3. متغيرات البيئة على Netlify

اذهب إلى **Site settings → Environment** وأضف:

```
JWT_SECRET = your_secure_secret_key_here
NODE_ENV = production
```

⚠️ **أهم متغير**: غير قيمة `JWT_SECRET` إلى شيء آمن وقوي!

### 4. قاعدة البيانات

⚠️ **ملاحظة مهمة**:

- Netlify Functions بدون ذاكرة دائمة (لا يمكن حفظ ملفات).
- `better-sqlite3` سيعمل في `/tmp` ولكن البيانات ستُفقد عند إعادة التشغيل.

**الحل الأمثل**: استخدم قاعدة بيانات سحابية:

- MongoDB Atlas (مجاني)
- Firebase Firestore
- Supabase (PostgreSQL)
- PlanetScale (MySQL)

### سريعاً: استخدم MongoDB

1. اذهب إلى https://www.mongodb.com/cloud/atlas
2. أنشئ مجموعة (Cluster) مجانية
3. احصل على اتصال string
4. غير `netlify/functions/db.js` لاستخدام MongoDB بدلاً من SQLite

## الخطوات التالية المهمة

### أولوية عالية:

- [ ] غير `JWT_SECRET` إلى شيء آمن جداً
- [ ] اختبر التطبيق محلياً مع `netlify dev`
- [ ] حول قاعدة البيانات إلى MongoDB أو خدمة سحابية أخرى
- [ ] أضف `.env` إلى `.gitignore` (لا تنشر المفاتيح السرية!)

### أولوية متوسطة:

- [ ] أضف معالجة أخطاء أفضل
- [ ] أضف logging للـ functions
- [ ] اختبر جميع الـ endpoints على Netlify
- [ ] حسّن أداء الدوال (بطء البدء البارد)

### أولوية منخفضة:

- [ ] احذف مجلد `backend` إذا لم تعد تستخدمه
- [ ] أضف اختبارات تلقائية
- [ ] حسّن سياسات CORS إذا لزم الأمر

## اختبار الـ Functions محلياً

بعد تشغيل `netlify dev`، اختبر الـ endpoints:

```bash
# اختبر صحة الـ API
curl http://localhost:8888/api/health

# احصل على جميع المنتجات
curl http://localhost:8888/api/products

# احصل على منتج محدد
curl http://localhost:8888/api/products/1

# التسجيل
curl -X POST http://localhost:8888/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Ali","email":"ali@example.com","password":"123456"}'
```

## حل المشاكل الشائعة

### ❌ "Functions not found"

**الحل**: تأكد من أن مجلد `netlify/functions` موجود والملفات داخله.

### ❌ "CORS error"

**الحل**: تحقق من أن `netlify.toml` موجود ويحتوي على CORS headers.

### ❌ "Cannot find module 'better-sqlite3'"

**الحل**: شغّل `npm install` في مجلد `netlify/functions`:

```bash
cd netlify/functions
npm install
```

### ❌ "Token expired or invalid"

**الحل**: تحقق من أن `JWT_SECRET` نفسه على Netlify وفي `.env`.

### ❌ "Database errors in production"

**الحل**: انتقل إلى MongoDB أو قاعدة بيانات سحابية (SQLite لا يعمل على Netlify).

## الأوامر المفيدة

```bash
# بناء الواجهة الأمامية
npm run build

# تشغيل محلياً (يحاكي Netlify)
netlify dev

# تشغيل Netlify CLI مع logs
netlify dev --verbose

# نشر على Netlify من الخط الأوامر
netlify deploy --prod

# فحص إعدادات Netlify
netlify status
```

## ملاحظات نهائية

✅ **تم**:

- تحويل Endpoints من Express إلى Netlify Functions
- تحديث الفرونت لاستخدام روابط نسبية
- إنشاء `netlify.toml` لإعادة التوجيه
- إضافة CORS headers

⚠️ **تذكر**:

- Netlify Functions لا تحافظ على البيانات المحفوظة محلياً
- استخدم قاعدة بيانات سحابية للإنتاج
- غيّر `JWT_SECRET` قبل النشر
- اختبر دائماً محلياً قبل النشر

أي سؤال أو مشكلة؟ راجع هذا الملف أو اطلب المساعدة! 🚀
