import { Pen } from "./tools/Pen.js";
import { Eraser } from "./tools/Eraser.js";
import { ToolsController } from "./controllers/ToolsController.js";
import { ImageController } from "./controllers/ImageController.js";

"use strict";

//-----------------------------------------------------
//    DECLARACION DE CONSTANTES Y VARIABLES
//-----------------------------------------------------

const CANVAS = document.querySelector("#canvas");
let ctx = CANVAS.getContext("2d");


let toolController = new ToolsController(ctx);
let imageController = new ImageController(ctx);


//-----------------------------------------------------
//                  CANVAS
//-----------------------------------------------------

function drawCanvas(){
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 800, 600);
}

export function cleanCanvas(){
    ctx.clearRect(0, 0, CANVAS.width, CANVAS.height);
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
    toolController.setTool(new Pen());
});

document.querySelector("#eraser").addEventListener('click', (e) => {
    toolController.setTool(new Eraser());
});

document.querySelector("#clean").addEventListener('click', cleanCanvas);

let input = document.getElementById("fileInput");

/**
 * @description
 * Toma el valor del input y lo envia a imageController para que procese la imagen.
 */
function cargar(){
    imageController.loadImage(input.files[0]);
    input.value = "";
}

document.querySelector("#load").addEventListener("click", (e) => {
    input.click();
});

input.addEventListener("change", (e) =>{
    cargar();
});

document.querySelector(".sizePicker").addEventListener('input', (e) => {
    let value = e.target.value;
    toolController.setTamaño(value);
});

document.querySelector("#colorPicker").addEventListener("input",(e)=>{
    toolController.setColor(e.target.value);
});

document.querySelector("#download")
    .addEventListener("click", descargarImagen);


/**
 * @description
 * Toma la imagen del canvas, y crea un elemento link de descargar con la misma.
 */
function descargarImagen(){

    let link = document.createElement("a");

    link.download = "mi-imagen.png";
    link.href = CANVAS.toDataURL("image/png");

    link.click();
}

//POPUP DE INGRESO
let popup = document.querySelector("#popupInicio");

document.querySelector("#btnBlanco").addEventListener('click', (e) =>{
    popup.style.display = "none";
});

document.querySelector("#btnImagen").addEventListener("click", () => {
    popup.style.display = "none";
    input.click();
});