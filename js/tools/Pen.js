import {Tool} from './Tool.js';
export class Pen extends Tool{
    constructor(){
        super("pen");
    }

    //Cada que comienzo un trazo, establezco el estilo de la linea
    startDraw(ctx, x, y){
        ctx.globalCompositeOperation = "source-over"; 
        super.startDraw(ctx, x, y);
    }


}