import svgPaths from "./svg-u9o4joa0qc";
import imgRectangle3 from "figma:asset/e4994283332609b7f24770ef80a0261324ada328.png";

function TableTitle() {
  return (
    <div className="relative shrink-0 w-full" data-name="Table Title">
      <div className="relative size-full">
        <div className="box-border content-stretch flex flex-row gap-2 items-start justify-start p-[8px] relative w-full">
          <div className="flex flex-col font-['Inter:Regular',_sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-left text-nowrap text-zinc-900">
            <p className="block leading-[22px] whitespace-pre">Table title</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function IconPlusSquareOutlined() {
  return (
    <div
      className="h-[22px] relative shrink-0 w-4"
      data-name="Icon / PlusSquareOutlined"
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 32 32"
      >
        <g id="Icon / PlusSquareOutlined" opacity="0">
          <g id="Vector">
            <path d={svgPaths.pf5eab00} fill="#717179" />
            <path d={svgPaths.p37b4e00} fill="#717179" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function TableTableItemHeaderControl() {
  return (
    <div
      className="bg-[rgba(24,24,27,0.02)] box-border content-stretch flex flex-row gap-2.5 h-[54px] items-center justify-center p-[16px] relative shrink-0"
      data-name="_Table / Table Item / Header Control"
    >
      <div
        aria-hidden="true"
        className="absolute border-[0px_0px_1px] border-[rgba(24,24,27,0)] border-solid inset-0 pointer-events-none"
      />
      <IconPlusSquareOutlined />
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute inset-[20%]">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 10 10"
      >
        <g id="Group 1">
          <path
            d="M4.8 -4.76837e-08V9.6"
            id="Vector 1"
            stroke="var(--stroke-0, #18181B)"
          />
          <path
            d="M9.6 4.8L1.19209e-07 4.8"
            id="Vector 2"
            stroke="var(--stroke-0, #18181B)"
          />
        </g>
      </svg>
    </div>
  );
}

function TableTableItemCollapse() {
  return (
    <div
      className="relative shrink-0 size-4"
      data-name="_Table / Table Item / Collapse"
    >
      <div className="absolute bg-[#ffffff] inset-0 rounded-sm" />
      <Group1 />
    </div>
  );
}

function TableTableItemRowControl() {
  return (
    <div
      className="bg-[#ffffff] box-border content-stretch flex flex-row gap-2.5 h-[54px] items-center justify-center p-[16px] relative shrink-0"
      data-name="_Table / Table Item / Row Control"
    >
      <div
        aria-hidden="true"
        className="absolute border-[0px_0px_1px] border-[rgba(24,24,27,0)] border-solid inset-0 pointer-events-none"
      />
      <TableTableItemCollapse />
    </div>
  );
}

function Column() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-start justify-start p-0 relative shrink-0"
      data-name="Column"
    >
      <TableTableItemHeaderControl />
      {[...Array(6).keys()].map((_, i) => (
        <TableTableItemRowControl key={i} />
      ))}
    </div>
  );
}

function CheckboxInactiveDefault() {
  return (
    <div
      className="relative shrink-0 size-4"
      data-name="Checkbox/Inactive/Default"
    >
      <div className="absolute inset-0" />
    </div>
  );
}

function CheckboxWrapper() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2 items-start justify-start px-0 py-[3px] relative shrink-0"
      data-name="Checkbox Wrapper"
    >
      <CheckboxInactiveDefault />
    </div>
  );
}

function Checkbox() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2 items-center justify-start p-0 relative shrink-0"
      data-name="Checkbox"
    >
      <CheckboxWrapper />
    </div>
  );
}

function TableTableItemHeaderControl1() {
  return (
    <div
      className="bg-[rgba(24,24,27,0.02)] box-border content-stretch flex flex-row gap-2.5 h-[54px] items-center justify-center p-[16px] relative shrink-0"
      data-name="_Table / Table Item / Header Control"
    >
      <div
        aria-hidden="true"
        className="absolute border-[0px_0px_1px] border-[rgba(24,24,27,0)] border-solid inset-0 pointer-events-none"
      />
      <Checkbox />
    </div>
  );
}

