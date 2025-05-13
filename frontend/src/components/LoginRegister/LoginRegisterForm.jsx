import React from "react";
import InputField from "./InputField";

export default function LoginRegisterForm({
  mode,
  formData,
  onChange,
  onSubmit,
  errors,
}) {
  return (
    <form className="login-register-form" onSubmit={onSubmit} noValidate>
      <div className={`fields login-fields ${mode === "login" ? "show" : "hide"}`}>
        <InputField
          label="Email or Username"
          name="emailOrUsername"
          value={formData.emailOrUsername || ""}
          onChange={onChange}
          placeholder="Enter your email or username"
        />
        {errors.emailOrUsername && <p className="error">{errors.emailOrUsername}</p>}

        <InputField
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={onChange}
        />
        {errors.password && <p className="error">{errors.password}</p>}
      </div>

      <div className={`fields register-fields ${mode === "register" ? "show" : "hide"}`}>
        <InputField
          label="Username"
          name="username"
          value={formData.username}
          onChange={onChange}
        />
        {errors.username && <p className="error">{errors.username}</p>}

        <InputField
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={onChange}
        />
        {errors.email && <p className="error">{errors.email}</p>}

        <InputField
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={onChange}
        />
        {errors.password && <p className="error">{errors.password}</p>}

        <InputField
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={onChange}
        />
        {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
      </div>

      <button type="submit">
        {mode === "login" ? "Login" : "Register"}
      </button>
    </form>
  );
}
