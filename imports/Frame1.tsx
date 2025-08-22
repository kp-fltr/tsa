import svgPaths from "./svg-qhvsi1k5zs";

function TablerIconCalendar() {
  return (
    <div
      className="relative shrink-0 size-4"
      data-name="tabler icon / calendar"
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 16 16"
      >
        <g id="tabler icon / calendar">
          <path
            d={svgPaths.p102d9d00}
            id="Vector"
            stroke="var(--stroke-0, #D4D4D8)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.25"
          />
        </g>
      </svg>
    </div>
  );
}

function DatePickerDatePickerInputOutlined() {
  return (
    <div
      className="bg-[#ffffff] h-9 relative rounded-md shrink-0 w-full"
      data-name="_DatePicker / DatePicker Input / Outlined"
    >
      <div className="absolute border border-solid border-zinc-300 inset-0 pointer-events-none rounded-md" />
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex flex-row gap-1 h-9 items-center justify-start px-3 py-0 relative w-full">
          <div className="basis-0 font-['Inter:Regular',_sans-serif] font-normal grow h-[22px] leading-[0] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[14px] text-left text-nowrap text-zinc-300">
            <p className="[text-overflow:inherit] [text-wrap-mode:inherit]\' [white-space-collapse:inherit] block leading-[22px] overflow-inherit">
              Select date
            </p>
          </div>
          <TablerIconCalendar />
        </div>
      </div>
    </div>
  );
}

function DatePicker() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-col gap-2 items-start justify-start left-[632px] p-0 top-[365px] w-40"
      data-name="DatePicker"
    >
      <DatePickerDatePickerInputOutlined />
    </div>
  );
}

function TablerIconChevronLeft() {
  return (
    <div
      className="[grid-area:1_/_1] ml-5 mt-0 relative size-4"
      data-name="tabler icon / chevron-left"
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 16 16"
      >
        <g id="tabler icon / chevron-left">
          <path
            d="M10 4L6 8L10 12"
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

function TablerIconChevronsLeft() {
  return (
    <div
      className="[grid-area:1_/_1] ml-0 mt-0 relative size-4"
      data-name="tabler icon / chevrons-left"
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 16 16"
      >
        <g id="tabler icon / chevrons-left">
          <path
            d={svgPaths.p25c18f00}
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

function Navigation() {
  return (
    <div
      className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0"
      data-name="Navigation"
    >
      <TablerIconChevronLeft />
      <TablerIconChevronsLeft />
    </div>
  );
}

function TablerIconChevronsRight() {
  return (
    <div
      className="[grid-area:1_/_1] ml-5 mt-0 relative size-4"
      data-name="tabler icon / chevrons-right"
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 16 16"
      >
        <g id="tabler icon / chevrons-right">
          <path
            d={svgPaths.p3d733be0}
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

function TablerIconChevronRight() {
  return (
    <div
      className="[grid-area:1_/_1] ml-0 mt-0 relative size-4"
      data-name="tabler icon / chevron-right"
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 16 16"
      >
        <g id="tabler icon / chevron-right">
          <path
            d="M6 4L10 8L6 12"
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

function Navigation1() {
  return (
    <div
      className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0"
      data-name="Navigation"
    >
      <TablerIconChevronsRight />
      <TablerIconChevronRight />
    </div>
  );
}

function Header() {
  return (
    <div className="relative shrink-0 w-full" data-name="Header">
      <div className="absolute border-[0px_0px_1px] border-[rgba(24,24,27,0)] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex flex-row items-center justify-between leading-[0] px-2 py-[9px] relative w-full">
          <Navigation />
          <div className="font-['Inter:Semi_Bold',_sans-serif] font-semibold not-italic relative shrink-0 text-[14px] text-left text-nowrap text-zinc-900">
            <p className="block leading-[22px] whitespace-pre">Dec 2020</p>
          </div>
          <Navigation1 />
        </div>
      </div>
    </div>
  );
}

function DatePickerDatePickerMenuItem() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2.5 items-center justify-center min-w-8 px-[3px] py-0 relative rounded-md shrink-0 size-8"
      data-name="_DatePicker / DatePicker / Menu Item"
    >
      <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[14px] text-center text-zinc-900 w-6">
        <p className="block leading-[22px]">Su</p>
      </div>
    </div>
  );
}

function CellWrapper() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2.5 items-start justify-center px-1.5 py-[3px] relative shrink-0 w-9"
      data-name="Cell Wrapper"
    >
      <DatePickerDatePickerMenuItem />
    </div>
  );
}

function DatePickerDatePickerMenuItem1() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2.5 items-center justify-center min-w-8 px-[3px] py-0 relative rounded-md shrink-0 size-8"
      data-name="_DatePicker / DatePicker / Menu Item"
    >
      <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[14px] text-center text-zinc-900 w-6">
        <p className="block leading-[22px]">Mo</p>
      </div>
    </div>
  );
}

function CellWrapper1() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2.5 items-start justify-center px-1.5 py-[3px] relative shrink-0 w-9"
      data-name="Cell Wrapper"
    >
      <DatePickerDatePickerMenuItem1 />
    </div>
  );
}

function DatePickerDatePickerMenuItem2() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2.5 items-center justify-center min-w-8 px-[3px] py-0 relative rounded-md shrink-0 size-8"
      data-name="_DatePicker / DatePicker / Menu Item"
    >
      <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[14px] text-center text-zinc-900 w-6">
        <p className="block leading-[22px]">Tu</p>
      </div>
    </div>
  );
}

function CellWrapper2() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2.5 items-start justify-center px-1.5 py-[3px] relative shrink-0 w-9"
      data-name="Cell Wrapper"
    >
      <DatePickerDatePickerMenuItem2 />
    </div>
  );
}

function DatePickerDatePickerMenuItem3() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2.5 items-center justify-center min-w-8 px-[3px] py-0 relative rounded-md shrink-0 size-8"
      data-name="_DatePicker / DatePicker / Menu Item"
    >
      <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[14px] text-center text-zinc-900 w-6">
        <p className="block leading-[22px]">We</p>
      </div>
    </div>
  );
}

function CellWrapper3() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2.5 items-start justify-center px-1.5 py-[3px] relative shrink-0 w-9"
      data-name="Cell Wrapper"
    >
      <DatePickerDatePickerMenuItem3 />
    </div>
  );
}

function DatePickerDatePickerMenuItem4() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2.5 items-center justify-center min-w-8 px-[3px] py-0 relative rounded-md shrink-0 size-8"
      data-name="_DatePicker / DatePicker / Menu Item"
    >
      <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[14px] text-center text-zinc-900 w-6">
        <p className="block leading-[22px]">Th</p>
      </div>
    </div>
  );
}

