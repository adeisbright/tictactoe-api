/**
 *
 * @param {Array} Cell is an array of numbers for x and
 * y coordinate for a move
 * @returns  true if the cell is valid and false if otherwise
 */
const isValidMove = (cell) => {
    return cell.every((elem) => typeof elem === "number" && elem <= 2);
};

module.exports = isValidMove;
