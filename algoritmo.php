<?php
include "header.php";
?>








<div>




  <div class="container-fluid ">
    <h3 WIDTH="20" HEIGHT="20" class="text-center" style="margin: 20px">
      <hr>
      <b> simulacion de procesos del sistema con algoritmo robin round </b>
      <hr>
    </h3>
  </div>


  <!-- esta es la tabla que se cargará-->

  <div class="container">

    <div class="container">

      <table id="listap" class="table table-bordered" WIDTH="50%"></table>

    </div>

    <div class="container text-center ">
      <hr>

      <input id="btinicio" type="submit" value="Iniciar Simulacion" class="btn btn-primary btn-lg active" onclick="roundRobin();"> </input>
      <input type="button" value="Interumpir Simulacion" class="btn btn-danger btn-lg active" onclick="pausar();"> </input>
      <input type="submit" value="Reiniciar simulacion" class="btn btn-success btn-lg active" onclick="history.go(0)"> </input>
    </div>

    <div id="contenedor container text-center" class="text-center">
      <hr>
      <h3>Proceso en ejecucion</h3>
      <hr>
      <div id="reloj"></div>

      <div id="contenedor_ejecucion">

        <div id="proceso"></div>

      </div>


      <div id="secciones">
        <hr>
        <h3>Listos</h3>
        <h3>Terminados</h3>
        <div class="columna" id="listos"></div>

        <div class="columna" id="terminados"></div>
      </div>

    </div>


    <div class="container text-center">

      <h2>Diagrama de Simulacion</h2>
      <hr>

      <canvas id="gant" width="1100" height="200"></canvas>

    </div>


    <div class="container text-center">
      <hr>
      <h2>Reporte Procesos Expulsivos</h2>
      <hr>
      <table id="reportexp" class="table table-bordered" WIDTH="50%"></table>
    </div>

    <div class="container text-center">
    <hr>
      <h2>Reporte Procesos No Expulsivos</h2>
      <hr>
      <table id="reportnoexp" class="table table-bordered" WIDTH="50%"></table>

    </div>



    <div class="container text-center">
    <hr>
      <h2>Grafica De procesos vs turnarround</h2>
      <hr>
      <div id="container" style="width:100%;">
        <canvas id="chart" width="1100" height="500"></canvas>
      </div>
      
    </div>


  </div>



  </body>


  <footer>

  </footer>



  </html>