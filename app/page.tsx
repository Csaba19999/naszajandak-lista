"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const VOLUME = 0.5;

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [needsUnmute, setNeedsUnmute] = useState(false);

  // Turn the sound on and start the gift over, so nothing is missed.
  const unmute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = false;
    video.volume = VOLUME;
    video.currentTime = 0;
    video.play().catch(() => {});
    setNeedsUnmute(false);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.volume = VOLUME;
    video.muted = false;

    // It has to start on its own. Unmuted autoplay is blocked unless the
    // browser already trusts this site, so fall back to a muted start --
    // that one is always allowed -- and pick the sound up on first contact.
    video.play().catch(() => {
      video.muted = true;
      setNeedsUnmute(true);
      video.play().catch(() => {});
    });
  }, []);

  // Any interaction anywhere counts as the gesture that unlocks audio.
  useEffect(() => {
    if (!needsUnmute) return;

    window.addEventListener("pointerdown", unmute);
    window.addEventListener("keydown", unmute);
    return () => {
      window.removeEventListener("pointerdown", unmute);
      window.removeEventListener("keydown", unmute);
    };
  }, [needsUnmute, unmute]);

  return (
    <main
      style={{
        position: "fixed",
        inset: 0,
        display: "grid",
        placeItems: "center",
        background: "#000",
      }}
    >
      <video
        ref={videoRef}
        src="/naszajandek.mp4"
        playsInline
        autoPlay
        controls
        preload="auto"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
        }}
      />

      {needsUnmute && (
        <button
          onClick={unmute}
          style={{
            position: "absolute",
            top: "1.25rem",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            alignItems: "center",
            gap: "0.6rem",
            padding: "0.7rem 1.25rem",
            borderRadius: "999px",
            border: "1px solid rgba(255, 255, 255, 0.25)",
            background: "rgba(0, 0, 0, 0.65)",
            backdropFilter: "blur(8px)",
            color: "#fff",
            font: "inherit",
            fontSize: "0.95rem",
            letterSpacing: "0.03em",
            cursor: "pointer",
            animation: "pulse 2s ease-in-out infinite",
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff">
            <path d="M4 9v6h4l5 4V5L8 9H4Zm12.5 3a4.5 4.5 0 0 0-2.5-4v8a4.5 4.5 0 0 0 2.5-4Z" />
          </svg>
          Koppints a hangért
        </button>
      )}
    </main>
  );
}
