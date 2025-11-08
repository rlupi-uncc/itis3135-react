import headshot from "./assets/professional-photo.jpg";

function Introduction() {
    return (
      <main>
        <h2>Introduction</h2>
        <h3>Randall Lupi | Raging Lemur</h3>
        <figure>
          <img
            src={headshot}
            alt="Professional headshot of Randall Lupi"
            style={{ maxWidth: "200px" }}
          />
          <figcaption>Headshot of Randall Lupi</figcaption>
        </figure>
        <ul>
          <li>
            <h3>Personal Background</h3>
            <p>
              I grew up in New Mexico, and moved to Charlotte for school. I grew up
              playing football and running track, so I'm a huge fan of sports and staying
              active. I also played the violin for over 10 years, so music is a big part
              of my life as well. My favorite thing about computer science is being
              presented with a difficult problem, and putting the pieces together to
              solve it.
            </p>
          </li>
          <li>
            <h3>Professional Background</h3>
            <p>
              I am currently a data science intern with the U.S department of homeland
              security, where I have worked for a little over a year now. This summer, I
              also had the opportunity to join Amazon over the summer as an SDE intern in
              NYC.
            </p>
          </li>
          <li>
            <h3>Academic Background</h3>
            <p>
              I am a senior at UNC Charlotte, majoring in Computer Science with a
              concentration in Software Engineering. I plan to graduate with my BS degree
              in May 2026.
            </p>
          </li>
          <li>
            <h3>Primary Computer</h3>
            <p>
              I use an Apple MacBook (Silica M1) laptop, and primarily work from home or
              the library if I'm between classes.
            </p>
          </li>
          <li>
            <h3>Current Courses</h3>
            <ul>
              <li>
                ITIS 4350 - Design Prototyping: I'm taking this to learn more about
                building a good user experience.
              </li>
              <li>
                ITIS 5122 - Penetration Testing & Secure Programming: I'm hoping to learn
                how to build secure, stable, reliable applications.
              </li>
              <li>
                ITCS 5180 - Mobile Application Development: I'm taking this to gain more
                insight into how industry professionals build mobile applications.
              </li>
            </ul>
          </li>
          <li>
            <h3>Funny/Interesting Thing</h3>
            <p>
              A memorable item of mine is a first edition, holographic, base set Charizard
              card that I opened with my brother in 2010.
            </p>
          </li>
        </ul>
        <div className="quote-section">
          <p className="quote">“Listen boys… Sometimes there comes a time in a man’s time”</p>
          <p className="quote-author"><em>- Coach Flemming, My HS football coach</em></p>
        </div>
      </main>
    );
  }
  export default Introduction;
  