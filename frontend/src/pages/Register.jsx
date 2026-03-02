// import { useState } from "react";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";

// function Register() {
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   const [focused, setFocused] = useState("");
//   const [showPassword, setShowPassword] = useState(false);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//       e.preventDefault();

//       try {
//         const res = await axios.post(
//           "http://localhost:5000/api/auth/register",
//           {
//             name: form.name,
//             email: form.email,
//             password: form.password,
//           }
//         );

//         alert(res.data.message);

//         // Optional: redirect to login after register
//         navigate("/");

//       } catch (error) {
//         alert(error.response?.data?.message || "Something went wrong");
//       }
//     };

//   const isActive = (field) =>
//     focused === field || form[field] !== "";

//   return (
//     <div style={styles.container}>
//       <div style={styles.card}>
//         <h2 style={styles.title}>Create Account</h2>
//         <p style={styles.subtitle}>Start your journey with us</p>

//         <form onSubmit={handleSubmit}>
//           {/* Name */}
//           <div style={styles.inputGroup}>
//             <input
//               type="text"
//               name="name"
//               value={form.name}
//               onChange={handleChange}
//               onFocus={() => setFocused("name")}
//               onBlur={() => setFocused("")}
//               required
//               style={{
//                 ...styles.input,
//                 borderColor: isActive("name")
//                   ? "#a855f7"
//                   : "rgba(255,255,255,0.15)",
//                 boxShadow: isActive("name")
//                   ? "0 0 12px rgba(168,85,247,0.4)"
//                   : "none",
//               }}
//             />
//             <label
//               style={{
//                 ...styles.label,
//                 top: isActive("name") ? "-9px" : "14px",
//                 fontSize: isActive("name") ? "12px" : "14px",
//                 color: isActive("name")
//                   ? "#c084fc"
//                   : "rgba(255,255,255,0.6)",
//                 background: isActive("name")
//                   ? "#111018"
//                   : "transparent",
//                 padding: isActive("name")
//                   ? "0 6px"
//                   : "0",
//               }}
//             >
//               Full Name
//             </label>
//           </div>

//           {/* Email */}
//           <div style={styles.inputGroup}>
//             <input
//               type="email"
//               name="email"
//               value={form.email}
//               onChange={handleChange}
//               onFocus={() => setFocused("email")}
//               onBlur={() => setFocused("")}
//               required
//               style={{
//                 ...styles.input,
//                 borderColor: isActive("email")
//                   ? "#a855f7"
//                   : "rgba(255,255,255,0.15)",
//                 boxShadow: isActive("email")
//                   ? "0 0 12px rgba(168,85,247,0.4)"
//                   : "none",
//               }}
//             />
//             <label
//               style={{
//                 ...styles.label,
//                 top: isActive("email") ? "-9px" : "14px",
//                 fontSize: isActive("email") ? "12px" : "14px",
//                 color: isActive("email")
//                   ? "#c084fc"
//                   : "rgba(255,255,255,0.6)",
//                 background: isActive("email")
//                   ? "#111018"
//                   : "transparent",
//                 padding: isActive("email")
//                   ? "0 6px"
//                   : "0",
//               }}
//             >
//               Email Address
//             </label>
//           </div>

//           {/* Password */}
//           <div style={styles.inputGroup}>
//             <input
//               type={showPassword ? "text" : "password"}
//               name="password"
//               value={form.password}
//               onChange={handleChange}
//               onFocus={() => setFocused("password")}
//               onBlur={() => setFocused("")}
//               required
//               style={{
//                 ...styles.input,
//                 borderColor: isActive("password")
//                   ? "#a855f7"
//                   : "rgba(255,255,255,0.15)",
//                 boxShadow: isActive("password")
//                   ? "0 0 12px rgba(168,85,247,0.4)"
//                   : "none",
//               }}
//             />
//             <label
//               style={{
//                 ...styles.label,
//                 top: isActive("password") ? "-9px" : "14px",
//                 fontSize: isActive("password")
//                   ? "12px"
//                   : "14px",
//                 color: isActive("password")
//                   ? "#c084fc"
//                   : "rgba(255,255,255,0.6)",
//                 background: isActive("password")
//                   ? "#111018"
//                   : "transparent",
//                 padding: isActive("password")
//                   ? "0 6px"
//                   : "0",
//               }}
//             >
//               Password
//             </label>

//             <span
//               onClick={() =>
//                 setShowPassword(!showPassword)
//               }
//               style={styles.eye}
//             >
//               {showPassword ? "Hide" : "Show"}
//             </span>
//           </div>

