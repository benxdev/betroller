const startingAmount = document.getElementById("start-amount");
const totalOdds = document.getElementById("rolling-odds");
const totalBets = document.getElementById("total-bets");

BetRollerApp(startingAmount, totalOdds, totalBets, winIndex);
let resultArray = BetRollerApp.rollBet();
// let finalAmount = resultArray[resultArray.length];
let finalAmount = 545;


document.getElementById("output-btn").addEventListener("click", changeOutputButton);

function changeOutputButton() {
  document.getElementById("output-btn").classList.add("hide");
  document.getElementById("win-percentage-btn").classList.remove("hide");
  document.getElementById("output").classList.remove("hide");
  document.getElementById("output").innerHTML = finalAmount;
}


// BEGINNING OF CLASS DEFINITION
class BetRollerApp { 
  constructor(startingAmount, totalOdds, totalBets, winIndex) {
      this.startingAmount = startingAmount;  //  Starting capital or initial stake.
      this.firstStake = startingAmount;   //  First stake amount. Holds the same value as this.startingAmount but unaltered.
      this.totalOdds = totalOdds;   //  Total odds or price.
      this.totalBets = totalBets;   //  Total number of bet iterations. Intended to be a fixed maximun amount.
      this.winIndex = winIndex;     //   Index of the winning amount in the array.
      this.winnings = [];            // Array to hold all potential winnings at each iteration.
      this.winningsAsInts = [];    // Array to store all potenial winnings at each iteration as Integers (to be used for array evaluations).
      this.indexAt;
  };
  isNotValid = function () {  //   Intended to check for errors resulting through invalid input types (inc. strings, null, undefined, negative numbers) and no inputs at all.
      return (
          this.firstStake < 0 || this.firstStake == undefined || this.firstStake == null || _.isString(this.firstStake) == true ||
          this.startingAmount < 0 || this.startingAmount == undefined || this.startingAmount == null || _.isString(this.startingAmount) == true ||
          this.totalOdds <= 0 || this.totalOdds == undefined || this.totalOdds == null || _.isString(this.totalOdds) == true ||
          this.totalBets < 0 || this.totalBets == undefined || this.totalBets == null || _.isString(this.totalBets) == true ||
          this.winIndex <= 0 || this.winIndex == undefined || this.winIndex == null || _.isString(this.winIndex) == true
      )
  };
  rollBet = function () {
      if (this.isNotValid()) {  // Checks for input errors and returns error message.
          return "ERROR: Invalid / Incomplete Input Value";
      }  else {
          for (let i = 1; i <= this.totalBets; i++) {  //  Loop from he first iteration to the intended  number of iterations. Or max iterations.
              this.startingAmount = Math.floor(this.startingAmount * this.totalOdds);    // Calculates the new amount after each iteration.
              this.winnings.push(`${i}. ₦${this.startingAmount}`);     //  Stores the new amount in the array. 
              this.winningsAsInts.push(this.startingAmount);
          }
      }
      return this.winningsAsInts, this.winnings;
  };
  findWinAt = function () {   // Returns the winning amount at a user-specified iteration level. 
      if (this.isNotValid()) {  // Checks for input errors and returns error message.
          return "ERROR: Invalid / Incomplete Input Value";
      }
      else if (this.totalBets >= 0 && this.winIndex <= this.totalBets) {
          return this.winnings.at(this.winIndex - 1);
      } else {
          return `ERROR: Max Number of bets (${this.totalBets}) is less than ${this.winIndex}`;   // Returns if the required index is greater than the total number of games.
      }
  };
  findTotalStakes = function() { // When called, should find the grand total of all stakes to be made across all iterations. // Making use of winningsAsInts array.
      let totalStakes = 0;
      if (this.isNotValid()) {  // Checks for input errors and returns error message.
          return "ERROR: Invalid / Incomplete Input Value";
      }  else {
          for (let i = 0; i < this.winningsAsInts.length - 1; i++) {
              totalStakes += this.winningsAsInts[i];   // Generates all stakes made accross all iterations including the initial staking capital.
          }
      }
      return `₦${totalStakes + this.firstStake}`;
  };
  findTotalProfit = function() { // When called, should find the grand total of all net profit to be made after all iterations. // Making use of winningsAsInts array.
      if (this.isNotValid()) {  // Checks for input errors and returns error message.
          return "ERROR: Invalid / Incomplete Input Value";
      }  else {
          let totalProfit = this.winningsAsInts[this.winningsAsInts.length - 1] - this.firstStake;    // May use the variable later.
          return `₦${totalProfit}`;
      }
  }
} // END OF CLASS DEFINITION  
