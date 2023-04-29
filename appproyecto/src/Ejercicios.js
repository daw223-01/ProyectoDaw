import React from "react";

export default class Ejercicios extends React.Component {
    constructor() {
        super();
        this.state = {
            ejercicios: ""
        }
    }

    // renderizarEjercicios() {
    //     (async function () {
    //         try {
    //             let datos = await hola();

    //             this.setState({
    //                 ejercicios: datos
    //             });
    //         } catch (error) {
    //             alert(error);
    //         }
    //     })
    // }


    render() {
        // let listado = this.renderizarEjercicios().map((ejercicios) =>
        //     <p>
        //         {ejercicios.name}
        //         {console.log(ejercicios.name)}
        //     </p>
        // );

        return (
            <div>
                {/* {this.renderizarEjercicios()} */}
                {console.log(this.state.ejercicios)}
                {/* {listado.map(element => 
                    <p key={element} id="element">{element}</p>
                    
                )} */}
                {/* <p>{this.state.ejercicios}</p> */}

            </div>
        )
    }
}



// async function hola() {
//     let consulta = await fetch("http://localhost/api/users");

//     if (consulta.ok) {
//         return consulta.json()
//     }
// }