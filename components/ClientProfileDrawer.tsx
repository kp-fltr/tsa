import { useState, useEffect } from 'react';
import { X, Edit3, Save, ArrowLeft, MoreVertical, User, Mail, Calendar, FileText, Activity, Check, Pencil } from 'lucide-react';
import { clientApi, ClientProfile, ActivityLogEntry, UpdateClientData } from '../services/clientApi';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Skeleton } from './ui/skeleton';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Calendar as CalendarComponent } from './ui/calendar';
import { toast } from 'sonner';

interface ClientProfileDrawerProps {
  open: boolean;
  clientId: string | null;
  onClose: () => void;
}

export function ClientProfileDrawer({ open, clientId, onClose }: ClientProfileDrawerProps) {
  const [client, setClient] = useState<ClientProfile | null>(null);
  const [activity, setActivity] = useState<ActivityLogEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [formData, setFormData] = useState<UpdateClientData>({});
  const [saving, setSaving] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 992);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Fetch client data when drawer opens
  useEffect(() => {
    if (open && clientId) {
      loadClientData();
    }
  }, [open, clientId]);

  // Handle ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        handleClose();
      }
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [open, editingField]);

  const loadClientData = async () => {
    if (!clientId) return;
    
    setLoading(true);
    try {
      const [clientData, activityData] = await Promise.all([
        clientApi.getClientProfile(clientId),
        clientApi.getClientActivity(clientId)
      ]);
      
      setClient(clientData);
      setActivity(activityData);
      
      if (clientData) {
        setFormData({
          name: clientData.name,
          email: clientData.email,
          assessmentStatus: clientData.assessmentStatus,
          sustainabilityAppetite: clientData.sustainabilityAppetite,
          sustainabilityProfile: clientData.sustainabilityProfile,
          latestAssessmentDate: clientData.latestAssessmentDate,
          nextAssessmentDate: clientData.nextAssessmentDate,
          notes: clientData.notes
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (fieldName: string) => {
    setEditingField(fieldName);
  };

  const handleCancelEdit = () => {
    if (client) {
      setFormData({
        name: client.name,
        email: client.email,
        assessmentStatus: client.assessmentStatus,
        sustainabilityAppetite: client.sustainabilityAppetite,
        sustainabilityProfile: client.sustainabilityProfile,
        latestAssessmentDate: client.latestAssessmentDate,
        nextAssessmentDate: client.nextAssessmentDate,
        notes: client.notes
      });
    }
    setEditingField(null);
  };

  const handleSaveField = async (fieldName: string) => {
    if (!clientId || !client) return;

    setSaving(true);
    try {
      const updateData = { [fieldName]: formData[fieldName as keyof UpdateClientData] };
      const success = await clientApi.updateClientProfile(clientId, updateData);
      
      if (success) {
        // Update local state
        setClient(prev => prev ? { ...prev, ...updateData } : null);
        setEditingField(null);
        // Reload activity to show the update
        const updatedActivity = await clientApi.getClientActivity(clientId);
        setActivity(updatedActivity);
      }
    } finally {
      setSaving(false);
    }
  };

  const handleClose = () => {
    if (editingField) {
      // Ask for confirmation if editing
      if (window.confirm('You have unsaved changes. Are you sure you want to close?')) {
        setEditingField(null);
        onClose();
      }
    } else {
      onClose();
    }
  };

  const handleDelete = async () => {
    if (!clientId) return;
    
    const success = await clientApi.deleteClient(clientId);
    if (success) {
      onClose();
      // Parent component should refresh the client list
    }
  };

  const getStatusColor = (status: ClientProfile['assessmentStatus']) => {
    switch (status) {
      case 'Updated': return 'bg-chart-2/10 text-chart-2';
      case 'Outstanding': return 'bg-chart-3/10 text-chart-3';
      case 'Overdue': return 'bg-chart-4/10 text-chart-4';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatDateForInput = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  const formatDateFromInput = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  const formatDateForDisplay = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 transition-opacity profile-drawer-backdrop"
        onClick={handleClose}
      />
      
      {/* Drawer */}
      <div className={`
        fixed inset-y-0 right-0 flex max-w-full
        ${isMobile ? 'left-0' : 'max-w-[840px]'}
      `}>
        <div className={`
          w-full transform bg-card shadow-xl transition-all flex flex-col h-full
          ${isMobile ? 'w-screen' : 'w-[780px]'}
        `}>
          {/* Mobile Header */}
          {isMobile && (
            <div className="sticky top-0 z-10 bg-card border-b border-border px-4 py-3 safe-area-top">
              <div className="flex items-center gap-3 min-h-[44px]">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClose}
                  className="min-h-[44px] min-w-[44px] p-0"
                >
                  <ArrowLeft className="w-5 h-5" />
                </Button>
                
                <div className="flex-1 min-w-0">
                  <h2 className="text-h5 truncate">
                    {loading ? 'Loading...' : client?.name || 'Client Profile'}
                  </h2>
                </div>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="min-h-[44px] min-w-[44px] p-0"
                    >
                      <MoreVertical className="w-5 h-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View Full History</DropdownMenuItem>
                    <DropdownMenuItem>Send Message</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <DropdownMenuItem 
                          className="text-destructive focus:text-destructive"
                          onSelect={(e) => e.preventDefault()}
                        >
                          Remove Client
                        </DropdownMenuItem>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Remove Client</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the client and all associated data.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction 
                            onClick={handleDelete}
                            className="bg-destructive hover:bg-destructive/90"
                          >
                            Remove Client
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          )}

          {/* Desktop Header */}
          {!isMobile && (
            <div className="sticky top-0 z-10 bg-card border-b border-border px-6 py-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3 flex-1">
                  {loading ? (
                    <Skeleton className="w-12 h-12 rounded-full" />
                  ) : (
                    <Avatar className="w-12 h-12">
                      <AvatarFallback className="bg-muted text-foreground text-lg font-semibold">
                        {client?.name.charAt(0) || '?'}
                      </AvatarFallback>
                    </Avatar>
                  )}
                  
                  <div className="min-w-0 flex-1">
                    {loading ? (
                      <>
                        <Skeleton className="h-6 w-32 mb-1" />
                        <Skeleton className="h-4 w-24" />
                      </>
                    ) : (
                      <>
                        <h2 className="text-h4">{client?.name}</h2>
                        {client && (
                          <Badge className={getStatusColor(client.assessmentStatus)}>
                            {client.assessmentStatus}
                          </Badge>
                        )}
                      </>
                    )}
                  </div>
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClose}
                  className="min-h-[44px] min-w-[44px] p-0"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>
          )}

          {/* Content */}
          <div className={`
            flex-1 overflow-y-auto overscroll-contain drawer-scroll
            ${isMobile ? 'px-4 py-4 pb-20 safe-area-bottom' : 'p-0'}
          `}>
            {loading ? (
              <div className="p-6 space-y-6">
                <ProfileSkeleton />
              </div>
            ) : client ? (
              <div className={`
                ${isMobile ? 'space-y-6' : 'flex min-h-0'}
              `}>
                {/* Desktop Layout - Two Columns */}
                {!isMobile && (
                  <>
                    {/* Left Column - Details (66%) */}
                    <div className="flex-1 overflow-y-auto drawer-scroll p-6 pr-3">
                      <ProfileDetails 
                        client={client} 
                        activity={activity} 
                        formatDate={formatDate} 
                        editingField={editingField}
                        formData={formData}
                        setFormData={setFormData}
                        onEdit={handleEdit}
                        onSave={handleSaveField}
                        onCancel={handleCancelEdit}
                        saving={saving}
                        formatDateForInput={formatDateForInput}
                        formatDateFromInput={formatDateFromInput}
                      />
                    </div>
                    
                    {/* Right Column - Quick Actions (34%) */}
                    <div className="w-80 border-l border-border overflow-y-auto drawer-scroll p-6 pl-3">
                      <QuickActions client={client} />
                    </div>
                  </>
                )}

                {/* Mobile Layout - Single Column */}
                {isMobile && (
                  <div className="space-y-6">
                    <ProfileDetails 
                      client={client} 
                      activity={activity} 
                      formatDate={formatDate}
                      editingField={editingField}
                      formData={formData}
                      setFormData={setFormData}
                      onEdit={handleEdit}
                      onSave={handleSaveField}
                      onCancel={handleCancelEdit}
                      saving={saving}
                      formatDateForInput={formatDateForInput}
                      formatDateFromInput={formatDateFromInput}
                    />
                    <div className="pt-2">
                      <QuickActions client={client} />
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-center h-64">
                <p className="text-muted-foreground">Client not found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function EditableField({
  label,
  value,
  fieldName,
  editingField,
  formData,
  setFormData,
  onEdit,
  onSave,
  onCancel,
  saving,
  type = 'text',
  options = [],
  formatDateForInput,
  formatDateFromInput
}: {
  label: string;
  value: string;
  fieldName: string;
  editingField: string | null;
  formData: UpdateClientData;
  setFormData: (data: UpdateClientData) => void;
  onEdit: (field: string) => void;
  onSave: (field: string) => void;
  onCancel: () => void;
  saving: boolean;
  type?: 'text' | 'email' | 'select' | 'date' | 'textarea';
  options?: { value: string; label: string }[];
  formatDateForInput?: (date: string) => string;
  formatDateFromInput?: (date: string) => string;
}) {
  const isEditing = editingField === fieldName;
  const [datePickerOpen, setDatePickerOpen] = useState(false);

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      const formattedDate = date.toISOString().split('T')[0];
      setFormData({ ...formData, [fieldName]: formattedDate });
      setDatePickerOpen(false);
    }
  };

  return (
    <div className="space-y-2 group">
      <div className="flex items-center justify-between">
        <Label className="text-sm text-muted-foreground">{label}</Label>
        {!isEditing && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(fieldName)}
            className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-muted"
            title={`Edit ${label}`}
          >
            <Pencil className="w-3 h-3" />
          </Button>
        )}
      </div>
      
      {isEditing ? (
        <div className="space-y-2">
          {type === 'text' && (
            <Input
              value={formData[fieldName as keyof UpdateClientData] || ''}
              onChange={(e) => setFormData({ ...formData, [fieldName]: e.target.value })}
              className="min-h-[44px]"
              autoFocus
            />
          )}
          
          {type === 'email' && (
            <Input
              type="email"
              inputMode="email"
              value={formData[fieldName as keyof UpdateClientData] || ''}
              onChange={(e) => setFormData({ ...formData, [fieldName]: e.target.value })}
              className="min-h-[44px]"
              autoFocus
            />
          )}
          
          {type === 'select' && (
            <Select
              value={formData[fieldName as keyof UpdateClientData] as string}
              onValueChange={(value) => setFormData({ ...formData, [fieldName]: value })}
            >
              <SelectTrigger className="min-h-[44px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          
          {type === 'date' && (
            <Popover open={datePickerOpen} onOpenChange={setDatePickerOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="min-h-[44px] w-full justify-start text-left font-normal"
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  {formData[fieldName as keyof UpdateClientData] 
                    ? new Date(formData[fieldName as keyof UpdateClientData] as string).toLocaleDateString('en-US', { 
                        weekday: 'long',
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })
                    : <span>Pick a date</span>
                  }
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                  mode="single"
                  selected={formData[fieldName as keyof UpdateClientData] 
                    ? new Date(formData[fieldName as keyof UpdateClientData] as string) 
                    : undefined
                  }
                  onSelect={handleDateSelect}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          )}
          
          {type === 'textarea' && (
            <Textarea
              value={formData[fieldName as keyof UpdateClientData] || ''}
              onChange={(e) => setFormData({ ...formData, [fieldName]: e.target.value })}
              rows={4}
              className="min-h-[100px] resize-none"
              autoFocus
            />
          )}
          
          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={() => onSave(fieldName)}
              disabled={saving}
              className="flex items-center gap-1"
            >
              <Check className="w-3 h-3" />
              {saving ? 'Saving...' : 'Save'}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onCancel}
              disabled={saving}
            >
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <div className="group cursor-pointer" onClick={() => onEdit(fieldName)}>
          <p className="text-base py-2 pr-8 relative rounded px-2 -mx-2 hover:bg-muted/30 transition-colors">
            {type === 'date' && value 
              ? new Date(value).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })
              : value || <span className="text-muted-foreground italic">Click to set</span>
            }
          </p>
        </div>
      )}
    </div>
  );
}

function ProfileDetails({ 
  client, 
  activity, 
  formatDate,
  editingField,
  formData,
  setFormData,
  onEdit,
  onSave,
  onCancel,
  saving,
  formatDateForInput,
  formatDateFromInput
}: {
  client: ClientProfile;
  activity: ActivityLogEntry[];
  formatDate: (date: string) => string;
  editingField: string | null;
  formData: UpdateClientData;
  setFormData: (data: UpdateClientData) => void;
  onEdit: (field: string) => void;
  onSave: (field: string) => void;
  onCancel: () => void;
  saving: boolean;
  formatDateForInput?: (date: string) => string;
  formatDateFromInput?: (date: string) => string;
}) {
  return (
    <div className="space-y-6">
      {/* Basic Info */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <User className="w-5 h-5 text-muted-foreground" />
          <h3>Client Information</h3>
        </div>
        
        <div className="space-y-4">
          <EditableField
            label="Name"
            value={client.name}
            fieldName="name"
            editingField={editingField}
            formData={formData}
            setFormData={setFormData}
            onEdit={onEdit}
            onSave={onSave}
            onCancel={onCancel}
            saving={saving}
            type="text"
          />
          
          <EditableField
            label="Email"
            value={client.email}
            fieldName="email"
            editingField={editingField}
            formData={formData}
            setFormData={setFormData}
            onEdit={onEdit}
            onSave={onSave}
            onCancel={onCancel}
            saving={saving}
            type="email"
          />
        </div>
      </div>

      <Separator />

      {/* Assessment Info */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-muted-foreground" />
          <h3>Assessment Details</h3>
        </div>
        
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-3">
            <EditableField
              label="Assessment Status"
              value={client.assessmentStatus}
              fieldName="assessmentStatus"
              editingField={editingField}
              formData={formData}
              setFormData={setFormData}
              onEdit={onEdit}
              onSave={onSave}
              onCancel={onCancel}
              saving={saving}
              type="select"
              options={[
                { value: 'Updated', label: 'Updated' },
                { value: 'Outstanding', label: 'Outstanding' },
                { value: 'Overdue', label: 'Overdue' }
              ]}
            />
            
            <EditableField
              label="Sustainability Appetite"
              value={client.sustainabilityAppetite}
              fieldName="sustainabilityAppetite"
              editingField={editingField}
              formData={formData}
              setFormData={setFormData}
              onEdit={onEdit}
              onSave={onSave}
              onCancel={onCancel}
              saving={saving}
              type="select"
              options={[
                { value: 'High', label: 'High' },
                { value: 'Medium', label: 'Medium' },
                { value: 'Low', label: 'Low' },
                { value: 'N/A', label: 'N/A' }
              ]}
            />
            
            <EditableField
              label="Sustainability Profile"
              value={client.sustainabilityProfile}
              fieldName="sustainabilityProfile"
              editingField={editingField}
              formData={formData}
              setFormData={setFormData}
              onEdit={onEdit}
              onSave={onSave}
              onCancel={onCancel}
              saving={saving}
              type="select"
              options={[
                { value: 'A', label: 'Profile A' },
                { value: 'B', label: 'Profile B' },
                { value: 'C', label: 'Profile C' },
                { value: 'D', label: 'Profile D' }
              ]}
            />
          </div>
          
          <div className="grid gap-4 sm:grid-cols-2">
            <EditableField
              label="Latest Assessment"
              value={client.latestAssessmentDate}
              fieldName="latestAssessmentDate"
              editingField={editingField}
              formData={formData}
              setFormData={setFormData}
              onEdit={onEdit}
              onSave={onSave}
              onCancel={onCancel}
              saving={saving}
              type="date"
              formatDateForInput={formatDateForInput}
              formatDateFromInput={formatDateFromInput}
            />
            
            <EditableField
              label="Next Assessment"
              value={client.nextAssessmentDate}
              fieldName="nextAssessmentDate"
              editingField={editingField}
              formData={formData}
              setFormData={setFormData}
              onEdit={onEdit}
              onSave={onSave}
              onCancel={onCancel}
              saving={saving}
              type="date"
              formatDateForInput={formatDateForInput}
              formatDateFromInput={formatDateFromInput}
            />
          </div>
        </div>
      </div>

      <Separator />

      {/* Notes */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-muted-foreground" />
          <h3>Notes</h3>
        </div>
        
        <EditableField
          label="Client Notes"
          value={client.notes}
          fieldName="notes"
          editingField={editingField}
          formData={formData}
          setFormData={setFormData}
          onEdit={onEdit}
          onSave={onSave}
          onCancel={onCancel}
          saving={saving}
          type="textarea"
        />
      </div>

      <Separator />

      {/* Activity Log */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-muted-foreground" />
          <h3>Recent Activity</h3>
        </div>
        <div className="space-y-3">
          {activity.map((entry) => (
            <div key={entry.id} className="flex gap-3 p-3 bg-muted/30 rounded-lg">
              <div className="w-2 h-2 bg-chart-1 rounded-full mt-2 shrink-0" />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium">{entry.action}</span>
                  <span className="text-xs text-muted-foreground">
                    {formatDate(entry.createdAt)}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{entry.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function QuickActions({ client }: { client: ClientProfile }) {
  return (
    <div className="space-y-4">
      <h3>Quick Actions</h3>
      
      <div className="space-y-3">
        <Button className="w-full min-h-[44px]" variant="outline">
          <Mail className="w-4 h-4 mr-2" />
          Send Message
        </Button>
        
        <Button className="w-full min-h-[44px]" variant="outline">
          <Calendar className="w-4 h-4 mr-2" />
          Schedule Assessment
        </Button>
        
        <Button className="w-full min-h-[44px]" variant="outline">
          <FileText className="w-4 h-4 mr-2" />
          Generate Report
        </Button>
        
        <Button className="w-full min-h-[44px]" variant="outline">
          <Activity className="w-4 h-4 mr-2" />
          View Full History
        </Button>
        
        <Separator />
        
        <div className="space-y-3">
          <Button className="w-full min-h-[44px]" variant="secondary">
            <User className="w-4 h-4 mr-2" />
            Export Client Data
          </Button>
          
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="w-full min-h-[44px]" variant="destructive">
                Remove Client
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Remove Client</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete {client.name} and all associated data.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction className="bg-destructive hover:bg-destructive/90">
                  Remove Client
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        
        <Separator />
        
        <div className="p-3 bg-muted/30 rounded-lg space-y-2">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${
              client.assessmentStatus === 'Updated' ? 'bg-chart-2' :
              client.assessmentStatus === 'Outstanding' ? 'bg-chart-3' :
              'bg-chart-4'
            }`} />
            <span className="text-sm font-medium">Current Status</span>
          </div>
          <p className="text-sm text-muted-foreground">
            {client.assessmentStatus === 'Updated' ? 'All assessments are up to date' :
             client.assessmentStatus === 'Outstanding' ? 'Assessment pending completion' :
             'Assessment overdue - action required'}
          </p>
        </div>
      </div>
    </div>
  );
}

function getStatusColor(status: ClientProfile['assessmentStatus']) {
  switch (status) {
    case 'Updated': return 'bg-chart-2/10 text-chart-2';
    case 'Outstanding': return 'bg-chart-3/10 text-chart-3';
    case 'Overdue': return 'bg-chart-4/10 text-chart-4';
    default: return 'bg-muted text-muted-foreground';
  }
}

function ProfileSkeleton() {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Skeleton className="h-6 w-32" />
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-5 w-32" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-5 w-40" />
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <Skeleton className="h-6 w-40" />
        <div className="grid gap-4 sm:grid-cols-2">
          {Array(4).fill(0).map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-5 w-24" />
            </div>
          ))}
        </div>
      </div>
      
      <div className="space-y-4">
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-20 w-full" />
      </div>
      
      <div className="space-y-4">
        <Skeleton className="h-6 w-32" />
        <div className="space-y-3">
          {Array(3).fill(0).map((_, i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      </div>
    </div>
  );
}