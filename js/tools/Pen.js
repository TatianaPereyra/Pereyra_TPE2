import {Tool} from './Tool.js';
export class Pen extends Tool{
    constructor(){
        super("pen");
    }

     /**
     * @param {*} ctx - context del canvas
     * @param {*} x - eje x de la coordenada donde comenzar a dibujar.
     * @param {*} y - eje y de la coordenada donde comenzar a dibujar.
     */
    startDraw(ctx, x, y){
        ctx.globalCompositeOperation = "source-over"; 
        super.startDraw(ctx, x, y);
    }


}