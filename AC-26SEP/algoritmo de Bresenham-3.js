// Clase Punto con encapsulamiento
class Punto {
    #x;
    #y;

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
        this.#start = start;
        this.#end = end;
        this.#color = color;
        this.#lineWidth = lineWidth;
    }

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

    #dibujarPunto(svg, x, y) {
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", x);
        circle.setAttribute("cy", y);
        circle.setAttribute("r", this.#lineWidth);
        circle.setAttribute("fill", this.#color);
        svg.appendChild(circle);
    }
}

// Función para generar color aleatorio
function generarColorAleatorio() {
    const letras = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letras[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Dibujar cuadrícula de puntos
function dibujarCuadricula(svg, filas, columnas, separacion) {
    for (let i = 0; i <= filas; i++) {
        for (let j = 0; j <= columnas; j++) {
            const x = j * separacion;
            const y = i * separacion;

            // Crear un punto en la cuadrícula
            const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            circle.setAttribute("cx", x);
            circle.setAttribute("cy", y);
            circle.setAttribute("r", 3); // Radio pequeño para los puntos de la cuadrícula
            circle.setAttribute("fill", "gray"); // Color inicial

            // Añadir evento para cambiar el color al hacer clic en el punto
            circle.addEventListener('click', () => {
                const nuevoColor = generarColorAleatorio();
                circle.setAttribute("fill", nuevoColor);
            });

            svg.appendChild(circle);
        }
    }
}

// Función para dibujar líneas aleatorias
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

// Seleccionar el canvas y controles
const svgCanvas = document.getElementById('svgCanvas');
const btnDrawLines = document.getElementById('drawLines');
const btnClearCanvas = document.getElementById('clearCanvas');
const inputLineWidth = document.getElementById('lineWidth');

// Dibujar cuadrícula al cargar la página
dibujarCuadricula(svgCanvas, 10, 10, 50); // 10x10 puntos, con 50px de separación

// Dibujar líneas aleatorias al hacer clic en el botón
btnDrawLines.addEventListener('click', () => {
    const lineWidth = parseInt(inputLineWidth.value, 10);
    dibujarLineasAleatorias(svgCanvas, 10, lineWidth);
});

// Limpiar el canvas al hacer clic en "Limpiar Canvas"
btnClearCanvas.addEventListener('click', () => {
    limpiarCanvas(svgCanvas);
    dibujarCuadricula(svgCanvas, 10, 10, 50); // Vuelve a dibujar la cuadrícula después de limpiar
});
