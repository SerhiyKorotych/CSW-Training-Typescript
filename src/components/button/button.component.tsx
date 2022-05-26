import { ButtonHTMLAttributes } from "react";
import {
  DeleteButton,
  EditButton,
  AddButton,
  CancelButton,
} from "./button.styles";

export type ButtonProps = {
  buttonType?: BUTTON_TYPE_CLASSES;
  children: React.ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export enum BUTTON_TYPE_CLASSES {
  add = "AddButton",
  edit = "EditButton",
  delete = "DeleteButton",
  cancel = "CancelButton",
}

const getButton = (buttonType = BUTTON_TYPE_CLASSES.add): typeof AddButton =>
  ({
    [BUTTON_TYPE_CLASSES.add]: AddButton,
    [BUTTON_TYPE_CLASSES.edit]: EditButton,
    [BUTTON_TYPE_CLASSES.delete]: DeleteButton,
    [BUTTON_TYPE_CLASSES.cancel]: CancelButton,
  }[buttonType]);

const Button = ({ children, buttonType, ...otherProps }: ButtonProps) => {
  const CustomButton = getButton(buttonType);
  return <CustomButton {...otherProps}>{children}</CustomButton>;
};

export default Button;
