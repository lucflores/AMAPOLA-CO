export function toastOk(title) {
Swal.fire({ position: "center", icon: "success", title, showConfirmButton: false, timer: 1000 });
}
export function toastError(title) {
Swal.fire({ position: "center", icon: "error", title, showConfirmButton: false, timer: 2000 });
}
export function info(title, text) {
return Swal.fire({ title, icon: "info", text });
}
export function confirm(title, opts = {}) {
return Swal.fire({
title,
icon: "info",
showCancelButton: true,
confirmButtonText: "Sí",
cancelButtonText: "No",
confirmButtonColor: "green",
cancelButtonColor: "red",
...opts,
});
}