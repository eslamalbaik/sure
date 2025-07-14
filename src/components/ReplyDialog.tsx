import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Send, X, MessageCircle } from 'lucide-react';
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
  const [isFollowUp, setIsFollowUp] = useState(false);

  const handleSendReply = async () => {
    if (!consultation || !reply.trim()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('https://mailer-green-five.vercel.app/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          consultation_id: consultation.id,
          user_email: consultation.email,
          user_name: consultation.name,
          reply_message: reply,
          consultation_type: consultation.consultation_type,
          is_follow_up: isFollowUp
        })
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || 'فشل في إرسال البريد');
      }

      if (!isFollowUp) {
        await supabase
          .from('consultations')
          .update({ status: 'completed', updated_at: new Date().toISOString() })
          .eq('id', consultation.id);
      }

      toast({
        title: 'تم إرسال الرد بنجاح',
        description: `تم إرسال ${isFollowUp ? 'رد المتابعة' : 'الرد'} إلى المستخدم عبر البريد الإلكتروني`
      });

      setReply('');
      setIsFollowUp(false);
      onOpenChange(false);
    } catch (error: any) {
      toast({
        title: 'خطأ في الإرسال',
        description: 'حدث خطأ أثناء إرسال الرد. يرجى المحاولة مرة أخرى.',
        variant: 'destructive'
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
            {isFollowUp ? 'رد متابعة على الاستشارة' : 'رد على الاستشارة'}
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
              <div className="mt-2 text-xs text-gray-500">
                الحالة: {consultation.status === 'pending' ? 'في الانتظار' : consultation.status === 'reviewed' ? 'تمت المراجعة' : 'مكتملة'}
              </div>
            </div>

            <div className="flex items-center space-x-2 space-x-reverse">
              <Checkbox
                id="followUp"
                checked={isFollowUp}
                onCheckedChange={(checked) => setIsFollowUp(checked as boolean)}
              />
              <Label htmlFor="followUp" className="flex items-center gap-2 cursor-pointer">
                <MessageCircle className="w-4 h-4" />
                هذا رد متابعة (لن يتم تغيير حالة الاستشارة)
              </Label>
            </div>

            <div className="space-y-2">
              <Label htmlFor="reply">
                {isFollowUp ? 'رد المتابعة:' : 'ردك على الاستشارة:'}
              </Label>
              <Textarea
                id="reply"
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                placeholder={isFollowUp ? 'اكتب رد المتابعة هنا...' : 'اكتب ردك هنا...'}
                className="min-h-[150px]"
                maxLength={2000}
              />
              <p className="text-sm text-gray-500 text-right">
                {reply.length}/2000 حرف
              </p>
            </div>

            {isFollowUp && (
              <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg">
                <p className="text-sm text-blue-700">
                  ملاحظة: هذا رد متابعة ولن يؤثر على حالة الاستشارة الحالية.
                  يمكنك إرسال عدة ردود متابعة حسب الحاجة.
                </p>
              </div>
            )}
          </div>
        )}

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
            <X className="w-4 h-4 mr-2" /> إلغاء
          </Button>
          <Button onClick={handleSendReply} disabled={isSubmitting || !reply.trim()} className="bg-[#1a365d] hover:bg-[#1a365d]/90">
            <Send className="w-4 h-4 mr-2" />
            {isSubmitting ? 'جاري الإرسال...' : (isFollowUp ? 'إرسال رد المتابعة' : 'إرسال الرد')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReplyDialog;
