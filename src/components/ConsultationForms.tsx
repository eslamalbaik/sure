import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { UserPlus, Users } from 'lucide-react';

const ConsultationForms = () => {
  const [existingClientForm, setExistingClientForm] = useState({
    name: '',
    fileNumber: '',
    mobile: '',
    question: ''
  });

  const [newClientForm, setNewClientForm] = useState({
    name: '',
    mobile: '',
    question: ''
  });

  const handleExistingClientSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Existing client form:', existingClientForm);
    // Handle form submission
  };

  const handleNewClientSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('New client form:', newClientForm);
    // Handle form submission
  };

  return (
    <section id="consultation" className="py-20 bg-gray-50" dir="rtl">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#1a365d] mb-4">نماذج الاستشارة</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              اختر النموذج المناسب لحالتك - عميل حالي أو عميل جديد
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Existing Client Form */}
            <Card className="shadow-2xl border-0 bg-white">
              <CardHeader className="bg-gradient-to-r from-[#1a365d] to-[#2d3748] text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <Users className="w-8 h-8 text-[#f7b731]" />
                  عميل حالي
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <form onSubmit={handleExistingClientSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="existing-name" className="text-[#1a365d] font-bold text-lg">الاسم</Label>
                    <Input
                      id="existing-name"
                      type="text"
                      value={existingClientForm.name}
                      onChange={(e) => setExistingClientForm({...existingClientForm, name: e.target.value})}
                      className="mt-2 border-2 border-gray-200 focus:border-[#1a365d] rounded-lg p-3 text-lg"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="file-number" className="text-[#1a365d] font-bold text-lg">رقم الملف</Label>
                    <Input
                      id="file-number"
                      type="text"
                      value={existingClientForm.fileNumber}
                      onChange={(e) => setExistingClientForm({...existingClientForm, fileNumber: e.target.value})}
                      className="mt-2 border-2 border-gray-200 focus:border-[#1a365d] rounded-lg p-3 text-lg"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="existing-mobile" className="text-[#1a365d] font-bold text-lg">رقم الجوال</Label>
                    <Input
                      id="existing-mobile"
                      type="tel"
                      value={existingClientForm.mobile}
                      onChange={(e) => setExistingClientForm({...existingClientForm, mobile: e.target.value})}
                      className="mt-2 border-2 border-gray-200 focus:border-[#1a365d] rounded-lg p-3 text-lg"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="existing-question" className="text-[#1a365d] font-bold text-lg">السؤال</Label>
                    <textarea
                      id="existing-question"
                      value={existingClientForm.question}
                      onChange={(e) => setExistingClientForm({...existingClientForm, question: e.target.value.slice(0, 500)})}
                      className="mt-2 w-full border-2 border-gray-200 focus:border-[#1a365d] rounded-lg p-3 text-lg min-h-[120px] resize-none"
                      rows={4}
                      maxLength={500}
                      placeholder="اكتب سؤالك هنا (حد أقصى 500 حرف - 4-5 أسطر)"
                      required
                    />
                    <p className="text-sm text-gray-500 mt-1">{existingClientForm.question.length}/500 حرف</p>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-[#1a365d] hover:bg-[#2d3748] text-white py-4 text-lg font-bold rounded-lg transition-colors"
                  >
                    إرسال الاستشارة
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* New Client Form */}
            <Card className="shadow-2xl border-0 bg-white">
              <CardHeader className="bg-gradient-to-r from-[#f7b731] to-[#ffa502] text-[#1a365d] rounded-t-lg">
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <UserPlus className="w-8 h-8 text-[#1a365d]" />
                  عميل جديد
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <form onSubmit={handleNewClientSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="new-name" className="text-[#1a365d] font-bold text-lg">الاسم</Label>
                    <Input
                      id="new-name"
                      type="text"
                      value={newClientForm.name}
                      onChange={(e) => setNewClientForm({...newClientForm, name: e.target.value})}
                      className="mt-2 border-2 border-gray-200 focus:border-[#f7b731] rounded-lg p-3 text-lg"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="new-mobile" className="text-[#1a365d] font-bold text-lg">رقم الجوال</Label>
                    <Input
                      id="new-mobile"
                      type="tel"
                      value={newClientForm.mobile}
                      onChange={(e) => setNewClientForm({...newClientForm, mobile: e.target.value})}
                      className="mt-2 border-2 border-gray-200 focus:border-[#f7b731] rounded-lg p-3 text-lg"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="new-question" className="text-[#1a365d] font-bold text-lg">السؤال</Label>
                    <textarea
                      id="new-question"
                      value={newClientForm.question}
                      onChange={(e) => setNewClientForm({...newClientForm, question: e.target.value.slice(0, 500)})}
                      className="mt-2 w-full border-2 border-gray-200 focus:border-[#f7b731] rounded-lg p-3 text-lg min-h-[120px] resize-none"
                      rows={4}
                      maxLength={500}
                      placeholder="اكتب سؤالك هنا (حد أقصى 500 حرف - 4-5 أسطر)"
                      required
                    />
                    <p className="text-sm text-gray-500 mt-1">{newClientForm.question.length}/500 حرف</p>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-[#f7b731] hover:bg-[#ffa502] text-[#1a365d] py-4 text-lg font-bold rounded-lg transition-colors"
                  >
                    إرسال الاستشارة
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="mt-16 text-center">
            <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-3xl mx-auto border border-gray-100">
              <h3 className="text-2xl font-bold text-[#1a365d] mb-4">معلومات مهمة</h3>
              <div className="grid md:grid-cols-2 gap-6 text-right">
                <div>
                  <h4 className="font-bold text-[#1a365d] mb-2">للعملاء الحاليين:</h4>
                  <p className="text-gray-600">يرجى تقديم رقم الملف للحصول على استشارة سريعة ومتابعة حالتك الطبية.</p>
                </div>
                <div>
                  <h4 className="font-bold text-[#1a365d] mb-2">للعملاء الجدد:</h4>
                  <p className="text-gray-600">سيتم إنشاء ملف جديد لك وستحصل على رقم ملف للمتابعة المستقبلية.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConsultationForms;
