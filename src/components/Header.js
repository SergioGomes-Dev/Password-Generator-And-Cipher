import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar } from "react-bootstrap";

const Header = () => {
  return (
    <header>
      <Navbar>
        <LinkContainer to="/">
          <button aria-label="Home Navigation">Home</button>
        </LinkContainer>
        <LinkContainer to="/password">
          <button aria-label="Password Generator Navigation">
            Password Generator
          </button>
        </LinkContainer>
        <LinkContainer to="/cipher">
          <button aria-label="Cipher Program Navigation">Cipher Program</button>
        </LinkContainer>
      </Navbar>
    </header>
  );
};

export default Header;
