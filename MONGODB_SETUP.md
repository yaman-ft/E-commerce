# تحويل قاعدة البيانات من SQLite إلى MongoDB

## لماذا MongoDB؟

- ✅ **سحابي**: البيانات آمنة ومتاحة دائماً
- ✅ **مجاني**: طبقة مجانية وافية للمشاريع الصغيرة والمتوسطة
- ✅ **بدون صيانة**: Netlify Functions لا تحتاج إلى ملفات دائمة
- ✅ **سريع**: أداء جيد للعمليات الأساسية

## الخطوات

### 1. أنشئ حساب MongoDB Atlas

1. اذهب إلى https://www.mongodb.com/cloud/atlas
2. اختر "Register" أو "Sign in with Google"
3. أنشئ organization و project جديد

### 2. أنشئ Cluster

1. اختر "Build a Database"
2. اختر "Shared" (مجاني)
3. اختر المنطقة الأقرب (مثلاً: eu-west-1 لأوروبا)
4. انقر "Create Cluster"

### 3. أنشئ مستخدم قاعدة البيانات

1. اذهب إلى "Database Access"
2. اختر "Add New Database User"
3. أدخل username و password قوي
4. اختر "Autogenerate Secure Password"
5. اضبط الصلاحيات على "Atlas admin"

### 4. اسمح بالاتصال من أي مكان

1. اذهب إلى "Network Access"
2. اختر "Add IP Address"
3. اختر "Allow access from anywhere" (0.0.0.0/0)

### 5. احصل على Connection String

1. في الـ Cluster، اختر "Connect"
2. اختر "Connect your application"
3. انسخ الـ connection string (مثال):
```
mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority
```

### 6. أضف المتغير البيئي على Netlify

1. اذهب إلى **Site settings → Environment**
2. أضف متغير جديد:
   - **Key**: `MONGODB_URI`
   - **Value**: Connection string من الخطوة 5

### 7. حدّث `netlify/functions/db.js`

استبدل محتوى الملف بـ:

```javascript
const { MongoClient } = require('mongodb');

let client;
let db;

async function getDb() {
  if (db) return db;

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('MONGODB_URI environment variable not set');
  }

  try {
    client = new MongoClient(uri);
    await client.connect();
    db = client.db('ecommerce');
    
    // إنشاء collections إذا لم تكن موجودة
    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map(c => c.name);

    if (!collectionNames.includes('users')) {
      await db.createCollection('users');
      await db.collection('users').createIndex({ email: 1 }, { unique: true });
    }

    if (!collectionNames.includes('products')) {
      await db.createCollection('products');
    }

    if (!collectionNames.includes('cart_items')) {
      await db.createCollection('cart_items');
    }

    if (!collectionNames.includes('orders')) {
      await db.createCollection('orders');
    }

    if (!collectionNames.includes('order_items')) {
      await db.createCollection('order_items');
    }

    console.log('Connected to MongoDB');
    return db;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

function closeDb() {
  if (client) {
    client.close();
  }
}

module.exports = { getDb, closeDb };
```

### 8. حدّث `netlify/functions/package.json`

استبدل dependencies بـ:

```json
{
  "name": "for-business-functions",
  "version": "1.0.0",
  "description": "Netlify Functions for e-commerce API",
  "dependencies": {
    "bcryptjs": "^2.4.3",
    "dotenv": "^16.4.5",
    "jsonwebtoken": "^9.0.2",
    "mongodb": "^6.3.0"
  }
}
```

### 9. حدّث الـ Controllers

حدّث جميع الـ functions لاستخدام MongoDB queries بدلاً من SQL.

**مثال**: في `netlify/functions/products.js`:

```javascript
const db = await getDb();

// بدلاً من:
// const products = db.prepare('SELECT * FROM products').all();

// استخدم:
const products = await db.collection('products').find({}).toArray();
```

## إعادة كتابة جميع Functions لـ MongoDB

هذا سيتطلب تعديلات كبيرة. إذا أردت المساعدة، أخبرني وسأنشئ نسخة MongoDB كاملة.

## Mongoose (اختياري لكن موصى به)

بدلاً من استخدام MongoDB Driver مباشرة، استخدم Mongoose:

```javascript
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, default: 'user' },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
```

## خيارات بديلة

### Firebase
```
npm install firebase-admin
```

### Supabase (PostgreSQL)
```
npm install @supabase/supabase-js
```

### PlanetScale (MySQL)
```
npm install mysql2
```

## الخطوات التالية

1. ✅ أنشئ حساب MongoDB
2. ✅ احصل على Connection String
3. ✅ أضفه على Netlify
4. ✅ حدّث الـ functions
5. ✅ اختبر محلياً
6. ✅ نشّر على Netlify

> **ملاحظة**: هذا التحويل مهم لأن SQLite لا يعمل على Netlify في الإنتاج!
