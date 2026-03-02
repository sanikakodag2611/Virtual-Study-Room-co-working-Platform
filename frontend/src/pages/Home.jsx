import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  // 🔐 Check if user already logged in
  useEffect(() => {
    const checkUser = async () => {
      const res = await fetch(
        "http://localhost:5000/api/auth/me",
        { credentials: "include" }
      );

      if (res.ok) {
        navigate("/dashboard");
      }
    };

    checkUser();
  }, [navigate]);

  return (
    <div style={styles.container}>

      {/* Navbar */}
      <nav style={styles.navbar}>
        <h2 style={styles.logo}>Virtual Study Room</h2>
        <div>
          <button
            style={styles.navBtn}
            onClick={() => navigate("/login")}
          >
            Login
          </button>
          <button
            style={styles.navBtnPrimary}
            onClick={() => navigate("/register")}
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div style={styles.hero}>
        <h1 style={styles.title}>
          Study Together. Stay Focused.
        </h1>
        <p style={styles.subtitle}>
          Join virtual rooms, track progress, and boost productivity with friends.
        </p>

        <button
          style={styles.cta}
          onClick={() => navigate("/register")}
        >
          Start Studying Now 🚀
        </button>
      </div>

      {/* Features Section */}
      <div style={styles.features}>
        <div style={styles.featureCard}>
          ⏱ Focus Timer
        </div>

        <div style={styles.featureCard}>
          👥 Study Rooms
        </div>

        <div style={styles.featureCard}>
          💬 Live Chat
        </div>
      </div>

    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background:
      "linear-gradient(135deg,#0f0f14,#1a1026,#2e1065)",
    color: "white",
    paddingBottom: "60px",
  },

  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 60px",
  },

  logo: {
    color: "#c084fc",
  },

  navBtn: {
    marginRight: "15px",
    padding: "8px 16px",
    borderRadius: "8px",
    border: "1px solid rgba(255,255,255,0.2)",
    background: "transparent",
    color: "white",
    cursor: "pointer",
  },

  navBtnPrimary: {
    padding: "8px 16px",
    borderRadius: "8px",
    border: "none",
    background:
      "linear-gradient(135deg,#9333ea,#a855f7)",
    color: "white",
    cursor: "pointer",
  },

  hero: {
    textAlign: "center",
    marginTop: "100px",
    padding: "0 20px",
  },

  title: {
    fontSize: "42px",
    marginBottom: "20px",
  },

  subtitle: {
    fontSize: "18px",
    opacity: 0.8,
    marginBottom: "30px",
  },

  cta: {
    padding: "14px 30px",
    fontSize: "16px",
    borderRadius: "10px",
    border: "none",
    background:
      "linear-gradient(135deg,#9333ea,#a855f7)",
    color: "white",
    cursor: "pointer",
  },

  features: {
    display: "flex",
    justifyContent: "center",
    gap: "30px",
    marginTop: "120px",
    flexWrap: "wrap",
  },

  featureCard: {
    width: "200px",
    padding: "25px",
    borderRadius: "16px",
    background: "rgba(255,255,255,0.05)",
    textAlign: "center",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(168,85,247,0.2)",
    fontSize: "16px",
  },
};

export default Home;