function CellWrapper4() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2.5 items-start justify-center px-1.5 py-[3px] relative shrink-0 w-9"
      data-name="Cell Wrapper"
    >
      <DatePickerDatePickerMenuItem4 />
    </div>
  );
}

function DatePickerDatePickerMenuItem5() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2.5 items-center justify-center min-w-8 px-[3px] py-0 relative rounded-md shrink-0 size-8"
      data-name="_DatePicker / DatePicker / Menu Item"
    >
      <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[14px] text-center text-zinc-900 w-6">
        <p className="block leading-[22px]">Fr</p>
      </div>
    </div>
  );
}

function CellWrapper5() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2.5 items-start justify-center px-1.5 py-[3px] relative shrink-0 w-9"
      data-name="Cell Wrapper"
    >
      <DatePickerDatePickerMenuItem5 />
    </div>
  );
}

function DatePickerDatePickerMenuItem6() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2.5 items-center justify-center min-w-8 px-[3px] py-0 relative rounded-md shrink-0 size-8"
      data-name="_DatePicker / DatePicker / Menu Item"
    >
      <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[14px] text-center text-zinc-900 w-6">
        <p className="block leading-[22px]">Sa</p>
      </div>
    </div>
  );
}

function CellWrapper6() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2.5 items-start justify-center px-1.5 py-[3px] relative shrink-0 w-9"
      data-name="Cell Wrapper"
    >
      <DatePickerDatePickerMenuItem6 />
    </div>
  );
}

function Row() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-start justify-start p-0 relative shrink-0"
      data-name="Row"
    >
      <CellWrapper />
      <CellWrapper1 />
      <CellWrapper2 />
      <CellWrapper3 />
      <CellWrapper4 />
      <CellWrapper5 />
      <CellWrapper6 />
    </div>
  );
}

function DatePickerDatePickerMenuItem7() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2.5 items-center justify-center min-w-8 px-[3px] py-0 relative rounded-md shrink-0 size-8"
      data-name="_DatePicker / DatePicker / Menu Item"
    >
      <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[14px] text-center text-zinc-300 w-6">
        <p className="block leading-[22px]">29</p>
      </div>
    </div>
  );
}

function CellWrapper7() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2.5 items-start justify-center px-1.5 py-[3px] relative shrink-0 w-9"
      data-name="Cell Wrapper"
    >
      <DatePickerDatePickerMenuItem7 />
    </div>
  );
}

function DatePickerDatePickerMenuItem8() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2.5 items-center justify-center min-w-8 px-[3px] py-0 relative rounded-md shrink-0 size-8"
      data-name="_DatePicker / DatePicker / Menu Item"
    >
      <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[14px] text-center text-zinc-300 w-6">
        <p className="block leading-[22px]">30</p>
      </div>
    </div>
  );
}

function CellWrapper8() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2.5 items-start justify-center px-1.5 py-[3px] relative shrink-0 w-9"
      data-name="Cell Wrapper"
    >
      <DatePickerDatePickerMenuItem8 />
    </div>
  );
}

function DatePickerDatePickerMenuItem9() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2.5 items-center justify-center min-w-8 px-[3px] py-0 relative rounded-md shrink-0 size-8"
      data-name="_DatePicker / DatePicker / Menu Item"
    >
      <div className="absolute border border-solid border-zinc-900 inset-0 pointer-events-none rounded-md" />
      <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[14px] text-center text-zinc-900 w-6">
        <p className="block leading-[22px]">1</p>
      </div>
    </div>
  );
}

function CellWrapper9() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2.5 items-start justify-center px-1.5 py-[3px] relative shrink-0 w-9"
      data-name="Cell Wrapper"
    >
      <DatePickerDatePickerMenuItem9 />
    </div>
  );
}

function DatePickerDatePickerMenuItem10() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2.5 items-center justify-center min-w-8 px-[3px] py-0 relative rounded-md shrink-0 size-8"
      data-name="_DatePicker / DatePicker / Menu Item"
    >
      <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[14px] text-center text-zinc-900 w-6">
        <p className="block leading-[22px]">2</p>
      </div>
    </div>
  );
}

function CellWrapper10() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2.5 items-start justify-center px-1.5 py-[3px] relative shrink-0 w-9"
      data-name="Cell Wrapper"
    >
      <DatePickerDatePickerMenuItem10 />
    </div>
  );
}

function DatePickerDatePickerMenuItem11() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2.5 items-center justify-center min-w-8 px-[3px] py-0 relative rounded-md shrink-0 size-8"
      data-name="_DatePicker / DatePicker / Menu Item"
    >
      <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[14px] text-center text-zinc-900 w-6">
        <p className="block leading-[22px]">3</p>
      </div>
    </div>
  );
}

function CellWrapper11() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2.5 items-start justify-center px-1.5 py-[3px] relative shrink-0 w-9"
      data-name="Cell Wrapper"
    >
      <DatePickerDatePickerMenuItem11 />
    </div>
  );
}

function DatePickerDatePickerMenuItem12() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2.5 items-center justify-center min-w-8 px-[3px] py-0 relative rounded-md shrink-0 size-8"
      data-name="_DatePicker / DatePicker / Menu Item"
    >
      <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[14px] text-center text-zinc-900 w-6">
        <p className="block leading-[22px]">4</p>
      </div>
    </div>
  );
}

function CellWrapper12() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2.5 items-start justify-center px-1.5 py-[3px] relative shrink-0 w-9"
      data-name="Cell Wrapper"
    >
      <DatePickerDatePickerMenuItem12 />
    </div>
  );
}

function DatePickerDatePickerMenuItem13() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2.5 items-center justify-center min-w-8 px-[3px] py-0 relative rounded-md shrink-0 size-8"
      data-name="_DatePicker / DatePicker / Menu Item"
    >
      <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[14px] text-center text-zinc-900 w-6">
        <p className="block leading-[22px]">5</p>
      </div>
    </div>
  );
}

function CellWrapper13() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2.5 items-start justify-center px-1.5 py-[3px] relative shrink-0 w-9"
      data-name="Cell Wrapper"
    >
      <DatePickerDatePickerMenuItem13 />
    </div>
  );
}

function Row1() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-start justify-start p-0 relative shrink-0"
      data-name="Row"
    >
      <CellWrapper7 />
      <CellWrapper8 />
      <CellWrapper9 />
      <CellWrapper10 />
      <CellWrapper11 />
      <CellWrapper12 />
      <CellWrapper13 />
    </div>
  );
}

