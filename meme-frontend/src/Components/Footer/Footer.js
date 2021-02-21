import React from "react";

import "./Footer.module.css";

const Footer = (props) => (
  <footer>
    <div>{props.title}</div>
    <p>{props.description}</p>
    <p>
      Made with ❤️ by
      <a className="footer-link" href="https://github.com/sjsouvik">
        Souvik
      </a>
    </p>
  </footer>
);

export default Footer;
