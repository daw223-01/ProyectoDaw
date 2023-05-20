import React from "react";
import './Rutinas.css';

/**RUTAS PARA USARSE EN LOS DIFERENTES ENTORNOS**/

//RUTA DE PRODUCCION
let ruta = "http://now-exercise.ddns.net/api";

//RUTA DE DESARROLLO
//let ruta = "http://localhost/api";


export default class Rutinas extends React.Component {

    constructor() {
        super();
        this.state = {
            rutinas: "",
            ejerciciosRutinas: "",
            tituloRutina: ""
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
            ejerciciosRutinas: listado,
            tituloRutina: element.target.textContent
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
                    <DatosRutina datosRutina={this.state.ejerciciosRutinas} tituloRutina={this.state.tituloRutina}></DatosRutina>
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
    let consulta = await fetch(ruta + "/getrutinas", options);

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
    let consulta = await fetch(ruta + "/getEjercicioRutina", options);

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

        let consulta = await fetch(ruta + "/setrutinas", options);

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
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                            <button type="button" className="btn btn-primary" onClick={this.newRutina.bind(this)}>Añadir</button>
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
        this.state = {
            listaEjRutina: ""
        }
    }

    //FUNCIONES ELIMINAR RUTINA
    async deleteRutina() {
        let nombreRutina = document.querySelector("#ejRutModal h2").textContent;
        let username = localStorage.getItem("username");

        let respuesta = await this.findRutinaDelete(nombreRutina, username);
        window.location.reload();
    }
    async findRutinaDelete(rutina, user) {
        let options = {
            method: "POST",
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: user,
                rutinaName: rutina
            })
        }
        let consulta = await fetch(ruta + "/deleteRutina", options);

        if (consulta.ok) {
            return consulta.json();
        }
    }

    //FUNCIONES BORRAR EJERCICIO DE RUTINA
    async deleteEjRutina(element) {
        let nombreRutina = document.querySelector("#ejRutModal h2").textContent;
        let username = localStorage.getItem("username");

        let btnDel = element.target;
        let parent = btnDel.parentElement;
        console.log(parent);
        let ejercicio = parent.querySelectorAll("div")[0].textContent;

        let respuesta = await this.findEj(nombreRutina, username, ejercicio);

        window.location.reload();

    }
    async findEj(rutina, user, ej) {
        let options = {
            method: "POST",
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: user,
                rutinaName: rutina,
                ejercicio: ej
            })
        }
        let consulta = await fetch(ruta + "/deleteEjRutina", options);

        if (consulta.ok) {
            return consulta.json();

        }
    }

    //FUNCION PARA GENERAR LISTA DE EJERCICIOS/RUTINA
    showEjerciciosRutina() {
        let datosRutina = this.props.datosRutina;

        let lista = Object.keys(datosRutina).map(element => (
            <div class="row border-bottom">
                <div class="col text-wrap me-2 p-1">{datosRutina[element].nomEjercicio}</div>
                <div class="col text-wrap me-2 p-1">{datosRutina[element].rondas}</div>
                <div class="col text-wrap me-2 p-1">{datosRutina[element].repeticiones}</div>
                <div class="col text-wrap me-2 p-1">{datosRutina[element].tiempo}</div>
                <button type="button" className="btn btn-outline-danger text-wrap" onClick={this.deleteEjRutina.bind(this)}>Eliminar</button>
            </div>
        ));

        return lista;
    }

    //FUNCION AL INICIAR EL COMPONENTE
    componentDidMount() {
        this.showEjerciciosRutina();
    }

    render() {

        return (
            <div id="ejRutModal" className="modal fade">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2>{this.props.tituloRutina}</h2>
                            <button className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            <form className="container-fluid">
                                <div class="row border-bottom">
                                    <div class="col text-wrap me-2 p-1">Nombre del Ejercicio</div>
                                    <div class="col text-wrap me-2 p-1">Rondas</div>
                                    <div class="col text-wrap me-2 p-1">Repeticiones/Ronda</div>
                                    <div class="col text-wrap me-2 p-1">Tiempo</div>
                                </div>
                                {this.showEjerciciosRutina()}
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-outline-danger col-2" onClick={this.deleteRutina.bind(this)}>Eliminar rutina</button>
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}