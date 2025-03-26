import React from "react";
import ThemeSwitcher from "./themeSwitcher";
import catStanding from "../assets/cat-standing.svg";
import catStudy from "../assets/cat-study.svg";

import { useState } from "react";
const Footer = () => {
  // Created a fun animation that I did not have the heart to remove. So why not leave it here. :)
  const [easterEggCat, setEasterEggCat] = useState(false);
  const startEasterEggCat = () => {
    if (easterEggCat) return;

    setEasterEggCat(true);

    setTimeout(() => {
      setEasterEggCat(false);
    }, 5000);
  };

  return (
    <>
      <div className="footer-cat-study-container">
        <img src={catStudy} alt="cat" className="footer-cat-study" />
        <img src={catStudy} alt="cat" className="footer-cat-study" />
      </div>
      <footer>
        {easterEggCat && (
          <img
            src={catStanding}
            alt="cat"
            className="cat-standing-easter-egg"
          />
        )}
        <div></div>
        <p onClick={startEasterEggCat}>
          Made with <span>❤️</span> by Ferenc
        </p>
        <div></div>
        <ThemeSwitcher />
      </footer>
    </>
  );
};

export default Footer;
