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

class DefaultController extends AbstractController
{
    /**
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
                    $name = $infousuario['username'];
                    $apellidos = $infousuario['username'];

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
                            'username' => $newUser->getNombre(),
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

            return new Response(json_encode($respuesta));
        }
    }

    /**
     * @Route("/ejercicios", name="listaEjercicios")
     */
    public function ejercicios(ManagerRegistry $doctrine)
    {
        if (isset($_REQUEST)) {

            $entityManager = $doctrine->getManager();
            $repositorio = $doctrine->getRepository(Ejercicios::class);

            //BUSCAR EN LA BASE DE DATOS TODOS LOS DATOS DE EJERCICIOS
            $consulta = $repositorio->findAll();

            $listaEjercicios = array();

            foreach ($consulta as $ejercicio) {
                $datos = [
                    'nombre' => $ejercicio->getNombre(),
                    'grupoMuscular' => $ejercicio->getGrupoMuscular(),
                    'descripcion' => $ejercicio->getDescripcion(),
                    'urlVideo' => $ejercicio->getUrlVideo(),
                    'urlImg' => $ejercicio->getUrlImg()
                ];
                array_push($listaEjercicios, $datos);
            }

            return new Response(json_encode($listaEjercicios));
        }
    }

    /**
     * @Route("/getrutinas", name="listaRutinas")
     */
    public function getRutinas(ManagerRegistry $doctrine)
    {
        if (isset($_REQUEST)) {
            //SE UTILIZA ESTE MECANISMO PARA OBTENER LOS DATOS RECIBIDOS
            $data = file_get_contents('php://input');

            //CONVERTIR LA INFORMACION EN UN ARRAY. MÁS FACIL DE MANEJAR EN EL JS DESPUES
            $infousuario = json_decode($data, true);

            //OBTENER EL USUARIO CON LOS DATOS ENVIADOS
            $entityManager = $doctrine->getManager();
            $usuario = $doctrine->getRepository(Usuarios::class)->findOneBy(array('username' => $infousuario));

            if (isset($usuario)) {
                //OBTENER EL ID DEL USUARIO
                $idUsuario = $usuario->getId();

                //CON EL ID DEL USUARIO, OBTENER LAS RUTINAS QUE LE PERTENECEN
                $rutinas = $doctrine->getRepository(Rutinas::class)->findBy(array('id_usuario' => $idUsuario));
                $listado = [];
                foreach ($rutinas as $rut) {
                    array_push($listado, $rut->getNombre());
                }


                return new Response(json_encode($listado));
            } else {
                return new Response(json_encode("No Encontrado"));
            }

            // return new Response(json_encode($usuario));
        }
    }

    /**
     * @Route("/setrutinas", name="setRutinas")
     */
    public function setRutinas(ManagerRegistry $doctrine)
    {
        if (isset($_REQUEST)) {
            //SE UTILIZA ESTE MECANISMO PARA OBTENER LOS DATOS RECIBIDOS
            $data = file_get_contents('php://input');

            //CONVERTIR LA INFORMACION EN UN ARRAY. MÁS FACIL DE MANEJAR EN EL JS DESPUES
            $infoRutina = json_decode($data, true);
            // echo ($infoRutina);
            $nombreRutina = $infoRutina['rutina'];

            //OBTENER EL USUARIO CON LOS DATOS ENVIADOS
            $entityManager = $doctrine->getManager();
            $usuario = $doctrine->getRepository(Usuarios::class)->findOneBy(array('username' => $infoRutina['user']));
            $idUsuario = $usuario->getId();

            if (isset($idUsuario)) {
                //CREAR UNA NUEVA RUTINA E INSERTAR LOS DATOS EN LA BDD
                $nuevaRutina = new Rutinas();
                $nuevaRutina->setIdUsuario($usuario);
                $nuevaRutina->setNombre($nombreRutina);

                //ACTUALIZAMOS LA BASE DE DATOS
                $entityManager->persist($nuevaRutina);
                $entityManager->flush();
            }


            return new Response(json_encode($nuevaRutina->getIdUsuario()));
        }
    }

