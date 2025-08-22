import React, { useState } from 'react';
import { TableCheckbox, StatusTag, TableAction } from './ui/enhanced-table-preset';
import { Checkbox } from './ui/checkbox';
import { Button } from './ui/button';
import { MoreHorizontal, Eye, Edit } from 'lucide-react';

export function CheckboxPreview() {
  const [tableCheckbox1, setTableCheckbox1] = useState(false);
  const [tableCheckbox2, setTableCheckbox2] = useState(true);
  const [tableCheckboxIndeterminate, setTableCheckboxIndeterminate] = useState(true);
  const [regularCheckbox1, setRegularCheckbox1] = useState(false);
  const [regularCheckbox2, setRegularCheckbox2] = useState(true);

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-h2 text-foreground">Checkbox Components Preview</h1>
          <p className="text-muted-foreground">
            Updated checkbox components with proper light mode styling and enhanced interactive states
          </p>
        </div>

        {/* TableCheckbox Examples */}
        <div className="bg-card border border-border rounded-lg p-6 space-y-6">
          <div className="space-y-2">
            <h3 className="text-h4 text-card-foreground">TableCheckbox Component</h3>
            <p className="text-sm text-muted-foreground">
              Native HTML checkboxes used in tables with design system styling
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <h4 className="text-h5 text-card-foreground">Unchecked State</h4>
              <div className="flex items-center gap-3">
                <TableCheckbox
                  checked={tableCheckbox1}
                  onChange={setTableCheckbox1}
                />
                <label className="text-sm cursor-pointer" onClick={() => setTableCheckbox1(!tableCheckbox1)}>
                  Click to toggle
                </label>
              </div>
              <p className="text-sm text-muted-foreground">
                Light background with blue hover and focus states
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="text-h5 text-card-foreground">Checked State</h4>
              <div className="flex items-center gap-3">
                <TableCheckbox
                  checked={tableCheckbox2}
                  onChange={setTableCheckbox2}
                />
                <label className="text-sm cursor-pointer" onClick={() => setTableCheckbox2(!tableCheckbox2)}>
                  Click to toggle
                </label>
              </div>
              <p className="text-sm text-muted-foreground">
                Blue background with white checkmark
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="text-h5 text-card-foreground">Indeterminate State</h4>
              <div className="flex items-center gap-3">
                <TableCheckbox
                  checked={false}
                  indeterminate={tableCheckboxIndeterminate}
                  onChange={(checked) => {
                    setTableCheckboxIndeterminate(false);
                    setTableCheckbox1(checked);
                  }}
                />
                <label className="text-sm cursor-pointer">
                  Partial selection indicator
                </label>
              </div>
              <p className="text-sm text-muted-foreground">
                Used for "select all" when some items are selected
              </p>
            </div>
          </div>
        </div>

        {/* Radix Checkbox Examples */}
        <div className="bg-card border border-border rounded-lg p-6 space-y-6">
          <div className="space-y-2">
            <h3 className="text-h4 text-card-foreground">Radix Checkbox Component</h3>
            <p className="text-sm text-muted-foreground">
              Enhanced Radix checkboxes used throughout the application
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="text-h5 text-card-foreground">Unchecked State</h4>
              <div className="flex items-center gap-3">
                <Checkbox
                  checked={regularCheckbox1}
                  onCheckedChange={setRegularCheckbox1}
                />
                <label className="text-sm cursor-pointer" onClick={() => setRegularCheckbox1(!regularCheckbox1)}>
                  Enhanced checkbox with animations
                </label>
              </div>
              <p className="text-sm text-muted-foreground">
                Smooth transitions with proper focus indicators
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="text-h5 text-card-foreground">Checked State</h4>
              <div className="flex items-center gap-3">
                <Checkbox
                  checked={regularCheckbox2}
                  onCheckedChange={setRegularCheckbox2}
                />
                <label className="text-sm cursor-pointer" onClick={() => setRegularCheckbox2(!regularCheckbox2)}>
                  Animated check icon
                </label>
              </div>
              <p className="text-sm text-muted-foreground">
                Blue background with animated checkmark
              </p>
            </div>
          </div>
        </div>

        {/* Table Context Example */}
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="p-4 space-y-2 border-b border-border">
            <h3 className="text-h4 text-card-foreground">Table Context Example</h3>
            <p className="text-sm text-muted-foreground">
              Checkboxes in realistic table environment with status tags and actions
            </p>
          </div>

          {/* Table Header */}
          <div className="bg-muted/20 flex items-center h-12 border-b border-border">
            <div className="w-12 flex items-center justify-center">
              <TableCheckbox
                checked={false}
                indeterminate={true}
                onChange={() => {}}
              />
            </div>
            <div className="flex-1 px-4 font-semibold text-card-foreground">Client Name</div>
            <div className="w-32 px-4 font-semibold text-card-foreground">Status</div>
            <div className="w-24 px-4 font-semibold text-card-foreground">Actions</div>
          </div>

          {/* Table Rows */}
          {[
            { name: 'John Smith', status: 'Updated', checked: true },
            { name: 'Jane Doe', status: 'Outstanding', checked: false },
            { name: 'Bob Johnson', status: 'Overdue', checked: true },
          ].map((client, index) => (
            <div key={index} className="bg-card flex items-center h-12 border-b border-border hover:bg-chart-1/5 transition-colors">
              <div className="w-12 flex items-center justify-center">
                <TableCheckbox
                  checked={client.checked}
                  onChange={() => {}}
                />
              </div>
              <div className="flex-1 px-4 text-muted-foreground">{client.name}</div>
              <div className="w-32 px-4">
                <StatusTag status={client.status as any}>
                  {client.status}
                </StatusTag>
              </div>
              <div className="w-24 px-4 flex items-center gap-1">
                <TableAction>
                  <Eye className="w-4 h-4" />
                </TableAction>
                <TableAction>
                  <Edit className="w-4 h-4" />
                </TableAction>
                <TableAction>
                  <MoreHorizontal className="w-4 h-4" />
                </TableAction>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive States Demo */}
        <div className="bg-card border border-border rounded-lg p-6 space-y-6">
          <div className="space-y-2">
            <h3 className="text-h4 text-card-foreground">Interactive States</h3>
            <p className="text-muted-foreground">
              Demonstration of hover, focus, and active states with proper contrast
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="text-h5 text-card-foreground">TableCheckbox States</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-2 rounded border hover:bg-chart-1/5">
                  <TableCheckbox checked={false} onChange={() => {}} />
                  <span className="text-sm">Hover over this row</span>
                </div>
                <div className="flex items-center gap-3 p-2 rounded border">
                  <TableCheckbox checked={true} onChange={() => {}} />
                  <span className="text-sm">Selected state</span>
                </div>
                <div className="flex items-center gap-3 p-2 rounded border opacity-50">
                  <TableCheckbox checked={false} onChange={() => {}} />
                  <span className="text-sm">Disabled appearance</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-h5 text-card-foreground">Radix Checkbox States</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-2 rounded border hover:bg-chart-1/5">
                  <Checkbox checked={false} onCheckedChange={() => {}} />
                  <span className="text-sm">Hover over this row</span>
                </div>
                <div className="flex items-center gap-3 p-2 rounded border">
                  <Checkbox checked={true} onCheckedChange={() => {}} />
                  <span className="text-sm">Selected with animation</span>
                </div>
                <div className="flex items-center gap-3 p-2 rounded border">
                  <Checkbox disabled checked={false} onCheckedChange={() => {}} />
                  <span className="text-sm text-muted-foreground">Disabled state</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Accessibility Notes */}
        <div className="bg-card border border-border rounded-lg p-6 space-y-4">
          <h3 className="text-h4 text-card-foreground">Accessibility Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <h4 className="font-semibold text-card-foreground">Visual Improvements:</h4>
              <ul className="space-y-1 text-muted-foreground ml-4">
                <li>• High contrast borders and backgrounds</li>
                <li>• Blue accent for hover and focus states</li>
                <li>• Smooth transitions for better UX</li>
                <li>• Consistent styling with design system</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-card-foreground">Interactive States:</h4>
              <ul className="space-y-1 text-muted-foreground ml-4">
                <li>• Native browser controls forced to light mode</li>
                <li>• Proper focus ring indicators</li>
                <li>• Keyboard navigation support</li>
                <li>• WCAG AA+ compliant contrast ratios</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Color Palette Reference */}
        <div className="bg-card border border-border rounded-lg p-6 space-y-4">
          <h3 className="text-h4 text-card-foreground">Design System Integration</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <div className="w-full h-12 bg-card border border-border rounded flex items-center justify-center">
                <div className="w-4 h-4 border border-border rounded bg-card"></div>
              </div>
              <p className="text-xs text-muted-foreground">Default State</p>
            </div>
            <div className="space-y-2">
              <div className="w-full h-12 bg-chart-1/5 border border-chart-1/50 rounded flex items-center justify-center">
                <div className="w-4 h-4 border border-chart-1/50 rounded bg-card"></div>
              </div>
              <p className="text-xs text-muted-foreground">Hover State</p>
            </div>
            <div className="space-y-2">
              <div className="w-full h-12 bg-chart-1/10 border-2 border-chart-1 rounded flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-chart-1 rounded bg-card shadow-sm"></div>
              </div>
              <p className="text-xs text-muted-foreground">Focus State</p>
            </div>
            <div className="space-y-2">
              <div className="w-full h-12 bg-chart-1/10 border border-chart-1 rounded flex items-center justify-center">
                <div className="w-4 h-4 bg-chart-1 rounded text-white flex items-center justify-center text-xs">✓</div>
              </div>
              <p className="text-xs text-muted-foreground">Checked State</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Button
            onClick={() => {
              setTableCheckbox1(false);
              setTableCheckbox2(false);
              setTableCheckboxIndeterminate(false);
              setRegularCheckbox1(false);
              setRegularCheckbox2(false);
            }}
            variant="outline"
          >
            Uncheck All
          </Button>
          <Button
            onClick={() => {
              setTableCheckbox1(true);
              setTableCheckbox2(true);
              setTableCheckboxIndeterminate(true);
              setRegularCheckbox1(true);
              setRegularCheckbox2(true);
            }}
          >
            Check All
          </Button>
        </div>
      </div>
    </div>
  );
}