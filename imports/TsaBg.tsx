import svgPaths from "./svg-slxkusfcc5";
import imgRectangle3 from "figma:asset/8854862d4fee974f902abf28e3680f900a46d987.png";

function Group23() {
  return (
    <div className="h-[12.12px] relative shrink-0 w-[17.744px]">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 18 13"
      >
        <g id="Group 23">
          <path
            d={svgPaths.p20b62e00}
            fill="var(--fill-0, white)"
            id="Vector (Stroke)"
          />
          <path
            d={svgPaths.p13765c80}
            fill="var(--fill-0, white)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Avatar() {
  return (
    <div
      className="bg-[#0084ff] box-border content-stretch flex flex-row gap-[6.97px] items-center justify-center p-[6.099px] relative rounded-[83.639px] shrink-0 size-[27.88px]"
      data-name="Avatar"
    >
      <Group23 />
    </div>
  );
}

function XBubbleBubbleItem() {
  return (
    <div
      className="bg-[rgba(0,0,0,0.06)] box-border content-stretch flex flex-row gap-2 items-start justify-start px-4 py-3 relative rounded-lg shrink-0 w-[291.867px]"
      data-name="X / Bubble / Bubble Item"
    >
      <div className="basis-0 flex flex-col font-['Inter:Regular',_sans-serif] font-normal grow justify-center leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#00141a] text-[10.455px] text-left">
        <p className="block leading-[17.425px]">We’ve completed the test.</p>
      </div>
    </div>
  );
}

function HeaderBubble() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-[6.97px] items-start justify-start p-0 relative shrink-0 w-full"
      data-name="Header + Bubble"
    >
      <XBubbleBubbleItem />
    </div>
  );
}

function Bubble() {
  return (
    <div
      className="backdrop-blur-[2.5px] backdrop-filter box-border content-stretch flex flex-col items-start justify-start p-0 relative shrink-0 w-[291.867px]"
      data-name="Bubble"
    >
      <HeaderBubble />
    </div>
  );
}

function XBubbleListItem() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-[10.455px] items-start justify-start p-0 relative shrink-0 w-[292.738px]"
      data-name="X / Bubble / List Item"
    >
      <Avatar />
      <Bubble />
    </div>
  );
}

function SystemMessageWrapper() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row gap-[6.97px] items-start justify-start left-[20.04px] p-0 top-[105px] w-[334.558px]"
      data-name="System Message Wrapper"
    >
      <XBubbleListItem />
    </div>
  );
}

function XBubbleBubbleItem1() {
  return (
    <div
      className="bg-[rgba(0,0,0,0.06)] box-border content-stretch flex flex-row gap-2 items-start justify-start px-4 py-3 relative rounded-lg shrink-0 w-[291.867px]"
      data-name="X / Bubble / Bubble Item"
    >
      <div className="basis-0 flex flex-col font-['Inter:Regular',_sans-serif] font-normal grow justify-center leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#00141a] text-[10.455px] text-left">
        <p className="block leading-[17.425px]">
          CONVERSATION SUMMARY - the same that goes to History
        </p>
      </div>
    </div>
  );
}

function HeaderBubble1() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-[6.97px] items-start justify-start p-0 relative shrink-0 w-full"
      data-name="Header + Bubble"
    >
      <XBubbleBubbleItem1 />
    </div>
  );
}

function Bubble1() {
  return (
    <div
      className="absolute backdrop-blur-[2.5px] backdrop-filter box-border content-stretch flex flex-col items-start justify-start left-[59px] p-0 top-[151.91px] w-[291.867px]"
      data-name="Bubble"
    >
      <HeaderBubble1 />
    </div>
  );
}

function XBubbleBubbleItem2() {
  return (
    <div
      className="bg-[rgba(0,0,0,0.06)] box-border content-stretch flex flex-row gap-2 items-start justify-start px-4 py-3 relative rounded-lg shrink-0 w-[291.867px]"
      data-name="X / Bubble / Bubble Item"
    >
      <div className="basis-0 flex flex-col font-['Inter:Regular',_sans-serif] font-normal grow justify-center leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#00141a] text-[10.455px] text-left">
        <p className="block leading-[17.425px]">
          Would you like to keep this conversation for later?
        </p>
      </div>
    </div>
  );
}

function HeaderBubble2() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-[6.97px] items-start justify-start p-0 relative shrink-0 w-full"
      data-name="Header + Bubble"
    >
      <XBubbleBubbleItem2 />
    </div>
  );
}

function Bubble2() {
  return (
    <div
      className="backdrop-blur-[2.5px] backdrop-filter box-border content-stretch flex flex-col items-start justify-start p-0 relative shrink-0 w-[291.867px]"
      data-name="Bubble"
    >
      <HeaderBubble2 />
    </div>
  );
}

