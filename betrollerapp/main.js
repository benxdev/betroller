const startingAmount = document.getElementById("start-amount");
const totalOdds = document.getElementById("rolling-odds");
const totalBets = document.getElementById("total-bets");


export function getOutput() {
  BetRollerApp(startingAmount, totalOdds, totalBets, winIndex);
  let resultArray = BetRollerApp.rollBet();
  let outputAmount = resultArray[resultArray.length];
  return outputAmount;
}


document.getElementById("output-btn").addEventListener("click", changeOutputButton);

function changeOutputButton() {
  document.getElementById("output-btn").classList.add("hide");
  document.getElementById("win-percentage-btn").classList.remove("hide");
}
