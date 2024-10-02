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

    constructor(start, end, color) {
        this.#start = start; // Objeto de la clase Punto
        this.#end = end;     // Objeto de la clase Punto
        this.#color = color;
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
        circle.setAttribute("r", 1); // Radio pequeño para representar el pixel
        circle.setAttribute("fill", this.#color);
        svg.appendChild(circle);
    }
}

// Clase Circunferencia que usa la clase Punto
class Circunferencia {
    #center;
    #radius;
    #color;

    constructor(center, radius, color) {
        this.#center = center; // Objeto de la clase Punto
        this.#radius = radius;
        this.#color = color;
    }

    // Método para dibujar la circunferencia en el SVG
    dibujar(svg) {
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", this.#center.x);
        circle.setAttribute("cy", this.#center.y);
        circle.setAttribute("r", this.#radius);
        circle.setAttribute("fill", this.#color);
        svg.appendChild(circle);
    }
}

// Clase Elipse que usa la clase Punto
class Elipse {
    #center;
    #a;
    #b;
    #color;

    constructor(center, a, b, color) {
        this.#center = center; // Objeto de la clase Punto
        this.#a = a;
        this.#b = b;
        this.#color = color;
    }

    // Método para dibujar la elipse en el SVG
    dibujar(svg) {
        const ellipse = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
        ellipse.setAttribute("cx", this.#center.x);
        ellipse.setAttribute("cy", this.#center.y);
        ellipse.setAttribute("rx", this.#a);
        ellipse.setAttribute("ry", this.#b);
        ellipse.setAttribute("fill", this.#color);
        svg.appendChild(ellipse);
    }
}

// Crear y dibujar las primitivas
const svgCanvas = document.getElementById('svgCanvas');

// Dibuja una línea usando el algoritmo de Bresenham
const linea = new Linea(new Punto(50, 50), new Punto(200, 200), 'black');
linea.dibujar(svgCanvas);

// Dibuja una circunferencia
const circunferencia = new Circunferencia(new Punto(300, 100), 50, 'red');
circunferencia.dibujar(svgCanvas);

// Dibuja una elipse
const elipse = new Elipse(new Punto(400, 300), 80, 50, 'blue');
elipse.dibujar(svgCanvas);
