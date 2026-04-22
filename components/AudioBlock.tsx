"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type TranscriptSegment = {
  time: number;
  text: string;
};

type AudioBlockProps = {
  src: string;
  title?: string;
  transcriptSegments?: TranscriptSegment[] | null;
};

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds)) return "0:00";

  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);

  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export default function AudioBlock({
  src,
  title,
  transcriptSegments,
}: AudioBlockProps) {
  const safeTranscriptSegments = transcriptSegments ?? [];
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration || 0);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      try {
        await audio.play();
      } catch (error) {
        console.error("Audio konnte nicht abgespielt werden:", error);
      }
    } else {
      audio.pause();
    }
  };

  const handleSeek = (value: string) => {
    const audio = audioRef.current;
    if (!audio) return;

    const nextTime = Number(value);
    audio.currentTime = nextTime;
    setCurrentTime(nextTime);
  };

  const jumpToTime = async (time: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = time;
    setCurrentTime(time);

    try {
      await audio.play();
    } catch (error) {
      console.error("Audio konnte nach Sprung nicht abgespielt werden:", error);
    }
  };

  const changePlaybackRate = () => {
    const audio = audioRef.current;
    if (!audio) return;

    const rates = [1, 1.25, 1.5, 2];
    const currentIndex = rates.indexOf(playbackRate);
    const nextRate = rates[(currentIndex + 1) % rates.length];

    audio.playbackRate = nextRate;
    setPlaybackRate(nextRate);
  };

  const progressPercent =
    duration > 0 ? Math.min((currentTime / duration) * 100, 100) : 0;

  const activeSegmentIndex = useMemo(() => {
    if (!safeTranscriptSegments.length) return -1;

    for (let i = 0; i < safeTranscriptSegments.length; i++) {
      const current = safeTranscriptSegments[i];
      const next = safeTranscriptSegments[i + 1];

      if (!next && currentTime >= current.time) return i;
      if (currentTime >= current.time && currentTime < next.time) return i;
    }

    return -1;
  }, [currentTime, safeTranscriptSegments]);

  return (
    <section className="audio-card">
      <audio ref={audioRef} preload="metadata">
        <source src={src} type="audio/mpeg" />
        Dein Browser unterstützt kein Audio.
      </audio>

      <div className="audio-card-top">
        <div className="audio-badge">Audio</div>
        {title && <p className="audio-title">{title}</p>}
      </div>

      <div className="audio-player-shell">
        <div className="audio-player-main">
          <button
            type="button"
            onClick={togglePlay}
            className="audio-play-button"
            aria-label={isPlaying ? "Pause" : "Abspielen"}
          >
            {isPlaying ? "❚❚" : "▶"}
          </button>

          <div className="audio-progress-area">
            <div className="audio-time-row">
              <span>{formatTime(currentTime)}</span>
              <button
                type="button"
                onClick={changePlaybackRate}
                className="audio-speed-button"
              >
                {playbackRate}x
              </button>
              <span>{formatTime(duration)}</span>
            </div>

            <div className="audio-progress-visual">
              <div
                className="audio-progress-fill"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <input
              type="range"
              min={0}
              max={duration || 0}
              step={0.1}
              value={currentTime}
              onChange={(e) => handleSeek(e.target.value)}
              className="audio-range"
              aria-label="Wiedergabeposition"
            />
          </div>
        </div>
      </div>

      {safeTranscriptSegments.length > 0 && (
        <details className="audio-transcript" open>
          <summary>Transkript anzeigen</summary>

          <div className="audio-transcript-list">
            {safeTranscriptSegments.map((segment, index) => (
              <button
                key={index}
                type="button"
                onClick={() => jumpToTime(segment.time)}
                className={`audio-transcript-segment ${index === activeSegmentIndex ? "is-active" : ""
                  }`}
              >
                <span className="audio-transcript-time">
                  {formatTime(segment.time)}
                </span>
                <span className="audio-transcript-text">{segment.text}</span>
              </button>
            ))}
          </div>
        </details>
      )}
    </section>
  );
}