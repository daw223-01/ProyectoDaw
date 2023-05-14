import { element } from "prop-types";
import React from "react";
import './Modal.css';

/**RUTAS PARA USARSE EN LOS DIFERENTES ENTORNOS**/

//RUTA DE PRODUCCION
//let ruta = "http://now-exercise.ddns.net/api";

//RUTA DE DESARROLLO
let ruta = "http://localhost/api";


export default class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            video: false,
            rutinas: ""
        }
    }

    //FUNCION PARA OBTENER LAS RUTINAS EXISTENTES
    async getRutinas() {
        let listado = [];

        let rutinas = await obtenerRutinas();

        for (let i = 0; i < rutinas.length; i++) {
            const rutina = rutinas[i];
            listado.push(rutina);
        }

        this.setState({
            rutinas: listado
        });
    }

    //FUNCION PARA AÑADIR EJERCICIOS A LA RUTINA
    async addRutinasEjercicios(){
        let consulta = await rutinasEjercicios();

        //REINICIAR VALORES FORMULARIO
        document.querySelector(".selectModal").value="Selecciona rutina";

        let grupoInputs = document.querySelectorAll("input");
        grupoInputs.forEach(element => {
            element.value = "";
        });
    }

    //EJECUTAR FUNCIONES AL INCIIAR COMPONENTE
    componentDidMount(){
        this.getRutinas();
    }

    render() {
        let urlVideo = this.props.datos.video;
        let titulo = this.props.datos.titulo;
        let desc = this.props.datos.descripcion;

        //LISTA DE LAS RUTINAS DE ESE USUARIO
        let listaRutinas = Object.keys(this.state.rutinas).map((rutina, index)=>(
            <option>
                {this.state.rutinas[rutina]}
            </option>
        ));

        return (
            <div id="ventanaModal" className="modal fade">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 className="modal-title titleModal">{titulo}</h3>
                            <button className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            <video src={urlVideo} autoPlay loop muted width="100%">
                            </video>
                            <p>{desc}</p>
                            <form className="container-fluid">
                                <div className="row">
                                    <select className="form-select col-4 selectModal">
                                        {/* {LISTA CON LAS RUTINAS DEL USUARIO} */}
                                        <option selected>Selecciona rutina</option>
                                        {listaRutinas}
                                    </select>
                                    <input type="number" className="form-control col-4 inpModal" placeholder="Numero de rondas"></input>
                                    <input type="number" className="form-control col-4 inpModal" placeholder="Tiempo por ronda"></input>
                                    <input type="number" className="form-control col-4 inpModal" placeholder="Numero de repeticiones"></input>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                            <button type="button" className="btn btn-primary" onClick={this.addRutinasEjercicios.bind(this)} data-bs-dismiss="modal">Añadir a rutina</button>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

/*****FUNCIONES EXTRA******/

//FUNCION PARA OBTENER RUTINAS EXISTENTES Y MOSTRARLAS EN LOS MODALES
async function obtenerRutinas() {
    let usuario = localStorage.getItem("username");
    let options = {
        method: "POST",
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuario)
    }

    let consulta = await fetch(ruta + "/getrutinas", options);

    if (consulta.ok) {
        return consulta.json();
    }
}


//FUNCION PARA AÑADIR LOS EJERCICIOS A LAS RUTINAS
async function rutinasEjercicios(){
    let usuario = localStorage.getItem("username");
    let nombreEjercicio = document.querySelector(".titleModal").textContent;
    let selectRutina = document.querySelector(".selectModal").value;
    let inputRondas = document.querySelectorAll(".inpModal")[0].value;
    let inputTiempo = document.querySelectorAll(".inpModal")[1].value;
    let inputRepeticiones = document.querySelectorAll(".inpModal")[2].value;

    let datos = {
        username: usuario,
        ejercicio: nombreEjercicio,
        rutina: selectRutina,
        rondas: inputRondas,
        repeticiones: inputRepeticiones,
        tiempo: inputTiempo
    }

    let options = {
        method: "POST",
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    };

    let consulta = await fetch(ruta+"/setEjercicioRutina", options);

    if (consulta.ok) {
        return consulta.json();
    }
}