import svgPaths from "./svg-8t6x49lgk3";

function Container() {
  return (
    <div
      className="absolute bottom-[29.02%] left-[17.5%] right-[17.5%] top-[26.59%]"
      data-name="Container"
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 26 18"
      >
        <g id="Container">
          <path
            d={svgPaths.p3621cb00}
            fill="var(--fill-0, white)"
            id="Vector (Stroke)"
          />
          <path d={svgPaths.p24fbf00} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container1() {
  return (
    <div
      className="absolute bottom-[29.02%] contents left-[17.5%] right-[17.5%] top-[26.58%]"
      data-name="Container"
    >
      <Container />
    </div>
  );
}

export default function FloatButton() {
  return (
    <div
      className="bg-[#0084ff] relative rounded-[999px] shadow-[0px_6px_16px_0px_rgba(0,0,0,0.08),0px_3px_6px_-4px_rgba(0,0,0,0.12),0px_9px_28px_8px_rgba(0,0,0,0.05)] size-full"
      data-name="FloatButton"
    >
      <Container1 />
    </div>
  );
}