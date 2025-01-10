class Paciente extends Connect {
    constructor() {
        super();
        this.id_paciente = 0;
        this.name = '';
        this.email = '';
        this.sex = ''; 
        this.age = '';
        this.weight = '';
        this.height = ''; 
        this.goal = ''; 
        this.physicalFreq = '';
        this.token = ''; // Almacenar el token
    }

    
    setData(data){ 
        this.id_paciente = data.id_paciente; 
        this.name = data.name; 
        this.email = data.email; 
        this.sex = data.sex;
        this.age = data.age;
        this.weight = data.weight;
        this.height = data.height;
        this.goal = data.goal;
        this.physicalFreq = data.physicalFreq;    //Solo para registro 
    } 
 
    getData(){

        let data = {
            "id_paciente": this.id_paciente,
            "name": this.name,
            "email": this.email,
            "sex": this.sex,
            "age": this.age,
            "weight": this.weight,
            "height": this.height,
            "goal": this.goal, 
            "physicalFreq": this.physicalFreq
        };

        return data
    }

    //Guardar token en localStorage
    storeToken(token) {
        this.token = token;
        localStorage.setItem('authToken', token);
    }

    //Recuperar token de localStorage
    retrieveToken() {
        this.token = localStorage.getItem('authToken');
        return this.token;
    }


    //Metodo para crear Paciente
    crearPaciente(data, registerCallback){
        const endpoint = 'paciente'; 
        const method = 'POST'; 
        this.connect(data, endpoint, method, registerCallback); 

    
    }

    /**getLatesId(dataR, idCallback) {
        const endpoint = 'paciente/:id_p';
        const method = 'GET';
        this.connect(dataR, endpoint, method, idCallback)
    }*/

    //Metodo para añadir info extra al Paciente registrado
    addInfo(data, infoCallback){
        const endpoint = 'paciente'; 
        const method = 'PUT'; 
        this.connect(data, endpoint, method, infoCallback); 
    }

    //Metodo para verificar login 
    login(dataReq, loginCallback){ 
        const endpoint = 'paciente/login'; 
        const method = 'POST'; 
        this.connect(dataReq, endpoint, method, loginCallback); 
    } 


};



