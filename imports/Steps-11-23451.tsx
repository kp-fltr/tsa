import svgPaths from "./svg-hyz7m20iw2";

function TablerIconCheck() {
  return (
    <div className="relative shrink-0 size-4" data-name="tabler icon / check">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 16 16"
      >
        <g id="tabler icon / check">
          <path
            d={svgPaths.p3febb700}
            id="Vector"
            stroke="var(--stroke-0, #18181B)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.25"
          />
        </g>
      </svg>
    </div>
  );
}

function StepsStepsItemProgressIcon() {
  return (
    <div
      className="bg-zinc-100 box-border content-stretch flex flex-row gap-2.5 items-center justify-center p-0 relative rounded-[32px] shrink-0 size-9"
      data-name="_Steps / Steps Item / Progress Icon"
    >
      <TablerIconCheck />
    </div>
  );
}

function StepsStepsItemTail() {
  return (
    <div
      className="h-0 relative shrink-0 w-full"
      data-name="_Steps / Steps Item / Tail"
    >
      <div
        className="absolute bottom-full left-0 right-0 top-0"
        data-name="Steps / Tail / Horizontal / Active"
      >
        <div
          className="absolute bottom-[-0.5px] left-0 right-0 top-[-0.5px]"
          style={{ "--stroke-0": "rgba(24, 24, 27, 1)" } as React.CSSProperties}
        >
          <svg
            className="block size-full"
            fill="none"
            preserveAspectRatio="none"
            role="presentation"
            viewBox="0 0 371 2"
          >
            <path
              d="M0 1H370.5"
              id="Steps / Tail / Horizontal / Active"
              stroke="var(--stroke-0, #18181B)"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

function TailWrapper() {
  return (
    <div
      className="basis-0 grow min-h-px min-w-px relative shrink-0"
      data-name="Tail Wrapper"
    >
      <div className="relative size-full">
        <div className="box-border content-stretch flex flex-col gap-2.5 items-start justify-start pl-2 pr-0 py-3 relative w-full">
          <StepsStepsItemTail />
        </div>
      </div>
    </div>
  );
}

function StepHeader() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2 items-center justify-start p-0 relative shrink-0 w-full"
      data-name="Step Header"
    >
      <StepsStepsItemProgressIcon />
      <div className="flex flex-col font-['Inter:Regular',_sans-serif] font-normal h-9 justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-left text-zinc-900 w-16">
        <p className="block leading-[24px]">Finished</p>
      </div>
      <TailWrapper />
    </div>
  );
}

function DescriptionWrapper() {
  return (
    <div className="relative shrink-0 w-full" data-name="Description Wrapper">
      <div className="relative size-full">
        <div className="box-border content-stretch flex flex-row gap-2.5 items-start justify-start pl-10 pr-0 py-0 relative w-full">
          <div className="basis-0 font-['Inter:Regular',_sans-serif] font-normal grow leading-[0] max-w-[140px] min-h-px min-w-px not-italic relative shrink-0 text-[#717179] text-[14px] text-left">
            <p className="block leading-[22px]">This is a description.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function StepsStepsItemHorizontal() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0"
      data-name="_Steps / Steps Item / Horizontal"
    >
      <StepHeader />
      <DescriptionWrapper />
    </div>
  );
}

function StepsStepsItemProgressIcon1() {
  return (
    <div
      className="bg-zinc-900 box-border content-stretch flex flex-col gap-2.5 items-center justify-center p-0 relative rounded-[32px] shrink-0 size-9"
      data-name="_Steps / Steps Item / Progress Icon"
    >
      <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[14px] text-center w-full">
        <p className="block leading-[22px]">2</p>
      </div>
    </div>
  );
}

function StepsStepsItemTail1() {
  return (
    <div
      className="h-0 relative shrink-0 w-full"
      data-name="_Steps / Steps Item / Tail"
    >
      <div
        className="absolute bottom-full left-0 right-0 top-0"
        data-name="Steps / Tail / Horizontal / Waiting"
      >
        <div
          className="absolute bottom-[-0.5px] left-0 right-0 top-[-0.5px]"
          style={
            { "--stroke-0": "rgba(24, 24, 27, 0.07)" } as React.CSSProperties
          }
        >
          <svg
            className="block size-full"
            fill="none"
            preserveAspectRatio="none"
            role="presentation"
            viewBox="0 0 350 2"
          >
            <path
              d="M0 1H349.5"
              id="Steps / Tail / Horizontal / Waiting"
              stroke="var(--stroke-0, #18181B)"
              strokeOpacity="0.07"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

function TailWrapper1() {
  return (
    <div
      className="basis-0 grow min-h-px min-w-px relative shrink-0"
      data-name="Tail Wrapper"
    >
      <div className="relative size-full">
        <div className="box-border content-stretch flex flex-col gap-2.5 items-start justify-start pl-2 pr-0 py-3 relative w-full">
          <StepsStepsItemTail1 />
        </div>
      </div>
    </div>
  );
}

function StepHeader1() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2 items-center justify-start p-0 relative shrink-0 w-full"
      data-name="Step Header"
    >
      <StepsStepsItemProgressIcon1 />
      <div className="flex flex-col font-['Inter:Regular',_sans-serif] font-normal h-9 justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-left text-zinc-900 w-[85px]">
        <p className="block leading-[24px]">In Progress</p>
      </div>
      <TailWrapper1 />
    </div>
  );
}

