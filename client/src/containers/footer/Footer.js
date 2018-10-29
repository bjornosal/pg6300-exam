import React from "react";
import FooterLink from "../../components/footerLink/FooterLink"

export default function Footer() {
  return (
    <div className="footerContainer">
      <FooterLink
        to="/home"
        header="Home"
        description="Quick description of /home"
      />
      
      <FooterLink
        to="/highscore"
        header={"Highscore"}
        description="Quick description of /highscore"
      />

      <FooterLink
        to="/game"
        header="Game"
        description="Quick description of /game"
      />
    </div>
  );
}
