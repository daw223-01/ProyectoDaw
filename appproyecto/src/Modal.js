import { element } from "prop-types";
import React from "react";
import './Modal.css';

/**RUTAS PARA USARSE EN LOS DIFERENTES ENTORNOS**/

//RUTA DE PRODUCCION
//let rutaProd = "http://now-exercise.ddns.net/api";

//RUTA DE DESARROLLO
let rutaDes = "http://localhost/api";


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
                            <h3 className="modal-title">{titulo}</h3>
                            <button className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            <video src={urlVideo} autoPlay loop muted width="100%">
                            </video>
                            <p>{desc}</p>
                            <form className="container-fluid">
                                <div className="row">
                                    <select className="form-select col-4">
                                        {/* {LISTA CON LAS RUTINAS DEL USUARIO} */}
                                        <option selected>Selecciona rutina</option>
                                        {listaRutinas}
                                    </select>
                                    <input type="number" className="form-control col-4" placeholder="Numero de rondas"></input>
                                    <input type="number" className="form-control col-4" placeholder="Tiempo por ronda"></input>
                                    <input type="number" className="form-control col-4" placeholder="Numero de repeticiones"></input>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                            <button type="button" class="btn btn-primary">Añadir a rutina</button>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

/*****FUNCIONES EXTRA******/

//FUNCION PARA OBTENER RUTINAS EXISTENTES
async function obtenerRutinas() {
    let usuario = sessionStorage.getItem("username");
    let options = {
        method: "POST",
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuario)
    }

    let consulta = await fetch(rutaDes + "/getrutinas", options);

    if (consulta.ok) {
        return consulta.json();
    }
}