import {Tool} from './Tool.js';

export class Eraser extends Tool{
    constructor(){
        super("eraser");
    }

    startDraw(ctx, x, y){
        ctx.globalCompositeOperation = "destination-out";
        super.startDraw(ctx, x, y);
    }

}