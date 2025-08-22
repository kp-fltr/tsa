import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Button } from './ui/button';

export function SelectPreview() {
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');
  const [value3, setValue3] = useState('');

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-h2 text-foreground">Select Component Preview</h1>
          <p className="text-muted-foreground">
            Updated Select components with proper light mode styling and enhanced interactive states
          </p>
        </div>

        {/* Select Examples */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Default Select */}
          <div className="bg-card border border-border rounded-lg p-6 space-y-4">
            <div className="space-y-2">
              <h3 className="text-h5 text-card-foreground">Default Select</h3>
              <p className="text-sm text-muted-foreground">Standard select with light background</p>
            </div>
            
            <Select value={value1} onValueChange={setValue1}>
              <SelectTrigger>
                <SelectValue placeholder="Select an option..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="option1">Option 1</SelectItem>
                <SelectItem value="option2">Option 2</SelectItem>
                <SelectItem value="option3">Option 3</SelectItem>
                <SelectItem value="option4">Option 4</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Status Filter Select */}
          <div className="bg-card border border-border rounded-lg p-6 space-y-4">
            <div className="space-y-2">
              <h3 className="text-h5 text-card-foreground">Status Filter</h3>
              <p className="text-sm text-muted-foreground">Assessment status selection</p>
            </div>
            
            <Select value={value2} onValueChange={setValue2}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="updated">Updated</SelectItem>
                <SelectItem value="outstanding">Outstanding</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Profile Select */}
          <div className="bg-card border border-border rounded-lg p-6 space-y-4">
            <div className="space-y-2">
              <h3 className="text-h5 text-card-foreground">Profile Type</h3>
              <p className="text-sm text-muted-foreground">Sustainability profile selection</p>
            </div>
            
            <Select value={value3} onValueChange={setValue3}>
              <SelectTrigger>
                <SelectValue placeholder="Select profile..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="conservative">Conservative</SelectItem>
                <SelectItem value="moderate">Moderate</SelectItem>
                <SelectItem value="aggressive">Aggressive</SelectItem>
                <SelectItem value="balanced">Balanced</SelectItem>
                <SelectItem value="growth">Growth</SelectItem>
              </SelectContent>
            </Select>
          </div>
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
            {/* Normal State */}
            <div className="space-y-3">
              <h4 className="text-h5 text-card-foreground">Normal State</h4>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Default appearance" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="item1">Sample Item 1</SelectItem>
                  <SelectItem value="item2">Sample Item 2</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground">
                Light background with proper contrast text
              </p>
            </div>

            {/* With Selected Value */}
            <div className="space-y-3">
              <h4 className="text-h5 text-card-foreground">Selected State</h4>
              <Select value="selected">
                <SelectTrigger>
                  <SelectValue placeholder="With selection" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="selected">Selected Item</SelectItem>
                  <SelectItem value="other">Other Item</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground">
                Shows selected value with proper styling
              </p>
            </div>
          </div>
        </div>

        {/* Size Variants */}
        <div className="bg-card border border-border rounded-lg p-6 space-y-6">
          <div className="space-y-2">
            <h3 className="text-h4 text-card-foreground">Size Variants</h3>
            <p className="text-muted-foreground">
              Different sizes maintaining consistent styling
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-card-foreground">Small Size</label>
              <Select>
                <SelectTrigger size="sm">
                  <SelectValue placeholder="Small select..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small1">Small Option 1</SelectItem>
                  <SelectItem value="small2">Small Option 2</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-card-foreground">Default Size</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Default select..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default1">Default Option 1</SelectItem>
                  <SelectItem value="default2">Default Option 2</SelectItem>
                </SelectContent>
              </Select>
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
                <li>• High contrast background and text colors</li>
                <li>• Blue accent for hover and focus states</li>
                <li>• Smooth transitions for better UX</li>
                <li>• Consistent styling across all states</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-card-foreground">Interactive States:</h4>
              <ul className="space-y-1 text-muted-foreground ml-4">
                <li>• Hover: Subtle blue background tint</li>
                <li>• Focus: Blue border with ring indicator</li>
                <li>• Open: Active state styling</li>
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
              <div className="w-full h-12 bg-card border border-border rounded"></div>
              <p className="text-xs text-muted-foreground">Default Background</p>
            </div>
            <div className="space-y-2">
              <div className="w-full h-12 bg-chart-1/5 border border-chart-1/30 rounded"></div>
              <p className="text-xs text-muted-foreground">Hover State</p>
            </div>
            <div className="space-y-2">
              <div className="w-full h-12 bg-chart-1/10 border-2 border-chart-1 rounded"></div>
              <p className="text-xs text-muted-foreground">Focus State</p>
            </div>
            <div className="space-y-2">
              <div className="w-full h-12 bg-chart-1/12 border border-chart-1 rounded"></div>
              <p className="text-xs text-muted-foreground">Selected Item</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Button
            onClick={() => {
              setValue1('');
              setValue2('');
              setValue3('');
            }}
            variant="outline"
          >
            Clear All Selections
          </Button>
          <Button
            onClick={() => {
              setValue1('option2');
              setValue2('updated');
              setValue3('moderate');
            }}
          >
            Set Sample Values
          </Button>
        </div>
      </div>
    </div>
  );
}