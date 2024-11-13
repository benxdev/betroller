

// BEGINNING OF CLASS DEFINITION


export const BetRollerApp = {
    constructor (startingAmount, totalOdds, totalBets){
        let startingAmount;  //  Starting capital or initial stake.
        let firstStake;   //  First stake amount. Holds the same value as startingAmount but unaltered.
        let totalOdds;   //  Total odds or price.
        let totalBets;   //  Total number of bet iterations. Intended to be a fixed maximun amount.
        let winIndex;     //   Index of the winning amount in the array.
        let winnings = [];            // Array to hold all potential winnings at each iteration.
        let winningsAsInts = [];    // Array to store all potenial winnings at each iteration as Integers (to be used for array evaluations).

    },

    isNotValid: function () {  //   Intended to check for errors resulting through invalid input types (inc. strings, null, undefined, negative numbers) and no inputs at all.
        return (
            firstStake < 0 || firstStake == undefined || firstStake == null || _.isString(firstStake) == true ||
            startingAmount < 0 || startingAmount == undefined || startingAmount == null || _.isString(startingAmount) == true ||
            totalOdds <= 0 || totalOdds == undefined || totalOdds == null || _.isString(totalOdds) == true ||
            totalBets < 0 || totalBets == undefined || totalBets == null || _.isString(totalBets) == true ||
            winIndex <= 0 || winIndex == undefined || winIndex == null || _.isString(winIndex) == true
        )
    },

    rollBet: function () {
        if (isNotValid()) {  // Checks for input errors and returns error message.
            return "ERROR: Invalid / Incomplete Input Value";
        }  else {
            for (let i = 1; i <= totalBets; i++) {  //  Loop from he first iteration to the intended  number of iterations. Or max iterations.
                startingAmount = Math.floor(startingAmount * totalOdds);    // Calculates the new amount after each iteration.
                winnings.push(`${i}. ₦${startingAmount}`);     //  Stores the new amount in the array. 
                winningsAsInts.push(startingAmount);
            }
        }
        return winningsAsInts, winnings;
    },

    findWinAt: function () {   // Returns the winning amount at a user-specified iteration level. 
        if (isNotValid()) {  // Checks for input errors and returns error message.
            return "ERROR: Invalid / Incomplete Input Value";
        }
        else if (totalBets >= 0 && winIndex <= totalBets) {
            return winnings.at(winIndex - 1);
        } else {
            return `ERROR: Max Number of bets (${totalBets}) is less than ${winIndex}`;   // Returns if the required index is greater than the total number of games.
        }
    },

    findTotalStakes: function() { // When called, should find the grand total of all stakes to be made across all iterations. // Making use of winningsAsInts array.
        let totalStakes = 0;
        if (isNotValid()) {  // Checks for input errors and returns error message.
            return "ERROR: Invalid / Incomplete Input Value";
        }  else {
            for (let i = 0; i < winningsAsInts.length - 1; i++) {
                totalStakes += winningsAsInts[i];   // Generates all stakes made accross all iterations including the initial staking capital.
            }
        }
        return `₦${totalStakes + firstStake}`;
    },

    findTotalProfit: function() { // When called, should find the grand total of all net profit to be made after all iterations. // Making use of winningsAsInts array.
        if (isNotValid()) {  // Checks for input errors and returns error message.
            return "ERROR: Invalid / Incomplete Input Value";
        }  else {
            let totalProfit = winningsAsInts[winningsAsInts.length - 1] - firstStake;    // May use the variable later.
            return `₦${totalProfit}`;
        }
    }
} // END OF CLASS DEFINITION  



let roll = new BetRollerApp(1000, 2, 5);
roll.rollBet()


















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