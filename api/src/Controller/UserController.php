<?php

/**
 * 
 * Para enviar los datos del Js a esta API:
 * 1. En el Js, meter los datos en el 'body' de la petición, formateados a JSON --> JSON.stringify(datos)
 * 2. En la API, obtener los datos que se han mandado mediante file_get_contents('php://input)
 * 3. Coger esos datos y decodificarlos para trabajar con ellos dentro del PHP --> json_decode($datos);
 * 4. Se obtiene un objeto con diferentes atributos. Para mandarlo de vuelta es necesario codificarlos a JSON de nuevo --> return new Response(json_encode($datos))
 * 5. En el Js, decodificar los datos --> datos.json();
 * 6. Se obtiene un objeto o un array de objetos
 * 
 */

namespace App\Controller;

use App\Entity\Ejercicios;
use App\Entity\Rutinas;
use App\Entity\RutinasEjercicios;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\Usuarios;

class UserController extends AbstractController
{
    /**
     * INICIAR SESION Y COMPROBAR QUE EL USUARIO EXISTE
     * @Route("/users", name="users")
     */
    public function usuarios(ManagerRegistry $doctrine)
    {
        if (isset($_REQUEST)) {

            //SE UTILIZA ESTE MECANISMO PARA OBTENER LOS DATOS RECIBIDOS
            $data = file_get_contents('php://input');

            //CONVERTIR LA INFORMACION EN UN ARRAY. MÁS FACIL DE MANEJAR EN EL JS DESPUES
            $infousuario = json_decode($data, true);

            //COMPROBACIÓN DE LOS DATOS EN LA BASE DE DATOS EN FUNCIÓN DE LOS PARAMETROS MANDADOS
            $entityManager = $doctrine->getManager();
            $repositorio = $doctrine->getRepository(Usuarios::class);

            switch (count($infousuario)) {
                case 1:
                    $email = $infousuario['email'];

                    $usuario = $repositorio->findOneBy(array('email' => $email));

                    $datosUsuario = [
                        'username' => $usuario->getUsername(),
                        'correo' => $usuario->getEmail(),
                        'nombre' => $usuario->getNombre(),
                        'apellidos' => $usuario->getApellidos(),
                        'contraseña' => $usuario->getContraseña()
                    ];
                    $respuesta = [true, $datosUsuario];
                break;

                case 2:
                    $email = $infousuario['email'];
                    $password = $infousuario['password'];

                    //BUSCAR EN LA BASE DE DATOS SI EL USUARIO ESTÁ REGISTRADO
                    //COMPRUEBA EL EMAIL Y LA CONTRASEÑA
                    $usuario = $repositorio->findOneBy(array('email' => $email, 'contraseña' => $password));


                    if (isset($usuario)) {
                        //SI EL USUARIO EXISTE, ENTRA EN LA APLICACIÓN
                        $datosUsuario = [
                            'username' => $usuario->getUsername(),
                            'correo' => $usuario->getEmail(),
                            'nombre' => $usuario->getNombre(),
                            'apellidos' => $usuario->getApellidos(),
                            'contraseña' => $usuario->getContraseña()
                        ];
                        $respuesta = [true, $datosUsuario];
                    } else {
                        $respuesta = [false, "Correo y/o contraseña no coinciden"];
                    }
                    break;

                case 5:
                    $email = $infousuario['email'];
                    $password = $infousuario['password'];
                    $username = $infousuario['username'];
                    $name = $infousuario['name'];
                    $apellidos = $infousuario['apellidos'];

                    //BUSCAR EN LA BASE DE DATOS SI EL USUARIO ESTÁ REGISTRADO
                    //AUNQUE EL EMAIL NO SEA LA CLAVE PRIMARIA, DENTRO DEL PROGRAMA SOLO PODRÁ EXISTIR UNA
                    //PERSONA CON ESE EMAIL
                    $usuario = $repositorio->findOneBy(array('email' => $email));

                    if (!isset($usuario)) {
                        //SI EL USUARIO NO EXISTE, SE CREA UNO NUEVO CON ESOS DATOS
                        $newUser = new Usuarios();
                        $newUser->setEmail($email);
                        $newUser->setNombre($name);
                        $newUser->setApellidos($apellidos);
                        $newUser->setContraseña($password);
                        $newUser->setUsername($username);

                        //ACTUALIZAMOS LA BDD CON LOS NUEVOS DATOS
                        $entityManager->persist($newUser);
                        $entityManager->flush();

                        //SE CREA UN USUARIO PARA INICIAR SESION
                        $datosUsuario = [
                            'username' => $newUser->getUsername(),
                            'correo' => $newUser->getEmail()
                        ];

                        $respuesta = [true, $datosUsuario];
                    } else {
                        $respuesta = [false, "Usuario ya existente con ese correo"];
                    }
                    break;

                default:
                    # code...
                    break;
            }


            //VOLVER A MANDAR LA INFORMACION.
            return new Response(json_encode($respuesta));

            //return new Response(json_encode($data['username'])); --> PARA MANDAR SOLO UN CAMPO DEL OBJETO

            //return $this->json($data); --> OTRA FORMA DE DEVOLVER LA RESPUESTA EN FORMATO JSON
        }
    }

