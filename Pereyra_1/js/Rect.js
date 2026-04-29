import { Figure } from "./Figure.js";

export class Rect extends Figure{
    constructor(x, y, width, height){
        super(x, y, "rectangulo");
        this.width = width;
        this.height = height;
    }

    draw(ctx){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.posX, this.posY, this.width, this.height); //se dibuja y rellena directamente

        if(this.isSelected){
            ctx.strokeRect(this.posX, this.posY, this.width, this.height);
        }
    }

    isPointInside(x, y){ 
        let isInsideX = ((x >= this.posX) && (x<= (this.posX + this.width)));
        let isInsideY = ((y >= this.posY) && ( y <= (this.posY + this.height)));

        return (isInsideX && isInsideY);
    }

    randomRGBA(){
        let r = 200 + Math.floor(Math.random() * 56); 
        let g = 100 + Math.floor(Math.random() * 100); 
        let b = Math.floor(Math.random() * 60); 

        return `rgba(${r}, ${g}, ${b}, 1)`;
    }

}