import { element } from "prop-types";
import React from "react";
import './Ejercicios.css';
import Modal from "./Modal";
import CardEjercicio from "./CardEjercicio";

/**RUTAS PARA USARSE EN LOS DIFERENTES ENTORNOS**/

//RUTA DE PRODUCCION
//let ruta = "http://now-exercise.ddns.net/api";

//RUTA DE DESARROLLO
let ruta = "http://localhost/api";


export default class Ejercicios extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ej: "",
            datosEj: "",
            carga: false
        }
    }

    //FUNCION PARA OBTENER EL LISTADO DE EJERCICIOS
    async renderEjercicios() {
        let listado = [];
        let consulta = await getEjercicios();
        
        for (let i = 0; i < consulta.length; i++) {
            let datos = consulta[i];

            let datosEjercicio = {
                nombre: datos.nombre,
                grupoMuscular: datos.grupoMuscular,
                descripcion: datos.descripcion,
                video: datos.urlVideo,
                img: datos.urlImg
            }

            listado.push(datosEjercicio);
        }

        this.setState({
            ej: listado
        });

    }

    //SE EJECUTA AL INICIO
    componentDidMount() {
        //EJECUTAR LA FUNCION AL RENDERIZAR EL COMPONENTE
        this.renderEjercicios();

        //SE ACTUALIZA EL ESTADO AL PRINCIPIO PARA QUE DESPUÉS SE EJECUTE BIEN
        //EL CAMBIO DE ESTADO
        this.setState({
            carga: true
        })
    }


    //ESTABLECER LOS DATOS DEL EJERCICIO QUE SE SELECCIONA
    /**El objetivo es mandar esta funcion como "prop" del componente Ejercicio.
     * Este componente tendrá una función que se ejecuta al hacer click sobre el
     * Esa función en realidad lo que hace es ejecutar el "prop funcion" mandado anteriormente
     * De esta forma, se puede cambiar el estado del componente Ejercicios desde el componente Ejercicio y pasar
     * ese estado como "prop" al componente Modal
     */
    datosEjercicio(datos) {
        this.setState({
            datosEj: datos,
            carga: true
        }, () => {
            
        });

    }


    render() {

        //COMO EL RESULTADO ES UN OBJETO CON OBJETOS, SE DEBE ITERAR DE ESTA FORMA
        let lista = Object.keys(this.state.ej).map((element, i) => (

            <CardEjercicio
                src={this.state.ej[element].img}
                titulo={this.state.ej[element].nombre}
                desc={this.state.ej[element].descripcion}
                musc={this.state.ej[element].grupoMuscular}
                video={this.state.ej[element].video}
                datosEj={this.datosEjercicio.bind(this)}
            ></CardEjercicio>
        ));

        return (
            <div id="containerEjercicios">
                <Modal datos={this.state.datosEj}></Modal>
                {lista}
            </div>
        )

    }
}


/*******FUNCIONES Y COMPONENTES EXTRA**********/
async function getEjercicios() {
    let options = {
        method: "GET",
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        }
    }
    let consulta = await fetch(ruta + "/ejercicios", options);

    if (consulta.ok) {
        return consulta.json();
    }
}



