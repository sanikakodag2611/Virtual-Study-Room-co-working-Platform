import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [focused, setFocused] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    navigate("/dashboard");
  };

  const isActive = (field) =>
    focused === field || form[field] !== "";

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Welcome Back</h2>
        <p style={styles.subtitle}>Sign in to continue</p>

        {/* GOOGLE BUTTON */}
        <div style={styles.socialSection}>
          <button
            type="button"
            style={styles.googleBtn}
            onClick={() =>
              (window.location.href =
                "http://localhost:5000/api/auth/google")
            }
>
            <div style={styles.googleIcon}>G</div>
            Continue with Google
          </button>

          <div style={styles.divider}>
            <span style={styles.line}></span>
            <span style={styles.orText}>OR</span>
            <span style={styles.line}></span>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* EMAIL */}
          <div style={styles.inputGroup}>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              onFocus={() => setFocused("email")}
              onBlur={() => setFocused("")}
              required
              style={{
                ...styles.input,
                borderColor: isActive("email")
                  ? "#a855f7"
                  : "rgba(255,255,255,0.15)",
                boxShadow: isActive("email")
                  ? "0 0 10px rgba(168,85,247,0.4)"
                  : "none",
              }}
            />
            <label
              style={{
                ...styles.label,
                top: isActive("email") ? "-9px" : "14px",
                fontSize: isActive("email") ? "12px" : "14px",
                color: isActive("email")
                  ? "#c084fc"
                  : "rgba(255,255,255,0.6)",
                background: isActive("email")
                  ? "#111018"
                  : "transparent",
                padding: isActive("email")
                  ? "0 6px"
                  : "0",
              }}
            >
              Email Address
            </label>
          </div>

          {/* PASSWORD */}
          <div style={styles.inputGroup}>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              onFocus={() => setFocused("password")}
              onBlur={() => setFocused("")}
              required
              style={{
                ...styles.input,
                borderColor: isActive("password")
                  ? "#a855f7"
                  : "rgba(255,255,255,0.15)",
                boxShadow: isActive("password")
                  ? "0 0 10px rgba(168,85,247,0.4)"
                  : "none",
              }}
            />
            <label
              style={{
                ...styles.label,
                top: isActive("password") ? "-9px" : "14px",
                fontSize: isActive("password")
                  ? "12px"
                  : "14px",
                color: isActive("password")
                  ? "#c084fc"
                  : "rgba(255,255,255,0.6)",
                background: isActive("password")
                  ? "#111018"
                  : "transparent",
                padding: isActive("password")
                  ? "0 6px"
                  : "0",
              }}
            >
              Password
            </label>

            <span
              style={styles.eye}
              onClick={() =>
                setShowPassword(!showPassword)
              }
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>

          <button type="submit" style={styles.button}>
            Login
          </button>
        </form>

        <p style={styles.footer}>
          Don’t have an account?{" "}
          <Link to="/register" style={styles.link}>
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
     background:
      "linear-gradient(135deg,#0f0f14,#1a1026,#2e1065)",
  },

  card: {
    width: "400px",
    padding: "45px",
    borderRadius: "22px",
    background: "#111018",
    boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
    color: "white",
  },

  title: {
    textAlign: "center",
    marginBottom: "8px",
    fontWeight: "600",
  },

  subtitle: {
    textAlign: "center",
    fontSize: "14px",
    marginBottom: "30px",
    opacity: 0.7,
  },

  socialSection: {
    marginBottom: "25px",
  },

  googleBtn: {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid rgba(255,255,255,0.2)",
    background: "rgba(255,255,255,0.05)",
    color: "white",
    fontWeight: "500",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    transition: "0.3s ease",
  },

  googleIcon: {
    width: "22px",
    height: "22px",
    borderRadius: "50%",
    background: "white",
    color: "#ea4335",
    fontWeight: "700",
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  divider: {
    display: "flex",
    alignItems: "center",
    marginTop: "20px",
  },

  line: {
    flex: 1,
    height: "1px",
    background: "rgba(255,255,255,0.15)",
  },

  orText: {
    margin: "0 10px",
    fontSize: "12px",
    opacity: 0.6,
  },

  inputGroup: {
    position: "relative",
    marginBottom: "28px",
  },

  input: {
    width: "100%",
    padding: "14px",
    borderRadius: "10px",
    border: "1px solid rgba(255,255,255,0.15)",
    background: "rgba(255,255,255,0.04)",
    color: "white",
    outline: "none",
    fontSize: "14px",
    transition: "0.3s ease",
  },

  label: {
    position: "absolute",
    left: "14px",
    transition: "0.3s ease",
    pointerEvents: "none",
  },

  eye: {
    position: "absolute",
    right: "14px",
    top: "14px",
    fontSize: "13px",
    cursor: "pointer",
    color: "#c084fc",
  },

  button: {
    width: "100%",
    padding: "13px",
    borderRadius: "10px",
    border: "none",
    background:
      "linear-gradient(135deg,#9333ea,#a855f7)",
    color: "white",
    fontWeight: "600",
    cursor: "pointer",
    marginTop: "10px",
  },

  footer: {
    textAlign: "center",
    marginTop: "20px",
    fontSize: "14px",
  },

  link: {
    color: "#c084fc",
    textDecoration: "none",
  },
};

export default Login;

