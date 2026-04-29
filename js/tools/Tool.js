/**
 * @description
 * Clase "padre" de Pen y Eraser. Define comportamiento similar entre las herramientas. 
 * Cada herramienta modifica el metodo segun sea necesario.
 */

export class Tool{
    constructor(descripcion){
        this.descripcion = descripcion;
    }

    getDescripcion(){
        return this.descripcion;
    }

    startDraw(ctx, x, y){
        ctx.beginPath();
        ctx.moveTo(x, y);
    }

    continueDraw(ctx, x, y){
        ctx.lineTo(x, y);
        ctx.stroke();
    }

}