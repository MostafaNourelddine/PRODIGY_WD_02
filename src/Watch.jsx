import { Box, Container, Typography, Button } from "@mui/material";
import React, { useState, useRef } from "react";

export default function Watch() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const intervalRef = useRef(null);

  const startStopwatch = () => {
    if (!isRunning) {
      setIsRunning(true);
      const startTime = Date.now() - time;

      intervalRef.current = setInterval(() => {
        setTime(Date.now() - startTime);
      }, 10);
    }
  };

  const stopStopwatch = () => {
    if (isRunning) {
      clearInterval(intervalRef.current);
      setIsRunning(false);
    }
  };

  const resetStopwatch = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setTime(0);
    setLaps([]);
  };

  const addLap = () => {
    setLaps([...laps, time]);
  };

  const formatTime = (time) => {
    const milliseconds = Math.floor((time % 1000) / 10);
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / 60000) % 60);

    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}:${milliseconds.toString().padStart(2, "0")}`;
  };

  return (
    <Container
      style={{
        textAlign: "center",
        position: "absolute",
        top: "30%",
        left: "50%",
        transform: "translateX(-50%)",
      }}
    >
      <Box
        style={{
          backgroundColor: "#f0f8ff",
          boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
          padding: "20px",
          borderRadius: "10px",
          color: "#333",
        }}
      >
        <Typography variant="h4">Stopwatch</Typography>
        <Typography variant="h5">{formatTime(time)}</Typography>

        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <Button onClick={startStopwatch} disabled={isRunning}>
            Start
          </Button>
          <Button onClick={stopStopwatch} disabled={!isRunning}>
            Stop
          </Button>
          <Button onClick={resetStopwatch}>Reset</Button>
          <Button onClick={addLap} disabled={!isRunning}>
            Lap
          </Button>
        </Box>

        <Box marginTop="20px">
          <Typography variant="h6">Laps</Typography>
          {laps.length === 0 ? (
            <Typography>No laps yet</Typography>
          ) : (
            <ul style={{ listStyleType: "none", padding: 0 }}>
              {laps.map((lap, index) => (
                <li key={index}>
                  <Typography>
                    Lap {index + 1}: {formatTime(lap)}
                  </Typography>
                </li>
              ))}
            </ul>
          )}
        </Box>
      </Box>
    </Container>
  );
}
