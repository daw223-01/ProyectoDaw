import React from "react";
import './Perfil.css';


/**RUTAS PARA USARSE EN LOS DIFERENTES ENTORNOS**/

//RUTA DE PRODUCCION
//let rutaProd = "http://now-exercise.ddns.net/api";

//RUTA DE DESARROLLO
let rutaDes = "http://localhost/api";


export default class Perfil extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nombre: "",
            apellidos: "",
            correo: "",
            username: "",
            contraseña: ""
        }
    }

    //FUNCION PARA OBTENER LOS DATOS DEL USUARIO
    async datosUsuario() {

        try {
            //AL HACER LA CONSULTA A LA API, SE DEVUELVE EL VALOR TRUE Y UN OBJETO CON LOS DATOS DEL USUARIO
            //LOS DATOS DEL USUARIO ESTAN EN LA POSICION 1 DEL ARRAY
            let datos = await getInfo();

            //ESTABLECER EN EL ESTADO LOS DATOS EXISTENTES DE USUARIO
            this.setState({
                nombre: datos[1].nombre,
                apellidos: datos[1].apellidos,
                correo: datos[1].correo,
                username: datos[1].username,
                contraseña: datos[1].contraseña
            }, () => { });
        } catch (error) {
            alert(error);
        }

    }

    //EVENTO PARA DETECTAR SI LA CONTRASEÑA QUE SE CAMBIA COINCIDE
    handleChange(element) {
        let repContraseña = element.target.value;
        let newContraseña = document.querySelector("#nuevaContraseña").value;
        let btn = document.querySelector("#contraseña input[type=submit]");
        if (repContraseña != newContraseña) {
            element.target.style.background = "rgba(255, 69, 29, 0.3)";
            btn.disabled = true;
        } else {
            element.target.style.background = "rgba(29, 255, 84, 0.3)";
            btn.disabled = false;
        }

    }

    //FUNCION CUANDO SE ENVÍA EL FORMULARIO
    async handleSubmit(element) {
        //EN FUNCION DEL NUMERO DE DATOS QUE SE LE ENVÍE
        let datos = element.target.querySelectorAll(".datosUsuario");

        try {
            let consulta = await actualizarInfo(datos.length, datos);

            alert(consulta);

            //CERRAR TODAS LAS SESIONES
            localStorage.clear();

        } catch (error) {
            alert(error);
        }

    }

    render() {
        //EJECUTAR LA FUNCION AL INCIIO
        this.datosUsuario();
        let usuario = {
            username: this.state.username,
            nombre: this.state.nombre,
            apellidos: this.state.apellidos,
            correo: this.state.correo,
            contraseña: this.state.contraseña
        }
        return (
            <div id="datosPersonales">
                <form id="datos" onSubmit={this.handleSubmit.bind(this)}>
                    <h2>Datos personales</h2>

                    <label>Nombre de usuario</label>
                    <input type="text" className="datosUsuario" name="username" defaultValue={usuario.username} disabled></input>

                    <label>Nombre</label>
                    <input type="text" className="datosUsuario" name="nombre" defaultValue={usuario.nombre}></input>

                    <label>Apellidos</label>
                    <input type="text" className="datosUsuario" name="apellidos" defaultValue={usuario.apellidos}></input>

                    <label>Correo</label>
                    <input type="email" className="datosUsuario" name="correo" defaultValue={usuario.correo}></input>

                    <input type="submit" value="Confirmar cambios"></input>

                </form>

                <form id="contraseña" onSubmit={this.handleSubmit.bind(this)}>
                    <h2>Contraseña</h2>

                    <label>Contraseña</label>
                    <input type="password" name="contraseña" defaultValue={usuario.contraseña} disabled></input>

                    <label>Nueva contraseña</label>
                    <input type="password" className="datosUsuario" name="nuevaContraseña" id="nuevaContraseña"></input>

                    <label>Repite la nueva contraseña</label>
                    <input type="password" className="datosUsuario" name="repNuevaContraseña" onChange={this.handleChange.bind(this)}></input>

                    <input type="submit" value="Cambiar contraseña"></input>
                </form>

            </div>
        )
    }
}


/**FUNCIONES ADICIONALES**/

//OBTENER LA INFORMACION DEL USUARIO DE LA BDD
async function getInfo() {

    let usuario = {
        email: localStorage.getItem("mail"),
        password: localStorage.getItem("password")
    }

    let options = {
        method: "POST",
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuario)
    }

    let consulta = await fetch(rutaDes + "/users", options);

    if (consulta.ok) {
        return consulta.json();
    } else {
        alert(consulta.statusText);
    }
}

//ACTUALIZAR LOS DATOS DE LA BASE DE DATOS
async function actualizarInfo(numeroDatos, informacion) {
    let usuario = "";
    //DEFINIR LOS VALORES A MANDAR EN LA CONSULTA
    switch (numeroDatos) {
        case 4:
            usuario = {
                username: informacion[0].value,
                nombre: informacion[1].value,
                apellidos: informacion[2].value,
                correo: informacion[3].value
            }

            break;

        case 2:

            usuario = {
                username: localStorage.getItem('username'),
                contraseña: informacion[0].value
            }
            break;

        default:
            break;
    }

    console.log(usuario);

    //OPCIONES PARA LA CONSULTA A LA API
    let options = {
        method: "POST",
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuario)
    }

    //CONSULTA A LA API
    let consulta = await fetch(rutaDes + "/update", options);

    if (consulta.ok) {
        return consulta.json();
    }
}