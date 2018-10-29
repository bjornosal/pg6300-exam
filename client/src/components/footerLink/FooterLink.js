import React from "react";
import { Link } from "react-router-dom";
import { string } from 'prop-types'

export default function FooterLink({to, header, description}) {
    return (
        <div className="footerLinkContainer">
            <Link to={to}>{header}</Link>
            <p>{description}</p>
        </div>
    );
}

FooterLink.propTypes = {
    to: string,
    header: string,
    description: string
}