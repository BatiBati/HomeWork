type WidthHeightType = {
  width: string;
  height: string;
};
export const RightArrow = ({ width, height }: WidthHeightType) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 7 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.873047 11L5.87305 6L0.873047 1"
        stroke="#18181B"
        strokeOpacity="0.5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
