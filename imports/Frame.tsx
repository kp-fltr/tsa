import svgPaths from "./svg-jg63o9pnp3";
import imgImg from "figma:asset/f578f9c2a181ef669150341163e63e6e9da01878.png";

function Div() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-8 left-0 top-0 w-[84px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Div1() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-8 left-6 top-4 w-[263px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div />
    </div>
  );
}

function Div2() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-16 left-0 top-2 w-[311px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div1 />
    </div>
  );
}

function Frame() {
  return (
    <div className="h-4 relative shrink-0 w-[18px]" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 18 16"
      >
        <g id="Frame">
          <g clipPath="url(#clip0_1_278)">
            <path
              d={svgPaths.p2a5f7c00}
              fill="var(--fill-0, #0C0C0D)"
              id="Vector"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_1_278">
            <path d="M0 0H18V16H0V0Z" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame1() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-4 items-center justify-center left-0 overflow-clip p-0 top-[3px] w-[18px]"
      data-name="Frame"
    >
      <Frame />
    </div>
  );
}

function Div3() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[26px] left-7 top-0 w-[235px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div
        className="absolute font-['Roboto:Regular',_sans-serif] font-normal h-[26px] leading-[0] left-0 text-[#0c0c0d] text-[16px] text-left top-[3px] w-[83px]"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[normal]">Dashboard</p>
      </div>
    </div>
  );
}

function Div4() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[26px] left-2 top-2 w-[263px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Frame1 />
      <Div3 />
    </div>
  );
}

function Div5() {
  return (
    <div
      className="absolute bg-[#f2f2f2] h-[42px] left-4 top-2 w-[279px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div4 />
    </div>
  );
}

function Frame2() {
  return (
    <div className="relative shrink-0 size-4" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 16 16"
      >
        <g id="Frame">
          <g clipPath="url(#clip0_1_272)">
            <path
              d={svgPaths.p203b4600}
              fill="var(--fill-0, #0C0C0D)"
              id="Vector"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_1_272">
            <path d="M0 0H16V16H0V0Z" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame3() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row items-center justify-center left-0 overflow-clip p-0 size-4 top-[3px]"
      data-name="Frame"
    >
      <Frame2 />
    </div>
  );
}

function Div6() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[26px] left-7 top-0 w-[235px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div
        className="absolute font-['Roboto:Regular',_sans-serif] font-normal h-[26px] leading-[0] left-0 text-[#0c0c0d] text-[16px] text-left top-[3px] w-[67px]"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[normal]">Test List</p>
      </div>
    </div>
  );
}

function Div7() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[26px] left-2 top-2 w-[263px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Frame3 />
      <Div6 />
    </div>
  );
}

function Div8() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[42px] left-4 top-[50px] w-[279px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div7 />
    </div>
  );
}

function Frame4() {
  return (
    <div className="h-4 relative shrink-0 w-5" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 20 16"
      >
        <g id="Frame">
          <g clipPath="url(#clip0_1_305)">
            <path
              d={svgPaths.p1b4569c0}
              fill="var(--fill-0, #0C0C0D)"
              id="Vector"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_1_305">
            <path d="M0 0H20V16H0V0Z" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame5() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-4 items-center justify-center left-0 overflow-clip p-0 top-[3px] w-5"
      data-name="Frame"
    >
      <Frame4 />
    </div>
  );
}

function Div9() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[26px] left-7 top-0 w-[235px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div
        className="absolute font-['Roboto:Regular',_sans-serif] font-normal h-[26px] leading-[0] left-0 text-[#0c0c0d] text-[16px] text-left top-[3px] w-[116px]"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[normal]">Client Directory</p>
      </div>
    </div>
  );
}

function Div10() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[26px] left-2 top-2 w-[263px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Frame5 />
      <Div9 />
    </div>
  );
}

function Div11() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[42px] left-4 top-[92px] w-[279px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div10 />
    </div>
  );
}

function Frame6() {
  return (
    <div className="h-4 relative shrink-0 w-3.5" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 14 16"
      >
        <g id="Frame">
          <path d="M14 16H0V0H14V16Z" stroke="var(--stroke-0, #E5E7EB)" />
          <path
            d={svgPaths.p366d0c80}
            fill="var(--fill-0, #0C0C0D)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Frame7() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-4 items-center justify-center left-0 overflow-clip p-0 top-[3px] w-3.5"
      data-name="Frame"
    >
      <Frame6 />
    </div>
  );
}

function Div12() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[26px] left-7 top-0 w-[235px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div
        className="absolute font-['Roboto:Regular',_sans-serif] font-normal h-[26px] leading-[0] left-0 text-[#0c0c0d] text-[16px] text-left top-[3px] w-[89px]"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[normal]">Distribution</p>
      </div>
    </div>
  );
}

function Div13() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[26px] left-2 top-2 w-[263px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Frame7 />
      <Div12 />
    </div>
  );
}

function Div14() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[42px] left-4 top-[134px] w-[279px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div13 />
    </div>
  );
}

function Frame8() {
  return (
    <div className="relative shrink-0 size-4" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 16 16"
      >
        <g id="Frame">
          <path d="M16 16H0V0H16V16Z" stroke="var(--stroke-0, #E5E7EB)" />
          <path
            d={svgPaths.p1efa7f0}
            fill="var(--fill-0, #0C0C0D)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Frame9() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row items-center justify-center left-0 overflow-clip p-0 size-4 top-[3px]"
      data-name="Frame"
    >
      <Frame8 />
    </div>
  );
}

