import { useState, useEffect } from "react";

const KNOWLEDGE_ITEMS = [
  {
    id: 1,
    type: "Blogs",
    title: "SQL Performance Tuning: 5 Indexing Gotchas in Oracle DB",
    desc: "Understand how hidden implicit type conversions, function-based columns, and NULL indices affect execution plans.",
    tag: "Database",
    meta: "5 min read · By Amit Sharma",
    linkText: "Read Blog Post",
  },
  {
    id: 2,
    type: "Roadmaps",
    title: "Oracle Cloud Infrastructure (OCI) Certification Path",
    desc: "Step-by-step roadmap from OCI Foundations Associate to OCI Solutions Architect Professional. Free prep guides included.",
    tag: "Cloud",
    meta: "4 Stages · Compiled by Priya Das",
    linkText: "View Roadmap",
  },
  {
    id: 3,
    type: "Recordings",
    title: "Migrating On-Premise Databases to OCI Autonomous Database",
    desc: "A full 1-hour workshop walkthrough showcasing MV2ADC, Zero Downtime Migration (ZDM), and Datapump execution.",
    tag: "Cloud Migration",
    meta: "1 hr 12 mins · Community Webinar",
    linkText: "Watch Recording",
  },
  {
    id: 4,
    type: "Nuggets",
    title: "Useful PL/SQL Dynamic SQL Bulk Collect Script",
    desc: "Quick syntax helper using FORALL and BULK COLLECT LIMIT clause to process millions of rows without memory exhaustion.",
    tag: "PL/SQL",
    meta: "Oracle 12c+ Compatibility · Syntax Nugget",
    linkText: "Copy Script",
  },
  {
    id: 5,
    type: "Blogs",
    title: "Why Oracle 23c is a Game Changer for JSON Developers",
    desc: "Deep dive into JSON Relational Duality Views, letting you use SQL tables while fetching JSON documents natively.",
    tag: "Database",
    meta: "7 min read · By Vikram Roy",
    linkText: "Read Blog Post",
  },
  {
    id: 6,
    type: "Roadmaps",
    title: "Oracle DBA to OCI Cloud Database Specialist Roadmap",
    desc: "Comprehensive roadmap covering Base Database Service, Exadata Database Service, Autonomous Database, and security controls.",
    tag: "Database & Cloud",
    meta: "5 Stages · Compiled by Debashis Paul",
    linkText: "View Roadmap",
  },
];

