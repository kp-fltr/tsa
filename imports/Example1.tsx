import svgPaths from "./svg-o0ffiiskjt";
import imgImage1 from "figma:asset/d679dfe750298cb779760e67a02ff569c3733169.png";

function Component() {
  return (
    <div className="absolute contents inset-0" data-name="首页">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 40 40"
      >
        <g id="ç¼ç»-2">
          <g id="ç©å½¢å¤ä»½-3"></g>
          <g id="è·¯å¾-2">
            <path
              d={svgPaths.p17ad6100}
              fill="url(#paint0_linear_6_7181)"
              id="èç"
            />
            <g id="Mask group">
              <mask
                height="34"
                id="mask0_6_7181"
                maskUnits="userSpaceOnUse"
                style={{ maskType: "luminance" }}
                width="34"
                x="3"
                y="3"
              >
                <g id="Group">
                  <path
                    d={svgPaths.p17ad6100}
                    fill="var(--fill-0, white)"
                    id="Vector"
                  />
                </g>
              </mask>
              <g mask="url(#mask0_6_7181)">
                <path
                  clipRule="evenodd"
                  d={svgPaths.pe5c180}
                  fill="url(#paint1_linear_6_7181)"
                  fillRule="evenodd"
                  id="Vector_2"
                />
              </g>
            </g>
          </g>
          <path
            d={svgPaths.p2ce8c680}
            fill="url(#paint2_linear_6_7181)"
            id="è·¯å¾-2å¤ä»½-5"
          />
        </g>
        <defs>
          <linearGradient
            gradientUnits="userSpaceOnUse"
            id="paint0_linear_6_7181"
            x1="1670.03"
            x2="1670.03"
            y1="3.4"
            y2="3311.98"
          >
            <stop stopColor="#3DFFFB" />
            <stop offset="1" stopColor="#3B86FF" />
          </linearGradient>
          <linearGradient
            gradientUnits="userSpaceOnUse"
            id="paint1_linear_6_7181"
            x1="742.568"
            x2="136.385"
            y1="233.445"
            y2="876.904"
          >
            <stop stopColor="#024FC9" />
            <stop offset="1" stopColor="#1383FF" stopOpacity="0" />
          </linearGradient>
          <linearGradient
            gradientUnits="userSpaceOnUse"
            id="paint2_linear_6_7181"
            x1="1301.95"
            x2="171.194"
            y1="70.6719"
            y2="1287.75"
          >
            <stop stopColor="#FF8BFF" />
            <stop offset="1" stopColor="#B54DFF" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function Component1() {
  return (
    <div className="absolute contents inset-0" data-name="页面-1">
      <Component />
    </div>
  );
}

function Original1() {
  return (
    <div
      className="overflow-clip relative shrink-0 size-10"
      data-name="original 1"
    >
      <Component1 />
    </div>
  );
}

function Title() {
  return (
    <div className="h-[72px] relative shrink-0 w-full" data-name="Title">
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex flex-row gap-2 h-[72px] items-center justify-start px-6 py-0 relative w-full">
          <Original1 />
          <div className="flex flex-col font-['SF_Pro_Text:Semibold',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-[rgba(0,0,0,0.88)] text-center text-nowrap">
            <p className="block leading-[24px] whitespace-pre">Ant Design X</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function IconPlusOutlined() {
  return (
    <div className="relative shrink-0 size-4" data-name="Icon / PlusOutlined">
      <div className="absolute inset-0" />
    </div>
  );
}

function Content() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2 h-8 items-center justify-center p-0 relative shrink-0"
      data-name="Content"
    >
      <IconPlusOutlined />
      <div className="font-['SF_Pro_Text:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#1677ff] text-[14px] text-left text-nowrap">
        <p className="block leading-[22px] whitespace-pre">New Conversation</p>
      </div>
    </div>
  );
}

function ButtonBasic() {
  return (
    <div
      className="bg-[rgba(22,119,255,0.06)] relative rounded-md shrink-0 w-full"
      data-name="Button / Basic"
    >
      <div className="absolute border border-[rgba(22,119,255,0.2)] border-solid inset-0 pointer-events-none rounded-md" />
      <div className="flex flex-col items-center justify-center relative size-full">
        <div className="box-border content-stretch flex flex-col gap-2 items-center justify-center px-[15px] py-0 relative w-full">
          <Content />
        </div>
      </div>
    </div>
  );
}

function ButtonWrapper() {
  return (
    <div className="relative shrink-0 w-full" data-name="Button Wrapper">
      <div className="relative size-full">
        <div className="box-border content-stretch flex flex-col gap-2.5 items-start justify-start pb-6 pt-0 px-3 relative w-full">
          <ButtonBasic />
        </div>
      </div>
    </div>
  );
}

function ConversationsItem() {
  return (
    <div
      className="h-10 relative rounded-lg shrink-0 w-full"
      data-name="Conversations Item"
    >
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex flex-row gap-2 h-10 items-center justify-start px-2 py-0 relative w-full">
          <div className="basis-0 flex flex-col font-['SF_Pro_Text:Regular',_sans-serif] grow h-full justify-center leading-[0] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[14px] text-[rgba(0,0,0,0.88)] text-left text-nowrap">
            <p className="[text-overflow:inherit] [text-wrap-mode:inherit]\' [white-space-collapse:inherit] block leading-[22px] overflow-inherit">
              What is Ant Design X?
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ConversationsItem1() {
  return (
    <div
      className="bg-[rgba(0,0,0,0.06)] h-10 relative rounded-lg shrink-0 w-full"
      data-name="Conversations Item"
    >
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex flex-row gap-2 h-10 items-center justify-start px-2 py-0 relative w-full">
          <div className="basis-0 flex flex-col font-['SF_Pro_Text:Regular',_sans-serif] grow h-full justify-center leading-[0] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[14px] text-[rgba(0,0,0,0.88)] text-left text-nowrap">
            <p className="[text-overflow:inherit] [text-wrap-mode:inherit]\' [white-space-collapse:inherit] block leading-[22px] overflow-inherit">
              New Conversation 1
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ConversationsWrapper() {
  return (
    <div className="relative shrink-0 w-full" data-name="Conversations Wrapper">
      <div className="relative size-full">
        <div className="box-border content-stretch flex flex-col gap-1 items-start justify-start px-3 py-0 relative w-full">
          <ConversationsItem />
          <ConversationsItem1 />
        </div>
      </div>
    </div>
  );
}

function Sidebar() {
  return (
    <div
      className="bg-neutral-100 box-border content-stretch flex flex-col h-full items-start justify-start p-0 relative shrink-0 w-[280px]"
      data-name="Sidebar"
    >
      <Title />
      <ButtonWrapper />
      <ConversationsWrapper />
    </div>
  );
}

function IconShareAltOutlined() {
  return (
    <div
      className="relative shrink-0 size-4"
      data-name="Icon / ShareAltOutlined"
    >
      <div className="absolute inset-0" />
    </div>
  );
}

function Content1() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2 items-center justify-center p-0 relative shrink-0 size-8"
      data-name="Content"
    >
      <IconShareAltOutlined />
    </div>
  );
}

function ButtonBasic1() {
  return (
    <div
      className="bg-[#ffffff] box-border content-stretch flex flex-col gap-2 items-center justify-center p-0 relative rounded-md shrink-0"
      data-name="Button / Basic"
    >
      <div className="absolute border border-[#d9d9d9] border-solid inset-0 pointer-events-none rounded-md shadow-[0px_2px_0px_0px_rgba(0,0,0,0.02)]" />
      <Content1 />
    </div>
  );
}

function IconEllipsisOutlined() {
  return (
    <div
      className="relative shrink-0 size-4"
      data-name="Icon / EllipsisOutlined"
    >
      <div className="absolute inset-0" />
    </div>
  );
}

function Content2() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2 items-center justify-center p-0 relative shrink-0 size-8"
      data-name="Content"
    >
      <IconEllipsisOutlined />
    </div>
  );
}

function ButtonBasic2() {
  return (
    <div
      className="bg-[#ffffff] box-border content-stretch flex flex-col gap-2 items-center justify-center p-0 relative rounded-md shrink-0"
      data-name="Button / Basic"
    >
      <div className="absolute border border-[#d9d9d9] border-solid inset-0 pointer-events-none rounded-md shadow-[0px_2px_0px_0px_rgba(0,0,0,0.02)]" />
      <Content2 />
    </div>
  );
}

function Buttons() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2 items-center justify-start p-0 relative shrink-0"
      data-name="Buttons"
    >
      <ButtonBasic1 />
      <ButtonBasic2 />
    </div>
  );
}

