import { Filter } from "../Filter.js";

export class BrilloFilter extends Filter{
    constructor(){
        super();
        this.valor = 1;
    }

    aplicar(imageData){
        let data = imageData.data;
        let gamma = 2 - this.valor;

        for(let i = 0; i < data.length; i+=4){
            let r = data[i];
            let g = data[i+1];
            let b = data[i+2];

            data[i] = 255 * Math.pow(r/255, gamma);
            data[i+1] = 255 * Math.pow(g/255, gamma);
            data[i+2] = 255 * Math.pow(b/255, gamma);
        }
        return imageData;
    }

    setValor(valor){
        this.valor = valor;
    }
}