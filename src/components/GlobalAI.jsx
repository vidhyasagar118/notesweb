import { useEffect, useState } from "react";
import API from "../api";
import "./globalAI.css";
import ReactMarkdown from "react-markdown";

function GlobalAI({ currentFile }) {
  const [showIntroMsg, setShowIntroMsg] =
    useState(true);
  const [open, setOpen] = useState(false);
  const [question, setQuestion] =
    useState("");
  const [messages, setMessages] =
    useState([]);
  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntroMsg(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  const askAI = async () => {
    const trimmedQuestion =
      question.trim();

    if (!trimmedQuestion || loading) {
      return;
    }

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

    try {
      let endpoint = "/ai/global-ask";

      let payload = {
        question: trimmedQuestion,
      };

      if (currentFile?.url) {
        endpoint = "/ai/smart-ask";

        payload = {
          question: trimmedQuestion,
          fileUrl: currentFile.url,
          fileCategory:
            currentFile.category,
          mimeType:
            currentFile.mimeType,
          fileName:
            currentFile.name,
          originalName:
            currentFile.originalName,
          fileSize:
            currentFile.fileSize,
        };
      }

      const res = await API.post(
        endpoint,
        payload,
        {
          timeout: 1000 * 60 * 10,
        }
      );

      setMessages([
        ...newMessages,
        {
          role: "ai",
          text:
            res.data?.answer ||
            "Sorry, I could not generate an answer.",
        },
      ]);
    } catch (err) {
      console.error(
        "AI request error:",
        err
      );

      setMessages([
        ...newMessages,
        {
          role: "ai",
          text:
            err.response?.data?.answer ||
            err.response?.data?.message ||
            "Something went wrong. Please try again. 🤖",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const fileLabel = () => {
    if (!currentFile) return "";

    if (currentFile.category === "pdf") {
      return "📄 PDF selected";
    }

    if (
      currentFile.category === "image"
    ) {
      return "🖼️ Image selected";
    }

    if (
      currentFile.category === "video"
    ) {
      return "🎥 Video selected";
    }

    return "📁 File selected";
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
            <div>
              <span>AI Assistant</span>

              {currentFile && (
                <small
                  style={{
                    display: "block",
                    marginTop: "3px",
                    fontSize: "11px",
                  }}
                >
                  {fileLabel()}:{" "}
                  {currentFile.name}
                </small>
              )}
            </div>

            <button
              type="button"
              className="aiCloseBtn"
              onClick={() =>
                setOpen(false)
              }
            >
              ✕
            </button>
          </div>

          <div className="aiMessages">
            {messages.length === 0 && (
              <div className="ai">
                {currentFile
                  ? `Ask anything about "${currentFile.name}".`
                  : "Hello! Ask me anything about your notes or any general topic."}
              </div>
            )}

            {messages.map(
              (msg, index) => (
                <div
                  key={`${msg.role}-${index}`}
                  className={msg.role}
                >
                  <ReactMarkdown>
                    {msg.text}
                  </ReactMarkdown>
                </div>
              )
            )}

            {loading && (
              <div className="ai">
                <span className="loader" />
              </div>
            )}
          </div>

          <div className="aiInput">
            <input
              type="text"
              value={question}
              onChange={(e) =>
                setQuestion(
                  e.target.value
                )
              }
              placeholder={
                currentFile
                  ? `Ask about ${currentFile.category}...`
                  : "Ask anything..."
              }
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
                loading ||
                !question.trim()
              }
            >
              {loading ? (
                <span className="loader" />
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
          setOpen(
            (previous) => !previous
          )
        }
      >
        🤖
      </button>
    </div>
  );
}

export default GlobalAI;