import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar } from "react-bootstrap";

const Header = () => {
  return (
    <header>
      <Navbar>
        <LinkContainer to="/">
          <button>Home</button>
        </LinkContainer>
        <LinkContainer to="/password">
          <button>Password Generator</button>
        </LinkContainer>
        <LinkContainer to="/cipher">
          <button>Cipher Program</button>
        </LinkContainer>
      </Navbar>
    </header>
  );
};

export default Header;