    /**
     * ACTUALIZAR DATOS DE USUARIO
     * @Route("/update", name="actualizarDatos")
     */
    public function update(ManagerRegistry $doctrine)
    {
        if (isset($_REQUEST)) {

            //OBTENER LOS DATOS RECIBIDOS
            $data = file_get_contents('php://input');

            //CONVERTIR LA INFORMACION EN UN ARRAY. MÁS FACIL DE MANEJAR EN EL JS DESPUES
            $infousuario = json_decode($data, true);

            //BUSCAR EL USUARIO EN LA BDD Y HACER UPDATE DE ESOS DATOS
            $entityManager = $doctrine->getManager();
            $repositorio = $doctrine->getRepository(Usuarios::class);

            $username = $infousuario['username'];
            $usuario = $repositorio->findOneBy(array('username' => $username));

            if (isset($infousuario['contraseña'])) {
                $contraseña = $infousuario['contraseña'];

                $usuario->setContraseña($contraseña);
            } else {
                $nombre = $infousuario['nombre'];
                $apellidos = $infousuario['apellidos'];
                $correo = $infousuario['correo'];

                $usuario->setNombre($nombre);
                $usuario->setApellidos($apellidos);
                $usuario->setEmail($correo);
            }

            //ACTUALIZAMOS LA BDD CON LOS NUEVOS DATOS
            $entityManager->flush();
            $respuesta = "Datos actaulizados. Es necesario volver a iniciar sesion";

            return new Response(json_encode($usuario->getNombre()));
        }
    }

    /**
     * BORRAR USUARIO
     * @Route("/delUser", name="delUser")
     */
    public function borrarUsuario(ManagerRegistry $doctrine){
        //SE UTILIZA ESTE MECANISMO PARA OBTENER LOS DATOS RECIBIDOS
        $data = file_get_contents('php://input');

        //DECODIFICAR LOS DATOS Y GUARDARLOS EN UN ARRAY
        $info = json_decode($data, true);
        $entityManager = $doctrine->getManager();

        //DATOS POR SEPARADO
        $username = $info;

        //ENCONTRAR EL ID DE USUARIO PARA ELIMINAR TODAS LAS OCURRENCIAS EN LA BASE DE DATOS
        $user =  $userId = $doctrine->getRepository(Usuarios::class)->findOneBy(array('username' => $username));
        $userId = $doctrine->getRepository(Usuarios::class)->findOneBy(array('username' => $username))->getId();
        $rutina = $doctrine->getRepository(Rutinas::class)->findBy(array('id_usuario' => $userId));

        // //POR CADA RUTINA, BUSCAR LOS EJERCICIOS/RUTINA
        foreach ($rutina as $rut) {
            $idRutina = $rut->getId();

            $ejRut = $doctrine->getRepository(RutinasEjercicios::class)->findBy(array("id_rutina" => $idRutina));

            //BORRAR RUTINA/EJERCICIO Y RUTINA
            foreach ($ejRut as $result) {
                $entityManager->remove($result);
            }

            $entityManager->remove($rut);
        }

        //BORRAR LOS DATOS EN LA TABLA USUARIOS
        $entityManager->remove($user);
        $entityManager->flush();

        return new Response(json_encode("Borrado"));
        
    }
}
