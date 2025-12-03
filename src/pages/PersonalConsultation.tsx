import React, { useState, useRef } from 'react';
import { UserPlus, Send, Upload, X, File, Image } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { useToast } from '../hooks/use-toast';
import { supabase } from '../integrations/supabase/client';
import { submitToZoho, ZohoFormData } from '../utils/zohoApi';

interface AttachedFile {
  file: File;
  id: string;
  preview?: string;
}

const PersonalConsultation = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const newFileInputRef = useRef<HTMLInputElement>(null);
  
  const [newClientForm, setNewClientForm] = useState({
    name: '',
    email: '',
    question: ''
  });

  const [newClientAttachments, setNewClientAttachments] = useState<AttachedFile[]>([]);

  const handleFileUpload = (files: FileList | null) => {
    if (!files) return;

    const newFiles: AttachedFile[] = [];
    
    Array.from(files).forEach((file) => {
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "حجم الملف كبير جداً",
          description: "يجب أن يكون حجم الملف أقل من 10 ميجابايت",
          variant: "destructive"
        });
        return;
      }

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

      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          attachedFile.preview = e.target?.result as string;
          setNewClientAttachments(prev => [...prev, attachedFile]);
        };
        reader.readAsDataURL(file);
      } else {
        setNewClientAttachments(prev => [...prev, attachedFile]);
      }
    });
  };

  const removeAttachment = (fileId: string) => {
    setNewClientAttachments(prev => prev.filter(file => file.id !== fileId));
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

  const handleNewClientSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const uploadedFiles = await uploadFilesToSupabase(newClientAttachments);
      
      const consultationData = {
        name: newClientForm.name,
        email: newClientForm.email,
        consultation_type: 'personal',
        message: newClientForm.question,
        attachments: uploadedFiles
      };

      // Submit to Supabase
      const { error } = await supabase
        .from('consultations')
        .insert(consultationData);

      if (error) throw error;

      // Submit to Zoho CRM
      try {
        // إنشاء روابط الملفات المرفقة
        const attachments = [];
        if (uploadedFiles.length > 0) {
          for (const file of uploadedFiles) {
            const { data: urlData } = supabase.storage
              .from('consultation-attachments')
              .getPublicUrl(file.path);
            attachments.push({
              name: file.name,
              url: urlData.publicUrl,
              path: file.path,
              size: file.size,
              type: file.type
            });
          }
        }

        const fullMessage = `${newClientForm.question}`;
        
        const zohoFormData: ZohoFormData = {
          name: newClientForm.name,
          email: newClientForm.email,
          message: fullMessage,
          module: 'Leads',
          leadSource: 'Personal Consultation - Website',
          attachments: attachments,
          customFields: {
            // الحقول المخصصة - أسماء API الفعلية من Zoho CRM
            field1: 'شخصية', // Consultation Type
            field3: newClientForm.question, // تفاصيل الاستشارة
            Status: 'في الانتظار'
          }
        };

        await submitToZoho(zohoFormData);
        console.log('✅ Successfully submitted to Zoho CRM');
      } catch (zohoError) {
        // Log Zoho error but don't fail the whole submission
        console.error('⚠️ Error submitting to Zoho (continuing anyway):', zohoError);
        // You can optionally show a warning toast here if needed
      }

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

  const FileAttachmentSection = () => (
    <div className="space-y-4">
      <Label className="text-lg font-semibold text-[#1a365d]">
        إرفاق ملفات أو صور (اختياري)
      </Label>
      
      <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-[#1a365d] transition-colors">
        <input
          ref={newFileInputRef}
          type="file"
          multiple
          accept="image/*,.pdf,.doc,.docx"
          onChange={(e) => handleFileUpload(e.target.files)}
          className="hidden"
        />
        
        <div className="space-y-3">
          <Upload className="w-12 h-12 text-gray-400 mx-auto" />
          <div>
            <p className="text-lg text-gray-600 mb-2">اسحب الملفات هنا أو</p>
            <Button
              type="button"
              variant="outline"
              onClick={() => newFileInputRef.current?.click()}
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

      {newClientAttachments.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-semibold text-[#1a365d]">الملفات المرفقة:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {newClientAttachments.map((attachment) => (
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
                  onClick={() => removeAttachment(attachment.id)}
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
    <div className='max-w-7xl mx-auto px-4 py-24'>
      <div className="text-center">
        <h2 className="text-4xl font-bold text-[#1a365d]">
          قسم الإستشارات الشخصية
        </h2>
        <p className='text-center py-4'>للعملاء الراغبين في إستشارة خاصة (غير طبية) وبسرية تامة</p>
        <div className="w-24 h-1 bg-[#f7b731] mx-auto mt-2 rounded-full"></div>
      </div>

      <div className="p-8">
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

          <FileAttachmentSection />

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
      </div>
    </div>
  );
};

export default PersonalConsultation;