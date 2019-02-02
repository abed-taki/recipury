import React from "react";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";

const About = () => {
  return (
    <div>
      <section className="home-hero">
        <Navbar />
      </section>
      <div className="container about">
        <p>It’s finally done!</p>
        <br />
        <p>
          {" "}
          It took way more than I thought, but I’m so happy I was able to finish
          it.
        </p>
        <br />
        <p>
          This is my first full stack app, and it helped me understand how
          things work and I feel I’ve become better using Express and
          React/Redux, specially redux, I was having a hard time keeping with
          reducers, types and actions, but using them every day million times
          throughout this project gave me the clarity I needed.{" "}
        </p>
        <p>
          First things first, I have to thank teachers and instructors who
          helped me start coding:
        </p>
        <br />
        <a
          href="https://twitter.com/jonasschmedtman"
          target="_blank"
          rel="noopener noreferrer"
        >
          Jonas Schmedtmann
        </a>
        <br />
        <p>
          His CSS and javascript course are just amazing, thanks to him I was
          able to level my CSS skills and create any layout I can think of
        </p>
        <br />
        <p>
          His Javascript course helped me understand how programming actually
          works and gave me all the knowledge I needed to start exploring and
          learning by myself.
        </p>
        <br />
        <a
          href="https://twitter.com/traversymedia"
          target="_blank"
          rel="noopener noreferrer"
        >
          Brad Traversy
        </a>
        <br />
        <p>
          His MERN stack course was my guide on this project, I watched it and
          followed along with him, and then went to plan my own app. I needed to
          go back to the course multiple times to see how he solved certain
          things, and his way of doing it was amazing, and it really helped me
          feel comfortable thinking about creating real apps.
        </p>
        <br />
        <p>Youtube:</p>
        <br />
        <p>
          Well, there are a lot of teachers on youtube, and I watch a lot of
          them, so thanks to all of you, who are doing tutorials and helping
          beginners out.
        </p>
        <p>About this project:</p>
        <br />
        <p> Design:</p>
        <br />
        <p>
          I designed the layout using Adobe Photoshop and Illustrator for the
          icons, I wanted to make it even better, but I got inpatient and wanted
          to start coding lol.
        </p>
        <p>Theme:</p>
        <br />
        <p>
          Created with HTML and SASS, no bootstrap or CSS grids, just flexbox.
        </p>
        <p>Back-end:</p>
        <br />
        <p>
          Node-Expres JS – I was scared to even come close to back-end because I
          though it’s complicated, and there is no way I can understand it when
          I haven’t even mastered front end stuff. However, I almost loved
          Express more than anything else, and I felt like a real developer lol.
        </p>
        <p>Database:</p>
        <br />
        <p>
          MongoDB – I still don’t know much about databases, but mongoDB seems
          like an easy one to start with, can’t wait to try other types.
        </p>
        <p>Front-end:</p>
        <br />
        <p>
          React and Redux: to be honest, I only picked react because it’s
          popular and everyone was talking about it ,but I actually liked it a
          lot. redux was kind of a pain to understand, but after using it every
          day, everything become clear
        </p>
        <br />
        Also, shootout to axios, I just love it.
      </div>

      <Footer />
    </div>
  );
};

export default About;
