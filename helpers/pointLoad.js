export class PointLoadSolver {
    constructor(P, L, a) {
        this.P = parseFloat(P)
        this.L = parseFloat(L)
        this.a = parseFloat(a)
        this.b = this.L - this.a
        this.R1 = (this.P * this.b) / this.L
        this.R2 = (this.P * this.a) / this.L
        this.Vmax = this.a < this.b ? this.R1 : this.R2
        this.Mmax = (this.P * this.a * this.b) / this.L
    }

    getSolverInfo() {
        console.log(`P = ${this.P}`)
        console.log(`L = ${this.L}`)
        console.log(`a = ${this.a}`)
        console.log(`b = ${this.b}`)
        console.log(`R1 = ${this.R1}`)
        console.log(`R2 = ${this.R2}`)
        console.log(`Vmax = ${this.Vmax}`)
        console.log(`Mmax = ${this.Mmax}`)
    }

    genXPoints(delta) {
        let xPoints = []
        const arr = this.L % delta == 0 ? [...Array(this.L / delta + 1).keys()] : [...Array(Math.ceil(this.L / delta)).keys()]
        arr.forEach(el => {
            xPoints.push(el * delta)
        })
        return xPoints
    }

    getVData(delta) {
        const xPoints = this.genXPoints(delta)

        let vData = []
        xPoints.forEach(x => {
            if (x <= this.a) vData.push(this.R1)
            else vData.push(this.R1 - this.P)
        })

        return vData
    }

    getMData(delta) {
        const xPoints = this.genXPoints(delta)

        let mData = []
        xPoints.forEach(x => {
            if (x <= this.a) mData.push(this.R1 * x)
            else mData.push((this.R1 - this.P) * x + this.P * this.a)
        })

        return mData
    }
}