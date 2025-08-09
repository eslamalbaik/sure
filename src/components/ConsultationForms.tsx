import { useState, useRef } from 'react';
import { FileText, UserPlus, Send, Phone, FileSearch, MessageCircle, Upload, X, File, Image } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface AttachedFile {
  file: File;
  id: string;
  preview?: string;
}

const ConsultationFroms = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const existingFileInputRef = useRef<HTMLInputElement>(null);
  const newFileInputRef = useRef<HTMLInputElement>(null);
  
  const [existingClientForm, setExistingClientForm] = useState({
    name: '',
    email: '',
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

  const [existingClientAttachments, setExistingClientAttachments] = useState<AttachedFile[]>([]);
  const [newClientAttachments, setNewClientAttachments] = useState<AttachedFile[]>([]);

  const handleFileUpload = (files: FileList | null, isExistingClient: boolean) => {
    if (!files) return;

    const newFiles: AttachedFile[] = [];
    
    Array.from(files).forEach((file) => {
      // التحقق من حجم الملف (أقل من 10 ميجابايت)
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "حجم الملف كبير جداً",
          description: "يجب أن يكون حجم الملف أقل من 10 ميجابايت",
          variant: "destructive"
        });
        return;
      }

      // التحقق من نوع الملف
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        toast({
          title: "نوع ملف غير مدعوم",
          description: "يُسمح فقط بملفات الصور وPDF وWord",
          variant: "destructive"
        });
        return;
      }

      const fileId = Math.random().toString(36).substr(2, 9);
      const attachedFile: AttachedFile = {
        file,
        id: fileId
      };

      // إنشاء معاينة للصور
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          attachedFile.preview = e.target?.result as string;
          if (isExistingClient) {
            setExistingClientAttachments(prev => [...prev, attachedFile]);
          } else {
            setNewClientAttachments(prev => [...prev, attachedFile]);
          }
        };
        reader.readAsDataURL(file);
      } else {
        if (isExistingClient) {
          setExistingClientAttachments(prev => [...prev, attachedFile]);
        } else {
          setNewClientAttachments(prev => [...prev, attachedFile]);
        }
      }
    });
  };

  const removeAttachment = (fileId: string, isExistingClient: boolean) => {
    if (isExistingClient) {
      setExistingClientAttachments(prev => prev.filter(file => file.id !== fileId));
    } else {
      setNewClientAttachments(prev => prev.filter(file => file.id !== fileId));
    }
  };

  const uploadFilesToSupabase = async (attachments: AttachedFile[]) => {
    const uploadedFiles = [];
    
    for (const attachment of attachments) {
      const fileName = `${Date.now()}_${attachment.file.name}`;
      const { data, error } = await supabase.storage
        .from('consultation-attachments')
        .upload(fileName, attachment.file);
      
      if (error) {
        console.error('Error uploading file:', error);
        continue;
      }
      
      uploadedFiles.push({
        name: attachment.file.name,
        path: data.path,
        size: attachment.file.size,
        type: attachment.file.type
      });
    }
    
    return uploadedFiles;
  };

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
      // رفع الملفات المرفقة
      const uploadedFiles = await uploadFilesToSupabase(existingClientAttachments);
      
      const consultationData = {
        name: existingClientForm.name,
        email: existingClientForm.email,
        consultation_type: 'medical',
        message: `رقم الملف: ${existingClientForm.fileNumber}\nتاريخ آخر زيارة: ${existingClientForm.lastVisit}\nرقم الجوال: ${existingClientForm.mobile}\n\nالاستشارة: ${existingClientForm.question}`,
        attachments: uploadedFiles
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
      
      setExistingClientForm({ name: '', email: '', fileNumber: '', mobile: '', question: '', lastVisit: '' });
      setExistingClientAttachments([]);
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
      // رفع الملفات المرفقة
      const uploadedFiles = await uploadFilesToSupabase(newClientAttachments);
      
      const consultationData = {
        name: newClientForm.name,
        email: newClientForm.email,
        consultation_type: 'personal',
        message: newClientForm.question,
        attachments: uploadedFiles
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
      setNewClientAttachments([]);
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

  const FileAttachmentSection = ({ 
    attachments, 
    onFileUpload, 
    fileInputRef, 
    isExistingClient 
  }: {
    attachments: AttachedFile[];
    onFileUpload: (files: FileList | null) => void;
    fileInputRef: React.RefObject<HTMLInputElement>;
    isExistingClient: boolean;
  }) => (
    <div className="space-y-4">
      <Label className="text-lg font-semibold text-[#1a365d]">
        إرفاق ملفات أو صور (اختياري)
      </Label>
      
      <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-[#1a365d] transition-colors">
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*,.pdf,.doc,.docx"
          onChange={(e) => onFileUpload(e.target.files)}
          className="hidden"
        />
        
        <div className="space-y-3">
          <Upload className="w-12 h-12 text-gray-400 mx-auto" />
          <div>
            <p className="text-lg text-gray-600 mb-2">اسحب الملفات هنا أو</p>
            <Button
              type="button"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              className="border-[#1a365d] text-[#1a365d] hover:bg-[#1a365d] hover:text-white"
            >
              اختر الملفات
            </Button>
          </div>
          <p className="text-sm text-gray-500">
            يُسمح بملفات الصور وPDF وWord (حد أقصى 10 ميجابايت لكل ملف)
          </p>
        </div>
      </div>

      {attachments.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-semibold text-[#1a365d]">الملفات المرفقة:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {attachments.map((attachment) => (
              <div key={attachment.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border">
                <div className="flex-shrink-0">
                  {attachment.preview ? (
                    <img 
                      src={attachment.preview} 
                      alt={attachment.file.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
                      <File className="w-6 h-6 text-gray-500" />
                    </div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {attachment.file.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {(attachment.file.size / 1024 / 1024).toFixed(2)} ميجابايت
                  </p>
                </div>
                
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeAttachment(attachment.id, isExistingClient)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <section id="consultation" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-4xl font-bold text-[#1a365d] mb-6">
              الاستشارات
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            احصل على استشارة من د. عبدالله السبيعي.
            </p>
            <div className="w-24 h-1 bg-[#f7b731] mx-auto mt-6 rounded-full"></div>
          </div>

          <Tabs dir="rtl" defaultValue="existing" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8 bg-gray-100 p-1 rounded-2xl">
              <TabsTrigger value="existing" className="flex items-center gap-2 rounded-xl transition-all">
                <FileSearch className="w-4 h-4" />
             قسم الإستشارات الطبية   "إدراك" 
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
                        <Label htmlFor="existing-email" className="text-lg font-semibold text-[#1a365d]">
                          البريد الإلكتروني
                        </Label>
                        <Input
                          id="existing-email"
                          type="email"
                          value={existingClientForm.email}
                          onChange={(e) => setExistingClientForm({ ...existingClientForm, email: e.target.value })}
                          className="mt-2 h-14 text-lg border-2 border-gray-200 focus:border-[#1a365d] rounded-xl"
                          placeholder="example@gmail.com"
                          required
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="file-number" className="text-lg font-semibold text-[#1a365d]">
                          رقم الملف
                        </Label>
                        <Input
                          id="file-number"
                          type="number"
                          value={existingClientForm.fileNumber}
                          onChange={(e) => setExistingClientForm({ ...existingClientForm, fileNumber: e.target.value })}
                          className="mt-2 h-14 text-lg border-2 border-gray-200 focus:border-[#1a365d] rounded-xl"
                          placeholder="أدخل رقم الملف الطبي"
                          required
                        />
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
                    </div>
                    <div>
                      <Label htmlFor="existing-mobile" className="text-lg font-semibold text-[#1a365d]">
                        رقم الجوال
                      </Label>

                      <div className="mt-2 flex items-center h-14 border-2 border-gray-200 focus-within:border-[#1a365d] rounded-xl overflow-hidden">
                        {/* رمز السعودية + العلم */}
                        <div className="flex items-center gap-2 px-4 text-lg text-gray-600 bg-gray-100 h-full">
                          <img
                            src="https://upload.wikimedia.org/wikipedia/commons/0/0d/Flag_of_Saudi_Arabia.svg"
                            alt="Saudi Flag"
                            className="w-6 h-4 object-cover"
                          />
                          +966
                        </div>

                        {/* حقل الإدخال */}
                        <input
                          id="existing-mobile"
                          type="number"
                          value={existingClientForm.mobile}
                          onChange={(e) =>
                            setExistingClientForm({ ...existingClientForm, mobile: e.target.value })
                          }
                          className="flex-1 h-full px-4 text-lg focus:outline-none"
                          placeholder="5xxxxxxxx"
                          required
                        />
                      </div>
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
                        placeholder="اكتب استشارتك أو سؤالك هنا "
                        maxLength={500}
                        required
                      />
                    </div>

                    <FileAttachmentSection
                      attachments={existingClientAttachments}
                      onFileUpload={(files) => handleFileUpload(files, true)}
                      fileInputRef={existingFileInputRef}
                      isExistingClient={true}
                    />

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
                        للعملاء الراغبين في إستشارة خاصة  (غير طبية ) وبسرية تامة
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
                        وصف المشكلة 
                      </Label>
                      <Textarea
                        id="new-question"
                        value={newClientForm.question}
                        onChange={(e) => setNewClientForm({ ...newClientForm, question: e.target.value })}
                        className="mt-2 min-h-[140px] max-h-[200px] text-lg border-2 border-gray-200 focus:border-[#f7b731] rounded-xl"
                        placeholder="اكتب وصف المشكلة "
                        maxLength={800}
                        required
                      />
                    </div>

                    <FileAttachmentSection
                      attachments={newClientAttachments}
                      onFileUpload={(files) => handleFileUpload(files, false)}
                      fileInputRef={newFileInputRef}
                      isExistingClient={false}
                    />

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
