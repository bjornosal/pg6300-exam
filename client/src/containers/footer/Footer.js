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
        to="/leaderboard"
        header={"Leaderboard"}
        description="Quick description of /leaderboard"
      />

      <FooterLink
        to="/game"
        header="Game"
        description="Quick description of /game"
      />
    </div>
  );
}
