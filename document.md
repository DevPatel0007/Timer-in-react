# Timer in React Documentation

## Overview

This React app is a simple timer and stopwatch utility built with Vite, TypeScript, Tailwind CSS, and TanStack Router.

- Entry route: `src/routes/index.tsx`
- Utility functions: `src/lib/utils.ts`
- Reusable UI button: `src/components/ui/button.tsx`

---

## `src/routes/index.tsx`

### Exported route

- `export const Route = createFileRoute('/')({ component: Home })`

This registers the root route and renders the `Home` component for `/`.

### `Home` component

This component contains both stopwatch and timer functionality.

#### State variables

- `stopwatchTime: number` — elapsed stopwatch time in milliseconds.
- `isStopwatchRunning: boolean` — whether the stopwatch is currently running.
- `timerTime: number` — remaining countdown time in milliseconds.
- `isTimerRunning: boolean` — whether the timer countdown is active.
- `alarmType: 'Beep' | 'Melody'` — selected alarm sound type.
- `alarmPlaying: boolean` — whether the alarm sound is currently playing.
- `hours`, `minutes`, `seconds: string` — user input values for timer duration.

#### Refs

- `stopwatchRef` — holds the interval ID for the stopwatch.
- `timerRef` — holds the interval ID for the timer countdown.
- `alarmIntervalRef` — holds the interval ID used to repeat alarm playback.

#### Effects

- `useEffect(() => { ... }, [isStopwatchRunning])`
  - Starts or stops the stopwatch interval.
  - Updates `stopwatchTime` every 100ms.

- `useEffect(() => { ... }, [alarmPlaying, playAlarm])`
  - Plays the selected alarm sound immediately when `alarmPlaying` becomes true.
  - Starts a repeated interval so the alarm sound loops until stopped.

- `useEffect(() => { ... }, [isTimerRunning, playAlarm])`
  - Starts or stops the timer countdown interval.
  - Reduces `timerTime` every 100ms.
  - Triggers the alarm when time reaches zero.

#### Functions

- `startStopwatch()`
  - Begins stopwatch counting by setting `isStopwatchRunning` to `true`.

- `pauseStopwatch()`
  - Stops the stopwatch without resetting the elapsed time.

- `resetStopwatch()`
  - Clears the stopwatch interval, stops running, and resets `stopwatchTime` to `0`.

- `playAlarm()`
  - Creates an `AudioContext` and plays a tone.
  - Uses a square wave for `Beep` and a short melody for `Melody`.
  - This is memoized via `useCallback` and depends on `alarmType`.

- `stopAlarm()`
  - Stops the repeating alarm playback and clears the alarm interval.

- `startTimer()`
  - Stops any currently playing alarm.
  - If a countdown is already active, resumes it.
  - Otherwise, converts `hours`, `minutes`, and `seconds` into milliseconds and starts the timer.
  - Shows an alert if the timer duration is zero.

- `pauseTimer()`
  - Pauses the timer countdown by setting `isTimerRunning` to `false`.

- `resetTimer()`
  - Stops the timer interval and clears timer state.
  - Resets `timerTime`, `hours`, `minutes`, and `seconds`.

- `formatTime(timeInMs: number): string`
  - Converts milliseconds into a formatted string: `HH:MM:SS.cc`.
  - Uses centiseconds for the final two digits.

---

## `src/lib/utils.ts`

### `cn(...inputs: ClassValue[])`

- Utility function for combining CSS class names.
- Uses `clsx` to conditionally join class names.
- Uses `twMerge` to merge Tailwind CSS class names and remove duplicates.

Example usage:

```ts
import { cn } from '~/lib/utils'

const className = cn('px-4 py-2', isActive && 'bg-blue-500', 'rounded')
```

---

## Notes

- Alarm playback uses the Web Audio API, so the sound runs only in browsers that support `AudioContext`.
- The timer and stopwatch update every 100ms, which provides a centisecond-level display.
- This app is currently a single-page root route with no additional navigation.