//           <button type="submit" style={styles.button}>
//             Register
//           </button>
//         </form>

//         <p style={styles.footer}>
//           Already have an account?{" "}
//           <Link to="/" style={styles.link}>
//             Login
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }

// const styles = {
//   container: {
//     height: "100vh",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     background:
//       "linear-gradient(135deg,#0f0f14,#1a1026,#2e1065)",
//   },

//   card: {
//     width: "400px",
//     padding: "45px",
//     borderRadius: "22px",
//     background: "#111018",
//     boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
//     color: "white",
//   },

//   title: {
//     textAlign: "center",
//     marginBottom: "8px",
//     fontWeight: "600",
//     color: "#ffffff",
//   },

//   subtitle: {
//     textAlign: "center",
//     fontSize: "14px",
//     marginBottom: "35px",
//     opacity: 0.7,
//   },

//   inputGroup: {
//     position: "relative",
//     marginBottom: "28px",
//   },

//   input: {
//     width: "100%",
//     padding: "14px",
//     borderRadius: "10px",
//     border: "1px solid rgba(255,255,255,0.15)",
//     background: "rgba(255,255,255,0.04)",
//     color: "white",
//     outline: "none",
//     fontSize: "14px",
//     transition: "0.3s ease",
//   },

//   label: {
//     position: "absolute",
//     left: "14px",
//     transition: "0.3s ease",
//     pointerEvents: "none",
//   },

//   eye: {
//     position: "absolute",
//     right: "14px",
//     top: "14px",
//     fontSize: "13px",
//     cursor: "pointer",
//     color: "#c084fc",
//   },

//   button: {
//     width: "100%",
//     padding: "13px",
//     borderRadius: "10px",
//     border: "none",
//     background:
//       "linear-gradient(135deg,#9333ea,#a855f7)",
//     color: "white",
//     fontWeight: "600",
//     cursor: "pointer",
//     transition: "0.3s",
//   },

//   footer: {
//     textAlign: "center",
//     marginTop: "20px",
//     fontSize: "14px",
//   },

//   link: {
//     color: "#c084fc",
//     textDecoration: "none",
//   },
// };

// export default Register;

import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [focused, setFocused] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        form
      );

      alert(res.data.message);
      navigate("/"); // Redirect to login

    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const isActive = (field) =>
    focused === field || form[field] !== "";

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create Account</h2>
        <p style={styles.subtitle}>Start your journey with us</p>

        <form onSubmit={handleSubmit}>

          {/* Name */}
          <div style={styles.inputGroup}>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              onFocus={() => setFocused("name")}
              onBlur={() => setFocused("")}
              required
              style={{
                ...styles.input,
                ...(isActive("name") && styles.activeInput),
              }}
            />
            <label
              style={{
                ...styles.label,
                ...(isActive("name") && styles.activeLabel),
              }}
            >
              Full Name
            </label>
          </div>

          {/* Email */}
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
                ...(isActive("email") && styles.activeInput),
              }}
            />
            <label
              style={{
                ...styles.label,
                ...(isActive("email") && styles.activeLabel),
              }}
            >
              Email Address
            </label>
          </div>

          {/* Password */}
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
                ...(isActive("password") && styles.activeInput),
              }}
            />
            <label
              style={{
                ...styles.label,
                ...(isActive("password") && styles.activeLabel),
              }}
            >
              Password
            </label>

            <span
              onClick={() => setShowPassword(!showPassword)}
              style={styles.eye}
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>

          <button type="submit" style={styles.button}>
            {loading ? "Please wait..." : "Register"}
          </button>
        </form>

        <p style={styles.footer}>
          Already have an account?{" "}
          <Link to="/" style={styles.link}>
            Login
          </Link>
        </p>
         
          <div style={styles.socialSection}>
             <div style={styles.divider}>
                <span style={styles.line}></span>
                <span style={styles.orText}>OR</span>
                <span style={styles.line}></span>
          </div>
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

        
        </div>
      </div>
      
    </div>
  );
}

const styles = {
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
    marginBottom: "35px",
    opacity: 0.7,
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

  activeInput: {
    borderColor: "#a855f7",
    boxShadow: "0 0 12px rgba(168,85,247,0.4)",
  },

  label: {
    position: "absolute",
    left: "14px",
    top: "14px",
    transition: "0.3s ease",
    pointerEvents: "none",
    color: "rgba(255,255,255,0.6)",
  },

  activeLabel: {
    top: "-9px",
    fontSize: "12px",
    color: "#c084fc",
    background: "#111018",
    padding: "0 6px",
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
    transition: "0.3s",
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

export default Register;