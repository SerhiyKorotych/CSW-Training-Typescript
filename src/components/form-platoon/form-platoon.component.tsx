import { ChangeEvent } from "react";
import { Platoonbox, PlatoonSelected } from "./form-platoon.styles";
type PlatoonProps = {
  setPlatoon: React.Dispatch<React.SetStateAction<string>>;
  platoon: string;
};

const InputPlatoon = ({ setPlatoon, platoon }: PlatoonProps) => {
  const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setPlatoon(e.target.value);
  };
  return (
    <Platoonbox>
      Platoon:
      <PlatoonSelected onChange={onChangeHandler} value={platoon}>
        <option value="empty"></option>
        <option value="Phoenix">Pheonix</option>
        <option value="Transformers">Transformers</option>
        <option value="BigBang">BigBang</option>
        <option value="Spartan">Spartan</option>
        <option value="Alchemist">Alchemist</option>
      </PlatoonSelected>
    </Platoonbox>
  );
};

export default InputPlatoon;
