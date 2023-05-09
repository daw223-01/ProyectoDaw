import React from "react";
import './Main.css';
import Inicio from "./Inicio";
import Ejercicios from "./Ejercicios";
import Perfil from "./Perfil";
import { Link, RouterProvider, createBrowserRouter, BrowserRouter, Route } from 'react-router-dom'
import Rutinas from "./Rutinas";

/**RUTAS PARA USARSE EN LOS DIFERENTES ENTORNOS**/

//RUTA DE PRODUCCION
//let rutaProd = "http://now-exercise.ddns.net/api";

//RUTA DE DESARROLLO
let rutaDes = "http://localhost/api";

//RUTAS DE LOS DIFERENTES COMPONENTES A RENDERIZAR
const router = createBrowserRouter([
    {
        path: "/",
        element: <Inicio></Inicio>
    },
    {
        path: "/ejercicios",
        element: <Ejercicios></Ejercicios>
    },
    {
        path: "/perfil",
        element: <Perfil></Perfil>
    },
    {
        path: "/rutinas",
        element: <Rutinas></Rutinas>
    }
]);

/* PANTALLA QUE SE MUESTRA AL INCIIAR SESION */
export default class Main extends React.Component {
    constructor() {
        super();
        this.state = {
            ejercicios: "",
            lista: "",
            active: false
        }
    }

    //FUNCION QUE CIERRA LA SESION
    cerrarSesion() {
        localStorage.removeItem("username");
        localStorage.removeItem("mail");
        window.location.reload();
    }

    //FUNCION PARA BUSCAR LOS EJERCICIOS
    async buscarEjercicios() {
        let listado = [];

        let consulta = await getEjercicios();

        Object.keys(consulta).forEach(key => {
            listado.push(consulta[key]);
        });

        this.setState({
            ejercicios: listado
        });

    }

    //FUNCION PARA MOSTRAR LOS EJERCICIOS EN EL INPUT
    //A MEDIDA QUE SE BUSCA, SE BUSCA LO QUE COINCIDE
    ejerciciosInput(input) {
        let contenidoInp = input.target.value;
        let listaEj = this.state.ejercicios;
        let listaNombres = [];

        if (contenidoInp != "" && contenidoInp != " ") {
            for (const key in listaEj) {
                let ej = listaEj[key];
                //SI EL NOMBRE BUSCADO COINCIDE CON: NOMBRE , DESCRIPCION Y/O GRUPO MUSCULAR  DEL EJERCICIO
                if (ej.nombre.toUpperCase().includes(contenidoInp.toUpperCase()) || ej.grupoMuscular.toUpperCase().includes(contenidoInp.toUpperCase()) || ej.descripcion.toUpperCase().includes(contenidoInp.toUpperCase())) {
                    listaNombres.push(ej.nombre);
                }
            }
        }

        this.setState({
            active: true,
            lista: listaNombres
        });

    }

    //FUNCIONES A EJECUTAR AL RENDERIZAR COMPONENTE
    componentDidMount() {
        this.buscarEjercicios();
    }


    render() {
        let lista = [];
        let nombresEj = [];
        lista = this.state.lista;

        nombresEj = lista.map(ej =>
            <label className="form-control">
                {ej}
            </label>
        );

        return (
            <div id="main" className="container-fluid min-vh-100 d-flex flex-column justify-content-between">
                <div className="row">
                    <header className="p-3 container-fluid text-center">
                        <div className="row justify-content-between align-items-center w-100">
                            <div className="col-1">
                                <img alt="LOGO">
                                </img>
                            </div>

                            <div className="col-4">
                                <div className="input-group">
                                    <input type="text" className="form-control" placeholder="Buscar ejercicio" onChange={this.ejerciciosInput.bind(this)}>
                                    </input>

                                    <button className="btn btn-outline-secondary">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                        </svg>
                                    </button>
                                </div>

                                <div class="position-absolute d-flex flex-column contenedorNombres">
                                    {nombresEj}
                                </div>

                            </div>

                            <div className="col-2" >
                                <button onClick={this.cerrarSesion.bind(this)}>Cerrar sesion</button>
                            </div>
                        </div>
                    </header>
                </div>

                <div className="row flex-fill">
                    <div id="sidebar" className="col-1 text-fit fs-3 fs-md-4 fs-lg-5">
                        <div className="row">
                            <div className="col-12">
                                <a href="/">Inicio</a>
                            </div>
                            <div className="col-12">
                                <a href="/ejercicios">Ejercicios</a>
                            </div>
                            <div className="col-12">
                                <a href="/perfil">Perfil</a>
                            </div>
                            <div className="col-12">
                                <a href="/rutinas">Rutinas</a>
                            </div>
                        </div>
                    </div>

                    <div id="content" className="col-11">
                        {/* AQUÍ SE RENDERIZAN LOS DIFERENTES COMPONENTES */}
                        <RouterProvider router={router}></RouterProvider>
                    </div>
                </div>
                <div className="row">
                    <footer className="col-12">
                        Footer
                    </footer>
                </div>

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
    let consulta = await fetch(rutaDes + "/ejercicios", options);

    if (consulta.ok) {
        return consulta.json();
    }
}