// Comandos Ctrl Shift I - Para abrir el inspector de una pagina html

//FUNCION PARA DIBUJAR UNA LINEA

function dibujarLinea(color,x1,y1,x2,y2,lienzo) {
    lienzo.beginPath();
    lienzo.strokeStyle = color;
    lienzo.moveTo(x1,y1);
    lienzo.lineTo(x2,y2);
    lienzo.stroke();
    lienzo.closePath();
}

// DIBUJAR con lineas automatico ---------------------------------------------------------

var d1  = document.getElementById("dibujo_automatico_con_lineas");
var ancho = d1.width;
var lienzo1 = d1.getContext("2d");
var textoNumLineas = document.getElementById("texto_num_lineas")
var boton = document.getElementById('boton')
boton.addEventListener("click", dibujarFigura)
colorRec = "#AFA"
colorMouse = "#FAF"
var color
var i = 0

function getColorArcoiris(angulo) {
    const fase1 = Math.sin(angulo * Math.PI / 180 + 0) * 127 + 128;
    const fase2 = Math.sin(angulo * Math.PI / 180 + (2 * Math.PI / 3)) * 127 + 128;
    const fase3 = Math.sin(angulo * Math.PI / 180 + (4 * Math.PI / 3)) * 127 + 128;
    return `rgb(${fase1},${fase2},${fase3})`;
}

function dibujarFigura() {
    var lineas = textoNumLineas.value
    var aumento = ancho / lineas
    for (let i = 0; i < ancho; i += aumento) {
        color = getColorArcoiris(i)
        dibujarLinea(color,0,i,(i+aumento),ancho,lienzo1)
        dibujarLinea(color,ancho,(i+aumento),i,0,lienzo1) 
    }
}

// Dibujar con las teclas ⬆️➡️⬇️⬅️ ----------------------------------------------------

var d2 = document.getElementById("area_de_dibujo");
var lienzo2 = d2.getContext("2d");
var teclas = {
    UP: 38,
    DOWN: 40,
    LEFT: 37,
    RIGHT:39,
}
var posX = 100
var posY = 100
var paso = 5
var direccionX = 0
var direccionY = 0

document.addEventListener('keydown', dibujarTeclado);


function dibujarTeclado(evento){
    console.log("entre a pintar con teclado")
    switch(evento.keyCode){
        case teclas.UP:
            direccionY = -1
            break
        case teclas.DOWN:
            direccionY = +1
            break
        case teclas.LEFT:
            direccionX = -1
            break
        case teclas.RIGHT:
            direccionX = +1
            break
        default:
            break
    }
    color = getColorArcoiris(i)
    dibujarLinea(color,posX,posY,posX + (paso * direccionX), posY + (paso * direccionY),lienzo2)
    i++
    posX += paso * direccionX;
    posY += paso * direccionY;
    direccionX = 0; // Reiniciar la dirección horizontal
    direccionY = 0; // Reiniciar la dirección vertical    

}

// Dibujar con mouse ---------------------------

var d3 = document.getElementById("dibujo_con_mouse_touch");
var lienzo3 = d3.getContext("2d");

var posX3 = 100
var posY3 = 100
var mousePresionado = false;
var direccionX = 0
var direccionY = 0

// Función para iniciar el dibujo cuando se presiona el mouse
document.addEventListener('mousedown', function(evento) {
    posX3 = evento.offsetX;
    posY3 = evento.offsetY;
    mousePresionado = true;
});

// Función para dibujar mientras se mueve el mouse (si el botón del mouse está presionado)
d3.addEventListener('mousemove', function(evento) {
    if (mousePresionado) {
        var nuevaPosX = evento.offsetX;
        var nuevaPosY = evento.offsetY;
        color = getColorArcoiris(i)
        dibujarLinea(color, posX3, posY3, nuevaPosX, nuevaPosY, lienzo3);
        i++
        posX3 = nuevaPosX;
        posY3 = nuevaPosY;
    }
});

// Función para finalizar el dibujo al soltar el mouse
d3.addEventListener('mouseup', function() {
    mousePresionado = false;
});

// PARA MOBILES - Función para detectar la pulsación táctil en la pantalla -------------

let isDrawing = false;

d3.addEventListener("touchstart", startDrawing);
d3.addEventListener("touchmove", draw);
d3.addEventListener("touchend", stopDrawing);

// Función para comenzar el dibujo
function startDrawing(event) {
    i=0
    isDrawing = true;
    event.preventDefault();
    const x = event.touches[0].clientX - d3.getBoundingClientRect().left;
    const y = event.touches[0].clientY - d3.getBoundingClientRect().top;
    lienzo3.lineWidth = 5; // Grosor de 5 píxeles
    lienzo3.beginPath();
    lienzo3.moveTo(x, y);
    
}

// Función para dibujar la línea
function draw(event) {
    if (isDrawing) {
        color = getColorArcoiris(i)
        const x = event.touches[0].clientX - d3.getBoundingClientRect().left;
        const y = event.touches[0].clientY - d3.getBoundingClientRect().top;
        // Cambiar el grosor de la línea
        lienzo3.lineTo(x, y);
        lienzo3.strokeStyle = color;
        lienzo3.stroke();
        i += 10
    }
}

// Función para detener el dibujo
function stopDrawing() {
    isDrawing = false;
    event.preventDefault();
    lienzo3.closePath();
    console.log('entre a stopDrawing')
}

// Boton de limpiar los canvas ----------------

document.getElementById('limpiar').addEventListener('click', limpiarCanvas);
function limpiarCanvas() {
    lienzo1.clearRect(0, 0, d1.width, d1.height);
    lienzo2.clearRect(0, 0, d2.width, d2.height);
    lienzo3.clearRect(0, 0, d3.width, d3.height);
}

