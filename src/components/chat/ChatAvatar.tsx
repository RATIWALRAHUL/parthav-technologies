import React from "react";

interface ChatAvatarProps {
  size?: number;
  className?: string;
  isOnline?: boolean;
}

export const ChatAvatar: React.FC<ChatAvatarProps> = ({
  size = 40,
  className = "",
  isOnline = false,
}) => {
  return (
    <div
      className={className}
      style={{
        width: size,
        height: size,
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "50%",
        flexShrink: 0,
      }}
      aria-hidden="true"
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: "100%", height: "100%", overflow: "visible" }}
      >
        <defs>
          <linearGradient id="pt_bot_bg" x1="0" y1="0" x2="44" y2="44" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#EAF4FF" />
            <stop offset="100%" stopColor="#D5E8FD" />
          </linearGradient>
          <linearGradient id="pt_bot_head" x1="12" y1="12" x2="32" y2="34" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#EEF4FC" />
          </linearGradient>
          <linearGradient id="pt_bot_visor" x1="14" y1="18" x2="30" y2="28" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#031B3A" />
            <stop offset="100%" stopColor="#072B55" />
          </linearGradient>
          <filter id="pt_eye_glow" x="0" y="0" width="44" height="44" filterUnits="userSpaceOnUse">
            <feGaussianBlur stdDeviation="0.8" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Circular Outer Base */}
        <circle cx="22" cy="22" r="21" fill="url(#pt_bot_bg)" stroke="#B8D7FA" strokeWidth="1.2" />

        {/* Antenna */}
        <path d="M22 13V8.5" stroke="#FF6A00" strokeWidth="2" strokeLinecap="round" />
        <circle cx="22" cy="7.5" r="2" fill="#FF6A00" />

        {/* Ears / Side audio nodes */}
        <rect x="8" y="19" width="3" height="7" rx="1.5" fill="#062B57" />
        <rect x="33" y="19" width="3" height="7" rx="1.5" fill="#062B57" />

        {/* Robot Head */}
        <rect
          x="10"
          y="13"
          width="24"
          height="19"
          rx="9"
          fill="url(#pt_bot_head)"
          stroke="#062B57"
          strokeWidth="1.4"
        />

        {/* Visor Screen */}
        <rect
          x="13.5"
          y="17"
          width="17"
          height="11"
          rx="5.5"
          fill="url(#pt_bot_visor)"
        />

        {/* Friendly Glowing Eyes */}
        <g filter="url(#pt_eye_glow)">
          <ellipse cx="18" cy="22.5" rx="2" ry="2.2" fill="#38BDF8" />
          <circle cx="18.5" cy="21.8" r="0.6" fill="#FFFFFF" />
          <ellipse cx="26" cy="22.5" rx="2" ry="2.2" fill="#38BDF8" />
          <circle cx="26.5" cy="21.8" r="0.6" fill="#FFFFFF" />
        </g>

        {/* Gentle Visor Gloss Arc */}
        <path
          d="M16 19C18 18.2 24 18.2 28 19"
          stroke="rgba(255,255,255,0.4)"
          strokeWidth="0.8"
          strokeLinecap="round"
        />

        {/* Subtle Neck Accent */}
        <path d="M19 33H25" stroke="#FF6A00" strokeWidth="1.8" strokeLinecap="round" />
      </svg>

      {/* Online Status Dot */}
      {isOnline && (
        <span
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            width: Math.max(9, Math.round(size * 0.24)),
            height: Math.max(9, Math.round(size * 0.24)),
            borderRadius: "50%",
            backgroundColor: "#22C55E",
            border: "2px solid #FFFFFF",
            boxShadow: "0 0 6px rgba(34, 197, 94, 0.6)",
          }}
          aria-hidden="true"
        />
      )}
    </div>
  );
};
