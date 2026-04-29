export class Figure{
    constructor(x, y, name){
        this.posX = x;
        this.posY = y;
        this.isSelected= false;
        this.color = this.randomRGBA();
        this.name = name;
    }

    draw(ctx){
       //conceptualmente seria abstracto, por eso queda vacio.
    }

    getIsSelected(){
        return this.isSelected;
    }

    setIsSelected(value){
        this.isSelected = value;
    }

    getPosX(){
        return this.posX;
    }
    
    getPosY(){
        return this.posY;
    }

    isPointInside(x, y){
        return false;
    }

    moveTo(x, y){
        this.posX = x;
        this.posY = y;
    }

    getName(){
        return this.name;
    }

    move(dx, dy){ //muevo solo la distancia que me falta
        this.posX += dx;
        this.posY += dy;
    }

    randomRGBA(){
       //abstracto porque cada objeto va a tener una tonalidad diferente
    }

}