function CheckboxInactiveDefault1() {
  return (
    <div
      className="relative shrink-0 size-4"
      data-name="Checkbox/Inactive/Default"
    >
      <div className="absolute inset-0" />
    </div>
  );
}

function CheckboxWrapper1() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2 items-start justify-start px-0 py-[3px] relative shrink-0"
      data-name="Checkbox Wrapper"
    >
      <CheckboxInactiveDefault1 />
    </div>
  );
}

function Checkbox1() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2 items-center justify-start p-0 relative shrink-0"
      data-name="Checkbox"
    >
      <CheckboxWrapper1 />
    </div>
  );
}

function TableTableItemRowControl6() {
  return (
    <div
      className="bg-[#ffffff] box-border content-stretch flex flex-row gap-2.5 h-[54px] items-center justify-center p-[16px] relative shrink-0"
      data-name="_Table / Table Item / Row Control"
    >
      <div
        aria-hidden="true"
        className="absolute border-[0px_0px_1px] border-[rgba(24,24,27,0)] border-solid inset-0 pointer-events-none"
      />
      <Checkbox1 />
    </div>
  );
}

function Column1() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-start justify-start p-0 relative shrink-0"
      data-name="Column"
    >
      <TableTableItemHeaderControl1 />
      {[...Array(6).keys()].map((_, i) => (
        <TableTableItemRowControl6 key={i} />
      ))}
    </div>
  );
}

function TablerIconFilterFilled() {
  return (
    <div
      className="relative shrink-0 size-3"
      data-name="tabler icon / filter-filled"
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 12 12"
      >
        <g id="tabler icon / filter-filled">
          <path
            d={svgPaths.p73de300}
            fill="var(--fill-0, #D4D4D8)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function TableTableItemDropdownTrigger() {
  return (
    <div
      className="box-border content-stretch flex flex-row h-full items-center justify-center px-1 py-0 relative rounded-md shrink-0"
      data-name="_Table / Table Item / Dropdown Trigger"
    >
      <TablerIconFilterFilled />
    </div>
  );
}

function Wrapper() {
  return (
    <div
      className="basis-0 grow min-h-px min-w-px relative shrink-0"
      data-name="Wrapper"
    >
      <div
        aria-hidden="true"
        className="absolute border-[0px_0.5px] border-solid border-zinc-200 inset-0 pointer-events-none"
      />
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex flex-row gap-2 items-center justify-start px-4 py-0 relative w-full">
          <div className="basis-0 flex flex-col font-['Inter:Semi_Bold',_sans-serif] font-semibold grow justify-center leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[14px] text-left text-zinc-900">
            <p className="block leading-[22px]">Name</p>
          </div>
          <div className="flex flex-row items-center self-stretch">
            <TableTableItemDropdownTrigger />
          </div>
        </div>
      </div>
    </div>
  );
}

function Header() {
  return (
    <div
      className="basis-0 bg-[rgba(24,24,27,0.02)] box-border content-stretch flex flex-row gap-2.5 grow h-full items-center justify-start min-h-px min-w-px px-0 py-4 relative shrink-0"
      data-name="Header"
    >
      <div
        aria-hidden="true"
        className="absolute border-[0px_0px_1px] border-[rgba(24,24,27,0)] border-solid inset-0 pointer-events-none"
      />
      <Wrapper />
    </div>
  );
}

function TableTableItemHeaderItem() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-start min-w-[155px] p-0 relative shrink-0 w-full"
      data-name="_Table / Table Item / Header Item"
    >
      <div className="basis-0 flex flex-row grow items-center self-stretch shrink-0">
        <Header />
      </div>
    </div>
  );
}

