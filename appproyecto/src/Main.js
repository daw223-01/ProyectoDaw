import React from "react";
import './Main.css';
import Inicio from "./Inicio";
import Ejercicios from "./Ejercicios";
import { Link, RouterProvider, createBrowserRouter, BrowserRouter, Route } from 'react-router-dom'

//RUTAS DE LOS DIFERENTES COMPONENTES A RENDERIZAR
const router = createBrowserRouter([
    {
        path: "/",
        element: <Inicio></Inicio>
    },
    {
        path: "/ejercicios",
        element: <Ejercicios></Ejercicios>
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
        window.location.reload();
    }
    renderizarElemento() {

    }

    render() {
        return (
            <div className="main">
                <header onClick={this.changeWidth.bind(this)}>
                    <p>Cabecera</p>
                    <button onClick={this.cerrarSesion.bind(this)}>Cerrar sesion</button>
                </header>

                <div id="sidebar" onClick={this.renderizarElemento.bind(this)}>
                    Menu
                    <ul>
                        <li>
                            <a href="/">Inicio</a>
                        </li>
                        <li>
                            <a href="/ejercicios">Ejercicios</a>
                        </li>
                    </ul>
                </div>

                <div id="content">
                    Bienvenido, {this.state.usuario}
                    {/* AQUÍ SE RENDERIZAN LOS DIFERENTES COMPONENTES */}
                    <RouterProvider router={router}></RouterProvider>
                </div>
            </div>
        )
    }
}