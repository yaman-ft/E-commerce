# 🧪 اختبار سريع للـ Functions

## الخطوة 1: تثبيت Netlify CLI

```bash
npm install -g netlify-cli

# تحقق من التثبيت
netlify --version
```

## الخطوة 2: تشغيل محلياً

```bash
# من مجلد الجذر
netlify dev

# سيعمل على http://localhost:8888
```

## الخطوة 3: اختبر الـ Endpoints

في terminal آخر (جديد):

### 1. فحص صحة الـ API
```bash
curl http://localhost:8888/api/health
```
**النتيجة المتوقعة:**
```json
{"status":"ok","message":"API is running"}
```

### 2. احصل على جميع المنتجات
```bash
curl http://localhost:8888/api/products
```
**النتيجة المتوقعة:**
```json
[]
```
(مصفوفة فارغة في البداية، أو منتجات إذا كانت موجودة)

### 3. التسجيل (قم بإنشاء حساب)
```bash
curl -X POST http://localhost:8888/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "محمد أحمد",
    "email": "mohammed@example.com",
    "password": "password123"
  }'
```
**النتيجة المتوقعة:**
```json
{
  "user": {
    "id": 1,
    "name": "محمد أحمد",
    "email": "mohammed@example.com",
    "role": "user"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR..."
}
```
**احفظ Token! ستحتاجه.**

### 4. الدخول (استخدم نفس البيانات)
```bash
curl -X POST http://localhost:8888/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "mohammed@example.com",
    "password": "password123"
  }'
```
**النتيجة المتوقعة:** نفس الـ token

### 5. إضافة منتج (يحتاج admin)
```bash
TOKEN="your_token_here"

curl -X POST http://localhost:8888/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "title": "iPhone 15",
    "price": 999,
    "description": "أحدث هاتف ذكي",
    "category": "electronics",
    "image": "https://via.placeholder.com/300",
    "rating_rate": 4.5,
    "rating_count": 100
  }'
```

### 6. إضافة للسلة (يحتاج token)
```bash
TOKEN="your_token_here"

curl -X POST http://localhost:8888/api/cart \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "product_id": 1,
    "quantity": 2
  }'
```

### 7. الحصول على السلة
```bash
TOKEN="your_token_here"

curl http://localhost:8888/api/cart \
  -H "Authorization: Bearer $TOKEN"
```
**النتيجة المتوقعة:**
```json
{
  "items": [
    {
      "id": 1,
      "product_id": 1,
      "quantity": 2,
      "title": "iPhone 15",
      "price": 999,
      "image": "...",
      "category": "electronics"
    }
  ],
  "total": 1998
}
```

## ⚡ سكريبت اختبار شامل

احفظ هذا في ملف `test-api.sh`:

```bash
#!/bin/bash

BASE_URL="http://localhost:8888/api"

echo "🧪 اختبار API Endpoints"
echo "========================"

# 1. فحص الصحة
echo ""
echo "1️⃣ فحص صحة الـ API..."
curl -s $BASE_URL/health | jq .

# 2. جميع المنتجات
echo ""
echo "2️⃣ جميع المنتجات..."
curl -s $BASE_URL/products | jq .

# 3. التسجيل
echo ""
echo "3️⃣ التسجيل..."
RESPONSE=$(curl -s -X POST $BASE_URL/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "أحمد",
    "email": "'$(date +%s)'@test.com",
    "password": "test123456"
  }')
echo $RESPONSE | jq .
TOKEN=$(echo $RESPONSE | jq -r '.token')
echo "Token: $TOKEN"

# 4. الدخول
echo ""
echo "4️⃣ الدخول..."
curl -s -X POST $BASE_URL/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "test123456"
  }' | jq .

# 5. السلة
echo ""
echo "5️⃣ الحصول على السلة..."
curl -s $BASE_URL/cart \
  -H "Authorization: Bearer $TOKEN" | jq .

echo ""
echo "✅ الاختبار انتهى!"
```

**لتشغيل السكريبت:**
```bash
chmod +x test-api.sh
./test-api.sh
```

## 🔍 اختبار من المتصفح

### 1. افتح الموقع
```
http://localhost:8888
```

### 2. افتح DevTools (F12)
اضغط Ctrl+Shift+K (أو Cmd+Option+K على Mac)

### 3. اختبر في Console
```javascript
// احصل على المنتجات
fetch('/api/products').then(r => r.json()).then(console.log)

// التسجيل
fetch('/api/users/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'أحمد',
    email: 'ahmed@example.com',
    password: 'password123'
  })
}).then(r => r.json()).then(console.log)
```

## 🆘 حل المشاكل

### ❌ "Cannot find module"
```bash
# تأكد من تثبيت الـ dependencies
cd netlify/functions
npm install
cd ../..
```

### ❌ "Port 8888 already in use"
```bash
# استخدم port مختلف
netlify dev --port 3000
```

### ❌ "404 Not Found"
- تأكد من `netlify.toml` موجود
- تأكد من ملفات functions موجودة
- شغّل `netlify dev --verbose` للمزيد من التفاصيل

### ❌ "JWT errors"
```bash
# تأكد من `.env` يحتوي على JWT_SECRET
cat .env | grep JWT_SECRET
```

### ❌ "CORS errors"
- تأكد من المتصفح يرسل requests إلى `/api/...` و ليس `localhost:5000`
- جرّب في private window

## 📊 Expected Results

بعد اختبارات ناجحة، يجب أن ترى:
- ✅ `/api/health` يعيد `{"status":"ok"}`
- ✅ `/api/products` يعيد قائمة منتجات
- ✅ `/api/users/register` ينشئ حساب جديد ويعيد token
- ✅ `/api/cart` (مع token) يعيد السلة
- ✅ No CORS errors في console
- ✅ No 404 errors في responses

---

**جاهز للاختبار؟ ابدأ بـ `netlify dev` 🚀**
