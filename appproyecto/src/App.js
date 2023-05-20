import logo from './logo.svg';
import './App.css';
import React from 'react';
import fondo from "./fondoNow.png";

/**RUTAS PARA USARSE EN LOS DIFERENTES ENTORNOS**/

//RUTA DE PRODUCCION
let ruta = "http://now-exercise.ddns.net/api";

//RUTA DE DESARROLLO
//let ruta = "http://localhost/api";


/* PANTALLA PRINCIPAL DEL PROGAMA. PANTALLA DE BIENVENIDA */
export default class App extends React.Component {

  //COMPROBAR QUE LAS CONTRASEÑAS QUE SE INTRODUCEN TIENEN EL MISMO VALOR.
  //CADA VEZ QUE CAMBIA EL TEXTO, SE COMPRUEBA
  comprobarPassword(element) {
    let password = document.querySelector(".password").value;
    let btn = document.querySelector(".signup input[type=submit]");
    let repPassword = element.target.value;
    if (repPassword != password) {
      // element.target.style.background = "rgba(255, 69, 29, 0.3)";
      element.target.classList = "border border-danger";
      btn.disabled = true;
    } else {
      // element.target.style.background = "rgba(29, 255, 84, 0.3)";
      element.target.classList = "border-success";
      btn.disabled = false;
    }
  }

  //FUNCION CUANDO SE EJECUTA EL ENVÍO DE FORMULARIO
  handleSubmit(element) {

    //EVITAR RECARGA DE LA PÁGINA
    element.preventDefault();

    //OBTENER LA INFORMACIÓN DEL FORMULARIO QUE SE ENVÍA
    let tipoFormulario = element.target;
    let dataUser = comprDatos(tipoFormulario);

    //EJECUTAR LA FUNCIÓN ASÍNCRONA
    (async function () {
      try {
        //EL RESULTADO DE LA CONSULTA ES UN ARRAY CON UN VALOR VERDADERO O FALSO
        //Y CON OTRO ARRAY DE DATOS SOBRE EL USUARIO, PARA ESTABLECER UNA SESION
        let consulta = await consultaApi(dataUser);
        let boolean = consulta[0];
        let datos = consulta[1];

        //LA FUNCION DEVOLVERÁ TRUE O FALSE.
        //EN FUNCIÓN DE LO QUE DEVUELVA, EJECUTA UNA FUNCIÓN U OTRA
        if (boolean === true) {
          localStorage.setItem("username", datos.username);
          localStorage.setItem("mail", datos.correo);
          window.location.reload();
        } else {
          alert(datos);
        }

      } catch (error) {
        alert(error);
        console.log(error);
      }
    })();

  }

  render() {
    //OCULATR CHATBOT EN ESTA PAGINA
    let chatBot = document.querySelector("df-messenger");
    chatBot.style.display = "none";
    return (
      <div className='bienvenida container-fluid h-100'>
        <div className="contenidoFormularios row align-items-center justify-content-around h-100 p-5">
          <div className="card col-sm-7 col-lg-4 col-xl-3 col-md-5 mb-5">
            <form className='registro login d-flex flex-column p-3 gap-4' onSubmit={this.handleSubmit.bind(this)}>
              <h2>LOGIN</h2>
              <input type='text' name='user' placeholder='Email' className='form-control' required></input>
              <input type='password' name='password' placeholder='Password' className='form-control' required></input>
              <input type="submit" className='btn btn-outline-light align-self-center'></input>
            </form>
          </div>

          <div className="card col-sm-7 col-lg-4 col-xl-3 col-md-5">
            <form className='registro signup d-flex flex-column p-3 gap-4' onSubmit={this.handleSubmit.bind(this)}>
              <h2>SIGN UP</h2>

              <input type='text' name='user' placeholder='User name' className='form-control' required></input>
              <input type='text' name='name' placeholder='Nombre' className='form-control' required></input>
              <input type='text' name='lastname' placeholder='Apellidos' className='form-control'></input>
              <input type='email' name='email' placeholder='Email' className='form-control' required></input>
              <input type='password' name='password' placeholder='Password' className='password form-control' required></input>
              <input type='password' name='repeat-password' placeholder='Repeat Password' className='form-control' required onChange={this.comprobarPassword}></input>
              <input type="submit" className='btn btn-outline-light align-self-center'></input>
            </form>
          </div>
        </div>

      </div>

    );
  }

}


/************** FUNCIONES EXTRA ******************/

//FUNCION PARA COMPROBAR QUE FORMULARIO SE ENVÍA
function comprDatos(formulario) {
  let datosUser = "";

  if (formulario.className.includes("registro login")) {
    datosUser = {
      email: formulario.querySelector("input:nth-child(2)").value,
      password: formulario.querySelector("input:nth-child(3)").value
    }
  } else if (formulario.className.includes("registro signup")) {
    datosUser = {
      username: formulario.querySelector("input:nth-child(2)").value,
      name: formulario.querySelector("input:nth-child(3)").value,
      apellidos: formulario.querySelector("input:nth-child(4)").value,
      email: formulario.querySelector("input:nth-child(5)").value,
      password: formulario.querySelector("input:nth-child(6)").value
    }
  }

  return datosUser; //SE DEVUELVE EL OBJETO CON LOS DATOS
}


//FUNCION ASÍNCRONA PARA CONSULTAR EL USUARIO EN LA BDD
async function consultaApi(datos) {
  let options = {
    method: "POST",
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(datos)
  }
  let consulta = await fetch(ruta + "/users", options);
  if (consulta.status === 200) {
    return consulta.json();

  } else {
    throw new Error("Not found!");
  }
}
