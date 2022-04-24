import React, { useState } from "react";

const PasswordGeneratorScreen = () => {
  const [length, setLength] = useState(3);
  const [symbols, setSymbols] = useState(false);
  const [uppercase, setUppercase] = useState(false);
  const [lowercase, setLowercase] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [password, setPassword] = useState(
    "Generated Password Will Appear Here"
  );
  const [charsSpecial, setCharsSpecial] = useState('~!@#$%^&*()_+=[]{}";><?/');
  var isSelected = false;

  function submitHandler(e) {
    e.preventDefault();

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
    if (isSelected) {
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
  }

  function alertClick() {
    document.getElementById("alert").classList.add("hidden");
  }

  function symbolOptionsClick() {
    document.getElementById("edit-symbols").classList.toggle("hidden");
  }

  function editSymbols(e) {
    setCharsSpecial(e.target.value);
  }

  return (
    <>
      <div id="alert" className="alert hidden">
        <div className="alert-box">
          Generated password copied to clipboard
          <span className="closebtn" onClick={alertClick}>
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
                ></input>
              </td>
            </tr>
            <tr>
              <td>
                <p>Include Uppercase ( ex. ABCDEFG )</p>
              </td>
              <td>
                <input onClick={uppercaseClick} type="checkbox"></input>
              </td>
            </tr>
            <tr>
              <td>
                <p>Include Lowercase ( ex. abcdefg )</p>
              </td>
              <td>
                <input onClick={lowercaseClick} type="checkbox"></input>
              </td>
            </tr>
            <tr>
              <td>
                <p>Include Numbers ( ex. 1234567 )</p>
              </td>
              <td>
                <input onClick={numbersClick} type="checkbox"></input>
              </td>
            </tr>
            <tr>
              <td>
                <p>Include Symbols ( ex. ~!@#$% )</p>
                <button
                  id="options"
                  className="options"
                  onClick={symbolOptionsClick}
                >
                  Symbol Options
                </button>
              </td>
              <td>
                <input onClick={symbolsClick} type="checkbox"></input>
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
                ></input>
              </td>
            </tr>
            <button className="btn generate" onClick={submitHandler}>
              Generate
            </button>
            <div>
              <p>
                <u>Generated Password</u>
              </p>
              <p>
                <input
                  className="new-password"
                  type="text"
                  value={password}
                ></input>
              </p>
              <p>
                <button className="btn" onClick={copyClick}>
                  Copy
                </button>
              </p>
            </div>
          </table>
        </div>
      </div>
    </>
  );
};

export default PasswordGeneratorScreen;
