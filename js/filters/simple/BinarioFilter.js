import { Filter } from "../Filter.js";
export class BinarioFilter extends Filter{
    /**
     * @param {Array} imageData - arregl ImageData
     * 
     * @description
     * Recorre los pixeles de la imagen, y verifica el nivel de brillo para determinar
     * si pasarlo a blanco o negro.
     * 
     * @returns - ImageData modificado
     */
    aplicar(imageData){
        let umbral = 128;
        let data = imageData.data;

        for(let i = 0; i < data.length; i += 4) {
            let brillo = (data[i] + data[i+1] + data[i+2]) / 3;
            
            if(brillo > umbral) {//si es mas brillo lo paso a blanco
                data[i] = 255;
                data[i+1] = 255;
                data[i+2] = 255;
            } else {            //sino a negro
                data[i] = 0;
                data[i+1] = 0;
                data[i+2] = 0;
            }
        }

        return imageData;
    }

}