import logo from './logo.svg';
import './App.css';
import React from 'react';


/* PANTALLA PRINCIPAL DEL PROGAMA. PANTALLA DE BIENVENIDA */
export default class App extends React.Component {

  //COMPROBAR QUE LAS CONTRASEÑAS QUE SE INTRODUCEN TIENEN EL MISMO VALOR.
  //CADA VEZ QUE CAMBIA EL TEXTO, SE COMPRUEBA
  comprobarPassword(element) {
    let password = document.querySelector(".password").value;
    let btn = document.querySelector(".signup input[type=submit]");
    let repPassword = element.target.value;
    if (repPassword != password) {
      element.target.style.background = "rgba(255, 69, 29, 0.3)";
      btn.disabled = true;
    } else {
      element.target.style.background = "rgba(29, 255, 84, 0.3)";
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
          if (tipoFormulario.className === "registro login") {
            //SE INICIA LA SESION            
            sessionStorage.setItem("username", datos.username);
            sessionStorage.setItem("mail", datos.correo);
            window.location.reload();
            
          }else if (tipoFormulario.className === "registro signup") {
            //SE INICIA LA SESION
            sessionStorage.setItem("username", datos.username);
            sessionStorage.setItem("mail", datos.correo);
            window.location.reload();
          }
        }else{
          alert(datos);
        }

      } catch (error) {
        alert(error);
        console.log(error);
      }
    })();

  }

  render() {
    return (
      <div className='container'>
        <form className='registro login' onSubmit={this.handleSubmit.bind(this)}>
          <h2>LOGIN</h2>
          <input type='text' name='user' placeholder='User/email' required></input>
          <input type='password' name='password' placeholder='Password' required></input>
          <input type="submit"></input>
        </form>
        <form className='registro signup' onSubmit={this.handleSubmit.bind(this)}>
          <h2>SIGN UP</h2>
          <input type='text' name='user' placeholder='User name' required></input>
          <input type='text' name='name' placeholder='Nombre' required></input>
          <input type='text' name='lastname' placeholder='Apellidos'></input>
          <input type='email' name='email' placeholder='Email' required></input>
          <input type='password' name='password' placeholder='Password' className='password' required></input>
          <input type='password' name='repeat-password' placeholder='Repeat Password' required onChange={this.comprobarPassword}></input>
          <input type="submit"></input>
        </form>

      </div>

    );
  }

}


/************** FUNCIONES EXTRA ******************/

//FUNCION PARA COMPROBAR QUE FORMULARIO SE ENVÍA
function comprDatos(formulario) {
  let datosUser = "";

  switch (formulario.className) {
    case "registro login":
      datosUser = {
        email: formulario.querySelector("input:nth-child(2)").value,
        password: formulario.querySelector("input:nth-child(3)").value
      }
      break;

    case "registro signup":
      datosUser = {
        username: formulario.querySelector("input:nth-child(2)").value,
        name: formulario.querySelector("input:nth-child(3)").value,
        apellidos: formulario.querySelector("input:nth-child(4)").value,
        email: formulario.querySelector("input:nth-child(5)").value,
        password: formulario.querySelector("input:nth-child(6)").value
      }
      break;

    default:
      break;
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
  let consulta = await fetch("http://localhost/api/users", options);
  if (consulta.status === 200) {
    return consulta.json();

  } else {
    throw new Error("Not found!");
  }
}
