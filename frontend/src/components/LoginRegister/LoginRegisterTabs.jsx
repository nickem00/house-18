import React from "react";

export default function LoginRegisterTabs({ mode, setMode }) {
  return (
    <section className="login-register-tabs">
      <button
        className={mode === "login" ? "active" : ""}
        onClick={() => setMode("login")}
      >
        Login
      </button>
      <button
        className={mode === "register" ? "active" : ""}
        onClick={() => setMode("register")}
      >
        Register
      </button>
    </section>
  );
}
