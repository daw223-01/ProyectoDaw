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
                <h2 className="mb-3">{mensaje}</h2>
                <div id="canales" className="row">
                    <h4>MEJORES RECOMENDACIONES DE YOUTUBE</h4>

                    <div className="card bg-transparent col-md-3 col-12 border border-2 border-light me-5">
                        <div className="card-body">
                            <h2 className="card-title">Sergio Peinado</h2>
                        </div>
                        <img class="card-image" src="https://i0.wp.com/www.entrenaconsergiopeinado.com/wp-content/uploads/2015/04/sergio-png.png?fit=300%2C300&ssl=1" width="250" height="250"></img>
                    </div>

                    <div className="card bg-transparent col-md-3 col-12 border border-2 border-light me-5">
                        <div className="card-body">
                            <h2 className="card-title">Gym Virtual</h2>
                        </div>
                        <img class="card-image" src="https://www.clara.es/medio/2019/06/13/patry_c1a33801_267x459.png" width="250" height="250"></img>
                    </div>

                    <div className="card bg-transparent col-md-3 col-12 border border-2 border-light">
                        <div className="card-body">
                            <h2 className="card-title">Buff Academy</h2>
                        </div>
                        <img class="card-image" src="https://o.remove.bg/downloads/9620866a-0971-4061-b1e9-b319181752e2/90e1b18b8d8932dec6086138ae0ec22f-removebg-preview.png" width="250" height="250"></img>
                    </div>
                </div>
            </div>
        )
    }
}