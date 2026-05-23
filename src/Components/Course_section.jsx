import { useState } from "react";

const STYLES = `
  /* ── Card hover lift ── */
  .cs-card {
    transition: transform 0.38s cubic-bezier(.22,1,.36,1), box-shadow 0.38s ease, border-color 0.3s;
  }
  .cs-card:hover {
    transform: translateY(-8px);
    border-color: rgba(204, 0, 0, 0.2) !important;
    box-shadow: 0 20px 40px -10px rgba(204,0,0,0.1), 0 8px 32px 0 rgba(0, 0, 0, 0.06) !important;
  }
  .cs-card:hover .cs-card-top-bar {
    width: 100% !important;
  }
  .cs-card-top-bar {
    transition: width 0.5s cubic-bezier(.22,1,.36,1);
  }

  /* ── Enroll button ── */
  .cs-enroll {
    transition: all 0.25s ease;
    position: relative;
    overflow: hidden;
  }
  .cs-enroll::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, #9b0000, #cc0000);
    transform: translateX(-100%);
    transition: transform 0.3s ease;
    border-radius: inherit;
  }
  .cs-enroll:hover::after { transform: translateX(0); }
  .cs-enroll:hover { color: #fff !important; border-color: transparent !important; }
  .cs-enroll span { position: relative; z-index: 1; }

  /* ── Filter pill ── */
  .cs-pill {
    transition: all 0.2s ease;
    cursor: pointer;
  }
  .cs-pill:hover {
    border-color: #cc0000 !important;
    color: #cc0000 !important;
  }

  /* ── Card fade-in ── */
  @keyframes csSlideUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .cs-card { animation: csSlideUp 0.5s ease both; }

  /* ── Progress bar fill ── */
  @keyframes fillBar {
    from { width: 0%; }
    to   { width: var(--progress); }
  }
  .cs-progress-fill {
    animation: fillBar 1.2s ease 0.4s both;
  }

  /* ── Section heading underline ── */
  .cs-heading-line {
    position: relative;
    display: inline-block;
  }
  .cs-heading-line::after {
    content: '';
    position: absolute;
    bottom: -6px;
    left: 0;
    width: 60px;
    height: 4px;
    background: linear-gradient(90deg, #cc0000, #ff5555);
    border-radius: 2px;
    transition: width 0.4s ease;
  }
  .cs-heading-line:hover::after { width: 100%; }

  /* ── View all btn ── */
  .cs-view-all {
    transition: all 0.28s ease;
  }
  .cs-view-all:hover {
    background: #cc0000 !important;
    color: #fff !important;
    border-color: transparent !important;
    box-shadow: 0 12px 36px rgba(204,0,0,0.2);
    transform: translateY(-2px);
  }

  /* ── Subtle dot grid bg ── */
  .cs-section-bg {
    background-color: #fafafa;
    background-image: radial-gradient(rgba(204,0,0,0.04) 1px, transparent 1px);
    background-size: 28px 28px;
  }
`;

const COURSES = [
  {
    id: 1, tag: "Database", level: "Beginner",
    title: "Oracle SQL Fundamentals",
    desc: "Master SQL from scratch — queries, joins, subqueries, and database design best practices for real-world applications.",
    duration: "8 hrs", lessons: 24, enrolled: "2.1k", progress: 72,
    instructor: "Rahul Das", initials: "RD", rating: 4.8, reviews: 312,
  },
  {
    id: 2, tag: "Cloud", level: "Intermediate",
    title: "OCI Architect Associate Prep",
    desc: "Everything you need to pass the Oracle Cloud Infrastructure Architect Associate certification with flying colours.",
    duration: "14 hrs", lessons: 38, enrolled: "1.4k", progress: 58,
    instructor: "Priya Sharma", initials: "PS", rating: 4.9, reviews: 219,
  },
  {
    id: 3, tag: "DevOps", level: "Advanced",
    title: "Enterprise CI/CD on Oracle Cloud",
    desc: "Production-grade DevOps pipelines using OCI DevOps, Terraform, and Kubernetes orchestration at scale.",
    duration: "11 hrs", lessons: 31, enrolled: "890", progress: 45,
    instructor: "Amit Ghosh", initials: "AG", rating: 4.7, reviews: 178,
  },
  {
    id: 4, tag: "Analytics", level: "Beginner",
    title: "Data Warehousing with ADW",
    desc: "Build powerful data warehouses on Oracle Autonomous Data Warehouse — zero administration, infinite scale.",
    duration: "6 hrs", lessons: 18, enrolled: "3.2k", progress: 80,
    instructor: "Sona Roy", initials: "SR", rating: 4.6, reviews: 401,
  },
  {
    id: 5, tag: "Security", level: "Intermediate",
    title: "OCI Security & Compliance",
    desc: "Implement a robust security posture with IAM, KMS, audit logs, and enterprise compliance frameworks.",
    duration: "9 hrs", lessons: 27, enrolled: "760", progress: 33,
    instructor: "Vikram Sen", initials: "VS", rating: 4.8, reviews: 145,
  },
  {
    id: 6, tag: "AI/ML", level: "Advanced",
    title: "Machine Learning on OCI",
    desc: "End-to-end ML pipelines — data prep, model training, and deployment using Oracle AI & Vision services.",
    duration: "16 hrs", lessons: 44, enrolled: "1.1k", progress: 61,
    instructor: "Debjani Nath", initials: "DN", rating: 4.9, reviews: 267,
  },
];

