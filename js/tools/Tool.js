//Clase "abstracta" de herramientas para definir comportamiento similar.
export class Tool{

    //----------------------------------------
    //          DIBUJO SOBRE EL CANVAS
    //---------------------------------------

    //Definicion de metodos
    startDraw(ctx, x, y){
        ctx.beginPath();
        ctx.moveTo(x, y);
    }

    continueDraw(ctx, x, y){
        ctx.lineTo(x, y);
        ctx.stroke();
    }

}