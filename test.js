const encodeKey = (key) => {
    return btoa(key);
};

const decodeKey = (encodedKey) => {
    return atob(encodedKey);
};

const originalKey = 'mySecretKey123';
const encodedKey = encodeKey(originalKey);
console.log('Encoded Key:', typeof (encodedKey), encodedKey); // Outputs: bXlTZWNyZXRLZXkxMjM=

const decodedKey = decodeKey("bXlTZWNyZXRLZXkxMjM=");
console.log('Decoded Key:', decodedKey);