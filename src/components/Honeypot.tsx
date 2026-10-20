/** Offscreen rather than display:none so form-filling bots encounter the field. */
export default function Honeypot() {
  return (
    <input
      type="text"
      name="_gotcha"
      tabIndex={-1}
      aria-hidden="true"
      autoComplete="off"
      className="absolute -left-[9999px] w-0 h-0 opacity-0 pointer-events-none"
    />
  )
}
