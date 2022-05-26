import { ChangeEvent } from "react";
import { Namebox } from "./form-name.styles";

type NameInputProps = {
  setName: React.Dispatch<React.SetStateAction<string>>;
};

const NameInput = ({ setName }: NameInputProps) => {
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  return (
    <Namebox
      placeholder="Please type employee name"
      className="name-input"
      type="text"
      required
      onChange={onChangeHandler}
    />
  );
};

export default NameInput;
