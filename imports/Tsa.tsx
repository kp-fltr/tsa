import svgPaths from "./svg-4ia94l7ewr";

function Title() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-1 items-center justify-center pb-3 pt-5 px-0 relative shrink-0 w-[278.798px]"
      data-name="Title"
    >
      <div className="flex flex-col font-['Inter:Regular',_sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#00141a] text-[27.88px] text-left text-nowrap">
        <p className="block leading-[normal] whitespace-pre">Sign in</p>
      </div>
    </div>
  );
}

function Text() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-start p-0 shrink-0 w-[278.798px]"
      data-name="Text"
    />
  );
}

function Header() {
  return (
    <div
      className="box-border content-stretch flex flex-col h-[59.245px] items-center justify-start p-0 relative shrink-0 w-full"
      data-name="Header"
    >
      <Title />
      <Text />
    </div>
  );
}

function FormFormLabelVertical() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-1 items-center justify-start pb-2 pt-0 px-0 relative shrink-0 w-full"
      data-name="_Form / Form Label Vertical"
    >
      <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[12.197px] text-left text-nowrap text-zinc-900">
        <p className="block leading-[19.167px] whitespace-pre">Username</p>
      </div>
    </div>
  );
}

function TablerIconUser() {
  return (
    <div
      className="relative shrink-0 size-[13.94px]"
      data-name="tabler icon / user"
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 14 14"
      >
        <g id="tabler icon / user">
          <path
            d={svgPaths.p77cc300}
            id="Vector"
            stroke="var(--stroke-0, #717179)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.08906"
          />
        </g>
      </svg>
    </div>
  );
}

function Content() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-row gap-1 grow h-9 items-center justify-start min-h-px min-w-px px-0 py-1 relative shrink-0"
      data-name="Content"
    >
      <TablerIconUser />
      <div className="basis-0 font-['Inter:Regular',_sans-serif] font-normal grow h-[19.167px] leading-[0] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[12.197px] text-left text-nowrap text-zinc-300">
        <p className="[text-overflow:inherit] [text-wrap-mode:inherit]\' [white-space-collapse:inherit] block leading-[19.167px] overflow-inherit">
          Username
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
        <div className="box-border content-stretch flex flex-row gap-[8.712px] items-center justify-start px-3 py-0 relative w-full">
          <Content />
        </div>
      </div>
      <div
        aria-hidden="true"
        className="absolute border border-solid border-zinc-300 inset-0 pointer-events-none rounded-md"
      />
    </div>
  );
}

function FormFormItemVertical() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-start justify-start p-0 relative shrink-0 w-[278.798px]"
      data-name="_Form / Form Item / Vertical"
    >
      <FormFormLabelVertical />
      <Input />
    </div>
  );
}

function FormFormLabelVertical1() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-1 items-center justify-start pb-2 pt-0 px-0 relative shrink-0 w-full"
      data-name="_Form / Form Label Vertical"
    >
      <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[12.197px] text-left text-nowrap text-zinc-900">
        <p className="block leading-[19.167px] whitespace-pre">Password</p>
      </div>
    </div>
  );
}

function TablerIconEyeOff() {
  return (
    <div
      className="relative shrink-0 size-[13.94px]"
      data-name="tabler icon / eye-off"
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 14 14"
      >
        <g id="tabler icon / eye-off">
          <path
            d={svgPaths.p3b6b3200}
            id="Vector"
            stroke="var(--stroke-0, #D4D4D8)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.08906"
          />
        </g>
      </svg>
    </div>
  );
}

function Content1() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-row gap-[3.485px] grow h-9 items-center justify-start min-h-px min-w-px px-0 py-1 relative shrink-0"
      data-name="Content"
    >
      <div className="basis-0 font-['Inter:Regular',_sans-serif] font-normal grow h-[19.167px] leading-[0] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[12.197px] text-left text-nowrap text-zinc-300">
        <p className="[text-overflow:inherit] [text-wrap-mode:inherit]\' [white-space-collapse:inherit] block leading-[19.167px] overflow-inherit">
          Password
        </p>
      </div>
      <TablerIconEyeOff />
    </div>
  );
}

function InputPassword() {
  return (
    <div
      className="bg-[#ffffff] relative rounded-md shrink-0 w-full"
      data-name="Input / Password"
    >
      <div
        aria-hidden="true"
        className="absolute border border-solid border-zinc-300 inset-0 pointer-events-none rounded-md"
      />
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex flex-row gap-[3.485px] items-center justify-start px-3 py-0 relative w-full">
          <Content1 />
        </div>
      </div>
    </div>
  );
}

function FormFormItemVertical1() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-start justify-start p-0 relative shrink-0 w-[278.798px]"
      data-name="_Form / Form Item / Vertical"
    >
      <FormFormLabelVertical1 />
      <InputPassword />
    </div>
  );
}

