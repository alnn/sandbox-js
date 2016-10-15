var matrixWave = require('./matrix-wave');

describe('Matrix wave',function () {

  it('2 pieces', function () {
    expect(matrixWave([ // 2
        [1, 0, 1],
        [1, 0, 0],
        [1, 1, 1]
    ])).toEqual(2);
  });

  it('5 pieces', function () {
    expect(matrixWave([ // 5
      [1, 0, 1],
      [0, 1, 0],
      [1, 0, 1]
    ])).toEqual(5);
  });

  it('2 pieces', function () {
    expect(matrixWave([ // 2
      [1, 1, 1],
      [1, 0, 1],
      [0, 1, 0]
    ])).toEqual(2);
  });

  it('Big matrix with 4 pieces', function () {
    expect(matrixWave([ // 4
      [0, 0, 0, 1, 0, 1, 1],
      [0, 1, 0, 1, 0, 1, 1],
      [1, 1, 0, 1, 0, 1, 1],
      [1, 0, 1, 1, 0, 0, 0],
      [1, 0, 1, 0, 1, 1, 1],
      [0, 0, 0, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1]
    ])).toEqual(4);
  });

});