function Avatar() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2 items-start justify-start p-0 relative rounded-[96px] shrink-0 size-9"
      data-name="Avatar"
    >
      <div
        className="basis-0 bg-center bg-cover bg-no-repeat grow h-full min-h-px min-w-px rounded-[999px] shrink-0"
        style={{ backgroundImage: `url('${imgRectangle3}')` }}
      />
    </div>
  );
}

function TextWrapper() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col grow items-start justify-start min-h-px min-w-[60px] p-0 relative shrink-0"
      data-name="Text Wrapper"
    >
      <div className="flex flex-col font-['Inter:Regular',_sans-serif] font-normal justify-center leading-[0] min-w-[60px] not-italic relative shrink-0 text-[14px] text-left text-nowrap text-zinc-900">
        <p className="block leading-[22px] whitespace-pre">Table cell text</p>
      </div>
    </div>
  );
}

function TableTableCell() {
  return (
    <div
      className="h-[54px] min-w-[155px] relative shrink-0 w-full"
      data-name="_Table / Table cell"
    >
      <div
        aria-hidden="true"
        className="absolute border-[0px_0px_1px] border-solid border-zinc-200 inset-0 pointer-events-none"
      />
      <div className="flex flex-row items-center min-w-inherit relative size-full">
        <div className="box-border content-stretch flex flex-row gap-4 h-[54px] items-center justify-start min-w-inherit p-[16px] relative w-full">
          <Avatar />
          <TextWrapper />
        </div>
      </div>
    </div>
  );
}

function Column2() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col grow items-start justify-start min-h-px min-w-px overflow-clip p-0 relative shrink-0"
      data-name="Column"
    >
      <TableTableItemHeaderItem />
      {[...Array(6).keys()].map((_, i) => (
        <TableTableCell key={i} />
      ))}
    </div>
  );
}

function TablerIconFilterFilled1() {
  return (
    <div
      className="relative shrink-0 size-3"
      data-name="tabler icon / filter-filled"
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 12 12"
      >
        <g id="tabler icon / filter-filled">
          <path
            d={svgPaths.p73de300}
            fill="var(--fill-0, #D4D4D8)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function TableTableItemDropdownTrigger1() {
  return (
    <div
      className="box-border content-stretch flex flex-row h-full items-center justify-center px-1 py-0 relative rounded-md shrink-0"
      data-name="_Table / Table Item / Dropdown Trigger"
    >
      <TablerIconFilterFilled1 />
    </div>
  );
}

function Wrapper1() {
  return (
    <div
      className="basis-0 grow min-h-px min-w-px relative shrink-0"
      data-name="Wrapper"
    >
      <div
        aria-hidden="true"
        className="absolute border-[0px_0.5px] border-solid border-zinc-200 inset-0 pointer-events-none"
      />
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex flex-row gap-2 items-center justify-start px-4 py-0 relative w-full">
          <div className="basis-0 flex flex-col font-['Inter:Semi_Bold',_sans-serif] font-semibold grow justify-center leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[14px] text-left text-zinc-900">
            <p className="block leading-[22px]">Age</p>
          </div>
          <div className="flex flex-row items-center self-stretch">
            <TableTableItemDropdownTrigger1 />
          </div>
        </div>
      </div>
    </div>
  );
}

function Header1() {
  return (
    <div
      className="basis-0 bg-[rgba(24,24,27,0.02)] box-border content-stretch flex flex-row gap-2.5 grow h-full items-center justify-start min-h-px min-w-px px-0 py-4 relative shrink-0"
      data-name="Header"
    >
      <div
        aria-hidden="true"
        className="absolute border-[0px_0px_1px] border-[rgba(24,24,27,0)] border-solid inset-0 pointer-events-none"
      />
      <Wrapper1 />
    </div>
  );
}

function TableTableItemHeaderItem1() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-start min-w-[155px] p-0 relative shrink-0 w-full"
      data-name="_Table / Table Item / Header Item"
    >
      <div className="basis-0 flex flex-row grow items-center self-stretch shrink-0">
        <Header1 />
      </div>
    </div>
  );
}