function TablerIconCheck() {
  return (
    <div
      className="absolute left-[0.87px] size-[12.197px] top-[0.87px]"
      data-name="tabler icon / check"
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 13 13"
      >
        <g id="tabler icon / check">
          <path
            d={svgPaths.p1dd20b00}
            id="Vector"
            stroke="var(--stroke-0, white)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.08906"
          />
        </g>
      </svg>
    </div>
  );
}

function CheckboxActiveDefault() {
  return (
    <div
      className="relative shrink-0 size-[13.94px]"
      data-name="Checkbox/Active/Default"
    >
      <div
        className="absolute bg-zinc-900 inset-0 rounded-[3.996px]"
        data-name="Plate"
      />
      <TablerIconCheck />
    </div>
  );
}

function CheckboxWrapper() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-[6.97px] items-start justify-start px-0 py-[2.614px] relative shrink-0"
      data-name="Checkbox Wrapper"
    >
      <CheckboxActiveDefault />
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
      <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[13.986px] text-left text-nowrap text-zinc-900">
        <p className="block leading-[19.167px] whitespace-pre">Remember me</p>
      </div>
    </div>
  );
}

function Content2() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2 h-[31.365px] items-center justify-center p-0 relative shrink-0"
      data-name="Content"
    >
      <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[12.197px] text-left text-nowrap text-zinc-900">
        <p className="block leading-[19.167px] whitespace-pre">
          Forgot password?
        </p>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-[6.97px] items-center justify-center p-0 relative rounded-[5.994px] shrink-0"
      data-name="Button"
    >
      <Content2 />
    </div>
  );
}

function Wrapper() {
  return (
    <div
      className="[flex-flow:wrap] box-border content-between flex h-[27.88px] items-center justify-between p-0 relative shrink-0 w-full"
      data-name="Wrapper"
    >
      <Checkbox />
      <Button />
    </div>
  );
}

function Content3() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2 h-[31.365px] items-center justify-center p-0 relative shrink-0"
      data-name="Content"
    >
      <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[12.197px] text-left text-nowrap">
        <p className="block leading-[19.167px] whitespace-pre">Sign in</p>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div
      className="bg-zinc-900 box-border content-stretch flex flex-col gap-[6.97px] items-center justify-center px-[15px] py-0 relative rounded-[5.994px] shrink-0 w-[278.798px]"
      data-name="Button"
    >
      <div
        aria-hidden="true"
        className="absolute border border-solid border-zinc-900 inset-0 pointer-events-none rounded-[5.994px] shadow-[0px_0.871px_1.742px_0px_rgba(24,24,27,0.1)]"
      />
      <Content3 />
    </div>
  );
}

function Content4() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2 h-[27.88px] items-center justify-center p-0 relative shrink-0"
      data-name="Content"
    >
      <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[12.197px] text-left text-nowrap text-zinc-900">
        <p className="[text-decoration-line:underline] [text-decoration-skip-ink:none] [text-decoration-style:solid] [text-underline-position:from-font] block leading-[19.167px] whitespace-pre">
          Sign up now
        </p>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-[6.97px] items-center justify-center px-[11px] py-0 relative rounded-[3.996px] shrink-0"
      data-name="Button"
    >
      <Content4 />
    </div>
  );
}

function Register() {
  return (
    <div
      className="[flex-flow:wrap] box-border content-center flex gap-[3.485px] items-center justify-center p-0 relative shrink-0 w-full"
      data-name="Register"
    >
      <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] max-w-[135.043px] not-italic relative shrink-0 text-[#3f3f45] text-[12.197px] text-left text-nowrap">
        <p className="block leading-[19.167px] whitespace-pre">
          Don’t have an account?
        </p>
      </div>
      <Button2 />
    </div>
  );
}

function Buttons() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-[20.91px] items-center justify-start p-0 relative shrink-0 w-full"
      data-name="Buttons"
    >
      <Button1 />
      <Register />
    </div>
  );
}

function FormLogin() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-[20.91px] items-start justify-start p-0 relative shrink-0 w-full"
      data-name="*Form* / Login"
    >
      <FormFormItemVertical />
      <FormFormItemVertical1 />
      <Wrapper />
      <Buttons />
    </div>
  );
}

function ContentWrapper() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-col gap-[20.91px] items-start justify-start left-[49.66px] max-w-[278.798px] p-0 top-[232.62px] w-[278.798px]"
      data-name="Content Wrapper"
    >
      <Header />
      <FormLogin />
    </div>
  );
}

function TsaLogoVertical() {
  return (
    <div
      className="absolute h-[109px] left-[134px] top-[83px] w-[109.017px]"
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
        <ContentWrapper />
        <TsaLogoVertical />
      </div>
      <div
        aria-hidden="true"
        className="absolute border-[#d7d7d7] border-[0.871px] border-solid inset-0 pointer-events-none"
      />
    </div>
  );
}