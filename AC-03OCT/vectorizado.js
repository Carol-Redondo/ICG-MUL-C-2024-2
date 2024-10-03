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

    // Función para dibujar líneas conectando los puntos (vectorización)
    dibujarPoligono(svgElement) {
        const namespace = "http://www.w3.org/2000/svg";
        let pointsString = this.puntos.map(punto => `${punto.x},${punto.y}`).join(" ");
        let polygon = document.createElementNS(namespace, "polygon");
        polygon.setAttribute("points", pointsString);
        polygon.setAttribute("fill", "none");
        polygon.setAttribute("stroke", "blue");
        polygon.setAttribute("stroke-width", 2);
        svgElement.appendChild(polygon);
    }

    // Función para determinar si el polígono es convexa o cóncava
    esConvexa() {
        let sign = 0;
        const puntos = this.puntos.length;
        
        for (let i = 0; i < puntos; i++) {
            const p1 = this.puntos[i];
            const p2 = this.puntos[(i + 1) % puntos];
            const p3 = this.puntos[(i + 2) % puntos];

            const crossProduct = (p2.x - p1.x) * (p3.y - p1.y) - (p2.y - p1.y) * (p3.x - p1.x);

            if (crossProduct < 0) {
                sign = -1;
            } else if (crossProduct > 0) {
                if (sign === 0) sign = 1;
                else if (sign === -1) return false;
            }
        }
        return true;
    }

    // Función para dibujar los puntos y el polígono
    render(svgElement) {
        this.dibujarPuntos(svgElement);   // Dibuja los puntos
        this.dibujarPoligono(svgElement);  // Dibuja el polígono que conecta los puntos
        
        // Determina si la figura es convexa o cóncava
        const tipoFigura = this.esConvexa() ? "Convexa" : "Cóncava";
        document.getElementById('tipoFigura').innerText = `Tipo de Figura: ${tipoFigura}`;
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

// Dibujar los puntos y el polígono en el canvas SVG (rasterización y vectorización)
figura.render(svgCanvas);
