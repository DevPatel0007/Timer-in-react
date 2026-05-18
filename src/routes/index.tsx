import { createFileRoute } from '@tanstack/react-router'
import { useState, useRef, useEffect } from 'react';
import { Button } from '../components/ui/button';

export const Route = createFileRoute('/')({ component: Home })

function Home() {
   // =========================
  // Stopwatch State
  // =========================
  const [stopwatchTime, setStopwatchTime] = useState(0);
  const [isStopwatchRunning, setIsStopwatchRunning] = useState(false);

  // =========================
  // Timer State
  // =========================
  const [timerTime, setTimerTime] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Dynamic Inputs
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");

  // Refs
  const stopwatchRef = useRef<NodeJS.Timeout | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // =========================================
  // Stopwatch Logic
  // =========================================
  useEffect(() => {
    if (!isStopwatchRunning) {
      if (stopwatchRef.current) {
        clearInterval(stopwatchRef.current);
        stopwatchRef.current = null;
      }
      return;
    }

    stopwatchRef.current = setInterval(() => {
      setStopwatchTime((prev) => prev + 100);
    }, 100);

    return () => {
      if (stopwatchRef.current) {
        clearInterval(stopwatchRef.current);
        stopwatchRef.current = null;
      }
    };
  }, [isStopwatchRunning]);

  const startStopwatch = () => {
    if (!isStopwatchRunning) {
      setIsStopwatchRunning(true);
    }
  };

  const pauseStopwatch = () => {
    if (isStopwatchRunning) {
      setIsStopwatchRunning(false);
    }
  };

  const resetStopwatch = () => {
    if (stopwatchRef.current) {
      clearInterval(stopwatchRef.current);
      stopwatchRef.current = null;
    }
    setIsStopwatchRunning(false);
    setStopwatchTime(0);
  };

  // =========================================
  // Timer Logic
  // =========================================
  useEffect(() => {
    if (!isTimerRunning) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    if (timerTime <= 0) {
      setIsTimerRunning(false);
      return;
    }

    timerRef.current = setInterval(() => {
      setTimerTime((prev) => {
        if (prev <= 100) {
          setIsTimerRunning(false);
          alert("Timer Finished!");
          return 0;
        }
        return prev - 100;
      });
    }, 100);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isTimerRunning]);

  const startTimer = () => {
    // If timer is paused (has time left), just resume it
    if (timerTime > 0) {
      setIsTimerRunning(true);
      return;
    }

    // If timer is at 0, calculate time from inputs in milliseconds
    const totalMs =
      (Number(hours) || 0) * 3600 * 1000 +
      (Number(minutes) || 0) * 60 * 1000 +
      (Number(seconds) || 0) * 1000;

    if (totalMs === 0) {
      alert("Please set a time for the timer");
      return;
    }

    setTimerTime(totalMs);
    setIsTimerRunning(true);
  };

  const pauseTimer = () => {
    setIsTimerRunning(false);
  };

  const resetTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setIsTimerRunning(false);
    setTimerTime(0);
    setHours("");
    setMinutes("");
    setSeconds("");
  };

  // =========================================
  // Format Function
  // =========================================
  const formatTime = (timeInMs: number) => {
    const totalSeconds = Math.floor(timeInMs / 1000);
    const milliseconds = Math.floor((timeInMs % 1000) / 10); // Get centiseconds (0-99)
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    return `${String(hrs).padStart(2, "0")}:${String(
      mins
    ).padStart(2, "0")}:${String(secs).padStart(2, "0")}.${String(milliseconds).padStart(2, "0")}`;
  };

  return (
    <div className="p-10 space-y-10">
      {/* ================= Stopwatch ================= */}
      <div className="border p-6 rounded-xl">
        <h1 className="text-3xl font-bold mb-4">Stopwatch</h1>

        <div className="text-5xl mb-5">
          {formatTime(stopwatchTime)}
        </div>

        <div className="space-x-3">
          <Button onClick={startStopwatch}>Start</Button>
          <Button onClick={pauseStopwatch}>Pause</Button>
          <Button onClick={resetStopwatch}>Reset</Button>
        </div>
      </div>

      {/* ================= Timer ================= */}
      <div className="border p-6 rounded-xl">
        <h1 className="text-3xl font-bold mb-4">Timer</h1>

        <div className="text-5xl mb-5">
          {formatTime(timerTime)}
        </div>

        {/* Dynamic Inputs */}
        <div className="flex gap-3 mb-5">
          <input
            type="number"
            placeholder="HH"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            className="border p-2"
          />

          <input
            type="number"
            placeholder="MM"
            value={minutes}
            onChange={(e) => setMinutes(e.target.value)}
            className="border p-2"
          />

          <input
            type="number"
            placeholder="SS"
            value={seconds}
            onChange={(e) => setSeconds(e.target.value)}
            className="border p-2"
          />
        </div>

        <div className="space-x-3">
          <Button onClick={startTimer}>Start</Button>
          <Button onClick={pauseTimer}>Pause</Button>
          <Button onClick={resetTimer}>Reset</Button>
        </div>
      </div>
    </div>
  );
}
