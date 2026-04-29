import {Tool} from './Tool.js';

export class Eraser extends Tool{
    constructor(){
        super("eraser");
    }

    /**
     * @param {*} ctx - context del canvas
     * @param {*} x - eje x de la coordenada donde comenzar a dibujar.
     * @param {*} y - eje y de la coordenada donde comenzar a dibujar.
     */
    startDraw(ctx, x, y){
        ctx.globalCompositeOperation = "destination-out";
        super.startDraw(ctx, x, y);
    }

}