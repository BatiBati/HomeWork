type Props = {
  onSelectChild: (id: number) => void;
};
export const DayCare = ({ onSelectChild }: Props) => {
  return (
    <div onClick={() => onSelectChild(3)} className="font-semibold">
      DayCare
    </div>
  );
};
