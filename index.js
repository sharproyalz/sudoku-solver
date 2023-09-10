puzzle1 = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9],
];

// Make sure to run it
function printArray(arr, level = 0) {
    const indent = " ".repeat(level * 3);
    const isArray = Array.isArray(arr[0]);
    let output = "[";
    for (let i = 0; i < arr.length; i++) {
        const isLast = i === arr.length - 1;
        if (isArray) output += "\n" + indent + "   ";
        if (Array.isArray(arr[i])) output += printArray(arr[i], level + 1);
        else output += arr[i];
        if (!isLast) output += ", ";
    }
    if (isArray) output += "\n" + indent;
    output += "]";
    return level === 0 ? console.log(output) : output;
}

printArray(puzzle1);

// Number of rows
console.log(puzzle1.length);
// Number of elements in row no. 0
console.log(puzzle1[0].length);
// Row no. 0
printArray(puzzle1[0]);
// Element at Row no. 2 and col no. 2 (counting from 0)
console.log(puzzle1[2][2]);

// QUESTION 1: Represent the above solved Sudoku using an array of arrays,
// in a similar fashion as the unsolved Sudoku.
solution1 = [
    [5, 3, 4, 6, 7, 8, 9, 1, 2],
    [6, 7, 2, 1, 9, 5, 3, 4, 8],
    [1, 9, 8, 3, 4, 2, 5, 6, 7],
    [8, 5, 9, 7, 6, 1, 4, 2, 3],
    [4, 2, 6, 8, 5, 3, 7, 9, 1],
    [7, 1, 3, 9, 2, 4, 8, 5, 6],
    [9, 6, 1, 5, 3, 7, 2, 8, 4],
    [2, 8, 7, 4, 1, 9, 6, 3, 5],
    [3, 4, 5, 2, 8, 6, 1, 7, 9],
];

console.log(solution1.length == 9 && solution1[0].length == 9);

function isEqual(arr1, arr2) {
    return JSON.stringify(arr1) === JSON.stringify(arr2);
}

console.log(isEqual(solution1.length == 9, solution1[0].length == 9));

// QUESTION 2: Retrieve row no. 3 of the solution (counting from 0) using the array indexing notation.
row3 = solution1[3];
printArray(row3);

console.log(isEqual(row3, [8, 5, 9, 7, 6, 1, 4, 2, 3]));

// QUESTION 3: Retrieve the value in row no. 4 and column no. 5 of the solution (both counting from 0).
valRow4Col5 = solution1[4][5];

console.log(valRow4Col5 === 3);

// QUESTION 4: Retrieve the value in the last row and column no. 0 of the solution (counting from 0).
valLastZero = solution1[solution1.length - 1][0];

console.log(valLastZero === 3);

// QUESTION 5: Write a function to extract row no. k (counting from 0) of a Sudoku as an array of numbers.
//  Rows are numbered 0 to 8, starting from the top. E.g. row no. 2 above is [0, 9, 8, 0, 0, 0, 0, 6, 0].
function getRow(sudoku, k) {
    return sudoku[k];
}

printArray(getRow(puzzle1, 2));
printArray(getRow(solution1, 3));
console.log(isEqual(getRow(solution1, 3), [8, 5, 9, 7, 6, 1, 4, 2, 3]));

// QUESTION 6: Write a function to extract column no. k of a Sudoku as an array of numbers.
// Columns are numbered 0 to 8 starting from the left. E.g. column no. 4 above is [7, 9, 0, 6, 0, 2, 0, 1, 8].
function getCol(sudoku, k) {
    let colArray = [];
    for (let i = 0; i < sudoku.length; i++) {
        colArray.push(sudoku[i][k]);
    }
    return colArray;
}

printArray(getCol(puzzle1, 4));
printArray(getCol(solution1, 5));
console.log(isEqual(getCol(solution1, 5), [8, 5, 2, 1, 3, 4, 7, 9, 6]));

