// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import socket from "../services/socket";

// function Dashboard() {
//   const navigate = useNavigate();

//   // State for dynamic data
//   const [studyData, setStudyData] = useState({
//     totalStudyHours: 0,
//     activeRooms: 0,
//     completedSessions: 0,
//   });

//   const [rooms, setRooms] = useState([]);

//   // Fetch data on component mount
//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       try {
//         const userResponse = await fetch("http://localhost:5000/api/auth/me", { credentials: "include" });
//         const userData = await userResponse.json();

//         if (!userResponse.ok) {
//           navigate("/login");
//           return;
//         }

//         // Fetch user-specific dashboard data
//         const dashboardResponse = await fetch("http://localhost:5000/api/dashboard", { credentials: "include" });
//         const dashboardData = await dashboardResponse.json();

//         setStudyData({
//           totalStudyHours: dashboardData.totalStudyHours,
//           activeRooms: dashboardData.activeRooms,
//           completedSessions: dashboardData.completedSessions,
//         });

//         setRooms(dashboardData.rooms); // Active rooms fetched dynamically

//       } catch (error) {
//         console.error("Error fetching dashboard data:", error);
//       }
//     };

//     fetchDashboardData();
//   }, [navigate]);

//   return (
//     <div style={styles.container}>
//       {/* SIDEBAR */}
//       <div style={styles.sidebar}>
//         <h2 style={styles.logo}>StudyRoom</h2>

//         <div style={styles.menu}>
//           <button style={styles.menuItem}>Dashboard</button>
//           <button style={styles.menuItem}>Join Room</button>
//           <button style={styles.menuItem}>Create Room</button>
//           <button style={styles.menuItem}>My Sessions</button>
//         </div>

//         <button
//           style={styles.logout}
//           onClick={() => {
//             // Implement logout functionality
//             navigate("/login");
//           }}
//         >
//           Logout
//         </button>
//       </div>

//       {/* MAIN CONTENT */}
//       <div style={styles.main}>
//         <div style={styles.topbar}>
//           <h2>Welcome Back 👋</h2>
//         </div>

//         {/* CARDS */}
//         <div style={styles.cards}>
//           <div style={styles.card}>
//             <h3>Total Study Hours</h3>
//             <p>{studyData.totalStudyHours} hrs</p>
//           </div>

//           <div style={styles.card}>
//             <h3>Active Rooms</h3>
//             <p>{studyData.activeRooms} Rooms</p>
//           </div>

//           <div style={styles.card}>
//             <h3>Completed Sessions</h3>
//             <p>{studyData.completedSessions}</p>
//           </div>
//         </div>

//         {/* ROOMS SECTION */}
//         <div style={styles.roomsSection}>
//           <h3>Active Study Rooms</h3>

//           {rooms.length > 0 ? (
//             rooms.map((room) => (
//               <div style={styles.roomCard} key={room.id}>
//                 <h4>{room.name}</h4>
//                 <p>{room.participants} Participants</p>
//                 <button style={styles.joinBtn}>Join</button>
//               </div>
//             ))
//           ) : (
//             <p>No active rooms right now.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// const styles = {
//   container: {
//     display: "flex",
//     height: "100vh",
//     background: "linear-gradient(135deg,#0f0f14,#1a1026,#2e1065)",
//     color: "white",
//   },

//   sidebar: {
//     width: "250px",
//     background: "#111018",
//     padding: "30px 20px",
//     display: "flex",
//     flexDirection: "column",
//     justifyContent: "space-between",
//   },

//   logo: {
//     textAlign: "center",
//     marginBottom: "30px",
//     color: "#c084fc",
//   },

//   menu: {
//     display: "flex",
//     flexDirection: "column",
//     gap: "15px",
//   },

//   menuItem: {
//     padding: "12px",
//     background: "rgba(255,255,255,0.05)",
//     border: "none",
//     color: "white",
//     borderRadius: "8px",
//     cursor: "pointer",
//     textAlign: "left",
//   },

//   logout: {
//     padding: "12px",
//     background: "linear-gradient(135deg,#9333ea,#a855f7)",
//     border: "none",
//     borderRadius: "8px",
//     color: "white",
//     cursor: "pointer",
//   },

