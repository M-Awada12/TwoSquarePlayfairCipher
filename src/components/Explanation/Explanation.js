import React from "react";
import "./Explanation.css";

const Explanation = () => {
  return (
    <div>
      <div className="two-square-cipher-explanation">
        <h2 className="title">Two-Square Cipher Explanation</h2>

        <p>
          The two-square cipher is a manual symmetric encryption technique that
          encrypts pairs of letters (digraphs). It is a variant of the Playfair
          cipher, but uses two 5x5 matrices instead of one. The two matrices are
          constructed like the Playfair cipher with two different keywords.
        </p>

        <p>
          To encrypt a message, the two-square cipher proceeds digraph-wise. For
          each digraph, the cipher first forms a rectangle by finding the
          positions of the two characters in the two matrices. Then, the cipher
          encrypts the digraph by replacing the two characters with the two
          characters at the remaining two vertices of the rectangle.
        </p>

        <p>
          If the characters of the digraph fall in the same column, the digraph
          encrypts to itself. This is known as a "same column" encryption.
        </p>

        <p>
          Here is an example of how to encrypt the digraph using the two-square
          cipher:
        </p>

        <ol>
          <li>Build the two tables using the keys.</li>
          <li>Find the positions of the two characters in the two matrices.</li>
          <li>Form a rectangle by connecting the two positions.</li>
          <li>Encrypt the digraph by replacing the two characters with the two
            characters at the remaining two vertices of the rectangle.</li>
        </ol>

        <p>
          The decryption is the same but backwards.
        </p>

        <p>
          The two-square cipher is a more secure cipher than the Playfair cipher
          because it is more difficult to crack using frequency analysis, and it
          is also more complex to use. However, it is still a very simple encryption technique.
        </p>
      </div>
      <div className="two-square-cipher-explanation">
        <h2 className="title">Hill Cipher Explanation</h2>

        <p>
          The Hill cipher is a cryptographic algorithm used for encryption and decryption. It operates on blocks of text rather than individual
          characters and uses linear algebra concepts. Here's a simplified explanation:
        </p>

        <p>
          Key Generation:
          The sender chooses a matrix as the encryption key.
          This matrix should be invertible (having a determinant that is coprime to
          the modulus of the alphabet size used) and serves as the encoding mechanism.
        </p>

        <p>
          Encryption Process:
          The plaintext is broken into blocks, each block treated as a vector
          where each element represents a letter's numerical value in the chosen alphabet (e.g., A=0, B=1, etc.).
          Each block vector is multiplied by the encryption key matrix modulo the alphabet size to get the ciphertext vector.
        </p>

        <p>
          Decryption Process:
          The receiver uses the inverse of the encryption key matrix to reverse the transformation.
          The ciphertext vector is multiplied by the inverse key matrix modulo the alphabet size to obtain the original plaintext block.
        </p>

        <p>
          The security of the Hill cipher relies on the key matrix's
          properties and the chosen alphabet size. Larger matrices can
          enhance security by increasing the complexity of deciphering without the key.
        </p>

        <p>
          However, the Hill cipher is vulnerable to certain attacks, especially if the key matrix
          is not chosen carefully or if the length of the text is too short to prevent statistical
          analysis. Despite this, it was one of the earliest attempts at using matrix mathematics
          for encryption and laid the groundwork for more sophisticated algorithms.
        </p>
      </div>
    </div>
  );
};

export default Explanation;