function SystemMessageContainer() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-col gap-[3.485px] items-start justify-start left-[59.24px] p-0 top-[215.82px] w-[309.292px]"
      data-name="System Message Container"
    >
      <Bubble2 />
    </div>
  );
}

function XBubbleBubbleItem3() {
  return (
    <div
      className="bg-[rgba(0,0,0,0.06)] box-border content-stretch flex flex-row gap-2 items-start justify-start px-4 py-3 relative rounded-lg shrink-0 w-[291.867px]"
      data-name="X / Bubble / Bubble Item"
    >
      <div className="basis-0 flex flex-col font-['Inter:Regular',_sans-serif] font-normal grow justify-center leading-[17.425px] min-h-px min-w-px not-italic relative shrink-0 text-[#00141a] text-[10.455px] text-left">
        <p className="block mb-0">Got it. This conversation won’t be stored.</p>
        <p className="block mb-0">&nbsp;</p>
        <p className="block">Let’s start fresh whenever you’re ready.</p>
      </div>
    </div>
  );
}

function HeaderBubble3() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-[6.97px] items-start justify-start p-0 relative shrink-0 w-full"
      data-name="Header + Bubble"
    >
      <XBubbleBubbleItem3 />
    </div>
  );
}

function Bubble3() {
  return (
    <div
      className="backdrop-blur-[2.5px] backdrop-filter box-border content-stretch flex flex-col items-start justify-start p-0 relative shrink-0 w-[291.867px]"
      data-name="Bubble"
    >
      <HeaderBubble3 />
    </div>
  );
}

function SystemMessageContainer1() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-col gap-[3.485px] items-start justify-start left-[59.24px] p-0 top-[350.93px] w-[309.292px]"
      data-name="System Message Container"
    >
      <Bubble3 />
    </div>
  );
}

function AudioIcon() {
  return (
    <div className="relative shrink-0 size-[20.91px]" data-name="Audio Icon">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 21 21"
      >
        <g id="Audio Icon">
          <path
            d={svgPaths.p3f6e3980}
            fill="var(--fill-0, #18181B)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function AudioIconContainer() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row gap-[13.94px] items-center justify-start left-0 p-[3.485px] top-0"
      data-name="Audio Icon Container"
    >
      <AudioIcon />
    </div>
  );
}

function SendIcon() {
  return (
    <div className="relative shrink-0 size-[20.91px]" data-name="Send Icon">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 21 21"
      >
        <g id="Send Icon">
          <path
            d={svgPaths.p2b546000}
            fill="var(--fill-0, #717179)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function SendIconContainer() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row gap-[13.94px] items-center justify-start left-[34.85px] p-[3.485px] top-0"
      data-name="Send Icon Container"
    >
      <SendIcon />
    </div>
  );
}

function InputIconsContainer() {
  return (
    <div
      className="h-[27.88px] relative shrink-0 w-[59.245px]"
      data-name="Input Icons Container"
    >
      <AudioIconContainer />
      <SendIconContainer />
    </div>
  );
}

function Resizer() {
  return (
    <div
      className="absolute bottom-[1.77px] h-[6.97px] right-[2.41px] w-[6.745px]"
      data-name="Resizer"
    >
      <div className="absolute bottom-[-2.17%] left-[-2.32%] right-[-2.32%] top-[-2.17%]">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 8 9"
        >
          <g id="Resizer">
            <path
              d={svgPaths.p1b544000}
              id="Vector"
              stroke="var(--stroke-0, #18181B)"
              strokeWidth="0.435622"
            />
            <path
              d="M1 7.96996L7.74512 1"
              id="Vector 2"
              stroke="var(--stroke-0, #18181B)"
              strokeWidth="0.435622"
            />
          </g>
        </svg>
      </div>
    </div>
  );
}

function InputTextarea() {
  return (
    <div
      className="bg-[#ffffff] h-[59px] relative rounded-[5.227px] shrink-0 w-full"
      data-name="Input / Textarea"
    >
      <div
        aria-hidden="true"
        className="absolute border-[0.871px] border-solid border-zinc-300 inset-0 pointer-events-none rounded-[5.227px]"
      />
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex flex-row gap-[10.455px] h-[59px] items-center justify-start pl-[13.94px] pr-[9.584px] py-[3.485px] relative w-full">
          <div className="basis-0 font-['Inter:Regular',_sans-serif] font-normal grow h-[55px] leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#000000] text-[12.197px] text-left">
            <p className="block leading-[19.167px]">..</p>
          </div>
          <InputIconsContainer />
          <Resizer />
        </div>
      </div>
    </div>
  );
}