function DatePickerDatePickerMenuItem14() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2.5 items-center justify-center min-w-8 px-[3px] py-0 relative rounded-md shrink-0 size-8"
      data-name="_DatePicker / DatePicker / Menu Item"
    >
      <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[14px] text-center text-zinc-900 w-6">
        <p className="block leading-[22px]">6</p>
      </div>
    </div>
  );
}

function CellWrapper14() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2.5 items-start justify-center px-1.5 py-[3px] relative shrink-0 w-9"
      data-name="Cell Wrapper"
    >
      <DatePickerDatePickerMenuItem14 />
    </div>
  );
}

function DatePickerDatePickerMenuItem15() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2.5 items-center justify-center min-w-8 px-[3px] py-0 relative rounded-md shrink-0 size-8"
      data-name="_DatePicker / DatePicker / Menu Item"
    >
      <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[14px] text-center text-zinc-900 w-6">
        <p className="block leading-[22px]">7</p>
      </div>
    </div>
  );
}

function CellWrapper15() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2.5 items-start justify-center px-1.5 py-[3px] relative shrink-0 w-9"
      data-name="Cell Wrapper"
    >
      <DatePickerDatePickerMenuItem15 />
    </div>
  );
}

function DatePickerDatePickerMenuItem16() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2.5 items-center justify-center min-w-8 px-[3px] py-0 relative rounded-md shrink-0 size-8"
      data-name="_DatePicker / DatePicker / Menu Item"
    >
      <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[14px] text-center text-zinc-900 w-6">
        <p className="block leading-[22px]">8</p>
      </div>
    </div>
  );
}

function CellWrapper16() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2.5 items-start justify-center px-1.5 py-[3px] relative shrink-0 w-9"
      data-name="Cell Wrapper"
    >
      <DatePickerDatePickerMenuItem16 />
    </div>
  );
}

function DatePickerDatePickerMenuItem17() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2.5 items-center justify-center min-w-8 px-[3px] py-0 relative rounded-md shrink-0 size-8"
      data-name="_DatePicker / DatePicker / Menu Item"
    >
      <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[14px] text-center text-zinc-900 w-6">
        <p className="block leading-[22px]">9</p>
      </div>
    </div>
  );
}

function CellWrapper17() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2.5 items-start justify-center px-1.5 py-[3px] relative shrink-0 w-9"
      data-name="Cell Wrapper"
    >
      <DatePickerDatePickerMenuItem17 />
    </div>
  );
}

function DatePickerDatePickerMenuItem18() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2.5 items-center justify-center min-w-8 px-[3px] py-0 relative rounded-md shrink-0 size-8"
      data-name="_DatePicker / DatePicker / Menu Item"
    >
      <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[14px] text-center text-zinc-900 w-6">
        <p className="block leading-[22px]">10</p>
      </div>
    </div>
  );
}

function CellWrapper18() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2.5 items-start justify-center px-1.5 py-[3px] relative shrink-0 w-9"
      data-name="Cell Wrapper"
    >
      <DatePickerDatePickerMenuItem18 />
    </div>
  );
}

function DatePickerDatePickerMenuItem19() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2.5 items-center justify-center min-w-8 px-[3px] py-0 relative rounded-md shrink-0 size-8"
      data-name="_DatePicker / DatePicker / Menu Item"
    >
      <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[14px] text-center text-zinc-900 w-6">
        <p className="block leading-[22px]">11</p>
      </div>
    </div>
  );
}

function CellWrapper19() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2.5 items-start justify-center px-1.5 py-[3px] relative shrink-0 w-9"
      data-name="Cell Wrapper"
    >
      <DatePickerDatePickerMenuItem19 />
    </div>
  );
}

function DatePickerDatePickerMenuItem20() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2.5 items-center justify-center min-w-8 px-[3px] py-0 relative rounded-md shrink-0 size-8"
      data-name="_DatePicker / DatePicker / Menu Item"
    >
      <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[14px] text-center text-zinc-900 w-6">
        <p className="block leading-[22px]">12</p>
      </div>
    </div>
  );
}

function CellWrapper20() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2.5 items-start justify-center px-1.5 py-[3px] relative shrink-0 w-9"
      data-name="Cell Wrapper"
    >
      <DatePickerDatePickerMenuItem20 />
    </div>
  );
}

function Row2() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-start justify-start p-0 relative shrink-0"
      data-name="Row"
    >
      <CellWrapper14 />
      <CellWrapper15 />
      <CellWrapper16 />
      <CellWrapper17 />
      <CellWrapper18 />
      <CellWrapper19 />
      <CellWrapper20 />
    </div>
  );
}

function DatePickerDatePickerMenuItem21() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2.5 items-center justify-center min-w-8 px-[3px] py-0 relative rounded-md shrink-0 size-8"
      data-name="_DatePicker / DatePicker / Menu Item"
    >
      <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[14px] text-center text-zinc-900 w-6">
        <p className="block leading-[22px]">13</p>
      </div>
    </div>
  );
}

function CellWrapper21() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2.5 items-start justify-center px-1.5 py-[3px] relative shrink-0 w-9"
      data-name="Cell Wrapper"
    >
      <DatePickerDatePickerMenuItem21 />
    </div>
  );
}

function DatePickerDatePickerMenuItem22() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2.5 items-center justify-center min-w-8 px-[3px] py-0 relative rounded-md shrink-0 size-8"
      data-name="_DatePicker / DatePicker / Menu Item"
    >
      <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[14px] text-center text-zinc-900 w-6">
        <p className="block leading-[22px]">14</p>
      </div>
    </div>
  );
}

function CellWrapper22() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2.5 items-start justify-center px-1.5 py-[3px] relative shrink-0 w-9"
      data-name="Cell Wrapper"
    >
      <DatePickerDatePickerMenuItem22 />
    </div>
  );
}

function DatePickerDatePickerMenuItem23() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2.5 items-center justify-center min-w-8 px-[3px] py-0 relative rounded-md shrink-0 size-8"
      data-name="_DatePicker / DatePicker / Menu Item"
    >
      <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[14px] text-center text-zinc-900 w-6">
        <p className="block leading-[22px]">15</p>
      </div>
    </div>
  );
}

function CellWrapper23() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2.5 items-start justify-center px-1.5 py-[3px] relative shrink-0 w-9"
      data-name="Cell Wrapper"
    >
      <DatePickerDatePickerMenuItem23 />
    </div>
  );
}

