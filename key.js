// --- SCRIPT TO GENERATE YOUR FINAL PASSWORD ---

// Key A: The full, exact message from your audio file.
const audioKey =
  "01010100 01101000 01100101 00100000 01101011 01100101 01111001 00100000 01101001 01110011 00100000 01110100 01101000 01100101 00100000 01101000 01100001 01101110 01100100 The key is the hand that was not clapping 00100000 01110100 01101000 01100001 01110100 00100000 01110111 01100001 01110011 00100000 01101110 01101111 01110100 00100000 01100011 01101100 01100001 01110000 01110000 01101001 01101110 01100111";

// Key B: The string from your anomalous SVG ID.
const xorKey = "550";

// Perform the repeating key XOR operation.
let rawXorResult = "";
for (let i = 0; i < audioKey.length; i++) {
  // Get the character codes for the current characters in both keys.
  const audioCharCode = audioKey.charCodeAt(i);
  const xorCharCode = xorKey.charCodeAt(i % xorKey.length); // The key repeats

  // XOR the codes and convert the result back to a character.
  const resultCharCode = audioCharCode ^ xorCharCode;
  rawXorResult += String.fromCharCode(resultCharCode);
}

// THE FINAL STEP: Encode the raw, messy result into a clean Base64 string.
const finalPassword = btoa(rawXorResult);

// This is the password you will put in your backend code.
console.log("Your CORRECT_PASSWORD is:", finalPassword);
