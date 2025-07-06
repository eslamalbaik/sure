import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Bell, Eye, FileText, Users, Clock, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { formatDistanceToNow } from 'date-fns';
import { ar } from 'date-fns/locale';
import { Tables } from '@/integrations/supabase/types';

type Consultation = Tables<'consultations'>;

const AdminDashboard = () => {
  const { toast } = useToast();
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [filteredConsultations, setFilteredConsultations] = useState<Consultation[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'medical' | 'personal'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'reviewed' | 'completed'>('all');

  useEffect(() => {
    fetchConsultations();
    setupRealtimeListener();
  }, []);

  useEffect(() => {
    filterConsultations();
  }, [consultations, filter, statusFilter]);

  const fetchConsultations = async () => {
    try {
      const { data, error } = await supabase
        .from('consultations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setConsultations(data || []);
    } catch (error) {
      console.error('Error fetching consultations:', error);
      toast({
        title: "خطأ في تحميل البيانات",
        description: "حدث خطأ أثناء تحميل الاستشارات",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const setupRealtimeListener = () => {
    const channel = supabase
      .channel('consultations-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'consultations'
        },
        (payload) => {
          console.log('New consultation received:', payload);
          setConsultations(prev => [payload.new as Consultation, ...prev]);
          toast({
            title: "استشارة جديدة!",
            description: `تم استلام استشارة جديدة من ${payload.new.name}`,
          });
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'consultations'
        },
        (payload) => {
          setConsultations(prev => 
            prev.map(consultation => 
              consultation.id === payload.new.id 
                ? payload.new as Consultation 
                : consultation
            )
          );
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const filterConsultations = () => {
    let filtered = consultations;

    if (filter !== 'all') {
      filtered = filtered.filter(c => c.consultation_type === filter);
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(c => c.status === statusFilter);
    }

    setFilteredConsultations(filtered);
  };

  const updateConsultationStatus = async (id: string, status: 'pending' | 'reviewed' | 'completed') => {
    try {
      const { error } = await supabase
        .from('consultations')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "تم تحديث الحالة",
        description: "تم تحديث حالة الاستشارة بنجاح"
      });
    } catch (error) {
      console.error('Error updating consultation status:', error);
      toast({
        title: "خطأ في التحديث",
        description: "حدث خطأ أثناء تحديث الحالة",
        variant: "destructive"
      });
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { color: 'bg-yellow-100 text-yellow-800', text: 'في الانتظار' },
      reviewed: { color: 'bg-blue-100 text-blue-800', text: 'تمت المراجعة' },
      completed: { color: 'bg-green-100 text-green-800', text: 'مكتملة' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig];
    return (
      <Badge className={`${config.color} border-0`}>
        {config.text}
      </Badge>
    );
  };

  const getTypeIcon = (type: string) => {
    return type === 'medical' ? (
      <FileText className="w-4 h-4 text-blue-600" />
    ) : (
      <Users className="w-4 h-4 text-orange-600" />
    );
  };

  const stats = {
    total: consultations.length,
    pending: consultations.filter(c => c.status === 'pending').length,
    medical: consultations.filter(c => c.consultation_type === 'medical').length,
    personal: consultations.filter(c => c.consultation_type === 'personal').length,
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#1a365d]"></div>
          <p className="mt-4 text-lg">جاري تحميل البيانات...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6" dir="rtl">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#1a365d] mb-2">لوحة تحكم الإدارة</h1>
          <p className="text-gray-600">إدارة الاستشارات الواردة</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">إجمالي الاستشارات</p>
                  <p className="text-2xl font-bold text-[#1a365d]">{stats.total}</p>
                </div>
                <FileText className="w-8 h-8 text-[#1a365d]" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">في الانتظار</p>
                  <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
                </div>
                <Clock className="w-8 h-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">استشارات طبية</p>
                  <p className="text-2xl font-bold text-blue-600">{stats.medical}</p>
                </div>
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">استشارات شخصية</p>
                  <p className="text-2xl font-bold text-orange-600">{stats.personal}</p>
                </div>
                <Users className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex gap-4 mb-6">
          <Select value={filter} onValueChange={(value: any) => setFilter(value)}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="تصفية حسب النوع" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">جميع الأنواع</SelectItem>
              <SelectItem value="medical">استشارات طبية</SelectItem>
              <SelectItem value="personal">استشارات شخصية</SelectItem>
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={(value: any) => setStatusFilter(value)}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="تصفية حسب الحالة" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">جميع الحالات</SelectItem>
              <SelectItem value="pending">في الانتظار</SelectItem>
              <SelectItem value="reviewed">تمت المراجعة</SelectItem>
              <SelectItem value="completed">مكتملة</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Consultations List */}
        <div className="space-y-4">
          {filteredConsultations.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-gray-500">لا توجد استشارات متاحة</p>
              </CardContent>
            </Card>
          ) : (
            filteredConsultations.map((consultation) => (
              <Card key={consultation.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {getTypeIcon(consultation.consultation_type)}
                      <div>
                        <h3 className="font-semibold text-lg">{consultation.name}</h3>
                        <p className="text-sm text-gray-600">{consultation.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {getStatusBadge(consultation.status)}
                      <Badge variant="outline">
                        {consultation.consultation_type === 'medical' ? 'طبية' : 'شخصية'}
                      </Badge>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-gray-700 leading-relaxed">{consultation.message}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateConsultationStatus(consultation.id, 'reviewed')}
                        disabled={consultation.status === 'reviewed'}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        تمت المراجعة
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateConsultationStatus(consultation.id, 'completed')}
                        disabled={consultation.status === 'completed'}
                      >
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        مكتملة
                      </Button>
                    </div>
                    <p className="text-sm text-gray-500">
                      {formatDistanceToNow(new Date(consultation.created_at), { 
                        addSuffix: true, 
                        locale: ar 
                      })}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
