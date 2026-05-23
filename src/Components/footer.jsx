import { useState } from "react";
import Logo from "../assets/Logo.png"

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="20" height="20" stroke="white" strokeWidth="1.5">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4.5" />
    <circle cx="17.5" cy="6.5" r="1" fill="white" stroke="none" />
  </svg>
);

const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="white" strokeWidth="1.5" />
    <path
      d="M13.5 8.5H15.5V6H13.5C11.843 6 10.5 7.343 10.5 9V10.5H9V13H10.5V19H13V13H15L15.5 10.5H13V9C13 8.724 13.224 8.5 13.5 8.5Z"
      fill="white"
    />
  </svg>
);

const TwitterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="white" strokeWidth="1.5" />
    <path
      d="M17 8L13.5 12L17 16H15.2L12.5 12.9L9.8 16H8L11.5 12L8 8H9.8L12.5 11.1L15.2 8H17Z"
      fill="white"
    />
  </svg>
);

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const handleSubscribe = async (e) => {
    if (e) e.preventDefault();
    if (!email) {
      setStatusMessage("Please enter a valid email address.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatusMessage("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);
    setStatusMessage("");

    try {
      const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL;

      if (!GOOGLE_SCRIPT_URL) {
        setStatusMessage("Configuration error: Google Apps Script URL not set in .env.local.");
        setIsLoading(false);
        return;
      }

      const payload = {
        name: "Newsletter Subscriber",
        email: email,
        phone: "",
        type: "subscribe",
        subject: "Newsletter Subscription",
        message: "User subscribed to newsletter via footer.",
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
        setStatusMessage("✓ Subscribed successfully!");
        setEmail("");
        setTimeout(() => setStatusMessage(""), 4000);
      } else {
        setStatusMessage(`Error: ${result.error || result.message || "Failed to subscribe"}`);
      }
    } catch (error) {
      console.error("Error subscribing:", error);
      setStatusMessage("Failed to subscribe. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ width: "100%", background: "white", fontFamily: "'Segoe UI', Arial, sans-serif" }}>
      {/* ── WHITE TOP CARD ── */}
      <div
        className="flex flex-col lg:flex-row items-center justify-between px-6 lg:px-[70px] py-6 lg:py-[20px] gap-6"
        style={{
          background: "#ffffff",
          borderTop: "solid red",
          borderRadius: "40px 40px 0 0",
        }}
      >
        {/* Oracle Logo */}
        <div className="flex items-center gap-[15px]">
          <img src={Logo} alt="logo" className="w-48 lg:w-60 h-auto" />
        </div>

        {/* Stay in the Loop */}
        <div className="text-center lg:text-right">
          <h2 className="text-3xl lg:text-[54px] font-[900] text-[#9b0000] mb-2 leading-[1.1] m-0">
            Stay in the Loop
          </h2>
          <p className="text-[#666] text-sm lg:text-[15px] m-0">
            Get event updates and Oracle insights straight to your inbox.
          </p>
        </div>
      </div>

      {/* ── RED GRADIENT BODY ── */}
      <div
        className="rounded-t-[36px] px-6 lg:px-[80px] pt-12 lg:pt-[120px] min-h-[60vh] flex flex-col justify-between"
        style={{
          background: "linear-gradient(180deg, #e30000 0%, #8c0000 55%, #4d0000 100%)",
        }}
      >
        {/* Content row */}
        <div className="flex flex-col lg:grid lg:grid-cols-[1fr_1.8fr_1fr] gap-10 lg:gap-[60px] pb-16 lg:pb-[100px] items-start">
          {/* Col 1: About */}
          <p className="text-white/85 text-[15px] leading-[1.75] m-0">
            High level experience in web design and development knowledge, producing quality work.
          </p>

          {/* Col 2: Subscribe */}
          <div>
            <p className="text-white/85 text-[15px] leading-[1.75] mb-[22px] mt-0">
              Subscribe to stay tuned for new web design and latest updates. Let's do it!
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email Address"
                disabled={isLoading}
                className="flex-1 px-[18px] py-[14px] text-[14px] border-[1.5px] border-white/35 bg-white/5 text-white outline-none rounded-t-md sm:rounded-l-md sm:rounded-tr-none placeholder-white/50 disabled:opacity-50"
                required
              />
              <button
                type="submit"
                disabled={isLoading}
                className="px-[24px] py-[14px] bg-white text-[#cc0000] font-[700] text-[14px] border-none rounded-b-md sm:rounded-r-md sm:rounded-bl-none cursor-pointer whitespace-nowrap hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Subscribing..." : "Subscribe"}
              </button>
            </form>
            {statusMessage && (
              <p className={`text-xs mt-2 font-medium ${statusMessage.includes("✓") ? "text-green-300" : "text-yellow-300"}`}>
                {statusMessage}
              </p>
            )}
          </div>

          {/* Col 3: Follow + Call */}
          <div className="flex flex-col sm:flex-row gap-[32px] items-start">
            <div>
              <p className="text-white font-[700] text-[15px] mb-[16px] mt-0">Follow us</p>
              <div className="flex gap-[10px]">
                <a href="#" className="hover:opacity-80 transition-opacity"><InstagramIcon /></a>
                <a href="#" className="hover:opacity-80 transition-opacity"><FacebookIcon /></a>
                <a href="#" className="hover:opacity-80 transition-opacity"><TwitterIcon /></a>
              </div>
            </div>
            <div>
              <p className="text-white font-[700] text-[15px] mb-[16px] mt-0">Call us</p>
              <p className="text-white/85 text-[15px] m-0">+1 800 854-36-80</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/15 py-[24px] flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 mt-auto">
          <p className="text-white/60 text-[13px] m-0 text-center sm:text-left">
            © {new Date().getFullYear()} All Rights Reserved
          </p>
          <div className="flex flex-wrap gap-[16px] sm:gap-[24px] justify-center">
            {["Privacy Policy", "Terms of Use", "Sales and Refunds", "Legal", "Site Map"].map((link) => (
              <a
                key={link}
                href="#"
                className="text-white/60 text-[13px] no-underline hover:text-white transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}