export default function KnowledgeHub() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [filteredItems, setFilteredItems] = useState(KNOWLEDGE_ITEMS);
  const [animateTrigger, setAnimateTrigger] = useState(true);

  // Sync filtering and trigger animation restart
  useEffect(() => {
    let isMounted = true;
    
    const animationFrame = requestAnimationFrame(() => {
      if (isMounted) setAnimateTrigger(false);
    });

    const handler = setTimeout(() => {
      const items = KNOWLEDGE_ITEMS.filter((item) => {
        const matchesSearch =
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.tag.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory =
          activeCategory === "All" || item.type === activeCategory;
        return matchesSearch && matchesCategory;
      });
      if (isMounted) {
        setFilteredItems(items);
        setAnimateTrigger(true);
      }
    }, 150); // slight debounce for smooth transition

    return () => {
      isMounted = false;
      cancelAnimationFrame(animationFrame);
      clearTimeout(handler);
    };
  }, [searchQuery, activeCategory]);

  return (
    <div className="bg-white min-h-screen pt-28 pb-20 text-gray-900 font-sans">
      <style>{`
        .kh-bg {
          background-image: radial-gradient(rgba(0,0,0,0.03) 1px, transparent 1px);
          background-size: 24px 24px;
        }
        .kh-card {
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .kh-card:hover {
          transform: translateY(-6px);
          border-color: rgba(204, 0, 0, 0.15) !important;
          box-shadow: 0 15px 30px rgba(204, 0, 0, 0.06), 0 5px 15px rgba(0, 0, 0, 0.04);
        }
        .kh-pill {
          transition: all 0.2s ease;
        }
        .kh-pill:hover:not(.active) {
          border-color: #cc0000 !important;
          color: #cc0000 !important;
        }

        /* Staggered keyframe reveals */
        @keyframes khCardReveal {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .kh-reveal-item {
          animation: khCardReveal 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
      `}</style>

      {/* Hero / Header Section */}
      <div className="kh-bg py-12 px-4 md:px-8 border-b border-gray-100 relative">
        <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
          <span className="text-[#cc0000] font-extrabold text-[11px] uppercase tracking-[0.28em] mb-4">
            Oracle Knowledge Hub
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>
            Curated Technical Resources
          </h1>
          <p className="text-sm text-gray-500 max-w-xl mb-10 leading-relaxed">
            Search developer blogs, syntax nuggets, cloud roadmaps, and event playbacks compiled by members of the community.
          </p>

          {/* Search Box */}
          <div className="w-full max-w-lg relative mb-8 shadow-sm rounded-xl">
            <input
              type="text"
              placeholder="Search by topic, keyword, or tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-1 focus:ring-[#cc0000] focus:border-[#cc0000] transition-all text-gray-900 bg-white placeholder-gray-400"
            />
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-3xl">
            {["All", "Blogs", "Roadmaps", "Recordings", "Nuggets"].map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`kh-pill px-5 py-2 rounded-full border text-xs font-semibold tracking-wide cursor-pointer ${
                  activeCategory === category
                    ? "active bg-[#cc0000] border-[#cc0000] text-white shadow-md shadow-red-500/15"
                    : "border-gray-200 text-gray-500 bg-white"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid Content List */}
      <section className="py-16 px-4 md:px-8 max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-4">
          <h2 className="text-xl font-bold text-gray-900 tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
            Latest Sharing
          </h2>
          <span className="text-xs text-gray-400">
            Showing <strong className="text-[#cc0000] font-bold">{filteredItems.length}</strong> items
          </span>
        </div>

        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {animateTrigger &&
              filteredItems.map((item, idx) => (
                <div
                  key={item.id}
                  className="kh-reveal-item kh-card bg-white border border-gray-100 rounded-2xl p-6 flex flex-col justify-between shadow-sm"
                  style={{ animationDelay: `${idx * 60}ms` }}
                >
                  <div>
                    {/* Header: Tag + Category */}
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-[10px] font-bold text-[#cc0000] bg-red-50 px-2.5 py-1 rounded border border-red-200 uppercase tracking-wider">
                        {item.type}
                      </span>
                      <span className="text-[10px] font-bold text-gray-500 bg-gray-50 px-2.5 py-1 rounded border border-gray-100 uppercase tracking-wider">
                        {item.tag}
                      </span>
                    </div>

                    <h3 className="font-bold text-base text-gray-900 leading-snug mb-3" style={{ fontFamily: "'Outfit', sans-serif" }}>
                      {item.title}
                    </h3>
                    <p className="text-xs text-gray-500 leading-relaxed mb-6">
                      {item.desc}
                    </p>
                  </div>

                  <div className="flex justify-between items-center border-t border-gray-100 pt-4 text-xs font-semibold mt-auto">
                    <span className="text-gray-400 font-normal">{item.meta}</span>
                    <span
                      onClick={() => {
                        if (item.type === "Nuggets") {
                          navigator.clipboard.writeText(
                            `SELECT /*+ PARALLEL(t, 4) */ * FROM millions_table t;`
                          );
                          alert("Example PL/SQL bulk syntax copied to clipboard!");
                        } else {
                          alert(`Navigating to mock link for "${item.title}"`);
                        }
                      }}
                      className="text-[#cc0000] hover:text-[#ff3333] cursor-pointer"
                    >
                      {item.linkText} →
                    </span>
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <div className="text-center py-20 border border-dashed border-gray-200 rounded-2xl bg-gray-50">
            <span className="text-3xl mb-4 block">🔍</span>
            <h4 className="font-bold text-gray-900">No results found</h4>
            <p className="text-xs text-gray-400 mt-1 max-w-xs mx-auto leading-relaxed">
              We couldn't find any resources matching "{searchQuery}" under category "{activeCategory}".
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
