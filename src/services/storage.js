const storage = {
getJSON(key, fallback) {
try {
const raw = localStorage.getItem(key);
return raw ? JSON.parse(raw) : fallback;
} catch (e) {
console.error("storage.getJSON", e);
return fallback;
}
},
setJSON(key, value) {
localStorage.setItem(key, JSON.stringify(value));
},
remove(key) {
localStorage.removeItem(key);
}
};
export default storage;