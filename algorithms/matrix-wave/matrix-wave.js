'use strict';

module.exports = function (matrix) {

  let result = 0,
    checked = {};

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      calcPieces(i, j);
    }
  }

  function calcPieces(i, j, prev) {

    if (matrix[i] === undefined || !matrix[i][j] /*|| checked[i] === j*/) {
      return false;
    }

    if (!prev) {
      result++;
    }

    prev = matrix[i][j];

    //checked[i] = j;

    delete matrix[i][j];

    calcPieces(i + 1, j, prev);
    calcPieces(i - 1, j, prev);
    calcPieces(i, j + 1, prev);
    calcPieces(i, j - 1, prev);
  }

  return result;
};