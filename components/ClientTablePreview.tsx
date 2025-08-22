import React, { useState } from 'react';
import { ClientTable } from './ClientTable';
import { Button } from './ui/button';
import { Plus, Users, Download, Filter } from 'lucide-react';

export function ClientTablePreview() {
  const [selectedClientIds, setSelectedClientIds] = useState<string[]>([]);

  const handleNavigate = (view: string) => {
    console.log('Navigate to:', view);
  };

  const handleViewProfile = (clientId: string) => {
    console.log('View profile for client:', clientId);
  };

  const handleCreateCampaign = () => {
    console.log('Create campaign');
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-h2 text-foreground">Client Management</h1>
            <p className="text-muted-foreground mt-1">
              Manage sustainability assessments and client profiles
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Advanced Filters
            </Button>
            <Button size="sm" className="bg-chart-1 hover:bg-chart-1/90">
              <Plus className="w-4 h-4 mr-2" />
              Add Client
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-chart-1/10 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-chart-1" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Clients</p>
                <p className="text-h4 text-card-foreground">247</p>
              </div>
            </div>
          </div>
          
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-chart-2/10 rounded-lg flex items-center justify-center">
                <div className="w-5 h-5 bg-chart-2 rounded-full"></div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Assessments</p>
                <p className="text-h4 text-card-foreground">89</p>
              </div>
            </div>
          </div>
          
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-chart-3/10 rounded-lg flex items-center justify-center">
                <div className="w-5 h-5 bg-chart-3 rounded-full"></div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Completion Rate</p>
                <p className="text-h4 text-card-foreground">87%</p>
              </div>
            </div>
          </div>
          
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-chart-5/10 rounded-lg flex items-center justify-center">
                <div className="w-5 h-5 bg-chart-5 rounded-full"></div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Selected</p>
                <p className="text-h4 text-card-foreground">{selectedClientIds.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Selection Actions */}
        {selectedClientIds.length > 0 && (
          <div className="bg-chart-1/8 border border-chart-1/20 rounded-lg p-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-chart-1 rounded-full flex items-center justify-center">
                  <span className="text-xs font-semibold text-white">{selectedClientIds.length}</span>
                </div>
                <div>
                  <p className="font-medium text-chart-1">
                    {selectedClientIds.length} client{selectedClientIds.length > 1 ? 's' : ''} selected
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Choose an action to perform on selected clients
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline" className="hover:bg-chart-1/10 hover:border-chart-1/30">
                  Send Assessment
                </Button>
                <Button size="sm" variant="outline" className="hover:bg-chart-1/10 hover:border-chart-1/30">
                  Export Data
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => setSelectedClientIds([])}
                  className="hover:bg-destructive/10 hover:border-destructive/30 hover:text-destructive"
                >
                  Clear Selection
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Client Table */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-h4 text-card-foreground">Client Directory</h3>
              <p className="text-sm text-muted-foreground mt-1">
                View and manage all client sustainability profiles
              </p>
            </div>
          </div>

          <ClientTable
            selectedClientIds={selectedClientIds}
            onSelectionChange={setSelectedClientIds}
            onNavigate={handleNavigate}
            onViewProfile={handleViewProfile}
            onCreateCampaign={handleCreateCampaign}
          />
        </div>

        {/* Interactive Instructions */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h4 className="text-h5 text-card-foreground mb-3">Interactive Features Preview</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <h5 className="font-semibold text-card-foreground">Visual States:</h5>
              <ul className="space-y-1 text-muted-foreground ml-4">
                <li>• Hover over rows to see blue-tinted backgrounds</li>
                <li>• Select clients to see blue selection indicators</li>
                <li>• Use column filters to see active filter styling</li>
                <li>• Action buttons have enhanced hover states</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h5 className="font-semibold text-card-foreground">Interactive Elements:</h5>
              <ul className="space-y-1 text-muted-foreground ml-4">
                <li>• Click checkboxes to select multiple clients</li>
                <li>• Use dropdown filters in table headers</li>
                <li>• Three-dot menu provides client actions</li>
                <li>• Responsive design adapts to mobile</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Color Palette Reference */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h4 className="text-h5 text-card-foreground mb-4">Design System Colors</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <div className="space-y-2">
              <div className="w-full h-12 bg-chart-1 rounded border"></div>
              <p className="text-xs text-muted-foreground">Primary Blue</p>
            </div>
            <div className="space-y-2">
              <div className="w-full h-12 bg-chart-1/10 rounded border"></div>
              <p className="text-xs text-muted-foreground">Light Blue</p>
            </div>
            <div className="space-y-2">
              <div className="w-full h-12 bg-card rounded border"></div>
              <p className="text-xs text-muted-foreground">Card Background</p>
            </div>
            <div className="space-y-2">
              <div className="w-full h-12 bg-secondary rounded border"></div>
              <p className="text-xs text-muted-foreground">Secondary</p>
            </div>
            <div className="space-y-2">
              <div className="w-full h-12 bg-accent rounded border"></div>
              <p className="text-xs text-muted-foreground">Accent</p>
            </div>
            <div className="space-y-2">
              <div className="w-full h-12 bg-muted rounded border"></div>
              <p className="text-xs text-muted-foreground">Muted</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}