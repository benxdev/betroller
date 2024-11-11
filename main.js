document.getElementById("output-btn").addEventListener("click", changeOutputButton);

function changeOutputButton() {
  document.getElementById("output-btn").classList.add("hide");
  document.getElementById("win-percentage-btn").classList.remove("hide");
}
