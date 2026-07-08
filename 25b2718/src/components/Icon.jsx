const paths = {
  heart: "M12 21s-7.5-4.6-10-9.1C.5 8.4 2 5 5.4 5c2 0 3.4 1.1 4.6 2.7C11.2 6.1 12.6 5 14.6 5 18 5 19.5 8.4 22 11.9 19.5 16.4 12 21 12 21z",
  bone: "M6 6a2.5 2.5 0 1 1 3.5 2.3l5 5A2.5 2.5 0 1 1 17.7 16l-5-5A2.5 2.5 0 1 1 6 6zM3 21l4-4M17 7l4-4",
  brain: "M9.5 3a3.5 3.5 0 0 0-3.4 4.3A3 3 0 0 0 5 13a3 3 0 0 0 2 5 3 3 0 0 0 5.5 1.7A3.5 3.5 0 0 0 16 17V6.5A3.5 3.5 0 0 0 9.5 3z",
  baby: "M9 12c0 1.1.9 2 2 2s2-.9 2-2M8 8h.01M16 8h.01M12 3a7 7 0 0 0-7 7v3a7 7 0 0 0 14 0v-3a7 7 0 0 0-7-7z",
  sparkles: "M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3zM19 15l.7 2.3L22 18l-2.3.7L19 21l-.7-2.3L16 18l2.3-.7L19 15z",
  flower: "M12 8a4 4 0 1 1 4 4 4 4 0 1 1-4 4 4 4 0 1 1-4-4 4 4 0 1 1 4-4z",
  scalpel: "M4 20L15 9M15 9l5-5M15 9l2 2M9 14l2 2",
  activity: "M3 12h4l2-7 4 14 2-7h6",
  stethoscope: "M6 3v6a4 4 0 0 0 8 0V3M10 13v2a5 5 0 0 0 10 0v-2M20 13a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
  calendar: "M8 3v3M16 3v3M4 9h16M5 6h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1z",
  search: "M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM21 21l-4.3-4.3",
  mail: "M4 6h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1zM3 7l9 6 9-6",
  phone: "M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z",
  location: "M12 21s7-6.6 7-12a7 7 0 1 0-14 0c0 5.4 7 12 7 12zM12 11.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z",
  clock: "M12 8v4l3 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z",
  shield: "M12 3l8 3v6c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V6l8-3z",
  users: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8",
  award: "M12 15a6 6 0 1 0 0-12 6 6 0 0 0 0 12zM8.2 13.5L7 22l5-3 5 3-1.2-8.5",
};

export default function Icon({ name, className = "h-6 w-6" }) {
  const d = paths[name] || paths.stethoscope;
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className={className}>
      <path d={d} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
