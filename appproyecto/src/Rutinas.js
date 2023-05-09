import React from "react";
import './Rutinas.css';

/**RUTAS PARA USARSE EN LOS DIFERENTES ENTORNOS**/

//RUTA DE PRODUCCION
//let rutaProd = "http://now-exercise.ddns.net/api";

//RUTA DE DESARROLLO
let rutaDes = "http://localhost/api";


export default class Rutinas extends React.Component {

    constructor() {
        super();
        this.state = {
            rutinas: ""
        }
    }

    //FUNCION QUE EJECUTA OBTENER DATOS
    async obtenerRutinas() {
        let listado = [];

        let consulta = await getRutinas();
        for (let i = 0; i < consulta.length; i++) {
            const element = consulta[i];

            listado.push(element);
        }

        this.setState({
            rutinas: listado
        });

    }

    //SE EJECUTA LA FUNCION AL RENDERIZAR EL COMPONENTE
    componentDidMount() {
        this.obtenerRutinas();
    }

    render() {

        //COMO EL RESULTADO ES UN OBJETO CON OBJETOS, SE DEBE ITERAR DE ESTA FORMA
        let rutinas = Object.keys(this.state.rutinas).map((rutina, index) => (
            <div className="card col-sm-6 col-lg-4 m-2">
                {console.log(this.state.rutinas[rutina])}
                <div className="card-body">
                    <h2 className="card-title">
                        {this.state.rutinas[rutina]}
                    </h2>
                </div>
            </div>
        ));


        return (

            <div id="rutinas" className="d-flex flex-column p-2">
                {/* MODAL PARA AÑADIR NUEVAS RUTINAS */}
                <NuevaRutina></NuevaRutina>
                <div className="navbar">
                    <div className="container-fluid">
                        <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#rutinaModal">Nueva rutina</button>
                    </div>
                </div>

                {/* RUTINAS DEL USUARIO */}
                <div className="container-fluid">
                    <div className="row">
                        {rutinas}
                    </div>
                </div>
            </div>
        )
    }
}



/**FUNCIONES Y COMPONENTES EXTRA**/

//FUNCION PARA OBTENER LAS RUTINAS Y MOSTRARLAS POR PANTALLA
async function getRutinas() {
    let username = localStorage.getItem("username");

    let options = {
        method: "POST",
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(username)
    }
    let consulta = await fetch(rutaDes + "/getrutinas", options);

    if (consulta.ok) {
        return consulta.json();
    }
}


//COMPONENTE QUE GENERA UN MODAL PARA AÑADIR RUTINAS
class NuevaRutina extends React.Component {

    //FUNCION AL AÑADIR RUTINA
    async newRutina() {
        try {
            let consulta = await this.setRutina();
            window.location.reload();
        } catch (error) {

        }
    }
    async setRutina() {
        let username = localStorage.getItem("username");
        let nombreRutina = document.querySelector("#nombreRutina").value;

        let body = {
            user: username,
            rutina: nombreRutina
        };
        console.log(body);

        let options = {
            method: "POST",
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }

        let consulta = await fetch(rutaDes + "/setrutinas", options);

        if (consulta.ok) {
            return (consulta.json());
        }
    }

    render() {
        return (
            <div id="rutinaModal" className="modal fade">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 className="modal-title">Nueva rutina</h3>
                            <button className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            <form className="container-fluid">
                                <div className="row">
                                    <input id="nombreRutina" type="text" className="form-control col-4" placeholder="Nombre de la rutina"></input>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                            <button type="button" class="btn btn-primary" onClick={this.newRutina.bind(this)}>Añadir</button>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}