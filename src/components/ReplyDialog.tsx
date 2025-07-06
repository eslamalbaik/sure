
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Send, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';

type Consultation = Tables<'consultations'>;

interface ReplyDialogProps {
  consultation: Consultation | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ReplyDialog = ({ consultation, open, onOpenChange }: ReplyDialogProps) => {
  const { toast } = useToast();
  const [reply, setReply] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSendReply = async () => {
    if (!consultation || !reply.trim()) return;

    setIsSubmitting(true);
    try {
      // Send reply email
      const { error } = await supabase.functions.invoke('send-reply', {
        body: {
          consultation_id: consultation.id,
          user_email: consultation.email,
          user_name: consultation.name,
          reply_message: reply,
          consultation_type: consultation.consultation_type
        }
      });

      if (error) throw error;

      // Update consultation status to completed
      await supabase
        .from('consultations')
        .update({ 
          status: 'completed',
          updated_at: new Date().toISOString()
        })
        .eq('id', consultation.id);

      toast({
        title: "تم إرسال الرد بنجاح",
        description: "تم إرسال ردك إلى المستخدم عبر البريد الإلكتروني"
      });

      setReply('');
      onOpenChange(false);
    } catch (error) {
      console.error('Error sending reply:', error);
      toast({
        title: "خطأ في الإرسال",
        description: "حدث خطأ أثناء إرسال الرد. يرجى المحاولة مرة أخرى.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl" dir="rtl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Send className="w-5 h-5" />
            رد على الاستشارة
          </DialogTitle>
          <DialogDescription>
            إرسال رد إلى {consultation?.name} ({consultation?.email})
          </DialogDescription>
        </DialogHeader>

        {consultation && (
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">الاستشارة الأصلية:</h4>
              <p className="text-gray-700 text-sm leading-relaxed">
                {consultation.message}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="reply">ردك على الاستشارة:</Label>
              <Textarea
                id="reply"
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                placeholder="اكتب ردك هنا..."
                className="min-h-[150px]"
                maxLength={2000}
              />
              <p className="text-sm text-gray-500 text-right">
                {reply.length}/2000 حرف
              </p>
            </div>
          </div>
        )}

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isSubmitting}
          >
            <X className="w-4 h-4 mr-2" />
            إلغاء
          </Button>
          <Button
            onClick={handleSendReply}
            disabled={isSubmitting || !reply.trim()}
            className="bg-[#1a365d] hover:bg-[#1a365d]/90"
          >
            <Send className="w-4 h-4 mr-2" />
            {isSubmitting ? 'جاري الإرسال...' : 'إرسال الرد'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReplyDialog;
