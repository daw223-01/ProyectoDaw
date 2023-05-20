import React from "react";
import "./Inicio.css";
import sergio from "./sergio.png";
import patry from "./patry.png";
import buff from "./buff.png";

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
            <div className="container-fluid p-5">
                <h2 className="mb-3 fw-bolder">{mensaje}</h2>
                <div id="canales" className="row">
                    <h4>MEJORES RECOMENDACIONES DE YOUTUBE</h4>

                    <div className="card shadow bg-transparent col-md-3 col-7 border border-3 border-light me-5 mb-5">
                        <div className="card-body">
                            <h5 className="card-title fst-italic fw-bolder">
                                <a href="https://www.youtube.com/@EntrenaSergioPeinado" target="_blank">Sergio Peinado</a>
                            </h5>
                        </div>
                        <img class="card-image" src={sergio} ></img>

                    </div>

                    <div className="card shadow bg-transparent col-md-3 col-7 border border-3 border-light me-5 mb-5">
                        <div className="card-body">
                            <h5 className="card-title fst-italic fw-bolder">
                                <a href="https://www.youtube.com/GymVirtual" target="_blank">GymVirtual</a>
                            </h5>
                        </div>
                        <img class="card-image w-75" src={patry}></img>
                    </div>

                    <div className="card shadow bg-transparent col-md-3 col-7 border border-3 border-light mb-5">
                        <div className="card-body">
                            <h5 className="card-title fst-italic fw-bolder">
                                <a href="https://www.youtube.com/@buff-academy" target="_blank">Buff Academy</a>
                            </h5>
                        </div>
                        <img class="card-image" src={buff}></img>
                    </div>
                </div>
            </div >
        )
    }
}