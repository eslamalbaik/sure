import React, { useState, useRef } from "react";
import { FileText, Send, Upload, X, File, Image } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { useToast } from "../hooks/use-toast";
import { supabase } from "../integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface AttachedFile {
  file: File;
  id: string;
  preview?: string;
}

const MedicalConsultation = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    fileNumber: "",
    mobile: "",
    question: "",
    lastVisit: "",
  });

  const [attachments, setAttachments] = useState<AttachedFile[]>([]);

  const handleFileUpload = (files: FileList | null) => {
    if (!files) return;

    const newFiles: AttachedFile[] = [];

    Array.from(files).forEach((file) => {
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "حجم الملف كبير جداً",
          description: "يجب أن يكون حجم الملف أقل من 10 ميجابايت",
          variant: "destructive",
        });
        return;
      }

      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      if (!allowedTypes.includes(file.type)) {
        toast({
          title: "نوع ملف غير مدعوم",
          description: "يُسمح فقط بملفات الصور وPDF وWord",
          variant: "destructive",
        });
        return;
      }

      const fileId = Math.random().toString(36).substr(2, 9);
      const attachedFile: AttachedFile = {
        file,
        id: fileId,
      };

      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          attachedFile.preview = e.target?.result as string;
          setAttachments((prev) => [...prev, attachedFile]);
        };
        reader.readAsDataURL(file);
      } else {
        setAttachments((prev) => [...prev, attachedFile]);
      }
    });
  };

  const removeAttachment = (fileId: string) => {
    setAttachments((prev) => prev.filter((file) => file.id !== fileId));
  };

  const uploadFilesToSupabase = async (attachments: AttachedFile[]) => {
    const uploadedFiles = [];

    for (const attachment of attachments) {
      const fileName = `${Date.now()}_${attachment.file.name}`;
      const { data, error } = await supabase.storage.from("consultation-attachments").upload(fileName, attachment.file);

      if (error) {
        console.error("Error uploading file:", error);
        continue;
      }

      uploadedFiles.push({
        name: attachment.file.name,
        path: data.path,
        size: attachment.file.size,
        type: attachment.file.type,
      });
    }

    return uploadedFiles;
  };

  const sendNotification = async (consultationData: any) => {
    try {
      await supabase.functions.invoke("send-notification", {
        body: consultationData,
      });
    } catch (error) {
      console.error("Error sending notification:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const uploadedFiles = await uploadFilesToSupabase(attachments);
      const attachmentUrls = uploadedFiles.map((file) => {
        const { data } = supabase.storage.from("consultation-attachments").getPublicUrl(file.path);
        return data.publicUrl;
      });

      const dataForApi = {
        name: formData.name,
        email: formData.email,
        fileNumber: formData.fileNumber,
        mobile: formData.mobile,
        question: formData.question,
        lastVisit: formData.lastVisit,
        attachmentUrls: attachmentUrls || [],
      };

      console.log("📤 Sending data to Supabase Function:", dataForApi);
      console.log("🔗 Function name: submit-to-zoho");
      console.log("🔗 Supabase URL:", supabase.supabaseUrl);

      try {
        const { data, error } = await supabase.functions.invoke("submit-to-zoho", {
          body: dataForApi,
        });

        console.log("📥 Response received:", { data, error });

        if (error) {
          console.error("❌ Supabase Function Error:", error);
          console.error("❌ Error details:", JSON.stringify(error, null, 2));

          // رسالة خطأ أكثر وضوحاً
          if (error.message?.includes("Failed to send")) {
            throw new Error("الدالة غير منشورة أو غير متاحة. يرجى التحقق من نشر الدالة في Supabase.");
          }

          throw new Error(error.message || "Failed to submit to Zoho CRM");
        }

        console.log("✅ Success response from Supabase Function:", data);
      } catch (invokeError: any) {
        console.error("❌ Error invoking function:", invokeError);
        throw invokeError;
      }

      toast({
        title: "تم إرسال الاستشارة بنجاح",
        description: "سيتم التواصل معك في أقرب وقت ممكن",
      });

      setFormData({ name: "", email: "", fileNumber: "", mobile: "", question: "", lastVisit: "" });
      setAttachments([]);
      setIsSubmitting(false);
    } catch (error: any) {
      console.error("❌ Error submitting consultation:", error);
      toast({
        title: "خطأ في الإرسال",
        description: `حدث خطأ: ${error.message || "يرجى المحاولة مرة أخرى."}`,
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  const FileAttachmentSection = () => (
    <div className="space-y-4">
      <Label className="text-lg font-semibold text-[#1a365d]">إرفاق ملفات أو صور (اختياري)</Label>

      <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-[#1a365d] transition-colors">
        <input
          ref={fileInputRef}
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
              onClick={() => fileInputRef.current?.click()}
              className="border-[#1a365d] text-[#1a365d] hover:bg-[#1a365d] hover:text-white"
            >
              اختر الملفات
            </Button>
          </div>
          <p className="text-sm text-gray-500">يُسمح بملفات الصور وPDF وWord (حد أقصى 10 ميجابايت لكل ملف)</p>
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
                  <p className="text-sm font-medium text-gray-900 truncate">{attachment.file.name}</p>
                  <p className="text-xs text-gray-500">{(attachment.file.size / 1024 / 1024).toFixed(2)} ميجابايت</p>
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
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#1a365d] mb-6">قسم الاستشارات الطبية "إدراك"</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              استشارات طبية خاصة بمراجعي البروفيسور عبدالله السبيعي
            </p>
            <div className="w-24 h-1 bg-[#1a365d] mx-auto mt-6 rounded-full"></div>
          </div>

          <Card className="shadow-2xl border-0 rounded-3xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-[#1a365d] to-purple-600 text-white p-8">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                  <FileText className="w-8 h-8" />
                </div>
                <div>
                  <CardTitle className="text-3xl font-bold">استشارة للمراجعين الحاليين</CardTitle>
                  <CardDescription className="text-white/90 text-lg">
                    استشارات طبية متخصصة لمراجعي العيادة
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name" className="text-lg font-semibold text-[#1a365d]">
                      الاسم الكامل
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="mt-2 h-14 text-lg border-2 border-gray-200 focus:border-[#1a365d] rounded-xl"
                      placeholder="أدخل اسمك الكامل"
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
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="mt-2 h-14 text-lg border-2 border-gray-200 focus:border-[#1a365d] rounded-xl"
                      placeholder="example@gmail.com"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="file-number" className="text-lg font-semibold text-[#1a365d]">
                      رقم الملف الطبي
                    </Label>
                    <Input
                      id="file-number"
                      type="number"
                      value={formData.fileNumber}
                      onChange={(e) => setFormData({ ...formData, fileNumber: e.target.value })}
                      className="mt-2 h-14 text-lg border-2 border-gray-200 focus:border-[#1a365d] rounded-xl"
                      placeholder="أدخل رقم الملف"
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
                      value={formData.lastVisit}
                      onChange={(e) => setFormData({ ...formData, lastVisit: e.target.value })}
                      className="mt-2 h-14 text-lg border-2 border-gray-200 focus:border-[#1a365d] rounded-xl"
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="mobile" className="text-lg font-semibold text-[#1a365d]">
                    رقم الجوال
                  </Label>
                  <div className="mt-2 flex items-center h-14 border-2 border-gray-200 focus-within:border-[#1a365d] rounded-xl overflow-hidden">
                    <div className="flex items-center gap-2 px-4 text-lg text-gray-600 bg-gray-100 h-full">
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/0/0d/Flag_of_Saudi_Arabia.svg"
                        alt="Saudi Flag"
                        className="w-6 h-4 object-cover"
                      />
                      +966
                    </div>
                    <input
                      id="mobile"
                      type="tel"
                      value={formData.mobile}
                      onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                      className="flex-1 h-full px-4 text-lg focus:outline-none"
                      placeholder="5xxxxxxxx"
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="question" className="text-lg font-semibold text-[#1a365d]">
                    تفاصيل الاستشارة الطبية
                  </Label>
                  <Textarea
                    id="question"
                    value={formData.question}
                    onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                    className="mt-2 min-h-[140px] max-h-[200px] text-lg border-2 border-gray-200 focus:border-[#1a365d] rounded-xl"
                    placeholder="صف حالتك الطبية وأسئلتك بالتفصيل"
                    maxLength={1000}
                    required
                  />
                </div>
                <FileAttachmentSection />
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full bg-[#1a365d] hover:bg-[#1a365d]/90 h-16 text-xl font-bold rounded-xl shadow-lg hover:shadow-xl transition-all"
                >
                  <Send className="w-6 h-6 mr-3" />
                  {isSubmitting ? "جاري إرسال الاستشارة..." : "إرسال الاستشارة الطبية"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default MedicalConsultation;
