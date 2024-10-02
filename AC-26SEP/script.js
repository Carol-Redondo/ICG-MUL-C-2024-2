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

// Clase Linea que ahora usa la clase Punto
class Linea {
    #start;
    #end;
    #color;

    constructor(start, end, color) {
        this.#start = start; // Objeto de la clase Punto
        this.#end = end;     // Objeto de la clase Punto
        this.#color = color;
    }

    // Método para dibujar la línea en el SVG
    dibujar(svg) {
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", this.#start.x);
        line.setAttribute("y1", this.#start.y);
        line.setAttribute("x2", this.#end.x);
        line.setAttribute("y2", this.#end.y);
        line.setAttribute("stroke", this.#color);
        svg.appendChild(line);
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

const linea = new Linea(new Punto(50, 50), new Punto(200, 200), 'black');
linea.dibujar(svgCanvas);

const circunferencia = new Circunferencia(new Punto(300, 100), 50, 'red');
circunferencia.dibujar(svgCanvas);

const elipse = new Elipse(new Punto(400, 300), 80, 50, 'blue');
elipse.dibujar(svgCanvas);