function DatePickerDatePickerMenuItem24() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2.5 items-center justify-center min-w-8 px-[3px] py-0 relative rounded-md shrink-0 size-8"
      data-name="_DatePicker / DatePicker / Menu Item"
    >
      <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[14px] text-center text-zinc-900 w-6">
        <p className="block leading-[22px]">16</p>
      </div>
    </div>
  );
}

function CellWrapper24() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2.5 items-start justify-center px-1.5 py-[3px] relative shrink-0 w-9"
      data-name="Cell Wrapper"
    >
      <DatePickerDatePickerMenuItem24 />
    </div>
  );
}

function DatePickerDatePickerMenuItem25() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2.5 items-center justify-center min-w-8 px-[3px] py-0 relative rounded-md shrink-0 size-8"
      data-name="_DatePicker / DatePicker / Menu Item"
    >
      <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[14px] text-center text-zinc-900 w-6">
        <p className="block leading-[22px]">17</p>
      </div>
    </div>
  );
}

function CellWrapper25() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2.5 items-start justify-center px-1.5 py-[3px] relative shrink-0 w-9"
      data-name="Cell Wrapper"
    >
      <DatePickerDatePickerMenuItem25 />
    </div>
  );
}

function DatePickerDatePickerMenuItem26() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2.5 items-center justify-center min-w-8 px-[3px] py-0 relative rounded-md shrink-0 size-8"
      data-name="_DatePicker / DatePicker / Menu Item"
    >
      <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[14px] text-center text-zinc-900 w-6">
        <p className="block leading-[22px]">18</p>
      </div>
    </div>
  );
}

function CellWrapper26() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2.5 items-start justify-center px-1.5 py-[3px] relative shrink-0 w-9"
      data-name="Cell Wrapper"
    >
      <DatePickerDatePickerMenuItem26 />
    </div>
  );
}

function DatePickerDatePickerMenuItem27() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2.5 items-center justify-center min-w-8 px-[3px] py-0 relative rounded-md shrink-0 size-8"
      data-name="_DatePicker / DatePicker / Menu Item"
    >
      <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[14px] text-center text-zinc-900 w-6">
        <p className="block leading-[22px]">19</p>
      </div>
    </div>
  );
}

function CellWrapper27() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2.5 items-start justify-center px-1.5 py-[3px] relative shrink-0 w-9"
      data-name="Cell Wrapper"
    >
      <DatePickerDatePickerMenuItem27 />
    </div>
  );
}

function Row3() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-start justify-start p-0 relative shrink-0"
      data-name="Row"
    >
      <CellWrapper21 />
      <CellWrapper22 />
      <CellWrapper23 />
      <CellWrapper24 />
      <CellWrapper25 />
      <CellWrapper26 />
      <CellWrapper27 />
    </div>
  );
}

function DatePickerDatePickerMenuItem28() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2.5 items-center justify-center min-w-8 px-[3px] py-0 relative rounded-md shrink-0 size-8"
      data-name="_DatePicker / DatePicker / Menu Item"
    >
      <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[14px] text-center text-zinc-900 w-6">
        <p className="block leading-[22px]">20</p>
      </div>
    </div>
  );
}

function CellWrapper28() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2.5 items-start justify-center px-1.5 py-[3px] relative shrink-0 w-9"
      data-name="Cell Wrapper"
    >
      <DatePickerDatePickerMenuItem28 />
    </div>
  );
}

function DatePickerDatePickerMenuItem29() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2.5 items-center justify-center min-w-8 px-[3px] py-0 relative rounded-md shrink-0 size-8"
      data-name="_DatePicker / DatePicker / Menu Item"
    >
      <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[14px] text-center text-zinc-900 w-6">
        <p className="block leading-[22px]">21</p>
      </div>
    </div>
  );
}

function CellWrapper29() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2.5 items-start justify-center px-1.5 py-[3px] relative shrink-0 w-9"
      data-name="Cell Wrapper"
    >
      <DatePickerDatePickerMenuItem29 />
    </div>
  );
}

function DatePickerDatePickerMenuItem30() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2.5 items-center justify-center min-w-8 px-[3px] py-0 relative rounded-md shrink-0 size-8"
      data-name="_DatePicker / DatePicker / Menu Item"
    >
      <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[14px] text-center text-zinc-900 w-6">
        <p className="block leading-[22px]">22</p>
      </div>
    </div>
  );
}

function CellWrapper30() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2.5 items-start justify-center px-1.5 py-[3px] relative shrink-0 w-9"
      data-name="Cell Wrapper"
    >
      <DatePickerDatePickerMenuItem30 />
    </div>
  );
}

function DatePickerDatePickerMenuItem31() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2.5 items-center justify-center min-w-8 px-[3px] py-0 relative rounded-md shrink-0 size-8"
      data-name="_DatePicker / DatePicker / Menu Item"
    >
      <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[14px] text-center text-zinc-900 w-6">
        <p className="block leading-[22px]">23</p>
      </div>
    </div>
  );
}

function CellWrapper31() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2.5 items-start justify-center px-1.5 py-[3px] relative shrink-0 w-9"
      data-name="Cell Wrapper"
    >
      <DatePickerDatePickerMenuItem31 />
    </div>
  );
}

function DatePickerDatePickerMenuItem32() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2.5 items-center justify-center min-w-8 px-[3px] py-0 relative rounded-md shrink-0 size-8"
      data-name="_DatePicker / DatePicker / Menu Item"
    >
      <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[14px] text-center text-zinc-900 w-6">
        <p className="block leading-[22px]">24</p>
      </div>
    </div>
  );
}

function CellWrapper32() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2.5 items-start justify-center px-1.5 py-[3px] relative shrink-0 w-9"
      data-name="Cell Wrapper"
    >
      <DatePickerDatePickerMenuItem32 />
    </div>
  );
}

function DatePickerDatePickerMenuItem33() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2.5 items-center justify-center min-w-8 px-[3px] py-0 relative rounded-md shrink-0 size-8"
      data-name="_DatePicker / DatePicker / Menu Item"
    >
      <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[14px] text-center text-zinc-900 w-6">
        <p className="block leading-[22px]">25</p>
      </div>
    </div>
  );
}

function CellWrapper33() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2.5 items-start justify-center px-1.5 py-[3px] relative shrink-0 w-9"
      data-name="Cell Wrapper"
    >
      <DatePickerDatePickerMenuItem33 />
    </div>
  );
}

function DatePickerDatePickerMenuItem34() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2.5 items-center justify-center min-w-8 px-[3px] py-0 relative rounded-md shrink-0 size-8"
      data-name="_DatePicker / DatePicker / Menu Item"
    >
      <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[14px] text-center text-zinc-900 w-6">
        <p className="block leading-[22px]">26</p>
      </div>
    </div>
  );
}

