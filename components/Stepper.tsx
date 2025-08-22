import { Check } from "lucide-react";

interface Step {
  title: string;
  description?: string;
  icon?: React.ReactNode;
}

interface StepperProps {
  steps: Step[];
  currentStep: number;
  onStepClick?: (stepIndex: number) => void;
  allowStepNavigation?: boolean;
}

export function Stepper({ steps, currentStep, onStepClick, allowStepNavigation = true }: StepperProps) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-center max-w-md mx-auto">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;
          const isClickable = allowStepNavigation && onStepClick;
          
          return (
            <div key={index} className="flex items-center">
              {/* Step Circle */}
              <div className="flex flex-col items-center">
                <div
                  onClick={() => isClickable && onStepClick(index)}
                  className={`
                    relative flex items-center justify-center w-7 h-7 rounded-full border-2 transition-all duration-200 text-xs
                    ${isCompleted 
                      ? 'bg-chart-1 border-chart-1 text-card' 
                      : isCurrent 
                        ? 'bg-card border-chart-1 text-chart-1' 
                        : 'bg-card border-border text-muted-foreground'
                    }
                    ${isClickable ? 'hover:scale-105 cursor-pointer' : 'cursor-default'}
                  `}
                >
                  {isCompleted ? (
                    <Check className="w-3 h-3" />
                  ) : (
                    <span className="font-semibold text-xs">
                      {index + 1}
                    </span>
                  )}
                </div>
                
                {/* Step Label */}
                <div className="mt-2 text-center max-w-[80px]">
                  <h5 
                    className={`font-medium text-xs ${
                      isCurrent ? 'text-card-foreground' : 'text-muted-foreground'
                    }`}
                  >
                    {step.title}
                  </h5>
                  {step.description && (
                    <p className="text-muted-foreground text-xs mt-0.5">
                      {step.description}
                    </p>
                  )}
                </div>
              </div>
              
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="flex-1 mx-3 mt-[-32px]">
                  <div 
                    className={`h-0.5 w-16 transition-all duration-200 ${
                      isCompleted ? 'bg-chart-1' : 'bg-border'
                    }`}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}