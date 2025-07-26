export type StokeTpye = {
  stroke: string;
};

export const PlusSvg = ({ stroke }: StokeTpye) => {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 12 12"
      fill="red"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.33341 1.33337V10.6667M1.66675 6.00004H11.0001"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
