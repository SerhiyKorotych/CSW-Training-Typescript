import { ChangeEvent } from "react";
import { Rolebox } from "./form-role.styles";

type RoleHandlerProps = {
  role: string;
  setRole: React.Dispatch<React.SetStateAction<string>>;
};

function InputRoles({ setRole, role }: RoleHandlerProps) {
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setRole(e.target.value);
  };

  return (
    <Rolebox>
      <input
        checked={role === ""}
        type="radio"
        name="role"
        value="No role selected"
        onChange={onChangeHandler}
      ></input>
      <label>No role selected</label>
      <div>
        <input
          checked={role === "JE"}
          type="radio"
          name="role"
          value="JE"
          onChange={onChangeHandler}
        ></input>
        <label>JE</label>
      </div>
      <div>
        <input
          checked={role === "PE"}
          type="radio"
          name="role"
          value="PE"
          onChange={onChangeHandler}
        ></input>
        <label>PE</label>
      </div>
      <div>
        <input
          checked={role === "SE"}
          type="radio"
          name="role"
          value="SE"
          onChange={onChangeHandler}
        ></input>
        <label>SE</label>
      </div>{" "}
      <div>
        <input
          checked={role === "TM"}
          type="radio"
          name="role"
          value="TM"
          onChange={onChangeHandler}
        ></input>
        <label>TM</label>
      </div>
    </Rolebox>
  );
}

export default InputRoles;
