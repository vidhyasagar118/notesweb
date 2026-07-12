import { useEffect, useState } from "react";
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
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  const askAI = async () => {
    const trimmedQuestion = question.trim();

    if (!trimmedQuestion || loading) return;

    setLoading(true);

    const newMessages = [
      ...messages,
      {
        role: "user",
        text: trimmedQuestion,
      },
    ];

    setMessages(newMessages);
    setQuestion("");

    let endpoint = "/ai/global-ask";
    let payload = {
      question: trimmedQuestion,
    };

    if (currentPDF) {
      endpoint = "/ai/smart-ask";

      payload = {
        question: trimmedQuestion,
        fileUrl: currentPDF,
      };
    }

    try {
      const res = await API.post(endpoint, payload);

      setMessages([
        ...newMessages,
        {
          role: "ai",
          text:
            res.data.answer ||
            "Sorry, I could not generate an answer.",
        },
      ]);
    } catch (err) {
      console.error("AI request error:", err);

      setMessages([
        ...newMessages,
        {
          role: "ai",
          text: "Something went wrong. Please try again. 🤖",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="aiContainer">
      {showIntroMsg && !open && (
        <div className="ai-floating-msg">
          👋 Hey User! Welcome 🚀
          <br />
          Ask me anything!
        </div>
      )}

      {open && (
        <div className="aiBox">
          <div className="aiHeader">
            <span>AI Assistant</span>

            <button
              type="button"
              className="aiCloseBtn"
              onClick={() => setOpen(false)}
              aria-label="Close AI Assistant"
            >
              ✕
            </button>
          </div>

          <div className="aiMessages">
            {messages.length === 0 && (
              <div className="ai">
                Hello! Ask me anything about your notes or any
                general topic.
              </div>
            )}

            {messages.map((msg, index) => (
              <div
                key={`${msg.role}-${index}`}
                className={msg.role}
              >
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              </div>
            ))}

            {loading && (
              <div className="ai">
                <span className="loader"></span>
              </div>
            )}
          </div>

          <div className="aiInput">
            <input
              type="text"
              value={question}
              onChange={(e) =>
                setQuestion(e.target.value)
              }
              placeholder="Ask anything..."
              disabled={loading}
              onKeyDown={(e) => {
                if (
                  e.key === "Enter" &&
                  !e.shiftKey
                ) {
                  e.preventDefault();
                  askAI();
                }
              }}
            />

            <button
              type="button"
              onClick={askAI}
              disabled={
                loading || !question.trim()
              }
            >
              {loading ? (
                <span className="loader"></span>
              ) : (
                "Send"
              )}
            </button>
          </div>
        </div>
      )}

      <button
        type="button"
        className="aiButton"
        onClick={() =>
          setOpen((previous) => !previous)
        }
        aria-label="Open AI Assistant"
      >
        🤖
      </button>
    </div>
  );
}

export default GlobalAI;