import React from "react";
import './Main.css';
import Inicio from "./Inicio";
import Ejercicios from "./Ejercicios";
import Perfil from "./Perfil";
import { Link, RouterProvider, createBrowserRouter, BrowserRouter, Route } from 'react-router-dom'
import Rutinas from "./Rutinas";

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
            usuario: sessionStorage.getItem("username")
        }
    }

    //FUNCION QUE CAMBIA EL NOMBRE DE LA CLASE DEL CONTENEDOR
    //AL CAMBIAR LA CLASE, CAMBIA LA ESTRUCTURA DE LA PLANTILLA
    changeWidth() {
        let contenedor = document.querySelector(".main");
        contenedor.classList.toggle("main2");
    }

    //FUNCION QUE CIERRA LA SESION
    cerrarSesion() {
        sessionStorage.removeItem("username");
        sessionStorage.removeItem("mail");
        sessionStorage.removeItem("password");
        window.location.reload();
    }

    render() {
        return (
            <div id="main" className="container-fluid min-vh-100">
                <div className="row">
                    <header className="col-12" onClick={this.changeWidth.bind(this)}>
                        <p>Cabecera</p>
                        <button onClick={this.cerrarSesion.bind(this)}>Cerrar sesion</button>
                    </header>
                </div>

                <div className="row">
                    <div id="sidebar" className="col-2">
                        <div className="row">
                            <div className="col-12">
                                <a class="fs-5" href="/">Inicio</a>
                            </div>
                            <div className="col-12">
                                <a class="fs-5" href="/ejercicios">Ejercicios</a>
                            </div>
                            <div className="col-12">
                                <a class="fs-5" href="/perfil">Perfil</a>
                            </div>
                            <div className="col-12">
                                <a class="fs-5" href="/rutinas">Rutinas</a>
                            </div>
                        </div>
                    </div>

                    <div id="content" className="col-10 h-100">
                        Bienvenido, {this.state.usuario}
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