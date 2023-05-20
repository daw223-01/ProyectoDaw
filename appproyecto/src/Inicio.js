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
            <div className="container-fluid pt-5">
                <h2 className="mb-3 fw-bolder">{mensaje}</h2>
                <div id="canales" className="row">
                    <h4>MEJORES RECOMENDACIONES DE YOUTUBE</h4>

                    <a className="col-md-3 col-7 me-5" href="https://www.youtube.com/@EntrenaSergioPeinado" target="_blank">
                        <div className="card shadow bg-transparent border border-2 border-light ">
                            <div className="card-body">
                                <h5 className="card-title fst-italic fw-bolder">Sergio Peinado</h5>
                            </div>
                            <img class="card-image" src="https://i0.wp.com/www.entrenaconsergiopeinado.com/wp-content/uploads/2015/04/sergio-png.png?fit=300%2C300&ssl=1" width="250" height="250"></img>
                        </div>
                    </a>

                    <a className="col-md-3 col-7 me-5" href="https://www.youtube.com/GymVirtual" target="_blank">
                        <div className="card shadow bg-transparent border border-2 border-light">
                            <div className="card-body">
                                <h5 className="card-title fst-italic fw-bolder">GymVirtual</h5>
                            </div>
                            <img class="card-image" src="https://o.remove.bg/downloads/74c57c3e-cde6-44bc-9bdc-85447d2ee110/15923953322628-removebg-preview.png" width="250" height="250"></img>
                        </div>
                    </a>

                    <a className="col-md-3 col-7 me-5" href="https://www.youtube.com/@buff-academy" target="_blank">
                        <div className="card shadow bg-transparent border border-2 border-light">
                            <div className="card-body">
                                <h5 className="card-title fst-italic fw-bolder">Buff Academy</h5>
                            </div>
                            <img class="card-image" src="https://o.remove.bg/downloads/9620866a-0971-4061-b1e9-b319181752e2/90e1b18b8d8932dec6086138ae0ec22f-removebg-preview.png" width="250" height="250"></img>
                        </div>
                    </a>

                </div>
            </div>
        )
    }
}