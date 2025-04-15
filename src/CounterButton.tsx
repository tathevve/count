import { MouseEvent } from "react";
import { Button } from "@mui/material";
import { ButtonItem } from "./config";

export const CounterButton = ({
  item,
  disabled,
  onClick,
}: {
  item: ButtonItem;
  disabled: boolean;
  onClick: (e: MouseEvent<HTMLButtonElement>, item: ButtonItem) => void;
}) => (
  <Button
    variant="contained"
    onClick={(e) => onClick(e, item)}
    disabled={disabled}
    color={disabled ? "inherit" : "success"}
  >
    {item.label}
  </Button>
);