function HeaderWrapper() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2.5 items-center justify-center p-0 relative shrink-0 w-full"
      data-name="Header Wrapper"
    >
      <div className="basis-0 flex flex-col font-['SF_Pro_Text:Bold',_sans-serif] grow justify-center leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[20px] text-[rgba(0,0,0,0.88)] text-left">
        <p className="block leading-[28px]">Hello, I’m Ant Design X</p>
      </div>
      <Buttons />
    </div>
  );
}

function TextWrapper() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col gap-2 grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0"
      data-name="Text Wrapper"
    >
      <HeaderWrapper />
      <div className="flex flex-col font-['SF_Pro_Text:Regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(0,0,0,0.88)] text-left w-full">
        <p className="block leading-[22px]">
          Base on Ant Design, AGI product interface solution, create a better
          intelligent vision~
        </p>
      </div>
    </div>
  );
}

function XWelcome() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-4 items-start justify-start p-0 relative rounded-lg shrink-0 w-full"
      data-name="X / Welcome"
    >
      <div
        className="bg-center bg-cover bg-no-repeat h-[58px] shrink-0 w-[52.727px]"
        data-name="image 1"
        style={{ backgroundImage: `url('${imgImage1}')` }}
      />
      <TextWrapper />
    </div>
  );
}

