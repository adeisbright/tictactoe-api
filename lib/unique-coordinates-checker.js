"use strict";
/**
 *
 * @param {Array} coordinates an array of number coordinates
 * @param {Array} moves an array of coordinates
 * @returns true if the coordinates is in the moves and
 *  false if otherwise or an error occured
 */
const isCoordinatePlayed = (coordinates, moves) => {
    try {
        if (Array.isArray(coordinates) && Array.isArray(moves)) {
            return moves.find((cell) => cell.join("") === coordinates.join(""));
        }
        return false;
    } catch (error) {
        return false;
    }
};

module.exports = isCoordinatePlayed;
