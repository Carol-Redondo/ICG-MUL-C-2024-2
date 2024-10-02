// Clase Punto con encapsulamiento
class Punto {
    #x;
    #y;

    constructor(x, y) {
        this.#x = x;
        this.#y = y;
    }

    // Métodos getter para acceder a los valores privados
    get x() {
        return this.#x;
    }

    get y() {
        return this.#y;
    }

    // Métodos setter para cambiar los valores
    set x(value) {
        this.#x = value;
    }

    set y(value) {
        this.#y = value;
    }
}

// Clase Linea con algoritmo de Bresenham
class Linea {
    #start;
    #end;
    #color;
    #lineWidth;

    constructor(start, end, color, lineWidth = 1) {
        this.#start = start; // Objeto de la clase Punto
        this.#end = end;     // Objeto de la clase Punto
        this.#color = color;
        this.#lineWidth = lineWidth; // Grosor de la línea
    }

    // Implementación del algoritmo de Bresenham para dibujar la línea
    dibujar(svg) {
        let x1 = Math.round(this.#start.x);
        let y1 = Math.round(this.#start.y);
        let x2 = Math.round(this.#end.x);
        let y2 = Math.round(this.#end.y);

        const dx = Math.abs(x2 - x1);
        const dy = Math.abs(y2 - y1);
        const sx = (x1 < x2) ? 1 : -1;
        const sy = (y1 < y2) ? 1 : -1;
        let err = dx - dy;

        while (true) {
            // Dibuja un punto en las coordenadas actuales
            this.#dibujarPunto(svg, x1, y1);

            if (x1 === x2 && y1 === y2) break;
            const e2 = 2 * err;

            if (e2 > -dy) {
                err -= dy;
                x1 += sx;
            }

            if (e2 < dx) {
                err += dx;
                y1 += sy;
            }
        }
    }

    // Método para dibujar un punto (en realidad, un pequeño círculo) en las coordenadas (x, y)
    #dibujarPunto(svg, x, y) {
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", x);
        circle.setAttribute("cy", y);
        circle.setAttribute("r", this.#lineWidth); // Radio ajustado según el grosor de la línea
        circle.setAttribute("fill", this.#color);
        svg.appendChild(circle);
    }
}

// Función para generar un color aleatorio
function generarColorAleatorio() {
    const letras = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letras[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Función para generar líneas aleatorias
function dibujarLineasAleatorias(svg, numLineas, lineWidth) {
    for (let i = 0; i < numLineas; i++) {
        const startX = Math.floor(Math.random() * 500);
        const startY = Math.floor(Math.random() * 500);
        const endX = Math.floor(Math.random() * 500);
        const endY = Math.floor(Math.random() * 500);
        const color = generarColorAleatorio();
        
        const linea = new Linea(new Punto(startX, startY), new Punto(endX, endY), color, lineWidth);
        linea.dibujar(svg);
    }
}

// Limpiar el canvas
function limpiarCanvas(svg) {
    while (svg.firstChild) {
        svg.removeChild(svg.firstChild);
    }
}

// Seleccionamos el canvas y los controles
const svgCanvas = document.getElementById('svgCanvas');
const btnDrawLines = document.getElementById('drawLines');
const btnClearCanvas = document.getElementById('clearCanvas');
const inputLineWidth = document.getElementById('lineWidth');

// Dibujar 10 líneas aleatorias al hacer clic en el botón
btnDrawLines.addEventListener('click', () => {
    const lineWidth = parseInt(inputLineWidth.value, 10);
    dibujarLineasAleatorias(svgCanvas, 10, lineWidth);
});

// Limpiar el canvas al hacer clic en el botón "Limpiar Canvas"
btnClearCanvas.addEventListener('click', () => {
    limpiarCanvas(svgCanvas);
});
