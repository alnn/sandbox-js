export default class Triplet {

    constructor(...sides) {
        this.sides = sides;
    }

    sum() {
        return this.sides.reduce((p, c) => p + c, 0);
    }

    product() {
        return this.sides.reduce((p, c) => p * c, 1);
    }

    isPythagorean() {
        return Math.pow(this.sides[0], 2) + Math.pow(this.sides[1], 2) === Math.pow(this.sides[2], 2);
    }

    static where(cond) {
        let result = [];

        for (let a = cond.minFactor || 1; a < cond.maxFactor - 1; a++) {
            for (let b = a + 1; b < cond.maxFactor; b++) {
                for (let c = b + 1; c < cond.maxFactor + 1; c++) {
                    let t = new Triplet(a, b, c),
                        validSum = t.sum() === cond.sum || !cond.sum;
                    if (t.isPythagorean() && validSum) {
                        result.push(t);
                    }
                }

            }
        }

        return result;
    }

}