function TextWrapper6() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col grow items-start justify-start min-h-px min-w-[60px] p-0 relative shrink-0"
      data-name="Text Wrapper"
    >
      <div className="flex flex-col font-['Inter:Regular',_sans-serif] font-normal justify-center leading-[0] min-w-[60px] not-italic relative shrink-0 text-[14px] text-left text-nowrap text-zinc-900">
        <p className="block leading-[22px] whitespace-pre">Table cell text</p>
      </div>
    </div>
  );
}

function TableTableCell6() {
  return (
    <div
      className="h-[54px] min-w-[155px] relative shrink-0 w-full"
      data-name="_Table / Table cell"
    >
      <div
        aria-hidden="true"
        className="absolute border-[0px_0px_1px] border-solid border-zinc-200 inset-0 pointer-events-none"
      />
      <div className="flex flex-row items-center min-w-inherit relative size-full">
        <div className="box-border content-stretch flex flex-row gap-4 h-[54px] items-center justify-start min-w-inherit p-[16px] relative w-full">
          <TextWrapper6 />
        </div>
      </div>
    </div>
  );
}

function Column3() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col grow items-start justify-start min-h-px min-w-px overflow-clip p-0 relative shrink-0"
      data-name="Column"
    >
      <TableTableItemHeaderItem1 />
      {[...Array(6).keys()].map((_, i) => (
        <TableTableCell6 key={i} />
      ))}
    </div>
  );
}

function Wrapper2() {
  return (
    <div
      className="basis-0 grow min-h-px min-w-px relative shrink-0"
      data-name="Wrapper"
    >
      <div
        aria-hidden="true"
        className="absolute border-[0px_0.5px] border-solid border-zinc-200 inset-0 pointer-events-none"
      />
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex flex-row gap-2 items-center justify-start px-4 py-0 relative w-full">
          <div className="basis-0 flex flex-col font-['Inter:Semi_Bold',_sans-serif] font-semibold grow justify-center leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[14px] text-left text-zinc-900">
            <p className="block leading-[22px]">City</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Header2() {
  return (
    <div
      className="basis-0 bg-[rgba(24,24,27,0.02)] box-border content-stretch flex flex-row gap-2.5 grow h-full items-center justify-start min-h-px min-w-px px-0 py-4 relative shrink-0"
      data-name="Header"
    >
      <div
        aria-hidden="true"
        className="absolute border-[0px_0px_1px] border-[rgba(24,24,27,0)] border-solid inset-0 pointer-events-none"
      />
      <Wrapper2 />
    </div>
  );
}

function TableTableItemHeaderItem2() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-start min-w-[155px] p-0 relative shrink-0 w-full"
      data-name="_Table / Table Item / Header Item"
    >
      <div className="basis-0 flex flex-row grow items-center self-stretch shrink-0">
        <Header2 />
      </div>
    </div>
  );
}

function TextWrapper12() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col grow items-start justify-start min-h-px min-w-[60px] p-0 relative shrink-0"
      data-name="Text Wrapper"
    >
      <div className="flex flex-col font-['Inter:Regular',_sans-serif] font-normal justify-center leading-[0] min-w-[60px] not-italic relative shrink-0 text-[14px] text-left text-nowrap text-zinc-900">
        <p className="block leading-[22px] whitespace-pre">Table cell text</p>
      </div>
    </div>
  );
}

function TableTableCell12() {
  return (
    <div
      className="h-[54px] min-w-[155px] relative shrink-0 w-full"
      data-name="_Table / Table cell"
    >
      <div
        aria-hidden="true"
        className="absolute border-[0px_0px_1px] border-solid border-zinc-200 inset-0 pointer-events-none"
      />
      <div className="flex flex-row items-center min-w-inherit relative size-full">
        <div className="box-border content-stretch flex flex-row gap-4 h-[54px] items-center justify-start min-w-inherit p-[16px] relative w-full">
          <TextWrapper12 />
        </div>
      </div>
    </div>
  );
}

