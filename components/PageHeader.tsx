import React from 'react';
import { cn } from './ui/utils';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
  children?: React.ReactNode;
}

export function PageHeader({ title, subtitle, className, children }: PageHeaderProps) {
  return (
    <section className={cn("bg-card border-b border-border", className)}>
      <div className="container px-6 py-5">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="space-y-1">
            <h1 className="mt-0">{title}</h1>
            {subtitle && (
              <p className="text-base text-muted-foreground content-width">
                {subtitle}
              </p>
            )}
          </div>
          
          {children && (
            <div className="flex items-center gap-4">
              {children}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default PageHeader;