import React, { useEffect, useState } from "react";
import "../styles/style.css";
import GitHubIcon from "@mui/icons-material/GitHub";
import SettingsIcon from "@mui/icons-material/Settings";
function Navbar({ darkMode, setDarkMode }) {
  const [open, setOpen] = useState<boolean>(false);
  const [bigLetter, setBigLetter] = useState<boolean>(JSON.parse(localStorage.getItem("bigLetter"))[0].bigLetter || false);
  useEffect(() => {
    localStorage.setItem("bigLetter", JSON.stringify([{ bigLetter: bigLetter }]));
    localStorage.setItem("darkMode", JSON.stringify([{ darkMode: darkMode }]));
  }, [darkMode,bigLetter]);
  const css = `.setting-icon{
    transform: rotate(-50deg);
  }
  .menu{
    top:0vh;
}
  `;
  const bigLetterCss = `
  body{
    font-size:1.3rem;
  }
  `;
  const darkModeCss = `
  .note-app{
    color: rgb(255, 255, 255); 
    background: #252525;  
  }
  .menu{
    background: #555555; 
    box-shadow: rgba(255, 255, 255, 0.07) 0px 1px 2px, rgba(255, 255, 255, 0.07) 0px 2px 4px, rgba(255, 255, 255, 0.07) 0px 4px 8px, rgba(255, 255, 255, 0.07) 0px 8px 16px, rgba(255, 255, 255, 0.07) 0px 16px 32px, rgba(255, 255, 255, 0.07) 0px 32px 64px;
  }
  .note{
    box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(255, 255, 255, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(153, 153, 153, 0.07) 0px 32px 64px;
  }
  `;
  return (
    <div class="navbar">
      <div class="setting-icon">
        <SettingsIcon onClick={() => setOpen(!open)} />
      </div>
      {open && <style>{css}</style>}
      {bigLetter && <style>{bigLetterCss}</style>}
      {darkMode && <style>{darkModeCss}</style>}
      <div class="menu">
        <div>
          <input
            type="checkbox"
            onClick={() => setDarkMode(!darkMode)}
            checked={darkMode && true}/>{" "}
          Dark Mode
        </div>
        <br />
        <div>
          <input
            type="checkbox" 
            onClick={() => setBigLetter(!bigLetter)}
          checked={bigLetter && true}/>{" "}
          big Letter
        </div>
        <br />
        <a style={{ color: "black" }} href="https://github.com/akram12affou">
          <GitHubIcon />
        </a>
      </div>
    </div>
  );
}

export default Navbar;
