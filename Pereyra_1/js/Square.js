import { Figure } from "./Figure.js";

export class Square extends Figure{
    constructor(x, y, size){
        super(x, y, "cuadrado");
        this.size = size; //solo uno porque un cuadrado tiene los 4 lados iguales
    }

    getSize(){
        return this.size;
    }

    draw(ctx){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.posX, this.posY, this.size, this.size); //se dibuja y rellena directamente

        if(this.isSelected){
            ctx.strokeRect(this.posX, this.posY, this.size, this.size);
        }
    }

    isPointInside(x, y){
        let isInsideX = ((x >= this.posX) && (x<= (this.posX + this.size))); 
        let isInsideY = ((y >= this.posY) && ( y <= (this.posY + this.size)));

        return (isInsideX && isInsideY);
    }

    randomRGBA(){ //Tonalidades violetas para ser complementario al amarillo de los circulos
        let r = 150 + Math.floor(Math.random() * 106);
        let g = Math.floor(Math.random() * 80);
        let b = 150 + Math.floor(Math.random() * 106);

        return `rgba(${r}, ${g}, ${b}, 1)`;

    }


}