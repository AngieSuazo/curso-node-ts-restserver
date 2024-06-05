import express, {Application} from 'express'; //se realiza instalación adicional 
// import * as userRoutes from '../routes/usuario'; impotar todo  lo que exporte ese paquete
import userRoutes from '../routes/usuario';
import cors from 'cors';
import db from '../db/connection';

 class Server{
    private app: Application ;
    private port:string;
    private apiPaths={
        usuarios: '/api/usuarios'
    }
    
    constructor(){
        this.app=express();
        this.port=process.env.PORT || '8000';
        //Rutas iniciales
        this.dbConnection();
        this.middlewares();
        this.routes();
    }
//TODO conectar BD
    async dbConnection (){
    try {
        await db.authenticate();
        console.log('database online');
        
    } catch (error) {
        throw Error(String(error));//convertir a String
    }    
    }

    middlewares(){
        //CORS
        this.app.use(cors());

        //lectura del body
        this.app.use(express.json()); //express parsea el body

        //Carpeta pública
        this.app.use(express.static('public'));
    }

    routes(){
        this.app.use(this.apiPaths.usuarios, userRoutes)
    }
    listen(){
        this.app.listen(this.port, ()=>{
            console.log('Servidor corriendo en puerto! '+ this.port);
            
        })
    }
}

export default Server;