function Div15() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[26px] left-7 top-0 w-[235px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div
        className="absolute font-['Roboto:Regular',_sans-serif] font-normal h-[26px] leading-[0] left-0 text-[#0c0c0d] text-[16px] text-left top-[3px] w-[71px]"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[normal]">Analytics</p>
      </div>
    </div>
  );
}

function Div16() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[26px] left-2 top-2 w-[263px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Frame9 />
      <Div15 />
    </div>
  );
}

function Div17() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[42px] left-4 top-44 w-[279px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div16 />
    </div>
  );
}

function Frame10() {
  return (
    <div className="h-4 relative shrink-0 w-3" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 12 16"
      >
        <g id="Frame">
          <g clipPath="url(#clip0_1_275)">
            <path
              d={svgPaths.pb25aa00}
              fill="var(--fill-0, #0C0C0D)"
              id="Vector"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_1_275">
            <path d="M0 0H12V16H0V0Z" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame11() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-4 items-center justify-center left-0 overflow-clip p-0 top-[3px] w-3"
      data-name="Frame"
    >
      <Frame10 />
    </div>
  );
}

function Div18() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[26px] left-7 top-0 w-[235px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div
        className="absolute font-['Roboto:Regular',_sans-serif] font-normal h-[26px] leading-[0] left-0 text-[#0c0c0d] text-[16px] text-left top-[3px] w-[62px]"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[normal]">Reports</p>
      </div>
    </div>
  );
}

function Div19() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[26px] left-2 top-2 w-[263px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Frame11 />
      <Div18 />
    </div>
  );
}

function Div20() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[42px] left-4 top-[218px] w-[279px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div19 />
    </div>
  );
}

function Div21() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[720px] left-0 top-[72px] w-[311px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div5 />
      <Div8 />
      <Div11 />
      <Div14 />
      <Div17 />
      <Div20 />
    </div>
  );
}

function Frame12() {
  return (
    <div className="relative shrink-0 size-4" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 16 16"
      >
        <g id="Frame">
          <g clipPath="url(#clip0_1_302)">
            <path
              d={svgPaths.p735f700}
              fill="var(--fill-0, #0C0C0D)"
              id="Vector"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_1_302">
            <path d="M0 0H16V16H0V0Z" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame13() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row items-center justify-center left-0 overflow-clip p-0 size-4 top-[3px]"
      data-name="Frame"
    >
      <Frame12 />
    </div>
  );
}

function Div22() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[26px] left-7 top-0 w-[235px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div
        className="absolute font-['Roboto:Regular',_sans-serif] font-normal h-[26px] leading-[0] left-0 text-[#0c0c0d] text-[16px] text-left top-[3px] w-[63px]"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[normal]">Support</p>
      </div>
    </div>
  );
}

function Div23() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[26px] left-2 top-2 w-[263px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Frame13 />
      <Div22 />
    </div>
  );
}

function Div24() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[42px] left-0 top-0 w-[279px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div23 />
    </div>
  );
}

function Frame14() {
  return (
    <div className="relative shrink-0 size-4" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 16 16"
      >
        <g id="Frame">
          <g clipPath="url(#clip0_1_299)">
            <path
              d={svgPaths.p21a72d80}
              fill="var(--fill-0, #0C0C0D)"
              id="Vector"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_1_299">
            <path d="M0 0H16V16H0V0Z" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame15() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row items-center justify-center left-0 overflow-clip p-0 size-4 top-[3px]"
      data-name="Frame"
    >
      <Frame14 />
    </div>
  );
}

function Div25() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[26px] left-7 top-0 w-[235px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div
        className="absolute font-['Roboto:Regular',_sans-serif] font-normal h-[26px] leading-[0] left-0 text-[#0c0c0d] text-[16px] text-left top-[3px] w-[65px]"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[normal]">Settings</p>
      </div>
    </div>
  );
}

function Div26() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[26px] left-2 top-2 w-[263px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Frame15 />
      <Div25 />
    </div>
  );
}

function Div27() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[42px] left-0 top-[42px] w-[279px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div26 />
    </div>
  );
}

function Div28() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[84px] left-4 top-0 w-[279px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div24 />
      <Div27 />
    </div>
  );
}

function Div29() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[108px] left-0 top-[792px] w-[311px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div28 />
    </div>
  );
}

function Div30() {
  return (
    <div
      className="absolute bg-[#ffffff] h-[900px] left-0 top-0 w-[312px]"
      data-name="div"
    >
      <div className="h-[900px] overflow-clip relative w-[312px]">
        <Div2 />
        <Div21 />
        <Div29 />
      </div>
      <div className="absolute border-[#0c0c0d] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Frame16() {
  return (
    <div className="relative shrink-0 size-4" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 16 16"
      >
        <g id="Frame">
          <g clipPath="url(#clip0_1_266)">
            <path
              d={svgPaths.p1d73a600}
              fill="var(--fill-0, #0C0C0D)"
              id="Vector"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_1_266">
            <path d="M0 0H16V16H0V0Z" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Svg() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row items-center justify-center left-0 p-0 size-4 top-[3px]"
      data-name="svg"
    >
      <Frame16 />
    </div>
  );
}

function I() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] left-3.5 size-4 top-3"
      data-name="i"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Svg />
    </div>
  );
}

