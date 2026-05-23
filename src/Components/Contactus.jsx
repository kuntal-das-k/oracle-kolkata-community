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
      const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
      const SHEET2API_URL = import.meta.env.VITE_SHEET2API_URL;

      if (!WEB3FORMS_KEY || !SHEET2API_URL) {
        setSubmitMessage("Configuration error: form endpoints not set. Please contact administrator.");
        setIsLoading(false);
        return;
      }

      const payload = {
        timestamp: new Date().toISOString(),
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
      };

      const [web3formsResult, sheet2apiResult] = await Promise.allSettled([
        fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            access_key: WEB3FORMS_KEY,
            ...payload,
          }),
        }),
        fetch(SHEET2API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }),
      ]);

      const web3formsOk =
        web3formsResult.status === "fulfilled" &&
        (await web3formsResult.value.json()).success === true;
      const sheet2apiOk =
        sheet2apiResult.status === "fulfilled" &&
        sheet2apiResult.value.ok;

      if (web3formsOk && sheet2apiOk) {
        setSubmitMessage("✓ Thank you! Your message has been sent successfully.");
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setSubmitMessage(""), 3000);
      } else if (!web3formsOk && !sheet2apiOk) {
        setSubmitMessage("Failed to send message. Please try again later.");
      } else if (!web3formsOk) {
        setSubmitMessage("Message saved, but email failed. Please try again.");
      } else {
        setSubmitMessage("Email sent, but saving failed. Please try again.");
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setSubmitMessage("Failed to send message. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-10 sm:py-12 md:py-16 px-4 sm:px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">Contact Us</h1>
          <p className="text-gray-500 max-w-lg mx-auto text-xs sm:text-sm leading-relaxed px-2 sm:px-0">
            Membership is free and open to everyone — students, developers,
            architects, DBAs, and managers. Fill out the form and someone from our
            team will reach out within 48 hours.
          </p>
        </div>

        {/* Form + Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 items-start">
          {/* Left: Form */}
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            {/* Name */}
            <div className="relative">
              <label className="absolute -top-2 left-3 text-xs text-gray-400 bg-white px-1">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-red-200 bg-red-50 rounded-md px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-300 placeholder-gray-400"
              />
            </div>

            {/* Email */}
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full border border-red-200 bg-red-50 rounded-md px-4 py-3 text-sm text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-300 placeholder-gray-400"
            />

            {/* Subject */}
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Subject"
              className="w-full border border-red-200 bg-red-50 rounded-md px-4 py-3 text-sm text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-300 placeholder-gray-400"
            />

            {/* Message */}
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Message"
              rows={6}
              className="w-full border border-red-200 bg-red-50 rounded-md px-4 py-3 text-sm text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-300 placeholder-gray-400 resize-none"
            />

            {/* Submit Message */}
            {submitMessage && (
              <div
                className={`p-3 rounded-md text-sm ${
                  submitMessage.includes("successfully")
                    ? "bg-green-100 text-green-700 border border-green-300"
                    : "bg-red-100 text-red-700 border border-red-300"
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
                className="bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white text-sm font-medium px-6 py-3 rounded-md shadow-md transition-colors duration-200 disabled:cursor-not-allowed"
              >
                {isLoading ? "Sending..." : "Send Message"}
              </button>
            </div>
          </form>

          {/* Right: Image */}
          <img src={OracelContact} alt="Contact" className="w-full h-auto rounded-lg" />
        </div>
      </div>
    </section>
  );
}