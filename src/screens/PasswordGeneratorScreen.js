import React from "react";

const PasswordGeneratorScreen = () => {
  return (
    <>
      <div className="generator-box">
        <h2>Password Generator</h2>
        <div className="generator">
          <table>
            <tr>
              <td>
                <p>Password Length (3-30)</p>
              </td>
              <td>
                <input type="number" min="3" max="30"></input>
              </td>
            </tr>
            <tr>
              <td>
                <p>Include Lowercase ( ex. abcdefg )</p>
              </td>
              <td>
                <input type="checkbox"></input>
              </td>
            </tr>
            <tr>
              <td>
                <p>Include Numbers ( ex. 1234567 )</p>
              </td>
              <td>
                <input type="checkbox"></input>
              </td>
            </tr>
            <tr>
              <td>
                <p>Include Symbols ( ex. ~!@#$% )</p>
              </td>
              <td>
                <input type="checkbox"></input>
              </td>
            </tr>
            <button className="btn">Generate</button>
            <div>
              <p>
                <u>Generated Password</u>
              </p>
              <p>
                <input className="new-password" type="text"></input>
              </p>
              <p>
                <button className="btn">Copy</button>
              </p>
            </div>
          </table>
        </div>
      </div>
    </>
  );
};

export default PasswordGeneratorScreen;
