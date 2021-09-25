const allAreNumbers = (arr) => {
    return arr.every((elem) => typeof elem === "number" && elem <= 2);
};

module.exports = allAreNumbers;