function Column4() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col grow items-start justify-start min-h-px min-w-px overflow-clip p-0 relative shrink-0"
      data-name="Column"
    >
      <TableTableItemHeaderItem2 />
      {[...Array(6).keys()].map((_, i) => (
        <TableTableCell12 key={i} />
      ))}
    </div>
  );
}

function Wrapper3() {
  return (
    <div
      className="basis-0 grow min-h-px min-w-px relative shrink-0"
      data-name="Wrapper"
    >
      <div
        aria-hidden="true"
        className="absolute border-[0px_0.5px] border-solid border-zinc-200 inset-0 pointer-events-none"
      />
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex flex-row gap-2 items-center justify-start px-4 py-0 relative w-full">
          <div className="basis-0 flex flex-col font-['Inter:Semi_Bold',_sans-serif] font-semibold grow justify-center leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[14px] text-left text-zinc-900">
            <p className="block leading-[22px]">Status</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Header3() {
  return (
    <div
      className="basis-0 bg-[rgba(24,24,27,0.02)] box-border content-stretch flex flex-row gap-2.5 grow h-full items-center justify-start min-h-px min-w-px px-0 py-4 relative shrink-0"
      data-name="Header"
    >
      <div
        aria-hidden="true"
        className="absolute border-[0px_0px_1px] border-[rgba(24,24,27,0)] border-solid inset-0 pointer-events-none"
      />
      <Wrapper3 />
    </div>
  );
}

function TableTableItemHeaderItem3() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-start min-w-[155px] p-0 relative shrink-0 w-full"
      data-name="_Table / Table Item / Header Item"
    >
      <div className="basis-0 flex flex-row grow items-center self-stretch shrink-0">
        <Header3 />
      </div>
    </div>
  );
}

function TagStatus() {
  return (
    <div
      className="bg-[rgba(24,24,27,0.02)] box-border content-stretch flex flex-row gap-1 items-center justify-start px-2 py-px relative rounded shrink-0"
      data-name="Tag / Status"
    >
      <div
        aria-hidden="true"
        className="absolute border border-solid border-zinc-300 inset-0 pointer-events-none rounded"
      />
      <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[12px] text-left text-nowrap text-zinc-900">
        <p className="block leading-[20px] whitespace-pre">Default</p>
      </div>
    </div>
  );
}

function TableTableCell18() {
  return (
    <div
      className="h-[54px] min-w-[155px] relative shrink-0 w-full"
      data-name="_Table / Table cell"
    >
      <div
        aria-hidden="true"
        className="absolute border-[0px_0px_1px] border-solid border-zinc-200 inset-0 pointer-events-none"
      />
      <div className="flex flex-row items-center min-w-inherit relative size-full">
        <div className="[flex-flow:wrap] box-border content-center flex gap-4 h-[54px] items-center justify-start min-w-inherit p-[16px] relative w-full">
          <TagStatus />
        </div>
      </div>
    </div>
  );
}

function Column5() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col grow items-start justify-start min-h-px min-w-px overflow-clip p-0 relative shrink-0"
      data-name="Column"
    >
      <TableTableItemHeaderItem3 />
      {[...Array(6).keys()].map((_, i) => (
        <TableTableCell18 key={i} />
      ))}
    </div>
  );
}

