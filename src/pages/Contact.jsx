import { useState } from "react";
import "./Contact.css";
import API from "../api";
const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
     const res = await API.post(
  "/contact",
  formData
);
      setMsg(res.data.message);

      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (err) {
      setMsg("Something went wrong ❌");
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-card">

        <h1>Contact Us</h1>

        <p className="contact-subtitle">
          We'd love to hear from you.
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="tel"
            name="phone"
            placeholder="Mobile Number"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <textarea
            name="message"
            placeholder="Your Message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
          />

          <button type="submit">
            Send Message
          </button>
        </form>

        {msg && (
          <p className="msg">{msg}</p>
        )}

      </div>
    </div>
  );
};

export default Contact;