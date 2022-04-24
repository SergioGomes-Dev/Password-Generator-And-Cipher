import React from "react";

const Footer = () => {
  var date = new Date();
  var year = date.getFullYear();

  return <footer>Copyright &copy; {year} Michael Gomes</footer>;
};

export default Footer;
