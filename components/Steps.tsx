import svgPaths from "../imports/svg-hyz7m20iw2";

function TablerIconCheck() {
  return (
    <div className="relative shrink-0 size-4">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g>
          <path
            d={svgPaths.p3febb700}
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.25"
          />
        </g>
      </svg>
    </div>
  );
}

interface StepProps {
  number: number;
  title: string;
  status: 'completed' | 'current' | 'waiting';
  isLast?: boolean;
}

function StepItem({ number, title, status, isLast }: StepProps) {
  const getStepIconStyles = () => {
    switch (status) {
      case 'completed':
        return 'bg-chart-2 text-white';
      case 'current':
        return 'bg-chart-1 text-white';
      case 'waiting':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getTextStyles = () => {
    switch (status) {
      case 'completed':
        return 'text-foreground';
      case 'current':
        return 'text-foreground';
      case 'waiting':
        return 'text-muted-foreground';
      default:
        return 'text-muted-foreground';
    }
  };

  const getTailStyles = () => {
    return status === 'completed' ? 'stroke-chart-2' : 'stroke-border';
  };

  return (
    <div className="flex items-center grow min-w-0">
      {/* Step Header */}
      <div className="flex items-center gap-2 shrink-0">
        {/* Step Icon */}
        <div className={`flex items-center justify-center w-7 h-7 rounded-full transition-colors ${getStepIconStyles()}`}>
          {status === 'completed' ? (
            <TablerIconCheck />
          ) : (
            <span className="text-sm font-medium">{number}</span>
          )}
        </div>
        
        {/* Step Label */}
        <div className={`text-sm font-medium transition-colors ${getTextStyles()}`}>
          {title}
        </div>
      </div>

      {/* Connecting Line */}
      {!isLast && (
        <div className="flex-1 mx-3 h-0.5 min-w-8">
          <div className={`h-full transition-colors ${getTailStyles()}`} 
               style={{ 
                 background: status === 'completed' 
                   ? 'var(--chart-2)' 
                   : 'var(--border)' 
               }} 
          />
        </div>
      )}
    </div>
  );
}

interface StepsProps {
  currentStep: number; // 1, 2, or 3
}

export function Steps({ currentStep }: StepsProps) {
  const steps = [
    { number: 1, title: "Setup" },
    { number: 2, title: "Email" },
    { number: 3, title: "Deploy" }
  ];

  const getStepStatus = (stepNumber: number): 'completed' | 'current' | 'waiting' => {
    if (stepNumber < currentStep) return 'completed';
    if (stepNumber === currentStep) return 'current';
    return 'waiting';
  };

  return (
    <div className="flex items-center w-full max-w-md mx-auto px-4">
      {steps.map((step, index) => (
        <StepItem
          key={step.number}
          number={step.number}
          title={step.title}
          status={getStepStatus(step.number)}
          isLast={index === steps.length - 1}
        />
      ))}
    </div>
  );
}