const TAGS = ["All", "Database", "Cloud", "DevOps", "Analytics", "Security", "AI/ML"];

const LEVEL = {
  Beginner: { color: "#16a34a", bg: "rgba(22, 163, 74, 0.08)", border: "rgba(22, 163, 74, 0.2)" },
  Intermediate: { color: "#d97706", bg: "rgba(217, 119, 6, 0.08)", border: "rgba(217, 119, 6, 0.2)" },
  Advanced: { color: "#dc2626", bg: "rgba(220, 38, 38, 0.08)", border: "rgba(220, 38, 38, 0.2)" },
};

const TAG_ICONS = {
  Database: "🗃️", Cloud: "☁️", DevOps: "⚙️",
  Analytics: "📊", Security: "🔐", "AI/ML": "🤖",
};

function Stars({ rating }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "3px" }}>
      {[1, 2, 3, 4, 5].map(i => (
        <svg key={i} width="12" height="12" viewBox="0 0 12 12"
          fill={i <= Math.round(rating) ? "#fbbf24" : "#d1d5db"}>
          <path d="M6 0l1.545 3.13L11 3.635l-2.5 2.436.59 3.44L6 7.895l-3.09 1.616.59-3.44L1 3.635l3.455-.505z" />
        </svg>
      ))}
      <span style={{ fontSize: "12px", fontWeight: 700, color: "#d97706", marginLeft: "4px" }}>{rating}</span>
    </div>
  );
}

