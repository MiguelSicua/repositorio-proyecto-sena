class Alimentos extends Connect {
    constructor() {
        super();
        this.id_alimento = 0;
        this.nameAlimento = '';
        this.cantidadPorcion = ''; 
        this.proteinas = ''; 
        this.gmgP = ''; 
        this.carbohidratos = ''; 
        this.gmgCar = ''; 
        this.grasas = ''; 
        this.gmgGra = ''; 
        this.calorias = ''; 
        this.glucosa = ''; 
        this.gmgGlu = ''; 
        this.sodio = ''; 
        this.gmgSod = '';    
    }


    setData(data){
        this.id_alimento = data.id_alimento;
        this.nameAlimento = data.nameAlimento;
        this.cantidadPorcion = data.cantidadPorcion; 
        this.proteinas = data.proteinas; 
        this.gmgP = data.gmgP; 
        this.carbohidratos = data.carbohidratos; 
        this.gmgCar = data.gmgCar; 
        this.grasas = data.grasas; 
        this.gmgGra = data.gmgGra; 
        this.calorias = data.calorias; 
        this.glucosa = data.glucosa; 
        this.gmgGlu = data.gmgGlu;
        this.sodio = data.sodio; 
        this.gmgSod = data.gmgSod;

    }

    getData(){
        let data = {
            "id_alimento": this.id_alimento,
            "nameAlimento": this.nameAlimento,
            "cantidadPorcion": this.cantidadPorcion, 
            "proteinas": this.proteinas, 
            "gmgP": this.gmgP, 
            "carbohidratos": this.carbohidratos, 
            "gmgCar": this.gmgCar, 
            "grasas": this.grasas, 
            "gmgGra": this.gmgGra, 
            "calorias": this.calorias, 
            "glucosa": this.glucosa, 
            "gmgGlu": this.gmgGlu, 
            "sodio": this.sodio, 
            "gmgSod": this.gmgSod  
        };
        return data
    }


    //Datos de alimento, por nombre 
    consultarAlimento(nameAlimento, callback){ 
        const endpoint = 'alimentos/:nameAlimento'; 
        const method = 'POST'; 
        this.connect(nameAlimento, endpoint, method, callback); }


    addAlimento(nameAlimento, inCallback){ 
        const endpoint = '/dieta/:dietaId/alimentos/:alimentoId'; 
        const method = 'POST'; 
        this.connect(nameAlimento, endpoint, method, inCallback); }



}