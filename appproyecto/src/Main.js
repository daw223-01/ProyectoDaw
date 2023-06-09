import React from "react";
import './Main.css';
import Inicio from "./Inicio";
import Ejercicios from "./Ejercicios";
import Perfil from "./Perfil";
import { Link, RouterProvider, createBrowserRouter, BrowserRouter, Route } from 'react-router-dom'
import Rutinas from "./Rutinas";

/**RUTAS PARA USARSE EN LOS DIFERENTES ENTORNOS**/

//RUTA DE PRODUCCION
let ruta = "http://nowexercise.ddns.net/api";

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

        let url = "/ejercicios/" + ejercicio.nombre;
        window.location.href = url;
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
                <label className="form-control resultBusqueda text-black bg-white" onClick={() => this.verEjercicio(ej)}>
                    {ej.nombre}
                </label>
            );
        }

        return (
            <div id="main" className="container-fluid min-vh-100 d-flex flex-column">
                {/* NAVBAR HEADER*/}
                <div className="row">
                    <nav id="navBar" className="navbar navbar-expand-lg bg-body-tertiary w-100 p-3" data-bs-theme="dark">
                        <div className="container-fluid">
                            {/* LOGO */}
                            <a className="navbar-brand" href="/">
                                <img src="https://i.pinimg.com/originals/d2/e0/dd/d2e0dd3a971ac6badba76f1b7009d586.png" width="50" height="45" alt="LOGO"></img>
                            </a>
                            {/* BOTON RESPONSIVE */}
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>

                            {/* OPCIONES MENU */}
                            <div className="collapse navbar-collapse" id="navbarScroll">
                                <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
                                    <li className="nav-item">
                                        <a className="nav-link" aria-current="page" href="/">Inicio</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/ejercicios/all">Ejercicios</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/rutinas">Rutinas</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/perfil">Perfil</a>
                                    </li>
                                    <li className="nav-item">
                                        <button className="nav-link btn btn-outline-secondary" onClick={this.cerrarSesion.bind(this)}>
                                            Cerrar sesion
                                        </button>
                                    </li>
                                </ul>

                                {/* BARRA DE BUSQUEDA */}
                                <form className="busquedaEj d-flex flex-row" role="search">
                                    <div>
                                        <input type="text" className="form-control inputBusqueda text-black bg-white" placeholder="Buscar ejercicio" onChange={this.ejerciciosInput.bind(this)}>
                                        </input>
                                        <div class="position-absolute d-flex flex-column contenedorNombres">
                                            {nombresEj}
                                        </div>
                                    </div>

                                    <a href={this.state.filtro} className="btn btn-outline-secondary" onClick={this.filtroBusqueda.bind(this)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                        </svg>
                                    </a>
                                </form>
                            </div>
                        </div>
                    </nav>
                </div>

                {/* CONTENIDO */}
                <div className="row flex-fill">

                    <div id="content" className="container-fluid">
                        {/* AQUÍ SE RENDERIZAN LOS DIFERENTES COMPONENTES */}
                        <RouterProvider router={router} filtro={this.state.filtro}></RouterProvider>
                    </div>

                </div>

                {/* FOOTER */}
                <div className="row">
                    <footer class="bg-dark text-center text-white">
                        <div class="container">
                            <section class="">

                                {/* <!-- Twitter --> */}
                                <a class="btn btn-outline-light btn-floating rounded-circle border border-2 m-2" href="https://twitter.com/Raulbs1099" role="button">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-twitter" viewBox="0 0 16 16">
                                        <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
                                    </svg>
                                </a>

                                {/* <!-- Instagram --> */}
                                <a class="btn btn-outline-light btn-floating rounded-circle border border-2 m-2" href="https://www.instagram.com/raulbs10/?hl=es" role="button">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-instagram" viewBox="0 0 16 16">
                                        <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />
                                    </svg>
                                </a>

                                {/* <!-- Linkedin --> */}
                                <a class="btn btn-outline-light btn-floating rounded-circle border border-2 m-2" href="https://www.linkedin.com/in/raulbragadosanz/" role="button">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-linkedin" viewBox="0 0 16 16">
                                        <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
                                    </svg>
                                </a>

                                {/* <!-- Github --> */}
                                <a class="btn btn-outline-light btn-floating rounded-circle border border-2 m-2" href="https://github.com/daw223-01" role="button">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-github" viewBox="0 0 16 16">
                                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                                    </svg>
                                </a>

                                {/* <!-- Tiktok --> */}
                                <a class="btn btn-outline-light btn-floating rounded-circle border border-2 m-2" href="https://www.tiktok.com/@raulbs10" role="button">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-tiktok" viewBox="0 0 16 16">
                                        <path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3V0Z" />
                                    </svg>
                                </a>

                                {/* <!-- Twitch --> */}
                                <a class="btn btn-outline-light btn-floating rounded-circle border border-2 m-2" href="https://www.twitch.tv/raulbs10?lang=es" role="button">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-twitch" viewBox="0 0 16 16">
                                        <path d="M3.857 0 1 2.857v10.286h3.429V16l2.857-2.857H9.57L14.714 8V0H3.857zm9.714 7.429-2.285 2.285H9l-2 2v-2H4.429V1.143h9.142v6.286z" />
                                        <path d="M11.857 3.143h-1.143V6.57h1.143V3.143zm-3.143 0H7.571V6.57h1.143V3.143z" />
                                    </svg>
                                </a>

                            </section>

                        </div>


                        {/*Copyright*/}
                        <div class="row text-center p-1 text-bg-secondary d-flex align-items-center justify-content-center">
                            <div className="text-wrap">© 2023 Copyright:<a class="text-white" href="https://github.com/daw223-01/ProyectoDaw.git">Now Exercise</a></div>
                        </div>

                    </footer>
                </div>

            </div>
        );
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
