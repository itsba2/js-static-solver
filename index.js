import { PointLoadSolver } from './helpers/pointLoad.js'
import { Diagram } from './helpers/diagram.js'

const pointLoadMagnitude = document.getElementById('pointLoadMagnitude')
const spanLength = document.getElementById('spanLength')
const loadDistanceFromRef = document.getElementById('loadDistanceFromRef')


const calculateButton = document.getElementById('calculateButton')
calculateButton.addEventListener('click', () => {
    const solver = new PointLoadSolver(pointLoadMagnitude.value, spanLength.value, loadDistanceFromRef.value)
    const results = document.getElementById('results')
    results.innerText = ''

    const R1P = document.createElement('p')
    const R2P = document.createElement('p')
    const VmaxP = document.createElement('p')
    const MmaxP = document.createElement('p')
    R1P.innerText = `R1 = ${solver.R1.toFixed(2)} kN`
    R2P.innerText = `R2 = ${solver.R2.toFixed(2)} kN`
    VmaxP.innerText = `Vmax = ${solver.Vmax.toFixed(2)} kN`
    MmaxP.innerText = `Mmax = ${solver.Mmax.toFixed(2)} kN-m`
    results.append(R1P, R2P, VmaxP, MmaxP)

    console.log('solver.getVData(0.1)', solver.getVData(0.1))
    console.log('solver.getMData(0.1)', solver.getMData(0.1))

    const shearDiagram = new Diagram('shear').genDiagram(solver.genXPoints(0.1), solver.getVData(0.1))
    const momentDiagram = new Diagram('moment').genDiagram(solver.genXPoints(0.1), solver.getMData(0.1))

})

const resetButton = document.getElementById('resetButton')
resetButton.addEventListener('click', () => {
    pointLoadMagnitude.value = ''
    spanLength.value = ''
    loadDistanceFromRef.value = ''
})

