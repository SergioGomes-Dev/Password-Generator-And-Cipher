import React from "react";
import { LinkContainer } from "react-router-bootstrap";

const Header = () => {
  return (
    <header>
      <LinkContainer to="/">
        <button>Home</button>
      </LinkContainer>
      <LinkContainer to="/password">
        <button>Password Generator</button>
      </LinkContainer>
      <LinkContainer to="/cipher">
        <button>Cipher Program</button>
      </LinkContainer>
    </header>
  );
};

export default Header;
