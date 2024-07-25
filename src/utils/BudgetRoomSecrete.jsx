export const encodeKey = (key) => {
    return btoa(key);
};

export const decodeKey = (encodedKey) => {
    return atob(encodedKey);
};