function CourseCard({ course, index }) {
  const lv = LEVEL[course.level];
  return (
    <div
      className="cs-card"
      style={{
        animationDelay: `${index * 0.07}s`,
        background: "#ffffff",
        borderRadius: "18px",
        border: "1px solid rgba(0, 0, 0, 0.06)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 4px 20px 0 rgba(0, 0, 0, 0.04)",
        position: "relative",
      }}
    >
      {/* Top accent bar — expands on hover */}
      <div
        className="cs-card-top-bar"
        style={{
          height: "4px",
          width: "48px",
          background: "linear-gradient(90deg, #cc0000, #ff3333)",
          borderRadius: "0 4px 4px 0",
        }}
      />

      {/* Card image area / color block */}
      <div style={{
        height: "120px",
        background: "linear-gradient(135deg, rgba(204, 0, 0, 0.05) 0%, rgba(204, 0, 0, 0.01) 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* big icon */}
        <span style={{ fontSize: "48px", opacity: 0.2 }}>{TAG_ICONS[course.tag] || "📘"}</span>
        {/* Level badge */}
        <span style={{
          position: "absolute", top: "12px", right: "14px",
          background: lv.bg,
          color: lv.color,
          border: `1px solid ${lv.border}`,
          fontSize: "10px",
          fontWeight: 700,
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          letterSpacing: "0.07em",
          padding: "4px 10px",
          borderRadius: "50px",
        }}>
          {course.level}
        </span>
        {/* Tag badge */}
        <span style={{
          position: "absolute", top: "12px", left: "14px",
          background: "rgba(204, 0, 0, 0.08)",
          color: "#cc0000",
          border: "1px solid rgba(204, 0, 0, 0.15)",
          fontSize: "10px",
          fontWeight: 700,
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          letterSpacing: "0.08em",
          padding: "4px 10px",
          borderRadius: "50px",
          textTransform: "uppercase",
        }}>
          {course.tag}
        </span>
      </div>

      <div style={{ padding: "22px 24px 24px", display: "flex", flexDirection: "column", gap: "14px", flex: 1 }}>

        {/* Title */}
        <h3 style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: "21px",
          color: "#1a1a2e",
          letterSpacing: "0.02em",
          margin: 0,
          lineHeight: 1.15,
          fontWeight: 700,
        }}>
          {course.title}
        </h3>

        {/* Desc */}
        <p style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: "13px",
          color: "#6b7280",
          lineHeight: 1.7,
          margin: 0,
          flex: 1,
        }}>
          {course.desc}
        </p>

        {/* Instructor row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "9px" }}>
            <div style={{
              width: "30px", height: "30px", borderRadius: "50%",
              background: "linear-gradient(135deg, #cc0000, #ff3333)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "'Outfit', sans-serif",
              fontWeight: "bold",
              fontSize: "12px", color: "#fff", flexShrink: 0,
              boxShadow: "0 2px 8px rgba(204,0,0,0.2)",
            }}>
              {course.initials}
            </div>
            <div>
              <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "12px", fontWeight: 600, color: "#1a1a2e" }}>
                {course.instructor}
              </div>
              <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "10px", color: "#9ca3af" }}>Instructor</div>
            </div>
          </div>
          <Stars rating={course.rating} />
        </div>

        {/* Divider */}
        <div style={{ height: "1px", background: "rgba(0,0,0,0.06)" }} />

        {/* Meta stats */}
        <div style={{ display: "flex", gap: "0", justifyContent: "space-between" }}>
          {[
            { icon: "⏱", label: "Duration", val: course.duration },
            { icon: "📚", label: "Lessons", val: `${course.lessons}` },
            { icon: "👥", label: "Enrolled", val: course.enrolled },
          ].map(({ label, val }) => (
            <div key={label} style={{ textAlign: "center", flex: 1 }}>
              <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: "17px", color: "#cc0000", letterSpacing: "0.01em", fontWeight: 700 }}>{val}</div>
              <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "10px", color: "#9ca3af", letterSpacing: "0.05em", textTransform: "uppercase" }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Progress */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
            <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "10px", color: "#9ca3af", letterSpacing: "0.07em", textTransform: "uppercase" }}>
              Avg. Completion
            </span>
            <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "10px", fontWeight: 700, color: "#cc0000" }}>
              {course.progress}%
            </span>
          </div>
          <div style={{ height: "5px", background: "rgba(0,0,0,0.06)", borderRadius: "3px", overflow: "hidden" }}>
            <div
              className="cs-progress-fill"
              style={{
                "--progress": `${course.progress}%`,
                width: `${course.progress}%`,
                height: "100%",
                background: "linear-gradient(90deg, #cc0000, #ff3333)",
                borderRadius: "3px",
              }}
            />
          </div>
        </div>

        {/* CTA */}
        <button
          className="cs-enroll"
          style={{
            background: "transparent",
            color: "#cc0000",
            border: "1.5px solid rgba(204, 0, 0, 0.3)",
            borderRadius: "10px",
            padding: "12px 0",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 700,
            fontSize: "13px",
            letterSpacing: "0.07em",
            textTransform: "uppercase",
            cursor: "pointer",
            width: "100%",
          }}
        >
          <span>Enroll Now →</span>
        </button>
      </div>
    </div>
  );
}

function parseEnrolled(str) {
  const num = parseFloat(str);
  if (str.toLowerCase().endsWith('k')) return num * 1000;
  return num;
}

