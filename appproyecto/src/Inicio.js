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

                    <div className="card bg-transparent col-md-3 col-12 border border-2 border-light me-5">
                        <div className="card-body">
                            <h5 className="card-title fst-italic fw-bolder">
                                <a href="https://www.youtube.com/@EntrenaSergioPeinado" target="_blank">Sergio Peinado</a>
                            </h5>
                        </div>
                        <img class="card-image" src="https://i0.wp.com/www.entrenaconsergiopeinado.com/wp-content/uploads/2015/04/sergio-png.png?fit=300%2C300&ssl=1" ></img>

                    </div>

                    <div className="card bg-transparent col-md-3 col-12 border border-2 border-light me-5">
                        <div className="card-body">
                            <h5 className="card-title fst-italic fw-bolder">
                                <a href="https://www.youtube.com/GymVirtual" target="_blank">GymVirtual</a>
                            </h5>
                        </div>
                        <img class="card-image" src="https://o.remove.bg/downloads/74c57c3e-cde6-44bc-9bdc-85447d2ee110/15923953322628-removebg-preview.png"></img>
                    </div>

                    <div className="card bg-transparent col-md-3 col-12 border border-2 border-light">
                        <div className="card-body">
                            <h5 className="card-title fst-italic fw-bolder">
                                <a href="https://www.youtube.com/@buff-academy" target="_blank">Buff Academy</a>
                            </h5>
                        </div>
                        <img class="card-image" src="https://o.remove.bg/downloads/9620866a-0971-4061-b1e9-b319181752e2/90e1b18b8d8932dec6086138ae0ec22f-removebg-preview.png"></img>
                    </div>
                </div>
            </div >
        )
    }
}