function InputContainer() {
  return (
    <div
      className="absolute bg-[rgba(255,255,255,0.1)] box-border content-stretch flex flex-col gap-[20.91px] items-start justify-start left-5 p-0 top-[729.02px] w-[335px]"
      data-name="Input Container"
    >
      <InputTextarea />
    </div>
  );
}

function UserMessageTextContainer() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0"
      data-name="User Message Text Container"
    >
      <div className="flex flex-col font-['Inter:Regular',_sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[10.455px] text-left text-zinc-900 w-full">
        <p className="block leading-[17.425px]">Delete this conversation</p>
      </div>
    </div>
  );
}

function UserMessageWrapper() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-[8.712px] items-start justify-start p-0 relative shrink-0 w-full"
      data-name="User Message Wrapper"
    >
      <UserMessageTextContainer />
    </div>
  );
}

function UserMessageContent() {
  return (
    <div
      className="absolute backdrop-blur-[2.5px] backdrop-filter bg-[#ffffff] box-border content-stretch flex flex-col gap-[8.712px] items-start justify-start left-[195px] px-[13.94px] py-[3.485px] rounded-[6.97px] top-[278.93px] w-[156px]"
      data-name="User Message Content"
    >
      <UserMessageWrapper />
    </div>
  );
}

function Group24() {
  return (
    <div className="absolute bottom-[14.89%] left-[-1.72%] right-[89.54%] top-[10.63%]">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 38 26"
      >
        <g id="Group 23">
          <path
            d={svgPaths.p3d4d9a00}
            fill="var(--fill-0, #0084FF)"
            id="Vector (Stroke)"
          />
          <path
            d={svgPaths.p37ef2e00}
            fill="var(--fill-0, #0084FF)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Avatar1() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-[6.97px] items-start justify-start p-0 relative rounded-[83.639px] shrink-0 size-8"
      data-name="Avatar"
    >
      <div
        className="basis-0 bg-center bg-cover bg-no-repeat grow h-full min-h-px min-w-px rounded-[870.373px] shrink-0"
        style={{ backgroundImage: `url('${imgRectangle3}')` }}
      />
    </div>
  );
}

function AppHeaderItemsAvatar() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-col items-start justify-start left-[284.03px] p-0 top-[3.48px]"
      data-name="App Header Items / Avatar"
    >
      <Avatar1 />
    </div>
  );
}

function Div() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[34.85px] left-[31.36px] top-[18.3px] w-[311.906px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Group24 />
      <AppHeaderItemsAvatar />
    </div>
  );
}

function Header() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[69.7px] left-0 top-0 w-[374.635px]"
      data-name="header"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Div />
    </div>
  );
}

function Container() {
  return (
    <div
      className="absolute bottom-[14.86%] left-[19.49%] right-[15.12%] top-[64.53%]"
      data-name="Container"
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 245 168"
      >
        <g id="Container">
          <path
            d={svgPaths.p58f6f80}
            fill="var(--fill-0, white)"
            fillOpacity="0.8"
            id="Vector (Stroke)"
          />
          <path
            d={svgPaths.p32887b80}
            fill="var(--fill-0, white)"
            fillOpacity="0.8"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function UserMessageTextContainer1() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0"
      data-name="User Message Text Container"
    >
      <div className="flex flex-col font-['Inter:Regular',_sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[10.455px] text-left text-zinc-900 w-full">
        <p className="block leading-[17.425px]">{`Take me to the topics `}</p>
      </div>
    </div>
  );
}

function UserMessageWrapper1() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-[8.712px] items-start justify-start p-0 relative shrink-0 w-full"
      data-name="User Message Wrapper"
    >
      <UserMessageTextContainer1 />
    </div>
  );
}

function UserMessageContent1() {
  return (
    <div
      className="absolute backdrop-blur-[2.5px] backdrop-filter bg-[#ffffff] box-border content-stretch flex flex-col gap-[8.712px] items-start justify-start left-[195px] px-[13.94px] py-[3.485px] rounded-[6.97px] top-[470.93px] w-[156px]"
      data-name="User Message Content"
    >
      <UserMessageWrapper1 />
    </div>
  );
}

export default function TsaBg() {
  return (
    <div
      className="bg-gradient-to-b from-[#ffffff] relative size-full to-[#ebf5ff]"
      data-name="TSA - BG"
    >
      <div className="relative size-full">
        <SystemMessageWrapper />
        <Bubble1 />
        <SystemMessageContainer />
        <SystemMessageContainer1 />
        <InputContainer />
        <UserMessageContent />
        <Header />
        <Container />
        <UserMessageContent1 />
      </div>
      <div
        aria-hidden="true"
        className="absolute border-[#d7d7d7] border-[0.871px] border-solid inset-0 pointer-events-none"
      />
    </div>
  );
}