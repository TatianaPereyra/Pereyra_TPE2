import {Pen} from "./tools/Pen.js";
import {Eraser} from "./tools/Eraser.js";

"use strict";

//-----------------------------------------------------
//    DECLARACION DE CONSTANTES Y VARIABLES
//-----------------------------------------------------

//-------------------Canvas----------------------------
const CANVAS = document.querySelector("#canvas");
let ctx = CANVAS.getContext("2d");


//----------Comportamiento de herramientas--------
let pen = new Pen();
let eraser = new Eraser();

let herramientaActual;
let isHerramientaClicked = false;

//-----------Comportamiento del mouse------------------
let mouseDown = false;
let lastPosX, lastPosY;




//----------------------------------------------------
//                 EVENTOS DE MOUSE
//----------------------------------------------------

//Verifico si el mouse es clickeado y reasigno las variables correspondientes
document.addEventListener('mousedown', (e) =>{
    mouseDown = true;
    lastPosX = e.offsetX;
    lastPosY = e.offsetY;

    if(herramientaActual != null){
        isHerramientaClicked = true;
        herramientaActual.startDraw(ctx, lastPosX, lastPosY);
    }

});

//mientras se mantiene el mouse, se dibuja
document.addEventListener('mousemove', (e) =>{
    lastPosX = e.offsetX;
    lastPosY = e.offsetY;

    if(isHerramientaClicked && mouseDown && herramientaActual!= null){
        herramientaActual.continueDraw(ctx, lastPosX, lastPosY);
    }

});

//cuando se suelta
document.addEventListener('mouseup', (e) =>{
    mouseDown = false;
});


//-----------------------------------------------------
//                  CANVAS
//-----------------------------------------------------

function drawCanvas(){
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 1000, 700);
}

function cleanCanvas(){
    CANVAS.cleanCanvas;
    drawCanvas();
}

function main(){
    drawCanvas();
}

main();

//-----------------------------------------------------
//               EVENTOS DE BOTONES
//-----------------------------------------------------

document.querySelector("#pen").addEventListener('click', (e) =>{
    herramientaActual = pen;
});

document.querySelector("#eraser").addEventListener('click', (e) => {
    herramientaActual = eraser;
});

document.querySelector("#cleanAll").addEventListener('click', cleanCanvas);