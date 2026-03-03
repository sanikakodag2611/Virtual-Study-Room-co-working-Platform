import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import socket from "../services/socket";

function Room() {
  const { roomId } = useParams();
  const navigate = useNavigate();

  const [room, setRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [userName, setUserName] = useState("");
  const [secondsLeft, setSecondsLeft] = useState(1500);

  const messagesEndRef = useRef(null);

  // Get current user & join room
  useEffect(() => {
    fetch("http://localhost:5000/api/auth/me", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.name) {
          setUserName(data.name);
          socket.emit("join-room", { roomId, user: data.name });
        }
      })
      .catch(() => navigate("/login"));
  }, [roomId, navigate]);

  // Socket listeners
  useEffect(() => {
    socket.on("update-room", (updatedRoom) => {
      setRoom(updatedRoom);
      setSecondsLeft(updatedRoom.timer);
    });

    socket.on("timer-tick", (remaining) => {
      setSecondsLeft(remaining);
    });

    socket.on("timer-finished", () => {
      alert("Pomodoro session finished! Great job! 🌟 Take a break.");
    });

    socket.on("receive-message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.emit("leave-room", roomId);
      socket.off("update-room");
      socket.off("timer-tick");
      socket.off("timer-finished");
      socket.off("receive-message");
    };
  }, [roomId]);

  // Auto-scroll chat to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!message.trim() || !userName) return;
    socket.emit("send-message", { roomId, message, user: userName });
    setMessage("");
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  if (!room) return <div style={{ padding: "40px", textAlign: "center" }}>Loading room...</div>;

  return (
    <div style={styles.container}>
      {/* Left Panel */}
      <div style={styles.sidebar}>
        <h2>{room.name}</h2>
        <p style={{ color: "#666" }}>Room ID: {roomId}</p>

        <div style={styles.timerBox}>
          <div style={{
            fontSize: "3.5rem",
            fontWeight: "bold",
            color: secondsLeft <= 300 ? "#e74c3c" : "#2ecc71",
          }}>
            {formatTime(secondsLeft)}
          </div>
          <div style={{ marginTop: "12px", display: "flex", gap: "10px", justifyContent: "center" }}>
            <button style={styles.btn} onClick={() => socket.emit("start-timer", roomId)}>
              Start
            </button>
            <button style={styles.btn} onClick={() => socket.emit("pause-timer", roomId)}>
              Pause
            </button>
            <button style={styles.btn} onClick={() => socket.emit("reset-timer", { roomId })}>
              Reset
            </button>
          </div>
        </div>

        <h3>Participants ({room.participants})</h3>
        <div style={styles.userList}>
          {room.users.map((u) => (
            <div key={u.id} style={styles.userItem}>• {u.name}</div>
          ))}
          {room.users.length === 0 && <p style={{ color: "#aaa" }}>No one here yet...</p>}
        </div>

        <button
          style={{ ...styles.btn, marginTop: "30px", background: "#e74c3c" }}
          onClick={() => navigate("/dashboard")}
        >
          Leave Room
        </button>
      </div>

      {/* Chat Area */}
      <div style={styles.chatArea}>
        <h3>Chat</h3>
        <div style={styles.messagesContainer}>
          {messages.map((msg, i) => (
            <div key={i} style={styles.message}>
              <strong>{msg.user}</strong>
              <span style={styles.time}> {msg.time}</span>
              <div>{msg.message}</div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div style={styles.inputArea}>
          <input
            style={styles.input}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type your message..."
          />
          <button style={styles.sendBtn} onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    background: "#f5f6fa",
  },
  sidebar: {
    width: "320px",
    background: "white",
    padding: "24px",
    borderRight: "1px solid #ddd",
    overflowY: "auto",
  },
  timerBox: {
    textAlign: "center",
    margin: "24px 0",
    padding: "20px",
    background: "#ecf0f1",
    borderRadius: "12px",
  },
  userList: {
    marginTop: "16px",
  },
  userItem: {
    padding: "8px 0",
    borderBottom: "1px solid #eee",
  },
  chatArea: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    padding: "24px",
  },
  messagesContainer: {
    flex: 1,
    overflowY: "auto",
    padding: "16px",
    background: "white",
    borderRadius: "12px",
    marginBottom: "16px",
    border: "1px solid #eee",
  },
  message: {
    marginBottom: "16px",
    padding: "10px 14px",
    background: "#f0f2f5",
    borderRadius: "12px",
    maxWidth: "80%",
  },
  time: {
    fontSize: "0.75rem",
    color: "#999",
    marginLeft: "8px",
  },
  inputArea: {
    display: "flex",
    gap: "10px",
  },
  input: {
    flex: 1,
    padding: "12px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    fontSize: "1rem",
  },
  sendBtn: {
    padding: "12px 24px",
    background: "#3498db",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  btn: {
    padding: "10px 18px",
    background: "#3498db",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default Room;