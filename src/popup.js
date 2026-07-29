const popup = document.querySelector(".popup");
const popupBackdrop = document.querySelector(".popup__backdrop")
const popupParagraph = document.querySelector(".popup p")

const mostrarPopup = (msg) => {
  popup.classList.add("show");
  popupBackdrop.classList.add("show");
  
  popupParagraph.textContent = msg;

  popupBackdrop.addEventListener("click", ocultarPopup);
}
const ocultarPopup = () => {
  popup.classList.remove("show");
  popupBackdrop.classList.remove("show");
}