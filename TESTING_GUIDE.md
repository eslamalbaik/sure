# دليل الاختبار المحلي - Medical Consultation Form

## ✅ التحقق من الحقول المرسلة

الحقول المرسلة تتطابق مع Field Aliases في Zoho Forms:

| Field Label | Field Alias | Status |
|------------|-------------|--------|
| Name | `Name` | ✅ |
| Email | `Email` | ✅ |
| File Number | `FileNumber` | ✅ |
| Phone | `Phone` | ✅ |
| Last Visit | `LastVisit` | ✅ |
| question | `Question` | ✅ |
| Attachments Links | `AttachmentsLinks` | ✅ |

## 🧪 طريقة الاختبار المحلي (بدون Supabase)

### الطريقة 1: استخدام Mock Function (موصى بها)

1. **أنشئ ملف mock function محلي:**

```typescript
// src/utils/mockZohoSubmit.ts
export const mockSubmitToZoho = async (data: any) => {
  console.log("🧪 MOCK: Simulating Zoho submission...");
  console.log("📤 Data to be sent:", JSON.stringify(data, null, 2));
  
  // محاكاة التأخير
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // محاكاة الاستجابة الناجحة
  return {
    message: "Submission to Zoho successful (MOCK)",
    zohoResult: {
      code: 3000,
      message: "Success",
      data: {
        ID: "MOCK_" + Date.now()
      }
    }
  };
};
```

2. **عدّل `handleSubmit` في `MedicalConsultation.tsx` مؤقتاً:**

```typescript
// استبدل هذا السطر:
const { data, error } = await supabase.functions.invoke("submit-to-zoho", {
  body: dataForApi,
});

// بهذا (للاختبار فقط):
import { mockSubmitToZoho } from "../utils/mockZohoSubmit";
const data = await mockSubmitToZoho(dataForApi);
const error = null;
```

### الطريقة 2: استخدام Browser Console

1. **افتح Developer Tools (F12)**
2. **اذهب إلى Console**
3. **عند إرسال الفورم، ستظهر جميع البيانات في Console:**
   - `📤 Sending data to Zoho:` - البيانات المرسلة
   - `✅ Success response:` - الاستجابة الناجحة
   - `❌ Error:` - أي أخطاء

### الطريقة 3: اختبار مباشر مع Zoho (بعد نشر Supabase Function)

1. **نشر الدالة على Supabase:**
```bash
cd sure
npx supabase functions deploy submit-to-zoho --no-verify-jwt
```

2. **تأكد من إضافة Secrets في Supabase Dashboard:**
   - `ZOHO_CLIENT_ID`
   - `ZOHO_CLIENT_SECRET`
   - `ZOHO_REFRESH_TOKEN`

3. **اختبر الفورم:**
   - املأ جميع الحقول
   - أرفق ملف (اختياري)
   - اضغط "إرسال الاستشارة الطبية"
   - راقب Console للأخطاء

## 📋 قائمة التحقق قبل الاختبار

- [ ] جميع الحقول مملوءة بشكل صحيح
- [ ] `lastVisit` بصيغة تاريخ (YYYY-MM-DD)
- [ ] `mobile` يحتوي على رقم الجوال فقط (بدون +966)
- [ ] `attachmentUrls` مصفوفة (حتى لو فارغة)
- [ ] Console مفتوح لمراقبة البيانات

## 🔍 ما يجب مراقبته في Console

### عند النجاح:
```
📤 Sending data to Zoho: { ... }
✅ Success response: { message: "...", zohoResult: { ... } }
```

### عند الفشل:
```
❌ Supabase Function Error: { ... }
أو
❌ Zoho API Error: { ... }
```

## 🐛 حل المشاكل الشائعة

### 1. "NOT_FOUND" Error
**الحل:** الدالة غير منشورة. انشرها أولاً:
```bash
npx supabase functions deploy submit-to-zoho --no-verify-jwt
```

### 2. "CORS" Error
**الحل:** تأكد من أن CORS headers موجودة في الدالة (موجودة بالفعل ✅)

### 3. "Zoho auth error"
**الحل:** تأكد من إضافة Secrets في Supabase Dashboard

### 4. البيانات لا تظهر في Zoho
**الحل:** 
- تحقق من Field Aliases في Zoho Forms
- تأكد من صيغة التاريخ (YYYY-MM-DD)
- تحقق من Console للأخطاء

## 📝 ملاحظات مهمة

1. **التاريخ:** يجب أن يكون بصيغة `YYYY-MM-DD` (مثل: `2024-01-15`)
2. **الملفات:** إذا لم تكن هناك ملفات، `attachmentUrls` ستكون مصفوفة فارغة `[]`
3. **الجوال:** يتم إرسال الرقم فقط (بدون +966) لأن +966 موجود في الواجهة فقط


