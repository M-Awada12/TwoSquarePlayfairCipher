import React, { useState } from "react";
import "./Landing.css";

function Landing() {

  const [alphabetMatrix1, setAlphabetMatrix1] = useState([["A", "B", "C", "D", "E"], ["F", "G", "H", "I", "K"], ["L", "M", "N", "O", "P"], ["Q", "R", "S", "T", "U"], ["V", "W", "X", "Y", "Z"]]);
  const [alphabetMatrix2, setAlphabetMatrix2] = useState([["A", "B", "C", "D", "E"], ["F", "G", "H", "I", "K"], ["L", "M", "N", "O", "P"], ["Q", "R", "S", "T", "U"], ["V", "W", "X", "Y", "Z"]]);
  const [cipher, setCipher] = useState('');
  const [plain, setPlain] = useState('');
  const [option, setOption] = useState("Encrypt");
  const [cipherIndex, setCipherIndex] = useState([[-1, -1], [-1, -1]]);
  const [plainIndex, setPlainIndex] = useState([[-1, -1], [-1, -1]]);


  function isAlphabetical(character) {
    const letterRegex = /^[a-zA-Z]$/;
    return letterRegex.test(character);
  }



  function handleChange(e, num) {
    if (num == '1') {
      setAlphabetMatrix1(generateAlphabetMatrix(e.target.value));
      setCipher(twoSquarePlayfair(plain, generateAlphabetMatrix(e.target.value), alphabetMatrix2));
    }
    else if (num == '2') {
      setAlphabetMatrix2(generateAlphabetMatrix(e.target.value));
      setCipher(twoSquarePlayfair(plain, alphabetMatrix1, generateAlphabetMatrix(e.target.value)));
    }
    else if (num == 'plain') {
      setPlain(e.target.value);
      setCipher(twoSquarePlayfair(e.target.value, alphabetMatrix1, alphabetMatrix2));
    }
  }



  function generateAlphabetMatrix(key) {
    const alphabet = 'ABCDEFGHIKLMNOPQRSTUVWXYZ';

    let result = Array.from(key).reduce((acc, character) => {

      if (isAlphabetical(character)) {
        if (character.toUpperCase() == "J") {
          character = "I";
        }

        if (!acc.includes(character.toUpperCase())) {
          acc.push(character.toUpperCase());
        }
      }
      return acc;
    }, []);

    Array.from(alphabet).map((character) => {
      if (isAlphabetical(character)) {
        if (!result.includes(character)) {
          result.push(character);
        }
      }
    })

    result = result.join('');

    const alphabetMatrix = Array.from({ length: 5 }, (_, rowIndex) =>
      Array.from({ length: 5 }, (_, colIndex) =>
        result.charAt(rowIndex * 5 + colIndex)
      )
    );

    return alphabetMatrix;
  }



  function generateTable(alphabetMatrix, num) {

    if (num == '1') {
      return (
        <div className="alphabet-table-container">
          <table className="alphabet-table">
            <tbody>
              {alphabetMatrix.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((letter, colIndex) => (
                    (letter == plainIndex[0]) ?
                      (
                        <td className="table-slot highlight green" key={colIndex}>{letter}</td>
                      )
                      :
                      (
                        (letter == cipherIndex[0]) ?
                          (
                            <td className="table-slot highlight blue" key={colIndex}>{letter}</td>
                          )
                          :
                          (
                            <td className="table-slot" key={colIndex}>{letter}</td>
                          )
                      )
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>);
    }
    else {
      return (
        <div className="alphabet-table-container">
          <table className="alphabet-table">
            <tbody>
              {alphabetMatrix.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((letter, colIndex) => (
                    (letter == plainIndex[1]) ?
                      (
                        <td className="table-slot highlight green" key={colIndex}>{letter}</td>
                      )
                      :
                      (
                        (letter == cipherIndex[1]) ?
                          (
                            <td className="table-slot highlight blue" key={colIndex}>{letter}</td>
                          )
                          :
                          (
                            <td className="table-slot" key={colIndex}>{letter}</td>
                          )
                      )
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>);
    }
  }



  function convertStringToArray(plain) {

    let str = '';

    Array.from(plain).map((character) => {
      if (isAlphabetical(character)) {
        str += character.toUpperCase();
      }
    })

    if (str.length % 2 !== 0) {
      str += 'X';
    }

    const resultArray = [];
    for (let i = 0; i < str.length; i += 2) {
      resultArray.push(str.slice(i, i + 2));
    }

    return resultArray;
  }


  function findCharacterPosition(char, table) {
    if (char == "J") {
      char = "I";
    }
    for (let row = 0; row < table.length; row++) {
      for (let col = 0; col < table[row].length; col++) {
        if (table[row][col] === char) {
          return { row: row, column: col };
        }
      }
    }
  }



  function twoSquarePlayfair(plain, alphabetMatrix1, alphabetMatrix2) {

    let plainArray = convertStringToArray(plain);
    let location1 = {};
    let location2 = {};
    let result = '';
    let returnValue = '';

    plainArray.map((slot) => {
      location1 = findCharacterPosition(slot[0], alphabetMatrix1)
      location2 = findCharacterPosition(slot[1], alphabetMatrix2)
      result += alphabetMatrix1[location1['row']][location2['column']];
      result += alphabetMatrix2[location2['row']][location1['column']];
    })

    let index = 0;

    Array.from(plain).map((character) => {
      if (isAlphabetical(character)) {
        returnValue += result.charAt(index);
        index = index + 1;
      }
      else if (character == '\n') {
        returnValue += '\n';
      }
      else {
        returnValue += character;
      }
    })

    return returnValue;

  }


  const handleCellHover = (index) => {
    if (index || (index == 0)) {
      let plainArray = convertStringToArray(plain);
      let cipherArray = convertStringToArray(cipher);
      setPlainIndex([plainArray[index][0], plainArray[index][1]]);
      setCipherIndex([cipherArray[index][0], cipherArray[index][1]]);
    }
    else {
      setCipherIndex([[-1, -1], [-1, -1]]);
      setPlainIndex([[-1, -1], [-1, -1]]);
    }
  };

  function chunkArray(array, size) {
    const chunkedArray = [];
    for (let i = 0; i < array.length; i += size) {
      chunkedArray.push(array.slice(i, i + size));
    }
    return chunkedArray;
  }

  function plainCipherTable() {
    const plainArray = convertStringToArray(plain);
    const cipherArray = convertStringToArray(cipher);

    // Split the plain and cipher arrays into chunks of 5
    const chunkedPlainArray = chunkArray(plainArray, 5);
    const chunkedCipherArray = chunkArray(cipherArray, 5);

    return (
      <div className="plainciphertable">
        <div className="alphabet-table-container">
          {chunkedPlainArray.map((chunk, chunkIndex) => (
            <div className="separate">
              <table
                key={chunkIndex}
                className="alphabet-table2">
                <thead>
                  <tr>
                    <td>Plaintext</td>
                    {chunk.map((item, index) => (
                      <td
                        onMouseEnter={() => handleCellHover(index + chunkIndex * 5)}
                        onMouseLeave={() => handleCellHover(null)}
                        key={index + chunkIndex * 5}
                      >
                        {item}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td>Ciphertext</td>
                    {chunkedCipherArray[chunkIndex].map((item, index) => (
                      <td
                        onMouseEnter={() => handleCellHover(index + chunkIndex * 5)}
                        onMouseLeave={() => handleCellHover(null)}
                        key={index + chunkIndex * 5}
                      >
                        {item}
                      </td>
                    ))}
                  </tr>
                </thead>
              </table>
            </div>
          ))}
        </div>
      </div>
    );
  }



  return (
    <div>
      <div className="awesome-container">
        <div className="center-container">

          <div className="cool-input-container">
            <label className="awesome-label">Encrypt/Decrypt</label>
            <select className="awesome-input" onChange={(e) => setOption(e.target.value)}>
              <option value="Encrypt">Encrypt</option>
              <option value="Decrypt">Decrypt</option>
            </select>
          </div>

          <div className="cool-input-container">
            <label className="awesome-label">Key 1</label>
            <input placeholder="Key 1" className="awesome-input" onChange={(e) => handleChange(e, '1')} />
          </div>

          <div className="cool-input-container">
            <label className="awesome-label">Key 2</label>
            <input placeholder="Key 2" className="awesome-input" onChange={(e) => handleChange(e, '2')} />
          </div>

          <div className="cool-input-container">
            <label className="awesome-label">{option == "Encrypt" ? "Plaintext" : "Ciphertext"}</label>
            <textarea
              placeholder={option === "Encrypt" ? "Plaintext" : "Ciphertext"}
              className="awesome-input"
              onChange={(e) => handleChange(e, 'plain')}
              style={{ width: '250px', overflow: 'auto', resize: 'none' }}
            />
          </div>

          <div className="result-container">
            <label className="awesome-label">{option != "Encrypt" ? "Plaintext" : "Ciphertext"}</label>
            <div className="result-label" style={{ whiteSpace: 'pre-line', overflow: 'auto', maxWidth: '250px' }}>
              {cipher ? cipher : "None"}
            </div>
          </div>
        </div>
      </div>
      <div className="blue-line" />
      <div className="table-container">
        {plain ? plainCipherTable() : null}
        <div className="table1">
          <label className="awesome-label alphabet-table">Key Tables:</label>
          {generateTable(alphabetMatrix1, '1')}
        </div>
        <div className="table2">
          {generateTable(alphabetMatrix2, '2')}
        </div>
      </div>

    </div>
  );
}

export default Landing;