function CellWrapper34() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2.5 items-start justify-center px-1.5 py-[3px] relative shrink-0 w-9"
      data-name="Cell Wrapper"
    >
      <DatePickerDatePickerMenuItem34 />
    </div>
  );
}

function Row4() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-start justify-start p-0 relative shrink-0"
      data-name="Row"
    >
      <CellWrapper28 />
      <CellWrapper29 />
      <CellWrapper30 />
      <CellWrapper31 />
      <CellWrapper32 />
      <CellWrapper33 />
      <CellWrapper34 />
    </div>
  );
}

function DatePickerDatePickerMenuItem35() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2.5 items-center justify-center min-w-8 px-[3px] py-0 relative rounded-md shrink-0 size-8"
      data-name="_DatePicker / DatePicker / Menu Item"
    >
      <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[14px] text-center text-zinc-900 w-6">
        <p className="block leading-[22px]">27</p>
      </div>
    </div>
  );
}

function CellWrapper35() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2.5 items-start justify-center px-1.5 py-[3px] relative shrink-0 w-9"
      data-name="Cell Wrapper"
    >
      <DatePickerDatePickerMenuItem35 />
    </div>
  );
}

function DatePickerDatePickerMenuItem36() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2.5 items-center justify-center min-w-8 px-[3px] py-0 relative rounded-md shrink-0 size-8"
      data-name="_DatePicker / DatePicker / Menu Item"
    >
      <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[14px] text-center text-zinc-900 w-6">
        <p className="block leading-[22px]">28</p>
      </div>
    </div>
  );
}

function CellWrapper36() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2.5 items-start justify-center px-1.5 py-[3px] relative shrink-0 w-9"
      data-name="Cell Wrapper"
    >
      <DatePickerDatePickerMenuItem36 />
    </div>
  );
}

function DatePickerDatePickerMenuItem37() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2.5 items-center justify-center min-w-8 px-[3px] py-0 relative rounded-md shrink-0 size-8"
      data-name="_DatePicker / DatePicker / Menu Item"
    >
      <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[14px] text-center text-zinc-900 w-6">
        <p className="block leading-[22px]">29</p>
      </div>
    </div>
  );
}

function CellWrapper37() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2.5 items-start justify-center px-1.5 py-[3px] relative shrink-0 w-9"
      data-name="Cell Wrapper"
    >
      <DatePickerDatePickerMenuItem37 />
    </div>
  );
}

function DatePickerDatePickerMenuItem38() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2.5 items-center justify-center min-w-8 px-[3px] py-0 relative rounded-md shrink-0 size-8"
      data-name="_DatePicker / DatePicker / Menu Item"
    >
      <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[14px] text-center text-zinc-900 w-6">
        <p className="block leading-[22px]">30</p>
      </div>
    </div>
  );
}

function CellWrapper38() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2.5 items-start justify-center px-1.5 py-[3px] relative shrink-0 w-9"
      data-name="Cell Wrapper"
    >
      <DatePickerDatePickerMenuItem38 />
    </div>
  );
}

function DatePickerDatePickerMenuItem39() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2.5 items-center justify-center min-w-8 px-[3px] py-0 relative rounded-md shrink-0 size-8"
      data-name="_DatePicker / DatePicker / Menu Item"
    >
      <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[14px] text-center text-zinc-900 w-6">
        <p className="block leading-[22px]">31</p>
      </div>
    </div>
  );
}

function CellWrapper39() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2.5 items-start justify-center px-1.5 py-[3px] relative shrink-0 w-9"
      data-name="Cell Wrapper"
    >
      <DatePickerDatePickerMenuItem39 />
    </div>
  );
}

function DatePickerDatePickerMenuItem40() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2.5 items-center justify-center min-w-8 px-[3px] py-0 relative rounded-md shrink-0 size-8"
      data-name="_DatePicker / DatePicker / Menu Item"
    >
      <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[14px] text-center text-zinc-300 w-6">
        <p className="block leading-[22px]">1</p>
      </div>
    </div>
  );
}

function CellWrapper40() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2.5 items-start justify-center px-1.5 py-[3px] relative shrink-0 w-9"
      data-name="Cell Wrapper"
    >
      <DatePickerDatePickerMenuItem40 />
    </div>
  );
}

function DatePickerDatePickerMenuItem41() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2.5 items-center justify-center min-w-8 px-[3px] py-0 relative rounded-md shrink-0 size-8"
      data-name="_DatePicker / DatePicker / Menu Item"
    >
      <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[14px] text-center text-zinc-300 w-6">
        <p className="block leading-[22px]">2</p>
      </div>
    </div>
  );
}

function CellWrapper41() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2.5 items-start justify-center px-1.5 py-[3px] relative shrink-0 w-9"
      data-name="Cell Wrapper"
    >
      <DatePickerDatePickerMenuItem41 />
    </div>
  );
}

function Row5() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-start justify-start p-0 relative shrink-0"
      data-name="Row"
    >
      <CellWrapper35 />
      <CellWrapper36 />
      <CellWrapper37 />
      <CellWrapper38 />
      <CellWrapper39 />
      <CellWrapper40 />
      <CellWrapper41 />
    </div>
  );
}

function DatePickerDatePickerMenuItem42() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2.5 items-center justify-center min-w-8 px-[3px] py-0 relative rounded-md shrink-0 size-8"
      data-name="_DatePicker / DatePicker / Menu Item"
    >
      <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[14px] text-center text-zinc-300 w-6">
        <p className="block leading-[22px]">3</p>
      </div>
    </div>
  );
}

function CellWrapper42() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2.5 items-start justify-center px-1.5 py-[3px] relative shrink-0 w-9"
      data-name="Cell Wrapper"
    >
      <DatePickerDatePickerMenuItem42 />
    </div>
  );
}

function DatePickerDatePickerMenuItem43() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2.5 items-center justify-center min-w-8 px-[3px] py-0 relative rounded-md shrink-0 size-8"
      data-name="_DatePicker / DatePicker / Menu Item"
    >
      <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[14px] text-center text-zinc-300 w-6">
        <p className="block leading-[22px]">4</p>
      </div>
    </div>
  );
}

function CellWrapper43() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2.5 items-start justify-center px-1.5 py-[3px] relative shrink-0 w-9"
      data-name="Cell Wrapper"
    >
      <DatePickerDatePickerMenuItem43 />
    </div>
  );
}

function DatePickerDatePickerMenuItem44() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2.5 items-center justify-center min-w-8 px-[3px] py-0 relative rounded-md shrink-0 size-8"
      data-name="_DatePicker / DatePicker / Menu Item"
    >
      <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[14px] text-center text-zinc-300 w-6">
        <p className="block leading-[22px]">5</p>
      </div>
    </div>
  );
}

