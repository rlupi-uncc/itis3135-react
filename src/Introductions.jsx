import { useEffect, useState } from "react";

function Introductions() {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [nameSearch, setNameSearch] = useState("");

  // Display Toggles
  const [showName, setShowName] = useState(true);
  const [showMascot, setShowMascot] = useState(true);
  const [showImage, setShowImage] = useState(true);
  const [showPersonal, setShowPersonal] = useState(true);
  const [showBackgrounds, setShowBackgrounds] = useState(true);
  const [showClasses, setShowClasses] = useState(true);
  const [showExtra, setShowExtra] = useState(true);
  const [showQuote, setShowQuote] = useState(true);
  const [showLinks, setShowLinks] = useState(true);

  // Slideshow
  const [slideshow, setSlideshow] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    document.title = "ITIS3135 | Introductions";

    fetch("https://dvonb.xyz/api/2025-fall/itis-3135/students?full=1")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load student data");
        return res.json();
      })
      .then((data) => {
        setStudents(data);
        setFilteredStudents(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Update filtered list when searching
  useEffect(() => {
    const result = students.filter((s) => {
      const fullName = `${s.name.first} ${s.name.middleInitial ?? ""} ${s.name.last}`;
      return fullName.toLowerCase().includes(nameSearch.toLowerCase());
    });

    setFilteredStudents(result);
    setSlideIndex(0);
  }, [nameSearch, students]);

  const nextSlide = () => {
    setSlideIndex((i) => (i + 1) % filteredStudents.length);
  };

  const prevSlide = () => {
    setSlideIndex((i) =>
      i - 1 < 0 ? filteredStudents.length - 1 : i - 1
    );
  };

  // Render a single student card
  const renderStudent = (s, index) => (
    <article className="intro-card" key={index}>
      {/* IMAGE */}
      {showImage && s.media?.hasImage && (
        <img
          src={`https://dvonb.xyz${s.media.src}`}
          alt={s.media.caption || "Student"}
          className="intro-avatar"
        />
      )}

      <div className="intro-content">
        {/* FIXED NAME + MASCOT LOGIC */}
        <h3>
          {/* Name */}
          {showName && (
            <>
              {s.name.first}{" "}
              {s.name.middleInitial && s.name.middleInitial + ". "}
              {s.name.last}
            </>
          )}

          {/* Divider appears only when both name & mascot are showing */}
          {showName && showMascot && s.divider && ` ${s.divider} `}

          {/* Mascot */}
          {showMascot && s.mascot}
        </h3>

        {/* PERSONAL STATEMENT */}
        {showPersonal && <p>{s.personalStatement}</p>}

        {/* BACKGROUNDS */}
        {showBackgrounds && (
          <ul>
            <li><strong>Personal:</strong> {s.backgrounds.personal}</li>
            <li><strong>Professional:</strong> {s.backgrounds.professional}</li>
            <li><strong>Academic:</strong> {s.backgrounds.academic}</li>
            <li><strong>Subject:</strong> {s.backgrounds.subject}</li>
          </ul>
        )}

        {/* CLASSES */}
        {showClasses && (
          <div className="intro-courses">
            {s.courses.map((c, i) => (
              <span className="intro-course-pill" key={i}>
                {c.dept ?? c.code} {c.num} — {c.name}
              </span>
            ))}
          </div>
        )}

        {/* EXTRA */}
        {showExtra && (
          <>
            <p><strong>Computer:</strong> {s.platform.device} ({s.platform.os})</p>
            <p><strong>Fun Fact:</strong> {s.funFact}</p>
            <p><strong>Additional Info:</strong> {s.additional}</p>
          </>
        )}

        {/* QUOTE */}
        {showQuote && s.quote?.text && (
          <p className="intro-quote">
            “{s.quote.text}” — {s.quote.author}
          </p>
        )}

        {/* LINKS */}
        {showLinks && (
          <p>
            <a href={s.links.charlotte} target="_blank">CLT Web</a> ·{" "}
            <a href={s.links.github} target="_blank">GitHub</a>
          </p>
        )}
      </div>
    </article>
  );

  return (
    <main>
      <h2>Enhanced Introductions</h2>

      {loading && <p>Loading students...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {/* SEARCH BAR */}
      <label>
        Search:&nbsp;
        <input
          type="text"
          value={nameSearch}
          onChange={(e) => setNameSearch(e.target.value)}
        />
      </label>

      {/* COUNT */}
      <p><strong>Found {filteredStudents.length} Introductions</strong></p>

      {/* FILTER CHECKBOXES */}
      <section className="filters">
        <h3>Display Options</h3>

        <label><input type="checkbox" checked={showName} onChange={() => setShowName(!showName)} /> Name</label><br/>
        <label><input type="checkbox" checked={showMascot} onChange={() => setShowMascot(!showMascot)} /> Mascot</label><br/>
        <label><input type="checkbox" checked={showImage} onChange={() => setShowImage(!showImage)} /> Image</label><br/>
        <label><input type="checkbox" checked={showPersonal} onChange={() => setShowPersonal(!showPersonal)} /> Personal Statement</label><br/>
        <label><input type="checkbox" checked={showBackgrounds} onChange={() => setShowBackgrounds(!showBackgrounds)} /> Backgrounds</label><br/>
        <label><input type="checkbox" checked={showClasses} onChange={() => setShowClasses(!showClasses)} /> Classes</label><br/>
        <label><input type="checkbox" checked={showExtra} onChange={() => setShowExtra(!showExtra)} /> Extra Info</label><br/>
        <label><input type="checkbox" checked={showQuote} onChange={() => setShowQuote(!showQuote)} /> Quote</label><br/>
        <label><input type="checkbox" checked={showLinks} onChange={() => setShowLinks(!showLinks)} /> Links</label><br/>

        <button onClick={() => setSlideshow(!slideshow)}>
          {slideshow ? "Show All" : "Start Slideshow"}
        </button>
      </section>

      {/* SLIDESHOW MODE */}
      {slideshow && filteredStudents.length > 0 && (
        <section className="slideshow">
          <button onClick={prevSlide}>◀ Prev</button>
          <button onClick={nextSlide}>Next ▶</button>

          {renderStudent(filteredStudents[slideIndex], slideIndex)}
        </section>
      )}

      {/* LIST MODE */}
      {!slideshow && (
        <section className="intro-list">
          {filteredStudents.map((student, i) => renderStudent(student, i))}
        </section>
      )}
    </main>
  );
}

export default Introductions;
