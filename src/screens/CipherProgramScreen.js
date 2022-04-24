import React, { useState } from "react";

const CipherProgramScreen = () => {
  const [cipher, setCipher] = useState("None");
  const [key, setKey] = useState(1);
  const [string, setString] = useState("");
  const [outputString, setOuputString] = useState("");

  function click(e) {
    setCipher(e.target.value);
  }
  function keyChange(e) {
    setKey(e.target.value);
  }
  function stringChange(e) {
    setString(e.target.value);
  }
  function encipher() {
    caesarCipher();
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

  return (
    <>
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
          <table>
            <tr>
              <td>Key(-25, 25):</td>
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
          <button className="copy btn">Copy</button>
        </div>
      </div>
    </>
  );
};

export default CipherProgramScreen;
