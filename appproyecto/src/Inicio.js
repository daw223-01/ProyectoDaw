import React from "react";
import "./Inicio.css";

export default class Inicio extends React.Component {

    randomMessage() {
        // Generar un número aleatorio entre 1 y 4
        let numeroAleatorio = Math.floor(Math.random() * (4 - 1) + 1);
        let msn = "";
        let userName = localStorage.getItem("username");

        switch (numeroAleatorio) {
            case 1:
                msn = "Me alegra verte por aquí, ";
                break;

            case 2:
                msn = "Buenas, qué hay, ";
                break;

            case 3:
                msn = "Bienvenido/a, ";
                break;
        }

        return msn + userName + "!";
    }
    render() {
        let mensaje = this.randomMessage();

        return (
            <div className="container-fluid vh-100 pt-5">
                <h2>{mensaje}</h2>
                <div id="canales" className="row h-50">
                    <h3>MEJORES RECOMENDACIONES DE YOUTUBE</h3>
                    <div className="card bg-transparent col-md-3 col-12 border border-light me-5">
                        <div className="card-body">
                            <h2 className="card-title">Sergio Peinado</h2>
                        </div>
                    </div>

                    <div className="card bg-transparent col-md-3 col-12 border border-light me-5">
                        <div className="card-body">
                            <h2 className="card-title">Buff Academy</h2>
                        </div>
                    </div>

                    <div className="card bg-transparent col-md-3 col-12 border border-light">
                        <div className="card-body">
                            <h2 className="card-title">Sergio Peinado</h2>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}