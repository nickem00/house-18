import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginRegisterTabs from "../components/LoginRegister/LoginRegisterTabs";
import LoginRegisterForm from "../components/LoginRegister/LoginRegisterForm";
import "../styles/home.css";
import "../styles/LoginRegister.css";

export default function LoginRegister() {
  const navigate = useNavigate();
  const [mode, setMode] = useState("login");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    emailOrUsername: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_\-+={}[\]|\\:;"'<>,.?/~`]).{8,}$/;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    setErrors((p) => ({ ...p, [name]: "" }));
  };

  const validate = () => {
    const errs = {};
    
    if (mode === "login") {
      if (!formData.emailOrUsername) {
        errs.emailOrUsername = "Please enter your email or username.";
      }
    } else {
      if (!emailRegex.test(formData.email)) {
        errs.email = "Enter a valid email address.";
      }
      
      if (!formData.username.trim()) {
        errs.username = "Enter a username.";
      }
    }

    if (!formData.password) {
      errs.password = "Enter a password.";
    } else if (mode === "register" && !passwordRegex.test(formData.password)) {
      errs.password =
        "Password must be at least 8 characters long, and include at least one letter, one number, and one special character.";
    }

    if (mode === "register") {
      if (formData.password !== formData.confirmPassword) {
        errs.confirmPassword = "Passwords do not match.";
      }
    }

    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    try {
      const url =
        mode === "login"
          ? `${import.meta.env.VITE_API_BASE_URL}/api/users/login`
          : `${import.meta.env.VITE_API_BASE_URL}/api/users/register`;
      const payload =
        mode === "login"
          ? { emailOrUsername: formData.emailOrUsername, password: formData.password }
          : {
              username: formData.username,
              email: formData.email,
              password: formData.password,
            };

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!res.ok) {
        const msg = data.message || "Something went wrong!";
        const newErrors = {};

        if (msg.toLowerCase().includes("email") || msg.toLowerCase().includes("username")) {
          newErrors[mode === "login" ? "emailOrUsername" : "email"] = msg;
        }
        else if (
          msg.toLowerCase().includes("password") ||
          msg.toLowerCase().includes("credentials")
        ) {
          newErrors.password = msg;
        }
        else {
          newErrors.general = msg;
        }

        setErrors(newErrors);
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("loggedIn", "true");
      navigate("/Profile");
    } catch {
      setErrors({ general: "Could not reach the server!" });
    }
  };

  return (
    <section className="login-register-container">
      <LoginRegisterTabs mode={mode} setMode={setMode} />

      {errors.general && <p className="error-general">{errors.general}</p>}

      <LoginRegisterForm
        mode={mode}
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        errors={errors}
      />
    </section>
  );
}
