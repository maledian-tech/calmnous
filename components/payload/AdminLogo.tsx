/** Replaces the Payload logo on the admin login page. */
export function AdminLogo() {
  return (
    <div style={{ textAlign: "center" }}>
      <span
        style={{
          fontFamily: '"Cormorant Garamond", Georgia, "Times New Roman", serif',
          fontSize: "3rem",
          letterSpacing: "-0.01em",
          color: "var(--theme-text)",
        }}
      >
        Calmnous
      </span>
      <svg
        viewBox="0 0 240 14"
        fill="none"
        aria-hidden
        style={{ display: "block", width: 160, margin: "0.25rem auto 0" }}
      >
        <path
          d="M0 7c20-6 38-6 58 0 24 8 41 9 61 3 34-11 61-13 121 2"
          stroke="#3A8EA1"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
