export default function NotFound() {
  return (
    <div
      style={{
        height: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "#1976d2",
        fontFamily: "sans-serif",
      }}
    >
      <h1
        style={{
          fontSize: "100px",
          margin: 0,
          fontWeight: "800",
          letterSpacing: "4px",
          animation: "pulse 1.6s infinite",
        }}
      >
        404
      </h1>

      <p
        style={{
          fontSize: "30px",
          marginTop: "20px",
          fontWeight: "500",
        }}
      >
        Page Not Found
      </p>

      <style>
        {`
          @keyframes pulse {
            0% { transform: scale(1); opacity: 0.9; }
            50% { transform: scale(1.08); opacity: 1; }
            100% { transform: scale(1); opacity: 0.9; }
          }
        `}
      </style>
    </div>
  );
}
