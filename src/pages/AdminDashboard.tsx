import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Bell, 
  Eye, 
  FileText, 
  Users, 
  Clock, 
  CheckCircle2, 
  Reply, 
  Search, 
  Filter, 
  Trash2, 
  User, 
  Settings, 
  RotateCcw,
  LogOut,
  Menu,
  Home,
  MessageSquare,
  BarChart3
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { formatDistanceToNow } from 'date-fns';
import { ar } from 'date-fns/locale';
import { Tables } from '@/integrations/supabase/types';
import ReplyDialog from '@/components/ReplyDialog';
import AdminProfile from '@/components/AdminProfile';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger, useSidebar } from '@/components/ui/sidebar';
import { useAdminAuth } from '@/hooks/useAdminAuth';

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
  const [deleting, setDeleting] = useState(false);

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
      .on(
        'postgres_changes',
        {
          event: 'DELETE',
          schema: 'public',
          table: 'consultations'
        },
        (payload) => {
          setConsultations(prev => 
            prev.filter(consultation => consultation.id !== payload.old.id)
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

    if (searchTerm) {
      filtered = filtered.filter(c => 
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.message.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterType !== 'all') {
      filtered = filtered.filter(c => c.consultation_type === filterType);
    }

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
    if (deleting) return;
    
    setDeleting(true);
    try {
      const { error } = await supabase
        .from('consultations')
        .delete()
        .in('id', ids);

      if (error) throw error;

      toast({
        title: "تم الحذف النهائي",
        description: `تم حذف ${ids.length} استشارة نهائياً`,
      });

      setSelectedConsultations([]);
      
      // تحديث القائمة محلياً
      setConsultations(prev => prev.filter(c => !ids.includes(c.id)));
    } catch (error) {
      console.error('Error deleting consultations:', error);
      toast({
        title: "خطأ في الحذف",
        description: "حدث خطأ أثناء حذف الاستشارات",
        variant: "destructive"
      });
    } finally {
      setDeleting(false);
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
  const { handleLogout } = useAdminAuth();

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
    <SidebarProvider>
      <div className="min-h-screen bg-gray-50 flex w-full" dir="rtl">
        
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="bg-white shadow-sm border-b">
            <div className="w-full px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <SidebarTrigger className="md:hidden" />
                  <h1 className="text-xl sm:text-2xl font-bold text-[#1a365d]">لوحة تحكم الإدارة</h1>
                </div>
                <div className="flex flex-wrap gap-2 sm:gap-4">
                  <Button
                    variant={activeTab === 'dashboard' ? 'default' : 'outline'}
                    onClick={() => setActiveTab('dashboard')}
                    className="flex items-center gap-2 text-xs sm:text-sm"
                    size="sm"
                  >
                    <FileText className="w-3 h-3 sm:w-4 sm:h-4" />
                    الإحصائيات
                  </Button>
                  
                  <Button
                    variant={activeTab === 'consultations' ? 'default' : 'outline'}
                    onClick={() => setActiveTab('consultations')}
                    className="flex items-center gap-2 text-xs sm:text-sm"
                    size="sm"
                  >
                    <Users className="w-3 h-3 sm:w-4 sm:h-4" />
                    الاستشارات
                  </Button>
                  <Button
                    variant={activeTab === 'profile' ? 'default' : 'outline'}
                    onClick={() => setActiveTab('profile')}
                    className="flex items-center gap-2 text-xs sm:text-sm"
                    size="sm"
                  >
                    <User className="w-3 h-3 sm:w-4 sm:h-4" />
                    الملف الشخصي
                  </Button>
                  <Button 
          variant="outline" 
          className=" justify-start gap-2 text-red-600 border-red-200 hover:bg-red-50"
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4" />
          تسجيل الخروج
        </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                  <Card>
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">إجمالي الاستشارات</p>
                          <p className="text-xl sm:text-2xl font-bold text-[#1a365d]">{stats.total}</p>
                        </div>
                        <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-[#1a365d]" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">في الانتظار</p>
                          <p className="text-xl sm:text-2xl font-bold text-yellow-600">{stats.pending}</p>
                        </div>
                        <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-600" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">استشارات طبية</p>
                          <p className="text-xl sm:text-2xl font-bold text-blue-600">{stats.medical}</p>
                        </div>
                        <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">استشارات شخصية</p>
                          <p className="text-xl sm:text-2xl font-bold text-orange-600">{stats.personal}</p>
                        </div>
                        <Users className="w-6 h-6 sm:w-8 sm:h-8 text-orange-600" />
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
                  <CardContent className="p-4 sm:p-6">
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
                        <SelectTrigger className="w-full md:w-48">
                          <SelectValue placeholder="تصفية حسب النوع" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">جميع الأنواع</SelectItem>
                          <SelectItem value="medical">استشارات طبية</SelectItem>
                          <SelectItem value="personal">استشارات شخصية</SelectItem>
                        </SelectContent>
                      </Select>

                      <Select value={filterStatus} onValueChange={(value: any) => setFilterStatus(value)}>
                        <SelectTrigger className="w-full md:w-48">
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
                          disabled={deleting}
                          className="flex items-center gap-2 w-full md:w-auto"
                        >
                          <Trash2 className="w-4 h-4" />
                          {deleting ? 'جاري الحذف...' : `حذف نهائي (${selectedConsultations.length})`}
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Consultations Table */}
                <Card>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-center w-12">
                              <input
                                type="checkbox"
                                checked={selectedConsultations.length === filteredConsultations.length && filteredConsultations.length > 0}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setSelectedConsultations(filteredConsultations.map(c => c.id));
                                  } else {
                                    setSelectedConsultations([]);
                                  }
                                }}
                                className="rounded"
                              />
                            </TableHead>
                            <TableHead className="text-right">الاسم</TableHead>
                            <TableHead className="text-right hidden sm:table-cell">النوع</TableHead>
                            <TableHead className="text-right hidden md:table-cell">الحالة</TableHead>
                            <TableHead className="text-right hidden lg:table-cell">التاريخ</TableHead>
                            <TableHead className="text-center">الإجراءات</TableHead>
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
                                      setSelectedConsultations([...selectedConsultations, consultation.id]);
                                    } else {
                                      setSelectedConsultations(selectedConsultations.filter(id => id !== consultation.id));
                                    }
                                  }}
                                  className="rounded"
                                />
                              </TableCell>
                              <TableCell>
                                <div>
                                  <div className="font-medium">{consultation.name}</div>
                                  <div className="text-sm text-gray-500 truncate max-w-[200px]">{consultation.email}</div>
                                </div>
                              </TableCell>
                              <TableCell className="hidden sm:table-cell">
                                <Badge variant={consultation.consultation_type === 'medical' ? 'default' : 'secondary'}>
                                  {consultation.consultation_type === 'medical' ? 'طبية' : 'شخصية'}
                                </Badge>
                              </TableCell>
                              <TableCell className="hidden md:table-cell">
                                {getStatusBadge(consultation.status)}
                              </TableCell>
                              <TableCell className="hidden lg:table-cell text-sm text-gray-600">
                                {formatDistanceToNow(new Date(consultation.created_at), { addSuffix: true, locale: ar })}
                              </TableCell>
                              <TableCell>
                                <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2">
                                  <Dialog>
                                    <DialogTrigger asChild>
                                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                                        <Eye className="w-3 h-3" />
                                        <span className="hidden sm:inline">عرض</span>
                                      </Button>
                                    </DialogTrigger>
                                    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto" dir="rtl">
                                      <DialogHeader>
                                        <DialogTitle>تفاصيل الاستشارة</DialogTitle>
                                      </DialogHeader>
                                      <div className="space-y-4">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                          <div>
                                            <label className="text-sm font-medium">الاسم:</label>
                                            <p className="text-sm">{consultation.name}</p>
                                          </div>
                                          <div>
                                            <label className="text-sm font-medium">البريد الإلكتروني:</label>
                                            <p className="text-sm">{consultation.email}</p>
                                          </div>
                                          <div>
                                            <label className="text-sm font-medium">نوع الاستشارة:</label>
                                            <p className="text-sm">
                                              {consultation.consultation_type === 'medical' ? 'طبية' : 'شخصية'}
                                            </p>
                                          </div>
                                          <div>
                                            <label className="text-sm font-medium">الحالة:</label>
                                            <div className="mt-1">
                                              {getStatusBadge(consultation.status)}
                                            </div>
                                          </div>
                                        </div>
                                        <div>
                                          <label className="text-sm font-medium">الرسالة:</label>
                                          <p className="text-sm mt-1 p-3 bg-gray-50 rounded-md whitespace-pre-wrap">
                                            {consultation.message}
                                          </p>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600">
                                          <div>
                                            <label className="font-medium">تاريخ الإنشاء:</label>
                                            <p>{new Date(consultation.created_at).toLocaleString('ar-SA')}</p>
                                          </div>
                                          <div>
                                            <label className="font-medium">آخر تحديث:</label>
                                            <p>{new Date(consultation.updated_at).toLocaleString('ar-SA')}</p>
                                          </div>
                                        </div>
                                      </div>
                                    </DialogContent>
                                  </Dialog>

                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => openReplyDialog(consultation)}
                                    className="flex items-center gap-1"
                                  >
                                    <Reply className="w-3 h-3" />
                                    <span className="hidden sm:inline">رد</span>
                                  </Button>

                                  <Select
                                    value={consultation.status}
                                    onValueChange={(value) => updateConsultationStatus(consultation.id, value as any)}
                                  >
                                    <SelectTrigger className="w-16 sm:w-24 h-8">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="pending">انتظار</SelectItem>
                                      <SelectItem value="reviewed">مراجعة</SelectItem>
                                      <SelectItem value="completed">مكتملة</SelectItem>
                                    </SelectContent>
                                  </Select>

                                  <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => deleteConsultations([consultation.id])}
                                    disabled={deleting}
                                    className="flex items-center gap-1"
                                  >
                                    <Trash2 className="w-3 h-3" />
                                    <span className="hidden sm:inline">حذف</span>
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'profile' && (
              <AdminProfile />
            )}
          </div>
        </div>

        {selectedConsultation && (
          <ReplyDialog
            consultation={selectedConsultation}
            open={replyDialogOpen}
            onOpenChange={setReplyDialogOpen}
          />
        )}
      </div>
    </SidebarProvider>
  );
};

export default AdminDashboard;