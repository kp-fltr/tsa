function TabsTabItemBasic() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-3 items-center justify-center px-0 py-3 relative shrink-0"
      data-name="_Tabs / Tab Item / Basic"
    >
      <div
        aria-hidden="true"
        className="absolute border-[0px_0px_2px] border-solid border-zinc-900 inset-0 pointer-events-none"
      />
      <div className="font-['Inter:Semi_Bold',_sans-serif] font-semibold leading-[0] not-italic relative shrink-0 text-[14px] text-left text-nowrap text-zinc-900">
        <p className="block leading-[22px] whitespace-pre">Tab title</p>
      </div>
    </div>
  );
}

function TabsTabItemBasic1() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-3 items-center justify-center px-0 py-3 relative shrink-0"
      data-name="_Tabs / Tab Item / Basic"
    >
      <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[14px] text-left text-nowrap text-zinc-900">
        <p className="block leading-[22px] whitespace-pre">Tab title</p>
      </div>
    </div>
  );
}

function Tabs() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-8 items-start justify-start p-0 relative shrink-0 w-full"
      data-name="Tabs"
    >
      <div
        aria-hidden="true"
        className="absolute border-[0px_0px_1px] border-solid border-zinc-200 inset-0 pointer-events-none"
      />
      <TabsTabItemBasic />
      {[...Array(5).keys()].map((_, i) => (
        <TabsTabItemBasic1 key={i} />
      ))}
    </div>
  );
}

function SlotBasic() {
  return (
    <div
      className="bg-zinc-100 relative rounded-sm shrink-0 w-full"
      data-name="Slot / Basic"
    >
      <div
        aria-hidden="true"
        className="absolute border border-dashed border-zinc-300 inset-0 pointer-events-none rounded-sm"
      />
      <div className="flex flex-row items-center justify-center relative size-full">
        <div className="box-border content-stretch flex flex-row gap-4 items-center justify-center p-[16px] relative w-full">
          <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[14px] text-center text-nowrap text-zinc-900">
            <p className="block leading-[22px] whitespace-pre">
              Slot component
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Space() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-4 items-start justify-start p-0 relative shrink-0 w-full"
      data-name="Space"
    >
      <SlotBasic />
    </div>
  );
}

function TabsContent() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2 items-start justify-start px-0 py-4 relative shrink-0 w-full"
      data-name="Tabs Content"
    >
      <Space />
    </div>
  );
}

export default function TabsBasic() {
  return (
    <div
      className="bg-[#ffffff] box-border content-stretch flex flex-col items-start justify-start p-0 relative size-full"
      data-name="Tabs /  Basic"
    >
      <Tabs />
      <TabsContent />
    </div>
  );
}