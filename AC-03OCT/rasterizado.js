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

// Clase Figura para manejar una lista de puntos y dibujar los puntos en el canvas
class Figura {
    constructor(puntos = []) {
        this.puntos = puntos;
    }

    // Función para agregar un nuevo punto a la figura
    agregarPunto(punto) {
        this.puntos.push(punto);
    }

    // Función para dibujar los puntos como círculos (rasterización)
    dibujarPuntos(svgElement) {
        const namespace = "http://www.w3.org/2000/svg";
        for (let i = 0; i < this.puntos.length; i++) {
            let circle = document.createElementNS(namespace, "circle");
            circle.setAttribute("cx", this.puntos[i].x);
            circle.setAttribute("cy", this.puntos[i].y);
            circle.setAttribute("r", 3);
            circle.setAttribute("fill", "red");
            svgElement.appendChild(circle);
        }
    }

    // Función para dibujar los puntos de la figura
    render(svgElement) {
        this.dibujarPuntos(svgElement);   // Dibuja los puntos
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

// Crear el canvas
const svgCanvas = document.getElementById('canvas');

// Generar una figura con puntos aleatorios
const anchoCanvas = 400;
const altoCanvas = 400;
let figura = new Figura(generarPuntosAleatorios(10, anchoCanvas, altoCanvas));

// Dibujar los puntos en el canvas SVG (rasterización)
figura.render(svgCanvas);
