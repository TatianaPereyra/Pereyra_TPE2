import { Figure } from "./Figure.js";

export class Circle extends Figure{
    constructor(x, y, radius){
        super(x, y, "circulo");
        this.radius = radius;
    }

    draw(ctx){ //dibujo el circulo
        ctx.beginPath();
        ctx.arc(this.posX, this.posY, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();

        //La figura debe saber si esta seleccionada o no
        if(this.isSelected){
            ctx.stroke();
        }

        ctx.closePath();
    }

    isPointInside(x, y){ //verifico si se enc<uentra dentro de los limites de mi circunferencia
       let disX = (this.posX - x) //distancia en x
       let  disY = (this.posY - y) //distancia en y

       return (Math.sqrt((disX * disX ) + (disY * disY)) <= (this.radius));
    }

    randomRGBA(){
        let r = 200 + Math.floor(Math.random() * 56); 
        let g = 200 + Math.floor(Math.random() * 56); 
        let b = Math.floor(Math.random() * 80);       

        return `rgba(${r}, ${g}, ${b}, 1)`;
    }

}