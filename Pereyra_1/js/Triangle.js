import { Figure } from "./Figure.js";

export class Triangle extends Figure{
    constructor(ladoAx, ladoAy, ladoBx, ladoBy, ladoCx, ladoCy, color){
        super(ladoAx, ladoAy, color, "triangulo");
        this.ladoBx = ladoBx;
        this.ladoBy = ladoBy;
        this.ladoCx = ladoCx;
        this.ladoCy = ladoCy;
    }

    draw(ctx){
        ctx.beginPath();
        ctx.moveTo(super.getPosX(), super.getPosY()); //lo tiene el padre porque lo pase como punto inicial
        ctx.lineTo(this.ladoBx, this.ladoBy);
        ctx.lineTo(this.ladoCx, this.ladoCy);
        ctx.closePath();

        ctx.fillStyle = this.color;
        ctx.fill();

        if(this.isSelected){
            ctx.stroke();
        }
    }

    estaDentro(p, v1, v2){ //funcion para comparar si el punto se encuentra del lado correcto de la linea del vertice
        return (p[0] - v2[0]) * (v1[1] - v2[1]) - 
               (v1[0] - v2[0]) * (p[1] - v2[1]); 
    }

    isPointInside(x, y){
        //Convierto en arreglos las posiciones asi puedo reutilizar la funcion
        let punto = [x, y]; 
        let p1 = [this.posX, this.posY];
        let p2 = [this.ladoBx, this.ladoBy];
        let p3 = [this.ladoCx, this.ladoCy];

        let d1 = this.estaDentro(punto, p1, p2);
        let d2 = this.estaDentro(punto, p2, p3);
        let d3 = this.estaDentro(punto, p3, p1);

        if(d1 === 0 && d2 === 0 && d3 === 0){
            return false;
        }

        let isNeg = (d1 < 0) || (d2 < 0) || (d3 < 0);//verifico si todos los valores son del mismo signo
        let isPos = (d1 > 0) || (d2 > 0) || (d3 > 0);

        return !(isNeg && isPos); //si hay pos mezcladas significa que esta afuera
    }

    move(dx, dy){ //sobreescribo la funcion del padre porque debo cambiar la posicion de todos los lados (ya que cada lado es independiente)
        this.posX += dx;
        this.posY += dy;

        this.ladoBx += dx;
        this.ladoBy += dy;

        this.ladoCx += dx;
        this.ladoCy += dy;
    }
    
    randomRGBA(){
        let r = Math.floor(Math.random() * 80); 
        let g = Math.floor(Math.random() * 120); 
        let b = 150 + Math.floor(Math.random() * 106); 

        return `rgba(${r}, ${g}, ${b}, 1)`;
    }
}