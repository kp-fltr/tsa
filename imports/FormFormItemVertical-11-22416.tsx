import svgPaths from "./svg-syjcfv4lwj";

function TablerIconHelpCircle() {
  return (
    <div
      className="relative shrink-0 size-4"
      data-name="tabler icon / help-circle"
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 16 16"
      >
        <g id="tabler icon / help-circle">
          <path
            d={svgPaths.p9daa100}
            id="Vector"
            stroke="var(--stroke-0, #717179)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.25"
          />
        </g>
      </svg>
    </div>
  );
}

function FormFormLabelVertical() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-1 items-center justify-start pb-2 pt-0 px-0 relative shrink-0 w-full"
      data-name="_Form / Form Label Vertical"
    >
      <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[14px] text-left text-nowrap text-zinc-900">
        <p className="block leading-[22px] whitespace-pre">Input Label</p>
      </div>
      <TablerIconHelpCircle />
      <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[#717179] text-[14px] text-left text-nowrap">
        <p className="block leading-[22px] whitespace-pre">(optional)</p>
      </div>
    </div>
  );
}

function Content() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-row gap-2 grow h-9 items-center justify-start min-h-px min-w-px px-0 py-1 relative shrink-0"
      data-name="Content"
    >
      <div className="basis-0 font-['Inter:Regular',_sans-serif] font-normal grow h-[22px] leading-[0] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[14px] text-left text-nowrap text-zinc-300">
        <p className="[text-overflow:inherit] [text-wrap-mode:inherit]\' [white-space-collapse:inherit] block leading-[22px] overflow-inherit">
          Input
        </p>
      </div>
    </div>
  );
}

function Input() {
  return (
    <div
      className="bg-[#ffffff] relative rounded-md shrink-0 w-full"
      data-name="Input"
    >
      <div className="flex flex-row items-center overflow-clip relative size-full">
        <div className="box-border content-stretch flex flex-row gap-2.5 items-center justify-start px-3 py-0 relative w-full">
          <Content />
        </div>
      </div>
      <div className="absolute border border-solid border-zinc-300 inset-0 pointer-events-none rounded-md" />
    </div>
  );
}

export default function FormFormItemVertical() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-start justify-start p-0 relative size-full"
      data-name="_Form / Form Item / Vertical"
    >
      <FormFormLabelVertical />
      <Input />
    </div>
  );
}