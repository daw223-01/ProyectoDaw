import React from "react";
import './Rutinas.css';

/**RUTAS PARA USARSE EN LOS DIFERENTES ENTORNOS**/

//RUTA DE PRODUCCION
//let rutaProd = "http://now-exercise.ddns.net/api";

//RUTA DE DESARROLLO
let rutaDes = "http://localhost/api";


export default class Rutinas extends React.Component {

    //FUNCION QUE EJECUTA OBTENER DATOS
    async obtenerRutinas() {
        try {
            let consulta = await getRutinas();

            console.log(consulta);
        } catch (error) {

        }
    }

    //SE EJECUTA LA FUNCION AL RENDERIZAR EL COMPONENTE
    componentDidMount() {
        this.obtenerRutinas();
    }

    render() {
        return (
            <div id="rutinas">

            </div>
        )
    }
}



/**FUNCIONES Y COMPONENTES DIFERENTES**/
async function getRutinas() {
    let username = sessionStorage.getItem("username");

    let options = {
        method: "POST",
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(username)
    }
    let consulta = await fetch(rutaDes+"/getrutinas", options);

    if (consulta.ok) {
        return consulta.json();
    }
}