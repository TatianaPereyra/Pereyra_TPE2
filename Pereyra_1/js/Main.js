import { Figure } from './Figure.js';
import { Circle } from './Circle.js';
import { Rect } from './Rect.js';
import { Square } from './Square.js';
import { Triangle } from './Triangle.js';

"Use strict";

let figures = [];
const CANVAS =  document.getElementById("canvas");
let ctx = CANVAS.getContext("2d");

let onMouseDown = false;
let figuraSeleecionada = null;

let lastPosX, lastPosY;

let shiftDown = false;


//------------------------CREACION DE FIGURAS------------------------

function createCircle(){
    let radius = Math.round(Math.random() * 50) + 1; // evito radio 0
    let x = Math.round(Math.random() * CANVAS.width);
    let y = Math.round(Math.random() * CANVAS.height);

    figures.push(new Circle(x, y, radius)); 
    drawFigures();
}

function createRect(){
    let x = Math.round(Math.random() * CANVAS.width);
    let y = Math.round(Math.random() * CANVAS.height);
    let width = Math.round(Math.random() * 100);
    let height = Math.round(Math.random() * 200);

    figures.push(new Rect(x, y, width, height));
    drawFigures();
}

function createSquare(){
    let x = Math.round(Math.random() * CANVAS.width);
    let y = Math.round(Math.random() * CANVAS.height);
    let size = Math.round(Math.random() * 100);

    figures.push(new Square(x, y, size));
    drawFigures();
}

function createTriangle(){
    //Primer vertice
    let ladoAx = Math.round(Math.random() * CANVAS.width);
    let ladoAy = Math.round(Math.random() * CANVAS.height);
    //Segundo vertice
    let ladoBx = Math.round(Math.random() * CANVAS.width);
    let ladoBy = Math.round(Math.random() * CANVAS.height);
    //Tercer vertice
    let ladoCx = Math.round(Math.random() * CANVAS.width);
    let ladoCy = Math.round(Math.random() * CANVAS.height);

    figures.push(new Triangle(ladoAx, ladoAy, ladoBx, ladoBy, ladoCx, ladoCy));
    drawFigures();
}

function createRandomFigure(){
    let numero = Math.floor(Math.random() * 100)+1; //hasta 100 inclusive

    switch(true){
        case numero % 5 === 0: createCircle(); break;
        case numero % 4 === 0: createSquare(); break;
        case numero % 2 === 0: createRect(); break;
        default: createTriangle(); break; //en caso de que no sea ninguna de las anteriores
    }
}

function mostrarMensajeHTML(boolean){
    let p;

    if(boolean){
       p = "Estas seleccionando un " + figuraSeleecionada.getName();
    }else{
        p = "No hay ninguna figura seleccionada";
    }

    document.getElementById("parrafo").textContent = p;

}

//--------------DIBUJAR SOBRE EL CANVAS---------------------------------

function drawCanvas(){
    ctx.fillStyle = "#efcbc3";
    ctx.fillRect(0, 0, 800, 600);
}

function drawFigures(){
    drawCanvas();
    for(let i = 0; i < figures.length; i++){
        figures[i].draw(ctx);
    }
}

function reDraw(){
    drawCanvas();
    for(let i = 0; i < figures.length; i++){
        if(figures[i] != figuraSeleecionada){ //solo dibujo las que no son la seleccionada
            figures[i].draw(ctx);
        }
    }
    if(figuraSeleecionada){//por si tocan en un lugar donde no hay figuras
        figuraSeleecionada.draw(ctx); //la dibujo al final solo si hay una seleccionada
    }
}

function cleanCanvas(e){
    CANVAS.cleanCanvas;
    figures = [];
    drawCanvas();
}

//---------------------SELECCION Y MOVIMIENTO--------------------------------------

function findFigure(x, y){
    for(let i = (figures.length  - 1); i >= 0; i--){ //recorro hacia atras para encontrar el primer elemento que coincida (superposicion)
        if(figures[i].isPointInside(x, y)){
            return figures[i];
        }
    }
    return null; //por si no encuentro ninguna figura que coincida
}

document.addEventListener('keydown', (e) => { 
    if (e.key === 'Shift') {//comrpuebo que la tecla sea la que quiero
        shiftDown = true;

        let figura = findFigure(lastPosX, lastPosY);

        if (figura) {
            figuraSeleecionada = figura;
            figuraSeleecionada.setIsSelected(true);
            mostrarMensajeHTML(true);
            reDraw();
        }
    }

    let mover = 5;

    if(figuraSeleecionada && shiftDown){ //si se encuentra una figura y se sigue con el shift se puede mover
        switch (e.key) {
            case 'ArrowUp':
                e.preventDefault();
                figuraSeleecionada.move(0, -mover);
                break;

            case 'ArrowDown':
                e.preventDefault();
                figuraSeleecionada.move(0, mover);
                break;

            case 'ArrowLeft':
                e.preventDefault();
                figuraSeleecionada.move(-mover, 0);
                break;

            case 'ArrowRight':
                e.preventDefault();
                figuraSeleecionada.move(mover, 0);
                break;
        }

        reDraw(); 
    }
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'Shift') {
        shiftDown = false;

        if(figuraSeleecionada != null){
        figuraSeleecionada.setIsSelected(false);
        }

        figuraSeleecionada = null;
        mostrarMensajeHTML(false);
        reDraw();
    }
});


//----------------------------EVENTOS DE MOUSE---------------------------------

CANVAS.addEventListener('mousedown', (e) =>   {
    onMouseDown = true;

    figuraSeleecionada = findFigure(e.offsetX, e.offsetY); //obtengo los valores donde esta parado el mouse
    lastPosX = e.offsetX;
    lastPosY = e.offsetY;
    if(figuraSeleecionada){
        figuraSeleecionada.setIsSelected(true); //quiero que la figura se marque
        mostrarMensajeHTML(true);
        reDraw();
    }
});

CANVAS.addEventListener('mouseup', (e) => {
    onMouseDown = false;
    if(figuraSeleecionada != null){
        figuraSeleecionada.setIsSelected(false);
    }
    figuraSeleecionada = null;
    mostrarMensajeHTML(false);
    reDraw();
});

CANVAS.addEventListener('mousemove', (e) => {
    if(figuraSeleecionada && onMouseDown){ //verfico que exista una figura y que el mouse este "clickeando"
        //debo mover la figura segun lo que se haya desplazado el mouse
        figuraSeleecionada.move((e.offsetX- lastPosX), (e.offsetY- lastPosY));
        lastPosX = e.offsetX;
        lastPosY = e.offsetY;
        reDraw();
    }
});

//---------------------INTERACCION CON EL USUARIO------------------------------

function openPopUp() {
    document.querySelector("#instructions").classList.remove("noDisponible");
}

function closePopUp() {
    document.querySelector("#instructions").classList.add("noDisponible");
}

function main(){
   drawCanvas();

   //---------PopUp de Instrucciones------
   document.getElementById("popUp").addEventListener("click", openPopUp);
   document.getElementById("closePopUp").addEventListener("click", closePopUp);
   openPopUp();
}

main();

//relaciono los botones con sus respectivas funciones de dibujo
document.getElementById("clean").addEventListener("click", cleanCanvas);//borrar canvas
document.getElementById("circle").addEventListener("click", createCircle);//crear circulos
document.getElementById("rect").addEventListener("click", createRect);//crear rectangulos
document.getElementById("square").addEventListener("click", createSquare);//crear cuadrados
document.getElementById("triangle").addEventListener("click", createTriangle);//crea triangulos
document.getElementById("aleatorio").addEventListener("click", createRandomFigure);//crear figura random
