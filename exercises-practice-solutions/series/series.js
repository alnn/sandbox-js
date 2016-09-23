'use strict';

export default class {
  constructor (digits) {
    this.digits = [...digits].map(Number);
  }
  slices (chunkSize) {
    if (chunkSize > this.digits.length) {
      throw new Error('Slice size is too big.');
    }
    return this.digits.map((digit, index, arr) => arr.slice(index, index + chunkSize))
      .filter(digit => digit.length === chunkSize);
  }
}
