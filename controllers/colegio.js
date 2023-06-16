//Importar paquetes requeridos de node
const {response}= require('express')
//const bcrypt = require('bcrypt') //encriptar IMPORTAR EL PAQUETE

//Importacion de los modelos 
const Colegio=require('../models/colegio')

//insercion, modificacion de datos

//consultar
const colegioGet = async(req, res = response)=>{
    const{Direccion}= req.query // desestructuracion obtiene lo que se manda del navegador
    

    //Buscar todos los usuarios colsultar los uasuarios
    const colegios = await Colegio.find()
    res.json({
        colegios
    })
}


const colegioPost= async(req, res= response)=>{
    //captura atributos o parametros
    const body=req.body
    let mensaje=''
    console.log(body)
   
   // const{nombre,password,rol,estado}=req.query
   // try si esta bien ejecuta lo de adentro el cath si esta malo muestra error
   try{
    const colegio= new Colegio(body) //instaciar el objeto


    //console.log(bcrypt.hashSync(body.password,10)) NPM INSTALL BCRYPT
    //const salt = 10
    //usuario.password = (bcrypt.hashSync(body.password,salt))


    //guardar objeto
    await colegio.save()
    mensaje='La insercion se realizo exitosamente'

   } catch(error){
    if (error) {
        if (error.name === 'ValidationError') {
            console.error(Object.values(error.errors).map(val => val.message))
            mensaje = Object.values(error.errors).map(val => val.message)
        }
    }
    console.log(mensaje)
    
       
    }


    res.json({
        msg: mensaje
    })

    
}

const colegioPut= async(req, res= response)=>{
    //captura atributos o parametros
    const{direccion, latitud, longitud, descripcion}=req.body
    let mensaje=''
    //realizar la moficiacion
   // el campo 1 es con el cual se va hacer la busqueda los demas son los campos que se va a modificar ejem nombre:nombre
    
    try{
        const colegio = await Colegio.findOneAndUpdate({direccion:direccion}, {latitud:latitud,longitud:longitud,descripcion:descripcion})
        mensaje='La modificacion se efectuo correctamente'

    }
    catch(error){
        mensaje='Se presentaron problemas en la modificacion'

    }

   

    res.json({
        msg: mensaje 
    })

}


const colegioDelete= async(req, res= response)=>{
    //captura atributos o parametros
    const{_id}=req.body
    let mensaje=''
    //realizar la moficiacion
   // el campo 1 es con el cual se va hacer la busqueda los demas son los campos que se va a modificar ejem nombre:nombre
    
    try{
        const colegio = await Colegio.deleteOne({_id : _id})
        mensaje='La eliminacion se efectuo correctamente.'

    }
    catch(error){
        mensaje='Se presentaron problemas en  la eliminacion.'

    }

   

    res.json({
        msg: mensaje 
    })

}


module.exports={
    colegioGet,
    colegioPost,
    colegioPut,
    colegioDelete
}
