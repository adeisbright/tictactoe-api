/**
 *
 * @param {Array} coordinates an array of number coordinates
 * @param {Array} matrice an array of coordinates
 * @returns true if the coordinates is in the matrice
 */
const isCoordinateUnique = (coordinates, matrice) => {
    try {
        if (Array.isArray(coordinates) && Array.isArray(matrice)) {
            return matrice.find(
                (cell) => cell.join("") === coordinates.join("")
            );
        }
        return false;
    } catch (error) {
        console.log(error.message);
        return false;
    }
};

module.exports = isCoordinateUnique;