function Wrapper4() {
  return (
    <div
      className="basis-0 grow min-h-px min-w-px relative shrink-0"
      data-name="Wrapper"
    >
      <div
        aria-hidden="true"
        className="absolute border-[0px_0.5px] border-solid border-zinc-200 inset-0 pointer-events-none"
      />
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex flex-row gap-2 items-center justify-start px-4 py-0 relative w-full">
          <div className="basis-0 flex flex-col font-['Inter:Semi_Bold',_sans-serif] font-semibold grow justify-center leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[14px] text-left text-zinc-900">
            <p className="block leading-[22px]">Action</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Header4() {
  return (
    <div
      className="basis-0 bg-[rgba(24,24,27,0.02)] box-border content-stretch flex flex-row gap-2.5 grow h-full items-center justify-start min-h-px min-w-px px-0 py-4 relative shrink-0"
      data-name="Header"
    >
      <div
        aria-hidden="true"
        className="absolute border-[0px_0px_1px] border-[rgba(24,24,27,0)] border-solid inset-0 pointer-events-none"
      />
      <Wrapper4 />
    </div>
  );
}

function TableTableItemHeaderItem4() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-start min-w-[155px] p-0 relative shrink-0 w-full"
      data-name="_Table / Table Item / Header Item"
    >
      <div className="basis-0 flex flex-row grow items-center self-stretch shrink-0">
        <Header4 />
      </div>
    </div>
  );
}

function TableTableCell24() {
  return (
    <div
      className="h-[54px] min-w-[155px] relative shrink-0 w-full"
      data-name="_Table / Table cell"
    >
      <div
        aria-hidden="true"
        className="absolute border-[0px_0px_1px] border-solid border-zinc-200 inset-0 pointer-events-none"
      />
      <div className="flex flex-row items-center min-w-inherit relative size-full">
        <div className="box-border content-stretch flex flex-row font-['Inter:Regular',_sans-serif] font-normal gap-4 h-[54px] items-center justify-start leading-[0] min-w-inherit not-italic p-[16px] relative text-[14px] text-left text-nowrap text-zinc-900 w-full">
          <div className="relative shrink-0">
            <p className="block leading-[22px] text-nowrap whitespace-pre">
              Action 1
            </p>
          </div>
          <div className="relative shrink-0">
            <p className="block leading-[22px] text-nowrap whitespace-pre">
              Action 2
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Column6() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col grow items-start justify-start min-h-px min-w-px overflow-clip p-0 relative shrink-0"
      data-name="Column"
    >
      <TableTableItemHeaderItem4 />
      {[...Array(6).keys()].map((_, i) => (
        <TableTableCell24 key={i} />
      ))}
    </div>
  );
}

function Columns() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-end justify-start p-0 relative shrink-0 w-full"
      data-name="Columns"
    >
      <Column />
      <Column1 />
      <Column2 />
      <Column3 />
      <Column4 />
      <Column5 />
      <Column6 />
    </div>
  );
}

function TextWrapper18() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col grow items-start justify-start min-h-px min-w-[60px] p-0 relative shrink-0"
      data-name="Text Wrapper"
    >
      <div className="flex flex-col font-['Inter:Regular',_sans-serif] font-normal justify-center leading-[0] min-w-[60px] not-italic relative shrink-0 text-[14px] text-left text-zinc-900 w-full">
        <p className="block leading-[22px]">This is footer</p>
      </div>
    </div>
  );
}

function TableDivider() {
  return (
    <div
      className="bg-[rgba(24,24,27,0.02)] h-[54px] relative shrink-0 w-full"
      data-name="Table Divider"
    >
      <div
        aria-hidden="true"
        className="absolute border-[0px_0px_1px] border-[rgba(24,24,27,0)] border-solid inset-0 pointer-events-none"
      />
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex flex-row gap-4 h-[54px] items-center justify-start p-[16px] relative w-full">
          <TextWrapper18 />
        </div>
      </div>
    </div>
  );
}

function Table() {
  return (
    <div
      className="bg-[#ffffff] box-border content-stretch flex flex-col items-end justify-start overflow-clip p-0 relative rounded-lg shrink-0 w-full"
      data-name="Table"
    >
      <Columns />
      <TableDivider />
    </div>
  );
}