function CellWrapper44() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2.5 items-start justify-center px-1.5 py-[3px] relative shrink-0 w-9"
      data-name="Cell Wrapper"
    >
      <DatePickerDatePickerMenuItem44 />
    </div>
  );
}

function DatePickerDatePickerMenuItem45() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2.5 items-center justify-center min-w-8 px-[3px] py-0 relative rounded-md shrink-0 size-8"
      data-name="_DatePicker / DatePicker / Menu Item"
    >
      <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[14px] text-center text-zinc-300 w-6">
        <p className="block leading-[22px]">6</p>
      </div>
    </div>
  );
}

function CellWrapper45() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2.5 items-start justify-center px-1.5 py-[3px] relative shrink-0 w-9"
      data-name="Cell Wrapper"
    >
      <DatePickerDatePickerMenuItem45 />
    </div>
  );
}

function DatePickerDatePickerMenuItem46() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2.5 items-center justify-center min-w-8 px-[3px] py-0 relative rounded-md shrink-0 size-8"
      data-name="_DatePicker / DatePicker / Menu Item"
    >
      <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[14px] text-center text-zinc-300 w-6">
        <p className="block leading-[22px]">7</p>
      </div>
    </div>
  );
}

function CellWrapper46() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2.5 items-start justify-center px-1.5 py-[3px] relative shrink-0 w-9"
      data-name="Cell Wrapper"
    >
      <DatePickerDatePickerMenuItem46 />
    </div>
  );
}

function DatePickerDatePickerMenuItem47() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2.5 items-center justify-center min-w-8 px-[3px] py-0 relative rounded-md shrink-0 size-8"
      data-name="_DatePicker / DatePicker / Menu Item"
    >
      <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[14px] text-center text-zinc-300 w-6">
        <p className="block leading-[22px]">8</p>
      </div>
    </div>
  );
}

function CellWrapper47() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2.5 items-start justify-center px-1.5 py-[3px] relative shrink-0 w-9"
      data-name="Cell Wrapper"
    >
      <DatePickerDatePickerMenuItem47 />
    </div>
  );
}

function DatePickerDatePickerMenuItem48() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2.5 items-center justify-center min-w-8 px-[3px] py-0 relative rounded-md shrink-0 size-8"
      data-name="_DatePicker / DatePicker / Menu Item"
    >
      <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[14px] text-center text-zinc-300 w-6">
        <p className="block leading-[22px]">9</p>
      </div>
    </div>
  );
}

function CellWrapper48() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2.5 items-start justify-center px-1.5 py-[3px] relative shrink-0 w-9"
      data-name="Cell Wrapper"
    >
      <DatePickerDatePickerMenuItem48 />
    </div>
  );
}

function Row6() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-start justify-start p-0 relative shrink-0"
      data-name="Row"
    >
      <CellWrapper42 />
      <CellWrapper43 />
      <CellWrapper44 />
      <CellWrapper45 />
      <CellWrapper46 />
      <CellWrapper47 />
      <CellWrapper48 />
    </div>
  );
}

function Content() {
  return (
    <div className="relative shrink-0 w-full" data-name="Content">
      <div className="flex flex-col items-center relative size-full">
        <div className="box-border content-stretch flex flex-col items-center justify-start px-[18px] py-2 relative w-full">
          <Row />
          <Row1 />
          <Row2 />
          <Row3 />
          <Row4 />
          <Row5 />
          <Row6 />
        </div>
      </div>
    </div>
  );
}

function DatePicker1() {
  return (
    <div
      className="[grid-area:1_/_1] box-border content-stretch flex flex-col items-start justify-start ml-0 mt-0 p-0 relative w-[280px]"
      data-name="Date Picker"
    >
      <div className="absolute border-[0px_1px_0px_0px] border-[rgba(24,24,27,0)] border-solid inset-0 pointer-events-none" />
      <Header />
      <Content />
    </div>
  );
}

function TimePickerTimePickerMenuCell() {
  return (
    <div
      className="box-border content-stretch flex flex-col h-7 items-start justify-center pl-3.5 pr-0 py-0 relative rounded shrink-0 w-12"
      data-name="_TimePicker / TimePicker Menu Cell"
    >
      <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[14px] text-left text-nowrap text-zinc-900">
        <p className="block leading-[22px] whitespace-pre">00</p>
      </div>
    </div>
  );
}

function TimePickerTimePickerMenuCell1() {
  return (
    <div
      className="box-border content-stretch flex flex-col h-7 items-start justify-center pl-3.5 pr-0 py-0 relative rounded shrink-0 w-12"
      data-name="_TimePicker / TimePicker Menu Cell"
    >
      <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[14px] text-left text-nowrap text-zinc-900">
        <p className="block leading-[22px] whitespace-pre">01</p>
      </div>
    </div>
  );
}

function TimePickerTimePickerMenuCell2() {
  return (
    <div
      className="bg-zinc-100 box-border content-stretch flex flex-col h-7 items-start justify-center pl-3.5 pr-0 py-0 relative rounded shrink-0 w-12"
      data-name="_TimePicker / TimePicker Menu Cell"
    >
      <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[14px] text-left text-nowrap text-zinc-900">
        <p className="block leading-[22px] whitespace-pre">02</p>
      </div>
    </div>
  );
}

function TimePickerTimePickerMenuCell3() {
  return (
    <div
      className="box-border content-stretch flex flex-col h-7 items-start justify-center pl-3.5 pr-0 py-0 relative rounded shrink-0 w-12"
      data-name="_TimePicker / TimePicker Menu Cell"
    >
      <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[14px] text-left text-nowrap text-zinc-900">
        <p className="block leading-[22px] whitespace-pre">03</p>
      </div>
    </div>
  );
}

function TimePickerTimePickerMenuCell4() {
  return (
    <div
      className="box-border content-stretch flex flex-col h-7 items-start justify-center pl-3.5 pr-0 py-0 relative rounded shrink-0 w-12"
      data-name="_TimePicker / TimePicker Menu Cell"
    >
      <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[14px] text-left text-nowrap text-zinc-900">
        <p className="block leading-[22px] whitespace-pre">04</p>
      </div>
    </div>
  );
}

function TimePickerTimePickerMenuCell5() {
  return (
    <div
      className="box-border content-stretch flex flex-col h-7 items-start justify-center pl-3.5 pr-0 py-0 relative rounded shrink-0 w-12"
      data-name="_TimePicker / TimePicker Menu Cell"
    >
      <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[14px] text-left text-nowrap text-zinc-900">
        <p className="block leading-[22px] whitespace-pre">05</p>
      </div>
    </div>
  );
}

