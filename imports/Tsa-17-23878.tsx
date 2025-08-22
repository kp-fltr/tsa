import svgPaths from "./svg-wqnb66699m";

function TsaLogoVertical() {
  return (
    <div
      className="absolute h-[109px] left-[132px] top-[352px] w-[109.017px]"
      data-name="tsa - logo - vertical"
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 110 109"
      >
        <g id="tsa - logo - vertical">
          <g id="tsa - logotype">
            <path d={svgPaths.p783e900} fill="var(--fill-0, black)" />
            <path d={svgPaths.p39805e00} fill="var(--fill-0, black)" />
            <path d={svgPaths.p34c88c00} fill="var(--fill-0, black)" />
            <path d={svgPaths.p217ffd80} fill="var(--fill-0, black)" />
            <path d={svgPaths.p338bc00} fill="var(--fill-0, black)" />
            <path d={svgPaths.pc230170} fill="var(--fill-0, black)" />
            <path d={svgPaths.p198ebc00} fill="var(--fill-0, black)" />
            <path d={svgPaths.p21805e00} fill="var(--fill-0, black)" />
            <path d={svgPaths.p2dcdb580} fill="var(--fill-0, black)" />
            <path d={svgPaths.p30ec7500} fill="var(--fill-0, black)" />
            <path d={svgPaths.p2e9a4080} fill="var(--fill-0, black)" />
            <path d={svgPaths.p321977c0} fill="var(--fill-0, black)" />
            <path d={svgPaths.p10258180} fill="var(--fill-0, black)" />
            <path d={svgPaths.p4052400} fill="var(--fill-0, black)" />
            <path d={svgPaths.p39f2b500} fill="var(--fill-0, black)" />
          </g>
          <path
            clipRule="evenodd"
            d={svgPaths.p244f6a00}
            fill="var(--fill-0, #0084FF)"
            fillRule="evenodd"
            id="tsa - symbol"
          />
        </g>
      </svg>
    </div>
  );
}

export default function Tsa() {
  return (
    <div
      className="bg-[rgba(235,245,255,0.5)] relative size-full"
      data-name="TSA"
    >
      <div className="relative size-full">
        <TsaLogoVertical />
      </div>
      <div
        aria-hidden="true"
        className="absolute border-[#d7d7d7] border-[0.871px] border-solid inset-0 pointer-events-none"
      />
    </div>
  );
}