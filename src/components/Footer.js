import React from "react";
import { LinkContainer } from "react-router-bootstrap";

const Footer = () => {
  var date = new Date();
  var year = date.getFullYear();

  return (
    <>
      <footer>Copyright &copy; {year} Michael Gomes</footer>
      <div className="footer-content">
        <LinkContainer to="/privacy">
          <button className="btn-footer">Privacy Policy</button>
        </LinkContainer>
      </div>
    </>
  );
};

export default Footer;