function TimePickerTimePickerMenuCell6() {
  return (
    <div
      className="box-border content-stretch flex flex-col h-7 items-start justify-center pl-3.5 pr-0 py-0 relative rounded shrink-0 w-12"
      data-name="_TimePicker / TimePicker Menu Cell"
    >
      <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[14px] text-left text-nowrap text-zinc-900">
        <p className="block leading-[22px] whitespace-pre">06</p>
      </div>
    </div>
  );
}

function TimePickerTimePickerMenuCell7() {
  return (
    <div
      className="box-border content-stretch flex flex-col h-7 items-start justify-center pl-3.5 pr-0 py-0 relative rounded shrink-0 w-12"
      data-name="_TimePicker / TimePicker Menu Cell"
    >
      <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[14px] text-left text-nowrap text-zinc-900">
        <p className="block leading-[22px] whitespace-pre">07</p>
      </div>
    </div>
  );
}

function Column() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-start justify-start px-1 py-0 relative shrink-0"
      data-name="Column"
    >
      <TimePickerTimePickerMenuCell />
      <TimePickerTimePickerMenuCell1 />
      <TimePickerTimePickerMenuCell2 />
      <TimePickerTimePickerMenuCell3 />
      <TimePickerTimePickerMenuCell4 />
      <TimePickerTimePickerMenuCell5 />
      <TimePickerTimePickerMenuCell6 />
      <TimePickerTimePickerMenuCell7 />
    </div>
  );
}

function TimePickerTimePickerMenuCell8() {
  return (
    <div
      className="box-border content-stretch flex flex-col h-7 items-start justify-center pl-3.5 pr-0 py-0 relative rounded shrink-0 w-12"
      data-name="_TimePicker / TimePicker Menu Cell"
    >
      <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[14px] text-left text-nowrap text-zinc-900">
        <p className="block leading-[22px] whitespace-pre">00</p>
      </div>
    </div>
  );
}

function TimePickerTimePickerMenuCell9() {
  return (
    <div
      className="box-border content-stretch flex flex-col h-7 items-start justify-center pl-3.5 pr-0 py-0 relative rounded shrink-0 w-12"
      data-name="_TimePicker / TimePicker Menu Cell"
    >
      <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[14px] text-left text-nowrap text-zinc-900">
        <p className="block leading-[22px] whitespace-pre">01</p>
      </div>
    </div>
  );
}

function TimePickerTimePickerMenuCell10() {
  return (
    <div
      className="box-border content-stretch flex flex-col h-7 items-start justify-center pl-3.5 pr-0 py-0 relative rounded shrink-0 w-12"
      data-name="_TimePicker / TimePicker Menu Cell"
    >
      <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[14px] text-left text-nowrap text-zinc-900">
        <p className="block leading-[22px] whitespace-pre">02</p>
      </div>
    </div>
  );
}

function TimePickerTimePickerMenuCell11() {
  return (
    <div
      className="box-border content-stretch flex flex-col h-7 items-start justify-center pl-3.5 pr-0 py-0 relative rounded shrink-0 w-12"
      data-name="_TimePicker / TimePicker Menu Cell"
    >
      <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[14px] text-left text-nowrap text-zinc-900">
        <p className="block leading-[22px] whitespace-pre">03</p>
      </div>
    </div>
  );
}

function TimePickerTimePickerMenuCell12() {
  return (
    <div
      className="bg-zinc-100 box-border content-stretch flex flex-col h-7 items-start justify-center pl-3.5 pr-0 py-0 relative rounded shrink-0 w-12"
      data-name="_TimePicker / TimePicker Menu Cell"
    >
      <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[14px] text-left text-nowrap text-zinc-900">
        <p className="block leading-[22px] whitespace-pre">04</p>
      </div>
    </div>
  );
}

function TimePickerTimePickerMenuCell13() {
  return (
    <div
      className="box-border content-stretch flex flex-col h-7 items-start justify-center pl-3.5 pr-0 py-0 relative rounded shrink-0 w-12"
      data-name="_TimePicker / TimePicker Menu Cell"
    >
      <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[14px] text-left text-nowrap text-zinc-900">
        <p className="block leading-[22px] whitespace-pre">05</p>
      </div>
    </div>
  );
}

function TimePickerTimePickerMenuCell14() {
  return (
    <div
      className="box-border content-stretch flex flex-col h-7 items-start justify-center pl-3.5 pr-0 py-0 relative rounded shrink-0 w-12"
      data-name="_TimePicker / TimePicker Menu Cell"
    >
      <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[14px] text-left text-nowrap text-zinc-900">
        <p className="block leading-[22px] whitespace-pre">06</p>
      </div>
    </div>
  );
}

function TimePickerTimePickerMenuCell15() {
  return (
    <div
      className="box-border content-stretch flex flex-col h-7 items-start justify-center pl-3.5 pr-0 py-0 relative rounded shrink-0 w-12"
      data-name="_TimePicker / TimePicker Menu Cell"
    >
      <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[14px] text-left text-nowrap text-zinc-900">
        <p className="block leading-[22px] whitespace-pre">07</p>
      </div>
    </div>
  );
}

function Column1() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-start justify-start px-1 py-0 relative shrink-0"
      data-name="Column"
    >
      <TimePickerTimePickerMenuCell8 />
      <TimePickerTimePickerMenuCell9 />
      <TimePickerTimePickerMenuCell10 />
      <TimePickerTimePickerMenuCell11 />
      <TimePickerTimePickerMenuCell12 />
      <TimePickerTimePickerMenuCell13 />
      <TimePickerTimePickerMenuCell14 />
      <TimePickerTimePickerMenuCell15 />
    </div>
  );
}

function TimePickerTimePickerMenuCell16() {
  return (
    <div
      className="box-border content-stretch flex flex-col h-7 items-start justify-center pl-3.5 pr-0 py-0 relative rounded shrink-0 w-12"
      data-name="_TimePicker / TimePicker Menu Cell"
    >
      <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[14px] text-left text-nowrap text-zinc-900">
        <p className="block leading-[22px] whitespace-pre">00</p>
      </div>
    </div>
  );
}

function TimePickerTimePickerMenuCell17() {
  return (
    <div
      className="box-border content-stretch flex flex-col h-7 items-start justify-center pl-3.5 pr-0 py-0 relative rounded shrink-0 w-12"
      data-name="_TimePicker / TimePicker Menu Cell"
    >
      <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[14px] text-left text-nowrap text-zinc-900">
        <p className="block leading-[22px] whitespace-pre">01</p>
      </div>
    </div>
  );
}

