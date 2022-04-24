import React, { useState } from "react";

const CipherProgramScreen = () => {
  const [cipher, setCipher] = useState("None");
  const [key, setKey] = useState(1);
  const [string, setString] = useState("");
  const [outputString, setOuputString] = useState("");
  const [vKey, setVKey] = useState("");
  const [vString, setVString] = useState("");
  const [vOutputString, setVOutputString] = useState("");
  var error = false;

  function click(e) {
    setCipher(e.target.value);
  }
  function keyChange(e) {
    if (cipher === "Caesar Cipher") {
      if (e.target.value >= -25 && e.target.value <= 25) {
        setKey(e.target.value);
      }
    } else if (cipher === "Vigenère Cipher") {
      setVKey(e.target.value.toUpperCase());
    }
  }
  function stringChange(e) {
    if (cipher === "Caesar Cipher") {
      setString(e.target.value);
    } else if (cipher === "Vigenère Cipher") {
      setVString(e.target.value.toUpperCase());
    }
  }
  function encipher() {
    if (cipher === "Caesar Cipher") {
      caesarCipher();
    } else if (cipher === "Vigenère Cipher") {
      if (error === false) {
        for (var i = 0; i < vKey.length; i++) {
          var char = vKey[i];
          if (char.match(/[a-z]/i)) {
            error = false;
          } else {
            error = true;
            errorDisplay();
            break;
          }
        }
      }
      if (error === false) {
        document
          .getElementById("encipher-btn")
          .setAttribute(
            "aria-label",
            "Text has been enciphered, press again to encipher text"
          );
        vigenèreCipher();
      }
    }
  }
  // var char= string[i];
  // char.match(/[a-z]/i)
  function caesarCipher() {
    var output = "";

    for (var i = 0; i < string.length; i++) {
      //The current character in the string
      var char = string[i];

      // The i is so Upper & Lowercase differences will be ignored
      if (char.match(/[a-z]/i)) {
        // Get characters code
        var charCode = string.charCodeAt(i);

        //If character is between A - Z
        if (charCode >= 65 && charCode <= 90) {
          var k = Number(key);
          // Add key amount to character
          charCode += k;
          // If charcode is passed Z
          if (charCode > 90) {
            charCode -= 26;
          }
          // If charcode is below A
          if (charCode < 65) {
            charCode += 26;
          }
          // Charcode back into Letter
          charCode = String.fromCharCode(charCode);
          // Add to output
          output = output.concat(charCode);
        }
        //If character is between a - z
        if (charCode >= 97 && charCode <= 122) {
          var k = Number(key);
          // Add key amount to character
          charCode += k;
          // If charcode is passed z
          if (charCode > 122) {
            charCode -= 26;
          }
          // If charcode is below a
          if (charCode < 97) {
            charCode += 26;
          }
          // Charcode back into Letter
          charCode = String.fromCharCode(charCode);
          // Add to output
          output = output.concat(charCode);
        }
      } else {
        // If character is not a letter add to ouput
        output = output.concat(char);
      }
    }
    setOuputString(output);
  }

  function vigenèreCipher() {
    var keyIndex = 0;
    var output = "";

    for (var i = 0; i < vString.length; i++) {
      // The current character in the string
      var char = vString[i];

      // The i is so Upper & Lowercase differences will be ignored
      if (char.match(/[a-z]/i)) {
        // Get characters code
        var charCode = vString.charCodeAt(i);

        //If character is between A - Z
        if (charCode >= 65 && charCode <= 90) {
          var result = "";
          // Get key characters code
          var keyChar = vKey.charCodeAt(keyIndex);
          // Vigenère logic
          result = keyChar - 65 + charCode;
          // If charcode if above Z
          if (result > 90) {
            result = result - 26;
          }
          // Charcode back into Letter
          result = String.fromCharCode(result);
          // Add to output
          output = output.concat(result);
        }
        //Controls Key Index
        if (keyIndex >= vKey.length - 1) {
          keyIndex = 0;
        } else {
          keyIndex += 1;
        }
      } else {
        // If character is not a letter add to output
        output = output.concat(char);
      }
    }
    setVOutputString(output);
  }

  function copyClick() {
    if (cipher === "Caesar Cipher") {
      navigator.clipboard.writeText(outputString);
    } else if (cipher === "Vigenère Cipher") {
      navigator.clipboard.writeText(vOutputString);
    }

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
    document.getElementById("encipher-btn").focus();
    error = false;
  }

  return (
    <>
      <div id="alert" className="alert hidden">
        <div className="alert-box">
          Enciphered text copied to clipboard
          <span
            id="closebtn"
            className="closebtn"
            onClick={alertClick}
            onKeyPress={alertClick}
            tabIndex={0}
            aria-label="Enciphered Text copied to clipboard, press to close alert"
          >
            &times;
          </span>
        </div>
      </div>
      <div id="error" className="alert hidden">
        <div className="alert-box">
          You can only use letters in the Key
          <span
            id="errorclosebtn"
            className="closebtn"
            onClick={errorClick}
            onKeyPress={errorClick}
            tabIndex={0}
            aria-label="Error, you can only use letters in the Key, Press to close alert"
          >
            &times;
          </span>
        </div>
      </div>
      <div className="cipher-box">
        <h2>Cipher Program</h2>
        <h3>Pick a Cipher</h3>
        <table className="cipher-selection">
          <tr>
            <td>
              Caesar Cipher
              <input
                onClick={click}
                type="radio"
                name="cipher"
                value="Caesar Cipher"
                aria-label="Caesar Cipher Radio Button"
              ></input>
            </td>
            <td>
              Vigenère cipher
              <input
                onClick={click}
                type="radio"
                name="cipher"
                value="Vigenère Cipher"
                aria-label="Vigenère Cipher Radio Button"
              ></input>
            </td>
          </tr>
        </table>
        <div className="cipher-content">
          <h2>Cipher Selected: {cipher} </h2>
          {cipher === "Caesar Cipher" && (
            <>
              <table>
                <tr>
                  <td>Key:</td>
                  <td>
                    <input
                      className="key"
                      onChange={keyChange}
                      type="number"
                      min="-25"
                      max="25"
                      value={key}
                      aria-label="Pick a key between -25 to 25"
                    ></input>
                  </td>
                </tr>
                <tr>
                  <td>String:</td>
                  <td>
                    <input
                      className="cipher-string"
                      onChange={stringChange}
                      type="text"
                      placeholder="Enter your string here"
                      value={string}
                    ></input>
                  </td>
                </tr>
                <tr>
                  <td>Output:</td>
                  <td>
                    <input
                      className="cipher-string"
                      type="text"
                      value={outputString}
                      placeholder="Output will appear here"
                    ></input>
                  </td>
                </tr>
              </table>
              <button
                id="encipher-btn"
                onClick={encipher}
                className="encipher btn"
                aria-label="Press to Encipher text"
              >
                Encipher
              </button>
              <button id="copy-btn" className="copy btn" onClick={copyClick}>
                Copy
              </button>
            </>
          )}
          {cipher === "Vigenère Cipher" && (
            <>
              <table>
                <tr>
                  <td>Key:</td>
                  <td>
                    <input
                      className="cipher-string"
                      onChange={keyChange}
                      type="text"
                      placeholder="Enter your key here"
                      value={vKey}
                    ></input>
                  </td>
                </tr>
                <tr>
                  <td>String:</td>
                  <td>
                    <input
                      className="cipher-string"
                      onChange={stringChange}
                      type="text"
                      placeholder="Enter your string here"
                      value={vString}
                    ></input>
                  </td>
                </tr>
                <tr>
                  <td>Output:</td>
                  <td>
                    <input
                      className="cipher-string"
                      type="text"
                      value={vOutputString}
                      placeholder="Output will appear here"
                    ></input>
                  </td>
                </tr>
              </table>
              <button
                id="encipher-btn"
                onClick={encipher}
                className="encipher btn"
              >
                Encipher
              </button>
              <button id="copy-btn" className="copy btn" onClick={copyClick}>
                Copy
              </button>
            </>
          )}
        </div>
      </div>
      {cipher === "Caesar Cipher" && (
        <div className="info">
          <h1>Caesar Cipher Information</h1>
          <p>The Caesar cipher is also known as a shift cipher</p>
          <p>
            It is one of the most simple and widely known encryption techniques
            needing only a piece of paper and a pen
          </p>
          <p>
            Each letter in a string of text is replaced by a letter a certain
            number(key) of positions down or up the alphabet
          </p>
          <p>
            For Example: ABC with a Key of 1 would become BCD but ABC with a Key
            of 3 would become DEF
          </p>
          <p>
            The name originates with Julius Caesar who used this method for his
            letters.
          </p>
          <p>
            For more in-depth information click{" "}
            <a
              href="https://en.wikipedia.org/wiki/Caesar_cipher"
              target="_blank"
              rel="noreferrer"
            >
              here
            </a>
          </p>
        </div>
      )}
      {cipher === "Vigenère Cipher" && (
        <div className="info">
          <h1>Vigenère Cipher Information</h1>
          <p>The Vigenère Cipher is more complex than the Caesar Cipher</p>
          <p>It uses a polyalphabetic substitution(uses multiple alphabets)</p>
          <p>
            A table of alphabets is used called a{" "}
            <a
              href="https://en.wikipedia.org/wiki/File:Vigen%C3%A8re_square_shading.svg"
              target="_blank"
              rel="noreferrer"
            >
              tabula recta
            </a>
          </p>
          <p>
            It has the alphabet written out 26 times in different rows in
            different positions
          </p>
          <p>
            The Key is used to modify the string and is repeated until the
            string is complete
          </p>
          <p>
            For example: If the string is NEVER HAVE I EVER and the Key is HELLO
          </p>
          <p>
            The string has 14 characters therefore the key needs to be the same
          </p>
          <p>The result is HELLOHELLOHELL</p>
          <p>
            For more in-depth information click{" "}
            <a
              href="https://en.wikipedia.org/wiki/Vigen%C3%A8re_cipher"
              target="_blank"
              rel="noreferrer"
            >
              here
            </a>
          </p>
          <p></p>
        </div>
      )}
    </>
  );
};

export default CipherProgramScreen;