//   main: {
//     flex: 1,
//     padding: "40px",
//     overflowY: "auto",
//   },

//   topbar: {
//     marginBottom: "30px",
//   },

//   cards: {
//     display: "flex",
//     gap: "20px",
//     marginBottom: "40px",
//   },

//   card: {
//     flex: 1,
//     padding: "20px",
//     background: "rgba(255,255,255,0.05)",
//     borderRadius: "15px",
//   },

//   roomsSection: {
//     marginTop: "20px",
//   },

//   roomCard: {
//     background: "rgba(255,255,255,0.05)",
//     padding: "20px",
//     borderRadius: "12px",
//     marginBottom: "15px",
//   },

//   joinBtn: {
//     marginTop: "10px",
//     padding: "8px 15px",
//     border: "none",
//     borderRadius: "6px",
//     background: "#a855f7",
//     color: "white",
//     cursor: "pointer",
//   },
// };

// export default Dashboard;

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import socket from "../services/socket"; // Ensure this is correctly configured

function Dashboard() {
  const navigate = useNavigate();

  // States for dynamic data
  const [user, setUser] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [studyData, setStudyData] = useState({
    totalStudyHours: 0,
    completedSessions: 0,
  });

  // 🔐 Check if user is logged in and fetch user details
  useEffect(() => {
    const checkUser = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/auth/me", {
          credentials: "include",
        });

        if (!response.ok) {
          navigate("/login");
          return;
        }

        const data = await response.json();
        setUser(data);
      } catch (err) {
        console.error("Auth error:", err);
        navigate("/login");
      }
    };

    checkUser();
  }, [navigate]);

  // ⚡ Socket: Get live rooms and listen for new room creation
  useEffect(() => {
    socket.emit("get-rooms");

    socket.on("rooms-list", (roomList) => {
      setRooms(roomList);
    });

    socket.on("room-created", (roomId) => {
      navigate(`/room/${roomId}`);
    });

    return () => {
      socket.off("rooms-list");
      socket.off("room-created");
    };
  }, [navigate]);

  // ➕ Create Room
  const handleCreateRoom = () => {
    socket.emit("create-room");
  };

  // 🚪 Logout
  const handleLogout = async () => {
    await fetch("http://localhost:5000/api/auth/logout", {
      credentials: "include",
    });
    navigate("/login");
  };

  return (
    <div style={styles.container}>
      {/* SIDEBAR */}
      <div style={styles.sidebar}>
        <h2 style={styles.logo}>StudyRoom</h2>

        <div style={styles.menu}>
          <button style={styles.menuItem}>Dashboard</button>
          <button style={styles.menuItem} onClick={handleCreateRoom}>
            Create Room
          </button>
          <button style={styles.menuItem}>My Sessions</button>
        </div>

        <button style={styles.logout} onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* MAIN CONTENT */}
      <div style={styles.main}>
        <div style={styles.topbar}>
          <h2>Welcome Back {user?.name || ""} 👋</h2>
        </div>

        {/* STATS CARDS */}
        <div style={styles.cards}>
          <div style={styles.card}>
            <h3>Total Study Hours</h3>
            <p>{studyData.totalStudyHours} hrs</p>
          </div>

          <div style={styles.card}>
            <h3>Active Rooms</h3>
            <p>{rooms.length}</p>
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
                <button
                  style={styles.joinBtn}
                  onClick={() => navigate(`/room/${room.id}`)}
                >
                  Join Room
                </button>
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
    background: "linear-gradient(135deg, #0f0f14, #1a1026, #2e1065)",
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
    background: "rgba(255, 255, 255, 0.05)",
    border: "none",
    color: "white",
    borderRadius: "8px",
    cursor: "pointer",
    textAlign: "left",
  },

  logout: {
    padding: "12px",
    background: "linear-gradient(135deg, #9333ea, #a855f7)",
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
    background: "rgba(255, 255, 255, 0.05)",
    borderRadius: "15px",
  },

  roomsSection: {
    marginTop: "20px",
  },

  roomCard: {
    background: "rgba(255, 255, 255, 0.05)",
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