function TimePickerTimePickerMenuCell18() {
  return (
    <div
      className="box-border content-stretch flex flex-col h-7 items-start justify-center pl-3.5 pr-0 py-0 relative rounded shrink-0 w-12"
      data-name="_TimePicker / TimePicker Menu Cell"
    >
      <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[14px] text-left text-nowrap text-zinc-900">
        <p className="block leading-[22px] whitespace-pre">02</p>
      </div>
    </div>
  );
}

function TimePickerTimePickerMenuCell19() {
  return (
    <div
      className="box-border content-stretch flex flex-col h-7 items-start justify-center pl-3.5 pr-0 py-0 relative rounded shrink-0 w-12"
      data-name="_TimePicker / TimePicker Menu Cell"
    >
      <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[14px] text-left text-nowrap text-zinc-900">
        <p className="block leading-[22px] whitespace-pre">03</p>
      </div>
    </div>
  );
}

function TimePickerTimePickerMenuCell20() {
  return (
    <div
      className="box-border content-stretch flex flex-col h-7 items-start justify-center pl-3.5 pr-0 py-0 relative rounded shrink-0 w-12"
      data-name="_TimePicker / TimePicker Menu Cell"
    >
      <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[14px] text-left text-nowrap text-zinc-900">
        <p className="block leading-[22px] whitespace-pre">04</p>
      </div>
    </div>
  );
}

function TimePickerTimePickerMenuCell21() {
  return (
    <div
      className="box-border content-stretch flex flex-col h-7 items-start justify-center pl-3.5 pr-0 py-0 relative rounded shrink-0 w-12"
      data-name="_TimePicker / TimePicker Menu Cell"
    >
      <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[14px] text-left text-nowrap text-zinc-900">
        <p className="block leading-[22px] whitespace-pre">05</p>
      </div>
    </div>
  );
}

function TimePickerTimePickerMenuCell22() {
  return (
    <div
      className="bg-zinc-100 box-border content-stretch flex flex-col h-7 items-start justify-center pl-3.5 pr-0 py-0 relative rounded shrink-0 w-12"
      data-name="_TimePicker / TimePicker Menu Cell"
    >
      <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[14px] text-left text-nowrap text-zinc-900">
        <p className="block leading-[22px] whitespace-pre">06</p>
      </div>
    </div>
  );
}

function TimePickerTimePickerMenuCell23() {
  return (
    <div
      className="box-border content-stretch flex flex-col h-7 items-start justify-center pl-3.5 pr-0 py-0 relative rounded shrink-0 w-12"
      data-name="_TimePicker / TimePicker Menu Cell"
    >
      <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[14px] text-left text-nowrap text-zinc-900">
        <p className="block leading-[22px] whitespace-pre">07</p>
      </div>
    </div>
  );
}

function Column2() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-start justify-start px-1 py-0 relative shrink-0"
      data-name="Column"
    >
      <TimePickerTimePickerMenuCell16 />
      <TimePickerTimePickerMenuCell17 />
      <TimePickerTimePickerMenuCell18 />
      <TimePickerTimePickerMenuCell19 />
      <TimePickerTimePickerMenuCell20 />
      <TimePickerTimePickerMenuCell21 />
      <TimePickerTimePickerMenuCell22 />
      <TimePickerTimePickerMenuCell23 />
    </div>
  );
}

function Panel() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-start justify-start p-0 relative shrink-0"
      data-name="Panel"
    >
      <Column />
      <div
        className="bg-[rgba(24,24,27,0.07)] h-56 shrink-0 w-px"
        data-name="Divider"
      />
      <Column1 />
      <div
        className="bg-[rgba(24,24,27,0.07)] h-56 shrink-0 w-px"
        data-name="Divider"
      />
      <Column2 />
    </div>
  );
}

function TimePickerMenu() {
  return (
    <div
      className="[grid-area:1_/_1] h-[227px] ml-[280px] mt-[39px] relative w-[170px]"
      data-name="*TimePicker Menu*"
    >
      <div className="box-border content-stretch flex flex-col h-[227px] items-center justify-start overflow-clip pb-0 pt-1 px-0 relative w-[170px]">
        <Panel />
      </div>
      <div className="absolute border-[1px_0px_0px] border-[rgba(24,24,27,0)] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Body() {
  return (
    <div
      className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0"
      data-name="Body"
    >
      <DatePicker1 />
      <div className="[grid-area:1_/_1] h-10 ml-[281px] mt-0 w-[169px]" />
      <TimePickerMenu />
    </div>
  );
}

function Content1() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2 h-8 items-center justify-center p-0 relative shrink-0"
      data-name="Content"
    >
      <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[14px] text-left text-nowrap text-zinc-900">
        <p className="block leading-[22px] whitespace-pre">Now</p>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2 items-center justify-center px-[11px] py-0 relative rounded shrink-0"
      data-name="Button"
    >
      <Content1 />
    </div>
  );
}

function Content2() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2 h-8 items-center justify-center p-0 relative shrink-0"
      data-name="Content"
    >
      <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[14px] text-left text-nowrap">
        <p className="block leading-[22px] whitespace-pre">Ok</p>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div
      className="bg-zinc-900 box-border content-stretch flex flex-col gap-2 items-center justify-center px-[11px] py-0 relative rounded shadow-[0px_1px_2px_0px_rgba(24,24,27,0.1)] shrink-0"
      data-name="Button"
    >
      <Content2 />
    </div>
  );
}

function Footer() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-between px-3 py-2 relative shrink-0 w-[449px]"
      data-name="Footer"
    >
      <div className="absolute border-[1px_0px_0px] border-[rgba(24,24,27,0)] border-solid inset-0 pointer-events-none" />
      <Button />
      <Button1 />
    </div>
  );
}

function DatePickerMenu() {
  return (
    <div
      className="absolute bg-[#ffffff] box-border content-stretch flex flex-col items-start justify-start left-[105px] overflow-clip p-0 rounded-md shadow-[0px_6px_16px_0px_rgba(0,0,0,0.08),0px_3px_6px_-4px_rgba(0,0,0,0.12),0px_9px_28px_8px_rgba(0,0,0,0.05)] top-[47px]"
      data-name="DatePicker Menu"
    >
      <Body />
      <Footer />
    </div>
  );
}

export default function Frame1() {
  return (
    <div className="bg-[#ffffff] relative size-full">
      <DatePicker />
      <DatePickerMenu />
    </div>
  );
}