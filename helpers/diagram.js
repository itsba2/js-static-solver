export class Diagram {
    constructor(type) {
        this.type = type
    }

    genDiagram(xPoints, yPoints) {
        new Chart(`${this.type}Diagram`, {
            type: 'line',
            data: {
                labels: xPoints,
                datasets: [{
                    fill: false,
                    lineTension: 0,
                    pointRadius: 0,
                    data: yPoints
                }]
            },
            options: {
                legend: { display: false },
            }
        })
    }
}