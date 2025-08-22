import imgTsaLogoVertical1 from "figma:asset/9d541cf6cd02dcda774b6151f871e67fbb047fcd.png";

function TsaLogoVertical1() {
  return (
    <div className="relative size-full" data-name="tsa - logo - vertical 1">
      <div
        className="absolute bg-center bg-cover bg-no-repeat inset-0"
        data-name="tsa - logo - vertical 1"
        style={{ backgroundImage: `url('${imgTsaLogoVertical1}')` }}
      />
    </div>
  );
}

export default function TsaLogoVertical2() {
  return (
    <div className="relative size-full" data-name="tsa - logo - vertical 1">
      <TsaLogoVertical1 />
    </div>
  );
}