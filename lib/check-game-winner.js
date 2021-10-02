/**
 *
 * @param {Array} moves represents all moves the player has made
 * @param {Array} currentMove the coordiates of the current move
 * @param {String} marker signifies the current player
 * @returns won if the game is won or draw if it ends in a tie
 */
const findWinner = (moves, currentMove, marker) => {
    try {
        if (Array.isArray(moves) && Array.isArray(currentMove)) {
            let status;
            if (moves.length >= 2) {
                //Add the current move to the moves with player has made
                moves.push(currentMove);
                // Find all cells were the x and y coordinates and not same
                let nonSymmetricCells = moves.filter(
                    (cell) => cell[0] !== cell[1]
                );
                if (nonSymmetricCells.length === 0) {
                    status = "won";
                }

                if (nonSymmetricCells.length === 1) {
                    // nsc = non symmetric cells obtained after reducing the array of nonsymmetric cells
                    let nsc = nonSymmetricCells.reduce(
                        (a, b) => a.concat(b),
                        []
                    );

                    let diff = Math.abs(nsc[0] - nsc[1]);
                    if (diff === 1) {
                        status = w;
                    }
                }
                if (nonSymmetricCells.length === 2) {
                    // nsc = non symmetric cells obtained after reducing the array of nonsymmetric cells
                    let nsc = nonSymmetricCells;
                    console.log(nsc);
                    let deltaY = nsc[1][1] === nsc[0][1];
                    let deltaX = nsc[1][0] === nsc[0][0];

                    if (deltaY || deltaX) {
                        console.log("Yes");
                        status = "won";
                    }
                }
                if (marker === "O" && moves.length > 2) {
                    status = "draw";
                }
                return status;
            }
            return false;
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
};

module.exports = findWinner;
