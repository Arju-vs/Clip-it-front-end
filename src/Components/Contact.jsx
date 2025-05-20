import React, { useState } from "react";
import { motion } from "framer-motion";
import "./Contact.css";
import { addContactus } from "../../services/allAPI";

const Contact = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState(null);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setResponseMessage(null);

  try {
    const response = await addContactus(formData); // pass formData here
    setResponseMessage({ type: "success", text: response.data.message });
    setFormData({ name: "", email: "", subject: "", message: "" });
  } catch (error) {
    setResponseMessage(error);
  }

  setLoading(false);
};
  return (
    <>
      <button onClick={toggleSidebar} className="contact-button">Contact Us</button>

      {isOpen && (
        <motion.div 
          initial={{ x: "100%" }} 
          animate={{ x: 0 }} 
          exit={{ x: "100%" }} 
          transition={{ duration: 0.3 }}
          className="contact-sidebar"
        >
          <button onClick={toggleSidebar} className="close-button">✖</button>
          <h2 className="sidebar-title">Contact Us</h2>
          {responseMessage && (
            <p className={`message-box ${responseMessage.type === "success" ? "success" : "error"}`}>
              {responseMessage.text}
            </p>
          )}
          <form onSubmit={handleSubmit} className="contact-form">
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required className="input-field" />
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required className="input-field" />
            <input type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder="Subject" required className="input-field" />
            <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Message" required className="textarea-field"></textarea>
            <button type="submit" disabled={loading} className="submit-button">
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </motion.div>
      )}
    </>
  );
};

export default Contact;
