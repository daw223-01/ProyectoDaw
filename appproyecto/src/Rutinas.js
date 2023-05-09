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
            rutinas: "",
            ejerciciosRutinas: ""
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

    //FUNCION PARA OBTENER DATOS DE RUTINA
    async obtenerDatosRutina(element) {
        let listado = [];

        let nomRut = element.target.textContent;
        console.log(nomRut);

        let consulta = await getEjerciciosRutinas(nomRut);

        consulta.forEach(datosRutina => {
            listado.push(datosRutina);
        });

        this.setState({
            ejerciciosRutinas: listado
        }, () => {

        });
    }

    //SE EJECUTA LA FUNCION AL RENDERIZAR EL COMPONENTE
    componentDidMount() {
        this.obtenerRutinas();
    }

    render() {

        //COMO EL RESULTADO ES UN OBJETO CON OBJETOS, SE DEBE ITERAR DE ESTA FORMA
        let rutinas = Object.keys(this.state.rutinas).map((rutina, index) => (
            <div className="card col-sm-12 col-m-5 col-lg-3 m-2">
                <div className="card-body">
                    <h2 className="card-title" onClick={this.obtenerDatosRutina.bind(this)} data-bs-toggle="modal" data-bs-target="#ejRutModal">
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
                    <DatosRutina datosRutina={this.state.ejerciciosRutinas}></DatosRutina>
                    <div className="row">
                        {rutinas}
                    </div>
                </div>
            </div>
        )
    }
}



/**FUNCIONES Y COMPONENTES EXTRA**/

//FUNCION PARA OBTENER LOS DATOS DE LAS  RUTINAS
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

//FUNCION PARA OBTENER LOS EJERCICIOS DE ESA RUTINA
async function getEjerciciosRutinas(nombreRutina) {
    let user = localStorage.getItem('username');
    let datos = {
        username: user,
        nomRut: nombreRutina
    }

    let options = {
        method: "POST",
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    }
    let consulta = await fetch(rutaDes + "/getEjercicioRutina", options);

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


//COMPONENTE QUE GENERA UN MODAL PARA VER LOS DETALLES DE LA RUTINA
class DatosRutina extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let datosRutina = this.props.datosRutina;
        console.log(datosRutina);
        let lista = Object.keys(datosRutina).map(element => (
            <div className="row">
                <div className="col-3">{datosRutina[element].nomEjercicio}</div>
                <div className="col-3">{datosRutina[element].rondas}</div>
                <div className="col-3">{datosRutina[element].repeticiones}</div>
                <div className="col-3">{datosRutina[element].tiempo}</div>
            </div>
        ))
        return (
            <div id="ejRutModal" className="modal fade">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            <form className="container-fluid">
                                <div className="row">
                                    <div className="col-3">Nombre del Ejercicio</div>
                                    <div className="col-3">Rondas</div>
                                    <div className="col-3">Repeticiones/Ronda</div>
                                    <div className="col-3">Tiempo</div>
                                </div>
                                {lista}
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}