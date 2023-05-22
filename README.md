<h2>REPOSITORIO PROYECTO NOW! EXERCISE</p>

<p>Este repositorio contiene:</p>
<ul>
    <li>Directorio <b>api/</b> con el contenido de la API de la aplicación</li>
    <li>Directorio <b>appproyecto/</b> con el contenido de de la parte Web de la aplicación</li>
    <li>Fichero <b>Dockerfile y docker-compose.yml/</b> para la creación de contenedores en Docker</li>
    <li>Script SQL para la creación de tablas e inserción de datos en la base de datos</li>
</ul>

<h2>INSTALACIÓN DE LA APLICACIÓN EN DOCKER</p>
<p>Este proyecto está pensado para ser utilizado con Docker e instalado mediante los dos ficheros, docker-compose.yml y Dockerfile</p>

<ol type="i" start="1">
    <li>Instalar Docker en el sistema, si es que no se tiene</li>
    <li>RECOMENDADO: Instalar contenedor Portainer para disponer de interfaz gráfica con Docker</li>
    <li>Ubicarse en el repositorio deseado y clonar el repositorio: git clone https://github.com/daw223-01/ProyectoDaw.git</li>
    <li>Ejecutar el comando <b>docker compose up</b> para crear los contenedores. Este proceso demorará un par de minutos</li>
    <li>Esto instalará los contenedores, procedentes de tres repositorios de DockerHub: https://hub.docker.com/repositories/daw22301</li>
    <li>En caso de querer ejecutar el proyecto, es necesario cambiar unos conceptos dentro del código:</li>
        <ul>
            <li>Dentro del contenedor daw-apache-php acceder a la ruta /var/www/html/ProyectoDaw/appproyecto/src y editar los ficheros App.js, CardEjercicios.js, Ejercicios.js, Main.js, Modal.js, Perfil.js y Rutinas.js, modificando la línea al principio del documento donde aparece escrito
            “//RUTA DE PRODUCCION let ruta = http://nowexercise.ddns.net/api “ y sustituirlo por “//RUTA DE PRODUCCION let ruta = http://[IP SERVIDOR CLOUDING]/api”</li>
            <li>Posteriormente, retroceder al directorio /appproyecto y ejecutar npm run build para compilar el código modificado</li>
            <li>Dentro de ese mismo contenedor, acceder a /var/www/html/ProyectoDaw/api y editar el fichero llamado .env, buscando la línea donde aparece
                “DATABASE_URL="mysql://root:root@172.17.0.4:3306/proyectonow”"
                y sustituirla por
                “DATABASE_URL="mysql://root:root@[IP DEL CONTENEDOR MYSQL]:3306/proyectonow””
            </li>
            <li>Acceder a un navegador web e introducir en la URL: http://[IP DEL CONTENEDOR CLOUDING]:8080 para acceder a la base de datos</li>
            <li>Entrar en la base de datos "proyectodaw" y comprobar que está vacía. Importar el fichero proyectodaw.sql que se encontraba en el repositorio de GitHub para modificar la BDD</li>
            <li>Acceder a un navegador web e introducir en la URL: http://[IP DEL CONTENEDOR CLOUDING] para comprobar que se puede acceder a la aplicación</li>
        </ul>
</ol>