export default function Course_section() {
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("rating");

  const filtered = [...(filter === "All" ? COURSES : COURSES.filter(c => c.tag === filter))]
    .sort((a, b) =>
      sort === "rating"
        ? b.rating - a.rating
        : parseEnrolled(b.enrolled) - parseEnrolled(a.enrolled)
    );

  return (
    <>
      <style>{STYLES}</style>

      <section id="StudentCorner" className="cs-section-bg" style={{ padding: "80px 0 100px" }}>
        <div style={{ maxWidth: "1260px", margin: "0 auto", padding: "0 16px" }} className="sm:px-6 md:px-10 lg:px-12">

          {/* ── Section header ── */}
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "28px", marginBottom: "48px" }} className="sm:!flex-row sm:!items-end">
            <div>
              {/* eyebrow */}
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
                <div style={{ width: "36px", height: "2px", background: "#cc0000", borderRadius: "1px" }} />
                <span style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: "11px", fontWeight: 700,
                  letterSpacing: "0.28em", color: "#cc0000",
                  textTransform: "uppercase",
                }}>
                  Oracle Kolkata Community
                </span>
              </div>

              {/* Heading */}
              <h2 className="cs-heading-line" style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "clamp(40px, 5.5vw, 56px)",
                color: "#1a1a2e",
                letterSpacing: "0.02em",
                margin: 0,
                lineHeight: 1.1,
                fontWeight: 800,
              }}>
                Course Showcase
              </h2>
              <p style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: "15px",
                color: "#6b7280",
                margin: "14px 0 0",
                maxWidth: "440px",
                lineHeight: 1.7,
                fontWeight: 400,
              }}>
                Curated expert-led courses built for students, developers, architects, and DBAs across India.
              </p>
            </div>

            {/* Sort toggle */}
            <div style={{ display: "flex", gap: "8px", background: "rgba(0,0,0,0.02)", padding: "4px", borderRadius: "12px", border: "1px solid rgba(0,0,0,0.06)" }}>
              {[["rating", "⭐ Top Rated"], ["enrolled", "🔥 Most Popular"]].map(([val, label]) => (
                <button
                  key={val}
                  onClick={() => setSort(val)}
                  style={{
                    padding: "9px 18px",
                    borderRadius: "9px",
                    border: "none",
                    background: sort === val ? "#ffffff" : "transparent",
                    color: sort === val ? "#cc0000" : "#6b7280",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: 600,
                    fontSize: "12px",
                    cursor: "pointer",
                    boxShadow: sort === val ? "0 2px 8px rgba(0,0,0,0.06)" : "none",
                    transition: "all 0.2s",
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* ── Filter pills ── */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", marginBottom: "44px" }}>
            {TAGS.map(tag => (
              <button
                key={tag}
                className="cs-pill"
                onClick={() => setFilter(tag)}
                style={{
                  padding: "9px 20px",
                  borderRadius: "50px",
                  border: "1.5px solid",
                  borderColor: filter === tag ? "#cc0000" : "rgba(0,0,0,0.08)",
                  background: filter === tag ? "#cc0000" : "#ffffff",
                  color: filter === tag ? "#fff" : "#6b7280",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 600,
                  fontSize: "12px",
                  letterSpacing: "0.04em",
                  boxShadow: filter === tag ? "0 4px 16px rgba(204,0,0,0.15)" : "0 2px 8px rgba(0,0,0,0.03)",
                }}
              >
                {tag !== "All" && <span style={{ marginRight: "5px" }}>{TAG_ICONS[tag]}</span>}
                {tag}
              </button>
            ))}

            {/* Count */}
            <div style={{
              marginLeft: "auto",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "13px",
              color: "#6b7280",
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}>
              Showing
              <strong style={{ color: "#cc0000", fontSize: "16px" }}>{filtered.length}</strong>
              of {COURSES.length} courses
            </div>
          </div>

          {/* ── Course grid ── */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 320px), 1fr))",
            gap: "26px",
          }}>
            {filtered.map((course, i) => (
              <CourseCard key={course.id} course={course} index={i} />
            ))}
          </div>

          {/* ── View all ── */}
          <div style={{ textAlign: "center", marginTop: "64px" }}>
            {/* decorative line */}
            <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "32px" }}>
              <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, transparent, rgba(0,0,0,0.06))" }} />
              <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "11px", color: "rgba(0,0,0,0.25)", letterSpacing: "0.15em", textTransform: "uppercase" }}>Explore More</span>
              <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, rgba(0,0,0,0.06), transparent)" }} />
            </div>

            <button
              className="cs-view-all"
              style={{
                background: "transparent",
                border: "2px solid #cc0000",
                color: "#cc0000",
                padding: "16px 60px",
                borderRadius: "50px",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 700,
                fontSize: "13px",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                cursor: "pointer",
                boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
              }}
            >
              View All Courses
            </button>
          </div>

        </div>
      </section>
    </>
  );
}