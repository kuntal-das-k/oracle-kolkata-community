import { useState, useEffect, useRef } from "react";
import { auth } from "../lib/firebase";

// Reusable Scroll-Reveal Component using IntersectionObserver
function FadeInWhenVisible({ children, delay = 0 }) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target); // Trigger only once
        }
      });
    }, { threshold: 0.1 });

    const currentTarget = domRef.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }
    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, []);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-700 cubic-bezier(0.16, 1, 0.3, 1)`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(32px)",
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

const MENTORS = [
  {
    name: "Saurav Mukherjee",
    role: "Principal Database Architect",
    company: "Oracle India",
    skills: ["Oracle Database 23c", "SQL Tuning", "Exadata"],
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  },
  {
    name: "Rinki Sen",
    role: "Senior OCI Architect",
    company: "TCS",
    skills: ["Cloud Migration", "Kubernetes", "OCI Security"],
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face",
  },
  {
    name: "Subir Chowdhury",
    role: "Java Development Lead",
    company: "Cognizant",
    skills: ["Spring Boot", "Microservices", "Helidon"],
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
  },
];

const EXPERTS = [
  {
    name: "Abhishek Roy",
    title: "Oracle ACE Associate",
    contributions: "40+ Tech Blogs, 12 Speaker Sessions",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&crop=face",
  },
  {
    name: "Neha Banerjee",
    title: "OCI Certified Master",
    contributions: "Cloud Security Specialist, 8 Panel Discussions",
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop&crop=face",
  },
];

const GUEST_SESSIONS = [
  {
    title: "Deep Dive into Oracle Database 23c Free Developer Edition",
    speaker: "Sean Stacey (Director of Product Management, Oracle)",
    date: "April 15, 2026",
    duration: "1 hr 15 mins",
  },
  {
    title: "Securing Enterprise Workloads on Oracle Cloud Infrastructure",
    speaker: "Juergen Kress (Director OCI Partner Engagement, Oracle)",
    date: "March 10, 2026",
    duration: "58 mins",
  },
];

export default function ProfessionalCorner() {
  const [selectedTopic, setSelectedTopic] = useState("");
  const [bookingStatus, setBookingStatus] = useState("");

  const handleBooking = async (e, mentorName) => {
    e.preventDefault();
    if (!selectedTopic) {
      setBookingStatus("Please select a topic first.");
      return;
    }

    if (!auth || !auth.currentUser) {
      setBookingStatus("Please join our community / log in first to book a consultation.");
      return;
    }

    setBookingStatus("Submitting request...");

    try {
      const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL;

      if (!GOOGLE_SCRIPT_URL) {
        setBookingStatus("Configuration error: Google Apps Script URL not set.");
        return;
      }

      const user = auth.currentUser;
      const payload = {
        name: user.displayName || "Community Member",
        email: user.email || "",
        phone: user.phoneNumber || "",
        type: "booking",
        subject: `Mentorship consultation request with ${mentorName}`,
        message: `Consultation Topic requested: ${selectedTopic}. Requested by user ID: ${user.uid}`,
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
        setBookingStatus(`✓ Consultation request submitted to ${mentorName} successfully!`);
        setSelectedTopic("");
        setTimeout(() => setBookingStatus(""), 4000);
      } else {
        setBookingStatus(`Failed to submit request: ${result.error || result.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error booking consultation:", error);
      setBookingStatus("Failed to submit request. Please try again later.");
    }
  };

  return (
    <div className="bg-white min-h-screen pt-28 pb-20 text-gray-900 font-sans">
      {/* CSS Animations */}
      <style>{`
        .pc-hero-bg {
          background-image: radial-gradient(rgba(204,0,0,0.04) 1.5px, transparent 1.5px);
          background-size: 32px 32px;
        }
        .pc-card {
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .pc-card:hover {
          transform: translateY(-8px);
          border-color: rgba(204, 0, 0, 0.15) !important;
          box-shadow: 0 20px 40px rgba(204, 0, 0, 0.08), 0 8px 32px rgba(0, 0, 0, 0.04);
        }
        .pulse-red {
          animation: pulseRed 2.5s infinite;
        }
        @keyframes pulseRed {
          0%, 100% { box-shadow: 0 0 0 0 rgba(204, 0, 0, 0.4); }
          50% { box-shadow: 0 0 0 10px rgba(204, 0, 0, 0); }
        }
      `}</style>

      {/* Hero Section */}
      <div className="relative pc-hero-bg py-16 px-4 md:px-8 border-b border-gray-100 overflow-hidden">
        {/* Glow behind title */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-red-50 rounded-full blur-3xl opacity-40 pointer-events-none" />

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 border border-red-200 text-[#cc0000] text-xs font-semibold uppercase tracking-wider mb-6 animate-pulse">
            <span className="w-2 h-2 rounded-full bg-[#cc0000]" />
            Corporate & Professional Hub
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6" style={{ fontFamily: "'Outfit', sans-serif" }}>
            Elevate Your <span className="text-[#cc0000]">Oracle Career</span>
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Connecting Oracle professionals, architects, and administrators in Kolkata. Access executive mentorship, career guidance, and live workshops.
          </p>
        </div>
      </div>

      {/* Mentorship Opportunities */}
      <section className="py-16 px-4 md:px-8 max-w-6xl mx-auto">
        <FadeInWhenVisible>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>Executive Mentorship</h2>
              <p className="text-gray-500 mt-2">Book 1-on-1 guidance calls with industry veterans.</p>
            </div>
            {bookingStatus && (
              <div className={`p-3 rounded-lg text-sm transition-all ${bookingStatus.includes('✓') ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-600 border border-red-200'}`}>
                {bookingStatus}
              </div>
            )}
          </div>
        </FadeInWhenVisible>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {MENTORS.map((mentor, idx) => (
            <FadeInWhenVisible key={mentor.name} delay={idx * 100}>
              <div className="pc-card bg-white border border-gray-100 rounded-2xl p-6 flex flex-col justify-between h-full shadow-sm">
                <div>
                  <div className="flex items-center gap-4 mb-5">
                    <img src={mentor.avatar} alt={mentor.name} className="w-16 h-16 rounded-full object-cover border border-gray-100" />
                    <div>
                      <h3 className="font-bold text-lg text-gray-900" style={{ fontFamily: "'Outfit', sans-serif" }}>{mentor.name}</h3>
                      <p className="text-xs text-gray-500 font-medium">{mentor.role}</p>
                      <p className="text-xs text-[#cc0000] font-semibold">{mentor.company}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {mentor.skills.map((skill) => (
                      <span key={skill} className="px-2.5 py-1 bg-gray-50 text-gray-600 border border-gray-100 rounded-lg text-xs font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <form onSubmit={(e) => handleBooking(e, mentor.name)} className="space-y-3">
                  <select
                    value={selectedTopic}
                    onChange={(e) => setSelectedTopic(e.target.value)}
                    className="w-full text-xs px-3 py-2 border border-gray-200 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-1 focus:ring-red-500"
                  >
                    <option value="">Select consultation topic</option>
                    <option value="SQL Optimization">SQL Optimization & Tuning</option>
                    <option value="OCI Architect Path">OCI Architecture Path</option>
                    <option value="Career Transition">Career Transition Guidance</option>
                    <option value="Resume Review">Resume & Mock Interview</option>
                  </select>
                  <button
                    type="submit"
                    className="w-full bg-[#cc0000] hover:bg-[#ff3333] text-white font-bold text-xs py-2.5 rounded-lg transition-colors cursor-pointer"
                  >
                    Request Free Consultation
                  </button>
                </form>
              </div>
            </FadeInWhenVisible>
          ))}
        </div>
      </section>

      {/* Networking & Career Sections */}
      <section className="bg-gray-50 py-16 px-4 md:px-8 border-y border-gray-100">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Networking & Events */}
          <FadeInWhenVisible>
            <div className="bg-white border border-gray-100 p-8 rounded-2xl shadow-sm h-full flex flex-col justify-between pc-card">
              <div>
                <span className="text-2xl mb-4 block">🤝</span>
                <h3 className="text-xl font-bold text-gray-900 mb-3 animate-none" style={{ fontFamily: "'Outfit', sans-serif" }}>Professional Networking</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-6">
                  Expand your network locally. Access community private channels, regional database roundtables, and monthly networking meetups in Kolkata.
                </p>
              </div>
              <div className="flex flex-wrap gap-4 items-center">
                <a
                  href="#JoinCommunity"
                  className="bg-[#cc0000] hover:bg-[#ff3333] text-white text-xs font-bold px-5 py-2.5 rounded-lg transition-colors inline-block uppercase tracking-wider"
                >
                  Join Professional Channel
                </a>
                <span className="text-xs text-gray-400">500+ Active Members</span>
              </div>
            </div>
          </FadeInWhenVisible>

          {/* Career Guidance */}
          <FadeInWhenVisible delay={100}>
            <div className="bg-white border border-gray-100 p-8 rounded-2xl shadow-sm h-full flex flex-col justify-between pc-card">
              <div>
                <span className="text-2xl mb-4 block">💼</span>
                <h3 className="text-xl font-bold text-gray-900 mb-3" style={{ fontFamily: "'Outfit', sans-serif" }}>Career Growth Program</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-6">
                  Get structural guidance from hiring directors. Free resume reviews, preparation templates, and alerts for local job openings at leading Oracle consultancies.
                </p>
              </div>
              <div className="flex flex-wrap gap-4 items-center">
                <button
                  onClick={() => alert("Resume review portal coming soon!")}
                  className="border border-[#cc0000] hover:bg-red-50 text-[#cc0000] text-xs font-bold px-5 py-2.5 rounded-lg transition-colors cursor-pointer uppercase tracking-wider"
                >
                  Upload Resume for Review
                </button>
                <span className="text-xs text-gray-400">Free Review in 48h</span>
              </div>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Guest Speakers & Workshops */}
      <section className="py-16 px-4 md:px-8 max-w-6xl mx-auto">
        <FadeInWhenVisible>
          <div className="mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>Executive Guest Sessions</h2>
            <p className="text-gray-500 mt-2">Recorded workshops led by global directors and experts.</p>
          </div>
        </FadeInWhenVisible>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {GUEST_SESSIONS.map((session, idx) => (
            <FadeInWhenVisible key={session.title} delay={idx * 150}>
              <div className="pc-card bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm flex flex-col h-full">
                {/* Mock Video Thumbnail */}
                <div className="bg-gray-900 h-48 relative flex items-center justify-center border-b border-gray-100">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="w-14 h-14 bg-[#cc0000] hover:bg-[#ff3333] text-white rounded-full flex items-center justify-center cursor-pointer shadow-lg transition-transform hover:scale-110 z-10 pulse-red">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <span className="absolute bottom-4 right-4 bg-black/60 text-white text-[10px] font-bold px-2 py-1 rounded">
                    {session.duration}
                  </span>
                </div>

                <div className="p-6 flex flex-col justify-between flex-1">
                  <div>
                    <h4 className="font-bold text-base text-gray-900 leading-snug mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>{session.title}</h4>
                    <p className="text-xs text-gray-500 mb-4">Speaker: {session.speaker}</p>
                  </div>
                  <div className="flex justify-between items-center text-xs text-gray-400 border-t border-gray-100 pt-4">
                    <span>{session.date}</span>
                    <span className="text-[#cc0000] font-semibold cursor-pointer">Watch Recording →</span>
                  </div>
                </div>
              </div>
            </FadeInWhenVisible>
          ))}
        </div>
      </section>

      {/* Spotlights */}
      <section className="bg-gray-50 text-gray-900 py-16 px-4 md:px-8 border-t border-gray-100">
        <div className="max-w-6xl mx-auto">
          <FadeInWhenVisible>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-extrabold tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>Expert Highlights</h2>
              <p className="text-gray-500 mt-2">Celebrating leaders in the Kolkata tech ecosystem.</p>
            </div>
          </FadeInWhenVisible>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {EXPERTS.map((expert, idx) => (
              <FadeInWhenVisible key={expert.name} delay={idx * 150}>
                <div className="bg-white border border-gray-100 rounded-2xl p-6 flex items-center gap-6 shadow-sm">
                  <img src={expert.img} alt={expert.name} className="w-20 h-20 rounded-full object-cover border-2 border-red-100" />
                  <div>
                    <h3 className="font-bold text-lg" style={{ fontFamily: "'Outfit', sans-serif" }}>{expert.name}</h3>
                    <p className="text-xs text-[#cc0000] font-semibold mb-1">{expert.title}</p>
                    <p className="text-xs text-gray-500 leading-normal">{expert.contributions}</p>
                  </div>
                </div>
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
