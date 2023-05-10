import React from "react";
// import './Perfil.css';


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
        element.preventDefault();
        //EN FUNCION DEL NUMERO DE DATOS QUE SE LE ENVÍE
        let datos = element.target.querySelectorAll(".datosUsuario");

        let consulta = await actualizarInfo(datos.length, datos);

        alert("Cambios realizados con exito");

        //CERRAR TODAS LAS SESIONES
        // localStorage.clear();
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
            <div id="datosPersonales" className="d-flex justify-content-start">
                <form id="datos" onSubmit={this.handleSubmit.bind(this)} className="m-3 d-flex flex-column align-items-left">
                    <div className="mb-2">
                        <h2 >Datos personales</h2>
                    </div>

                    <div className="row mb-3">
                        <div className="col">
                            <label className="form-label">Nombre</label>
                            <input type="text" className="datosUsuario form-control" name="nombre" defaultValue={usuario.nombre}></input>
                        </div>
                        <div className="col">
                            <label className="form-label">Apellidos</label>
                            <input type="text" className="datosUsuario form-control" name="apellidos" defaultValue={usuario.apellidos}></input>
                        </div>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Nombre de usuario</label>
                        <input type="text" className="datosUsuario form-control" name="username" defaultValue={usuario.username} disabled></input>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Correo</label>
                        <input type="email" className="datosUsuario form-control" name="correo" defaultValue={usuario.correo}></input>
                    </div>

                    <div className="mb-2">
                        <input type="submit" value="Confirmar cambios" className="btn btn-outline-light"></input>
                    </div>
                </form>

                <form id="contraseña" onSubmit={this.handleSubmit.bind(this)} className="m-3 d-flex flex-column align-items-left">
                    <div className="mb-2">
                        <h2>Contraseña</h2>
                    </div>

                    <div className="mb-2">
                        <label className="form-label">Contraseña</label>
                        <input className="form-control" type="password" name="contraseña" defaultValue={usuario.contraseña} disabled></input>
                    </div>
                    <div className="mb-2">
                        <label className="form-label">Nueva contraseña</label>
                        <input type="password" className="datosUsuario form-control" name="nuevaContraseña" id="nuevaContraseña"></input>
                    </div>
                    <div className="mb-2">
                        <label className="form-label">Repite la nueva contraseña</label>
                        <input type="password" className="datosUsuario form-control" name="repNuevaContraseña" onChange={this.handleChange.bind(this)}></input>
                    </div>

                    <div className="mb-2">
                        <input type="submit" value="Cambiar contraseña" className="btn btn-outline-light"></input>
                    </div>
                </form>
            </div>
        )
    }
}


/**FUNCIONES ADICIONALES**/

//OBTENER LA INFORMACION DEL USUARIO DE LA BDD
async function getInfo() {

    let usuario = {
        email: localStorage.getItem("mail")
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
                username: informacion[2].value,
                nombre: informacion[0].value,
                apellidos: informacion[1].value,
                correo: informacion[3].value
            }
            console.log(usuario);

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