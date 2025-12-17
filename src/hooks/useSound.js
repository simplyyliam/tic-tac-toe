import { useCallback, useRef } from "react";

export default function useSound(soundEnabled = true) {
  const audioContextRef = useRef(null);
  const getAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new window.AudioContext();
    }
    return audioContextRef.current;
  }, []);

  const playTune = useCallback(
    (freq, duration, type = "sine", volume = 0.3) => {
      if (!soundEnabled) return;

      try {
        const ctx = getAudioContext();
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        oscillator.frequency.value = freq;
        oscillator.type = type;

        gainNode.gain.setValueAtTime(volume, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(
          0.01,
          ctx.currentTime + duration
        );

        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + duration);
      } catch (error) {
        console.error("Sound not supported", error);
      }
    },
    [soundEnabled, getAudioContext]
  );

  const playClick = useCallback(() => {
    playTune(600, 0.1, "sine", 0.2);
  }, [playTune]);

  const playMove = useCallback(() => {
    playTune(440, 0.15, "triangle", 0.25);
  }, [playTune]);

  const playWin = useCallback(() => {
    setTimeout(() => {
      playTune(523, 0.2, "sine", 0.3);
    }, 0);
    setTimeout(() => {
      playTune(659, 0.2, "sine", 0.3);
    }, 150);
    setTimeout(() => {
      playTune(784, 0.2, "sine", 0.3);
    }, 300);
  }, [playTune]);

  const playDraw = useCallback(() => {
    playTune(300, 0.3, "sawtooth", 0.2);
  }, [playTune]);

  const playerError = useCallback(() => {
    playTune(200, 0.2, "square", 0.15);
  }, [playTune]);

  return { playClick, playMove, playWin, playDraw, playerError };
}
