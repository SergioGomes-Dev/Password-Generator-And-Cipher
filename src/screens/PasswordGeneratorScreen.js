import React, { useState } from "react";

const PasswordGeneratorScreen = () => {
  const [length, setLength] = useState(30);
  const [symbols, setSymbols] = useState(false);
  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [password, setPassword] = useState(
    "Generated Password Will Appear Here"
  );
  const [charsSpecial, setCharsSpecial] = useState('~!@#$%^&*()_+=[]{}";><?/');
  var isSelected = false;
  var error = false;

  function submitHandler(e) {
    e.preventDefault();

    //Error Handling
    if (length < 3) {
      console.log("Lower than 3");
      error = true;
      errorDisplay();
    } else if (length >= 3) {
      document
        .getElementById("generate-btn")
        .setAttribute(
          "aria-label",
          "Password has been generated, press again to generate new password"
        );
    }

    var charsLower = "abcdefghijklmnopqrstuvwxyz";
    var charsUpper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var charsNumbers = "0123456789";
    var charsSelected = "";

    if (symbols) {
      isSelected = true;
      charsSelected = charsSelected.concat(charsSpecial);
    }
    if (uppercase === true) {
      isSelected = true;
      charsSelected = charsSelected.concat(charsUpper);
    }
    if (lowercase === true) {
      isSelected = true;
      charsSelected = charsSelected.concat(charsLower);
    }
    if (numbers === true) {
      isSelected = true;
      charsSelected = charsSelected.concat(charsNumbers);
    }
    //If nothing is selected display message
    if (isSelected === false) {
      setPassword("Cannot leave selections blank");
    }

    //If atleast 1 option is selected generate password
    if (isSelected && error === false) {
      //Shuffles the entire possible chars list
      charsSelected = charsSelected
        .split("")
        .sort(function () {
          return 0.5 - Math.random();
        })
        .join("");

      //Shortens it to the selected length
      charsSelected = charsSelected.slice(0, length).toString();
      setPassword(charsSelected);
    }
  }

  function lengthChange(e) {
    //Can't set value higher than 30
    if (e.target.value <= 30) {
      setLength(e.target.value);
    }
  }

  function symbolsClick() {
    if (symbols === false) {
      setSymbols(true);
    } else {
      setSymbols(false);
    }
  }

  function uppercaseClick() {
    if (uppercase === false) {
      setUppercase(true);
    } else {
      setUppercase(false);
    }
  }

  function lowercaseClick() {
    if (lowercase === false) {
      setLowercase(true);
    } else {
      setLowercase(false);
    }
  }

  function numbersClick() {
    if (numbers === false) {
      setNumbers(true);
    } else {
      setNumbers(false);
    }
  }

  function copyClick() {
    navigator.clipboard.writeText(password);
    document.getElementById("alert").classList.remove("hidden");
    document.getElementById("closebtn").focus();
  }

  function alertClick() {
    document.getElementById("alert").classList.add("hidden");
    document.getElementById("copy-btn").focus();
  }

  function errorDisplay() {
    document.getElementById("error").classList.remove("hidden");
    document.getElementById("errorclosebtn").focus();
  }

  function errorClick() {
    document.getElementById("error").classList.add("hidden");
    document.getElementById("generate-btn").focus();
  }

  function symbolOptionsClick() {
    document.getElementById("edit-symbols").classList.toggle("hidden");

    var optionsExpanded = document
      .getElementById("options")
      .getAttribute("aria-expanded");

    if (optionsExpanded === "false") {
      document.getElementById("options").setAttribute("aria-expanded", "true");
    } else if (optionsExpanded === "true") {
      document.getElementById("options").setAttribute("aria-expanded", "false");
    }
  }

  function editSymbols(e) {
    setCharsSpecial(e.target.value);
  }

  return (
    <>
      <div id="alert" className="alert hidden">
        <div className="alert-box">
          Generated password copied to clipboard
          <span
            id="closebtn"
            className="closebtn"
            onClick={alertClick}
            onKeyPress={alertClick}
            tabIndex={0}
            aria-label="Password copied to clipboard, press to close alert"
          >
            {" "}
            &times;
          </span>
        </div>
      </div>
      <div id="error" className="alert hidden">
        <div className="alert-box">
          Password length cannot be lower than 3
          <span
            id="errorclosebtn"
            className="closebtn"
            onClick={errorClick}
            onKeyPress={errorClick}
            tabIndex={0}
            aria-label="Error, Password length cannot be lower than 3, press to close alert"
          >
            {" "}
            &times;
          </span>
        </div>
      </div>
      <div className="generator-box">
        <h2>Password Generator</h2>
        <div className="generator">
          <table>
            <tr>
              <td>
                <p>Password Length (3-30)</p>
              </td>
              <td>
                <input
                  onChange={lengthChange}
                  type="number"
                  min="3"
                  max="30"
                  value={length}
                  aria-label="Enter password length from 3 to 30"
                ></input>
              </td>
            </tr>
            <tr>
              <td>
                <p>Include Uppercase ( ex. ABCDEFG )</p>
              </td>
              <td>
                <input
                  onClick={uppercaseClick}
                  type="checkbox"
                  checked={uppercase}
                  aria-label="Include Uppercase Checkbox"
                ></input>
              </td>
            </tr>
            <tr>
              <td>
                <p>Include Lowercase ( ex. abcdefg )</p>
              </td>
              <td>
                <input
                  onClick={lowercaseClick}
                  type="checkbox"
                  checked={lowercase}
                  aria-label="Include Lowercase Checkbox"
                ></input>
              </td>
            </tr>
            <tr>
              <td>
                <p>Include Numbers ( ex. 1234567 )</p>
              </td>
              <td>
                <input
                  onClick={numbersClick}
                  type="checkbox"
                  checked={numbers}
                  aria-label="Include Numbers Checkbox"
                ></input>
              </td>
            </tr>
            <tr>
              <td>
                <p>Include Symbols ( ex. ~!@#$% )</p>
                <button
                  id="options"
                  className="options"
                  onClick={symbolOptionsClick}
                  aria-expanded="false"
                >
                  Symbol Options
                </button>
              </td>
              <td>
                <input
                  onClick={symbolsClick}
                  type="checkbox"
                  checked={symbols}
                  aria-label="Include Symbols Checkbox"
                ></input>
              </td>
            </tr>
            <tr id="edit-symbols" className="hidden">
              <td>
                Edit Symbols:
                <input
                  onChange={editSymbols}
                  className="edit-symbols"
                  type="text"
                  value={charsSpecial}
                  aria-label="Edit symbols character list"
                ></input>
              </td>
            </tr>
            <button
              id="generate-btn"
              className="btn generate"
              onClick={submitHandler}
              aria-label="Press to Generate Password"
            >
              Generate
            </button>
          </table>
          <div className="generated-password">
            <p>
              <u>Generated Password</u>
            </p>
            <p>
              <input
                className="new-password"
                type="text"
                value={password}
                aria-label="Generated Password is here"
              ></input>
            </p>
            <p>
              <button
                id="copy-btn"
                className="btn"
                onClick={copyClick}
                aria-label="Copy Password to clipboard"
              >
                Copy
              </button>
            </p>
          </div>
        </div>
      </div>
      <div className="info">
        <h1>Password Information</h1>
        <p>
          This service is entirely within the browser. We do not save any
          passwords
        </p>
        <p>
          Some websites only allow certain special characters. Click Symbol
          Options to customize the characters
        </p>
        <p>Do not use the same password for multiple sites</p>
        <p>We suggest you use passwords with atleast 16 characters</p>
        <p>
          Using short passwords makes you vulnerable to{" "}
          <a
            href="https://en.wikipedia.org/wiki/Brute-force_attack"
            target="_blank"
            rel="noreferrer"
          >
            bruteforce attacks
          </a>
        </p>
        <p>Do not let websites or web browsers save your passwords</p>
        <p>Do not use any words in your passwords</p>
        <p>
          Using words or phrases makes you vulnerable to{" "}
          <a
            href="https://en.wikipedia.org/wiki/Dictionary_attack"
            target="_blank"
            rel="noreferrer"
          >
            dictionary attacks
          </a>
        </p>
        <p>
          The most secure passwords are long and made up of random letters,
          numbers & special characters
        </p>
        <p>
          You can check if a service you have an account with has been breached{" "}
          <a
            href="https://haveibeenpwned.com/"
            target="_blank"
            rel="noreferrer"
          >
            here
          </a>
        </p>
        <p>If so immediately change your password</p>
      </div>
    </>
  );
};

export default PasswordGeneratorScreen;