// QUESTION 7: Each 3x3 subgrid of the Sudoku is called a box. Write a function to extract the box no. k of a Sudoku as an array of numbers.
// Boxes are numbered from 0 to 8 as shown above. The numbers in a box are represented as an array, going from left to right and top to bottom.
//  E.g. box no. 0 above is [5, 3, 0, 6, 0, 0, 0, 9, 8].

function getBox(sudoku, k) {
    const box = [];
    const startRow = Math.floor(k / 3) * 3;
    const startCol = (k % 3) * 3;

    for (let i = startRow; i < startRow + 3; i++) {
        for (let j = startCol; j < startCol + 3; j++) {
            box.push(sudoku[i][j]);
        }
    }
    return box;
}

printArray(getBox(puzzle1, 6));
printArray(getBox(solution1, 7));
console.log(isEqual(getBox(solution1, 7), [5, 3, 7, 4, 1, 9, 2, 8, 6]));

// QUESTION 8: Write a function which finds the row & column index of the first empty position (indicated by 0) within a Sudoku.
// If the row no. i and column no. j column is the first empty position, the function should return an array with two elements i, j.
// If there are no empty positions, return an array with elements null, null.

function firstEmptyPosition(sudoku) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (sudoku[i][j] === 0) {
                return [i, j];
            }
        }
    }
    return [null, null];
}

console.log(firstEmptyPosition(puzzle1));
console.log(firstEmptyPosition(solution1));

console.log(isEqual(firstEmptyPosition(puzzle1), [0, 2]));
console.log(isEqual(firstEmptyPosition(solution1), [null, null]));

// QUESTION 9: Write a function to check if an array of 9 numbers (containing digits from 1 to 9 and 0s to indicate blank spaces) is a valid
// section (row, column or box) for a Sudoku. Only 0 can occur more than once, the numbers 1 to 9 can occur at most once. Your function should
// return true if the section is valid and false otherwise.
function isSectionValid(nums) {
    const numberCount = {};

    for (const num of nums) {
        if (num !== 0) {
            if (numberCount[num]) {
                return false;
            }
            numberCount[num] = 1;
        }
    }

    return true;
}

console.log(isSectionValid([5, 3, 7, 4, 1, 9, 2, 8, 6]));
console.log(isSectionValid([5, 3, 0, 6, 0, 0, 0, 9, 8]));
console.log(isSectionValid([5, 3, 0, 6, 0, 8, 0, 9, 8]));
console.log(isSectionValid([5, 3, 0, 6, 0, 8, 9, 9, 8]));

function isSudokuValid(sudoku) {
    for (let i = 0; i < 9; i++) {
        if (!isSectionValid(getRow(sudoku, i))) {
            return false;
        }
        if (!isSectionValid(getCol(sudoku, i))) {
            return false;
        }
        if (!isSectionValid(getBox(sudoku, i))) {
            return false;
        }
    }
    return true;
}

puzzle2 = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 8, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9],
];

console.log(isSudokuValid(puzzle1));
console.log(isSudokuValid(puzzle2));

//   QUESTION 10: Write a function to check if an array of 9 numbers (containing digits from 1 to 9) represents a complete section
//  (row, column or box) for a Sudoku. The array should contain all the numbers from 1 to 9 exactly once. Your function should return
//  true if the section is complete and false otherwise.
function isSectionComplete(nums) {
    let total = 0;
    for (let i = 1; i < 10; i++) {
        if (nums.includes(i)) {
            total += 1;
        }
    }
    if (total === 9) {
        return true;
    } else {
        return false;
    }
}

console.log(isSectionComplete([0, 9, 8, 1, 0, 0, 0, 6, 0]));
console.log(isSectionComplete([1, 9, 8, 3, 4, 2, 5, 6, 7]));

function isSudokuComplete(sudoku) {
    for (let i = 0; i < 9; i++) {
        if (!isSectionComplete(getRow(sudoku, i))) {
            return false;
        }
        if (!isSectionComplete(getCol(sudoku, i))) {
            return false;
        }
        if (!isSectionComplete(getBox(sudoku, i))) {
            return false;
        }
    }
    return true;
}

console.log(isSudokuComplete(puzzle1));
console.log(isSudokuComplete(solution1));
