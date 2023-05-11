import React from "react";
import './Main.css';
import Inicio from "./Inicio";
import Ejercicios from "./Ejercicios";
import Perfil from "./Perfil";
import { Link, RouterProvider, createBrowserRouter, BrowserRouter, Route } from 'react-router-dom'
import Rutinas from "./Rutinas";

/**RUTAS PARA USARSE EN LOS DIFERENTES ENTORNOS**/

//RUTA DE PRODUCCION
let ruta = "http://now-exercise.ddns.net/api";

//RUTA DE DESARROLLO
//let ruta = "http://localhost/api";

//RUTAS DE LOS DIFERENTES COMPONENTES A RENDERIZAR
const router = createBrowserRouter([
    {
        path: "/",
        element: <Inicio></Inicio>
    },
    {
        path: "/ejercicios/:filtro",
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
            filtro: ""
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

    //FUNCION PARA MOSTRAR LOS EJERCICIOS EN EL INPUT. A MEDIDA QUE SE BUSCA, SE BUSCA LO QUE COINCIDE
    ejerciciosInput(input) {
        let contenidoInp = input.target.value;
        let listaEj = this.state.ejercicios;
        let liEj = [];

        if (contenidoInp != "" && contenidoInp != " ") {
            for (const key in listaEj) {
                let ej = listaEj[key];
                //SI EL NOMBRE BUSCADO COINCIDE CON: NOMBRE , DESCRIPCION Y/O GRUPO MUSCULAR  DEL EJERCICIO
                if (ej.nombre.toUpperCase().includes(contenidoInp.toUpperCase()) || ej.grupoMuscular.toUpperCase().includes(contenidoInp.toUpperCase()) || ej.descripcion.toUpperCase().includes(contenidoInp.toUpperCase())) {
                    liEj.push(ej);
                }
            }
        }

        this.setState({
            active: true,
            lista: liEj
        });

    }

    //FUNCION AL HACER CLICK EN LOS EJERCICIOS MOSTRADOS
    verEjercicio(ejercicio) {
        let inputBusqueda = document.querySelector(".inputBusqueda");
        inputBusqueda.value = ejercicio.nombre;
    }

    //FILTRO DE BÚSQUEDA DE EJERCICIOS
    filtroBusqueda() {
        let inputBusqueda = document.querySelector(".inputBusqueda").value;
        let url = "/ejercicios/" + inputBusqueda;

        this.setState({
            filtro: url
        });
    }

    //FUNCIONES A EJECUTAR AL RENDERIZAR COMPONENTE
    componentDidMount() {
        this.buscarEjercicios();
    }


    render() {
        //CREAR UN ARRAY CON LOS NOMBRES DE LOS EJERCICIOS PARA MOSTRARLOS EN LA BARRA DE BUSQUEDA DE LA CABECERA
        let lista = [];
        let nombresEj = [];
        if (this.state.active) {
            lista = this.state.lista;

            //AL HACER CLICK EN UN RESULTADO, SE MUESTRAN LOS DATOS DE ESE EJERCICIO
            nombresEj = lista.map(ej =>
                <label className="form-control resultBusqueda" onClick={() => this.verEjercicio(ej)}>
                    {ej.nombre}
                </label>
            );
        }

        return (
            <div id="main" className="container-fluid min-vh-100 d-flex flex-column justify-content-between">
                {/* CABECERA */}
                <div className="row">
                    <header className="p-3 w-100">
                        <div className="row justify-content-between align-items-center">
                            {/* LOGO */}
                            <div className="col-1">
                                <img alt="LOGO">
                                </img>
                            </div>

                            {/* BARRA DE BUSQUEDA */}
                            <div className="col-4">
                                <div className="input-group">

                                    <input type="text" className="form-control inputBusqueda" placeholder="Buscar ejercicio" onChange={this.ejerciciosInput.bind(this)}>
                                    </input>

                                    <a href={this.state.filtro} className="btn btn-outline-secondary" onClick={this.filtroBusqueda.bind(this)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                        </svg>
                                    </a>
                                </div>

                                <div class="position-absolute d-flex flex-column contenedorNombres">
                                    {nombresEj}
                                </div>

                            </div>

                            {/* NOMBRE DE USUARIO */}
                            <div className="col-3 d-flex align-items-center">
                                <div className="me-1">
                                    <label className="form-label me-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-circle ml-1" viewBox="0 0 16 16">
                                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                            <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                                        </svg>
                                    </label>

                                    <label className="form-label">{localStorage.getItem('username')}</label>

                                </div>

                                <div>
                                    <button class="btn btn-outline-secondary" onClick={this.cerrarSesion.bind(this)}>
                                        Cerrar sesion
                                    </button>
                                </div>
                            </div>
                        </div>
                    </header>
                </div>

                {/* SIDEBAR Y CONTENIDO */}
                <div className="row flex-fill">
                    <div id="sidebar" className="col-1 ">
                        <div className="row">
                            <div className="col-12">
                                <a className="text-fit fs-sm-6 fs-md-5 fs-lg-3" href="/">Inicio</a>
                            </div>
                            <div className="col-12">
                                <a className="text-fit fs-sm-6 fs-md-5 fs-lg-3" href="/ejercicios/all">Ejercicios</a>
                            </div>
                            <div className="col-12">
                                <a className="text-fit fs-sm-6 fs-md-5 fs-lg-3" href="/rutinas">Rutinas</a>
                            </div>
                            <div className="col-12">
                                <a className="text-fit fs-sm-6 fs-md-5 fs-lg-3" href="/perfil">Perfil</a>
                            </div>
                        </div>
                    </div>

                    <div id="content" className="col-11">
                        {/* AQUÍ SE RENDERIZAN LOS DIFERENTES COMPONENTES */}
                        <RouterProvider router={router} filtro={this.state.filtro}></RouterProvider>
                    </div>
                </div>

                {/* FOOTER */}
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
    let consulta = await fetch(ruta + "/ejercicios", options);

    if (consulta.ok) {
        return consulta.json();
    }
}

//COMPONENTE MODAL PARA LA BARRA DE BUSQUEDA
