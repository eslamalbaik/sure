
const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12" dir="rtl">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold text-[#1a365d] mb-8 text-center">
            شروط الاستخدام
          </h1>
          
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-[#1a365d] mb-4">
                1. قبول الشروط
              </h2>
              <p className="text-gray-700 leading-relaxed">
                باستخدام هذا الموقع الإلكتروني والخدمات المقدمة من د. عبدالله الصبيعي، فإنك توافق على الالتزام بهذه الشروط والأحكام. إذا كنت لا توافق على أي من هذه الشروط، يرجى عدم استخدام الموقع.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#1a365d] mb-4">
                2. الخدمات المقدمة
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                يقدم د. عبدالله الصبيعي خدمات الاستشارات الطبية المتخصصة والتي تشمل:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mr-6">
                <li>الاستشارات الطبية عن بُعد</li>
                <li>التقييم الطبي والتشخيص</li>
                <li>وضع خطط العلاج المناسبة</li>
                <li>المتابعة الطبية المستمرة</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#1a365d] mb-4">
                3. المسؤولية الطبية
              </h2>
              <p className="text-gray-700 leading-relaxed">
                الاستشارات المقدمة هي لأغراض إعلامية وتعليمية فقط ولا تحل محل الفحص الطبي المباشر. في حالات الطوارئ الطبية، يجب التوجه فوراً إلى أقرب مستشفى أو مركز طبي.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#1a365d] mb-4">
                4. الخصوصية والسرية
              </h2>
              <p className="text-gray-700 leading-relaxed">
                نلتزم بالحفاظ على خصوصية وسرية جميع المعلومات الطبية والشخصية المقدمة من المرضى وفقاً للمعايير الطبية والقانونية المعمول بها في المملكة العربية السعودية.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#1a365d] mb-4">
                5. الرسوم والدفع
              </h2>
              <p className="text-gray-700 leading-relaxed">
                يتم تحديد رسوم الاستشارات وفقاً لنوع الخدمة المطلوبة. يجب دفع الرسوم المستحقة قبل تقديم الخدمة ما لم يتم الاتفاق على خلاف ذلك.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#1a365d] mb-4">
                6. إلغاء وتأجيل المواعيد
              </h2>
              <p className="text-gray-700 leading-relaxed">
                يمكن إلغاء أو تأجيل المواعيد قبل 24 ساعة على الأقل من الموعد المحدد. الإلغاء المتأخر قد يؤدي إلى فرض رسوم إضافية.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#1a365d] mb-4">
                7. حدود المسؤولية
              </h2>
              <p className="text-gray-700 leading-relaxed">
                لا يتحمل د. عبدالله الصبيعي مسؤولية أي أضرار مباشرة أو غير مباشرة قد تنتج عن استخدام هذا الموقع أو الخدمات المقدمة، باستثناء ما ينص عليه القانون السعودي.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#1a365d] mb-4">
                8. تعديل الشروط
              </h2>
              <p className="text-gray-700 leading-relaxed">
                يحتفظ د. عبدالله الصبيعي بالحق في تعديل هذه الشروط والأحكام في أي وقت. سيتم إشعار المستخدمين بأي تغييرات جوهرية من خلال الموقع الإلكتروني.
              </p>
            </section>
          </div>

          <div className="mt-12 p-6 bg-[#f8f9fa] rounded-lg border-r-4 border-[#560CAB]">
            <p className="text-sm text-gray-600">
              <strong>آخر تحديث:</strong> يناير 2024
            </p>
            <p className="text-sm text-gray-600 mt-2">
              للاستفسارات حول شروط الاستخدام، يرجى التواصل معنا عبر القنوات الرسمية المتاحة.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
