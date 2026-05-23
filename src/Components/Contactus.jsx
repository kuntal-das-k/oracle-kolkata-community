import { useState } from "react";
import OracelContact from "../assets/OracleContactus.png"



export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSubmitMessage("");

    try {
      const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL;

      if (!GOOGLE_SCRIPT_URL) {
        setSubmitMessage("Configuration error: Google Apps Script URL not set. Please create a .env.local file with VITE_GOOGLE_SCRIPT_URL.");
        setIsLoading(false);
        return;
      }

      const payload = {
        name: formData.name,
        email: formData.email,
        phone: "",
        type: "contact",
        subject: formData.subject,
        message: formData.message,
      };

      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        setSubmitMessage("✓ Thank you! Your message has been sent successfully.");
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setSubmitMessage(""), 4000);
      } else {
        setSubmitMessage(`Failed to send message: ${result.error || result.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setSubmitMessage("Failed to send message. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="ContactUs" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>Contact Us</h1>
          <p className="text-gray-500 max-w-lg mx-auto text-xs sm:text-sm leading-relaxed px-2 sm:px-0">
            Membership is free and open to everyone — students, developers,
            architects, DBAs, and managers. Fill out the form and someone from our
            team will reach out within 48 hours.
          </p>
        </div>

        {/* Form + Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
          {/* Left: Form */}
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            {/* Name */}
            <div className="relative">
              <label className="absolute -top-2.5 left-3 text-[11px] font-bold text-red-600 bg-white px-1.5 uppercase tracking-wide">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-200 bg-white rounded-lg px-4 py-3.5 text-sm text-gray-900 focus:outline-none focus:border-[#cc0000] focus:ring-1 focus:ring-[#cc0000] transition-all placeholder-gray-400"
              />
            </div>

            {/* Email */}
            <div className="relative">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                className="w-full border border-gray-200 bg-white rounded-lg px-4 py-3.5 text-sm text-gray-900 focus:outline-none focus:border-[#cc0000] focus:ring-1 focus:ring-[#cc0000] transition-all placeholder-gray-400"
              />
            </div>

            {/* Subject */}
            <div className="relative">
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject"
                className="w-full border border-gray-200 bg-white rounded-lg px-4 py-3.5 text-sm text-gray-900 focus:outline-none focus:border-[#cc0000] focus:ring-1 focus:ring-[#cc0000] transition-all placeholder-gray-400"
              />
            </div>

            {/* Message */}
            <div className="relative">
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="How can we help you?"
                rows={5}
                className="w-full border border-gray-200 bg-white rounded-lg px-4 py-3.5 text-sm text-gray-900 focus:outline-none focus:border-[#cc0000] focus:ring-1 focus:ring-[#cc0000] transition-all placeholder-gray-400 resize-none"
              />
            </div>

            {/* Submit Message */}
            {submitMessage && (
              <div
                className={`p-3.5 rounded-lg text-sm transition-all border ${
                  submitMessage.includes("successfully")
                    ? "bg-green-50 text-green-700 border-green-200"
                    : "bg-red-50 text-red-600 border-red-200"
                }`}
              >
                {submitMessage}
              </div>
            )}

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full sm:w-auto bg-gradient-to-r from-[#cc0000] to-[#ff3333] hover:shadow-lg hover:shadow-red-500/20 disabled:from-red-300 text-white text-sm font-bold px-8 py-3.5 rounded-lg shadow-md transition-all duration-200 disabled:cursor-not-allowed cursor-pointer uppercase tracking-wider"
              >
                {isLoading ? "Sending..." : "Send Message"}
              </button>
            </div>
          </form>

          {/* Right: Image */}
          <div className="relative rounded-2xl overflow-hidden border border-gray-100 shadow-lg group">
            <img src={OracelContact} alt="Contact" className="w-full h-auto object-cover max-h-[380px]" />
          </div>
        </div>
      </div>
    </section>
  );
}