    /**
     * @Route("/setEjercicioRutina", name="setEjercicioRutina")
     */
    public function setEjercicioRutina(ManagerRegistry $doctrine){

        if (isset($_REQUEST)) {
            //SE UTILIZA ESTE MECANISMO PARA OBTENER LOS DATOS RECIBIDOS
            $data = file_get_contents('php://input');

            //DECODIFICAR LOS DATOS Y GUARDARLOS EN UN ARRAY
            $infoRutina = json_decode($data, true);

            //OBTENER LOS DATOS PASADOS
            $username = $infoRutina['username'];
            $ejercicioName = $infoRutina['ejercicio'];
            $rutinaName = $infoRutina['rutina'];
            $rondas = $infoRutina['rondas'];
            if ($rondas == "") {
                $rondas = 0;
            }
            $repes = $infoRutina['repeticiones'];
            if ($repes == "") {
                $repes = 0;
            }
            $tiempo = $infoRutina['tiempo'];
            if ($tiempo == "") {
                $tiempo = 0;
            }


            //OBTENER EL USUARIO, EL EJERCICIO Y LA RUTINA DE LA BASE DE DATOS
            $entityManager = $doctrine->getManager();

            $usuario = $doctrine->getRepository(Usuarios::class)->findOneBy(array('username'=>$username));
            
            $rutina = $doctrine->getRepository(Rutinas::class)->findOneBy(array('id_usuario'=>$usuario, 'nombre'=>$rutinaName));

            $ejercicio = $doctrine->getRepository(Ejercicios::class)->findOneBy(array('nombre'=>$ejercicioName));

            //CREAR UN NUEVO OBJETO RUTINAS/EJERCICIO
            $rutinaEjercicio = new RutinasEjercicios();
            $rutinaEjercicio->setIdRutina($rutina);
            $rutinaEjercicio->setIdEjercicio($ejercicio);
            $rutinaEjercicio->setRepeticiones($repes);
            $rutinaEjercicio->setRondas($rondas);
            $rutinaEjercicio->setTiempo($tiempo);

            //ACTUALIZAR Y AÑADIR A LA BASE DE DATOS
            $entityManager->persist($rutinaEjercicio);
            $entityManager->flush();

            return new Response(json_encode($rondas.' '.$repes.' '.$tiempo));

        }
    }

    /**
     * @Route("/getEjercicioRutina", name="getEjercicioRutina")
     */
    public function getEjercicioRutina(ManagerRegistry $doctrine){
        if (isset($_REQUEST)) {
            //SE UTILIZA ESTE MECANISMO PARA OBTENER LOS DATOS RECIBIDOS
            $data = file_get_contents('php://input');

            //DECODIFICAR LOS DATOS Y GUARDARLOS EN UN ARRAY
            $infoRutina = json_decode($data, true);

            //DATOS POR SEPARADO
            $username = $infoRutina['username'];
            $nomRut = $infoRutina['nomRut'];

            //BUSCAR LA RUTINA QUE SE LLAME IGUAL, PARA EL USUARIO ACTUAL
            $userId = $doctrine->getRepository(Usuarios::class)->findOneBy(array('username'=>$username))->getId();
            $rutinaId = $doctrine->getRepository(Rutinas::class)->findOneBy(array('id_usuario'=>$userId, 'nombre'=>$nomRut))->getId();

            //BUSCAR EN LA TABLA EJERCICIORUTINA
            $ejRut = $doctrine->getRepository(RutinasEjercicios::class)->findBy(array("id_rutina"=>$rutinaId));

            $listaEjercicios = [];

            foreach ($ejRut as $ejercicio) {
                array_push($listaEjercicios,
                [
                    'nomEjercicio'=>$doctrine->getRepository(Ejercicios::class)->findOneBy(array('id'=>$ejercicio->getIdEjercicio()))->getNombre(),
                    'rodas'=>$ejercicio->getRondas(),
                    'tiempo'=>$ejercicio->getTiempo(),
                    'repeticiones'=>$ejercicio->getRepeticiones()
                ]);
            }

            return new Response(json_encode($listaEjercicios));
        }
    }

}
