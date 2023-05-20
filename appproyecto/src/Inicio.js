import React from "react";
import "./Inicio.css";
import sergio from "./sergio.png";
import patry from "./patry.png";
import buff from "./buff.png";
import mp from "./myprotein.png";
import proz from "./prozis.png";
import hsn from "./hsn.png";

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
                {/* CANALES DE YT */}
                <div id="canales" className="row mb-5">
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

                {/* PAGINAS DE NUTRICIÓN */}
                <div id="nutricion" className="row mb-3">
                    {/* MYPROTEIN */}
                    <div className="card col-12 col-sm-9 shadow bg-transparent border border-3 border-light mb-3">
                        <div className="col-5">
                            <div className="card-body">
                                <h5 className="card-title fst-italic fw-bolder">
                                    <a href="https://www.myprotein.es/" target="_blank">MyProtein</a>
                                </h5>
                            </div>
                        </div>
                        <div className="col-7">
                            <img class="card-image" src={mp}></img>
                        </div>
                    </div>

                    {/* PROZIS */}
                    <div className="card col-12 col-sm-9 shadow bg-transparent border border-3 border-light mb-3">
                        <div className="col-5">
                            <div className="card-body">
                                <h5 className="card-title fst-italic fw-bolder">
                                    <a href="https://www.prozis.com/es/es" target="_blank">MyProtein</a>
                                </h5>
                            </div>
                        </div>
                        <div className="col-7">
                            <img class="card-image" src={proz}></img>
                        </div>
                    </div>

                    {/* HSN */}
                    <div className="card col-12 col-sm-9 shadow bg-transparent border border-3 border-light mb-3">
                        <div className="col-5">
                            <div className="card-body">
                                <h5 className="card-title fst-italic fw-bolder">
                                    <a href="https://www.hsnstore.com/" target="_blank">MyProtein</a>
                                </h5>
                            </div>
                        </div>
                        <div className="col-7">
                            <img class="card-image" src={hsn}></img>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}