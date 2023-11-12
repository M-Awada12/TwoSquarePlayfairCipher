import React from "react";
import "./TwoSquareCipherExplanation.css";

const TwoSquareCipherExplanation = () => {
  return (
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
  );
};

export default TwoSquareCipherExplanation;