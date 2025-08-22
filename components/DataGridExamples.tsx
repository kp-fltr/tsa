import React, { useState } from 'react';
import { DataGrid } from './DataGrid';

// Example 1: Client Directory
export function ClientDirectoryExample() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  return (
    <div className="h-full p-6">
      <div className="mb-6">
        <h1 className="text-h2 mb-2">Client Directory</h1>
        <p className="text-base text-muted-foreground">Manage your client base and track assessment progress</p>
      </div>
      
      <div className="h-[calc(100vh-200px)]">
        <DataGrid
          viewport="desktop"
          paginationMode="paginate"
          pageSize={50}
          showFiltersSummary={true}
          hasSelection={true}
          hasActions={true}
          rowDensity="compact"
          columnsPreset="clientDirectory"
          searchEnabled={true}
          filtersEnabled={true}
          stickyActions={true}
          selectedIds={selectedIds}
          onSelectionChange={setSelectedIds}
          onViewProfile={(id) => console.log('View profile:', id)}
          onNavigate={(view) => console.log('Navigate to:', view)}
        />
      </div>
    </div>
  );
}

// Example 2: Test Distribution
export function TestDistributionExample() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  return (
    <div className="h-full p-6">
      <div className="mb-6">
        <h1 className="text-h2 mb-2">Test Distribution</h1>
        <p className="text-base text-muted-foreground">Track campaign performance and client engagement</p>
      </div>
      
      <div className="h-[calc(100vh-200px)]">
        <DataGrid
          viewport="desktop"
          paginationMode="paginate"
          pageSize={50}
          showFiltersSummary={true}
          hasSelection={true}
          hasActions={true}
          rowDensity="compact"
          columnsPreset="testDistribution"
          searchEnabled={true}
          filtersEnabled={true}
          stickyActions={true}
          selectedIds={selectedIds}
          onSelectionChange={setSelectedIds}
          onViewProfile={(id) => console.log('View profile:', id)}
          onNavigate={(view) => console.log('Navigate to:', view)}
        />
      </div>
    </div>
  );
}

// Mobile Examples
export function ClientDirectoryMobileExample() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  return (
    <div className="h-full p-4">
      <div className="mb-4">
        <h1 className="text-h3 mb-2">Client Directory</h1>
        <p className="text-sm text-muted-foreground">Manage clients on mobile</p>
      </div>
      
      <div className="h-[calc(100vh-150px)]">
        <DataGrid
          viewport="mobile"
          paginationMode="scroll"
          pageSize={20}
          showFiltersSummary={false}
          hasSelection={true}
          hasActions={true}
          rowDensity="compact"
          columnsPreset="clientDirectory"
          searchEnabled={true}
          filtersEnabled={false}
          stickyActions={false}
          loadMoreVisible={true}
          selectedIds={selectedIds}
          onSelectionChange={setSelectedIds}
          onViewProfile={(id) => console.log('View profile:', id)}
          onLoadMore={() => console.log('Load more')}
        />
      </div>
    </div>
  );
}

export function TestDistributionMobileExample() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  return (
    <div className="h-full p-4">
      <div className="mb-4">
        <h1 className="text-h3 mb-2">Test Distribution</h1>
        <p className="text-sm text-muted-foreground">Track campaigns on mobile</p>
      </div>
      
      <div className="h-[calc(100vh-150px)]">
        <DataGrid
          viewport="mobile"
          paginationMode="scroll"
          pageSize={20}
          showFiltersSummary={false}
          hasSelection={true}
          hasActions={true}
          rowDensity="compact"
          columnsPreset="testDistribution"
          searchEnabled={true}
          filtersEnabled={false}
          stickyActions={false}
          loadMoreVisible={true}
          selectedIds={selectedIds}
          onSelectionChange={setSelectedIds}
          onViewProfile={(id) => console.log('View profile:', id)}
          onLoadMore={() => console.log('Load more')}
        />
      </div>
    </div>
  );
}