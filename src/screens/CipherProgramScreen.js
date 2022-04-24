import React from "react";

const CipherProgramScreen = () => {
  return (
    <>
      <div className="cipher-box">
        <h2>Cipher Program</h2>
        <h3>Pick a Cipher</h3>
        <table className="cipher-selection">
          <tr>
            <td>
              Caesar Cipher
              <input type="radio" name="cipher"></input>
            </td>
            <td>
              Vigenère cipher
              <input type="radio" name="cipher"></input>
            </td>
          </tr>
        </table>
        <div className="cipher-content">
          <h2>Cipher Selected: </h2>
          <table>
            <tr>
              <td>Key:</td>
              <td>
                <input className="key" type="number" min="-25" max="25"></input>
              </td>
            </tr>
            <tr>
              <td>String:</td>
              <td>
                <input
                  className="cipher-string"
                  type="text"
                  placeholder="Enter your string here"
                ></input>
              </td>
            </tr>
            <tr>
              <td>Output:</td>
              <td>
                <input className="cipher-string" type="text"></input>
              </td>
            </tr>
          </table>
          <button className="encipher btn">Encipher</button>
          <button className="copy btn">Copy</button>
        </div>
      </div>
    </>
  );
};

export default CipherProgramScreen;
