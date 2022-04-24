import React, { useState } from "react";

const CipherProgramScreen = () => {
  const [cipher, setCipher] = useState("None");
  const [key, setKey] = useState(1);
  const [string, setString] = useState("");
  const [outputString, setOuputString] = useState("");
  const [vKey, setVKey] = useState("");
  const [vString, setVString] = useState("");
  const [vOutputString, setVOutputString] = useState("");

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
      vigenèreCipher();
    }
  }
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
  }

  function alertClick() {
    document.getElementById("alert").classList.add("hidden");
  }

  return (
    <>
      <div id="alert" className="alert hidden">
        <div className="alert-box">
          Enciphered text copied to clipboard
          <span className="closebtn" onClick={alertClick}>
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
              ></input>
            </td>
            <td>
              Vigenère cipher
              <input
                onClick={click}
                type="radio"
                name="cipher"
                value="Vigenère Cipher"
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
                    ></input>
                  </td>
                </tr>
              </table>
              <button onClick={encipher} className="encipher btn">
                Encipher
              </button>
              <button className="copy btn" onClick={copyClick}>
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
                    ></input>
                  </td>
                </tr>
              </table>
              <button onClick={encipher} className="encipher btn">
                Encipher
              </button>
              <button className="copy btn" onClick={copyClick}>
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