function Div31() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[26px] left-[42px] top-[7px] w-[484px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div
        className="absolute font-['Roboto:Regular',_sans-serif] font-normal h-[26px] leading-[0] left-0 text-[16px] text-[rgba(12,12,13,0.6)] text-left top-[3px] w-[246px]"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[normal]">
          Search clients, tests, or insights...
        </p>
      </div>
    </div>
  );
}

function Div32() {
  return (
    <div
      className="absolute bg-[rgba(255,255,255,0)] h-10 left-8 rounded-md top-[15.5px] w-[540px]"
      data-name="div"
    >
      <div className="absolute border-2 border-[#0c0c0d] border-solid inset-0 pointer-events-none rounded-md" />
      <I />
      <Div31 />
    </div>
  );
}

function Frame17() {
  return (
    <div className="h-4 relative shrink-0 w-3.5" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 14 16"
      >
        <g id="Frame">
          <g clipPath="url(#clip0_1_269)">
            <path
              d={svgPaths.p1868abf0}
              fill="var(--fill-0, #0C0C0D)"
              id="Vector"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_1_269">
            <path d="M0 0H14V16H0V0Z" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame18() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-4 items-center justify-center left-2 overflow-clip p-0 top-[11px] w-3.5"
      data-name="Frame"
    >
      <Frame17 />
    </div>
  );
}

function Div33() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] left-0 size-9 top-0.5"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Frame18 />
    </div>
  );
}

function Img() {
  return (
    <div
      className="absolute bg-center bg-cover bg-no-repeat left-0 rounded-[9999px] size-10 top-0"
      data-name="img"
      style={{ backgroundImage: `url('${imgImg}')` }}
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-[9999px]" />
    </div>
  );
}

function Div34() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[26px] left-12 top-[7px] w-[107.172px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div
        className="absolute font-['Roboto:Regular',_sans-serif] font-normal h-[26px] leading-[0] left-0 text-[#0c0c0d] text-[16px] text-left top-[3px] w-[108px]"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[normal]">Sarah Johnson</p>
      </div>
    </div>
  );
}

function Frame19() {
  return (
    <div className="relative shrink-0 size-4" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 16 16"
      >
        <g id="Frame">
          <path d="M16 16H0V0H16V16Z" stroke="var(--stroke-0, #E5E7EB)" />
          <path
            d={svgPaths.p10900d80}
            fill="var(--fill-0, #0C0C0D)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Frame20() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row items-center justify-center left-[163.172px] overflow-clip p-0 size-4 top-[15px]"
      data-name="Frame"
    >
      <Frame19 />
    </div>
  );
}

function Div35() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-10 left-[52px] top-0 w-[179.172px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Img />
      <Div34 />
      <Frame20 />
    </div>
  );
}

function Div36() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-10 left-[864.828px] top-[15.5px] w-[231.172px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div33 />
      <Div35 />
    </div>
  );
}

function Div37() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[71px] left-0 top-0 w-[1128px]"
      data-name="div"
    >
      <div className="h-[71px] overflow-clip relative w-[1128px]">
        <Div32 />
        <Div36 />
      </div>
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Div38() {
  return (
    <div
      className="absolute bg-[#ffffff] h-[72px] left-0 top-0 w-[1128px]"
      data-name="div"
    >
      <div className="h-[72px] overflow-clip relative w-[1128px]">
        <Div37 />
      </div>
      <div className="absolute border-[#0c0c0d] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Div39() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[39.203px] left-0 top-0 w-[295px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div
        className="absolute font-['Roboto:Regular',_sans-serif] font-normal h-[39.2px] leading-[0] left-0 text-[#0c0c0d] text-[28px] text-left top-[3px] tracking-[-1.2px] w-[295px]"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="adjustLetterSpacing block leading-[normal]">
          Sustainability Dashboard
        </p>
      </div>
    </div>
  );
}

function Div40() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[26px] left-0 top-[47.203px] w-[430.781px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div
        className="absolute font-['Roboto:Regular',_sans-serif] font-normal h-[26px] leading-[0] left-0 text-[#0c0c0d] text-[16px] text-left top-[3px] w-[431px]"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[normal]">
          Manage client assessments and track sustainability insights
        </p>
      </div>
    </div>
  );
}

function Div41() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[73.203px] left-0 top-0 w-[430.781px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div39 />
      <Div40 />
    </div>
  );
}

function Frame21() {
  return (
    <div className="h-4 relative shrink-0 w-3.5" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 14 16"
      >
        <g id="Frame">
          <path d="M14 16H0V0H14V16Z" stroke="var(--stroke-0, #E5E7EB)" />
          <path
            d={svgPaths.p2cd26500}
            fill="var(--fill-0, white)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Svg1() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-4 items-center justify-center left-0 p-0 top-[3px] w-3.5"
      data-name="svg"
    >
      <Frame21 />
    </div>
  );
}

function I1() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] left-[22px] size-4 top-[15px]"
      data-name="i"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Svg1 />
    </div>
  );
}

function Div42() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[26px] left-[46px] top-2.5 w-[105.547px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div
        className="absolute font-['Roboto:Regular',_sans-serif] font-normal h-[26px] leading-[0] left-0 text-[#ffffff] text-[16px] text-left top-[3px] w-[106px]"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[normal]">Start New Test</p>
      </div>
    </div>
  );
}

function Div43() {
  return (
    <div
      className="absolute bg-[#0084ff] h-[46px] left-0 rounded-md top-0 w-[173.547px]"
      data-name="div"
    >
      <div className="absolute border-2 border-[#0c0c0d] border-solid inset-0 pointer-events-none rounded-md shadow-[0px_4px_0px_0px_rgba(255,255,255,0.2)]" />
      <I1 />
      <Div42 />
    </div>
  );
}

