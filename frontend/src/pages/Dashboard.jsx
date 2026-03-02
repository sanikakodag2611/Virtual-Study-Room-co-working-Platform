import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  // State for dynamic data
  const [studyData, setStudyData] = useState({
    totalStudyHours: 0,
    activeRooms: 0,
    completedSessions: 0,
  });

  const [rooms, setRooms] = useState([]);

  // Fetch data on component mount
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const userResponse = await fetch("http://localhost:5000/api/auth/me", { credentials: "include" });
        const userData = await userResponse.json();

        if (!userResponse.ok) {
          navigate("/login");
          return;
        }

        // Fetch user-specific dashboard data
        const dashboardResponse = await fetch("http://localhost:5000/api/dashboard", { credentials: "include" });
        const dashboardData = await dashboardResponse.json();

        setStudyData({
          totalStudyHours: dashboardData.totalStudyHours,
          activeRooms: dashboardData.activeRooms,
          completedSessions: dashboardData.completedSessions,
        });

        setRooms(dashboardData.rooms); // Active rooms fetched dynamically

      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, [navigate]);

  return (
    <div style={styles.container}>
      {/* SIDEBAR */}
      <div style={styles.sidebar}>
        <h2 style={styles.logo}>StudyRoom</h2>

        <div style={styles.menu}>
          <button style={styles.menuItem}>Dashboard</button>
          <button style={styles.menuItem}>Join Room</button>
          <button style={styles.menuItem}>Create Room</button>
          <button style={styles.menuItem}>My Sessions</button>
        </div>

        <button
          style={styles.logout}
          onClick={() => {
            // Implement logout functionality
            navigate("/login");
          }}
        >
          Logout
        </button>
      </div>

      {/* MAIN CONTENT */}
      <div style={styles.main}>
        <div style={styles.topbar}>
          <h2>Welcome Back 👋</h2>
        </div>

        {/* CARDS */}
        <div style={styles.cards}>
          <div style={styles.card}>
            <h3>Total Study Hours</h3>
            <p>{studyData.totalStudyHours} hrs</p>
          </div>

          <div style={styles.card}>
            <h3>Active Rooms</h3>
            <p>{studyData.activeRooms} Rooms</p>
          </div>

          <div style={styles.card}>
            <h3>Completed Sessions</h3>
            <p>{studyData.completedSessions}</p>
          </div>
        </div>

        {/* ROOMS SECTION */}
        <div style={styles.roomsSection}>
          <h3>Active Study Rooms</h3>

          {rooms.length > 0 ? (
            rooms.map((room) => (
              <div style={styles.roomCard} key={room.id}>
                <h4>{room.name}</h4>
                <p>{room.participants} Participants</p>
                <button style={styles.joinBtn}>Join</button>
              </div>
            ))
          ) : (
            <p>No active rooms right now.</p>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    background: "linear-gradient(135deg,#0f0f14,#1a1026,#2e1065)",
    color: "white",
  },

  sidebar: {
    width: "250px",
    background: "#111018",
    padding: "30px 20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },

  logo: {
    textAlign: "center",
    marginBottom: "30px",
    color: "#c084fc",
  },

  menu: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },

  menuItem: {
    padding: "12px",
    background: "rgba(255,255,255,0.05)",
    border: "none",
    color: "white",
    borderRadius: "8px",
    cursor: "pointer",
    textAlign: "left",
  },

  logout: {
    padding: "12px",
    background: "linear-gradient(135deg,#9333ea,#a855f7)",
    border: "none",
    borderRadius: "8px",
    color: "white",
    cursor: "pointer",
  },

  main: {
    flex: 1,
    padding: "40px",
    overflowY: "auto",
  },

  topbar: {
    marginBottom: "30px",
  },

  cards: {
    display: "flex",
    gap: "20px",
    marginBottom: "40px",
  },

  card: {
    flex: 1,
    padding: "20px",
    background: "rgba(255,255,255,0.05)",
    borderRadius: "15px",
  },

  roomsSection: {
    marginTop: "20px",
  },

  roomCard: {
    background: "rgba(255,255,255,0.05)",
    padding: "20px",
    borderRadius: "12px",
    marginBottom: "15px",
  },

  joinBtn: {
    marginTop: "10px",
    padding: "8px 15px",
    border: "none",
    borderRadius: "6px",
    background: "#a855f7",
    color: "white",
    cursor: "pointer",
  },
};

export default Dashboard;