function PromptsTitle() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-4 h-6 items-start justify-start p-0 relative shrink-0 w-full"
      data-name="Prompts Title"
    >
      <div className="font-['SF_Pro_Text:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[16px] text-[rgba(0,0,0,0.45)] text-left w-full">
        <p className="block leading-[24px]">Do you want?</p>
      </div>
    </div>
  );
}

function IconFireOutlined() {
  return (
    <div className="relative shrink-0 size-4" data-name="Icon / FireOutlined">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 16 16"
      >
        <g id="Icon / FireOutlined">
          <path
            d={svgPaths.p6c0e280}
            fill="var(--fill-0, #FF4D4F)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function TitleWrapper() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2 h-6 items-center justify-start p-0 relative shrink-0 w-full"
      data-name="Title Wrapper"
    >
      <IconFireOutlined />
      <div className="basis-0 flex flex-col font-['SF_Pro_Text:Regular',_sans-serif] grow h-full justify-center leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[16px] text-[rgba(0,0,0,0.88)] text-left">
        <p className="block leading-[24px]">Hot Topics</p>
      </div>
    </div>
  );
}

function XPromptItem() {
  return (
    <div
      className="bg-[rgba(0,0,0,0.02)] relative rounded-lg shrink-0 w-full"
      data-name="X / Prompt Item"
    >
      <div className="relative size-full">
        <div className="box-border content-stretch flex flex-row gap-2 items-start justify-start px-4 py-3 relative w-full">
          <div className="basis-0 flex flex-col font-['SF_Pro_Text:Regular',_sans-serif] grow justify-center leading-[0] min-h-px min-w-px not-italic relative self-stretch shrink-0 text-[14px] text-[rgba(0,0,0,0.88)] text-left">
            <p className="block leading-[22px]">{`What's new in X?`}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function XPromptItem1() {
  return (
    <div
      className="bg-[rgba(0,0,0,0.02)] relative rounded-lg shrink-0 w-full"
      data-name="X / Prompt Item"
    >
      <div className="relative size-full">
        <div className="box-border content-stretch flex flex-row gap-2 items-start justify-start px-4 py-3 relative w-full">
          <div className="basis-0 flex flex-col font-['SF_Pro_Text:Regular',_sans-serif] grow justify-center leading-[0] min-h-px min-w-px not-italic relative self-stretch shrink-0 text-[14px] text-[rgba(0,0,0,0.88)] text-left">
            <p className="block leading-[22px]">{`What's AGI?`}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function XPromptItem2() {
  return (
    <div
      className="bg-[rgba(0,0,0,0.02)] relative rounded-lg shrink-0 w-full"
      data-name="X / Prompt Item"
    >
      <div className="relative size-full">
        <div className="box-border content-stretch flex flex-row gap-2 items-start justify-start px-4 py-3 relative w-full">
          <div className="basis-0 flex flex-col font-['SF_Pro_Text:Regular',_sans-serif] grow justify-center leading-[0] min-h-px min-w-px not-italic relative self-stretch shrink-0 text-[14px] text-[rgba(0,0,0,0.88)] text-left">
            <p className="block leading-[22px]">Where is the doc?</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function PromptsWrapper() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-3 items-start justify-start p-0 relative shrink-0 w-full"
      data-name="Prompts Wrapper"
    >
      <XPromptItem />
      <XPromptItem1 />
      <XPromptItem2 />
    </div>
  );
}

function XPromptGroup() {
  return (
    <div
      className="basis-0 bg-[#ffffff] grow min-h-px min-w-px relative rounded-lg shrink-0"
      data-name="X / Prompt Group"
    >
      <div className="absolute border border-[#f0f0f0] border-solid inset-0 pointer-events-none rounded-lg" />
      <div className="relative size-full">
        <div className="box-border content-stretch flex flex-col gap-1 items-start justify-start px-4 py-3 relative w-full">
          <TitleWrapper />
          <div className="flex flex-col font-['SF_Pro_Text:Regular',_sans-serif] h-6 justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(0,0,0,0.45)] text-left w-full">
            <p className="block leading-[22px]">What are you interested in?</p>
          </div>
          <PromptsWrapper />
        </div>
      </div>
    </div>
  );
}

function IconReadOutlined() {
  return (
    <div className="relative shrink-0 size-4" data-name="Icon / ReadOutlined">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 16 16"
      >
        <g id="Icon / ReadOutlined">
          <path
            d={svgPaths.p3b7e1100}
            fill="var(--fill-0, #4096FF)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function TitleWrapper1() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2 h-6 items-center justify-start p-0 relative shrink-0 w-full"
      data-name="Title Wrapper"
    >
      <IconReadOutlined />
      <div className="basis-0 flex flex-col font-['SF_Pro_Text:Regular',_sans-serif] grow h-full justify-center leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[16px] text-[rgba(0,0,0,0.88)] text-left">
        <p className="block leading-[24px]">Design Guide</p>
      </div>
    </div>
  );
}

function IconHeartOutlined() {
  return (
    <div
      className="relative shrink-0 size-3.5"
      data-name="Icon / HeartOutlined"
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 14 14"
      >
        <g id="Icon / HeartOutlined">
          <path
            d={svgPaths.p10408e00}
            fill="var(--fill-0, black)"
            fillOpacity="0.45"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function IconWrapper3() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2.5 items-start justify-start pb-0 pt-1 px-0 relative shrink-0"
      data-name="Icon Wrapper"
    >
      <IconHeartOutlined />
    </div>
  );
}

function XPromptItem3() {
  return (
    <div
      className="bg-[rgba(0,0,0,0.02)] relative rounded-lg shrink-0 w-full"
      data-name="X / Prompt Item"
    >
      <div className="relative size-full">
        <div className="box-border content-stretch flex flex-row gap-2 items-start justify-start px-4 py-3 relative w-full">
          <IconWrapper3 />
          <div className="basis-0 flex flex-col font-['SF_Pro_Text:Regular',_sans-serif] grow justify-center leading-[0] min-h-px min-w-px not-italic relative self-stretch shrink-0 text-[14px] text-[rgba(0,0,0,0.88)] text-left">
            <p className="block leading-[22px]">Know the vell</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function IconSmileOutlined3() {
  return (
    <div
      className="relative shrink-0 size-3.5"
      data-name="Icon / SmileOutlined"
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 14 14"
      >
        <g clipPath="url(#clip0_6_7163)" id="Icon / SmileOutlined">
          <path
            d={svgPaths.p44a8900}
            fill="var(--fill-0, black)"
            fillOpacity="0.45"
            id="Vector"
          />
        </g>
        <defs>
          <clipPath id="clip0_6_7163">
            <rect fill="white" height="14" width="14" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function IconWrapper4() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2.5 items-start justify-start pb-0 pt-1 px-0 relative shrink-0"
      data-name="Icon Wrapper"
    >
      <IconSmileOutlined3 />
    </div>
  );
}

function XPromptItem4() {
  return (
    <div
      className="bg-[rgba(0,0,0,0.02)] relative rounded-lg shrink-0 w-full"
      data-name="X / Prompt Item"
    >
      <div className="relative size-full">
        <div className="box-border content-stretch flex flex-row gap-2 items-start justify-start px-4 py-3 relative w-full">
          <IconWrapper4 />
          <div className="basis-0 flex flex-col font-['SF_Pro_Text:Regular',_sans-serif] grow justify-center leading-[0] min-h-px min-w-px not-italic relative self-stretch shrink-0 text-[14px] text-[rgba(0,0,0,0.88)] text-left">
            <p className="block leading-[22px]">Set the AI role</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function IconCommentOutlined() {
  return (
    <div
      className="relative shrink-0 size-3.5"
      data-name="Icon / CommentOutlined"
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 14 14"
      >
        <g id="Icon / CommentOutlined">
          <g id="Vector">
            <path d={svgPaths.p2ecef800} fill="black" fillOpacity="0.45" />
            <path d={svgPaths.p4c2f000} fill="black" fillOpacity="0.45" />
            <path d={svgPaths.p3a0cc270} fill="black" fillOpacity="0.45" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function IconWrapper5() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2.5 items-start justify-start pb-0 pt-1 px-0 relative shrink-0"
      data-name="Icon Wrapper"
    >
      <IconCommentOutlined />
    </div>
  );
}

function XPromptItem5() {
  return (
    <div
      className="bg-[rgba(0,0,0,0.02)] relative rounded-lg shrink-0 w-full"
      data-name="X / Prompt Item"
    >
      <div className="relative size-full">
        <div className="box-border content-stretch flex flex-row gap-2 items-start justify-start px-4 py-3 relative w-full">
          <IconWrapper5 />
          <div className="basis-0 flex flex-col font-['SF_Pro_Text:Regular',_sans-serif] grow justify-center leading-[0] min-h-px min-w-px not-italic relative self-stretch shrink-0 text-[14px] text-[rgba(0,0,0,0.88)] text-left">
            <p className="block leading-[22px]">Express the feeling</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function PromptsWrapper1() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-3 items-start justify-start p-0 relative shrink-0 w-full"
      data-name="Prompts Wrapper"
    >
      <XPromptItem3 />
      <XPromptItem4 />
      <XPromptItem5 />
    </div>
  );
}

function XPromptGroup1() {
  return (
    <div
      className="basis-0 bg-[#ffffff] grow min-h-px min-w-px relative rounded-lg shrink-0"
      data-name="X / Prompt Group"
    >
      <div className="absolute border border-[#f0f0f0] border-solid inset-0 pointer-events-none rounded-lg" />
      <div className="relative size-full">
        <div className="box-border content-stretch flex flex-col gap-1 items-start justify-start px-4 py-3 relative w-full">
          <TitleWrapper1 />
          <div className="flex flex-col font-['SF_Pro_Text:Regular',_sans-serif] h-6 justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(0,0,0,0.45)] text-left w-full">
            <p className="block leading-[22px]">What are you interested in?</p>
          </div>
          <PromptsWrapper1 />
        </div>
      </div>
    </div>
  );
}

function PromptsWrapper2() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-3 items-center justify-start p-0 relative shrink-0 w-full"
      data-name="Prompts Wrapper"
    >
      <XPromptGroup />
      <XPromptGroup1 />
    </div>
  );
}

function Wrapper() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col gap-2 grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0 w-full"
      data-name="Wrapper"
    >
      <PromptsTitle />
      <PromptsWrapper2 />
    </div>
  );
}

function IconFireOutlined1() {
  return (
    <div className="relative shrink-0 size-3.5" data-name="Icon / FireOutlined">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 14 14"
      >
        <g id="Icon / FireOutlined">
          <path
            d={svgPaths.p3344ca00}
            fill="var(--fill-0, #FF4D4F)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function IconWrapper6() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2.5 items-start justify-start pb-0 pt-1 px-0 relative shrink-0"
      data-name="Icon Wrapper"
    >
      <IconFireOutlined1 />
    </div>
  );
}

function XPromptItem6() {
  return (
    <div
      className="bg-[#ffffff] box-border content-stretch flex flex-row gap-2 items-start justify-start px-4 py-3 relative rounded-lg shrink-0"
      data-name="X / Prompt Item"
    >
      <div className="absolute border border-[#f0f0f0] border-solid inset-0 pointer-events-none rounded-lg" />
      <IconWrapper6 />
      <div className="flex flex-col font-['SF_Pro_Text:Regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(0,0,0,0.88)] text-left text-nowrap">
        <p className="block leading-[22px] whitespace-pre">Hot Topics</p>
      </div>
    </div>
  );
}

function IconReadOutlined1() {
  return (
    <div className="relative shrink-0 size-3.5" data-name="Icon / ReadOutlined">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 14 14"
      >
        <g id="Icon / ReadOutlined">
          <path
            d={svgPaths.p4bed600}
            fill="var(--fill-0, #4096FF)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function IconWrapper7() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2.5 items-start justify-start pb-0 pt-1 px-0 relative shrink-0"
      data-name="Icon Wrapper"
    >
      <IconReadOutlined1 />
    </div>
  );
}

function XPromptItem7() {
  return (
    <div
      className="bg-[#ffffff] box-border content-stretch flex flex-row gap-2 items-start justify-start px-4 py-3 relative rounded-lg shrink-0"
      data-name="X / Prompt Item"
    >
      <div className="absolute border border-[#f0f0f0] border-solid inset-0 pointer-events-none rounded-lg" />
      <IconWrapper7 />
      <div className="flex flex-col font-['SF_Pro_Text:Regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(0,0,0,0.88)] text-left text-nowrap">
        <p className="block leading-[22px] whitespace-pre">Design Guide</p>
      </div>
    </div>
  );
}

function PromptsWrapper3() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-3 items-center justify-start p-0 relative shrink-0"
      data-name="Prompts Wrapper"
    >
      <XPromptItem6 />
      <XPromptItem7 />
    </div>
  );
}

function IconLinkOutlined() {
  return (
    <div className="relative shrink-0 size-4" data-name="Icon / LinkOutlined">
      <div className="absolute inset-0" />
    </div>
  );
}

function Content3() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2 items-center justify-center p-0 relative shrink-0 size-8"
      data-name="Content"
    >
      <IconLinkOutlined />
    </div>
  );
}