function Div44() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[46px] left-[890.453px] top-[13.594px] w-[173.547px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div43 />
    </div>
  );
}

function Div45() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[73.203px] left-8 top-6 w-[1064px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div41 />
      <Div44 />
    </div>
  );
}

function Div46() {
  return (
    <div
      className="absolute bg-[#ffffff] h-[122.203px] left-0 top-[72px] w-[1128px]"
      data-name="div"
    >
      <div className="absolute border-[#dadada] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <Div45 />
    </div>
  );
}

function Frame22() {
  return (
    <div className="h-4 relative shrink-0 w-3" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 12 16"
      >
        <g id="Frame">
          <g clipPath="url(#clip0_1_263)">
            <path
              d={svgPaths.p372e53f2}
              fill="var(--fill-0, #4A90E2)"
              id="Vector"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_1_263">
            <path d="M0 0H12V16H0V0Z" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame23() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-4 items-center justify-center left-0 overflow-clip p-0 top-[3px] w-3"
      data-name="Frame"
    >
      <Frame22 />
    </div>
  );
}

function Frame24() {
  return (
    <div className="h-4 relative shrink-0 w-3.5" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 14 16"
      >
        <g id="Frame">
          <path d="M14 16H0V0H14V16Z" stroke="var(--stroke-0, #E5E7EB)" />
          <path
            d={svgPaths.p7a1ad80}
            fill="var(--fill-0, #0C0C0D)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Frame25() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-4 items-center justify-center left-0 overflow-clip p-0 top-[3px] w-3.5"
      data-name="Frame"
    >
      <Frame24 />
    </div>
  );
}

function Div47() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] left-2 rounded-md size-4 top-2"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-md" />
      <Frame25 />
    </div>
  );
}

function Div48() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] left-[254.672px] size-8 top-0"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div47 />
    </div>
  );
}

function Div49() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-8 left-0 top-0 w-[286.672px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Frame23 />
      <Div48 />
    </div>
  );
}

function Div50() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[26px] left-0 top-0 w-[286.672px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div
        className="absolute font-['Roboto:Regular',_sans-serif] font-normal h-[26px] leading-[0] left-0 text-[#0c0c0d] text-[16px] text-left top-[3px] w-[93px]"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[normal]">Active Tests</p>
      </div>
    </div>
  );
}

function Div51() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[39.203px] left-0 top-0 w-[30.438px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div
        className="absolute font-['Roboto:Regular',_sans-serif] font-normal h-[39.2px] leading-[0] left-0 text-[#0c0c0d] text-[28px] text-left top-[3px] tracking-[-1.2px] w-[31px]"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="adjustLetterSpacing block leading-[normal]">24</p>
      </div>
    </div>
  );
}

function Frame26() {
  return (
    <div className="h-4 relative shrink-0 w-3" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 12 16"
      >
        <g id="Frame">
          <g clipPath="url(#clip0_1_287)">
            <path
              d={svgPaths.p36e63c00}
              fill="var(--fill-0, #0C0C0D)"
              id="Vector"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_1_287">
            <path d="M0 0H12V16H0V0Z" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame27() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-4 items-center justify-center left-[9px] overflow-clip p-0 top-[9.625px] w-3"
      data-name="Frame"
    >
      <Frame26 />
    </div>
  );
}

function Div52() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[19.25px] left-[25px] top-[3px] w-[26.234px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div
        className="absolute font-['Roboto:Regular',_sans-serif] font-normal h-[19.25px] leading-[0] left-0 text-[#0c0c0d] text-[14px] text-left top-px w-[27px]"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[normal]">12%</p>
      </div>
    </div>
  );
}

function Div53() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[25.25px] left-[226.438px] rounded-[50px] top-[6.969px] w-[60.234px]"
      data-name="div"
    >
      <div className="absolute border border-[#0c0c0d] border-solid inset-0 pointer-events-none rounded-[50px]" />
      <Frame27 />
      <Div52 />
    </div>
  );
}

function Div54() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[39.203px] left-0 top-[30px] w-[286.672px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div51 />
      <Div53 />
    </div>
  );
}

function Div55() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[69px] left-0 top-12 w-[286.672px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div50 />
      <Div54 />
    </div>
  );
}

function Div56() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[117px] left-[26px] top-7 w-[286.672px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div49 />
      <Div55 />
    </div>
  );
}

function Div57() {
  return (
    <div
      className="absolute bg-[#ffffff] h-[173px] left-0 rounded-2xl top-0 w-[338.672px]"
      data-name="div"
    >
      <div className="h-[173px] overflow-clip relative w-[338.672px]">
        <Div56 />
      </div>
      <div className="absolute border-2 border-[#0c0c0d] border-solid inset-0 pointer-events-none rounded-2xl" />
    </div>
  );
}

function Frame28() {
  return (
    <div className="h-4 relative shrink-0 w-[18px]" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 18 16"
      >
        <g id="Frame">
          <path d="M18 16H0V0H18V16Z" stroke="var(--stroke-0, #E5E7EB)" />
          <path
            d={svgPaths.p3b0c80}
            fill="var(--fill-0, #7BB3F0)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Frame29() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-4 items-center justify-center left-0 overflow-clip p-0 top-[3px] w-[18px]"
      data-name="Frame"
    >
      <Frame28 />
    </div>
  );
}

