# ✅ قائمة التحقق من نشر Supabase Function

## 1. التحقق من النشر

### في Terminal:
```bash
cd sure
npx supabase functions list
```

يجب أن ترى `submit-to-zoho` في القائمة.

### في Supabase Dashboard:
1. اذهب إلى **Edge Functions** > **Functions**
2. تأكد من وجود `submit-to-zoho`
3. اضغط عليها واذهب إلى **Logs**

---

## 2. اختبار الدالة يدوياً

### من Supabase Dashboard:
1. اذهب إلى **Edge Functions** > **submit-to-zoho** > **Invocations**
2. اضغط **Invoke Function**
3. استخدم هذا الـ JSON:
```json
{
  "name": "Test User",
  "email": "test@example.com",
  "fileNumber": "12345",
  "mobile": "01123456789",
  "question": "Test question",
  "lastVisit": "2024-01-15",
  "attachmentUrls": []
}
```

---

## 3. التحقق من Console في المتصفح

عند إرسال الفورم:
1. افتح **Developer Tools** (F12)
2. اذهب إلى **Console**
3. يجب أن ترى:
   - `📤 Sending data to Supabase Function:`
   - `🔗 Function name: submit-to-zoho`
   - `📥 Response received:`
   - `✅ Success response from Supabase Function:`

---

## 4. التحقق من Logs في Supabase

بعد إرسال الفورم:
1. اذهب إلى **Edge Functions** > **submit-to-zoho** > **Logs**
2. يجب أن ترى:
   - `📥 Received data:`
   - `📤 Sending to Zoho WebToLeadForm:`
   - `📥 Zoho Response Status:`
   - `✅ Success! Data submitted to Zoho CRM`

---

## 5. المشاكل الشائعة وحلولها

### المشكلة: "Function not found"
**الحل:**
```bash
cd sure
npx supabase functions deploy submit-to-zoho --no-verify-jwt
```

### المشكلة: "No logs found"
**الحل:**
- تأكد من أن الدالة منشورة
- جرب إرسال الفورم مرة أخرى
- تحقق من **Invocations** بدلاً من **Logs**

### المشكلة: "CORS error"
**الحل:**
- تأكد من أن الدالة منشورة مع `--no-verify-jwt`
- تحقق من CORS headers في الكود

### المشكلة: البيانات لا تصل إلى Zoho
**الحل:**
- تحقق من Logs في Supabase
- تأكد من أن القيم `xnQsjsdp` و `xmIwtLD` صحيحة
- تحقق من Zoho CRM > Leads

---

## 6. إعادة النشر

إذا كنت تريد إعادة نشر الدالة:
```bash
cd sure
npx supabase functions deploy submit-to-zoho --no-verify-jwt
```

---

## 7. التحقق من Zoho CRM

بعد إرسال الفورم:
1. اذهب إلى **Zoho CRM** > **Leads**
2. يجب أن ترى Lead جديد بالبيانات المرسلة
3. تحقق من:
   - **Last Name**: اسم المستخدم
   - **Email**: البريد الإلكتروني
   - **Mobile**: رقم الجوال
   - **Company**: "Medical Consultation"
   - **Description**: جميع التفاصيل

