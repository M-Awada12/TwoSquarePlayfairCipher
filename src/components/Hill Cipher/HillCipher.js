import React, { useState } from "react";
import "./HillCipher.css";

function HillCipher() {

    const [plaintext, setPlaintext] = useState('');
    const [ciphertext, setCiphertext] = useState('');
    const [keyMatrixSize, setKeyMatrixSize] = useState(2);
    const [keyMatrix, setKeyMatrix] = useState([
        [1, 1],
        [1, 1],
    ]);
    const [option, setOption] = useState("Encrypt");
    const [validKey, setValidKey] = useState(false);

    const gcd = (a, b) => {
        if (!b) {
            return a;
        }
        return gcd(b, a % b);
    };

    const modInverse = (a, m) => {
        let d;
        for (let x = 1; x < m; x++) {
            d = (a * x) % m;
            if (d < 0)
            {
                d = d + m;
            }
            if (d === 1) {
                return x;
            }
        }
        return 1;
    };

    function isValidKey(keyMatrix) {
        const keySize = keyMatrix.length;

        if (keySize !== keyMatrix[0].length) {
            return false;
        }

        if (keySize !== 2 && keySize !== 3) {
            return false;
        }

        if (keySize === 2) {
            const determinant = keyMatrix[0][0] * keyMatrix[1][1] - keyMatrix[0][1] * keyMatrix[1][0];

            if (modInverse(determinant, 26) == 1) {
               return false;
            }
        }

        if (keySize === 3) {
            const detA =
                keyMatrix[0][0] * (keyMatrix[1][1] * keyMatrix[2][2] - keyMatrix[1][2] * keyMatrix[2][1]);
            const detB =
                keyMatrix[0][1] * (keyMatrix[1][0] * keyMatrix[2][2] - keyMatrix[1][2] * keyMatrix[2][0]);
            const detC =
                keyMatrix[0][2] * (keyMatrix[1][0] * keyMatrix[2][1] - keyMatrix[1][1] * keyMatrix[2][0]);
            const determinant = (detA - detB + detC) % 26;

            if (determinant === 0) {
                return false;
            }
        }

        return true;
    };

    function hillCipherDecryption(keyMatrix, ciphertext) {
        const keySize = keyMatrix.length;

        const text = ciphertext.toLowerCase().replace(/[^a-z]/g, '');
        const textArray = [...text].map((char) => char.charCodeAt(0) - 97);

        while (textArray.length % keySize !== 0) {
            ciphertext += "x";
            textArray.push(23);
        }

        let result = '';
        let inverseMatrix;

        if (keySize === 2) {
            const determinant = keyMatrix[0][0] * keyMatrix[1][1] - keyMatrix[0][1] * keyMatrix[1][0];
            const detInverse = modInverse(determinant, 26);

            inverseMatrix = [
                [keyMatrix[1][1], -keyMatrix[0][1]],
                [-keyMatrix[1][0], keyMatrix[0][0]],
            ];

            inverseMatrix.forEach((row, i) => {
                row.forEach((val, j) => {
                    inverseMatrix[i][j] = (val * detInverse) % 26;
                    if (inverseMatrix[i][j] < 0) {
                        inverseMatrix[i][j] += 26;
                    }
                });
            });
        } else if (keySize === 3) {
            const detA =
                keyMatrix[0][0] * (keyMatrix[1][1] * keyMatrix[2][2] - keyMatrix[1][2] * keyMatrix[2][1]);
            const detB =
                keyMatrix[0][1] * (keyMatrix[1][0] * keyMatrix[2][2] - keyMatrix[1][2] * keyMatrix[2][0]);
            const detC =
                keyMatrix[0][2] * (keyMatrix[1][0] * keyMatrix[2][1] - keyMatrix[1][1] * keyMatrix[2][0]);

            const determinant = (detA - detB + detC) % 26;
            const detInverse = modInverse(determinant, 26);

            inverseMatrix = [
                [
                    (keyMatrix[1][1] * keyMatrix[2][2] - keyMatrix[1][2] * keyMatrix[2][1]) * detInverse,
                    (keyMatrix[0][2] * keyMatrix[2][1] - keyMatrix[0][1] * keyMatrix[2][2]) * detInverse,
                    (keyMatrix[0][1] * keyMatrix[1][2] - keyMatrix[0][2] * keyMatrix[1][1]) * detInverse,
                ],
                [
                    (keyMatrix[1][2] * keyMatrix[2][0] - keyMatrix[1][0] * keyMatrix[2][2]) * detInverse,
                    (keyMatrix[0][0] * keyMatrix[2][2] - keyMatrix[0][2] * keyMatrix[2][0]) * detInverse,
                    (keyMatrix[0][2] * keyMatrix[1][0] - keyMatrix[0][0] * keyMatrix[1][2]) * detInverse,
                ],
                [
                    (keyMatrix[1][0] * keyMatrix[2][1] - keyMatrix[1][1] * keyMatrix[2][0]) * detInverse,
                    (keyMatrix[0][1] * keyMatrix[2][0] - keyMatrix[0][0] * keyMatrix[2][1]) * detInverse,
                    (keyMatrix[0][0] * keyMatrix[1][1] - keyMatrix[0][1] * keyMatrix[1][0]) * detInverse,
                ],
            ];

            inverseMatrix.forEach((row, i) => {
                row.forEach((val, j) => {
                    inverseMatrix[i][j] = val % 26;
                    if (inverseMatrix[i][j] < 0) {
                        inverseMatrix[i][j] += 26;
                    }
                });
            });
        } else {
            return 'Error: Unsupported key matrix size. Only 2x2 and 3x3 matrices are supported.';
        }

        for (let i = 0; i < textArray.length; i += keySize) {
            const vector = textArray.slice(i, i + keySize);
            const decryptedVector = inverseMatrix.map((row) =>
                row.reduce((acc, val, j) => acc + val * vector[j], 0) % 26
            );

            decryptedVector.forEach((num) => {
                result += String.fromCharCode((num % 26) + 97);
            });
        }

        setCiphertext(preserveCharacters(ciphertext, result.toUpperCase()));
    };

    function encrypt(plaintext, keyMatrix) {
        const text = plaintext.toLowerCase().replace(/[^a-z]/g, '');
        const n = keyMatrix.length;
        const textArray = [];

        for (let i = 0; i < text.length; i++) {
            const charCode = text.charCodeAt(i) - 97;
            textArray.push(charCode);
        }

        while (textArray.length % n !== 0) {
            plaintext += "x";
            textArray.push(23);
        }

        const result = [];
        for (let i = 0; i < textArray.length; i += n) {
            const vector = textArray.slice(i, i + n);

            for (let j = 0; j < n; j++) {
                let sum = 0;
                for (let k = 0; k < n; k++) {
                    sum += keyMatrix[j][k] * vector[k];
                }
                result.push(sum % 26);
            }
        }

        const encryptedText = result.map((num) => String.fromCharCode(num + 97)).join('');
        setCiphertext(preserveCharacters(plaintext, encryptedText.toUpperCase()));
    };

    function isAlphabetical(character) {
        const letterRegex = /^[a-zA-Z]$/;
        return letterRegex.test(character);
    }

    function preserveCharacters(plain, result) {

        let returnValue = "";
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

    const handlekeyMatrixSizeChange = (event) => {
        const newSize = parseInt(event.target.value);
        setKeyMatrixSize(newSize);
        const newkeyMatrix = Array.from({ length: newSize }, () =>
            Array.from({ length: newSize }, () => 1)
        );
        setKeyMatrix(newkeyMatrix);
        if (isValidKey(newkeyMatrix)) {
            setValidKey(true);
            if (option == "Encrypt") {
                encrypt(plaintext, newkeyMatrix);
            }
            else {
                hillCipherDecryption(newkeyMatrix, plaintext);
            }
        }
        else {
            setValidKey(false);
            setCiphertext('');
        }

    };

    const handleInputChange = (event, rowIdx, colIdx) => {
        const value = event.target.value;
        const newkeyMatrix = keyMatrix.map((row, r) =>
            row.map((col, c) =>
                r === rowIdx && c === colIdx ? (value ? parseFloat(value) : 1) : col
            )
        );
        setKeyMatrix(newkeyMatrix);
        if (isValidKey(newkeyMatrix)) {
            setValidKey(true);
            if (option == "Encrypt") {
                encrypt(plaintext, newkeyMatrix);
            }
            else {
                hillCipherDecryption(newkeyMatrix, plaintext);
            }
        }
        else {
            setValidKey(false);
            setCiphertext('');
        }
    };


    function handleChangePlain(e) {
        setPlaintext(e.target.value);
        if (isValidKey(keyMatrix)) {
            setValidKey(true);
            if (option == "Encrypt") {
                encrypt(e.target.value, keyMatrix);
            }
            else {
                hillCipherDecryption(keyMatrix, e.target.value);
            }
        }
        else {
            setValidKey(false);
            setCiphertext('');
        }
    }

    function changeOption(e) {
        setOption(e.target.value);
        if (isValidKey(keyMatrix)) {
            setValidKey(true);
            if (e.target.value == "Encrypt") {
                encrypt(plaintext, keyMatrix);
            }
            else {
                hillCipherDecryption(keyMatrix, plaintext);
            }
        }
        else {
            setValidKey(false);
            setCiphertext('');
        }
    }

    return (
        <div>
            <div className="awesome-container">
                <div className="center-container">

                    <div className="cool-input-container">
                        <label className="awesome-label">Encrypt/Decrypt</label>
                        <select className="awesome-input" onChange={(e) => changeOption(e)}>
                            <option value="Encrypt">Encrypt</option>
                            <option value="Decrypt">Decrypt</option>
                        </select>
                    </div>

                    <div className="result-container">
                        <label className="awesome-label">Key:</label>
                        <select className="awesome-input" style={{ 'marginBottom': "20px" }} value={keyMatrixSize} onChange={handlekeyMatrixSizeChange}>
                            <option value={2}>2x2</option>
                            <option value={3}>3x3</option>
                        </select>

                        <table>
                            <tbody>
                                {keyMatrix.map((row, rowIndex) => (
                                    <tr key={rowIndex}>
                                        {row.map((col, colIndex) => (
                                            <td key={colIndex}>
                                                <input
                                                    className="awesome-input2"
                                                    type="number"
                                                    value={keyMatrix[rowIndex][colIndex]}
                                                    onChange={(event) =>
                                                        handleInputChange(event, rowIndex, colIndex)
                                                    }
                                                />
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {validKey ? <label>The key is valid</label> : <label>Please enter a valid key</label>}
                    </div>

                    <div>
                        <div className="cool-input-container">
                            <label className="awesome-label">{option == "Encrypt" ? "Plaintext" : "Ciphertext"}</label>
                            <textarea
                                placeholder={option === "Encrypt" ? "Plaintext" : "Ciphertext"}
                                className="awesome-input"
                                onChange={(e) => handleChangePlain(e)}
                                style={{ width: '250px', overflow: 'auto', resize: 'none' }}
                            />
                        </div>

                        <div className="result-container">
                            <label className="awesome-label">{option != "Encrypt" ? "Plaintext" : "Ciphertext"}</label>
                            <div className="result-label" style={{ whiteSpace: 'pre-line', overflow: 'auto', maxWidth: '250px' }}>
                                {ciphertext ? ciphertext : "None"}
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    );
}

export default HillCipher;
