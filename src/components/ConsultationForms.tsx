
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, UserPlus, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ConsultationForms = () => {
  const { toast } = useToast();
  const [existingClientForm, setExistingClientForm] = useState({
    name: '',
    fileNumber: '',
    mobile: '',
    question: ''
  });

  const [newClientForm, setNewClientForm] = useState({
    name: '',
    mobile: '',
    email: '',
    question: ''
  });

  const handleExistingClientSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Existing client consultation:', existingClientForm);
    toast({
      title: "Consultation Submitted",
      description: "Your consultation request has been received. We will contact you soon.",
    });
    setExistingClientForm({ name: '', fileNumber: '', mobile: '', question: '' });
  };

  const handleNewClientSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('New client consultation:', newClientForm);
    toast({
      title: "Consultation Submitted",
      description: "Your consultation request has been received. We will contact you soon.",
    });
    setNewClientForm({ name: '', mobile: '', email: '', question: '' });
  };

  return (
    <section id="consultation" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-purple mb-4">Request Consultation</h2>
            <p className="text-xl text-gray-600">
              Choose the appropriate form based on your current status with our clinic
            </p>
          </div>

          <Tabs defaultValue="existing" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="existing" className="flex items-center space-x-2">
                <Users className="w-4 h-4" />
                <span>Existing Clients</span>
              </TabsTrigger>
              <TabsTrigger value="new" className="flex items-center space-x-2">
                <UserPlus className="w-4 h-4" />
                <span>New Clients</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="existing">
              <Card className="shadow-xl">
                <CardHeader className="bg-purple text-white rounded-t-lg">
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="w-5 h-5" />
                    <span>Existing Client Consultation</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <form onSubmit={handleExistingClientSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="existing-name">Full Name *</Label>
                        <Input
                          id="existing-name"
                          value={existingClientForm.name}
                          onChange={(e) => setExistingClientForm({ ...existingClientForm, name: e.target.value })}
                          required
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="file-number">File Number *</Label>
                        <Input
                          id="file-number"
                          value={existingClientForm.fileNumber}
                          onChange={(e) => setExistingClientForm({ ...existingClientForm, fileNumber: e.target.value })}
                          required
                          className="mt-2"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="existing-mobile">Mobile Number *</Label>
                      <Input
                        id="existing-mobile"
                        type="tel"
                        value={existingClientForm.mobile}
                        onChange={(e) => setExistingClientForm({ ...existingClientForm, mobile: e.target.value })}
                        required
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="existing-question">Your Question/Concern *</Label>
                      <Textarea
                        id="existing-question"
                        value={existingClientForm.question}
                        onChange={(e) => setExistingClientForm({ ...existingClientForm, question: e.target.value })}
                        required
                        rows={4}
                        maxLength={500}
                        className="mt-2"
                        placeholder="Please describe your medical question or concern (maximum 4-5 lines)"
                      />
                      <p className="text-sm text-gray-500 mt-2">
                        {existingClientForm.question.length}/500 characters
                      </p>
                    </div>
                    <Button type="submit" className="w-full bg-purple hover:bg-purple/90 text-white py-3">
                      <Send className="w-4 h-4 mr-2" />
                      Submit Consultation Request
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="new">
              <Card className="shadow-xl">
                <CardHeader className="bg-gold text-white rounded-t-lg">
                  <CardTitle className="flex items-center space-x-2">
                    <UserPlus className="w-5 h-5" />
                    <span>New Client Consultation</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <form onSubmit={handleNewClientSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="new-name">Full Name *</Label>
                        <Input
                          id="new-name"
                          value={newClientForm.name}
                          onChange={(e) => setNewClientForm({ ...newClientForm, name: e.target.value })}
                          required
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="new-mobile">Mobile Number *</Label>
                        <Input
                          id="new-mobile"
                          type="tel"
                          value={newClientForm.mobile}
                          onChange={(e) => setNewClientForm({ ...newClientForm, mobile: e.target.value })}
                          required
                          className="mt-2"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="new-email">Email Address *</Label>
                      <Input
                        id="new-email"
                        type="email"
                        value={newClientForm.email}
                        onChange={(e) => setNewClientForm({ ...newClientForm, email: e.target.value })}
                        required
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="new-question">Your Question/Concern *</Label>
                      <Textarea
                        id="new-question"
                        value={newClientForm.question}
                        onChange={(e) => setNewClientForm({ ...newClientForm, question: e.target.value })}
                        required
                        rows={4}
                        maxLength={500}
                        className="mt-2"
                        placeholder="Please describe your medical question or concern (maximum 4-5 lines)"
                      />
                      <p className="text-sm text-gray-500 mt-2">
                        {newClientForm.question.length}/500 characters
                      </p>
                    </div>
                    <Button type="submit" className="w-full bg-gold hover:bg-gold/90 text-white py-3">
                      <Send className="w-4 h-4 mr-2" />
                      Submit Consultation Request
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

export default ConsultationForms;