function TablerIconChevronLeft() {
  return (
    <div
      className="relative shrink-0 size-3.5"
      data-name="tabler icon / chevron-left"
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 14 14"
      >
        <g id="tabler icon / chevron-left">
          <path
            d="M8.75 3.5L5.25 7L8.75 10.5"
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

function PaginationPaginationItemArrow() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2.5 items-center justify-center px-1.5 py-0 relative rounded-md shrink-0 size-9"
      data-name="_Pagination / Pagination Item / Arrow"
    >
      <TablerIconChevronLeft />
    </div>
  );
}

function PaginationPaginationItemNumber() {
  return (
    <div
      className="bg-[#ffffff] box-border content-stretch flex flex-col gap-2.5 items-center justify-center px-1.5 py-0 relative rounded-md shrink-0 size-9"
      data-name="_Pagination / Pagination Item / Number"
    >
      <div
        aria-hidden="true"
        className="absolute border border-solid border-zinc-900 inset-0 pointer-events-none rounded-md"
      />
      <div className="font-['Inter:Semi_Bold',_sans-serif] font-semibold leading-[0] not-italic relative shrink-0 text-[14px] text-center text-zinc-900 w-full">
        <p className="block leading-[22px]">1</p>
      </div>
    </div>
  );
}

function PaginationPaginationItemNumber1() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2.5 items-center justify-center px-1.5 py-0 relative rounded-md shrink-0 size-9"
      data-name="_Pagination / Pagination Item / Number"
    >
      <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[14px] text-center text-zinc-900 w-full">
        <p className="block leading-[22px]">2</p>
      </div>
    </div>
  );
}

function PaginationPaginationItemNumber2() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2.5 items-center justify-center px-1.5 py-0 relative rounded-md shrink-0 size-9"
      data-name="_Pagination / Pagination Item / Number"
    >
      <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[14px] text-center text-zinc-900 w-full">
        <p className="block leading-[22px]">3</p>
      </div>
    </div>
  );
}

function PaginationPaginationItemNumber3() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2.5 items-center justify-center px-1.5 py-0 relative rounded-md shrink-0 size-9"
      data-name="_Pagination / Pagination Item / Number"
    >
      <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[14px] text-center text-zinc-900 w-full">
        <p className="block leading-[22px]">4</p>
      </div>
    </div>
  );
}

function PaginationPaginationItemNumber4() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2.5 items-center justify-center px-1.5 py-0 relative rounded-md shrink-0 size-9"
      data-name="_Pagination / Pagination Item / Number"
    >
      <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[14px] text-center text-zinc-900 w-full">
        <p className="block leading-[22px]">5</p>
      </div>
    </div>
  );
}

function TablerIconChevronRight() {
  return (
    <div
      className="relative shrink-0 size-3.5"
      data-name="tabler icon / chevron-right"
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 14 14"
      >
        <g id="tabler icon / chevron-right">
          <path
            d="M5.25 3.5L8.75 7L5.25 10.5"
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

function PaginationPaginationItemArrow1() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2.5 items-center justify-center px-1.5 py-0 relative rounded-md shrink-0 size-9"
      data-name="_Pagination / Pagination Item / Arrow"
    >
      <TablerIconChevronRight />
    </div>
  );
}

function Pagination() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2 items-start justify-start px-0 py-4 relative shrink-0"
      data-name="Pagination"
    >
      <PaginationPaginationItemArrow />
      <PaginationPaginationItemNumber />
      <PaginationPaginationItemNumber1 />
      <PaginationPaginationItemNumber2 />
      <PaginationPaginationItemNumber3 />
      <PaginationPaginationItemNumber4 />
      <PaginationPaginationItemArrow1 />
    </div>
  );
}

export default function Table1() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-end justify-start p-0 relative size-full"
      data-name="Table"
    >
      <TableTitle />
      <Table />
      <Pagination />
    </div>
  );
}