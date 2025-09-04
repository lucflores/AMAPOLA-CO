import storage from "../services/storage.js";
const KEY = "dark-mode";


export function initDarkMode(dom) {
const on = storage.getJSON(KEY, false);
document.body.classList.toggle("dark", on);
dom.switchBtn?.classList.toggle("active", on);
dom.switchBtn?.addEventListener("click", () => {
const isDark = document.body.classList.toggle("dark");
dom.switchBtn.classList.toggle("active", isDark);
storage.setJSON(KEY, isDark);
});
}