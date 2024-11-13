export function rollBet(startingAmount, totalOdds, totalBets) {
    let winnings = [];
    let winningsAsInts = [];

    for (let i = 1; i <= totalBets; i++) {  //  Loop from he first iteration to the intended  number of iterations. Or max iterations.
            startingAmount = Math.floor(startingAmount * totalOdds);    // Calculates the new amount after each iteration.
            winningsAsInts.push(startingAmount);
        }
    return winningsAsInts;
}
