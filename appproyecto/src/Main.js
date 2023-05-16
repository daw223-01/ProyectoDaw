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
            <div id="main" className="container-fluid min-vh-100 d-flex flex-column">
                {/* NAVBAR HEADER*/}
                <div className="row">
                    <nav id="navBar" className="navbar navbar-expand-lg bg-body-tertiary w-100">
                        <div className="container-fluid">
                            {/* LOGO */}
                            <a className="navbar-brand" href="/">
                                <img src="https://educajcyl-my.sharepoint.com/:i:/g/personal/raul_brasan_educa_jcyl_es/EV78bpdoflhPpd6r5eSg4fQB1bmRtAxn9PrHipQVg1ILhw?e=AiqtTA" alt="LOGO">
                                </img>
                            </a>
                            {/* BOTON RESPONSIVE */}
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>

                            {/* OPCIONES MENU */}
                            <div className="collapse navbar-collapse" id="navbarScroll">
                                <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
                                    <li className="nav-item">
                                        <a className="nav-link active" aria-current="page" href="/">Inicio</a>
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
                                <form className="d-flex flex-row" role="search">
                                    <div>
                                        <input type="text" className="form-control inputBusqueda" placeholder="Buscar ejercicio" onChange={this.ejerciciosInput.bind(this)}>
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

                    <div id="content" className="col-11 container-fluid justify-content-center">
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