function Frame30() {
  return (
    <div className="h-4 relative shrink-0 w-3.5" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 14 16"
      >
        <g id="Frame">
          <path d="M14 16H0V0H14V16Z" stroke="var(--stroke-0, #E5E7EB)" />
          <path
            d={svgPaths.p7a1ad80}
            fill="var(--fill-0, #0C0C0D)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Frame31() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-4 items-center justify-center left-0 overflow-clip p-0 top-[3px] w-3.5"
      data-name="Frame"
    >
      <Frame30 />
    </div>
  );
}

function Div58() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] left-2 rounded-md size-4 top-2"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-md" />
      <Frame31 />
    </div>
  );
}

function Div59() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] left-[254.672px] size-8 top-0"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div58 />
    </div>
  );
}

function Div60() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-8 left-0 top-0 w-[286.672px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Frame29 />
      <Div59 />
    </div>
  );
}

function Div61() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[26px] left-0 top-0 w-[286.672px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div
        className="absolute font-['Roboto:Regular',_sans-serif] font-normal h-[26px] leading-[0] left-0 text-[#0c0c0d] text-[16px] text-left top-[3px] w-[125px]"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[normal]">Completion Rate</p>
      </div>
    </div>
  );
}

function Div62() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[39.203px] left-0 top-0 w-[50.359px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div
        className="absolute font-['Roboto:Regular',_sans-serif] font-normal h-[39.2px] leading-[0] left-0 text-[#0c0c0d] text-[28px] text-left top-[3px] tracking-[-1.2px] w-[51px]"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="adjustLetterSpacing block leading-[normal]">87%</p>
      </div>
    </div>
  );
}

function Frame32() {
  return (
    <div className="h-4 relative shrink-0 w-3" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 12 16"
      >
        <g id="Frame">
          <g clipPath="url(#clip0_1_287)">
            <path
              d={svgPaths.p36e63c00}
              fill="var(--fill-0, #0C0C0D)"
              id="Vector"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_1_287">
            <path d="M0 0H12V16H0V0Z" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame33() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-4 items-center justify-center left-[9px] overflow-clip p-0 top-[9.625px] w-3"
      data-name="Frame"
    >
      <Frame32 />
    </div>
  );
}

function Div63() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[19.25px] left-[25px] top-[3px] w-[18.266px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div
        className="absolute font-['Roboto:Regular',_sans-serif] font-normal h-[19.25px] leading-[0] left-0 text-[#0c0c0d] text-[14px] text-left top-px w-[19px]"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[normal]">5%</p>
      </div>
    </div>
  );
}

function Div64() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[25.25px] left-[234.406px] rounded-[50px] top-[6.969px] w-[52.266px]"
      data-name="div"
    >
      <div className="absolute border border-[#0c0c0d] border-solid inset-0 pointer-events-none rounded-[50px]" />
      <Frame33 />
      <Div63 />
    </div>
  );
}

function Div65() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[39.203px] left-0 top-[30px] w-[286.672px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div62 />
      <Div64 />
    </div>
  );
}

function Div66() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[69px] left-0 top-12 w-[286.672px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div61 />
      <Div65 />
    </div>
  );
}

function Div67() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[117px] left-[26px] top-7 w-[286.672px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div60 />
      <Div66 />
    </div>
  );
}

function Div68() {
  return (
    <div
      className="absolute bg-[#ffffff] h-[173px] left-[362.672px] rounded-2xl top-0 w-[338.672px]"
      data-name="div"
    >
      <div className="h-[173px] overflow-clip relative w-[338.672px]">
        <Div67 />
      </div>
      <div className="absolute border-2 border-[#0c0c0d] border-solid inset-0 pointer-events-none rounded-2xl" />
    </div>
  );
}

function Frame34() {
  return (
    <div className="h-4 relative shrink-0 w-5" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 20 16"
      >
        <g id="Frame">
          <g clipPath="url(#clip0_1_257)">
            <path
              d={svgPaths.p1b4569c0}
              fill="var(--fill-0, #5A9FD4)"
              id="Vector"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_1_257">
            <path d="M0 0H20V16H0V0Z" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame35() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-4 items-center justify-center left-0 overflow-clip p-0 top-[3px] w-5"
      data-name="Frame"
    >
      <Frame34 />
    </div>
  );
}

function Frame36() {
  return (
    <div className="h-4 relative shrink-0 w-3.5" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 14 16"
      >
        <g id="Frame">
          <path d="M14 16H0V0H14V16Z" stroke="var(--stroke-0, #E5E7EB)" />
          <path
            d={svgPaths.p7a1ad80}
            fill="var(--fill-0, #0C0C0D)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Frame37() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-4 items-center justify-center left-0 overflow-clip p-0 top-[3px] w-3.5"
      data-name="Frame"
    >
      <Frame36 />
    </div>
  );
}

function Div69() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] left-2 rounded-md size-4 top-2"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-md" />
      <Frame37 />
    </div>
  );
}

function Div70() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] left-[254.672px] size-8 top-0"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div69 />
    </div>
  );
}

function Div71() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-8 left-0 top-0 w-[286.672px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Frame35 />
      <Div70 />
    </div>
  );
}

function Div72() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[26px] left-0 top-0 w-[286.672px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div
        className="absolute font-['Roboto:Regular',_sans-serif] font-normal h-[26px] leading-[0] left-0 text-[#0c0c0d] text-[16px] text-left top-[3px] w-[104px]"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[normal]">Active Clients</p>
      </div>
    </div>
  );
}

