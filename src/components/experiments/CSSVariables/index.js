import React from "react";
import waterPoloArticle from "./img/article-waterpolo.jpg";
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import "./style.scss"
import {Header} from "../Header"

export const CSSVariables = () => {
  const handleChange = e => {
      const target = e.currentTarget
    const [name,value,sizing,checked] = [target.name,target.value,target.dataset.sizing,target.checked]
    let property = "";
    console.log("IOA",name,value,sizing,checked)
    switch (name) {
      case "size":
        property = [`--${name}`, value + sizing];
        break;
      case "social":
        property = [`--${name}`, checked ? "flex" : "none"];
        break;
      case "color":
        property = [`--${name}`, value];
        break;
      default:
        console.error("There is no case for",name);
    }

    document.querySelector(".body-cssvar").style.setProperty(...property);
  };

  return (
      <>
      <Header />
        <div className="body-cssvar">
      <header>
        <h1>
          Updating <span className="snippet">CSS</span> Variables with JS
        </h1>
        <div className="controls">
          <label for="size">Size</label>
          <input
            onChange={handleChange}
            type="range"
            name="size"
            min="26"
            max="60"
            data-sizing="em"
          />

          <label for="socials">Socials</label>
          <label for="socials" className="toggle">
            <input
            onChange={handleChange}
              name="social"
              type="checkbox"
              id="socials"
              className="toggle__input"
            />
            <span className="toggle__button"></span>
          </label>

          <label for="color">Color</label>
          <input onChange={handleChange} id="color" type="color" name="color"/>
        </div>
      </header>

      <main className="content">
        <section>
          <article>
            <img alt="Water polo players" src={waterPoloArticle} />
            <div className="article-content">
              <h2>Water polo team joined olimpics</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
          </article>
        </section>
        <aside>
          <LinkedInIcon />
          <GitHubIcon />
        </aside>
      </main>
    </div>
    </>
  );
};
