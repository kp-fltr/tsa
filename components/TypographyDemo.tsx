import { Card, CardContent, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";

export function TypographyDemo() {
  return (
    <div className="p-6 space-y-8 max-w-4xl mx-auto">
      {/* Page Header */}
      <div className="space-y-2">
        <h1>Typography System Demo</h1>
        <p className="text-lg text-muted-foreground">
          Demonstrating our responsive typography hierarchy and consistent styling
        </p>
      </div>

      {/* Header Hierarchy */}
      <Card>
        <CardHeader>
          <h2>Header Hierarchy</h2>
          <p className="text-base text-muted-foreground">
            All headers use Nunito font with responsive scaling
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h1>H1 - Main Page Title</h1>
            <p className="text-sm text-muted-foreground">38px desktop / 30px mobile</p>
          </div>
          <div>
            <h2>H2 - Section Header</h2>
            <p className="text-sm text-muted-foreground">30px desktop / 25px mobile</p>
          </div>
          <div>
            <h3>H3 - Subsection Header</h3>
            <p className="text-sm text-muted-foreground">24px desktop / 21px mobile</p>
          </div>
          <div>
            <h4>H4 - Card Title</h4>
            <p className="text-sm text-muted-foreground">20px desktop / 19px mobile</p>
          </div>
          <div>
            <h5>H5 - Small Header</h5>
            <p className="text-sm text-muted-foreground">16px all devices</p>
          </div>
        </CardContent>
      </Card>

      {/* Body Text */}
      <Card>
        <CardHeader>
          <h2>Body Text Styles</h2>
          <p className="text-base text-muted-foreground">
            All body text uses Inter font with proper line heights
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-lg">Large body text - 16px with 24px line height</p>
            <p className="text-sm text-muted-foreground">Used for prominent content</p>
          </div>
          <div>
            <p className="text-base">Base body text - 14px desktop / 15px mobile with 22px line height</p>
            <p className="text-sm text-muted-foreground">Default paragraph text</p>
          </div>
          <div>
            <p className="text-sm">Small text - 12px desktop / 13px mobile with proper line height</p>
            <p className="text-sm text-muted-foreground">For captions and metadata</p>
          </div>
        </CardContent>
      </Card>

      {/* Text Variations */}
      <Card>
        <CardHeader>
          <h2>Text Style Variations</h2>
          <p className="text-base text-muted-foreground">
            Standard variations for different content types
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <p className="text-base">Regular text with normal weight</p>
            <p className="text-base font-semibold">Semibold text for emphasis</p>
            <p className="text-base font-bold">Bold text for strong emphasis</p>
            <p className="text-base text-italic">Italic text for subtle emphasis</p>
            <p className="text-base text-underline">Underlined text for links</p>
            <p className="text-base text-line-through">Deleted or crossed-out text</p>
          </div>
        </CardContent>
      </Card>

      {/* Form Elements */}
      <Card>
        <CardHeader>
          <h2>Form Typography</h2>
          <p className="text-base text-muted-foreground">
            Consistent typography in form elements with accessibility compliance
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="demo-input">Input Label</Label>
            <Input 
              id="demo-input" 
              placeholder="Input with 16px minimum on mobile"
            />
            <p className="text-sm text-muted-foreground">
              Helper text providing additional context
            </p>
          </div>
          
          <div className="flex gap-2">
            <Button>Primary Button</Button>
            <Button variant="outline">Secondary Button</Button>
          </div>
        </CardContent>
      </Card>

      {/* Dashboard Elements */}
      <Card>
        <CardHeader>
          <h2>Dashboard Components</h2>
          <p className="text-base text-muted-foreground">
            Typography in typical dashboard elements
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <h4>Active Tests</h4>
                <div className="text-h2 font-bold text-chart-1">142</div>
                <p className="text-sm text-muted-foreground">+12% from last month</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <h4>Completion Rate</h4>
                <div className="text-h2 font-bold text-chart-2">87%</div>
                <p className="text-sm text-muted-foreground">Above target</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <h4>Client Satisfaction</h4>
                <div className="text-h2 font-bold text-chart-3">4.8</div>
                <p className="text-sm text-muted-foreground">Excellent rating</p>
              </CardContent>
            </Card>
          </div>

          {/* Content with proper reading width */}
          <div className="content-width">
            <h3>Readable Content</h3>
            <p className="text-base">
              This content uses the content-width class to ensure optimal line length 
              for reading. On desktop, lines are limited to approximately 60-80 characters, 
              while on mobile they're constrained to 35-50 characters for better readability. 
              This follows WCAG guidelines and improves user experience across all devices.
            </p>
          </div>

          {/* Status badges */}
          <div className="flex flex-wrap gap-2">
            <Badge variant="default">Active</Badge>
            <Badge variant="secondary">Pending</Badge>
            <Badge variant="outline">Draft</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Mobile Responsive Note */}
      <Card>
        <CardHeader>
          <h2>Responsive Behavior</h2>
          <p className="text-base text-muted-foreground">
            Typography automatically scales on mobile devices
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-base">
              All typography in this system is responsive by default. Headers scale down 
              appropriately on mobile devices while maintaining hierarchy and readability.
            </p>
            <p className="text-base">
              Interactive elements like inputs and buttons automatically use a minimum 
              16px font size on mobile devices to prevent zoom-in behavior and improve 
              accessibility.
            </p>
            <div className="p-4 bg-muted/50 rounded-lg">
              <p className="text-sm">
                <strong>Note:</strong> Resize your browser window to see the responsive 
                typography scaling in action.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}