import { useState } from 'react';
import { FileText, UserPlus, Send, Phone, FileSearch, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const ConsultationFroms = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [existingClientForm, setExistingClientForm] = useState({
    name: '',
    fileNumber: '',
    mobile: '',
    question: '',
    lastVisit: '',
  });

  const [newClientForm, setNewClientForm] = useState({
    name: '',
    email: '',
    question: ''
  });

  const sendNotification = async (consultationData: any) => {
    try {
      await supabase.functions.invoke('send-notification', {
        body: consultationData
      });
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  };

  const handleExistingClientSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const consultationData = {
        name: existingClientForm.name,
        email: existingClientForm.mobile,
        consultation_type: 'medical',
        message: `رقم الملف: ${existingClientForm.fileNumber}\nتاريخ آخر زيارة: ${existingClientForm.lastVisit}\nرقم الجوال: ${existingClientForm.mobile}\n\nالاستشارة: ${existingClientForm.question}`,
      };

      const { error } = await supabase
        .from('consultations')
        .insert(consultationData);

      if (error) throw error;

      // إرسال إشعار بريد إلكتروني
      await sendNotification(consultationData);

      toast({
        title: "تم إرسال الاستشارة بنجاح",
        description: "سيتم التواصل معك في أقرب وقت ممكن"
      });
      
      setExistingClientForm({ name: '', fileNumber: '', mobile: '', question: '', lastVisit: '' });
    } catch (error) {
      console.error('Error submitting consultation:', error);
      toast({
        title: "خطأ في الإرسال",
        description: "حدث خطأ أثناء إرسال الاستشارة. يرجى المحاولة مرة أخرى.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNewClientSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const consultationData = {
        name: newClientForm.name,
        email: newClientForm.email,
        consultation_type: 'personal',
        message: newClientForm.question,
      };

      const { error } = await supabase
        .from('consultations')
        .insert(consultationData);

      if (error) throw error;

      // إرسال إشعار بريد إلكتروني
      await sendNotification(consultationData);

      toast({
        title: "تم إرسال الاستشارة بنجاح",
        description: "سيتم التواصل معك في أقرب وقت ممكن"
      });
      
      setNewClientForm({ name: '', email: '', question: '' });
    } catch (error) {
      console.error('Error submitting consultation:', error);
      toast({
        title: "خطأ في الإرسال",
        description: "حدث خطأ أثناء إرسال الاستشارة. يرجى المحاولة مرة أخرى.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="consultation" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-4xl font-bold text-[#1a365d] mb-6">
              الاستشارات
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              احصل على استشارة من د. عبدالله السبيعي، المتخصص في الطب النفسي.
            </p>
            <div className="w-24 h-1 bg-[#f7b731] mx-auto mt-6 rounded-full"></div>
          </div>

          <Tabs dir="rtl" defaultValue="existing" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8 bg-gray-100 p-1 rounded-2xl">
              <TabsTrigger value="existing" className="flex items-center gap-2 rounded-xl transition-all">
                <FileSearch className="w-4 h-4" />
                قسم الإستشارات الطبية
              </TabsTrigger>
              <TabsTrigger value="new" className="flex items-center gap-2 rounded-xl transition-all">
                <UserPlus className="w-4 h-4" />
                قسم الإستشارات الشخصية
              </TabsTrigger>
            </TabsList>

            <TabsContent value="existing">
              <Card dir="rtl" className="shadow-2xl border-0 rounded-3xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-[#1a365d] to-purple-600 text-white p-8">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                      <FileText className="w-8 h-8" />
                    </div>
                    <div>
                      <CardTitle className="lg:text-3xl text-2xl py-2 font-bold">استشارة للمراجعين الحاليين</CardTitle>
                      <CardDescription className="text-white/90 text-lg">
                        خاصة بمراجعي البروفيسور عبدالله السبيعي بمركز للإستشارات الطبية
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-8">
                  <form onSubmit={handleExistingClientSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="existing-name" className="text-lg font-semibold text-[#1a365d]">
                          الاسم الكامل
                        </Label>
                        <Input
                          id="existing-name"
                          type="text"
                          value={existingClientForm.name}
                          onChange={(e) => setExistingClientForm({ ...existingClientForm, name: e.target.value })}
                          className="mt-2 h-14 text-lg border-2 border-gray-200 focus:border-[#1a365d] rounded-xl"
                          placeholder="أدخل اسمك الكامل"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="file-number" className="text-lg font-semibold text-[#1a365d]">
                          رقم الملف
                        </Label>
                        <Input
                          id="file-number"
                          type="text"
                          value={existingClientForm.fileNumber}
                          onChange={(e) => setExistingClientForm({ ...existingClientForm, fileNumber: e.target.value })}
                          className="mt-2 h-14 text-lg border-2 border-gray-200 focus:border-[#1a365d] rounded-xl"
                          placeholder="أدخل رقم الملف الطبي"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="last-visit" className="text-lg font-semibold text-[#1a365d]">
                        تاريخ آخر زيارة
                      </Label>
                      <Input
                        id="last-visit"
                        type="date"
                        value={existingClientForm.lastVisit}
                        onChange={(e) => setExistingClientForm({ ...existingClientForm, lastVisit: e.target.value })}
                        className="mt-2 h-14 text-lg border-2 border-gray-200 focus:border-[#1a365d] rounded-xl"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="existing-mobile" className="text-lg font-semibold text-[#1a365d]">
                        رقم الجوال
                      </Label>
                      <Input
                        id="existing-mobile"
                        type="tel"
                        value={existingClientForm.mobile}
                        onChange={(e) => setExistingClientForm({ ...existingClientForm, mobile: e.target.value })}
                        className="mt-2 h-14 text-lg border-2 border-gray-200 focus:border-[#1a365d] rounded-xl"
                        placeholder="+966920007731"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="existing-question" className="text-lg font-semibold text-[#1a365d]">
                        الاستشارة أو السؤال
                      </Label>
                      <Textarea
                        id="existing-question"
                        value={existingClientForm.question}
                        onChange={(e) => setExistingClientForm({ ...existingClientForm, question: e.target.value })}
                        className="mt-2 min-h-[140px] max-h-[200px] text-lg border-2 border-gray-200 focus:border-[#1a365d] rounded-xl"
                        placeholder="اكتب استشارتك أو سؤالك هنا (مقيدة بـ 4-5 أسطر)"
                        maxLength={500}
                        required
                      />
                      <p className="text-sm text-gray-500 mt-2 text-right">
                        الحد الأقصى: 500 حرف
                      </p>
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                      className="w-full bg-[#1a365d] hover:bg-[#1a365d]/90 h-16 text-xl font-bold rounded-xl shadow-lg hover:shadow-xl transition-all"
                    >
                      <Send className="w-6 h-6 mr-3" />
                      {isSubmitting ? 'جاري الإرسال...' : 'إرسال الاستشارة'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="new">
              <Card className="shadow-2xl border-0 rounded-3xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-[#f7b731] to-orange-500 text-white p-8">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                      <UserPlus className="w-8 h-8" />
                    </div>
                    <div>
                      <CardTitle className="text-3xl font-bold">قسم الإستشارات الشخصية</CardTitle>
                      <CardDescription className="text-white/90 text-lg">
                        للعملاء الجدد الذين لا يملكون ملف استشاري
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-8">
                  <form onSubmit={handleNewClientSubmit} className="space-y-6">
                    <div>
                      <Label htmlFor="new-name" className="text-lg font-semibold text-[#1a365d]">
                        الرمز أو الاسم المستعار
                      </Label>
                      <Input
                        id="new-name"
                        type="text"
                        value={newClientForm.name}
                        onChange={(e) => setNewClientForm({ ...newClientForm, name: e.target.value })}
                        className="mt-2 h-14 text-lg border-2 border-gray-200 focus:border-[#f7b731] rounded-xl"
                        placeholder="أدخل اسمك"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-lg font-semibold text-[#1a365d]">
                        البريد الإلكتروني
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={newClientForm.email}
                        onChange={(e) => setNewClientForm({ ...newClientForm, email: e.target.value })}
                        className="mt-2 h-14 text-lg border-2 border-gray-200 focus:border-[#f7b731] rounded-xl"
                        placeholder="example@gmail.com"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="new-question" className="text-lg font-semibold text-[#1a365d]">
                        وصف المشكلة مقيدة ب أربع سطور
                      </Label>
                      <Textarea
                        id="new-question"
                        value={newClientForm.question}
                        onChange={(e) => setNewClientForm({ ...newClientForm, question: e.target.value })}
                        className="mt-2 min-h-[140px] max-h-[200px] text-lg border-2 border-gray-200 focus:border-[#f7b731] rounded-xl"
                        placeholder="اكتب وصف المشكلة مقيدة ب أربع سطور"
                        maxLength={800}
                        required
                      />
                      <p className="text-sm text-gray-500 mt-2 text-right">
                        الحد الأقصى: 800 حرف
                      </p>
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                      className="w-full bg-[#f7b731] hover:bg-[#f7b731]/90 h-16 text-xl font-bold rounded-xl shadow-lg hover:shadow-xl transition-all"
                    >
                      <Send className="w-6 h-6 mr-3" />
                      {isSubmitting ? 'جاري الإرسال...' : 'إرسال الاستشارة'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default ConsultationFroms;