function Div73() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[39.203px] left-0 top-0 w-[45.656px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div
        className="absolute font-['Roboto:Regular',_sans-serif] font-normal h-[39.2px] leading-[0] left-0 text-[#0c0c0d] text-[28px] text-left top-[3px] tracking-[-1.2px] w-[46px]"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="adjustLetterSpacing block leading-[normal]">156</p>
      </div>
    </div>
  );
}

function Frame38() {
  return (
    <div className="h-4 relative shrink-0 w-3" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 12 16"
      >
        <g id="Frame">
          <g clipPath="url(#clip0_1_287)">
            <path
              d={svgPaths.p36e63c00}
              fill="var(--fill-0, #0C0C0D)"
              id="Vector"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_1_287">
            <path d="M0 0H12V16H0V0Z" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame39() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-4 items-center justify-center left-[9px] overflow-clip p-0 top-[9.625px] w-3"
      data-name="Frame"
    >
      <Frame38 />
    </div>
  );
}

function Div74() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[19.25px] left-[25px] top-[3px] w-[18.266px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div
        className="absolute font-['Roboto:Regular',_sans-serif] font-normal h-[19.25px] leading-[0] left-0 text-[#0c0c0d] text-[14px] text-left top-px w-[19px]"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[normal]">8%</p>
      </div>
    </div>
  );
}

function Div75() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[25.25px] left-[234.406px] rounded-[50px] top-[6.969px] w-[52.266px]"
      data-name="div"
    >
      <div className="absolute border border-[#0c0c0d] border-solid inset-0 pointer-events-none rounded-[50px]" />
      <Frame39 />
      <Div74 />
    </div>
  );
}

function Div76() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[39.203px] left-0 top-[30px] w-[286.672px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div73 />
      <Div75 />
    </div>
  );
}

function Div77() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[69px] left-0 top-12 w-[286.672px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div72 />
      <Div76 />
    </div>
  );
}

function Div78() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[117px] left-[26px] top-7 w-[286.672px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div71 />
      <Div77 />
    </div>
  );
}

function Div79() {
  return (
    <div
      className="absolute bg-[#ffffff] h-[173px] left-[725.344px] rounded-2xl top-0 w-[338.672px]"
      data-name="div"
    >
      <div className="h-[173px] overflow-clip relative w-[338.672px]">
        <Div78 />
      </div>
      <div className="absolute border-2 border-[#0c0c0d] border-solid inset-0 pointer-events-none rounded-2xl" />
    </div>
  );
}

function Div80() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[173px] left-8 top-8 w-[1064px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div57 />
      <Div68 />
      <Div79 />
    </div>
  );
}

function Div81() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-7 left-6 top-6 w-[117.578px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div
        className="absolute font-['Roboto:Regular',_sans-serif] font-normal h-7 leading-[0] left-0 text-[#0c0c0d] text-[20px] text-left top-0.5 tracking-[-1px] w-[118px]"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="adjustLetterSpacing block leading-[normal]">
          Quick Actions
        </p>
      </div>
    </div>
  );
}

function Frame40() {
  return (
    <div className="h-4 relative shrink-0 w-3.5" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 14 16"
      >
        <g id="Frame">
          <path d="M14 16H0V0H14V16Z" stroke="var(--stroke-0, #E5E7EB)" />
          <path
            d={svgPaths.p7a1ad80}
            fill="var(--fill-0, #0C0C0D)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Frame41() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-4 items-center justify-center left-[476px] overflow-clip p-0 top-[33px] w-3.5"
      data-name="Frame"
    >
      <Frame40 />
    </div>
  );
}

function Div82() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[76px] left-0.5 top-0.5 w-[516px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div81 />
      <Frame41 />
    </div>
  );
}

function Frame42() {
  return (
    <div className="relative shrink-0 size-4" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 16 16"
      >
        <g id="Frame">
          <g clipPath="url(#clip0_1_254)">
            <path
              d={svgPaths.p2e18f270}
              fill="var(--fill-0, white)"
              id="Vector"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_1_254">
            <path d="M0 0H16V16H0V0Z" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Svg2() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row items-center justify-center left-0 p-0 size-4 top-[3px]"
      data-name="svg"
    >
      <Frame42 />
    </div>
  );
}

function I2() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] left-[140.188px] size-4 top-[19px]"
      data-name="i"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Svg2 />
    </div>
  );
}

function Div83() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[26px] left-[164.188px] top-3.5 w-[163.625px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div
        className="absolute font-['Roboto:Regular',_sans-serif] font-normal h-[26px] leading-[0] left-0 text-[#ffffff] text-[16px] text-left top-[3px] w-[164px]"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[normal]">Start New Assessment</p>
      </div>
    </div>
  );
}

function Div84() {
  return (
    <div
      className="absolute bg-[#545455] h-[54px] left-6 rounded-md top-0 w-[468px]"
      data-name="div"
    >
      <div className="absolute border-2 border-[#0c0c0d] border-solid inset-0 pointer-events-none rounded-md shadow-[0px_4px_0px_0px_rgba(255,255,255,0.2)]" />
      <I2 />
      <Div83 />
    </div>
  );
}

