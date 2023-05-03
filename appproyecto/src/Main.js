import React from "react";
import './Main.css';
import Inicio from "./Inicio";
import Ejercicios from "./Ejercicios";
import Perfil from "./Perfil";
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
    },
    {
        path: "/perfil",
        element: <Perfil></Perfil>
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
            <div className="main">
                <header onClick={this.changeWidth.bind(this)}>
                    <p>Cabecera</p>
                    <button onClick={this.cerrarSesion.bind(this)}>Cerrar sesion</button>
                </header>

                <div id="sidebar">
                    Menu

                    <div>
                        <a href="/">Inicio</a>
                    </div>
                    <div>
                        <a href="/ejercicios">Ejercicios</a>
                    </div>
                    <div>
                        <a href="/perfil">Perfil</a>
                    </div>

                </div>

                <div id="content">
                    Bienvenido, {this.state.usuario}
                    {/* AQUÍ SE RENDERIZAN LOS DIFERENTES COMPONENTES */}
                    <RouterProvider router={router}></RouterProvider>
                </div>

                <footer>
                    Footer
                </footer>
            </div>
        )
    }
}