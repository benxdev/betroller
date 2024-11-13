/*    
 ABOUT THIS PROGRAM:
     1.   A rollover in sports betting involves staking a 'starting capital' or base amount on a fixed number of odds or price, 
          then restaking the profits made repeatedly. A technique used to 'grow' the money. Usually done for a fixed number of repitions.
          This program is intended to be used as an easy evaluation tool by someone intending to attempt a rollover bet or curious about all the numbers involved.

     2.   This program calculates the final amount after a fixed number of rollovers (iterations), given the starting capital, 
          a fixed number of odds, and the intended number of iterations. This program can be designed on demand to ensure there is a fixed upper limit of iterations.

     3.   This program will also store each potential winning amount at every step of the iteration in an array.

     4.   This progarm is able to retrieve select potential winnings on demand based on a given iteration number (accessible using array indexes).

     5.   This program will ensure to catch type errors during input.

     6.   This program will calculate the total amount staked at each iteration.

     7.   This program will calculate the total amount of money staked in the process. 
*/

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

// TESTING ALL METHODS WITH VARIOUS INPUTS
let roll = new BetRollerApp(3000, 1.5, 8, 6); // (startingAmount, odds, MaxBets, winAmountAt) 
console.log(roll.rollBet())
console.log(roll.findWinAt());
console.log(roll.findTotalStakes());
console.log(roll.findTotalProfit());
