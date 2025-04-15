export const INACTIVITY_TIME = 10;
export const DISABLE_TIME = 500;

export const INITIAL_BUTTONS: ButtonItem[] = [
  { id: 1, label: "Button 1", value: 1 },
  { id: 2, label: "Button 2", value: 2 },
  { id: 3, label: "Button 3", value: 3 },
];

export type ButtonItem = {
  id: number;
  label: string;
  value: number;
};
