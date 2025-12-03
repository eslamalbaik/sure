/**
 * React Form Example for Zoho CRM Integration
 * This is a complete example showing how to submit form data to Zoho CRM
 */

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { submitToZoho, ZohoFormData } from '@/utils/zohoApi';
import { Send, Loader2, CheckCircle2 } from 'lucide-react';

const ZohoFormExample = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState<ZohoFormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
    module: 'Leads',
    leadSource: 'Website Form',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setIsSuccess(false);

    try {
      // Submit to Zoho CRM via backend
      const response = await submitToZoho(formData);

      if (response.success) {
        setIsSuccess(true);
        
        toast({
          title: "Success!",
          description: response.message || "Form submitted successfully to Zoho CRM",
        });

        // Reset form after successful submission
        setTimeout(() => {
          setFormData({
            name: '',
            email: '',
            phone: '',
            message: '',
            module: 'Leads',
            leadSource: 'Website Form',
          });
          setIsSuccess(false);
        }, 3000);
      } else {
        throw new Error(response.error || 'Submission failed');
      }
    } catch (error: any) {
      console.error('Error submitting form:', error);
      
      toast({
        title: "Submission Failed",
        description: error.message || "An error occurred while submitting the form. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Contact Form - Zoho CRM Integration</CardTitle>
          <CardDescription>
            Fill out the form below to submit your information to Zoho CRM
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div className="space-y-2">
              <Label htmlFor="name">
                Full Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter your full name"
                required
                disabled={isSubmitting}
                className="h-11"
              />
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email">
                Email <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="your.email@example.com"
                required
                disabled={isSubmitting}
                className="h-11"
              />
            </div>

            {/* Phone Field */}
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+1234567890"
                disabled={isSubmitting}
                className="h-11"
              />
            </div>

            {/* Message Field */}
            <div className="space-y-2">
              <Label htmlFor="message">
                Message <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Enter your message or inquiry..."
                required
                disabled={isSubmitting}
                rows={5}
                className="resize-none"
              />
            </div>

            {/* Module Selection */}
            <div className="space-y-2">
              <Label htmlFor="module">Record Type</Label>
              <select
                id="module"
                value={formData.module}
                onChange={(e) => setFormData({ ...formData, module: e.target.value as 'Leads' | 'Contacts' })}
                disabled={isSubmitting}
                className="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="Leads">Lead</option>
                <option value="Contacts">Contact</option>
              </select>
            </div>

            {/* Lead Source */}
            <div className="space-y-2">
              <Label htmlFor="leadSource">Lead Source</Label>
              <Input
                id="leadSource"
                type="text"
                value={formData.leadSource}
                onChange={(e) => setFormData({ ...formData, leadSource: e.target.value })}
                placeholder="Website Form"
                disabled={isSubmitting}
                className="h-11"
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting || isSuccess}
              className="w-full h-12 text-base font-semibold"
              size="lg"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Submitting...
                </>
              ) : isSuccess ? (
                <>
                  <CheckCircle2 className="mr-2 h-5 w-5" />
                  Submitted Successfully!
                </>
              ) : (
                <>
                  <Send className="mr-2 h-5 w-5" />
                  Submit to Zoho CRM
                </>
              )}
            </Button>
          </form>

          {/* Success Message */}
          {isSuccess && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-md">
              <p className="text-sm text-green-800">
                ✓ Your form has been successfully submitted to Zoho CRM!
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ZohoFormExample;

