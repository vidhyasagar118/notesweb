import { useState, useEffect } from "react";
import API from "../api";
import "./globalAI.css";
import ReactMarkdown from "react-markdown";

function GlobalAI({ currentPDF }) {
  const [showIntroMsg, setShowIntroMsg] = useState(true);
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🎯 POSITION STATE
  const [position, setPosition] = useState({ x: 20, y: 100 });
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntroMsg(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  // =========================
  // 🖱️ DESKTOP DRAG START
  // =========================
  const handleMouseDown = (e) => {
    setDragging(true);
    setOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  // =========================
  // 📱 MOBILE TOUCH START
  // =========================
  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    setDragging(true);
    setOffset({
      x: touch.clientX - position.x,
      y: touch.clientY - position.y
    });
  };

  // =========================
  // 🔄 MOVE (BOTH)
  // =========================
  const handleMove = (clientX, clientY) => {
    setPosition({
      x: clientX - offset.x,
      y: clientY - offset.y
    });
  };

  // =========================
  // 🖱️ + 📱 GLOBAL LISTENER
  // =========================
  useEffect(() => {
    const mouseMove = (e) => {
      if (dragging) handleMove(e.clientX, e.clientY);
    };

    const touchMove = (e) => {
      if (dragging) {
        const touch = e.touches[0];
        handleMove(touch.clientX, touch.clientY);
      }
    };

    const stopDrag = () => setDragging(false);

    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("mouseup", stopDrag);

    window.addEventListener("touchmove", touchMove);
    window.addEventListener("touchend", stopDrag);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mouseup", stopDrag);
      window.removeEventListener("touchmove", touchMove);
      window.removeEventListener("touchend", stopDrag);
    };
  }, [dragging, offset]);

  // =========================
  // 🤖 AI FUNCTION
  // =========================
  const askAI = async () => {
    if (!question || loading) return;

    setLoading(true);

    const newMessages = [...messages, { role: "user", text: question }];
    setMessages(newMessages);
    setQuestion("");

    let endpoint = "/ai/global-ask";
    let payload = { question };

    if (currentPDF) {
      endpoint = "/ai/smart-ask";
      payload = { question, fileUrl: currentPDF };
    }

    try {
      const res = await API.post(endpoint, payload);

      setMessages([
        ...newMessages,
        { role: "ai", text: res.data.answer }
      ]);
    } catch (err) {
      setMessages([
        ...newMessages,
        { role: "ai", text: "Error 🤖" }
      ]);
    }

    setLoading(false);
  };

  return (
    <div
      className="aiContainer"
      style={{
        left: position.x,
        top: position.y
      }}
    >
      {/* Intro */}
      {showIntroMsg && (
        <div className="ai-floating-msg">
          👋 Hey User! Welcome 🚀 <br />
          Ask me anything!
        </div>
      )}

      {/* 🤖 BUTTON */}
      <div
        className="aiButton"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onClick={() => setOpen(!open)}
      >
        🤖
      </div>

      {/* 💬 CHAT BOX */}
      {open && (
        <div className="aiBox">
          <div
            className="aiHeader"
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
          >
            AI Assistant
          </div>

          <div className="aiMessages">
            {messages.map((msg, i) => (
              <div key={i} className={msg.role}>
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              </div>
            ))}
          </div>

          <div className="aiInput">
            <input
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask anything..."
              onKeyDown={(e) => {
                if (e.key === "Enter") askAI();
              }}
            />

            <button onClick={askAI} disabled={loading}>
              {loading ? <span className="loader"></span> : "Send"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default GlobalAI;