function ButtonBasic3() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2 h-8 items-center justify-center p-0 relative rounded-md shrink-0"
      data-name="Button / Basic"
    >
      <Content3 />
    </div>
  );
}

function IconArrowUpOutlined() {
  return (
    <div
      className="relative shrink-0 size-4"
      data-name="Icon / ArrowUpOutlined"
    >
      <div className="absolute inset-0" />
    </div>
  );
}

function Content4() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2 items-center justify-center p-0 relative shrink-0 size-8"
      data-name="Content"
    >
      <IconArrowUpOutlined />
    </div>
  );
}

function ButtonBasic4() {
  return (
    <div
      className="bg-[#1677ff] box-border content-stretch flex flex-col gap-2 items-center justify-center opacity-[0.45] p-0 relative rounded-[9999px] shadow-[0px_2px_0px_0px_rgba(5,145,255,0.1)] shrink-0 size-8"
      data-name="Button / Basic"
    >
      <Content4 />
    </div>
  );
}

function Buttons1() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2 items-center justify-start p-0 relative shrink-0"
      data-name="Buttons"
    >
      <ButtonBasic4 />
    </div>
  );
}

function XSender() {
  return (
    <div
      className="bg-[#ffffff] relative rounded-xl shrink-0 w-full"
      data-name="X / Sender"
    >
      <div className="absolute border border-[#d9d9d9] border-solid inset-0 pointer-events-none rounded-xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03),0px_1px_6px_-1px_rgba(0,0,0,0.02),0px_2px_4px_0px_rgba(0,0,0,0.02)]" />
      <div className="flex flex-row items-center justify-center relative size-full">
        <div className="box-border content-stretch flex flex-row gap-2 items-center justify-center pl-4 pr-3 py-3 relative w-full">
          <ButtonBasic3 />
          <div className="basis-0 flex flex-col font-['SF_Pro_Text:Regular',_sans-serif] grow justify-center leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[14px] text-[rgba(0,0,0,0.25)] text-left">
            <p className="block leading-[22px]">&nbsp;</p>
          </div>
          <Buttons1 />
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-4 items-start justify-start p-0 relative shrink-0 w-full"
      data-name="Footer"
    >
      <PromptsWrapper3 />
      <XSender />
    </div>
  );
}

function ContentWrapper() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col gap-4 grow items-start justify-start max-w-[592px] min-h-px min-w-px pb-0 pt-8 px-0 relative shrink-0 w-full"
      data-name="Content Wrapper"
    >
      <XWelcome />
      <Wrapper />
      <Footer />
    </div>
  );
}

function Content5() {
  return (
    <div
      className="basis-0 bg-[#ffffff] grow h-full min-h-px min-w-px relative shrink-0"
      data-name="Content"
    >
      <div className="flex flex-col items-center relative size-full">
        <div className="box-border content-stretch flex flex-col gap-2.5 items-center justify-start p-[24px] relative size-full">
          <ContentWrapper />
        </div>
      </div>
    </div>
  );
}

export default function Example1() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-start p-0 relative size-full"
      data-name="Example 1"
    >
      <Sidebar />
      <Content5 />
    </div>
  );
}