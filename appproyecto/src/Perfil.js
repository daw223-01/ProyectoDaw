import React from "react";

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

    async datosUsuario() {

        try {
            //AL HACER LA CONSULTA A LA API, SE DEVUELVE EL VALOR TRUE Y UN OBJETO CON LOS DATOS DEL USUARIO
            //LOS DATOS DEL USUARIO ESTAN EN LA POSICION 1 DEL ARRAY
            let datos = await getInfo();
            

            this.setState({
                nombre: datos[1].nombre,
                apellidos: datos[1].apellidos,
                correo: datos[1].correo,
                username: datos[1].username,
                contraseña: datos[1].contraseña
            });
            


        } catch (error) {
            alert(error);
        }

    }

    render() {
        { this.datosUsuario() }
        return (
            <div id="datosPersonales">
                <form>
                    <h2>Datos personales</h2>
                    <label>Nombre</label>
                    <input type="text" name="nombre" value={this.state.nombre}></input>
                    <br></br>
                    <label>Apellidos</label>
                    <input type="text" name="apellidos" value={this.state.apellidos}></input>
                    <br></br>
                    <label>Correo</label>
                    <input type="email" name="correo" value={this.state.correo}></input>
                    <br></br>
                    <label>Contraseña</label>
                    <input type="password" name="contraseña" value={this.state.contraseña}></input>
                </form>
            </div>
        )
    }
}


/**FUNCIONES ADICIONALES**/
async function getInfo() {

    let usuario = {
        email: sessionStorage.getItem("mail"),
        password: sessionStorage.getItem("password")
    }

    let options = {
        method: "POST",
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuario)
    }

    let consulta = await fetch("http://localhost/api/users", options);

    if (consulta.ok) {
        return consulta.json();
    } else {
        alert(consulta.statusText);
    }
}