function Frame43() {
  return (
    <div className="relative shrink-0 size-4" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 16 16"
      >
        <g id="Frame">
          <path d="M16 16H0V0H16V16Z" stroke="var(--stroke-0, #E5E7EB)" />
          <path
            d={svgPaths.p38bc7c60}
            fill="var(--fill-0, #0C0C0D)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Svg3() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row items-center justify-center left-0 p-0 size-4 top-[3px]"
      data-name="svg"
    >
      <Frame43 />
    </div>
  );
}

function I3() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] left-[165.703px] size-4 top-[19px]"
      data-name="i"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Svg3 />
    </div>
  );
}

function Div85() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[26px] left-[189.703px] top-3.5 w-[112.594px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div
        className="absolute font-['Roboto:Regular',_sans-serif] font-normal h-[26px] leading-[0] left-0 text-[#0c0c0d] text-[16px] text-left top-[3px] w-[113px]"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[normal]">Distribute Tests</p>
      </div>
    </div>
  );
}

function Div86() {
  return (
    <div
      className="absolute bg-[#f2f2f2] h-[54px] left-6 rounded-md top-[70px] w-[468px]"
      data-name="div"
    >
      <div className="absolute border-2 border-[#0c0c0d] border-solid inset-0 pointer-events-none rounded-md shadow-[0px_4px_0px_0px_rgba(255,255,255,0.2)]" />
      <I3 />
      <Div85 />
    </div>
  );
}

function Frame44() {
  return (
    <div className="relative shrink-0 size-4" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 16 16"
      >
        <g id="Frame">
          <path d="M16 16H0V0H16V16Z" stroke="var(--stroke-0, #E5E7EB)" />
          <path
            d={svgPaths.p147cb180}
            fill="var(--fill-0, #0C0C0D)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Svg4() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row items-center justify-center left-0 p-0 size-4 top-[3px]"
      data-name="svg"
    >
      <Frame44 />
    </div>
  );
}

function I4() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] left-[169.625px] size-4 top-[19px]"
      data-name="i"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Svg4 />
    </div>
  );
}

function Div87() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[26px] left-[193.625px] top-3.5 w-[104.75px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div
        className="absolute font-['Roboto:Regular',_sans-serif] font-normal h-[26px] leading-[0] left-0 text-[#0c0c0d] text-[16px] text-left top-[3px] w-[105px]"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[normal]">View Analytics</p>
      </div>
    </div>
  );
}

function Div88() {
  return (
    <div
      className="absolute bg-[#f2f2f2] h-[54px] left-6 rounded-md top-[140px] w-[468px]"
      data-name="div"
    >
      <div className="absolute border-2 border-[#0c0c0d] border-solid inset-0 pointer-events-none rounded-md shadow-[0px_4px_0px_0px_rgba(255,255,255,0.2)]" />
      <I4 />
      <Div87 />
    </div>
  );
}

function Div89() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[218px] left-0.5 top-[78px] w-[516px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div84 />
      <Div86 />
      <Div88 />
    </div>
  );
}

function Div90() {
  return (
    <div
      className="absolute bg-[#ffffff] h-[298px] left-0 rounded-2xl top-0 w-[520px]"
      data-name="div"
    >
      <div className="absolute border-2 border-[#0c0c0d] border-solid inset-0 pointer-events-none rounded-2xl" />
      <Div82 />
      <Div89 />
    </div>
  );
}

function Div91() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-7 left-6 top-6 w-[103.984px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div
        className="absolute font-['Roboto:Regular',_sans-serif] font-normal h-7 leading-[0] left-0 text-[#0c0c0d] text-[20px] text-left top-0.5 tracking-[-1px] w-[104px]"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="adjustLetterSpacing block leading-[normal]">
          Top Insights
        </p>
      </div>
    </div>
  );
}

function Frame45() {
  return (
    <div className="h-4 relative shrink-0 w-3.5" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 14 16"
      >
        <g id="Frame">
          <path d="M14 16H0V0H14V16Z" stroke="var(--stroke-0, #E5E7EB)" />
          <path
            d={svgPaths.p7a1ad80}
            fill="var(--fill-0, #0C0C0D)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Frame46() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-4 items-center justify-center left-[476px] overflow-clip p-0 top-[33px] w-3.5"
      data-name="Frame"
    >
      <Frame45 />
    </div>
  );
}

function Div92() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[76px] left-0.5 top-0.5 w-[516px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div91 />
      <Frame46 />
    </div>
  );
}

function Div93() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-5 left-0 top-0.5 w-[152.078px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div
        className="absolute font-['Roboto:Medium',_sans-serif] font-medium h-5 leading-[0] left-0 text-[#0c0c0d] text-[14px] text-left top-0.5 w-[153px]"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[normal]">ESG Score Improvement</p>
      </div>
    </div>
  );
}

function Div94() {
  return (
    <div
      className="absolute bg-[#d4edda] h-6 left-[388.859px] rounded top-0 w-[45.141px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded" />
      <div
        className="absolute font-['Roboto:Regular',_sans-serif] font-normal h-4 leading-[0] left-2 text-[#155724] text-[12px] text-left top-[5px] w-[35px]"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[normal]">+15%</p>
      </div>
    </div>
  );
}

function Div95() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-6 left-[17px] top-[17px] w-[434px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div93 />
      <Div94 />
    </div>
  );
}

function Div96() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[22.75px] left-[17px] top-[49px] w-[434px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div
        className="absolute font-['Roboto:Regular',_sans-serif] font-normal h-[22.75px] leading-[0] left-0 text-[#6c757d] text-[14px] text-left top-[3px] w-[310px]"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[normal]">
          Average client ESG scores increased this quarter
        </p>
      </div>
    </div>
  );
}

