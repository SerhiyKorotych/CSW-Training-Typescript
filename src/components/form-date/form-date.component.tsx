import { ChangeEvent } from "react";
import { Datebox } from "./form-date.styles";

type DateProps = {
  setStartDate: React.Dispatch<React.SetStateAction<string>>;
};

const InputDate = ({ setStartDate }: DateProps) => {
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value);
  };
  return (
    <Datebox type="date" max="2500-01-01" required onChange={onChangeHandler} />
  );
};

export default InputDate;
