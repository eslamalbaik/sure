
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Bell, Eye, FileText, Users, Clock, CheckCircle2, Reply, Search, Filter, Trash2, User, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { formatDistanceToNow } from 'date-fns';
import { ar } from 'date-fns/locale';
import { Tables } from '@/integrations/supabase/types';
import ReplyDialog from '@/components/ReplyDialog';
import AdminProfile from '@/components/AdminProfile';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

type Consultation = Tables<'consultations'>;

const AdminDashboard = () => {
  const { toast } = useToast();
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [filteredConsultations, setFilteredConsultations] = useState<Consultation[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'medical' | 'personal'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'reviewed' | 'completed'>('all');
  const [replyDialogOpen, setReplyDialogOpen] = useState(false);
  const [selectedConsultation, setSelectedConsultation] = useState<Consultation | null>(null);
  const [selectedConsultations, setSelectedConsultations] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'consultations' | 'profile'>('dashboard');

  useEffect(() => {
    fetchConsultations();
    setupRealtimeListener();
  }, []);

  useEffect(() => {
    filterConsultations();
  }, [consultations, searchTerm, filterType, filterStatus]);

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

    // تصفية حسب البحث
    if (searchTerm) {
      filtered = filtered.filter(c => 
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.message.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // تصفية حسب النوع
    if (filterType !== 'all') {
      filtered = filtered.filter(c => c.consultation_type === filterType);
    }

    // تصفية حسب الحالة
    if (filterStatus !== 'all') {
      filtered = filtered.filter(c => c.status === filterStatus);
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

  const deleteConsultations = async (ids: string[]) => {
    try {
      const { error } = await supabase
        .from('consultations')
        .delete()
        .in('id', ids);

      if (error) throw error;

      toast({
        title: "تم الحذف",
        description: `تم حذف ${ids.length} استشارة بنجاح`
      });

      setSelectedConsultations([]);
    } catch (error) {
      console.error('Error deleting consultations:', error);
      toast({
        title: "خطأ في الحذف",
        description: "حدث خطأ أثناء حذف الاستشارات",
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

  const openReplyDialog = (consultation: Consultation) => {
    setSelectedConsultation(consultation);
    setReplyDialogOpen(true);
  };

  // إحصائيات للرسوم البيانية
  const chartData = consultations.reduce((acc, consultation) => {
    const month = new Date(consultation.created_at).toLocaleDateString('ar-SA', { month: 'long' });
    const existing = acc.find(item => item.month === month);
    if (existing) {
      existing.count += 1;
    } else {
      acc.push({ month, count: 1 });
    }
    return acc;
  }, [] as Array<{ month: string; count: number }>);

  const pieData = [
    { name: 'طبية', value: consultations.filter(c => c.consultation_type === 'medical').length },
    { name: 'شخصية', value: consultations.filter(c => c.consultation_type === 'personal').length }
  ];

  const COLORS = ['#1a365d', '#f7b731'];

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
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-[#1a365d]">لوحة تحكم الإدارة</h1>
            <div className="flex gap-4">
              <Button
                variant={activeTab === 'dashboard' ? 'default' : 'outline'}
                onClick={() => setActiveTab('dashboard')}
                className="flex items-center gap-2"
              >
                <FileText className="w-4 h-4" />
                الإحصائيات
              </Button>
              <Button
                variant={activeTab === 'consultations' ? 'default' : 'outline'}
                onClick={() => setActiveTab('consultations')}
                className="flex items-center gap-2"
              >
                <Users className="w-4 h-4" />
                الاستشارات
              </Button>
              <Button
                variant={activeTab === 'profile' ? 'default' : 'outline'}
                onClick={() => setActiveTab('profile')}
                className="flex items-center gap-2"
              >
                <User className="w-4 h-4" />
                الملف الشخصي
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>الاستشارات الشهرية</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="count" fill="#1a365d" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>توزيع أنواع الاستشارات</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'consultations' && (
          <div className="space-y-6">
            {/* Filters */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="البحث بالاسم أو الإيميل أو المحتوى..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pr-10"
                      />
                    </div>
                  </div>
                  
                  <Select value={filterType} onValueChange={(value: any) => setFilterType(value)}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="تصفية حسب النوع" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">جميع الأنواع</SelectItem>
                      <SelectItem value="medical">استشارات طبية</SelectItem>
                      <SelectItem value="personal">استشارات شخصية</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={filterStatus} onValueChange={(value: any) => setFilterStatus(value)}>
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

                  {selectedConsultations.length > 0 && (
                    <Button
                      variant="destructive"
                      onClick={() => deleteConsultations(selectedConsultations)}
                      className="flex items-center gap-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      حذف المحدد ({selectedConsultations.length})
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Consultations Table */}
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-center">
                        <input
                          type="checkbox"
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedConsultations(filteredConsultations.map(c => c.id));
                            } else {
                              setSelectedConsultations([]);
                            }
                          }}
                          checked={selectedConsultations.length === filteredConsultations.length && filteredConsultations.length > 0}
                        />
                      </TableHead>
                      <TableHead>الاسم</TableHead>
                      <TableHead>البريد الإلكتروني</TableHead>
                      <TableHead>النوع</TableHead>
                      <TableHead>الحالة</TableHead>
                      <TableHead>التاريخ</TableHead>
                      <TableHead>الإجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredConsultations.map((consultation) => (
                      <TableRow key={consultation.id}>
                        <TableCell className="text-center">
                          <input
                            type="checkbox"
                            checked={selectedConsultations.includes(consultation.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedConsultations(prev => [...prev, consultation.id]);
                              } else {
                                setSelectedConsultations(prev => prev.filter(id => id !== consultation.id));
                              }
                            }}
                          />
                        </TableCell>
                        <TableCell className="font-medium">{consultation.name}</TableCell>
                        <TableCell>{consultation.email}</TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {consultation.consultation_type === 'medical' ? 'طبية' : 'شخصية'}
                          </Badge>
                        </TableCell>
                        <TableCell>{getStatusBadge(consultation.status)}</TableCell>
                        <TableCell className="text-sm text-gray-500">
                          {formatDistanceToNow(new Date(consultation.created_at), { 
                            addSuffix: true, 
                            locale: ar 
                          })}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button size="sm" variant="outline">
                                  <Eye className="w-4 h-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl" dir="rtl">
                                <DialogHeader>
                                  <DialogTitle>تفاصيل الاستشارة</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <div>
                                    <strong>الاسم:</strong> {consultation.name}
                                  </div>
                                  <div>
                                    <strong>البريد الإلكتروني:</strong> {consultation.email}
                                  </div>
                                  <div>
                                    <strong>نوع الاستشارة:</strong> {consultation.consultation_type === 'medical' ? 'طبية' : 'شخصية'}
                                  </div>
                                  <div>
                                    <strong>الرسالة:</strong>
                                    <p className="mt-2 p-4 bg-gray-50 rounded-lg">{consultation.message}</p>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>

                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => openReplyDialog(consultation)}
                              disabled={consultation.status === 'completed'}
                              className="bg-[#1a365d] text-white hover:bg-[#1a365d]/90"
                            >
                              <Reply className="w-4 h-4" />
                            </Button>

                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateConsultationStatus(consultation.id, 'completed')}
                              disabled={consultation.status === 'completed'}
                            >
                              <CheckCircle2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {filteredConsultations.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    لا توجد استشارات متاحة
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'profile' && <AdminProfile />}
      </div>

      <ReplyDialog
        consultation={selectedConsultation}
        open={replyDialogOpen}
        onOpenChange={setReplyDialogOpen}
      />
    </div>
  );
};

export default AdminDashboard;
