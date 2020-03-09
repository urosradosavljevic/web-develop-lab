import React, { useRef } from "react";
import {FaGithub}  from "react-icons/fa"
import {FaFacebook}  from "react-icons/fa"
import {FaLinkedin}  from "react-icons/fa"
import "./style.scss";
import { Header } from "../Header";

export const FollowAlongNav = () => {
  const dropdownBackground = useRef(null);
  const nav = useRef(null);

  const handleEnter = e => {
    const element = e.currentTarget;
    element.classList.add("drowdown-enter");

    setTimeout(() => {
      element.classList.contains("drowdown-enter") &&
        element.classList.add("drowdown-enter-active");
    }, 100);
    dropdownBackground.current.classList.add("open");

    const dropdown = element.querySelector(".dropdown");
    const dropdownRect = dropdown.getBoundingClientRect();
    const navRect = nav.current.getBoundingClientRect();

    dropdownBackground.current.style.setProperty(
      "width",
      `${dropdownRect.width}px`
    );
    dropdownBackground.current.style.setProperty(
      "height",
      `${dropdownRect.height}px`
    );
    dropdownBackground.current.style.transform = `translate(${dropdownRect.left - navRect.left}px, ${dropdownRect.top - navRect.top}px)`;
  };

  const handleLeave = e => {
    const element = e.currentTarget;
    dropdownBackground.current.classList.remove("open");
    element.classList.remove("drowdown-enter");
    element.classList.remove("drowdown-enter-active");
  };

  return (
    <>
      <Header />

      <main className="body-followalong">
        <header>
          <nav ref={nav} className="top">
            <div
              ref={dropdownBackground}
              className="drop-down-background"
            ></div>

            <ul className="links">
              <li onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
                <button type="button">About Me</button>
                <div className="dropdown dropdown-first">
                  <div className="bio">
                    <header>
                      <img
                        src="https://avatars2.githubusercontent.com/u/24296402?s=460&v=4"
                        alt="Website Author"
                      />
                      <h3>Uroš Radosavljević</h3>
                    </header>
                    <p>
                      Relying on the power of React.js in combination with other
                      front-end development magic.
                    </p>
                    <main>
                      <section>
                        <h4>Web Develop Skils</h4>
                        <ul>
                          <li>
                            <span className="icon"></span>HTML5
                          </li>
                          <li>
                            <span className="icon"></span>CSS3
                          </li>
                          <li>
                            <span className="icon"></span>SCSS
                          </li>
                          <li>
                            <span className="icon"></span>ReactJS
                          </li>
                          <li>
                            <span className="icon"></span>MaterialUI
                          </li>
                          <li>
                            <span className="icon"></span>Javascript
                          </li>
                        </ul>
                      </section>
                      <section>
                        <h4>Web Design Software Skils</h4>
                        <ul>
                          <li>
                            <span className="icon"></span>Adobe Illustrator
                          </li>
                          <li>
                            <span className="icon"></span>Adobe Photoshop
                          </li>
                          <li>
                            <span className="icon"></span>Adobe Xd
                          </li>
                        </ul>
                      </section>
                    </main>
                  </div>
                </div>
              </li>

              <li onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
                <button type="button">Work</button>
                <div className="dropdown dropdown-second">
                  <div className="projects">
                    <header>
                      <h4>Recent Projects</h4>
                    </header>
                    <ul>
                      <li>
                        <span className="icon"></span>
                        <a href="https://urosradosavljevic.github.io/VanillaJS-E-commerce-WebSite/index.html">
                          VanilaJS E-Commerce Store
                        </a>
                      </li>
                      <li>
                        <span className="icon"></span>
                        <a href="https://react-hotel-resort-app.netlify.com/">
                          Hotel Resort Website
                        </a>
                      </li>
                      <li>
                        <span className="icon"></span>
                        <a href="https://todoist-clone-app.netlify.com/">
                          Todoist clone Application
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>

              <li onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
                <button type="button">Social</button>
                <div className="dropdown dropdown-third">
                  <div className="socials">
                    <header>
                      <h4>Let's get connected</h4>
                    </header>
                    <ul>
                      <li>
                        <a href="https://www.facebook.com/misvteoih">
                          <FaFacebook />
                        </a>
                      </li>
                      <li>
                        <a href="https://www.linkedin.com/in/uros-radosavljevic/">
                          <FaGithub />
                        </a>
                      </li>
                      <li>
                        <a href="https://github.com/urosradosavljevic">
                          <FaLinkedin />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
            </ul>
          </nav>
        </header>
          <div className="hover-title"><span>Hover</span><span>over</span></div>
      </main>
    </>
  );
};
