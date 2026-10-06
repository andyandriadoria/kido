const paths = {
  home: <><path d="m3 10 9-7 9 7"/><path d="M5 9v11h14V9M9 20v-6h6v6"/></>,
  habits: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
  today: <><path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z"/><path d="m19 16 .9 2.1L22 19l-2.1.9L19 22l-.9-2.1L16 19l2.1-.9L19 16Z"/></>,
  journey: <><path d="M4 19c4-8 7-8 10-4s5 3 6-4"/><circle cx="4" cy="19" r="1"/><circle cx="20" cy="11" r="1"/></>,
  back: <><path d="m15 18-6-6 6-6"/></>,
  check: <><path d="m5 12 4 4L19 6"/></>,
  plus: <><path d="M12 5v14M5 12h14"/></>,
  spark: <><path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z"/><path d="m19 16 .9 2.1L22 19l-2.1.9L19 22l-.9-2.1L16 19l2.1-.9L19 16Z"/></>,
  arrow: <><path d="M5 12h14M13 6l6 6-6 6"/></>,
  close: <><path d="m6 6 12 12M18 6 6 18"/></>,
  cup: <><path d="M4 8h13v8a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V8Zm13 2h2a2 2 0 0 1 0 4h-2M7 4c-1 1 1 2 0 3m5-3c-1 1 1 2 0 3"/></>,
}

export default function Icon({ name, size = 20, strokeWidth = 1.8 }) {
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">{paths[name] || paths.spark}</svg>
}
