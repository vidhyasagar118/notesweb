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
useEffect(() => {
  const timer = setTimeout(() => {
    setShowIntroMsg(false);
  }, 4000); // 4 sec baad sirf message gayab

  return () => clearTimeout(timer);
}, []);
  // ✅ ONLY ONE STATE
  const [position, setPosition] = useState({ x: 20, y: 100 });
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  // ✅ START DRAG
  const handleMouseDown = (e) => {
    e.preventDefault();
    setDragging(true);

    setOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  // ✅ MOVE
  const handleMouseMove = (e) => {
    if (!dragging) return;

    setPosition({
      x: e.clientX - offset.x,
      y: e.clientY - offset.y
    });
  };

  // ✅ STOP
  const handleMouseUp = () => {
    setDragging(false);
  };

  // ✅ GLOBAL LISTENER
  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  });

 const askAI = async () => {
  if (!question || loading) return;

  setLoading(true); // 🔥 start loading

  const newMessages = [...messages, { role: "user", text: question }];
  setMessages(newMessages);
  setQuestion("");

  let endpoint = "/ai/global-ask";
  let payload = { question };


// ✅ ONLY send PDF if available
if (currentPDF) {
  endpoint = "/ai/smart-ask"; // 🔥 NEW ROUTE
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

  setLoading(false); // 🔥 stop loading
};
  return (
    <div
      className="aiContainer"
      style={{
        left: position.x,
        top: position.y
      }}
    >
 {/* ✅ Intro Message */}
  {showIntroMsg && (
    <div className="ai-floating-msg">
      👋 Hey User! Welcome to Notes.com 🚀 <br />
      Ask me anything!
    </div>
  )}
      <div
        className="aiButton"
        onMouseDown={handleMouseDown}
        onClick={() => setOpen(!open)}
      >
        🤖
      </div>

      {open && (
        <div className="aiBox">
          <div className="aiHeader">AI Assistant</div>

          <div className="aiMessages">
            {messages.map((msg, i) => (
<div key={i} className={msg.role}>
  <ReactMarkdown>
    {msg.text}
  </ReactMarkdown>
</div>
            ))}
          </div>

          <div className="aiInput">
          <input
  value={question}
  onChange={(e) => setQuestion(e.target.value)}
  placeholder="Ask anything..."
  onKeyDown={(e) => {
    if (e.key === "Enter") {
      askAI();
    }
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