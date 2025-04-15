import { useEffect, useState, useRef } from "react";
import { CounterButton } from "./CounterButton";
import { Container, Typography, Button } from "@mui/material";
import {
  ButtonItem,
  DISABLE_TIME,
  INACTIVITY_TIME,
  INITIAL_BUTTONS,
} from "./config";
import "./App.css";

function App() {
  const [counter, setCounter] = useState<number>(0);
  const [disabledButton, setDisabledButton] = useState<number | null>(0);
  const [buttons, setButtons] = useState<ButtonItem[]>(INITIAL_BUTTONS);

  const [inactivitySeconds, setInactivitySeconds] = useState<number>(0);
  const [isToggled, setIsToggled] = useState<boolean>(false);

  const inactivityTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const decreaseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimers = () => {
    if (inactivityTimer.current) clearInterval(inactivityTimer.current);
    if (decreaseTimer.current) clearInterval(decreaseTimer.current);
  };

  const resetInactivity = () => {
    clearTimers();
    setInactivitySeconds(0);

    inactivityTimer.current = setInterval(() => {
      setInactivitySeconds((prev) => prev + 1);
    }, 1000);
  };

  const startDecreasing = () => {
    decreaseTimer.current = setInterval(() => {
      setCounter((prev) => {
        if (prev > 0) return prev - 1;
        if (decreaseTimer.current) clearInterval(decreaseTimer.current);
        return 0;
      });
    }, 1000);
  };

  const handleButtonClick = (item: ButtonItem) => {
    setCounter((prev) => prev + item.value);
    setDisabledButton(item.id);

    if (!isToggled) setIsToggled(true);
    resetInactivity();

    setTimeout(() => {
      setDisabledButton(null);
    }, item.value * DISABLE_TIME);
  };

  const handleAddButton = () => {
    const newButton: ButtonItem = {
      id: buttons.length + 1,
      label: `Button ${buttons.length + 1}`,
      value: buttons.length + 1,
    };
    setButtons((prev) => [...prev, newButton]);
  };

  useEffect(() => {
    if (inactivitySeconds === INACTIVITY_TIME) {
      clearTimers();
      startDecreasing();
    }
  }, [inactivitySeconds]);

  return (
    <Container maxWidth="sm" className="container">
      <Typography variant="h4" gutterBottom>
        Counter: {counter}
      </Typography>

      <Typography variant="subtitle1" gutterBottom>
        Inactive: {inactivitySeconds} sec
      </Typography>

      <div className="button-group">
        {buttons.map((button) => (
          <CounterButton
            key={button.id}
            item={button}
            disabled={button.id === disabledButton}
            onClick={() => handleButtonClick(button)}
          />
        ))}
      </div>

      <Button variant="contained" color="primary" onClick={handleAddButton}>
        Add New Button
      </Button>
    </Container>
  );
}

export default App;
