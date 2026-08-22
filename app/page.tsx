"use client";

import { useCallback, useRef, useState } from "react";

// Fill these in -- they sell the cover story.
const COUPLE = "Dóri & Levi";
const WEDDING_DATE = "2026. augusztus 29.";

const VOLUME = 0.5;
const FADE_MS = 700;
const HINT_MS = 6000; // how long the volume notice rides over the video

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [opened, setOpened] = useState(false);
  const [gateGone, setGateGone] = useState(false);
  const [hintGone, setHintGone] = useState(false);

  // This runs inside a real click, which is exactly the gesture browsers ask
  // for before they let anything play out loud. So the punchline lands with
  // sound from the very first frame -- no muted head, no missed music.
  const open = useCallback(() => {
    if (opened) return;
    setOpened(true);
    window.setTimeout(() => setGateGone(true), FADE_MS);
    window.setTimeout(() => setHintGone(true), HINT_MS);

    const video = videoRef.current;
    if (!video) return;

    video.muted = false;
    video.volume = VOLUME;
    video.currentTime = 0;
    video.play().catch(() => {
      // Should not happen after a click, but if a browser refuses anyway,
      // at least let the picture roll.
      video.muted = true;
      video.play().catch(() => {});
    });
  }, [opened]);

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
        controls={opened}
        preload="auto"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          opacity: opened ? 1 : 0,
          transition: `opacity ${FADE_MS}ms ease`,
        }}
      />

      {/* Rides over the video once it is running, then takes itself away.
          Deliberately not on the cover -- nothing there may hint at a video. */}
      {opened && !hintGone && (
        <span
          style={{
            position: "absolute",
            top: "1.5rem",
            left: "50%",
            transform: "translateX(-50%)",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.55rem",
            padding: "0.6rem 1.15rem",
            borderRadius: "999px",
            border: "1px solid rgba(226, 176, 106, 0.28)",
            background: "rgba(20, 14, 9, 0.78)",
            backdropFilter: "blur(8px)",
            fontSize: "clamp(0.8rem, 2.4vw, 0.9rem)",
            letterSpacing: "0.02em",
            color: "rgba(242, 217, 176, 0.95)",
            whiteSpace: "nowrap",
            pointerEvents: "none",
            animation: `video-notice ${HINT_MS}ms ease both`,
          }}
        >
          <svg
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="currentColor"
            style={{ flexShrink: 0 }}
          >
            <path d="M4 9v6h4l5 4V5L8 9H4Zm12.5 3a4.5 4.5 0 0 0-2.5-4v8a4.5 4.5 0 0 0 2.5-4Zm-2.5-9v2.1c2.9.9 5 3.6 5 6.9s-2.1 6-5 6.9V21c4-1 7-4.6 7-9s-3-8-7-9Z" />
          </svg>
          Tekerd fel a készüléked hangerejét!
        </span>
      )}

      {!gateGone && (
        <button
          onClick={open}
          aria-label="Nászajándék lista megnyitása"
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "1.35rem",
            padding: "2rem",
            border: "none",
            background:
              "radial-gradient(120% 90% at 50% 40%, #241a12 0%, #0b0906 55%, #000 100%)",
            color: "#fff",
            font: "inherit",
            textAlign: "center",
            cursor: "pointer",
            opacity: opened ? 0 : 1,
            pointerEvents: opened ? "none" : "auto",
            transition: `opacity ${FADE_MS}ms ease`,
          }}
        >
          {/* Gift box, with a warm glow breathing behind it. */}
          <span
            style={{
              position: "relative",
              display: "grid",
              placeItems: "center",
              width: "6rem",
              height: "6rem",
              animation: "gate-rise 900ms cubic-bezier(.2,.7,.2,1) both",
            }}
          >
            <span
              aria-hidden
              style={{
                position: "absolute",
                inset: "-45%",
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(226, 176, 106, 0.34) 0%, rgba(226, 176, 106, 0) 68%)",
                animation: "gate-glow 4s ease-in-out infinite",
              }}
            />
            <svg
              width="60"
              height="60"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#e2b06a"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                position: "relative",
                animation: "gate-nudge 5s ease-in-out infinite",
              }}
            >
              <rect x="3" y="8.2" width="18" height="4" rx="1" />
              <path d="M5.2 12.2v8a.8.8 0 0 0 .8.8h12a.8.8 0 0 0 .8-.8v-8" />
              <path d="M12 8.2V21" />
              <path d="M12 8.2S10.9 4.2 8.7 4.2a2 2 0 1 0 0 4H12Z" />
              <path d="M12 8.2s1.1-4 3.3-4a2 2 0 1 1 0 4H12Z" />
            </svg>
          </span>

          <span
            style={{
              display: "block",
              fontSize: "clamp(0.68rem, 2.2vw, 0.78rem)",
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: "rgba(226, 176, 106, 0.85)",
              animation: "gate-rise 900ms cubic-bezier(.2,.7,.2,1) 100ms both",
            }}
          >
            {COUPLE} &middot; {WEDDING_DATE}
          </span>

          <span
            style={{
              display: "block",
              fontFamily: "Georgia, 'Times New Roman', serif",
              fontSize: "clamp(2rem, 7vw, 3.25rem)",
              fontWeight: 400,
              lineHeight: 1.15,
              letterSpacing: "0.01em",
              animation: "gate-rise 900ms cubic-bezier(.2,.7,.2,1) 200ms both",
            }}
          >
            Nászajándék lista
          </span>

          <span
            style={{
              display: "block",
              maxWidth: "31rem",
              fontSize: "clamp(0.95rem, 2.6vw, 1.1rem)",
              lineHeight: 1.7,
              color: "rgba(255, 255, 255, 0.7)",
              animation: "gate-rise 900ms cubic-bezier(.2,.7,.2,1) 300ms both",
            }}
          >
            Kedves Vendégeink! Sokan kérdeztétek, minek örülnénk igazán a nagy
            napon. Összeírtuk nektek egy listába, hogy senkinek ne kelljen
            találgatnia.
          </span>

          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.7rem",
              marginTop: "0.4rem",
              padding: "0.85rem 2.1rem",
              borderRadius: "999px",
              border: "1px solid rgba(226, 176, 106, 0.45)",
              background: "rgba(226, 176, 106, 0.12)",
              fontSize: "clamp(1rem, 2.8vw, 1.1rem)",
              letterSpacing: "0.02em",
              color: "#f2d9b0",
              animation: "gate-rise 900ms cubic-bezier(.2,.7,.2,1) 400ms both",
            }}
          >
            Lista megtekintése
            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </span>

          <span
            style={{
              display: "block",
              marginTop: "0.3rem",
              fontSize: "0.8rem",
              letterSpacing: "0.06em",
              color: "rgba(255, 255, 255, 0.32)",
              animation: "gate-rise 900ms cubic-bezier(.2,.7,.2,1) 500ms both",
            }}
          >
            12 tétel &middot; utoljára frissítve: ma
          </span>
        </button>
      )}
    </main>
  );
}
