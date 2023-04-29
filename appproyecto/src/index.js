import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Main from './Main';
import reportWebVitals from './reportWebVitals';
import { Link, RouterProvider, createBrowserRouter } from 'react-router-dom'
import { BrowserRouter, Route, Routes } from 'react-router-dom';

//RUTA
// const router = createBrowserRouter([
//   {
//     path: "/main",
//     element: <Main></Main>
//   }
// ]);

const root = ReactDOM.createRoot(document.getElementById('root'));

//EN FUNCION DE SI SE HA INICIADO SESION YA O NO, SE RENDERIZA LA PAGINA DE LOGIN
//O DIRECTAMENTE LA PÁGINA PRINCIPAL DE LA APLICACION
if (!sessionStorage.getItem('username') && !sessionStorage.getItem('mail')) {
  root.render(
    //RENDERIZADO LOGIN
    <App></App>

  );
} else {
  root.render(
    //RENDERIZADO PAGINA PRINCIPAL
    <Main></Main>

  );
}




// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
