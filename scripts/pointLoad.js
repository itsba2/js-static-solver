class PointLoadSolver {
    constructor(pointLoadMagnitude, spanLength, loadDistanceFromRef) {
        this.P = parseFloat(pointLoadMagnitude)
        this.L = parseFloat(spanLength)
        this.a = parseFloat(loadDistanceFromRef)
        this.b = this.L - this.a
        this.R1 = 0
        this.R2 = 0
        this.Vmax = 0
        this.Mmax = 0
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

    getSupportReactions() {
        this.R1 = (this.P * this.b) / this.L
        this.R2 = (this.P * this.a) / this.L
        return [this.R1, this.R2]
    }

    getMaxShear() {
        if (this.a < this.b) return this.R1
        else return this.R2
    }

    getMaxMoment() {
        return (this.P * this.a * this.b) / this.L
    }
}

const pointLoadMagnitude = document.getElementById('pointLoadMagnitude').value
const spanLength = document.getElementById('spanLength').value
const loadDistanceFromRef = document.getElementById('loadDistanceFromRef').value

const solver = new PointLoadSolver(pointLoadMagnitude, spanLength, loadDistanceFromRef)

const calculateButton = document.getElementById('calculateButton')
calculateButton.addEventListener('click', () => {
    const results = document.getElementById('results')
    results.innerText = ''
    const supportReactions = solver.getSupportReactions()
    const Vmax = solver.getMaxShear()
    const Mmax = solver.getMaxMoment()

    const R1P = document.createElement('p')
    const R2P = document.createElement('p')
    const VmaxP = document.createElement('p')
    const MmaxP = document.createElement('p')
    R1P.innerText = `R1 = ${supportReactions[0].toFixed(2)} kN`
    R2P.innerText = `R2 = ${supportReactions[1].toFixed(2)} kN`
    VmaxP.innerText = `Vmax = ${Vmax.toFixed(2)} kN`
    MmaxP.innerText = `Mmax = ${Mmax.toFixed(2)} kN-m`
    results.append(R1P, R2P, VmaxP, MmaxP)

    /** @type {HTMLCanvasElement} */
    const canvas = document.getElementById('app-canvas')
    const ctx = canvas.getContext('2d')

    const main = document.getElementById('app-main')


    const canvasWidth = canvas.width = main.offsetWidth
    const canvasHeight = canvas.height = 600;

    const xRef = 0
    const vY = canvasHeight / 4
    const mY = canvasHeight * 3 / 4
    const aCanvas = (solver.a * canvasWidth) / solver.L
    const bCanvas = canvasWidth - aCanvas

    // shear diagram
    ctx.beginPath()
    ctx.moveTo(xRef, vY)
    ctx.lineTo(xRef + canvasWidth, vY)
    ctx.stroke()

    
    if (Vmax == solver.R1) {
        ctx.fillStyle = 'blue'
        ctx.fillRect(0, 0, aCanvas, canvasHeight / 4)
        ctx.fillStyle = 'red'
        ctx.fillRect(aCanvas, vY, bCanvas, canvasHeight * solver.R2 / solver.R1 / 4)
    } else {
        ctx.fillStyle = 'blue'
        ctx.fillRect(0, vY - canvasHeight * solver.R1 / solver.R2 / 4, (solver.a * canvasWidth) / solver.L, canvasHeight * solver.R1 / solver.R2 / 4)
        ctx.fillStyle = 'red'
        ctx.fillRect(aCanvas, vY, bCanvas, canvasHeight / 4)
    }


    // moment diagram
    ctx.beginPath()
    ctx.moveTo(xRef, mY)
    ctx.lineTo(xRef + canvasWidth, mY)
    ctx.stroke()
})
