// Clase Punto con encapsulamiento
class Punto {
    #x; // Coordenada X privada
    #y; // Coordenada Y privada
    
    constructor(x, y) {
        this.#x = x;
        this.#y = y;
    }

    get x() {
        return this.#x;
    }

    get y() {
        return this.#y;
    }
}

// Clase Figura para manejar una lista de puntos y dibujar en el canvas
class Figura {
    constructor(puntos = []) {
        this.puntos = puntos;
    }

    // Función para dibujar los puntos como círculos (rasterización)
    dibujarPuntos(svgElement) {
        const namespace = "http://www.w3.org/2000/svg";
        svgElement.innerHTML = ''; // Limpiar el SVG antes de redibujar
        for (let i = 0; i < this.puntos.length; i++) {
            let circle = document.createElementNS(namespace, "circle");
            circle.setAttribute("cx", this.puntos[i].x);
            circle.setAttribute("cy", this.puntos[i].y);
            circle.setAttribute("r", 3);
            circle.setAttribute("fill", "red");
            svgElement.appendChild(circle);
        }
    }

    // Función para dibujar el centroide
    dibujarCentroide(svgElement) {
        const centroide = this.calcularCentroide();
        const namespace = "http://www.w3.org/2000/svg";
        let circle = document.createElementNS(namespace, "circle");
        circle.setAttribute("cx", centroide.x);
        circle.setAttribute("cy", centroide.y);
        circle.setAttribute("r", 5);
        circle.setAttribute("fill", "blue");
        svgElement.appendChild(circle);
    }

    // Función para calcular el centroide del polígono
    calcularCentroide() {
        let centroideX = 0;
        let centroideY = 0;
        this.puntos.forEach(p => {
            centroideX += p.x;
            centroideY += p.y;
        });
        centroideX /= this.puntos.length;
        centroideY /= this.puntos.length;
        return new Punto(centroideX, centroideY);
    }

    // Función para dibujar la figura completa
    render(svgElement) {
        this.dibujarPuntos(svgElement);   // Dibuja los puntos
        this.dibujarCentroide(svgElement); // Dibuja el centroide
    }
}

// Función para generar puntos aleatorios
function generarPuntosAleatorios(numPuntos, ancho, alto) {
    let puntosAleatorios = [];
    for (let i = 0; i < numPuntos; i++) {
        let x = Math.random() * ancho; // Coordenada X aleatoria
        let y = Math.random() * alto;  // Coordenada Y aleatoria
        puntosAleatorios.push(new Punto(x, y));
    }
    return puntosAleatorios;
}

// Función para calcular el centroide de un conjunto de puntos
function calcularCentroide(puntos) {
    let centroideX = 0;
    let centroideY = 0;
    puntos.forEach(p => {
        centroideX += p.x;
        centroideY += p.y;
    });
    centroideX /= puntos.length;
    centroideY /= puntos.length;
    return new Punto(centroideX, centroideY);
}

// Función para ordenar los puntos en sentido antihorario
function ordenarPuntos(puntos) {
    const centroide = calcularCentroide(puntos);
    puntos.sort((a, b) => {
        return Math.atan2(a.y - centroide.y, a.x - centroide.x) - Math.atan2(b.y - centroide.y, b.x - centroide.x);
    });
}

// Crear el canvas
const svgCanvas = document.getElementById('canvas');

// Generar una figura con puntos aleatorios
const anchoCanvas = 400;
const altoCanvas = 400;
let figura = new Figura();

// Evento para regenerar un nuevo conjunto de puntos al hacer clic en el botón
document.getElementById('regenerarPuntosButton').addEventListener('click', () => {
    figura = new Figura(generarPuntosAleatorios(10, anchoCanvas, altoCanvas));
    figura.render(svgCanvas);
});

// Evento para generar un polígono al hacer clic en el botón
document.getElementById('generarPoligonoButton').addEventListener('click', () => {
    let puntosAleatorios = generarPuntosAleatorios(5, anchoCanvas, altoCanvas); // Generar 5 puntos para el polígono
    ordenarPuntos(puntosAleatorios); // Ordenar los puntos
    figura = new Figura(puntosAleatorios);
    figura.render(svgCanvas);
});