function DescriptionWrapper1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Description Wrapper">
      <div className="relative size-full">
        <div className="box-border content-stretch flex flex-row gap-2.5 items-start justify-start pl-10 pr-0 py-0 relative w-full">
          <div className="basis-0 font-['Inter:Regular',_sans-serif] font-normal grow leading-[0] max-w-[140px] min-h-px min-w-px not-italic relative shrink-0 text-[14px] text-left text-zinc-900">
            <p className="block leading-[22px]">This is a description.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function StepsStepsItemHorizontal1() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0"
      data-name="_Steps / Steps Item / Horizontal"
    >
      <StepHeader1 />
      <DescriptionWrapper1 />
    </div>
  );
}

function StepsStepsItemProgressIcon2() {
  return (
    <div
      className="bg-[rgba(24,24,27,0.06)] box-border content-stretch flex flex-col gap-2.5 items-center justify-center p-0 relative rounded-[32px] shrink-0 size-9"
      data-name="_Steps / Steps Item / Progress Icon"
    >
      <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[#717179] text-[14px] text-center w-full">
        <p className="block leading-[22px]">3</p>
      </div>
    </div>
  );
}

function StepsStepsItemTail2() {
  return (
    <div
      className="h-0 relative shrink-0 w-full"
      data-name="_Steps / Steps Item / Tail"
    >
      <div
        className="absolute bottom-full left-0 right-0 top-0"
        data-name="Steps / Tail / Horizontal / Waiting"
      >
        <div
          className="absolute bottom-[-0.5px] left-0 right-0 top-[-0.5px]"
          style={
            { "--stroke-0": "rgba(24, 24, 27, 0.07)" } as React.CSSProperties
          }
        >
          <svg
            className="block size-full"
            fill="none"
            preserveAspectRatio="none"
            role="presentation"
            viewBox="0 0 62 2"
          >
            <path
              d="M0 1H62"
              id="Steps / Tail / Horizontal / Waiting"
              stroke="var(--stroke-0, #18181B)"
              strokeOpacity="0.07"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

function TailWrapper2() {
  return (
    <div
      className="basis-0 grow min-h-px min-w-px relative shrink-0"
      data-name="Tail Wrapper"
    >
      <div className="relative size-full">
        <div className="box-border content-stretch flex flex-col gap-2.5 items-start justify-start pl-2 pr-0 py-3 relative w-full">
          <StepsStepsItemTail2 />
        </div>
      </div>
    </div>
  );
}

function StepHeader2() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2 items-center justify-start p-0 relative shrink-0 w-full"
      data-name="Step Header"
    >
      <StepsStepsItemProgressIcon2 />
      <div className="flex flex-col font-['Inter:Regular',_sans-serif] font-normal h-9 justify-center leading-[0] not-italic relative shrink-0 text-[#717179] text-[16px] text-left w-[57px]">
        <p className="block leading-[24px]">Waiting</p>
      </div>
      <TailWrapper2 />
    </div>
  );
}

function DescriptionWrapper2() {
  return (
    <div className="relative shrink-0 w-full" data-name="Description Wrapper">
      <div className="relative size-full">
        <div className="box-border content-stretch flex flex-row gap-2.5 items-start justify-start pl-10 pr-0 py-0 relative w-full">
          <div className="basis-0 font-['Inter:Regular',_sans-serif] font-normal grow leading-[0] max-w-[140px] min-h-px min-w-px not-italic relative shrink-0 text-[#717179] text-[14px] text-left">
            <p className="block leading-[22px]">This is a description.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function StepsStepsItemHorizontal2() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-start justify-start p-0 relative shrink-0 w-[179px]"
      data-name="_Steps / Steps Item / Horizontal"
    >
      <StepHeader2 />
      <DescriptionWrapper2 />
    </div>
  );
}

export default function Steps() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-4 items-start justify-start p-0 relative size-full"
      data-name="Steps"
    >
      <StepsStepsItemHorizontal />
      <StepsStepsItemHorizontal1 />
      <StepsStepsItemHorizontal2 />
    </div>
  );
}