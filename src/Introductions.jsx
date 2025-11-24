import { useEffect, useState } from "react";

function Introductions() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "ITIS3135 | Introductions";

    fetch("https://dvonb.xyz/api/2025-fall/itis-3135/students?full=1")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to load student data");
        }
        return res.json();
      })
      .then((data) => {
        setStudents(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <main>
      <h2>Introductions</h2>

      {loading && <p>Loading students...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      <section className="intro-list">
        {students.map((student, index) => (
          <article className="intro-card" key={student.prefix ?? index}>

            {/* Left Image */}
            {student.media?.hasImage && (
              <img
                src={`https://dvonb.xyz${student.media.src}`}
                alt={student.media.caption || "Student"}
                className="intro-avatar"
              />
            )}

            {/* Right Content */}
            <div className="intro-content">

              <h3 className="intro-name">
                {student.name.first} {student.name.middleInitial} {student.name.last}
              </h3>

              {student.quote?.text && (
                <p className="intro-quote">
                  “{student.quote.text}” — {student.quote.author}
                </p>
              )}

              {/* Courses rendered as pills */}
              {student.courses && (
                <div className="intro-courses">
                  {student.courses.map((course, i) => (
                    <span className="intro-course-pill" key={i}>
                      {course.code} — {course.name}
                    </span>
                  ))}
                </div>
              )}

            </div>
          </article>
        ))}
      </section>



    </main>
  );
}




const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "1.5rem",
    marginTop: "2rem"
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    padding: "1.5rem",
    lineHeight: "1.5",
  },
  name: {
    marginBottom: "0.5rem"
  },
  mascot: {
    fontStyle: "italic",
    color: "#555"
  },
  figure: {
    margin: "1rem 0",
    textAlign: "center"
  },
  image: {
    maxWidth: "100%",
    borderRadius: "10px"
  },
  caption: {
    fontSize: "0.9rem",
    color: "#666"
  },
  quote: {
    marginTop: "1rem",
    paddingLeft: "1rem",
    borderLeft: "4px solid #ccc",
    fontStyle: "italic"
  },
  links: {
    paddingLeft: "1.2rem"
  },
  platform: {
    marginTop: "1rem",
    fontSize: "0.9rem",
    color: "#777"
  }
};

export default Introductions;