function Div97() {
  return (
    <div
      className="absolute bg-[#f8f9fa] h-[88.75px] left-6 rounded-lg top-0 w-[468px]"
      data-name="div"
    >
      <div className="absolute border border-[#e9ecef] border-solid inset-0 pointer-events-none rounded-lg" />
      <Div95 />
      <Div96 />
    </div>
  );
}

function Div98() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-5 left-0 top-0.5 w-[105.688px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div
        className="absolute font-['Roboto:Medium',_sans-serif] font-medium h-5 leading-[0] left-0 text-[#0c0c0d] text-[14px] text-left top-0.5 w-[106px]"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[normal]">Carbon Footprint</p>
      </div>
    </div>
  );
}

function Div99() {
  return (
    <div
      className="absolute bg-[#fff3cd] h-6 left-[398.266px] rounded top-0 w-[35.734px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded" />
      <div
        className="absolute font-['Roboto:Regular',_sans-serif] font-normal h-4 leading-[0] left-2 text-[#856404] text-[12px] text-left top-[5px] w-[25px]"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[normal]">-8%</p>
      </div>
    </div>
  );
}

function Div100() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-6 left-[17px] top-[17px] w-[434px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div98 />
      <Div99 />
    </div>
  );
}

function Div101() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[22.75px] left-[17px] top-[49px] w-[434px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div
        className="absolute font-['Roboto:Regular',_sans-serif] font-normal h-[22.75px] leading-[0] left-0 text-[#6c757d] text-[14px] text-left top-[3px] w-[312px]"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[normal]">
          Portfolio carbon intensity decreased significantly
        </p>
      </div>
    </div>
  );
}

function Div102() {
  return (
    <div
      className="absolute bg-[#f8f9fa] h-[88.75px] left-6 rounded-lg top-[104.75px] w-[468px]"
      data-name="div"
    >
      <div className="absolute border border-[#e9ecef] border-solid inset-0 pointer-events-none rounded-lg" />
      <Div100 />
      <Div101 />
    </div>
  );
}

function Div103() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-5 left-0 top-0.5 w-[117.969px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div
        className="absolute font-['Roboto:Medium',_sans-serif] font-medium h-5 leading-[0] left-0 text-[#0c0c0d] text-[14px] text-left top-0.5 w-[118px]"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[normal]">Green Investments</p>
      </div>
    </div>
  );
}

function Div104() {
  return (
    <div
      className="absolute bg-[#d4edda] h-6 left-[388.859px] rounded top-0 w-[45.141px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded" />
      <div
        className="absolute font-['Roboto:Regular',_sans-serif] font-normal h-4 leading-[0] left-2 text-[#155724] text-[12px] text-left top-[5px] w-[35px]"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[normal]">+23%</p>
      </div>
    </div>
  );
}

function Div105() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-6 left-[17px] top-[17px] w-[434px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div103 />
      <Div104 />
    </div>
  );
}

function Div106() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[22.75px] left-[17px] top-[49px] w-[434px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div
        className="absolute font-['Roboto:Regular',_sans-serif] font-normal h-[22.75px] leading-[0] left-0 text-[#6c757d] text-[14px] text-left top-[3px] w-[271px]"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[normal]">
          Sustainable investment allocation growing
        </p>
      </div>
    </div>
  );
}

function Div107() {
  return (
    <div
      className="absolute bg-[#f8f9fa] h-[88.75px] left-6 rounded-lg top-[209.5px] w-[468px]"
      data-name="div"
    >
      <div className="absolute border border-[#e9ecef] border-solid inset-0 pointer-events-none rounded-lg" />
      <Div105 />
      <Div106 />
    </div>
  );
}

function Div108() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[322.25px] left-0.5 top-[78px] w-[516px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div97 />
      <Div102 />
      <Div107 />
    </div>
  );
}

function Div109() {
  return (
    <div
      className="absolute bg-[#ffffff] h-[402.25px] left-[544px] rounded-2xl top-0 w-[520px]"
      data-name="div"
    >
      <div className="absolute border-2 border-[#0c0c0d] border-solid inset-0 pointer-events-none rounded-2xl" />
      <Div92 />
      <Div108 />
    </div>
  );
}

function Div110() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[402.25px] left-8 top-[237px] w-[1064px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div90 />
      <Div109 />
    </div>
  );
}

function Div111() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[705.797px] left-0 top-[194.203px] w-[1128px]"
      data-name="div"
    >
      <div className="h-[705.797px] overflow-clip relative w-[1128px]">
        <Div80 />
        <Div110 />
      </div>
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Div112() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[900px] left-[312px] top-0 w-[1128px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div38 />
      <Div46 />
      <Div111 />
    </div>
  );
}

function Body() {
  return (
    <div
      className="bg-[#f2f2f2] h-[900px] relative shrink-0 w-[1440px]"
      data-name="body"
    >
      <div className="h-[900px] overflow-clip relative w-[1440px]">
        <Div30 />
        <Div112 />
      </div>
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
    </div>
  );
}

export default function Frame47() {
  return (
    <div
      className="bg-[#ffffff] relative rounded-lg size-full"
      data-name="Frame"
    >
      <div className="box-border content-stretch flex flex-col items-start justify-start overflow-clip p-0 relative size-full">
        <Body />
      </div>
      <div className="absolute border-2 border-[#ced4da] border-solid inset-0 pointer-events-none rounded-lg" />
    </div>
  );
}